import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Settings, User, Bell, Shield, Zap,
    Droplets, Palette, Globe, Save,
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
            if (raw) return JSON.parse(raw) as { name: string; email: string }
        } catch { /* ignore */ }
        return { name: 'User', email: 'user@enerluma.com' }
    })()
    const userName = storedUser.name
    const userEmail = storedUser.email
    const userInitial = userName.charAt(0).toUpperCase()

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[900px] mx-auto space-y-6">
            <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-primary-500" /> Settings
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">Configure your dashboard preferences and account</p>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeUp} className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === t.id ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <t.icon className="w-4 h-4" /> {t.label}
                    </button>
                ))}
            </motion.div>

            {/* Tab Content */}
            <motion.div variants={fadeUp}>
                {activeTab === 'profile' && (
                    <div className="card-static space-y-6">
                        <h2 className="section-title">Profile Information</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-eco-gradient rounded-2xl flex items-center justify-center">
                                <span className="text-white text-xl font-bold">{userInitial}</span>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-gray-800">{userName}</p>
                                <p className="text-sm text-gray-400">{userEmail}</p>
                            </div>
                            <button className="ml-auto px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-100">
                                Change Avatar
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                                <input type="text" defaultValue={userName} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                                <input type="email" defaultValue={userEmail} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                                <input type="tel" defaultValue="+91 98765 43210" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                                <input type="text" defaultValue="Bangalore, India" className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="card-static space-y-6">
                        <h2 className="section-title">Notification Preferences</h2>
                        {[
                            { label: 'Email Notifications', desc: 'Receive alert summaries via email', enabled: true },
                            { label: 'Push Notifications', desc: 'Browser push for critical alerts', enabled: true },
                            { label: 'Weekly Report', desc: 'Automated weekly consumption report', enabled: true },
                            { label: 'AI Recommendations', desc: 'Get notified of new AI insights', enabled: false },
                            { label: 'Sound Alerts', desc: 'Audio ping for critical alerts', enabled: false },
                        ].map(n => (
                            <div key={n.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{n.label}</p>
                                    <p className="text-xs text-gray-400">{n.desc}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={n.enabled} className="sr-only peer" />
                                    <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-200 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500" />
                                </label>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'thresholds' && (
                    <div className="card-static space-y-6">
                        <h2 className="section-title">Alert Thresholds</h2>
                        <p className="text-xs text-gray-400">Set consumption limits that trigger alerts</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
                                    <Zap className="w-3.5 h-3.5" /> Energy Daily Limit (kWh)
                                </label>
                                <input type="number" defaultValue={30} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
                                    <Droplets className="w-3.5 h-3.5" /> Water Daily Limit (L)
                                </label>
                                <input type="number" defaultValue={200} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
                                    Monthly Budget (₹)
                                </label>
                                <input type="number" defaultValue={2000} className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none" />
                            </div>
                            <div>
                                <label className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-1">
                                    Anomaly Sensitivity
                                </label>
                                <select className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none">
                                    <option>High (2σ)</option>
                                    <option>Medium (3σ)</option>
                                    <option>Low (4σ)</option>
                                </select>
                            </div>
                        </div>
                        <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                            <Save className="w-4 h-4" /> Save Thresholds
                        </button>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="card-static space-y-6">
                        <h2 className="section-title">Security Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                                    <p className="text-xs text-gray-400">Add an extra layer of security with TOTP</p>
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                                    Enable
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Change Password</p>
                                    <p className="text-xs text-gray-400">Last changed 30 days ago</p>
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    Update
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Active Sessions</p>
                                    <p className="text-xs text-gray-400">2 devices currently logged in</p>
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                    Manage
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <p className="text-sm font-medium text-gray-700">API Keys</p>
                                    <p className="text-xs text-gray-400">Manage API access for integrations</p>
                                </div>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                    View Keys
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}
