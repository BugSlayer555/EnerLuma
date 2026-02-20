import { motion } from 'framer-motion'
import { Droplets, ShowerHead, UtensilsCrossed, Flower2 } from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const waterData = [
    { month: 'Jul', actual: 4200, baseline: 5500, target: 4000 },
    { month: 'Aug', actual: 3900, baseline: 5400, target: 3900 },
    { month: 'Sep', actual: 3700, baseline: 5300, target: 3800 },
    { month: 'Oct', actual: 3500, baseline: 5200, target: 3700 },
    { month: 'Nov', actual: 3400, baseline: 5100, target: 3600 },
    { month: 'Dec', actual: 3200, baseline: 5000, target: 3500 },
    { month: 'Jan', actual: 3100, baseline: 4900, target: 3400 },
    { month: 'Feb', actual: 2950, baseline: 4800, target: 3300 },
]

const categories = [
    { name: 'Bathroom', value: 1380, pct: 47, icon: ShowerHead, color: '#06b6d4' },
    { name: 'Kitchen', value: 820, pct: 28, icon: UtensilsCrossed, color: '#14b8a6' },
    { name: 'Garden', value: 440, pct: 15, icon: Flower2, color: '#10b981' },
    { name: 'Other', value: 310, pct: 10, icon: Droplets, color: '#5eead4' },
]

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: e.color }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: e.color }} />
                    {e.name}: {e.value.toLocaleString()} L
                </p>
            ))}
        </div>
    )
}

export default function WaterConservationPanel() {
    const currentSaved = waterData[waterData.length - 1].baseline - waterData[waterData.length - 1].actual
    const savingsPct = Math.round((currentSaved / waterData[waterData.length - 1].baseline) * 100)

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-cyan-50 rounded-lg">
                            <Droplets className="w-4 h-4 text-cyan-600" />
                        </div>
                        <h2 className="section-title">Water Conservation Impact</h2>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Actual vs baseline vs target consumption (Litres)</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-cyan-50 rounded-xl">
                        <span className="text-sm font-bold text-cyan-700">{currentSaved.toLocaleString()} L saved</span>
                        <span className="text-[10px] text-cyan-500 ml-1.5">↑ {savingsPct}%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-cyan-500 rounded-full" /> Actual</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-gray-400 rounded-full opacity-50" /> Baseline</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-400 rounded-full" /> Target</span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <AreaChart data={waterData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="waterActualGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip />} />
                            <Area type="monotone" dataKey="baseline" name="Baseline" stroke="#cbd5e1" strokeWidth={1.5} strokeDasharray="6 4" fill="none" dot={false} />
                            <Area type="monotone" dataKey="target" name="Target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 3" fill="none" dot={false} />
                            <Area type="monotone" dataKey="actual" name="Actual" stroke="#06b6d4" strokeWidth={2.5} fill="url(#waterActualGrad)" dot={{ r: 3, fill: '#0891b2', strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Usage by Category</h3>
                    <div className="space-y-3">
                        {categories.map((c, i) => (
                            <motion.div
                                key={c.name}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 * i }}
                                className="flex items-center gap-3"
                            >
                                <div className="p-1.5 rounded-lg" style={{ background: `${c.color}15` }}>
                                    <c.icon className="w-4 h-4" style={{ color: c.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium text-gray-700">{c.name}</span>
                                        <span className="text-[10px] font-bold" style={{ color: c.color }}>{c.pct}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                                            transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                                            className="h-full rounded-full" style={{ background: c.color }}
                                        />
                                    </div>
                                </div>
                                <span className="text-[11px] font-semibold text-gray-600 w-12 text-right">{c.value} L</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
