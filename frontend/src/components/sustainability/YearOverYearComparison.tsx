import { motion } from 'framer-motion'
import { CalendarRange, TrendingDown, TrendingUp, ArrowRight } from 'lucide-react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell,
} from 'recharts'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const yoyData = [
    { month: 'Jan', current: 420, previous: 520, delta: -19 },
    { month: 'Feb', current: 380, previous: 510, delta: -25 },
    { month: 'Mar', current: 440, previous: 530, delta: -17 },
    { month: 'Apr', current: 390, previous: 490, delta: -20 },
    { month: 'May', current: 360, previous: 470, delta: -23 },
    { month: 'Jun', current: 410, previous: 520, delta: -21 },
    { month: 'Jul', current: 450, previous: 540, delta: -17 },
    { month: 'Aug', current: 430, previous: 510, delta: -16 },
    { month: 'Sep', current: 380, previous: 480, delta: -21 },
    { month: 'Oct', current: 350, previous: 460, delta: -24 },
    { month: 'Nov', current: 340, previous: 440, delta: -23 },
    { month: 'Dec', current: 320, previous: 430, delta: -26 },
]

const summaryStats = [
    { label: 'Total Energy (Current)', value: '4,670 kWh', change: -21, color: '#14b8a6' },
    { label: 'Total Energy (Previous)', value: '5,900 kWh', change: 0, color: '#94a3b8' },
    { label: 'Total Cost Saved', value: '₹14,760', change: -21, color: '#0f766e' },
    { label: 'Avg Monthly Reduction', value: '−103 kWh', change: -21, color: '#10b981' },
]

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1.5">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: e.color || e.fill }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: e.color || e.fill }} />
                    {e.name}: {e.value.toLocaleString()} kWh
                </p>
            ))}
        </div>
    )
}

export default function YearOverYearComparison() {
    const avgDelta = Math.round(yoyData.reduce((s, d) => s + d.delta, 0) / yoyData.length)
    const bestMonth = yoyData.reduce((best, d) => d.delta < best.delta ? d : best, yoyData[0])

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-indigo-50 rounded-lg">
                            <CalendarRange className="w-4 h-4 text-indigo-600" />
                        </div>
                        <h2 className="section-title">Year-over-Year Comparison</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">2025 vs 2024 energy consumption · IPMVP time-series framework</p>
                </div>
                <div className="flex items-center gap-4 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-primary-500 rounded-sm" /> 2025</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-gray-300 rounded-sm" /> 2024</span>
                </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={yoyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kWh" />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="previous" name="2024" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={14} />
                    <Bar dataKey="current" name="2025" radius={[4, 4, 0, 0]} barSize={14}>
                        {yoyData.map((d, i) => (
                            <Cell key={i} fill={d.delta < -20 ? '#059669' : '#14b8a6'} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/* Delta Indicators */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
                {yoyData.map(d => (
                    <div key={d.month} className="flex flex-col items-center">
                        <span className={`text-[9px] font-bold ${d.delta < -20 ? 'text-emerald-600' : d.delta < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                            {d.delta}%
                        </span>
                        <span className="text-[8px] text-gray-400">{d.month}</span>
                    </div>
                ))}
            </div>

            {/* Summary Stats */}
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {summaryStats.map(s => (
                    <div key={s.label} className="p-3 bg-gray-50 rounded-xl">
                        <p className="text-[10px] text-gray-500 mb-1">{s.label}</p>
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-gray-800">{s.value}</span>
                            {s.change !== 0 && (
                                <span className={`flex items-center gap-0.5 text-[10px] font-semibold ${s.change < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                                    {s.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                    {Math.abs(s.change)}%
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 p-3 bg-emerald-50 rounded-xl flex items-center justify-between">
                <p className="text-xs font-medium text-emerald-700">
                    📉 Average <strong>{Math.abs(avgDelta)}% reduction</strong> year-over-year · Best month: <strong>{bestMonth.month}</strong> ({bestMonth.delta}%)
                </p>
            </div>
        </motion.div>
    )
}
