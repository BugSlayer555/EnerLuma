import { motion } from 'framer-motion'
import { TreePine, Car, Factory, Flame } from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const carbonTrend = [
    { month: 'Jul', saved: 8.2, emitted: 22.4 },
    { month: 'Aug', saved: 9.1, emitted: 21.0 },
    { month: 'Sep', saved: 10.5, emitted: 19.6 },
    { month: 'Oct', saved: 11.2, emitted: 18.8 },
    { month: 'Nov', saved: 11.8, emitted: 17.5 },
    { month: 'Dec', saved: 12.4, emitted: 16.2 },
    { month: 'Jan', saved: 13.1, emitted: 15.8 },
    { month: 'Feb', saved: 14.6, emitted: 14.4 },
]

const deviceCarbon = [
    { device: 'HVAC', co2: 8.2, pct: 38, color: '#0f766e' },
    { device: 'Water Heater', co2: 4.1, pct: 19, color: '#14b8a6' },
    { device: 'Kitchen', co2: 3.6, pct: 17, color: '#2dd4bf' },
    { device: 'Lighting', co2: 2.8, pct: 13, color: '#5eead4' },
    { device: 'EV Charger', co2: 1.8, pct: 8, color: '#99f6e4' },
    { device: 'Others', co2: 1.1, pct: 5, color: '#ccfbf1' },
]

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: e.color }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: e.color }} />
                    {e.name}: {e.value} kg
                </p>
            ))}
        </div>
    )
}

export default function CarbonEmissionsPanel() {
    return (
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Carbon Trend Chart */}
            <div className="lg:col-span-2 card-static">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="section-title">Carbon Footprint Trend</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Monthly CO₂ saved vs emitted (kg CO₂e) — GHG Protocol Scope 2</p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-0.5 bg-emerald-500 rounded-full" /> Saved
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="w-3 h-0.5 bg-red-400 rounded-full" /> Emitted
                        </span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={carbonTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="carbonSavedGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="carbonEmitGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#f87171" stopOpacity={0.12} />
                                <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kg" />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="emitted" name="Emitted" stroke="#f87171" strokeWidth={2} fill="url(#carbonEmitGrad)" dot={false} />
                        <Area type="monotone" dataKey="saved" name="Saved" stroke="#10b981" strokeWidth={2.5} fill="url(#carbonSavedGrad)" dot={{ r: 3, fill: '#059669', strokeWidth: 0 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Real-World Equivalents + Device Breakdown */}
            <div className="card-static flex flex-col gap-5">
                <div>
                    <h2 className="section-title mb-3">Real-World Impact</h2>
                    <div className="space-y-3">
                        {[
                            { icon: TreePine, value: '3 Trees', sub: 'Equivalent planted this month', bg: 'bg-emerald-50', color: 'text-emerald-600' },
                            { icon: Car, value: '156 km', sub: 'Car-free equivalent distance', bg: 'bg-cyan-50', color: 'text-cyan-600' },
                            { icon: Factory, value: '−18%', sub: 'Emissions vs national avg', bg: 'bg-primary-50', color: 'text-primary-600' },
                        ].map(eq => (
                            <motion.div key={eq.value} whileHover={{ x: 3 }} className={`flex items-center gap-3 p-3 ${eq.bg} rounded-xl cursor-pointer`}>
                                <eq.icon className={`w-7 h-7 ${eq.color}`} />
                                <div>
                                    <p className={`text-base font-bold ${eq.color}`}>{eq.value}</p>
                                    <p className={`text-[10px] ${eq.color} opacity-80`}>{eq.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">By Device</h3>
                    <div className="space-y-2">
                        {deviceCarbon.slice(0, 4).map((d, i) => (
                            <div key={d.device} className="flex items-center gap-2">
                                <span className="w-20 text-[11px] text-gray-600 flex-shrink-0">{d.device}</span>
                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: `${d.pct}%` }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                        className="h-full rounded-full" style={{ background: d.color }}
                                    />
                                </div>
                                <span className="text-[11px] font-bold text-gray-700 w-12 text-right">{d.co2} kg</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
