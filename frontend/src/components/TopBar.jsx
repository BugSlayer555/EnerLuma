import { Bell, Search, ChevronDown } from "lucide-react";
import { layout, colors } from "../pages/DashboardStyles";

export default function TopBar({ userName }) {
    return (
        <header style={layout.topBar}>
            {/* Search */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: colors.bg,
                    padding: "8px 16px",
                    borderRadius: 8,
                    width: "300px",
                    border: `1px solid ${colors.border}`
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
                        fontWeight: 600
                    }}>⌘K</div>
                </div>
            </div>

            {/* Profile & Notifications */}
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <button style={{ background: "none", border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", position: "relative" }}>
                    <Bell size={18} color={colors.textSecondary} />
                    <span style={{ position: "absolute", top: 8, right: 8, width: 6, height: 6, background: colors.error, borderRadius: "50%" }}></span>
                </button>
                
                <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: colors.primary, color: colors.white, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem" }}>
                        {userName ? userName.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: colors.text }}>{userName || "User"}</div>
                        <div style={{ fontSize: "0.7rem", color: colors.textMuted }}>Admin</div>
                    </div>
                    <ChevronDown size={16} color={colors.textMuted} />
                </div>
            </div>
        </header>
    );
}
