import { useState } from "react";
import { RefreshCw, CheckCircle2, AlertCircle, Plus, Zap, Droplets, Trash2 } from "lucide-react";
import { cards, formStyles, tableStyles, colors } from "../DashboardStyles";

export default function AutoSyncTab({ integrations, onLinked, onSync, apiFetch, resourceType, onUnlinked }) {
    const [connecting, setConnecting] = useState(false);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [syncingId, setSyncingId] = useState(null);
    const [unlinkingId, setUnlinkingId] = useState(null);

    // Form states
    const [providerId, setProviderId] = useState("");
    const [consumerNumber, setConsumerNumber] = useState("");
    
    const allProviders = [
        { id: "bescom", name: "BESCOM (Bangalore)", resource: "energy", icon: Zap },
        { id: "tneb", name: "TNEB (Tamil Nadu)", resource: "energy", icon: Zap },
        { id: "adani", name: "Adani Electricity (Mumbai)", resource: "energy", icon: Zap },
        { id: "tata", name: "Tata Power", resource: "energy", icon: Zap },
        { id: "bwssb", name: "BWSSB (Bangalore Water)", resource: "water", icon: Droplets },
        { id: "djb", name: "Delhi Jal Board", resource: "water", icon: Droplets }
    ];
    const providers = allProviders.filter(p => !resourceType || p.resource === resourceType);

    const handleLink = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);

        const provider = providers.find(p => p.id === providerId);

        try {
            await apiFetch("/integrations/link", {
                method: "POST",
                body: JSON.stringify({
                    providerId,
                    providerName: provider.name,
                    resource: provider.resource,
                    consumerNumber
                })
            });
            setMessage({ type: "success", text: "Provider linked successfully! Initial data is syncing." });
            setProviderId("");
            setConsumerNumber("");
            setConnecting(false);
            onLinked(); // trigger refresh
        } catch (err) {
            setMessage({ type: "error", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async (integrationId) => {
        setSyncingId(integrationId);
        try {
            await apiFetch(`/integrations/${integrationId}/sync`, { method: "POST" });
            onSync();
        } catch (err) {
            console.error("Sync failed:", err);
        } finally {
            setSyncingId(null);
        }
    };

    const handleUnlink = async (integrationId) => {
        if (!window.confirm("Are you sure you want to unlink this account? All synced data will remain.")) return;
        setUnlinkingId(integrationId);
        try {
            await apiFetch(`/integrations/${integrationId}`, { method: "DELETE" });
            onUnlinked?.();
        } catch (err) {
            console.error("Unlink failed:", err);
            setMessage({ type: "error", text: "Failed to unlink: " + err.message });
        } finally {
            setUnlinkingId(null);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Header info */}
            <div style={{ ...cards.stat, background: "linear-gradient(135deg, rgba(50, 199, 197, 0.1), rgba(15, 106, 102, 0.05))" }}>
                <h3 style={{ color: colors.primaryMedium, fontSize: "1.1rem", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                    <RefreshCw size={18} />
                    Automated Utility Sync
                </h3>
                <p style={{ color: colors.textMuted, fontSize: "0.95rem", lineHeight: 1.5 }}>
                    Connect your Indian utility providers to automatically fetch your daily consumption. 
                    Once linked, EnerLuma will securely sync your readings every 24 hours, meaning you no longer have to enter usage manually.
                </p>
            </div>

            {/* Linked Accounts */}
            <div style={cards.section}>
                <div style={{ ...cards.sectionTitle, display: "flex", justifyContent: "space-between" }}>
                    <span>Linked Accounts</span>
                    <button 
                        onClick={() => setConnecting(!connecting)}
                        style={{ ...formStyles.submitBtn, padding: "8px 16px", fontSize: "0.9rem" }}
                    >
                        {connecting ? "Cancel" : <><Plus size={16} /> Link New Account</>}
                    </button>
                </div>
                
                {integrations.length > 0 ? (
                    <div style={tableStyles.wrapper}>
                        <table style={tableStyles.table}>
                            <thead>
                                <tr>
                                    <th style={tableStyles.th}>Provider</th>
                                    <th style={tableStyles.th}>Consumer No.</th>
                                    <th style={tableStyles.th}>Last Sync</th>
                                    <th style={tableStyles.th}>Status</th>
                                    <th style={tableStyles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {integrations.filter(intg => !resourceType || intg.resource === resourceType).map(intg => (
                                    <tr key={intg._id}>
                                        <td style={tableStyles.td}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                {intg.resource === "energy" ? <Zap size={14} color="#d97706" /> : <Droplets size={14} color="#2563eb" />}
                                                {intg.providerName}
                                            </div>
                                        </td>
                                        <td style={tableStyles.td}>{intg.consumerNumber}</td>
                                        <td style={tableStyles.td}>{intg.lastSync ? new Date(intg.lastSync).toLocaleString() : "Never"}</td>
                                        <td style={tableStyles.td}>
                                            <span style={{ 
                                                ...tableStyles.badge(intg.status === "error" ? "water" : "energy"),
                                                backgroundColor: intg.status === "error" ? "rgba(220,38,38,0.1)" : "rgba(5,150,105,0.1)",
                                                color: intg.status === "error" ? "#dc2626" : "#059669"
                                            }}>
                                                {intg.status === "syncing" ? "Syncing..." : intg.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={tableStyles.td}>
                                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                                <button 
                                                    onClick={() => handleSync(intg._id)}
                                                    disabled={syncingId === intg._id}
                                                    style={{ 
                                                        background: "none", 
                                                        border: "none", 
                                                        color: colors.primaryMedium, 
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                        fontSize: "0.82rem",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <RefreshCw size={14} className={syncingId === intg._id ? "spin" : ""} />
                                                    Sync
                                                </button>
                                                <button
                                                    onClick={() => handleUnlink(intg._id)}
                                                    disabled={unlinkingId === intg._id}
                                                    style={{
                                                        background: "rgba(239,68,68,0.06)",
                                                        border: "1px solid rgba(239,68,68,0.2)",
                                                        color: colors.error,
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                        fontSize: "0.78rem",
                                                        fontWeight: 600,
                                                        borderRadius: 6,
                                                        padding: "4px 10px",
                                                    }}
                                                >
                                                    <Trash2 size={12} />
                                                    {unlinkingId === intg._id ? "Unlinking..." : "Unlink"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ ...tableStyles.empty, border: "none" }}>No accounts linked yet. Click the button above to connect your utility provider.</div>
                )}
            </div>

            {/* Connect Form */}
            {connecting && (
                <div style={{ ...cards.section, animation: "fadeInUp 0.3s ease both" }}>
                    <div style={cards.sectionTitle}>
                        Link Provider
                    </div>

                    {message && (
                        <div style={message.type === "success" ? formStyles.successMsg : formStyles.errorMsg}>
                            {message.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleLink}>
                        <div style={formStyles.grid} className="dash-form-grid">
                            <div style={formStyles.group}>
                                <label style={formStyles.label}>Select Provider</label>
                                <select 
                                    style={formStyles.select} 
                                    value={providerId} 
                                    onChange={(e) => setProviderId(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>-- Select a Utility Provider --</option>
                                    {providers.map(p => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={formStyles.group}>
                                <label style={formStyles.label}>Consumer Number / Account ID</label>
                                <input 
                                    type="text" 
                                    style={formStyles.input} 
                                    placeholder="e.g. 1234567890" 
                                    value={consumerNumber}
                                    onChange={(e) => setConsumerNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
                            <button 
                                type="submit" 
                                disabled={loading || !providerId || !consumerNumber}
                                style={{ ...formStyles.submitBtn, opacity: (loading || !providerId || !consumerNumber) ? 0.7 : 1 }}
                            >
                                {loading ? "Connecting..." : "Connect"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
            
            <style>{`
                .spin { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
}
