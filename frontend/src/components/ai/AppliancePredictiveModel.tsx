import { motion } from 'framer-motion'
import { Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'
import type { AppliancePrediction } from '@/types/ai.types'

interface Props { predictions: AppliancePrediction[] }

export default function AppliancePredictiveModel({ predictions }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))', border: '1px solid rgba(20,184,166,0.15)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-5">
                <Activity className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-bold text-white">Appliance Predictive Model</h2>
                <span className="ml-auto text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-semibold">ML Powered</span>
            </div>

            <div className="space-y-3">
                {predictions.map((p, i) => {
                    const isUp = p.usageTrend > 0
                    return (
                        <motion.div
                            key={p.applianceId}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/[0.04]"
                            style={{ background: p.anomalyDetected ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.02)', border: `1px solid ${p.anomalyDetected ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)'}` }}
                        >
                            <span className="text-xl">{p.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-white truncate">{p.name}</span>
                                    {p.anomalyDetected && (
                                        <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400">
                                    <span>Now: {p.currentUsage} {p.category === 'energy' ? 'kWh' : 'L'}</span>
                                    <span>→</span>
                                    <span className="text-teal-300 font-medium">Predicted: {p.predictedUsage} {p.category === 'energy' ? 'kWh' : 'L'}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className={`flex items-center gap-1 text-xs font-bold ${isUp ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                    {isUp ? '+' : ''}{p.usageTrend}%
                                </div>
                                <span className="text-[10px] text-gray-500">₹{p.predictedCost}/day</span>
                                {/* Confidence bar */}
                                <div className="flex items-center gap-1">
                                    <div className="w-16 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                                        <div className="h-full rounded-full transition-all" style={{ width: `${p.confidence}%`, background: p.confidence >= 90 ? '#10b981' : '#f59e0b' }} />
                                    </div>
                                    <span className="text-[9px] text-gray-500">{p.confidence}%</span>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
