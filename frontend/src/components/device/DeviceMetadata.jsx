import { motion } from 'framer-motion'
import { Info, IndianRupee, Leaf, TrendingDown, TrendingUp, TreePine, MapPin, Calendar, Shield, Tag, Cpu } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const tooltipStyle = {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    fontSize: 10,
    color: '#1f2937',
    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
}

export default function DeviceMetadata({ profile, costEstimate, carbonImpact }) {
    const lastMonth = costEstimate.lastMonth || 0
    const projected = costEstimate.projectedMonth || costEstimate.monthly || 0
    const costChange = lastMonth > 0
        ? Math.round(((projected - lastMonth) / lastMonth) * 100)
        : 0
    const isCostDown = costChange < 0

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {/* Device Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-card"
                style={{ padding: 24 }}
            >
                <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
                    <Info className="w-4 h-4 text-primary-500" />
                    <h3 className="text-sm font-bold text-gray-900">Device Info</h3>
                </div>

                <div className="flex items-center gap-3" style={{ marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ width: 48, height: 48, fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="bg-primary-50 rounded-xl">
                        {profile.icon}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900">{profile.name}</p>
                        <p className="text-[10px] text-gray-400">{profile.type}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { icon: Tag, label: 'Brand', value: `${profile.brand} ${profile.model}` },
                        { icon: MapPin, label: 'Location', value: profile.location },
                        { icon: Calendar, label: 'Installed', value: profile.installDate || profile.installedDate },
                        { icon: Shield, label: 'Warranty', value: profile.warrantyExpiry || 'N/A' },
                        { icon: Cpu, label: 'Category', value: (profile.category || profile.type || '').charAt(0).toUpperCase() + (profile.category || profile.type || '').slice(1) },
                    ].map(row => {
                        const RowIcon = row.icon
                        return (
                            <div key={row.label} className="flex items-center" style={{ gap: 10 }}>
                                <RowIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                <span className="text-xs text-gray-400" style={{ width: 72, flexShrink: 0 }}>{row.label}</span>
                                <span className="text-xs text-gray-700 font-medium">{row.value}</span>
                            </div>
                        )
                    })}
                </div>
            </motion.div>

            {/* Cost Card */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-card"
                style={{ padding: 24 }}
            >
                <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
                    <IndianRupee className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-gray-900">Cost Estimate</h3>
                </div>

                <div className="flex items-baseline gap-2" style={{ marginBottom: 6 }}>
                    <span className="text-2xl font-black text-gray-900">₹{Number(projected).toLocaleString()}</span>
                    <span className="text-[10px] text-gray-400">projected this month</span>
                </div>

                <div className="flex items-center gap-1" style={{ marginBottom: 20 }}>
                    {isCostDown
                        ? <TrendingDown className="w-3 h-3 text-emerald-500" />
                        : <TrendingUp className="w-3 h-3 text-red-500" />
                    }
                    <span className={`text-[10px] font-semibold ${isCostDown ? 'text-emerald-600' : 'text-red-500'}`}>
                        {costChange > 0 ? '+' : ''}{costChange}% vs last month
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
                    {[
                        { label: 'Current', value: `₹${costEstimate.currentMonth || costEstimate.monthly || 0}`, color: 'text-gray-900' },
                        { label: 'Last Month', value: `₹${lastMonth}`, color: 'text-gray-500' },
                        { label: 'Daily Avg', value: `₹${costEstimate.dailyAvg || costEstimate.daily || 0}`, color: 'text-primary-600' },
                    ].map(s => (
                        <div key={s.label} className="text-center bg-gray-50 rounded-lg" style={{ padding: 10 }}>
                            <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-[9px] text-gray-400" style={{ marginTop: 4 }}>{s.label}</p>
                        </div>
                    ))}
                </div>

                {costEstimate.costTrend && (
                    <div style={{ height: 80 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={costEstimate.costTrend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={tooltipStyle} />
                                <Bar dataKey="cost" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </motion.div>

            {/* Carbon Impact Card */}
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-card"
                style={{ padding: 24 }}
            >
                <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
                    <Leaf className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-bold text-gray-900">Carbon Footprint</h3>
                </div>

                <div className="flex items-baseline gap-2" style={{ marginBottom: 6 }}>
                    <span className="text-2xl font-black text-gray-900">{carbonImpact.monthlyEmissions || carbonImpact.monthly}</span>
                    <span className="text-xs text-gray-400">kg CO₂/month</span>
                </div>

                <div className="flex items-center gap-1" style={{ marginBottom: 20 }}>
                    {(carbonImpact.comparedToAvg || 0) < 0
                        ? <TrendingDown className="w-3 h-3 text-emerald-500" />
                        : <TrendingUp className="w-3 h-3 text-red-500" />
                    }
                    <span className={`text-[10px] font-semibold ${(carbonImpact.comparedToAvg || 0) < 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                        {Math.abs(carbonImpact.comparedToAvg || 0)}% {(carbonImpact.comparedToAvg || 0) < 0 ? 'below' : 'above'} avg
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                    <div className="bg-emerald-50 rounded-lg text-center" style={{ padding: 10 }}>
                        <p className="text-sm font-bold text-emerald-700">{carbonImpact.yearlyEmissions || (Number(carbonImpact.monthly) * 12).toFixed(0)} kg</p>
                        <p className="text-[9px] text-emerald-500" style={{ marginTop: 4 }}>Yearly Total</p>
                    </div>
                    <div className="bg-emerald-50 rounded-lg text-center flex flex-col items-center" style={{ padding: 10 }}>
                        <div className="flex items-center gap-1">
                            <TreePine className="w-3 h-3 text-emerald-600" />
                            <p className="text-sm font-bold text-emerald-700">{carbonImpact.treesEquivalent}</p>
                        </div>
                        <p className="text-[9px] text-emerald-500" style={{ marginTop: 4 }}>Trees Equivalent</p>
                    </div>
                </div>

                {carbonImpact.trend && (
                    <div style={{ height: 80 }}>
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
                )}
            </motion.div>
        </div>
    )
}
