// ─── EnerLuma Dashboard Layout — Sidebar + Header + Content ──────────────────
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Zap,
    Droplets,
    Cpu,
    Bell,
    Lightbulb,
    Leaf,
    BarChart3,
    Settings,
    ShieldCheck,
    ChevronLeft,
    Search,
    ChevronDown,
    AlertTriangle,
    LogOut,
} from "lucide-react";

/* ─────────────────── NAV CONFIG ─────────────────── */

const navGroups = [
    {
        label: "MAIN",
        items: [
            { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
            { name: "Energy", icon: Zap, path: "/dashboard/energy" },
            { name: "Water", icon: Droplets, path: "/dashboard/water" },
            { name: "Devices", icon: Cpu, path: "/dashboard/devices" },
        ],
    },
    {
        label: "MONITORING",
        items: [
            { name: "Alerts", icon: AlertTriangle, path: "/dashboard/alerts", badge: 3 },
            { name: "AI Insights", icon: Lightbulb, path: "/dashboard/insights" },
            { name: "Sustainability", icon: Leaf, path: "/dashboard/sustainability" },
            { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
        ],
    },
    {
        label: "SYSTEM",
        items: [
            { name: "Settings", icon: Settings, path: "/dashboard/settings" },
            { name: "Admin", icon: ShieldCheck, path: "/dashboard/admin" },
        ],
    },
];

/* ─────────────────── SIDEBAR ─────────────────── */

function Sidebar({ collapsed, onToggle }) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sidebar"
        >
            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    <Leaf className="w-5 h-5 text-white" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            className="sidebar-brand-text"
                        >
                            <span className="sidebar-brand-name">EnerLuma</span>
                            <span className="sidebar-brand-sub">SMART DASHBOARD</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navGroups.map((group) => (
                    <div key={group.label} className="sidebar-group">
                        {!collapsed && (
                            <span className="sidebar-group-label">{group.label}</span>
                        )}
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className={`sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
                                    title={collapsed ? item.name : undefined}
                                >
                                    <Icon className="sidebar-item-icon" />
                                    {!collapsed && (
                                        <>
                                            <span className="sidebar-item-text">{item.name}</span>
                                            {item.badge && (
                                                <span className="sidebar-badge">{item.badge}</span>
                                            )}
                                        </>
                                    )}
                                    {collapsed && item.badge && (
                                        <span className="sidebar-badge-dot" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Collapse Toggle */}
            <button onClick={onToggle} className="sidebar-collapse-btn" title="Toggle sidebar">
                <ChevronLeft
                    className="w-4 h-4"
                    style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}
                />
            </button>

            {/* Eco Score */}
            <div className="sidebar-eco">
                <div className="sidebar-eco-icon">
                    <Leaf className="w-4 h-4 text-white" />
                </div>
                {!collapsed && (
                    <div className="sidebar-eco-content">
                        <span className="sidebar-eco-label">Eco Score</span>
                        <div className="sidebar-eco-bar">
                            <div className="sidebar-eco-fill" style={{ width: "87%" }} />
                        </div>
                    </div>
                )}
                {!collapsed && <span className="sidebar-eco-value">87</span>}
            </div>
        </motion.aside>
    );
}

/* ─────────────────── TOP HEADER ─────────────────── */

function Header() {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Get user info from token (basic decode)
    let userName = "User";
    try {
        const token = localStorage.getItem("enerluma_token");
        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            userName = payload.name || payload.email?.split("@")[0] || "User";
        }
    } catch { /* ignore */ }

    const handleLogout = () => {
        localStorage.removeItem("enerluma_token");
        navigate("/login");
    };

    return (
        <header className="dash-header">
            {/* Search */}
            <div className="dash-header-search">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search anything…"
                    className="dash-header-search-input"
                />
                <kbd className="dash-header-kbd">⌘K</kbd>
            </div>

            <div className="dash-header-right">
                {/* Notifications */}
                <button className="dash-header-icon-btn">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className="dash-header-notif-dot" />
                </button>

                {/* User Profile */}
                <div className="dash-header-user" onClick={() => setShowUserMenu((v) => !v)}>
                    <div className="dash-header-avatar">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <div className="dash-header-user-info">
                        <span className="dash-header-user-name">{userName}</span>
                        <span className="dash-header-user-role">Admin</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                    {showUserMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="dash-header-dropdown"
                        >
                            <button onClick={handleLogout} className="dash-header-dropdown-item">
                                <LogOut className="w-4 h-4" />
                                <span>Log Out</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

/* ─────────────────── LAYOUT WRAPPER ─────────────────── */

export default function DashboardLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="dash-layout">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
            <div className="dash-main">
                <Header />
                <div className="dash-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
