import { useState } from "react";
import { Bell, Search, ChevronDown, LogOut, User, Settings, Menu, X } from "lucide-react";
import { layout, colors } from "../DashboardStyles";

export default function TopBar({ userName, onMenuToggle, onLogout }) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header style={layout.topBar}>
            {/* Mobile hamburger + Search */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                {/* Hamburger — only visible on mobile via CSS */}
                <button
                    className="dash-mobile-btn"
                    onClick={onMenuToggle}
                    style={{
                        background: "none",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        padding: "6px 10px",
                        cursor: "pointer",
                        alignItems: "center",
                        color: colors.textSecondary,
                        flexShrink: 0,
                        gap: 6,
                    }}
                    aria-label="Toggle menu"
                >
                    <Menu size={20} />
                </button>

                {/* Search */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: colors.bg,
                    padding: "8px 16px",
                    borderRadius: 8,
                    width: "300px",
                    maxWidth: "100%",
                    border: `1px solid ${colors.border}`,
                }}>
                    <Search size={16} color={colors.textMuted} />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        style={{ border: "none", background: "transparent", outline: "none", fontSize: "0.85rem", width: "100%", color: colors.text }}
                    />
                    <div style={{
                        background: colors.cardBorder,
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontSize: "0.6rem",
                        color: colors.textMuted,
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                    }}>⌘K</div>
                </div>
            </div>

            {/* Profile & Notifications */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {/* Bell */}
                <button
                    style={{
                        background: "none",
                        border: `1px solid ${colors.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: 36, height: 36, borderRadius: "50%",
                        cursor: "pointer", position: "relative",
                    }}
                    aria-label="Notifications"
                >
                    <Bell size={18} color={colors.textSecondary} />
                    <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, background: colors.error, borderRadius: "50%" }} />
                </button>

                {/* Profile dropdown */}
                <div style={{ position: "relative" }}>
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", background: "none", border: "none", padding: "4px 8px", borderRadius: 8 }}
                    >
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryMedium})`,
                            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: 700, fontSize: "0.9rem", flexShrink: 0,
                        }}>
                            {userName ? userName.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: colors.text, whiteSpace: "nowrap" }}>{userName || "User"}</div>
                            <div style={{ fontSize: "0.7rem", color: colors.textMuted }}>Member</div>
                        </div>
                        <ChevronDown size={14} color={colors.textMuted} style={{ transition: "transform 0.2s", transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>

                    {showProfileMenu && (
                        <div style={{
                            position: "absolute", top: "calc(100% + 8px)", right: 0,
                            background: colors.white, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                            border: `1px solid ${colors.border}`, minWidth: 180, zIndex: 999, overflow: "hidden",
                            animation: "fadeInUp 0.15s ease",
                        }}>
                            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${colors.border}` }}>
                                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: colors.text }}>{userName}</div>
                                <div style={{ fontSize: "0.72rem", color: colors.textMuted, marginTop: 2 }}>EnerLuma Member</div>
                            </div>
                            <div style={{ padding: "8px 0" }}>
                                <button
                                    onClick={() => setShowProfileMenu(false)}
                                    style={{ width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: colors.textSecondary, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                                >
                                    <User size={16} color={colors.textMuted} /> Profile
                                </button>
                                <button
                                    onClick={() => setShowProfileMenu(false)}
                                    style={{ width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: colors.textSecondary, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                                >
                                    <Settings size={16} color={colors.textMuted} /> Settings
                                </button>
                                <div style={{ height: 1, background: colors.border, margin: "4px 0" }} />
                                <button
                                    onClick={() => { setShowProfileMenu(false); onLogout?.(); }}
                                    style={{ width: "100%", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: colors.error, background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                                >
                                    <LogOut size={16} color={colors.error} /> Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Click away to close profile menu */}
            {showProfileMenu && (
                <div
                    style={{ position: "fixed", inset: 0, zIndex: 998 }}
                    onClick={() => setShowProfileMenu(false)}
                />
            )}
        </header>
    );
}
