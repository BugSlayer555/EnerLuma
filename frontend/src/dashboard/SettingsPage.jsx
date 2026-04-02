import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Settings, User, Bell, Shield, Zap,
    Droplets, Save, IndianRupee, Mail, Phone, MapPin, Key, Smartphone, Monitor, Lock,
} from 'lucide-react'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'thresholds', label: 'Thresholds', icon: Zap },
    { id: 'security', label: 'Security', icon: Shield },
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')

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

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" style={{ maxWidth: 920, margin: '0 auto' }}>
            {/* Header */}
            <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: 10, margin: 0 }}>
                    <div style={{ padding: 10, borderRadius: 14, background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)' }}>
                        <Settings style={{ width: 22, height: 22, color: '#3b82f6' }} />
                    </div>
                    Settings
                </h1>
                <p style={{ fontSize: 14, color: '#9ca3af', marginTop: 6 }}>Configure your dashboard preferences and account</p>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: 5, background: '#f3f4f6', borderRadius: 14, width: 'fit-content', marginBottom: 28 }}>
                {tabs.map(t => {
                    const Icon = t.icon
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 7,
                                padding: '10px 20px', fontSize: 13, fontWeight: 600,
                                borderRadius: 10, border: 'none', cursor: 'pointer',
                                transition: 'all 0.2s',
                                background: activeTab === t.id ? '#fff' : 'transparent',
                                boxShadow: activeTab === t.id ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                                color: activeTab === t.id ? '#1f2937' : '#9ca3af',
                            }}
                        >
                            <Icon style={{ width: 15, height: 15 }} /> {t.label}
                        </button>
                    )
                })}
            </motion.div>

            {/* Tab Content */}
            <motion.div variants={fadeUp}>

                {/* ──────── PROFILE TAB ──────── */}
                {activeTab === 'profile' && (
                    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f3f4f6', padding: 32 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <User style={{ width: 16, height: 16, color: '#6366f1' }} />
                            Profile Information
                        </h2>

                        {/* Avatar Row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 32, padding: 20, background: '#f9fafb', borderRadius: 16 }}>
                            <div style={{
                                width: 64, height: 64, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: 'linear-gradient(135deg, #10b981, #14b8a6)', flexShrink: 0,
                            }}>
                                <span style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>{userInitial}</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: 17, fontWeight: 700, color: '#1f2937', margin: 0 }}>{userName}</p>
                                <p style={{ fontSize: 13, color: '#9ca3af', margin: '4px 0 0' }}>{userEmail}</p>
                            </div>
                            <button style={{
                                padding: '9px 16px', fontSize: 13, fontWeight: 600,
                                background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
                                color: '#6b7280', cursor: 'pointer',
                            }}>
                                Change Avatar
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                            {[
                                { label: 'Full Name', type: 'text', value: userName, icon: User },
                                { label: 'Email', type: 'email', value: userEmail, icon: Mail },
                                { label: 'Phone', type: 'tel', value: '+91 98765 43210', icon: Phone },
                                { label: 'Location', type: 'text', value: 'Bangalore, India', icon: MapPin },
                            ].map(f => {
                                const FIcon = f.icon
                                return (
                                    <div key={f.label}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                            <FIcon style={{ width: 12, height: 12 }} /> {f.label}
                                        </label>
                                        <input
                                            type={f.type}
                                            defaultValue={f.value}
                                            style={{
                                                width: '100%', padding: '12px 14px', fontSize: 14,
                                                border: '1px solid #e5e7eb', borderRadius: 12,
                                                outline: 'none', color: '#374151', background: '#fff',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', fontSize: 14, fontWeight: 600,
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff',
                            border: 'none', borderRadius: 12, cursor: 'pointer',
                        }}>
                            <Save style={{ width: 15, height: 15 }} /> Save Changes
                        </button>
                    </div>
                )}

                {/* ──────── NOTIFICATIONS TAB ──────── */}
                {activeTab === 'notifications' && (
                    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f3f4f6', padding: 32 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Bell style={{ width: 16, height: 16, color: '#f59e0b' }} />
                            Notification Preferences
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {[
                                { label: 'Email Notifications', desc: 'Receive alert summaries via email', enabled: true, icon: Mail },
                                { label: 'Push Notifications', desc: 'Browser push for critical alerts', enabled: true, icon: Monitor },
                                { label: 'Weekly Report', desc: 'Automated weekly consumption report', enabled: true, icon: Bell },
                                { label: 'AI Recommendations', desc: 'Get notified of new AI insights', enabled: false, icon: Zap },
                                { label: 'Sound Alerts', desc: 'Audio ping for critical alerts', enabled: false, icon: Smartphone },
                            ].map(n => {
                                const NIcon = n.icon
                                return (
                                    <div key={n.label} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '18px 20px', borderRadius: 14, background: '#f9fafb',
                                        transition: 'background 0.15s',
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{ padding: 8, borderRadius: 10, background: '#fff', border: '1px solid #f3f4f6' }}>
                                                <NIcon style={{ width: 15, height: 15, color: '#6b7280' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: 0 }}>{n.label}</p>
                                                <p style={{ fontSize: 12, color: '#9ca3af', margin: '3px 0 0' }}>{n.desc}</p>
                                            </div>
                                        </div>
                                        <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                                            <input type="checkbox" defaultChecked={n.enabled} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                                                onChange={e => {
                                                    const dot = e.target.nextElementSibling
                                                    if (e.target.checked) {
                                                        dot.style.background = '#3b82f6'
                                                        dot.querySelector('span').style.transform = 'translateX(20px)'
                                                    } else {
                                                        dot.style.background = '#d1d5db'
                                                        dot.querySelector('span').style.transform = 'translateX(0)'
                                                    }
                                                }}
                                            />
                                            <div style={{
                                                width: 44, height: 24, borderRadius: 12,
                                                background: n.enabled ? '#3b82f6' : '#d1d5db',
                                                transition: 'background 0.2s', position: 'relative',
                                            }}>
                                                <span style={{
                                                    position: 'absolute', top: 2, left: 2,
                                                    width: 20, height: 20, borderRadius: '50%',
                                                    background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                                                    transition: 'transform 0.2s',
                                                    transform: n.enabled ? 'translateX(20px)' : 'translateX(0)',
                                                }} />
                                            </div>
                                        </label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* ──────── THRESHOLDS TAB ──────── */}
                {activeTab === 'thresholds' && (
                    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f3f4f6', padding: 32 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Zap style={{ width: 16, height: 16, color: '#f59e0b' }} />
                            Alert Thresholds
                        </h2>
                        <p style={{ fontSize: 13, color: '#9ca3af', margin: '0 0 28px' }}>Set consumption limits that trigger alerts</p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                            {[
                                { label: 'Energy Daily Limit', unit: 'kWh', value: 30, icon: Zap, iconColor: '#f59e0b' },
                                { label: 'Water Daily Limit', unit: 'L', value: 200, icon: Droplets, iconColor: '#06b6d4' },
                                { label: 'Monthly Budget', unit: '₹', value: 2000, icon: IndianRupee, iconColor: '#10b981' },
                            ].map(t => {
                                const TIcon = t.icon
                                return (
                                    <div key={t.label} style={{ padding: 20, background: '#f9fafb', borderRadius: 16 }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 10 }}>
                                            <TIcon style={{ width: 14, height: 14, color: t.iconColor }} />
                                            {t.label} ({t.unit})
                                        </label>
                                        <input
                                            type="number"
                                            defaultValue={t.value}
                                            style={{
                                                width: '100%', padding: '12px 14px', fontSize: 14,
                                                border: '1px solid #e5e7eb', borderRadius: 12,
                                                outline: 'none', color: '#374151', background: '#fff',
                                                boxSizing: 'border-box',
                                            }}
                                        />
                                    </div>
                                )
                            })}
                            <div style={{ padding: 20, background: '#f9fafb', borderRadius: 16 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 10 }}>
                                    <Shield style={{ width: 14, height: 14, color: '#8b5cf6' }} />
                                    Anomaly Sensitivity
                                </label>
                                <select
                                    defaultValue="High (2σ)"
                                    style={{
                                        width: '100%', padding: '12px 14px', fontSize: 14,
                                        border: '1px solid #e5e7eb', borderRadius: 12,
                                        outline: 'none', color: '#374151', background: '#fff',
                                        boxSizing: 'border-box', cursor: 'pointer',
                                    }}
                                >
                                    <option>High (2σ)</option>
                                    <option>Medium (3σ)</option>
                                    <option>Low (4σ)</option>
                                </select>
                            </div>
                        </div>

                        <button style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            padding: '12px 24px', fontSize: 14, fontWeight: 600,
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff',
                            border: 'none', borderRadius: 12, cursor: 'pointer',
                        }}>
                            <Save style={{ width: 15, height: 15 }} /> Save Thresholds
                        </button>
                    </div>
                )}

                {/* ──────── SECURITY TAB ──────── */}
                {activeTab === 'security' && (
                    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #f3f4f6', padding: 32 }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Shield style={{ width: 16, height: 16, color: '#ef4444' }} />
                            Security Settings
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                {
                                    title: 'Two-Factor Authentication',
                                    desc: 'Add an extra layer of security with TOTP',
                                    icon: Lock,
                                    btnLabel: 'Enable',
                                    btnBg: '#eff6ff', btnColor: '#3b82f6', btnBorder: '1px solid #dbeafe',
                                },
                                {
                                    title: 'Change Password',
                                    desc: 'Last changed 30 days ago',
                                    icon: Key,
                                    btnLabel: 'Update',
                                    btnBg: '#fff', btnColor: '#6b7280', btnBorder: '1px solid #e5e7eb',
                                },
                                {
                                    title: 'Active Sessions',
                                    desc: '2 devices currently logged in',
                                    icon: Monitor,
                                    btnLabel: 'Manage',
                                    btnBg: '#fef2f2', btnColor: '#ef4444', btnBorder: '1px solid #fecaca',
                                },
                                {
                                    title: 'API Keys',
                                    desc: 'Manage API access for integrations',
                                    icon: Key,
                                    btnLabel: 'View Keys',
                                    btnBg: '#fff', btnColor: '#6b7280', btnBorder: '1px solid #e5e7eb',
                                },
                            ].map(s => {
                                const SIcon = s.icon
                                return (
                                    <div key={s.title} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '20px 22px', background: '#f9fafb', borderRadius: 16,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                            <div style={{ padding: 10, borderRadius: 12, background: '#fff', border: '1px solid #f3f4f6' }}>
                                                <SIcon style={{ width: 16, height: 16, color: '#6b7280' }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', margin: 0 }}>{s.title}</p>
                                                <p style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 0' }}>{s.desc}</p>
                                            </div>
                                        </div>
                                        <button style={{
                                            padding: '8px 18px', fontSize: 13, fontWeight: 600,
                                            background: s.btnBg, color: s.btnColor,
                                            border: s.btnBorder, borderRadius: 10, cursor: 'pointer',
                                        }}>
                                            {s.btnLabel}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}
