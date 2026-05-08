import { useState, useEffect } from "react";
import { AlertCircle, Zap, Droplets, Bell, CheckCircle2, ShieldAlert, AlertTriangle } from "lucide-react";
import { cards, formStyles, colors } from "../DashboardStyles";

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

export default function AlertsTab({ usageEntries }) {
    const [energyThreshold, setEnergyThreshold] = useState(() => {
        const stored = localStorage.getItem("enerluma_energy_threshold");
        return stored ? Number(stored) : 300;
    });
    const [waterThreshold, setWaterThreshold] = useState(() => {
        const stored = localStorage.getItem("enerluma_water_threshold");
        return stored ? Number(stored) : 1000;
    });
    const [saved, setSaved] = useState(false);
    const [backendAlerts, setBackendAlerts] = useState([]);

    useEffect(() => {
        apiFetch("/alerts")
            .then(res => setBackendAlerts(res.alerts || []))
            .catch(e => console.error("Alerts fetch failed:", e));
    }, []);

    const totalElec = usageEntries.filter((e) => e.resource === "energy").reduce((s, e) => s + e.value, 0);
    const totalWater = usageEntries.filter((e) => e.resource === "water").reduce((s, e) => s + e.value, 0);

    const handleSaveThresholds = (e) => {
        e.preventDefault();
        localStorage.setItem("enerluma_energy_threshold", energyThreshold);
        localStorage.setItem("enerluma_water_threshold", waterThreshold);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    // Merge threshold-based and backend alerts
    const alerts = [];

    if (totalElec > energyThreshold) {
        alerts.push({
            id: 'energy-limit', severity: 'critical', title: 'Energy Threshold Exceeded',
            message: `Your energy consumption (${totalElec.toFixed(1)} kWh) has exceeded the set threshold of ${energyThreshold} kWh.`,
            time: 'Just now', device: 'System',
        });
    }
    if (totalWater > waterThreshold) {
        alerts.push({
            id: 'water-limit', severity: 'critical', title: 'Water Threshold Exceeded',
            message: `Your water consumption (${totalWater.toFixed(1)} Liters) has exceeded the set threshold of ${waterThreshold} Liters.`,
            time: 'Just now', device: 'System',
        });
    }

    backendAlerts.forEach(a => alerts.push(a));

    if (alerts.length === 0) {
        alerts.push({
            id: 'info-1', severity: 'info', title: 'All Clear',
            message: 'Your energy and water usage patterns look normal. No alerts at this time.',
            time: '2 hours ago', device: 'AI Monitor',
        });
    }

    const severityConfig = {
        critical: { color: colors.error, bg: "rgba(239,68,68,0.06)", border: "rgba(239,68,68,0.2)", icon: <AlertTriangle size={18} /> },
        warning: { color: colors.warning, bg: "rgba(245,158,11,0.06)", border: "rgba(245,158,11,0.2)", icon: <ShieldAlert size={18} /> },
        info: { color: "#0ea5e9", bg: "rgba(14,165,233,0.06)", border: "rgba(14,165,233,0.2)", icon: <CheckCircle2 size={18} /> },
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            <div style={{ ...cards.stat, background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(245, 158, 11, 0.05))", border: `1px solid ${colors.border}` }}>
                <h3 style={{ color: colors.error, fontSize: "1.1rem", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <Bell size={18} />
                    Consumption Alerts
                </h3>
                <p style={{ color: colors.textSecondary, fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Set custom limits for your electricity and water usage. EnerLuma monitors your consumption and sends instant notifications when thresholds are crossed.
                </p>
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>

                {/* Threshold Configuration */}
                <div style={{ ...cards.section, flex: "1 1 300px", marginBottom: 0 }}>
                    <div style={cards.sectionTitle}>Set Thresholds</div>

                    {saved && (
                        <div style={{ ...formStyles.successMsg, marginBottom: 16 }}>
                            <CheckCircle2 size={16} /> Thresholds updated!
                        </div>
                    )}

                    <form onSubmit={handleSaveThresholds} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Monthly Energy Limit (kWh)</label>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Zap size={16} color="#d97706" />
                                </div>
                                <input type="number" style={formStyles.input} value={energyThreshold} onChange={(e) => setEnergyThreshold(Number(e.target.value))} min="0" />
                            </div>
                        </div>
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Monthly Water Limit (Liters)</label>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Droplets size={16} color="#2563eb" />
                                </div>
                                <input type="number" style={formStyles.input} value={waterThreshold} onChange={(e) => setWaterThreshold(Number(e.target.value))} min="0" />
                            </div>
                        </div>
                        <button type="submit" style={{ ...formStyles.submitBtn, marginTop: 8 }}>
                            Save Limits
                        </button>
                    </form>
                </div>

                {/* Active Alerts List */}
                <div style={{ ...cards.section, flex: "2 1 400px", marginBottom: 0 }}>
                    <div style={{ ...cards.sectionTitle, display: "flex", justifyContent: "space-between" }}>
                        <span>Active Alerts</span>
                        <span style={{ fontSize: "0.72rem", fontWeight: 600, color: colors.textMuted, background: colors.border + "50", padding: "3px 10px", borderRadius: 10 }}>
                            {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
                        </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {alerts.map((alert, idx) => {
                            const cfg = severityConfig[alert.severity] || severityConfig.info;
                            return (
                                <div key={alert.id || idx} style={{
                                    padding: 16, borderRadius: 12,
                                    border: `1px solid ${cfg.border}`,
                                    background: cfg.bg,
                                    display: "flex", gap: 14, alignItems: "flex-start",
                                }}>
                                    <div style={{
                                        width: 38, height: 38, borderRadius: "50%",
                                        background: `${cfg.color}15`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: cfg.color, flexShrink: 0,
                                    }}>
                                        {cfg.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                            <h4 style={{ margin: 0, fontSize: "0.9rem", color: colors.text }}>{alert.title}</h4>
                                            <span style={{ fontSize: "0.7rem", color: colors.textMuted }}>{alert.time}</span>
                                        </div>
                                        <p style={{ margin: 0, fontSize: "0.82rem", color: colors.textSecondary, lineHeight: 1.45 }}>
                                            {alert.message}
                                        </p>
                                        {alert.device && alert.device !== "System" && alert.device !== "AI Monitor" && (
                                            <div style={{ marginTop: 6, fontSize: "0.72rem", color: colors.textMuted }}>Device: {alert.device}</div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
