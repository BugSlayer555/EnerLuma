import { motion } from 'framer-motion'
import { Gauge, Star, TrendingDown } from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const bei = 62 // kWh/m²/yr — Building Energy Intensity
const beiStarRating = 4 // 1-5 BEE Star Rating
const beiNormalized = 78 // 0-100 normalized score
const floorArea = 120 // m²

const beiTrend = [
    { year: '2021', bei: 88 },
    { year: '2022', bei: 79 },
    { year: '2023', bei: 72 },
    { year: '2024', bei: 68 },
    { year: '2025', bei: 62 },
]

const beiCategories = [
    { label: 'Very Efficient', range: '<50', color: '#059669', position: 20 },
    { label: 'Efficient', range: '50-70', color: '#14b8a6', position: 45 },
    { label: 'Average', range: '70-100', color: '#f59e0b', position: 70 },
    { label: 'Inefficient', range: '>100', color: '#ef4444', position: 90 },
]

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold" style={{ color: e.color }}>
                    BEI: {e.value} kWh/m²/yr
                </p>
            ))}
        </div>
    )
}

export default function EfficiencyIndex() {
    const beiPosition = Math.min(Math.max((bei / 130) * 100, 5), 95)

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 bg-primary-50 rounded-lg">
                    <Gauge className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                    <h2 className="section-title">Home Efficiency Index</h2>
                    <p className="text-[10px] text-gray-400">BEI (Building Energy Intensity) · BEE Star Rating framework</p>
                </div>
            </div>

            {/* Main BEI Display */}
            <div className="flex items-center gap-6 mb-5">
                <div className="text-center">
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="text-4xl font-bold text-gradient"
                    >
                        {bei}
                    </motion.p>
                    <p className="text-[10px] text-gray-400 mt-0.5">kWh/m²/yr</p>
                </div>
                <div className="flex-1">
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star
                                key={s}
                                className={`w-5 h-5 ${s <= beiStarRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                            />
                        ))}
                        <span className="text-xs font-bold text-amber-600 ml-1">{beiStarRating}-Star</span>
                    </div>
                    {/* BEI Scale Bar */}
                    <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500">
                        <motion.div
                            initial={{ left: '0%' }}
                            animate={{ left: `${beiPosition}%` }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-gray-700"
                        />
                    </div>
                    <div className="flex justify-between mt-1 text-[9px] text-gray-400">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                        <span>130+</span>
                    </div>
                </div>
            </div>

            {/* Category Labels */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                {beiCategories.map(c => (
                    <span key={c.label} className="flex items-center gap-1 text-[10px]">
                        <span className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                        <span className="text-gray-500">{c.label} ({c.range})</span>
                    </span>
                ))}
            </div>

            {/* Trend Chart */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">5-Year BEI Improvement</h3>
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <TrendingDown className="w-3 h-3" /> −30%
                    </span>
                </div>
                <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={beiTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="beiGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={[40, 100]} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="bei" stroke="#14b8a6" strokeWidth={2.5} fill="url(#beiGrad)" dot={{ r: 3, fill: '#0f766e', strokeWidth: 0 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-3 p-3 bg-primary-50 rounded-xl text-center">
                <p className="text-xs font-medium text-primary-700">
                    Floor area: <strong>{floorArea} m²</strong> · Normalized score: <strong>{beiNormalized}/100</strong>
                </p>
            </div>
        </motion.div>
    )
}
