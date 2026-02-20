import { motion } from 'framer-motion'
import { Cpu, Wifi, WifiOff, AlertTriangle, Clock, Heart } from 'lucide-react'
import type { DeviceHealth } from '@/types/alerts.types'

const statusConfig: Record<string, { color: string; bg: string; label: string; icon: typeof Wifi }> = {
    online: { color: '#10b981', bg: '#ecfdf5', label: 'Online', icon: Wifi },
    offline: { color: '#ef4444', bg: '#fef2f2', label: 'Offline', icon: WifiOff },
    degraded: { color: '#f59e0b', bg: '#fffbeb', label: 'Degraded', icon: AlertTriangle },
    maintenance: { color: '#6366f1', bg: '#eef2ff', label: 'Maintenance', icon: Clock },
}

const metricStatusColor: Record<string, string> = {
    good: '#10b981',
    warning: '#f59e0b',
    critical: '#ef4444',
}

interface Props { devices: DeviceHealth[] }

export default function DeviceHealthMonitor({ devices }: Props) {
    const onlineCount = devices.filter(d => d.status === 'online').length
    const totalHealth = Math.round(devices.reduce((s, d) => s + d.healthScore, 0) / devices.length)

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-5 h-5 text-cyan-500" />
                <h2 className="text-lg font-bold text-gray-900">Device Health Monitor</h2>
                <span className="text-[10px] text-gray-500 ml-auto">{onlineCount}/{devices.length} online • Avg health: {totalHealth}%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {devices.map((d, i) => {
                    const st = statusConfig[d.status]
                    const StatusIcon = st.icon
                    const healthColor = d.healthScore >= 80 ? '#10b981' : d.healthScore >= 50 ? '#f59e0b' : '#ef4444'

                    return (
                        <motion.div
                            key={d.id}
                            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.06 }}
                            className="rounded-xl p-4 group hover:scale-[1.01] transition-transform bg-white shadow-sm"
                            style={{
                                border: `1px solid ${d.status === 'offline' ? '#fca5a5' : '#e2e8f0'}`,
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">{d.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-bold text-gray-900 truncate">{d.name}</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="flex items-center gap-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full"
                                            style={{ color: st.color, background: st.bg }}>
                                            <StatusIcon className="w-3 h-3" />
                                            {st.label}
                                        </span>
                                        <span className="text-[9px] text-gray-500">Ping: {d.lastPing}</span>
                                    </div>
                                </div>

                                {/* Health score ring */}
                                <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                                    <svg width="48" height="48" className="-rotate-90">
                                        <circle cx="24" cy="24" r="18" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                                        <circle cx="24" cy="24" r="18" fill="none" stroke={healthColor}
                                            strokeWidth="3" strokeLinecap="round"
                                            strokeDasharray={2 * Math.PI * 18}
                                            strokeDashoffset={2 * Math.PI * 18 * (1 - d.healthScore / 100)}
                                            style={{ transition: 'stroke-dashoffset 1s ease' }} />
                                    </svg>
                                    <span className="absolute text-[10px] font-extrabold" style={{ color: healthColor }}>
                                        {d.healthScore}
                                    </span>
                                </div>
                            </div>

                            {/* Uptime */}
                            <div className="flex items-center gap-2 mb-3 text-[10px]">
                                <Heart className="w-3 h-3 text-pink-500" />
                                <span className="text-gray-500">Uptime: <span className="text-gray-900 font-semibold">{d.uptime}</span></span>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-2 mb-3">
                                {d.metrics.map(m => (
                                    <div key={m.label} className="p-2 rounded-lg text-center" style={{ background: `${metricStatusColor[m.status]}15` }}>
                                        <span className="text-[9px] text-gray-500 block">{m.label}</span>
                                        <span className="text-xs font-bold" style={{ color: metricStatusColor[m.status] }}>{m.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Issues */}
                            {d.issues.length > 0 && (
                                <div className="space-y-1">
                                    {d.issues.map((issue, j) => (
                                        <div key={j} className="flex items-center gap-1.5">
                                            <AlertTriangle className="w-3 h-3 text-amber-500 flex-shrink-0" />
                                            <span className="text-[10px] text-gray-600">{issue}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {d.issues.length === 0 && (
                                <p className="text-[10px] text-emerald-600">✓ No issues detected</p>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
