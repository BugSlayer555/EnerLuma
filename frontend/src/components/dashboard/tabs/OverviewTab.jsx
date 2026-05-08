import { useState, useEffect } from "react";
import { Zap, Droplets, IndianRupee, TrendingUp, TrendingDown, Activity } from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { cards, colors } from "../DashboardStyles";

const API_BASE = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";
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

// Fallback mock data
const fallbackEnergy = [
    { time: "00:00", actual: 0.8, forecast: 0.9 }, { time: "02:00", actual: 0.6, forecast: 0.7 },
    { time: "04:00", actual: 0.4, forecast: 0.5 }, { time: "06:00", actual: 1.2, forecast: 1.0 },
    { time: "08:00", actual: 1.8, forecast: 1.6 }, { time: "10:00", actual: 2.3, forecast: 2.1 },
    { time: "12:00", actual: 2.1, forecast: 2.3 }, { time: "14:00", actual: 2.6, forecast: 2.4 },
    { time: "16:00", actual: 2.4, forecast: 2.6 }, { time: "18:00", actual: 2.9, forecast: 2.7 },
    { time: "20:00", actual: 2.2, forecast: 2.4 }, { time: "22:00", actual: 1.1, forecast: 1.3 },
];
const fallbackWater = [
    { time: "00:00", actual: 14, forecast: 16 }, { time: "02:00", actual: 10, forecast: 11 },
    { time: "04:00", actual: 9, forecast: 10 }, { time: "06:00", actual: 48, forecast: 44 },
    { time: "08:00", actual: 76, forecast: 70 }, { time: "10:00", actual: 64, forecast: 58 },
    { time: "12:00", actual: 58, forecast: 54 }, { time: "14:00", actual: 54, forecast: 52 },
    { time: "16:00", actual: 67, forecast: 61 }, { time: "18:00", actual: 89, forecast: 82 },
    { time: "20:00", actual: 74, forecast: 69 }, { time: "22:00", actual: 46, forecast: 42 },
];
const fallbackWeekly = [
    { day: "Mon", value: 12.8 }, { day: "Tue", value: 13.6 }, { day: "Wed", value: 14.4 },
    { day: "Thu", value: 15.1 }, { day: "Fri", value: 14.2 }, { day: "Sat", value: 11.9 }, { day: "Sun", value: 11.3 },
];

