import { motion } from 'framer-motion'
import { Users, Trophy, TrendingDown, Home } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const comparisons = [
    { label: 'Your Home', energy: 82, water: 2950, cost: 2400, color: '#14b8a6', icon: Home },
    { label: 'Neighborhood Avg', energy: 120, water: 4200, cost: 3600, color: '#94a3b8', icon: Users },
    { label: 'Top 10% Homes', energy: 58, water: 2100, cost: 1800, color: '#10b981', icon: Trophy },
]

const metrics = [
    { key: 'energy' as const, label: 'Energy (kWh/mo)', max: 150, unit: 'kWh' },
    { key: 'water' as const, label: 'Water (L/mo)', max: 5000, unit: 'L' },
    { key: 'cost' as const, label: 'Cost (₹/mo)', max: 4500, unit: '₹' },
]

const percentile = 78 // Top 22nd percentile
const communityRank = 42
const totalHomes = 1200

export default function NeighborhoodRanking() {
    const betterThanAvg = Math.round(((comparisons[1].energy - comparisons[0].energy) / comparisons[1].energy) * 100)

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary-50 rounded-lg">
                        <Users className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                        <h2 className="section-title">Neighborhood Ranking</h2>
                        <p className="text-[10px] text-gray-400">Comparative analysis vs community · Social Norm Theory (Cialdini, 2003)</p>
                    </div>
                </div>
            </div>

            {/* Rank Badge */}
            <div className="flex items-center gap-4 mb-5 p-4 bg-gradient-to-r from-primary-50 to-cyan-50 rounded-2xl">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <span className="text-xl font-bold text-white">#{communityRank}</span>
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Community Rank</p>
                    <p className="text-xs text-gray-500 mt-0.5">Out of {totalHomes.toLocaleString()} homes</p>
                    <div className="flex items-center gap-2 mt-1.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full">Top {100 - percentile}%</span>
                        <span className="flex items-center gap-0.5 text-xs text-emerald-600 font-semibold">
                            <TrendingDown className="w-3 h-3" /> {betterThanAvg}% below avg
                        </span>
                    </div>
                </div>
                {/* Mini percentile bar */}
                <div className="w-20 text-center">
                    <div className="relative h-20 w-3 mx-auto bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${percentile}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-primary-500 to-cyan-400"
                        />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{percentile}th</p>
                </div>
            </div>

            {/* Comparison Bars */}
            <div className="space-y-4">
                {metrics.map(m => (
                    <div key={m.key}>
                        <p className="text-xs font-medium text-gray-500 mb-2">{m.label}</p>
                        <div className="space-y-2">
                            {comparisons.map((c, i) => {
                                const val = c[m.key]
                                const width = (val / m.max) * 100
                                return (
                                    <div key={c.label} className="flex items-center gap-3">
                                        <span className="w-28 text-[11px] text-gray-600 flex-shrink-0 flex items-center gap-1.5">
                                            <c.icon className="w-3 h-3" style={{ color: c.color }} />
                                            {c.label}
                                        </span>
                                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${width}%` }}
                                                transition={{ duration: 0.6, delay: 0.05 * i }}
                                                className="h-full rounded-full" style={{ background: c.color }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700 w-14 text-right">
                                            {m.unit === '₹' ? `₹${val.toLocaleString()}` : `${val.toLocaleString()}`}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-primary-50 rounded-xl text-center">
                <p className="text-sm font-semibold text-primary-700">🎉 You're {betterThanAvg}% more efficient than the neighborhood average!</p>
            </div>
        </motion.div>
    )
}
