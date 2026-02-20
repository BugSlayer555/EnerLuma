import { motion } from 'framer-motion'
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { BehavioralInsight } from '@/types/ai.types'

const typeColors: Record<string, { bg: string; border: string; label: string }> = {
    habit: { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)', label: 'Habit' },
    anomaly: { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)', label: 'Anomaly' },
    optimization: { bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.25)', label: 'Optimization' },
    achievement: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)', label: 'Achievement' },
}

interface Props { insights: BehavioralInsight[] }

export default function BehavioralInsights({ insights }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))', border: '1px solid rgba(20,184,166,0.15)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-5">
                <Brain className="w-5 h-5 text-indigo-400" />
                <h2 className="text-lg font-bold text-white">Behavioral Insights</h2>
                <span className="ml-auto text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-semibold">AI Detected</span>
            </div>

            <div className="space-y-3">
                {insights.map((insight, i) => {
                    const tc = typeColors[insight.type] || typeColors.habit
                    const ImpactIcon =
                        insight.impact === 'positive' ? TrendingDown :
                            insight.impact === 'negative' ? TrendingUp : Minus

                    return (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.07 }}
                            className="p-4 rounded-xl group hover:scale-[1.01] transition-transform"
                            style={{ background: tc.bg, border: `1px solid ${tc.border}` }}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-xl mt-0.5">{insight.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h3 className="text-sm font-bold text-white">{insight.title}</h3>
                                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full text-gray-300"
                                            style={{ background: `${tc.border}40` }}>
                                            {tc.label}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 leading-relaxed mb-2">{insight.description}</p>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className={`text-xs font-bold flex items-center gap-1 ${insight.impact === 'positive' ? 'text-emerald-400' : insight.impact === 'negative' ? 'text-red-400' : 'text-gray-400'}`}>
                                            <ImpactIcon className="w-3.5 h-3.5" />
                                            {insight.metric}
                                        </span>
                                        <span className="text-[9px] text-gray-500">Confidence: {insight.confidence}%</span>
                                        <span className="text-[9px] text-gray-600">{insight.detectedAt}</span>
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