export default function OverviewTab({ usageEntries, bills, integrations = [], userId = "" }) {
    const [timeFilter, setTimeFilter] = useState("today");
    const [energyData, setEnergyData] = useState(null);
    const [waterData, setWaterData] = useState(null);
    const [loading, setLoading] = useState(true);

    const waterLinked = integrations.some(i => i.resource === "water");
    const energyLinked = integrations.some(i => i.resource === "energy");

    useEffect(() => {
        async function load() {
            try {
                const promises = [apiFetch("/energy/analytics").catch(() => null)];
                if (waterLinked) promises.push(apiFetch("/water/analytics").catch(() => null));
                const [eRes, wRes] = await Promise.all(promises);
                setEnergyData(eRes);
                setWaterData(waterLinked ? (wRes || null) : null);
            } catch (e) {
                console.error("Failed to load analytics:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waterLinked, energyLinked]);

    if (loading) {
        return (
            <div style={{ padding: 40, textAlign: "center", color: colors.textMuted }}>
                Loading dashboard data...
            </div>
        );
    }

    // Derive chart data from API or fallback
    const hourlyEnergy = energyData?.hourlyData
        ? energyData.hourlyData.filter((_, i) => i % 2 === 0).map(d => ({ time: d.time, actual: d.actual, forecast: d.forecast }))
        : fallbackEnergy;

    const hourlyWater = waterData?.hourlyData
        ? waterData.hourlyData.map(d => ({ time: d.time, actual: d.value, forecast: +(d.value * 0.9).toFixed(1) }))
        : fallbackWater;

    const weeklyBarData = energyData?.weeklyData
        ? energyData.weeklyData.map(d => ({ day: d.day, value: d.value }))
        : fallbackWeekly;

    // KPIs from API
    const energyToday = energyData?.kpis?.find(k => k.label === "Today Total");
    const energyCost = energyData?.kpis?.find(k => k.label === "Today's Cost");
    const waterToday = waterData?.kpis?.find(k => k.label === "Today Total");

    const multiplier = timeFilter === "month" ? 30 : timeFilter === "week" ? 7 : 1;
    const filterLabel = (base) => timeFilter === "today" ? `${base} Today` : timeFilter === "week" ? `${base} This Week` : `${base} This Month`;

    const baseEnergy = energyToday ? parseFloat(energyToday.value) : 24.3;
    const baseWater = waterToday ? parseFloat(waterToday.value) : 548;
    const baseCost = energyCost ? parseInt(energyCost.value.replace(/[^0-9]/g, "")) : 186;

    const statCards = [
        {
            icon: <Zap size={18} />,
            label: filterLabel("Energy"),
            value: (baseEnergy * multiplier).toFixed(1),
            unit: "kWh",
            trend: energyToday ? `${energyToday.change > 0 ? "+" : ""}${energyToday.change}%` : "-12%",
            trendUp: energyToday ? energyToday.change > 0 : false,
            iconColor: colors.primary,
            gradient: "linear-gradient(135deg, rgba(32,178,170,0.08), rgba(32,178,170,0.02))",
        },
        ...(waterLinked ? [{
            icon: <Droplets size={18} />,
            label: filterLabel("Water"),
            value: (baseWater * multiplier).toFixed(0),
            unit: "Liters",
            trend: waterToday ? `${waterToday.change > 0 ? "+" : ""}${waterToday.change}%` : "+5.4%",
            trendUp: waterToday ? waterToday.change > 0 : true,
            iconColor: "#0ea5e9",
            gradient: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(14,165,233,0.02))",
        }] : []),
        {
            icon: <IndianRupee size={18} />,
            label: timeFilter === "month" ? "Est. Monthly Cost" : timeFilter === "week" ? "Est. Weekly Cost" : "Est. Daily Cost",
            value: (baseCost * multiplier).toFixed(0),
            unit: "",
            trend: energyCost ? `${energyCost.change > 0 ? "+" : ""}${energyCost.change}%` : "-5%",
            trendUp: energyCost ? energyCost.change > 0 : false,
            iconColor: colors.warning,
            gradient: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.02))",
            isCurrency: true,
        },
        {
            icon: <Activity size={18} />,
            label: "Current Draw",
            value: energyData?.kpis?.[0]?.value || "1.5 kW",
            unit: "",
            trend: energyData?.kpis?.[0] ? `${energyData.kpis[0].change}%` : "-8%",
            trendUp: energyData?.kpis?.[0] ? energyData.kpis[0].change > 0 : false,
            iconColor: "#8b5cf6",
            gradient: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(139,92,246,0.02))",
            isRaw: true,
        },
    ];

    const currentEnergyData = timeFilter === "today" ? hourlyEnergy : hourlyEnergy.map(d => ({
        ...d, actual: +(d.actual * multiplier).toFixed(1), forecast: +(d.forecast * multiplier).toFixed(1)
    }));
    const currentWaterData = timeFilter === "today" ? hourlyWater : hourlyWater.map(d => ({
        ...d, actual: +(d.actual * multiplier).toFixed(1), forecast: +(d.forecast * multiplier).toFixed(1)
    }));
    const currentWeeklyData = timeFilter === "today" ? weeklyBarData : weeklyBarData.map(d => ({
        ...d, value: +(d.value * multiplier).toFixed(1)
    }));

    const MiniBar = ({ color = "rgba(32, 178, 170, 0.3)" }) => (
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 20, marginTop: 14 }}>
            {[40, 60, 45, 80, 50, 70, 90].map((h, i) => (
                <div key={i} style={{ width: 16, height: `${h}%`, background: color, borderRadius: 3 }}></div>
            ))}
        </div>
    );

    const filterPeriodLabel = timeFilter === "today" ? "Today" : timeFilter === "week" ? "This Week" : "This Month";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Filter Row */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", gap: 4, background: colors.white, borderRadius: 24, padding: 3, border: `1px solid ${colors.border}` }}>
                    {["today", "week", "month"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setTimeFilter(f)}
                            style={{
                                padding: "7px 16px",
                                borderRadius: 20,
                                border: "none",
                                background: timeFilter === f ? colors.primary : "transparent",
                                color: timeFilter === f ? "#fff" : colors.textMuted,
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.25s ease",
                            }}
                        >
                            {f === "today" ? "Today" : f === "week" ? "Week" : "Month"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stat Cards */}
            <div style={{ ...cards.grid, gridTemplateColumns: "repeat(4, 1fr)" }} className="dash-stat-grid">
                {statCards.map((card, i) => (
                    <div key={i} style={{ ...cards.stat, background: card.gradient, borderColor: "transparent", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}>
                        <div style={cards.statHeader}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: `${card.iconColor}15`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: card.iconColor,
                            }}>
                                {card.icon}
                            </div>
                            {card.trend && (
                                <div style={{ ...cards.statTrend, color: card.trendUp ? colors.error : colors.success, background: card.trendUp ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)", padding: "3px 8px", borderRadius: 12 }}>
                                    {card.trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                                    {card.trend}
                                </div>
                            )}
                        </div>
                        <div style={{ ...cards.statValue, marginTop: 12 }}>
                            {card.isCurrency && <span style={{ fontSize: "1.1rem", marginRight: 2, color: card.iconColor }}>₹</span>}
                            {card.isRaw ? card.value : card.value}
                            {!card.isRaw && <span style={cards.statValueUnit}>{card.unit}</span>}
                        </div>
                        <div style={cards.statLabel}>{card.label}</div>
                        <MiniBar color={`${card.iconColor}30`} />
                    </div>
                ))}
            </div>

            {/* Energy Chart */}
            <div style={{ display: "flex", gap: 24, alignItems: "stretch", flexWrap: "wrap" }}>
                <div style={{ ...cards.section, flex: "2 1 600px", marginBottom: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div>
                            <div style={cards.sectionTitle}>Energy Consumption</div>
                            <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginTop: -12 }}>Actual vs AI Forecast — {filterPeriodLabel}</div>
                        </div>
                        <div style={{ display: "flex", gap: 16, fontSize: "0.72rem", color: colors.textSecondary, fontWeight: 500 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 12, height: 3, background: colors.primary, borderRadius: 2 }}></div> Actual
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 12, height: 2, borderTop: `2px dashed ${colors.primaryLight}` }}></div> Forecast
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: 300, marginTop: 16 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentEnergyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(val) => `${val} kW`} />
                                <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", fontSize: "0.85rem" }} formatter={(value) => [`${value} kW`]} />
                                <Area type="monotone" dataKey="forecast" stroke={colors.primaryLight} strokeDasharray="5 5" fill="none" strokeWidth={2} />
                                <Area type="monotone" dataKey="actual" stroke={colors.primary} fillOpacity={1} fill="url(#colorActual)" strokeWidth={2.5} activeDot={{ r: 6, strokeWidth: 2, stroke: colors.white }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Second Row */}
            <div style={{ display: "flex", gap: 24, alignItems: "stretch", flexWrap: "wrap" }}>
                {/* Bar Chart */}
                <div style={{ ...cards.section, flex: "1 1 400px", marginBottom: 0 }}>
                    <div style={cards.sectionTitle}>{timeFilter === "month" ? "Monthly Overview" : timeFilter === "week" ? "Weekly Overview" : "Weekly Overview"}</div>
                    <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginBottom: 24, marginTop: -12 }}>Energy consumption breakdown</div>
                    <div style={{ width: "100%", height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={currentWeeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(val) => `${val} kWh`} />
                                <Tooltip cursor={{ fill: "rgba(32, 178, 170, 0.05)" }} contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} formatter={(value) => [`${value} kWh`]} />
                                <Bar dataKey="value" fill={colors.primary} radius={[6, 6, 0, 0]} barSize={28} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Water Chart — only shown when water account is linked */}
                {waterLinked && (
                <div style={{ ...cards.section, flex: "1 1 400px", marginBottom: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div>
                            <div style={cards.sectionTitle}>Water Consumption</div>
                            <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginTop: -12 }}>Actual vs AI Forecast — {filterPeriodLabel}</div>
                        </div>
                        <div style={{ display: "flex", gap: 16, fontSize: "0.72rem", color: colors.textSecondary, fontWeight: 500 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 12, height: 3, background: "#0ea5e9", borderRadius: 2 }}></div> Actual
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{ width: 12, height: 2, borderTop: "2px dashed #7dd3fc" }}></div> Forecast
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "100%", height: 300, marginTop: 16 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentWaterData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorWaterActual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.border} />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: colors.textMuted }} tickFormatter={(val) => `${val} L`} />
                                <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} formatter={(value) => [`${value} L`]} />
                                <Area type="monotone" dataKey="forecast" stroke="#7dd3fc" strokeDasharray="5 5" fill="none" strokeWidth={2} />
                                <Area type="monotone" dataKey="actual" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorWaterActual)" strokeWidth={2.5} activeDot={{ r: 6, strokeWidth: 2, stroke: colors.white }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                )}
            </div>

            {/* Anomalies Row (from API) */}
            {energyData?.anomalies && energyData.anomalies.length > 0 && (
                <div style={cards.section}>
                    <div style={cards.sectionTitle}>
                        <Activity size={18} color={colors.warning} />
                        Detected Anomalies
                    </div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {energyData.anomalies.map((a, i) => (
                            <div key={i} style={{
                                flex: "1 1 250px",
                                padding: 16,
                                borderRadius: 12,
                                border: "1px solid rgba(245,158,11,0.2)",
                                background: "rgba(245,158,11,0.03)",
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                            }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: "50%",
                                    background: "rgba(245,158,11,0.1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: colors.warning, flexShrink: 0, fontSize: "0.75rem", fontWeight: 700,
                                }}>
                                    ⚠
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: "0.9rem", color: colors.text }}>{a.device} at {a.time}</div>
                                    <div style={{ fontSize: "0.8rem", color: colors.textSecondary, marginTop: 4 }}>
                                        Expected {a.expected} kW, measured {a.actual} kW ({a.confidence}% confidence)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
