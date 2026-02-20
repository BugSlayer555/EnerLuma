import { motion } from 'framer-motion'
import { Info, DollarSign, Leaf, TrendingDown, TrendingUp, TreePine, MapPin, Calendar, Shield, Tag, Cpu } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { DeviceProfile, DeviceCostEstimate, DeviceCarbonImpact } from '@/types/device.types'

interface Props {
    profile: DeviceProfile
    costEstimate: DeviceCostEstimate
    carbonImpact: DeviceCarbonImpact
}

const tooltipStyle = {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    fontSize: 10,
    color: '#1f2937',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
}

export default function DeviceMetadata({ profile, costEstimate, carbonImpact }: Props) {
    const costChange = costEstimate.lastMonth > 0
        ? Math.round(((costEstimate.projectedMonth - costEstimate.lastMonth) / costEstimate.lastMonth) * 100)
        : 0
    const isCostDown = costChange < 0

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Device Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4 text-primary-500" />
                    <h3 className="text-sm font-bold text-gray-900">Device Info</h3>
                </div>

                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl">
                        {profile.icon}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">{profile.name}</p>
                        <p className="text-[10px] text-gray-400">{profile.type}</p>
                    </div>
                </div>

                <div className="space-y-2.5">
                    {[
                        { icon: Tag, label: 'Brand', value: `${profile.brand} ${profile.model}` },
                        { icon: MapPin, label: 'Location', value: profile.location },
                        { icon: Calendar, label: 'Installed', value: profile.installDate },
                        { icon: Shield, label: 'Warranty', value: profile.warrantyExpiry },
                        { icon: Cpu, label: 'Category', value: profile.category.charAt(0).toUpperCase() + profile.category.slice(1) },
                    ].map(row => (
                        <div key={row.label} className="flex items-center gap-2 text-[10px]">
                            <row.icon className="w-3 h-3 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-400 w-16">{row.label}</span>
                            <span className="text-gray-700 font-medium">{row.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Cost Card */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-gray-900">Cost Estimate</h3>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-black text-gray-900">₹{costEstimate.projectedMonth.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400">projected this month</span>
                </div>

                <div className="flex items-center gap-1 mb-4">
                    {isCostDown
                        ? <TrendingDown className="w-3 h-3 text-emerald-500" />
                        : <TrendingUp className="w-3 h-3 text-red-500" />
                    }
                    <span className={`text-[10px] font-semibold ${isCostDown ? 'text-emerald-600' : 'text-red-500'}`}>
                        {costChange > 0 ? '+' : ''}{costChange}% vs last month
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                        { label: 'Current', value: `₹${costEstimate.currentMonth}`, color: 'text-gray-900' },
                        { label: 'Last Month', value: `₹${costEstimate.lastMonth}`, color: 'text-gray-500' },
                        { label: 'Daily Avg', value: `₹${costEstimate.dailyAvg}`, color: 'text-primary-600' },
                    ].map(s => (
                        <div key={s.label} className="text-center p-2 bg-gray-50 rounded-lg">
                            <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Mini cost trend chart */}
                <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={costEstimate.costTrend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Bar dataKey="cost" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Carbon Impact Card */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-bold text-gray-900">Carbon Footprint</h3>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-black text-gray-900">{carbonImpact.monthlyEmissions}</span>
                    <span className="text-xs text-gray-400">kg CO₂/month</span>
                </div>

                <div className="flex items-center gap-1 mb-4">
                    {carbonImpact.comparedToAvg < 0
                        ? <TrendingDown className="w-3 h-3 text-emerald-500" />
                        : <TrendingUp className="w-3 h-3 text-red-500" />
                    }
                    <span className={`text-[10px] font-semibold ${carbonImpact.comparedToAvg < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {Math.abs(carbonImpact.comparedToAvg)}% {carbonImpact.comparedToAvg < 0 ? 'below' : 'above'} avg
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="p-2 bg-emerald-50 rounded-lg text-center">
                        <p className="text-sm font-bold text-emerald-700">{carbonImpact.yearlyEmissions} kg</p>
                        <p className="text-[9px] text-emerald-500 mt-0.5">Yearly Total</p>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg text-center flex flex-col items-center">
                        <div className="flex items-center gap-1">
                            <TreePine className="w-3 h-3 text-emerald-600" />
                            <p className="text-sm font-bold text-emerald-700">{carbonImpact.treesEquivalent}</p>
                        </div>
                        <p className="text-[9px] text-emerald-500 mt-0.5">Trees Equivalent</p>
                    </div>
                </div>

                {/* 6-month emissions trend */}
                <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={carbonImpact.trend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="carbonMetaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={1.5} fill="url(#carbonMetaGrad)"
                                dot={{ r: 2, fill: '#10b981', strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    )
}
