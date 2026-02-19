import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Check, ArrowRight, RotateCcw } from 'lucide-react'
import type { SmartThreshold } from '@/types/ai.types'

interface Props { thresholds: SmartThreshold[] }

export default function SmartThresholdAdjust({ thresholds }: Props) {
    const [accepted, setAccepted] = useState<Set<string>>(new Set())

    const handleAccept = (id: string) => {
        setAccepted(prev => new Set(prev).add(id))
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))', border: '1px solid rgba(20,184,166,0.15)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Smart Auto-Threshold</h2>
                <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-semibold">Auto-Learning</span>
            </div>

            <div className="space-y-3">
                {thresholds.map((t, i) => {
                    const isAccepted = accepted.has(t.applianceId)
                    return (
                        <motion.div
                            key={t.applianceId}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.07 }}
                            className="p-4 rounded-xl"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-white">{t.name}</h3>
                                <div className="flex items-center gap-2">
                                    {t.autoAdjusted && (
                                        <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                                            <RotateCcw className="w-2.5 h-2.5" /> Auto
                                        </span>
                                    )}
                                    <span className="text-[9px] text-gray-500">{t.lastUpdated}</span>
                                </div>
                            </div>

                            {/* Threshold comparison */}
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-center">
                                    <span className="text-lg font-bold text-gray-400">{t.currentThreshold}</span>
                                    <p className="text-[9px] text-gray-500">Current</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-teal-400" />
                                <div className="text-center">
                                    <span className="text-lg font-bold text-teal-400">{t.suggestedThreshold}</span>
                                    <p className="text-[9px] text-teal-500">Suggested</p>
                                </div>
                                <div className="flex-1 ml-2">
                                    <p className="text-[10px] text-gray-400 leading-tight">{t.reason}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[10px] text-emerald-400 font-medium">{t.impact}</span>
                                {!isAccepted ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        onClick={() => handleAccept(t.applianceId)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 transition-colors"
                                    >
                                        <Check className="w-3 h-3" /> Apply
                                    </motion.button>
                                ) : (
                                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                                        <Check className="w-3.5 h-3.5" /> Applied
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
