import { motion } from 'framer-motion'
import {
    ShieldCheck, Users, Activity, Database,
    Clock, AlertTriangle, CheckCircle, ArrowRight,
} from 'lucide-react'

const systemHealth = [
    { label: 'API Server', status: 'online', uptime: '99.97%', latency: '24ms' },
    { label: 'WebSocket', status: 'online', uptime: '99.95%', latency: '12ms' },
    { label: 'MongoDB', status: 'online', uptime: '99.99%', latency: '8ms' },
    { label: 'ML Engine', status: 'online', uptime: '99.80%', latency: '142ms' },
]

// Read user name from localStorage for audit logs
const currentUserName = (() => {
    try {
        const raw = localStorage.getItem('enerluma_user')
        if (raw) return (JSON.parse(raw) as { name: string }).name
    } catch { /* ignore */ }
    return 'User'
})()

const auditLogs = [
    { time: '10:42 AM', user: currentUserName, action: 'Updated threshold settings', type: 'config' },
    { time: '10:15 AM', user: 'System', action: 'Auto-generated monthly report', type: 'system' },
    { time: '9:30 AM', user: currentUserName, action: 'Acknowledged HVAC alert #42', type: 'alert' },
    { time: '8:00 AM', user: 'System', action: 'Scheduled device health check completed', type: 'system' },
    { time: 'Yesterday', user: 'Admin', action: 'Added new device: Smart Plug #3', type: 'device' },
    { time: 'Yesterday', user: 'System', action: 'Firmware update deployed to thermostat', type: 'system' },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function AdminPage() {
    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-6">
            <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-primary-500" /> Admin Panel
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">System health, user management, and audit logs</p>
            </motion.div>

            {/* System Overview KPIs */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Users, label: 'Active Users', value: '3', bg: 'bg-primary-50', color: 'text-primary-600' },
                    { icon: Activity, label: 'System Health', value: '100%', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                    { icon: Database, label: 'Data Points', value: '1.2M', bg: 'bg-cyan-50', color: 'text-cyan-600' },
                    { icon: Clock, label: 'Uptime', value: '99.97%', bg: 'bg-amber-50', color: 'text-amber-600' },
                ].map(kpi => (
                    <div key={kpi.label} className="kpi-card">
                        <div className={`p-2 rounded-xl ${kpi.bg} w-fit`}><kpi.icon className={`w-5 h-5 ${kpi.color}`} /></div>
                        <div className="mt-3"><span className="text-2xl font-bold text-gray-900">{kpi.value}</span></div>
                        <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* System Health + Audit Logs */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* System Services */}
                <div className="card-static">
                    <h2 className="section-title mb-4">System Services</h2>
                    <div className="space-y-3">
                        {systemHealth.map(s => (
                            <div key={s.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                <span className="text-sm font-medium text-gray-700 flex-1">{s.label}</span>
                                <span className="text-xs text-gray-400">{s.latency}</span>
                                <span className="text-xs font-semibold text-emerald-600">{s.uptime}</span>
                            </div>
                        ))}
                    </div>

                    <h2 className="section-title mt-6 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            { label: 'Restart Services', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                            { label: 'Clear Cache', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
                            { label: 'Run Diagnostics', color: 'bg-primary-50 text-primary-700 border-primary-200' },
                            { label: 'Export Logs', color: 'bg-gray-50 text-gray-700 border-gray-200' },
                        ].map(a => (
                            <button key={a.label} className={`p-3 text-sm font-medium rounded-xl border transition-colors hover:opacity-80 ${a.color}`}>
                                {a.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Audit Logs */}
                <div className="card-static">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="section-title">Audit Log</h2>
                        <span className="text-xs font-medium text-primary-600 cursor-pointer">View Full Log</span>
                    </div>
                    <div className="space-y-0">
                        {auditLogs.map((log, i) => (
                            <div key={i} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
                                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {log.type === 'alert' ? (
                                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                                    ) : log.type === 'system' ? (
                                        <Activity className="w-3.5 h-3.5 text-cyan-500" />
                                    ) : (
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700">{log.action}</p>
                                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                                        <span>{log.user}</span>
                                        <span>·</span>
                                        <span>{log.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
