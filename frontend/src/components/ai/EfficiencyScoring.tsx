import { motion } from 'framer-motion'
import { Award, AlertTriangle, DollarSign } from 'lucide-react'
import type { ApplianceEfficiency } from '@/types/ai.types'

interface Props { scores: ApplianceEfficiency[] }

function GaugeArc({ score, color }: { score: number; color: string }) {
    const r = 32, c = Math.PI * r /* half circle */, offset = c - (score / 100) * c
    return (
        <div className="relative flex items-center justify-center" style={{ width: 76, height: 44 }}>
            <svg width="76" height="44" viewBox="0 0 76 44">
                <path d="M 6 40 A 32 32 0 0 1 70 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" strokeLinecap="round" />
                <path d="M 6 40 A 32 32 0 0 1 70 40" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
                    strokeDasharray={c} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
            </svg>
            <span className="absolute bottom-0 text-sm font-extrabold text-white">{score}</span>
        </div>
    )
}

export default function EfficiencyScoring({ scores }: Props) {
    const totalWasted = scores.reduce((s, a) => s + a.wastedCost, 0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))', border: '1px solid rgba(20,184,166,0.15)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Efficiency Scoring</h2>
            </div>
            <p className="text-xs text-gray-400 mb-5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-red-400" />
                Total waste: <span className="text-red-400 font-bold">₹{totalWasted}/mo</span> recoverable
            </p>

            <div className="space-y-3">
                {scores.map((a, i) => (
                    <motion.div
                        key={a.applianceId}
                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 }}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <span className="text-xl">{a.icon}</span>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white truncate">{a.name}</span>
                                <span className="text-xs font-extrabold px-2 py-0.5 rounded-full" style={{ background: `${a.gradeColor}20`, color: a.gradeColor }}>
                                    {a.grade}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                                <span>Avg: {a.avgUsage} kWh</span>
                                <span>Optimal: {a.optimalUsage} kWh</span>
                                {a.wastedCost > 0 && (
                                    <span className="text-red-400 flex items-center gap-0.5">
                                        <AlertTriangle className="w-2.5 h-2.5" />
                                        ₹{a.wastedCost}/mo waste
                                    </span>
                                )}
                            </div>
                            {a.recommendations.length > 0 && (
                                <p className="text-[10px] text-teal-400/80 mt-1 truncate">{a.recommendations[0]}</p>
                            )}
                        </div>
                        <GaugeArc score={a.score} color={a.gradeColor} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
