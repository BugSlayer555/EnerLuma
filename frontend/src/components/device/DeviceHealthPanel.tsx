import { motion } from 'framer-motion'
import { Heart, Calendar, Wrench, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import type { DeviceHealthStatus } from '@/types/device.types'

const statusConfig = {
    good: { color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle, label: 'Good' },
    warning: { color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-600', icon: AlertTriangle, label: 'Warning' },
    critical: { color: '#ef4444', bg: 'bg-red-50', text: 'text-red-500', icon: XCircle, label: 'Critical' },
}

const overallStatusConfig = {
    healthy: { color: '#10b981', bg: 'bg-emerald-50', label: 'Healthy', icon: CheckCircle },
    degraded: { color: '#f59e0b', bg: 'bg-amber-50', label: 'Degraded', icon: AlertTriangle },
    critical: { color: '#ef4444', bg: 'bg-red-50', label: 'Critical', icon: XCircle },
}

interface Props {
    health: DeviceHealthStatus
}

export default function DeviceHealthPanel({ health }: Props) {
    const overall = overallStatusConfig[health.status]
    const OverallIcon = overall.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
        >
            <div className="flex items-center gap-2 mb-5">
                <Heart className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-bold text-gray-900">Device Health</h3>
            </div>

            {/* Overall Health Gauge */}
            <div className="flex items-center gap-5 mb-5">
                <div className="relative w-24 h-24 flex items-center justify-center flex-shrink-0">
                    <svg width="96" height="96" className="-rotate-90">
                        <circle cx="48" cy="48" r="38" fill="none" stroke="#f1f5f9" strokeWidth="7" />
                        <circle cx="48" cy="48" r="38" fill="none"
                            stroke={overall.color} strokeWidth="7" strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 38}
                            strokeDashoffset={2 * Math.PI * 38 * (1 - health.overallHealth / 100)}
                            style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
                    </svg>
                    <div className="absolute text-center">
                        <span className="text-xl font-black" style={{ color: overall.color }}>{health.overallHealth}</span>
                        <span className="block text-[9px] text-gray-400">/ 100</span>
                    </div>
                </div>

                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${overall.bg}`}>
                            <OverallIcon className="w-3.5 h-3.5" style={{ color: overall.color }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: overall.color }}>{overall.label}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Last Checkup: <span className="text-gray-700 font-medium">{health.lastCheckup}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Wrench className="w-3 h-3" />
                        <span>Next Maintenance: <span className="text-gray-700 font-medium">{health.nextMaintenance}</span></span>
                    </div>
                </div>
            </div>

            {/* Component Health Bars */}
            <div className="space-y-3">
                <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Component Health</h4>
                {health.components.map((comp, i) => {
                    const cfg = statusConfig[comp.status]
                    const StatusIcon = cfg.icon
                    return (
                        <motion.div key={comp.name}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.06 }}
                        >
                            <div className="flex items-center justify-between text-[10px] mb-1">
                                <div className="flex items-center gap-1.5">
                                    <StatusIcon className="w-3 h-3" style={{ color: cfg.color }} />
                                    <span className="text-gray-700 font-medium">{comp.name}</span>
                                </div>
                                <span className="font-bold" style={{ color: cfg.color }}>{comp.health}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${comp.health}%` }}
                                    transition={{ duration: 0.8, delay: 0.35 + i * 0.06 }}
                                    className="h-full rounded-full"
                                    style={{ background: cfg.color }}
                                />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
