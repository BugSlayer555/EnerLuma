import { motion } from 'framer-motion'
import { Scan, TrendingUp, Shield, Lightbulb } from 'lucide-react'
import type { AnomalyAlert } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

interface Props { anomalies: AnomalyAlert[] }

export default function AnomalyDetection({ anomalies }: Props) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Scan className="w-5 h-5 text-purple-500" />
                <h2 className="text-lg font-bold text-gray-900">Anomaly Detection</h2>
                <span className="ml-auto text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-semibold">ML-Powered</span>
            </div>

            <div className="space-y-3">
                {anomalies.map((a, i) => {
                    const sev = severityConfig[a.severity]
                    return (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="rounded-xl p-5 relative overflow-hidden bg-white border border-gray-200 shadow-sm"
                        >
                            {/* Decorative glow */}
                            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: sev.color }} />

                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-2xl">{a.deviceIcon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="text-sm font-bold text-gray-900">{a.device}</h3>
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full text-white" style={{ background: sev.color }}>
                                            {sev.label}
                                        </span>
                                        <span className="text-[10px] text-gray-500">{a.timestamp}</span>
                                    </div>
                                    <p className="text-xs text-gray-600">{a.metric}</p>
                                </div>

                                {/* Confidence ring */}
                                <div className="flex flex-col items-center">
                                    <div className="relative w-14 h-14 flex items-center justify-center">
                                        <svg width="56" height="56" className="-rotate-90">
                                            <circle cx="28" cy="28" r="22" fill="none" stroke="#f1f5f9" strokeWidth="3.5" />
                                            <circle cx="28" cy="28" r="22" fill="none" stroke={a.confidence >= 85 ? '#10b981' : '#f59e0b'}
                                                strokeWidth="3.5" strokeLinecap="round"
                                                strokeDasharray={2 * Math.PI * 22}
                                                strokeDashoffset={2 * Math.PI * 22 * (1 - a.confidence / 100)}
                                                style={{ transition: 'stroke-dashoffset 1s ease' }} />
                                        </svg>
                                        <span className="absolute text-xs font-bold text-gray-900">{a.confidence}%</span>
                                    </div>
                                    <span className="text-[8px] text-gray-500 mt-0.5">Confidence</span>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-600 leading-relaxed mb-3">{a.description}</p>

                            {/* Deviation metrics */}
                            <div className="flex items-center gap-4 mb-3 flex-wrap">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100">
                                    <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                                    <span className="text-xs font-bold text-red-500">+{a.deviation}%</span>
                                    <span className="text-[10px] text-gray-500">deviation</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                    Expected: <span className="text-gray-700 font-medium">{a.expected}</span>
                                    <span className="mx-1.5 text-gray-400">→</span>
                                    Actual: <span className="text-red-500 font-medium">{a.actual}</span>
                                </div>
                            </div>

                            {/* Suggested action */}
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-teal-50 border border-teal-100">
                                <Lightbulb className="w-3.5 h-3.5 text-teal-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="text-[10px] text-teal-700 font-semibold">Suggested Action</span>
                                    <p className="text-[11px] text-gray-600">{a.suggestedAction}</p>
                                </div>
                                <Shield className="w-3.5 h-3.5 text-teal-500/50 ml-auto flex-shrink-0 mt-0.5" />
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

