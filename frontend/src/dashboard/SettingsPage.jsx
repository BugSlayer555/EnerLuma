import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Settings, User, Bell, Shield, Zap,
    Droplets, Save, IndianRupee, Mail, Phone, MapPin, Key,
    Smartphone, Monitor, Lock, Camera, ChevronRight, Palette,
} from 'lucide-react'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const sidebarTabs = [
    { id: 'profile', label: 'Profile', icon: User, desc: 'Personal info & avatar' },
    { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alert preferences' },
    { id: 'thresholds', label: 'Thresholds', icon: Zap, desc: 'Usage limits & alerts' },
    { id: 'security', label: 'Security', icon: Lock, desc: 'Password & sessions' },
]

function ToggleSwitch({ enabled, onChange }) {
    return (
        <div
            className={`toggle-track ${enabled ? 'active' : 'inactive'}`}
            onClick={() => onChange(!enabled)}
        >
            <div className="toggle-thumb" />
        </div>
    )
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')
    const [notifStates, setNotifStates] = useState({
        email: true, push: true, weekly: true, ai: false, sound: false,
    })

    // Read user data from localStorage
    const storedUser = (() => {
        try {
            const raw = localStorage.getItem('enerluma_user')
            if (raw) return JSON.parse(raw)
        } catch { /* ignore */ }
        return { name: 'User', email: 'user@enerluma.com' }
    })()
    const userName = storedUser.name || 'User'
    const userEmail = storedUser.email || 'user@enerluma.com'
    const userInitial = userName.charAt(0).toUpperCase()

    const toggleNotif = (key) => {
        setNotifStates(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Page Header Banner */}
            <motion.div variants={fadeUp} className="page-banner" style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{
                            width: 52, height: 52, borderRadius: 16,
                            background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 14px rgba(20,184,166,0.25)',
                        }}>
                            <Settings style={{ width: 24, height: 24, color: '#fff' }} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f766e', margin: 0 }}>Settings</h1>
                            <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>
                                Manage your account, preferences and alert thresholds
                            </p>
                        </div>
                    </div>
                    <div className="stat-badge success" style={{ display: 'none' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                        All synced
                    </div>
                </div>
            </motion.div>

            {/* Main Layout: Sidebar Tabs + Content */}
            <motion.div variants={fadeUp} className="dash-grid-sidebar" style={{ gridTemplateColumns: '220px 1fr' }}>
                {/* Sidebar Navigation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sidebarTabs.map(t => {
                        const Icon = t.icon
                        const isActive = activeTab === t.id
                        return (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    padding: '14px 16px', borderRadius: 14, border: 'none',
                                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                                    background: isActive ? '#f0fdfa' : 'transparent',
                                    borderLeft: isActive ? '3px solid #14b8a6' : '3px solid transparent',
                                    boxShadow: isActive ? '0 2px 8px rgba(20,184,166,0.08)' : 'none',
                                }}
                            >
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10,
                                    background: isActive ? 'linear-gradient(135deg, #0f766e, #14b8a6)' : '#f3f4f6',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s', flexShrink: 0,
                                }}>
                                    <Icon style={{
                                        width: 16, height: 16,
                                        color: isActive ? '#fff' : '#9ca3af',
                                    }} />
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: 13, fontWeight: 600, margin: 0,
                                        color: isActive ? '#0f766e' : '#4b5563',
                                    }}>{t.label}</p>
                                    <p style={{
                                        fontSize: 10, margin: '2px 0 0',
                                        color: isActive ? '#14b8a6' : '#9ca3af',
                                    }}>{t.desc}</p>
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Tab Content */}
                <div>
                    {/* ──────── PROFILE TAB ──────── */}
                    {activeTab === 'profile' && (
                        <div className="card-elevated" style={{ padding: 0, overflow: 'hidden' }}>
                            {/* Cover / Avatar Section */}
                            <div style={{
                                background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 60%, #e0f2fe 100%)',
                                padding: '32px 36px 24px', position: 'relative',
                            }}>
                                {/* Decorative dots */}
                                <div style={{
                                    position: 'absolute', top: 16, right: 20,
                                    display: 'grid', gridTemplateColumns: 'repeat(5, 6px)', gap: 8, opacity: 0.3,
                                }}>
                                    {Array.from({ length: 15 }).map((_, i) => (
                                        <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#0f766e' }} />
                                    ))}
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                    <div style={{ position: 'relative' }}>
                                        <div style={{
                                            width: 80, height: 80, borderRadius: 22,
                                            background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            boxShadow: '0 8px 24px rgba(20,184,166,0.25)',
                                            border: '4px solid #fff',
                                        }}>
                                            <span style={{ color: '#fff', fontSize: 28, fontWeight: 800 }}>{userInitial}</span>
                                        </div>
                                        <button style={{
                                            position: 'absolute', bottom: -4, right: -4,
                                            width: 28, height: 28, borderRadius: 8,
                                            background: '#fff', border: '2px solid #e5e7eb',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                        }}>
                                            <Camera style={{ width: 12, height: 12, color: '#6b7280' }} />
                                        </button>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>{userName}</h2>
                                        <p style={{ fontSize: 13, color: '#6b7280', margin: '4px 0 0' }}>{userEmail}</p>
                                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                            <span className="stat-badge success">
                                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16a34a' }} />
                                                Active
                                            </span>
                                            <span className="stat-badge info">Admin</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Fields */}
                            <div style={{ padding: '28px 36px 36px' }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#374151', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <User style={{ width: 14, height: 14, color: '#14b8a6' }} />
                                    Personal Information
                                </h3>

                                <div className="settings-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                                    <div className="form-group">
                                        <label className="form-label"><User style={{ width: 12, height: 12 }} /> Full Name</label>
                                        <input type="text" defaultValue={userName} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"><Mail style={{ width: 12, height: 12 }} /> Email</label>
                                        <input type="email" defaultValue={userEmail} className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"><Phone style={{ width: 12, height: 12 }} /> Phone</label>
                                        <input type="tel" defaultValue="+91 98765 43210" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label"><MapPin style={{ width: 12, height: 12 }} /> Location</label>
                                        <input type="text" defaultValue="Bangalore, India" className="form-input" />
                                    </div>
                                </div>

                                <div className="section-divider" />

                                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#374151', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Palette style={{ width: 14, height: 14, color: '#14b8a6' }} />
                                    Preferences
                                </h3>

                                <div className="settings-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                                    <div className="form-group">
                                        <label className="form-label">Language</label>
                                        <select className="form-input" defaultValue="English" style={{ cursor: 'pointer' }}>
                                            <option>English</option>
                                            <option>Hindi</option>
                                            <option>Tamil</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Timezone</label>
                                        <select className="form-input" defaultValue="IST (UTC+5:30)" style={{ cursor: 'pointer' }}>
                                            <option>IST (UTC+5:30)</option>
                                            <option>UTC</option>
                                            <option>EST (UTC-5)</option>
                                        </select>
                                    </div>
                                </div>

                                <button className="btn-primary">
                                    <Save style={{ width: 15, height: 15 }} /> Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ──────── NOTIFICATIONS TAB ──────── */}
                    {activeTab === 'notifications' && (
                        <div className="card-elevated" style={{ padding: '32px 36px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                                <div>
                                    <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Bell style={{ width: 16, height: 16, color: '#d97706' }} />
                                        </div>
                                        Notification Preferences
                                    </h2>
                                    <p style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0 0 42px' }}>Control how and when you receive alerts</p>
                                </div>
                                <span className="stat-badge success">3 Active</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    { key: 'email', label: 'Email Notifications', desc: 'Receive alert summaries via email', icon: Mail, iconBg: '#eff6ff', iconColor: '#3b82f6' },
                                    { key: 'push', label: 'Push Notifications', desc: 'Browser push for critical alerts', icon: Monitor, iconBg: '#f0fdf4', iconColor: '#16a34a' },
                                    { key: 'weekly', label: 'Weekly Report', desc: 'Automated weekly consumption report', icon: Bell, iconBg: '#fef3c7', iconColor: '#d97706' },
                                    { key: 'ai', label: 'AI Recommendations', desc: 'Get notified of new AI insights', icon: Zap, iconBg: '#fdf2f8', iconColor: '#ec4899' },
                                    { key: 'sound', label: 'Sound Alerts', desc: 'Audio ping for critical alerts', icon: Smartphone, iconBg: '#f5f3ff', iconColor: '#7c3aed' },
                                ].map(n => {
                                    const NIcon = n.icon
                                    return (
                                        <div key={n.key} style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '18px 20px', borderRadius: 16,
                                            background: notifStates[n.key] ? '#fafffe' : '#f9fafb',
                                            border: notifStates[n.key] ? '1px solid rgba(20,184,166,0.15)' : '1px solid #f3f4f6',
                                            transition: 'all 0.2s',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                                <div style={{
                                                    width: 40, height: 40, borderRadius: 12,
                                                    background: n.iconBg,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <NIcon style={{ width: 18, height: 18, color: n.iconColor }} />
                                                </div>
                                                <div>
                                                    <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: 0 }}>{n.label}</p>
                                                    <p style={{ fontSize: 12, color: '#9ca3af', margin: '3px 0 0' }}>{n.desc}</p>
                                                </div>
                                            </div>
                                            <ToggleSwitch
                                                enabled={notifStates[n.key]}
                                                onChange={() => toggleNotif(n.key)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* ──────── THRESHOLDS TAB ──────── */}
                    {activeTab === 'thresholds' && (
                        <div className="card-elevated" style={{ padding: '32px 36px' }}>
                            <div style={{ marginBottom: 28 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Zap style={{ width: 16, height: 16, color: '#d97706' }} />
                                    </div>
                                    Alert Thresholds
                                </h2>
                                <p style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0 0 42px' }}>Set consumption limits that trigger alerts</p>
                            </div>

                            <div className="settings-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                                {[
                                    { label: 'Energy Daily Limit', unit: 'kWh', value: 30, icon: Zap, iconBg: '#fef3c7', iconColor: '#d97706' },
                                    { label: 'Water Daily Limit', unit: 'L', value: 200, icon: Droplets, iconBg: '#ecfeff', iconColor: '#0891b2' },
                                    { label: 'Monthly Budget', unit: '₹', value: 2000, icon: IndianRupee, iconBg: '#f0fdf4', iconColor: '#16a34a' },
                                ].map(t => {
                                    const TIcon = t.icon
                                    return (
                                        <div key={t.label} style={{
                                            padding: 20, background: '#f9fafb', borderRadius: 16,
                                            border: '1px solid #f3f4f6',
                                        }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: 8, background: t.iconBg,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <TIcon style={{ width: 14, height: 14, color: t.iconColor }} />
                                                </div>
                                                {t.label} ({t.unit})
                                            </label>
                                            <input type="number" defaultValue={t.value} className="form-input" />
                                        </div>
                                    )
                                })}
                                <div style={{
                                    padding: 20, background: '#f9fafb', borderRadius: 16,
                                    border: '1px solid #f3f4f6',
                                }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>
                                        <div style={{
                                            width: 28, height: 28, borderRadius: 8, background: '#f5f3ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Shield style={{ width: 14, height: 14, color: '#7c3aed' }} />
                                        </div>
                                        Anomaly Sensitivity
                                    </label>
                                    <select defaultValue="High (2σ)" className="form-input" style={{ cursor: 'pointer' }}>
                                        <option>High (2σ)</option>
                                        <option>Medium (3σ)</option>
                                        <option>Low (4σ)</option>
                                    </select>
                                </div>
                            </div>

                            <button className="btn-primary">
                                <Save style={{ width: 15, height: 15 }} /> Save Thresholds
                            </button>
                        </div>
                    )}

                    {/* ──────── SECURITY TAB ──────── */}
                    {activeTab === 'security' && (
                        <div className="card-elevated" style={{ padding: '32px 36px' }}>
                            <div style={{ marginBottom: 28 }}>
                                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 10, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Lock style={{ width: 16, height: 16, color: '#ef4444' }} />
                                    </div>
                                    Security Settings
                                </h2>
                                <p style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0 0 42px' }}>Manage your password and active sessions</p>
                            </div>

                            {/* Change Password */}
                            <div style={{ marginBottom: 28 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <Key style={{ width: 14, height: 14, color: '#14b8a6' }} /> Change Password
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
                                    <div className="form-group">
                                        <label className="form-label">Current Password</label>
                                        <input type="password" placeholder="••••••••" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">New Password</label>
                                        <input type="password" placeholder="••••••••" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" placeholder="••••••••" className="form-input" />
                                    </div>
                                </div>
                                <button className="btn-primary" style={{ marginTop: 20 }}>
                                    <Lock style={{ width: 14, height: 14 }} /> Update Password
                                </button>
                            </div>

                            <div className="section-divider" />

                            {/* Active Sessions */}
                            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Monitor style={{ width: 14, height: 14, color: '#14b8a6' }} /> Active Sessions
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    { device: 'Chrome on Windows', location: 'Bangalore, India', time: 'Active now', current: true },
                                    { device: 'Safari on iPhone', location: 'Bangalore, India', time: '2 hours ago', current: false },
                                ].map(s => (
                                    <div key={s.device} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '16px 20px', borderRadius: 14,
                                        background: s.current ? '#fafffe' : '#f9fafb',
                                        border: s.current ? '1px solid rgba(20,184,166,0.2)' : '1px solid #f3f4f6',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <div style={{
                                                width: 36, height: 36, borderRadius: 10, background: '#f3f4f6',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <Monitor style={{ width: 16, height: 16, color: '#6b7280' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', margin: 0 }}>
                                                    {s.device} {s.current && <span style={{ fontSize: 10, color: '#16a34a', fontWeight: 700 }}>• Current</span>}
                                                </p>
                                                <p style={{ fontSize: 11, color: '#9ca3af', margin: '2px 0 0' }}>{s.location} · {s.time}</p>
                                            </div>
                                        </div>
                                        {!s.current && (
                                            <button style={{
                                                padding: '6px 14px', fontSize: 11, fontWeight: 600,
                                                color: '#ef4444', background: '#fef2f2', border: '1px solid #fecaca',
                                                borderRadius: 8, cursor: 'pointer',
                                            }}>Revoke</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}
