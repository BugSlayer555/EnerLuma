import { motion } from 'framer-motion'
import { Eye, Clock, Shield, TrendingUp } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts'
import type { PredictiveWarning } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

interface Props { warnings: PredictiveWarning[] }

export default function PredictiveWarnings({ warnings }: Props) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Eye className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Predictive Warnings</h2>
                <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-semibold">Pre-Breach</span>
            </div>

            <div className="space-y-4">
                {warnings.map((w, i) => {
                    const sev = severityConfig[w.severity]
                    const pct = (w.currentValue / w.threshold) * 100

                    return (
                        <motion.div
                            key={w.id}
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="rounded-xl p-5"
                            style={{ background: `${sev.color}06`, border: `1px solid ${sev.color}20` }}
                        >
                            <div className="flex items-start gap-3 mb-4">
                                <span className="text-2xl">{w.deviceIcon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="text-sm font-bold text-white">{w.device}</h3>
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full text-white" style={{ background: sev.color }}>
                                            {sev.label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400">{w.metric} ({w.unit})</p>
                                </div>

                                {/* Time until breach */}
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-amber-400 mb-0.5">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-sm font-bold">{w.timeUntilBreach}</span>
                                    </div>
                                    <span className="text-[9px] text-gray-500">until breach</span>
                                </div>
                            </div>

                            {/* Progress toward threshold */}
                            <div className="mb-4">
                                <div className="flex justify-between text-[10px] mb-1">
                                    <span className="text-gray-400">Current: <span className="text-white font-bold">{w.currentValue} {w.unit}</span></span>
                                    <span className="text-red-400 font-medium">Threshold: {w.threshold} {w.unit}</span>
                                </div>
                                <div className="h-2.5 rounded-full bg-gray-700/50 overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }}
                                        transition={{ duration: 1 }}
                                        className="h-full rounded-full"
                                        style={{ background: `linear-gradient(90deg, #14b8a6, ${sev.color})` }}
                                    />
                                    {/* Pulsing indicator at current position */}
                                    <motion.div
                                        animate={{ opacity: [1, 0.4, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white"
                                        style={{ left: `calc(${Math.min(pct, 100)}% - 6px)`, background: sev.color }}
                                    />
                                </div>
                            </div>

                            {/* Trend mini-chart */}
                            <div className="h-36 mb-4 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.15)' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={w.trendData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id={`predGrad-${w.id}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor={sev.color} stopOpacity={0.3} />
                                                <stop offset="100%" stopColor={sev.color} stopOpacity={0.02} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fill: '#64748b', fontSize: 9 }} axisLine={false} tickLine={false} width={30} />
                                        <ReferenceLine y={w.threshold} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1.5}
                                            label={{ value: 'Threshold', fill: '#ef4444', fontSize: 9, position: 'right' }} />
                                        <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, fontSize: 10, color: '#fff' }} />
                                        <Area type="monotone" dataKey="value" stroke={sev.color} strokeWidth={2} fill={`url(#predGrad-${w.id})`} dot={{ r: 3, fill: sev.color }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Preventive action */}
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-teal-500/[0.06] border border-teal-500/15">
                                <Shield className="w-3.5 h-3.5 text-teal-400 mt-0.5 flex-shrink-0" />
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-[10px] text-teal-400 font-bold">Preventive Action</span>
                                        <span className="text-[9px] text-gray-500">• {w.confidence}% confident</span>
                                    </div>
                                    <p className="text-[11px] text-gray-400">{w.preventiveAction}</p>
                                </div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
