import { motion } from 'framer-motion'
import { DollarSign, TrendingUp } from 'lucide-react'
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Area,
} from 'recharts'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const savingsData = [
    { month: 'Jul', monthly: 820, cumulative: 820, projected: 900 },
    { month: 'Aug', monthly: 940, cumulative: 1760, projected: 950 },
    { month: 'Sep', monthly: 1080, cumulative: 2840, projected: 1000 },
    { month: 'Oct', monthly: 1150, cumulative: 3990, projected: 1050 },
    { month: 'Nov', monthly: 1240, cumulative: 5230, projected: 1100 },
    { month: 'Dec', monthly: 1320, cumulative: 6550, projected: 1150 },
    { month: 'Jan', monthly: 1400, cumulative: 7950, projected: 1200 },
    { month: 'Feb', monthly: 1580, cumulative: 9530, projected: 1250 },
]

const savingsActions = [
    { action: 'HVAC Eco Mode', savings: '₹3,200', pct: 34, color: '#0f766e' },
    { action: 'Smart Scheduling', savings: '₹2,640', pct: 28, color: '#14b8a6' },
    { action: 'LED Migration', savings: '₹1,820', pct: 19, color: '#2dd4bf' },
    { action: 'Water Optimization', savings: '₹1,180', pct: 12, color: '#5eead4' },
    { action: 'Standby Reduction', savings: '₹690', pct: 7, color: '#99f6e4' },
]

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: e.color }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: e.color }} />
                    {e.name}: ₹{typeof e.value === 'number' ? e.value.toLocaleString() : e.value}
                </p>
            ))}
        </div>
    )
}

export default function CostSavingsTimeline() {
    const totalSaved = savingsData[savingsData.length - 1].cumulative
    const projectedAnnual = Math.round(totalSaved * (12 / savingsData.length))

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-50 rounded-lg">
                            <DollarSign className="w-4 h-4 text-amber-600" />
                        </div>
                        <h2 className="section-title">Cost Savings Over Time</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Monthly savings + cumulative trajectory (₹)</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">₹{totalSaved.toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400">Total saved</p>
                    </div>
                    <div className="text-right px-3 py-1.5 bg-emerald-50 rounded-xl">
                        <p className="text-sm font-bold text-emerald-700">₹{projectedAnnual.toLocaleString()}</p>
                        <p className="text-[10px] text-emerald-500">Projected/year</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-primary-500 rounded-sm" /> Monthly</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-500 rounded-full" /> Cumulative</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-primary-100 rounded-sm" /> Projected</span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <ComposedChart data={savingsData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.08} />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip />} />
                            <Area yAxisId="left" type="monotone" dataKey="projected" name="Projected" stroke="none" fill="url(#projGrad)" dot={false} />
                            <Bar yAxisId="left" dataKey="monthly" name="Monthly Savings" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={24} />
                            <Line yAxisId="right" type="monotone" dataKey="cumulative" name="Cumulative" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#d97706', strokeWidth: 0 }} />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Savings by Action</h3>
                    <div className="space-y-3">
                        {savingsActions.map((a, i) => (
                            <div key={a.action}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-700">{a.action}</span>
                                    <span className="text-xs font-bold text-gray-800">{a.savings}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${a.pct}%` }}
                                        transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                                        className="h-full rounded-full" style={{ background: a.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 p-3 bg-amber-50 rounded-xl flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-amber-600" />
                        <p className="text-xs font-medium text-amber-700">Savings increased <strong>18%</strong> vs last quarter</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
