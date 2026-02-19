import { motion } from 'framer-motion'
import {
    Leaf, TrendingUp, TreePine, Car, Target,
    Award, Droplets, Zap, DollarSign,
} from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer,
} from 'recharts'

const carbonTrend = [
    { month: 'Jul', saved: 8.2 }, { month: 'Aug', saved: 9.1 },
    { month: 'Sep', saved: 10.5 }, { month: 'Oct', saved: 11.2 },
    { month: 'Nov', saved: 11.8 }, { month: 'Dec', saved: 12.4 },
]

const goals = [
    { label: 'Solar Adoption', progress: 72, target: '100% by 2027', color: '#14b8a6' },
    { label: 'Water Reduction', progress: 54, target: '30% reduction', color: '#06b6d4' },
    { label: 'Cost Savings', progress: 83, target: '₹20K/year', color: '#0f766e' },
    { label: 'Carbon Neutral', progress: 45, target: 'Net zero by 2030', color: '#10b981' },
]

const badges = [
    { name: 'Water Saver', icon: Droplets, earned: true, level: 'Gold' },
    { name: 'Energy Champion', icon: Zap, earned: true, level: 'Silver' },
    { name: 'Eco Warrior', icon: Leaf, earned: true, level: 'Gold' },
    { name: 'Carbon Crusher', icon: TreePine, earned: false, level: 'Locked' },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
            <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold" style={{ color: e.color }}>{e.name}: {e.value} kg</p>
            ))}
        </div>
    )
}

export default function SustainabilityPage() {
    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-6">
            <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-primary-500" /> Sustainability Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-0.5">Track your environmental impact and sustainability goals</p>
            </motion.div>

            {/* Impact KPIs */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: TreePine, label: 'CO₂ Saved', value: '12.4 kg', sub: '↑ 8% from last month', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
                    { icon: Droplets, label: 'Water Saved', value: '340 L', sub: '↑ 15% from last month', iconBg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
                    { icon: DollarSign, label: 'Cost Saved', value: '₹1,240', sub: '↑ 11% from last month', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
                    { icon: Award, label: 'Eco Score', value: '87 / 100', sub: 'A+ Rating', iconBg: 'bg-primary-50', iconColor: 'text-primary-600' },
                ].map(kpi => (
                    <div key={kpi.label} className="kpi-card">
                        <div className={`p-2 rounded-xl ${kpi.iconBg} w-fit`}><kpi.icon className={`w-5 h-5 ${kpi.iconColor}`} /></div>
                        <div className="mt-3"><span className="text-2xl font-bold text-gray-900">{kpi.value}</span></div>
                        <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
                        <p className="text-[10px] text-emerald-500 font-semibold mt-1">{kpi.sub}</p>
                    </div>
                ))}
            </motion.div>

            {/* Carbon Trend + Eco Score */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 card-static">
                    <h2 className="section-title mb-4">Carbon Footprint Trend</h2>
                    <ResponsiveContainer width="100%" height={260}>
                        <AreaChart data={carbonTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kg" />
                            <Tooltip content={<ChartTooltip />} />
                            <Area type="monotone" dataKey="saved" name="CO₂ saved" stroke="#10b981" strokeWidth={2.5} fill="url(#carbonGrad)" dot={{ r: 4, fill: '#059669', strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Equivalents */}
                <div className="card-static flex flex-col">
                    <h2 className="section-title mb-4">Real-World Equivalents</h2>
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                            <TreePine className="w-8 h-8 text-emerald-600" />
                            <div>
                                <p className="text-lg font-bold text-emerald-700">2 Trees</p>
                                <p className="text-xs text-emerald-600">Equivalent planted this month</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-cyan-50 rounded-xl">
                            <Car className="w-8 h-8 text-cyan-600" />
                            <div>
                                <p className="text-lg font-bold text-cyan-700">103 km</p>
                                <p className="text-xs text-cyan-600">Car-free equivalent distance</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
                            <Target className="w-8 h-8 text-primary-600" />
                            <div>
                                <p className="text-lg font-bold text-primary-700">#42</p>
                                <p className="text-xs text-primary-600">Community rank of 1,200 homes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Goals + Badges */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="card-static">
                    <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-primary-600" />
                        <h2 className="section-title">Sustainability Goals</h2>
                    </div>
                    <div className="space-y-4">
                        {goals.map(g => (
                            <div key={g.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-medium text-gray-700">{g.label}</span>
                                    <span className="text-xs text-gray-400">{g.target}</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${g.progress}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: g.color }}
                                    />
                                </div>
                                <div className="text-right mt-0.5">
                                    <span className="text-xs font-bold" style={{ color: g.color }}>{g.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card-static">
                    <div className="flex items-center gap-2 mb-4">
                        <Award className="w-4 h-4 text-amber-500" />
                        <h2 className="section-title">Achievement Badges</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {badges.map(b => (
                            <div key={b.name} className={`p-4 rounded-2xl text-center transition-all ${b.earned ? 'bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200' : 'bg-gray-50 border border-gray-200 opacity-50'}`}>
                                <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${b.earned ? 'bg-gradient-to-br from-amber-400 to-yellow-500' : 'bg-gray-300'}`}>
                                    <b.icon className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-sm font-semibold text-gray-800 mt-2">{b.name}</p>
                                <p className={`text-[10px] font-bold mt-0.5 ${b.earned ? 'text-amber-600' : 'text-gray-400'}`}>{b.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Community Comparison */}
            <motion.div variants={fadeUp} className="card-static">
                <h2 className="section-title mb-4">Community Comparison</h2>
                <div className="space-y-3">
                    {[
                        { label: 'Your Home', value: 82, color: '#14b8a6' },
                        { label: 'Average Home', value: 120, color: '#94a3b8' },
                        { label: 'Efficient Home', value: 65, color: '#10b981' },
                    ].map(c => (
                        <div key={c.label} className="flex items-center gap-3">
                            <span className="w-28 text-sm text-gray-600 flex-shrink-0">{c.label}</span>
                            <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(c.value / 130) * 100}%` }}
                                    transition={{ duration: 0.8, ease: 'easeOut' }}
                                    className="h-full rounded-full" style={{ background: c.color }}
                                />
                            </div>
                            <span className="text-sm font-bold text-gray-700 w-20 text-right">{c.value} kWh/mo</span>
                        </div>
                    ))}
                    <div className="mt-3 p-3 bg-primary-50 rounded-xl text-center">
                        <p className="text-sm font-semibold text-primary-700">🎉 You're 32% better than the average home!</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
