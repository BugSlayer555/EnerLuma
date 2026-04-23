import { layout, colors } from "../DashboardStyles";
import { LogOut } from "lucide-react";

export default function Sidebar({ navGroups, activeTab, onTabChange, onLogout }) {
    return (
        <aside style={layout.sidebar} className="dash-sidebar">
            {/* Logo */}
            <div style={layout.sidebarLogo}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: colors.primaryLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 12, height: 12, background: colors.white, borderRadius: "50%" }} />
                </div>
                <div>
                    <div style={layout.sidebarLogoText}>EnerLuma</div>
                    <div style={layout.sidebarLogoSub}>Smart Dashboard</div>
                </div>
            </div>

            {/* Nav */}
            <nav style={layout.sidebarNav}>
                {navGroups.map((group, gIdx) => (
                    <div key={gIdx} style={{ marginBottom: 16 }}>
                        <div style={layout.sidebarNavLabel}>{group.title}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                            {group.items.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => onTabChange(id)}
                                    style={{
                                        ...layout.navItem,
                                        ...(activeTab === id ? layout.navItemActive : {}),
                                    }}
                                >
                                    <Icon size={18} color={activeTab === id ? colors.primary : colors.textMuted} />
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer Eco Score */}
            <div style={layout.sidebarFooter}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: colors.textSecondary }}>Eco Score</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: colors.primary }}>87</span>
                </div>
                <div style={{ width: "100%", height: 6, background: colors.border, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "87%", height: "100%", background: colors.primary, borderRadius: 3 }} />
                </div>
                <button
                    onClick={onLogout}
                    style={{
                        marginTop: 24,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: colors.textMuted,
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                        width: "100%",
                        padding: "8px 0"
                    }}
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
