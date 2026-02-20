import { motion } from 'framer-motion'
import { Wrench, Heart, AlertTriangle, Clock, DollarSign } from 'lucide-react'
import type { MaintenanceAlert } from '@/types/ai.types'

const urgencyColors: Record<string, string> = {
    critical: '#ef4444',
    high: '#f59e0b',
    medium: '#14b8a6',
    low: '#6366f1',
}

const statusLabels: Record<string, { label: string; color: string }> = {
    optimal: { label: 'Healthy', color: '#10b981' },
    degraded: { label: 'Degraded', color: '#f59e0b' },
    needs_attention: { label: 'Needs Attention', color: '#ef4444' },
    critical: { label: 'Critical', color: '#dc2626' },
}

interface Props { alerts: MaintenanceAlert[] }

export default function PredictiveMaintenanceAlerts({ alerts }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))', border: '1px solid rgba(20,184,166,0.15)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-5">
                <Wrench className="w-5 h-5 text-orange-400" />
                <h2 className="text-lg font-bold text-white">Predictive Maintenance</h2>
            </div>

            <div className="space-y-3">
                {alerts.map((a, i) => {
                    const sl = statusLabels[a.status] || statusLabels.optimal
                    const uColor = urgencyColors[a.urgency]
                    return (
                        <motion.div
                            key={a.applianceId}
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.45 + i * 0.08 }}
                            className="p-4 rounded-xl"
                            style={{ background: `${uColor}08`, border: `1px solid ${uColor}25` }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-xl">{a.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="text-sm font-bold text-white">{a.name}</h3>
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white"
                                            style={{ background: uColor }}>
                                            {a.urgency}
                                        </span>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                            style={{ color: sl.color, background: `${sl.color}15` }}>
                                            {sl.label}
                                        </span>
                                    </div>

                                    {/* Health bar */}
                                    <div className="flex items-center gap-2 my-2">
                                        <Heart className="w-3.5 h-3.5" style={{ color: sl.color }} />
                                        <div className="flex-1 h-2 rounded-full bg-gray-700 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }} animate={{ width: `${a.healthScore}%` }}
                                                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ background: sl.color }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold" style={{ color: sl.color }}>{a.healthScore}%</span>
                                    </div>

                                    <p className="text-[11px] text-gray-400 mb-2">{a.recommendation}</p>

                                    <div className="flex items-center gap-4 flex-wrap text-[10px] text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" style={{ color: uColor }} />
                                            {a.issueType}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {a.daysUntilMaintenance} days
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="w-3 h-3" />
                                            ~₹{a.estimatedCost.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
