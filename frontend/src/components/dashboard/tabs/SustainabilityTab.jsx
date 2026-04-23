import { useState, useEffect } from "react";
import { Leaf, TreePine, Wind, Award, Car } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { cards, colors } from "../DashboardStyles";

const API_BASE = "/api";
function getToken() { return localStorage.getItem("enerluma_token"); }
async function apiFetch(url) {
    const token = getToken();
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";
    const res = await fetch(`${API_BASE}${url}`, { headers });
    if (!res.ok) throw new Error("Fetch failed");
    return res.json();
}

export default function SustainabilityTab() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/ai/insights")
            .then(res => setData(res?.carbonFootprint || null))
            .catch(e => console.error("Sustainability fetch failed:", e))
            .finally(() => setLoading(false));
    }, []);

    // Fallback
    const carbon = data || {
        totalEmissions: 142,
        comparedToAvg: -18,
        treesEquivalent: 2.4,
        carKmEquivalent: 580,
        monthlyTrend: [
            { month: "Oct", emissions: 180 }, { month: "Nov", emissions: 165 },
            { month: "Dec", emissions: 158 }, { month: "Jan", emissions: 150 },
            { month: "Feb", emissions: 148 }, { month: "Mar", emissions: 142 },
        ],
        breakdown: [],
        offsetSuggestions: [],
    };

    const ecoScore = Math.max(0, Math.min(100, 100 + carbon.comparedToAvg * 2));

    const ecoStats = [
        { icon: <Award size={24} color="#10b981" />, label: "Eco-Score", value: ecoScore.toFixed(0), unit: "/ 100", bg: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
        { icon: <Wind size={24} color="#0ea5e9" />, label: "CO₂ This Month", value: carbon.totalEmissions, unit: "kg", bg: "rgba(14, 165, 233, 0.1)", color: "#0ea5e9" },
        { icon: <TreePine size={24} color="#84cc16" />, label: "Trees Equivalent", value: carbon.treesEquivalent, unit: "planted", bg: "rgba(132, 204, 22, 0.1)", color: "#84cc16" },
        { icon: <Car size={24} color="#8b5cf6" />, label: "Car Equivalent", value: carbon.carKmEquivalent, unit: "km", bg: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" },
    ];

    const trendData = carbon.monthlyTrend || [];
    const communityAvg = 155; // baseline for comparison

    if (loading) {
        return <div style={{ textAlign: "center", padding: 60, color: colors.textMuted }}>Loading sustainability data...</div>;
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Header */}
            <div style={{ ...cards.stat, background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05))", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                <h3 style={{ color: "#059669", fontSize: "1.1rem", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <Leaf size={18} />
                    Environmental Impact
                </h3>
                <p style={{ color: colors.textSecondary, fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Track your carbon footprint and see how your energy conservation efforts directly contribute to a more sustainable future.
                    {carbon.comparedToAvg < 0 && ` You're ${Math.abs(carbon.comparedToAvg)}% below the community average — great work!`}
                </p>
            </div>

            {/* Eco Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {ecoStats.map((stat, i) => (
                    <div key={i} style={{
                        ...cards.stat,
                        alignItems: "center", textAlign: "center", padding: "24px 16px",
                        background: `linear-gradient(135deg, ${stat.bg}, transparent)`,
                    }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: "50%",
                            background: stat.bg, display: "flex",
                            alignItems: "center", justifyContent: "center",
                            marginBottom: 14,
                        }}>
                            {stat.icon}
                        </div>
                        <div style={{ ...cards.statValue, justifyContent: "center" }}>
                            {stat.value}
                            <span style={cards.statValueUnit}>{stat.unit}</span>
                        </div>
                        <div style={{ ...cards.statLabel, marginBottom: 0 }}>{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Carbon Footprint Trend */}
            <div style={cards.section}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <div>
                        <div style={cards.sectionTitle}>Carbon Footprint Trend</div>
                        <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginTop: -12 }}>Your emissions vs community average — Last 6 months</div>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: "0.72rem", color: colors.textSecondary, fontWeight: 500 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 12, height: 3, background: "#10b981", borderRadius: 2 }}></div> You
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 12, height: 2, borderTop: "2px dashed #94a3b8" }}></div> Community
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", height: 340, marginTop: 20 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData.map(d => ({ ...d, community: communityAvg }))} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorYou" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(val) => `${val} kg`} />
                            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} formatter={(value, name) => [`${value} kg`, name === 'emissions' ? 'Your Footprint' : 'Community Avg']} />
                            <Area type="monotone" dataKey="community" stroke="#cbd5e1" strokeDasharray="5 5" fill="none" strokeWidth={2} />
                            <Area type="monotone" dataKey="emissions" stroke="#10b981" fillOpacity={1} fill="url(#colorYou)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 2, stroke: colors.white }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Breakdown + Offset Suggestions */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {/* Breakdown */}
                {carbon.breakdown && carbon.breakdown.length > 0 && (
                    <div style={{ ...cards.section, flex: "1 1 300px", marginBottom: 0 }}>
                        <div style={cards.sectionTitle}>Emissions Breakdown</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {carbon.breakdown.map((b, i) => (
                                <div key={i}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: colors.text }}>{b.source}</span>
                                        <span style={{ fontSize: "0.8rem", color: colors.textMuted }}>{b.emissions} kg ({b.percentage}%)</span>
                                    </div>
                                    <div style={{ width: "100%", height: 8, borderRadius: 4, background: colors.border }}>
                                        <div style={{ width: `${b.percentage}%`, height: "100%", borderRadius: 4, background: b.color, transition: "width 0.5s ease" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Offset Suggestions */}
                {carbon.offsetSuggestions && carbon.offsetSuggestions.length > 0 && (
                    <div style={{ ...cards.section, flex: "1 1 300px", marginBottom: 0 }}>
                        <div style={cards.sectionTitle}>
                            <Leaf size={18} color="#10b981" />
                            Offset Suggestions
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {carbon.offsetSuggestions.map((tip, i) => (
                                <div key={i} style={{
                                    padding: 14, borderRadius: 10,
                                    background: "rgba(16, 185, 129, 0.04)",
                                    border: "1px solid rgba(16, 185, 129, 0.1)",
                                    fontSize: "0.85rem", color: colors.textSecondary,
                                    display: "flex", gap: 10, alignItems: "flex-start",
                                }}>
                                    <span style={{ color: "#10b981", fontWeight: 700, flexShrink: 0 }}>✓</span>
                                    {tip}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
