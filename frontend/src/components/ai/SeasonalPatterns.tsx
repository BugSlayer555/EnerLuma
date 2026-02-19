import { motion } from 'framer-motion'
import { Sun, CloudRain, Snowflake, Flower2, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react'
import type { SeasonalPattern } from '@/types/ai.types'

const seasonIcons: Record<string, typeof Sun> = {
    summer: Sun,
    monsoon: CloudRain,
    winter: Snowflake,
    spring: Flower2,
}

interface Props { patterns: SeasonalPattern[] }

export default function SeasonalPatterns({ patterns }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl p-6"
            style={{
                background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))',
                border: '1px solid rgba(20,184,166,0.15)',
                backdropFilter: 'blur(16px)',
            }}
        >
            <div className="flex items-center gap-2 mb-5">
                <Sun className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white">Seasonal Pattern Detection</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {patterns.map((p, i) => {
                    const Icon = seasonIcons[p.season] || Sun
                    const isUp = p.expectedChange > 0
                    return (
                        <motion.div
                            key={p.season}
                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + i * 0.08 }}
                            className="rounded-xl p-4 group hover:scale-[1.02] transition-transform"
                            style={{ background: `${p.color}10`, border: `1px solid ${p.color}30` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-2 rounded-lg" style={{ background: `${p.color}20` }}>
                                    <Icon className="w-4 h-4" style={{ color: p.color }} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white capitalize">{p.season}</h3>
                                    <span className="text-[10px] text-gray-400">Peak: {p.peakMonth}</span>
                                </div>
                                <div className={`ml-auto flex items-center gap-1 text-xs font-bold ${isUp ? 'text-red-400' : 'text-emerald-400'}`}>
                                    {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                                    {isUp ? '+' : ''}{p.expectedChange}%
                                </div>
                            </div>

                            <div className="mb-3">
                                <span className="text-2xl font-extrabold text-white">{p.avgConsumption}</span>
                                <span className="text-xs text-gray-400 ml-1">kWh/day avg</span>
                            </div>

                            <p className="text-[11px] text-gray-400 mb-3">
                                Dominant: <span className="text-gray-300 font-medium">{p.dominantAppliance}</span>
                            </p>

                            {/* Tips */}
                            <div className="space-y-1.5">
                                {p.tips.map((tip, j) => (
                                    <div key={j} className="flex items-start gap-1.5">
                                        <Lightbulb className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-[10px] text-gray-400 leading-tight">{tip}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
