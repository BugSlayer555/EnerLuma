import { motion } from 'framer-motion'
import { Leaf, TreePine, Car, TrendingDown, Lightbulb } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { CarbonFootprint as CarbonData } from '@/types/ai.types'

interface Props { data: CarbonData }

export default function CarbonFootprint({ data }: Props) {
    const isBelow = data.comparedToAvg < 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(5,46,22,0.3))', border: '1px solid rgba(16,185,129,0.2)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-5">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold text-white">Carbon Footprint</h2>
                <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full font-semibold ${isBelow ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                    {isBelow ? `${Math.abs(data.comparedToAvg)}% below avg` : `${data.comparedToAvg}% above avg`}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Metrics */}
                <div>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-extrabold text-white">{data.totalEmissions}</span>
                        <span className="text-sm text-gray-400">kg CO₂/mo</span>
                    </div>

                    {/* Equivalents */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/20">
                            <TreePine className="w-4 h-4 text-emerald-400" />
                            <div>
                                <span className="text-sm font-bold text-emerald-400">{data.treesEquivalent}</span>
                                <p className="text-[9px] text-gray-400">trees to offset</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/[0.08] border border-blue-500/20">
                            <Car className="w-4 h-4 text-blue-400" />
                            <div>
                                <span className="text-sm font-bold text-blue-400">{data.carKmEquivalent} km</span>
                                <p className="text-[9px] text-gray-400">driving equivalent</p>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 mb-4">
                        {data.breakdown.map(b => (
                            <div key={b.source} className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                                <span className="text-[11px] text-gray-400 flex-1 truncate">{b.source}</span>
                                <span className="text-[11px] text-white font-semibold">{b.emissions} kg</span>
                                <span className="text-[10px] text-gray-500 w-8 text-right">{b.percentage}%</span>
                            </div>
                        ))}
                    </div>

                    {/* Offset suggestions */}
                    <div className="space-y-1.5">
                        {data.offsetSuggestions.map((s, i) => (
                            <div key={i} className="flex items-start gap-1.5">
                                <Lightbulb className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                                <span className="text-[10px] text-gray-400 leading-tight">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Trend chart */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs text-gray-400 font-semibold">6-Month Trend</span>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.monthlyTrend}>
                                <defs>
                                    <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                                <Tooltip
                                    contentStyle={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12, color: '#fff' }}
                                    formatter={(v: number) => [`${v} kg CO₂`, 'Emissions']}
                                />
                                <Area type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={2} fill="url(#carbonGrad)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
