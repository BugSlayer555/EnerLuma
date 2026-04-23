import { useState, useEffect } from "react";
import { User, Mail, Phone, Shield, Bell, IndianRupee, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { cards, formStyles, colors } from "../DashboardStyles";

const API_BASE = "/api";

function getToken() {
    return localStorage.getItem("enerluma_token");
}

async function apiFetch(url, opts = {}) {
    const token = getToken();
    const headers = { ...opts.headers };
    if (token) headers.Authorization = `Bearer ${token}`;
    headers["Content-Type"] = "application/json";
    const res = await fetch(`${API_BASE}${url}`, { ...opts, headers });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Request failed");
    return data;
}

export default function SettingsTab({ userName, userEmail }) {
    // Profile state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    // Preferences state
    const [currency, setCurrency] = useState("INR");
    const [notifications, setNotifications] = useState(true);
    
    // Password state
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    // UI state
    const [profileMsg, setProfileMsg] = useState(null);
    const [prefMsg, setPrefMsg] = useState(null);
    const [passMsg, setPassMsg] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [prefLoading, setPrefLoading] = useState(false);
    const [passLoading, setPassLoading] = useState(false);

    // Load user data on mount
    useEffect(() => {
        async function loadUser() {
            try {
                const data = await apiFetch("/auth/me");
                const u = data.user;
                setName(u.name || "");
                setEmail(u.email || "");
                setPhone(u.phone || "");
                setCurrency(u.preferences?.currency || "INR");
                setNotifications(u.preferences?.notifications !== false);
            } catch (err) {
                console.error("Failed to load user:", err);
                // Fallback to props
                setName(userName || "");
                setEmail(userEmail || "");
            }
        }
        loadUser();
    }, [userName, userEmail]);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileMsg(null);
        try {
            await apiFetch("/settings/profile", {
                method: "PUT",
                body: JSON.stringify({ name, email, phone })
            });
            setProfileMsg({ type: "success", text: "Profile updated successfully!" });
        } catch (err) {
            setProfileMsg({ type: "error", text: err.message });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePrefSave = async (e) => {
        e.preventDefault();
        setPrefLoading(true);
        setPrefMsg(null);
        try {
            await apiFetch("/settings/preferences", {
                method: "PUT",
                body: JSON.stringify({ currency, notifications })
            });
            setPrefMsg({ type: "success", text: "Preferences saved!" });
        } catch (err) {
            setPrefMsg({ type: "error", text: err.message });
        } finally {
            setPrefLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPassMsg(null);
        
        if (newPassword !== confirmPassword) {
            setPassMsg({ type: "error", text: "New passwords do not match." });
            return;
        }
        if (newPassword.length < 8) {
            setPassMsg({ type: "error", text: "Password must be at least 8 characters." });
            return;
        }

        setPassLoading(true);
        try {
            await apiFetch("/settings/password", {
                method: "PUT",
                body: JSON.stringify({ currentPassword, newPassword })
            });
            setPassMsg({ type: "success", text: "Password changed successfully!" });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPassMsg({ type: "error", text: err.message });
        } finally {
            setPassLoading(false);
        }
    };

    const sectionCard = { ...cards.section, marginBottom: 0 };

    const toggleStyle = (active) => ({
        width: 48,
        height: 26,
        borderRadius: 13,
        background: active ? colors.primary : colors.border,
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        border: "none",
        padding: 0,
        flexShrink: 0,
    });

    const toggleDot = (active) => ({
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: colors.white,
        position: "absolute",
        top: 3,
        left: active ? 25 : 3,
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Profile Section */}
            <div style={sectionCard}>
                <div style={cards.sectionTitle}>
                    <User size={20} color={colors.primaryMedium} />
                    Profile Information
                </div>

                {profileMsg && (
                    <div style={profileMsg.type === "success" ? formStyles.successMsg : formStyles.errorMsg}>
                        {profileMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {profileMsg.text}
                    </div>
                )}

                <form onSubmit={handleProfileSave} style={{ marginTop: 16 }}>
                    <div style={formStyles.grid} className="dash-form-grid">
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>
                                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <User size={14} color={colors.textMuted} /> Full Name
                                </span>
                            </label>
                            <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={formStyles.input}
                                placeholder="Your full name"
                            />
                        </div>
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>
                                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <Mail size={14} color={colors.textMuted} /> Email Address
                                </span>
                            </label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={formStyles.input}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>
                                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <Phone size={14} color={colors.textMuted} /> Phone Number
                                </span>
                            </label>
                            <input 
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                style={formStyles.input}
                                placeholder="+91 XXXXX XXXXX"
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" disabled={profileLoading} style={{ ...formStyles.submitBtn, opacity: profileLoading ? 0.6 : 1 }}>
                            {profileLoading ? "Saving..." : "Save Profile"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Preferences Section */}
            <div style={sectionCard}>
                <div style={cards.sectionTitle}>
                    <IndianRupee size={20} color={colors.warning} />
                    Preferences
                </div>

                {prefMsg && (
                    <div style={prefMsg.type === "success" ? formStyles.successMsg : formStyles.errorMsg}>
                        {prefMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {prefMsg.text}
                    </div>
                )}

                <form onSubmit={handlePrefSave} style={{ marginTop: 16 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${colors.border}` }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: colors.text }}>Currency</div>
                                <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginTop: 2 }}>Choose your display currency for costs and bills</div>
                            </div>
                            <select 
                                value={currency} 
                                onChange={(e) => setCurrency(e.target.value)}
                                style={{ ...formStyles.select, width: 140 }}
                            >
                                <option value="INR">₹ INR</option>
                                <option value="USD">$ USD</option>
                                <option value="EUR">€ EUR</option>
                                <option value="GBP">£ GBP</option>
                            </select>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${colors.border}` }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: colors.text, display: "flex", alignItems: "center", gap: 6 }}>
                                    <Bell size={16} color={colors.textMuted} /> Notifications
                                </div>
                                <div style={{ fontSize: "0.8rem", color: colors.textMuted, marginTop: 2 }}>Receive alerts when thresholds are exceeded</div>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => setNotifications(!notifications)} 
                                style={toggleStyle(notifications)}
                            >
                                <div style={toggleDot(notifications)} />
                            </button>
                        </div>
                    </div>

                    <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" disabled={prefLoading} style={{ ...formStyles.submitBtn, opacity: prefLoading ? 0.6 : 1 }}>
                            {prefLoading ? "Saving..." : "Save Preferences"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Security Section */}
            <div style={sectionCard}>
                <div style={cards.sectionTitle}>
                    <Shield size={20} color={colors.error} />
                    Security
                </div>

                {passMsg && (
                    <div style={passMsg.type === "success" ? formStyles.successMsg : formStyles.errorMsg}>
                        {passMsg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        {passMsg.text}
                    </div>
                )}

                <form onSubmit={handlePasswordChange} style={{ marginTop: 16 }}>
                    <div style={formStyles.grid} className="dash-form-grid">
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Current Password</label>
                            <input 
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                style={formStyles.input}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>New Password</label>
                            <input 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={formStyles.input}
                                placeholder="Min 8 characters"
                                required
                            />
                        </div>
                        <div style={formStyles.group}>
                            <label style={formStyles.label}>Confirm New Password</label>
                            <input 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                style={formStyles.input}
                                placeholder="Re-enter new password"
                                required
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                        <button type="submit" disabled={passLoading} style={{ ...formStyles.submitBtn, background: colors.warning, opacity: passLoading ? 0.6 : 1 }}>
                            {passLoading ? "Updating..." : "Change Password"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Danger Zone */}
            <div style={{ ...sectionCard, border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                <div style={{ ...cards.sectionTitle, color: colors.error }}>
                    <Trash2 size={20} />
                    Danger Zone
                </div>
                <p style={{ fontSize: "0.85rem", color: colors.textSecondary, marginBottom: 16 }}>
                    Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                    onClick={() => {
                        if (window.confirm("Are you absolutely sure? This will permanently delete your account and all data.")) {
                            apiFetch("/settings/account", { method: "DELETE" })
                                .then(() => {
                                    localStorage.removeItem("enerluma_token");
                                    window.location.href = "/login";
                                })
                                .catch(err => alert("Failed: " + err.message));
                        }
                    }}
                    style={{
                        padding: "10px 20px",
                        background: "rgba(239, 68, 68, 0.1)",
                        color: colors.error,
                        border: `1px solid rgba(239, 68, 68, 0.3)`,
                        borderRadius: 8,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                    }}
                >
                    <Trash2 size={14} /> Delete Account
                </button>
            </div>

        </div>
    );
}
