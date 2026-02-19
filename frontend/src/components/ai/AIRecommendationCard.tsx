import { motion } from 'framer-motion'
import {
    Shield, TrendingDown, Leaf, Clock, CheckCircle, ChevronRight, Star,
} from 'lucide-react'
import type { AIRecommendation } from '@/types/ai.types'

const priorityColors: Record<string, { bg: string; border: string; badge: string; text: string }> = {
    critical: { bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.25)', badge: 'bg-red-500', text: 'text-red-400' },
    high: { bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.25)', badge: 'bg-amber-500', text: 'text-amber-400' },
    medium: { bg: 'rgba(20,184,166,0.06)', border: 'rgba(20,184,166,0.25)', badge: 'bg-teal-500', text: 'text-teal-400' },
    low: { bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.25)', badge: 'bg-indigo-500', text: 'text-indigo-400' },
}

const categoryIcons: Record<string, typeof Shield> = {
    maintenance: Shield,
    cost: TrendingDown,
    energy: Star,
    water: Star,
    sustainability: Leaf,
}

function ConfidenceRing({ value }: { value: number }) {
    const r = 22, c = 2 * Math.PI * r, offset = c - (value / 100) * c
    const color = value >= 90 ? '#10b981' : value >= 75 ? '#14b8a6' : '#f59e0b'
    return (
        <div className="relative flex items-center justify-center" style={{ width: 56, height: 56 }}>
            <svg width="56" height="56" className="-rotate-90">
                <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4"
                    strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease' }} />
            </svg>
            <span className="absolute text-xs font-bold" style={{ color }}>{value}%</span>
        </div>
    )
}

interface Props {
    recommendation: AIRecommendation
    index: number
}

export default function AIRecommendationCard({ recommendation: r, index }: Props) {
    const style = priorityColors[r.priority] || priorityColors.medium
    const CategoryIcon = categoryIcons[r.category] || Star

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.4 }}
            className="rounded-2xl p-5 relative overflow-hidden group"
            style={{
                background: `linear-gradient(135deg, ${style.bg}, rgba(15,23,42,0.65))`,
                border: `1px solid ${style.border}`,
                backdropFilter: 'blur(12px)',
            }}
        >
            {/* Eco glow accent */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
                style={{ background: style.border }} />

            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl flex-shrink-0 mt-0.5">{r.icon}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white ${style.badge}`}>
                            {r.priority}
                        </span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                            <CategoryIcon className="w-3 h-3" />
                            {r.category}
                        </span>
                        {r.implemented && (
                            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" /> Done
                            </span>
                        )}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-tight">{r.title}</h3>
                </div>
                <ConfidenceRing value={r.confidence} />
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 leading-relaxed mb-4 pl-9">{r.description}</p>

            {/* Savings indicators */}
            <div className="flex items-center gap-4 mb-4 pl-9 flex-wrap">
                <div className="flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-semibold text-emerald-400">₹{r.potentialSavings}/mo</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-xs font-semibold text-teal-400">{r.carbonImpact} kg CO₂</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs text-gray-400">{r.timeToImplement}</span>
                </div>
            </div>

            {/* Action button */}
            {!r.implemented && (
                <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="ml-9 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                    style={{
                        background: `linear-gradient(135deg, ${style.border.replace('0.25', '0.7')}, ${style.border.replace('0.25', '0.4')})`,
                        boxShadow: `0 4px 15px ${style.border}`,
                    }}
                >
                    {r.actionLabel}
                    <ChevronRight className="w-3.5 h-3.5" />
                </motion.button>
            )}
        </motion.div>
    )
}
