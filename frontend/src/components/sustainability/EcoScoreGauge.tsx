import { motion } from 'framer-motion'
import { Leaf, Zap, Droplets, Brain } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const score = 87
const grade = 'A+'
const breakdown = [
    { metric: 'Energy Efficiency', value: 91, weight: '40%', icon: Zap, color: '#14b8a6' },
    { metric: 'Water Efficiency', value: 84, weight: '30%', icon: Droplets, color: '#06b6d4' },
    { metric: 'Behavior Score', value: 82, weight: '30%', icon: Brain, color: '#10b981' },
]

const trendSparkline = [72, 74, 78, 80, 82, 84, 85, 87]

function getGradeColor(g: string): string {
    if (g.startsWith('A')) return '#059669'
    if (g.startsWith('B')) return '#0d9488'
    if (g.startsWith('C')) return '#d97706'
    return '#dc2626'
}

export default function EcoScoreGauge() {
    const circumference = 2 * Math.PI * 42
    const dashLength = (score / 100) * circumference

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-emerald-50 rounded-lg">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                    <h2 className="section-title">Monthly Eco-Score</h2>
                    <p className="text-[10px] text-gray-400">Composite index · AHP weighted (Saaty, 1980)</p>
                </div>
            </div>

            <div className="flex flex-col items-center py-3">
                {/* Gauge Ring */}
                <div className="relative w-36 h-36">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#f0fdfa" strokeWidth="8" />
                        <motion.circle
                            cx="50" cy="50" r="42" fill="none"
                            stroke="url(#ecoScoreGrad)" strokeWidth="8" strokeLinecap="round"
                            initial={{ strokeDasharray: `0 ${circumference}` }}
                            animate={{ strokeDasharray: `${dashLength} ${circumference - dashLength}` }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                        <defs>
                            <linearGradient id="ecoScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#0f766e" />
                                <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.span
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, type: 'spring' }}
                            className="text-3xl font-bold text-gradient"
                        >
                            {score}
                        </motion.span>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">of 100</span>
                    </div>
                </div>

                <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: `${getGradeColor(grade)}15`, color: getGradeColor(grade) }}
                >
                    {grade} Rating
                </motion.span>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 mt-3">
                {breakdown.map((b, i) => (
                    <div key={b.metric} className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg" style={{ background: `${b.color}15` }}>
                            <b.icon className="w-3.5 h-3.5" style={{ color: b.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-[11px] text-gray-600">{b.metric}</span>
                                <span className="text-[10px] text-gray-400">{b.weight}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: `${b.value}%` }}
                                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                                    className="h-full rounded-full" style={{ background: b.color }}
                                />
                            </div>
                        </div>
                        <span className="text-xs font-bold text-gray-700 w-8 text-right">{b.value}</span>
                    </div>
                ))}
            </div>

            {/* Sparkline Trend */}
            <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 mb-2">8-month score trend</p>
                <div className="flex items-end gap-[3px] h-8">
                    {trendSparkline.map((v, i) => {
                        const max = Math.max(...trendSparkline)
                        const min = Math.min(...trendSparkline)
                        const height = max > min ? ((v - min) / (max - min)) * 100 : 50
                        return (
                            <div
                                key={i}
                                className="flex-1 rounded-sm transition-all"
                                style={{
                                    height: `${Math.max(height, 8)}%`,
                                    background: i === trendSparkline.length - 1 ? '#0f766e' : '#99f6e4',
                                }}
                            />
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}
