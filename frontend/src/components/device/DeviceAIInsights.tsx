import { motion } from 'framer-motion'
import { Brain, Lightbulb, Star, Shield, TrendingUp } from 'lucide-react'
import type { DeviceEfficiency, DeviceAIRecommendation, DeviceComparison } from '@/types/device.types'

const priorityConfig = {
    low: { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
    medium: { color: '#f59e0b', bg: '#fffbeb', border: '#fde68a' },
    high: { color: '#ef4444', bg: '#fef2f2', border: '#fecaca' },
    critical: { color: '#dc2626', bg: '#fef2f2', border: '#fca5a5' },
}

interface Props {
    efficiency: DeviceEfficiency
    recommendations: DeviceAIRecommendation[]
    comparisons: DeviceComparison[]
}

export default function DeviceAIInsights({ efficiency, recommendations, comparisons }: Props) {
    return (
        <div className="space-y-4">
            {/* Row 1: Efficiency + AI Recs side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Efficiency Gauge */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Star className="w-4 h-4 text-amber-500" />
                        <h3 className="text-sm font-bold text-gray-900">Efficiency Score</h3>
                    </div>

                    <div className="flex items-center gap-5">
                        {/* SVG Gauge */}
                        <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                            <svg width="112" height="112" className="-rotate-90">
                                <circle cx="56" cy="56" r="44" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                <circle cx="56" cy="56" r="44" fill="none"
                                    stroke={efficiency.gradeColor} strokeWidth="8" strokeLinecap="round"
                                    strokeDasharray={2 * Math.PI * 44}
                                    strokeDashoffset={2 * Math.PI * 44 * (1 - efficiency.score / 100)}
                                    style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-2xl font-black" style={{ color: efficiency.gradeColor }}>{efficiency.grade}</span>
                                <span className="block text-[10px] text-gray-400">{efficiency.score}%</span>
                            </div>
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500">Your avg</span>
                                <span className="text-gray-900 font-bold">{efficiency.avgUsage}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500">Optimal</span>
                                <span className="text-primary-600 font-bold">{efficiency.optimalUsage}</span>
                            </div>
                            <div className="flex justify-between text-[10px]">
                                <span className="text-gray-500">Wasted</span>
                                <span className="text-red-500 font-bold">{efficiency.wastedEnergy} ({`₹${efficiency.wastedCost}/mo`})</span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                                {efficiency.tips.slice(0, 2).map((tip, i) => (
                                    <div key={i} className="flex items-start gap-1.5">
                                        <Lightbulb className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-[10px] text-gray-500">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* AI Recommendations */}
                <motion.div
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-4 h-4 text-purple-500" />
                        <h3 className="text-sm font-bold text-gray-900">AI Recommendations</h3>
                        <span className="ml-auto text-[9px] bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full font-semibold border border-purple-200">ML</span>
                    </div>

                    <div className="space-y-3">
                        {recommendations.map((rec, i) => {
                            const pri = priorityConfig[rec.priority]
                            return (
                                <div key={rec.id} className="p-3 rounded-xl" style={{ background: pri.bg, border: `1px solid ${pri.border}` }}>
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <h4 className="text-xs font-bold text-gray-900">{rec.title}</h4>
                                        <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full text-white" style={{ background: pri.color }}>
                                            {rec.priority}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-gray-500 mb-2">{rec.description}</p>
                                    <div className="flex items-center gap-3 text-[10px]">
                                        <span className="text-emerald-600 font-bold">Save ₹{rec.savingsPotential}/mo</span>
                                        <span className="text-gray-400">{rec.confidence}% confident</span>
                                        <button className="ml-auto px-2.5 py-1 rounded-lg text-[9px] font-bold text-white transition-opacity hover:opacity-80"
                                            style={{ background: pri.color }}>
                                            {rec.actionLabel}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Row 2: Usage Comparison vs Similar Devices */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-primary-500" />
                    <h3 className="text-sm font-bold text-gray-900">Comparison vs Similar Devices</h3>
                </div>

                <div className="space-y-4">
                    {comparisons.map(c => {
                        const barColor = c.percentile >= 75 ? '#10b981' : c.percentile >= 50 ? '#f59e0b' : '#ef4444'

                        return (
                            <div key={c.metric}>
                                <div className="flex items-center justify-between text-[10px] mb-1.5">
                                    <span className="text-gray-700 font-medium">{c.metric}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gray-400">Avg: {c.avgValue}{c.unit === '%' ? '%' : ` ${c.unit}`}</span>
                                        <span className="text-primary-600">Best: {c.bestValue}{c.unit === '%' ? '%' : ` ${c.unit}`}</span>
                                        <span className="text-gray-900 font-bold">You: {c.yourValue}{c.unit === '%' ? '%' : ` ${c.unit}`}</span>
                                    </div>
                                </div>
                                <div className="h-2 rounded-full bg-gray-100 overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${c.percentile}%` }}
                                        transition={{ duration: 0.8, delay: 0.35 }}
                                        className="h-full rounded-full"
                                        style={{ background: barColor }}
                                    />
                                    {/* Percentile marker */}
                                    <div className="absolute top-full mt-0.5 text-[8px] font-bold"
                                        style={{ left: `${c.percentile}%`, transform: 'translateX(-50%)', color: barColor }}>
                                        {c.percentile}th %ile
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}
