import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Activity, BarChart3, Calendar } from 'lucide-react'
import type { DeviceRealTime, DeviceHistorical, DeviceCostEstimate, DeviceCarbonImpact } from '@/types/device.types'

type ChartView = 'realtime' | 'daily' | 'weekly' | 'monthly'
type DataOverlay = 'usage' | 'cost' | 'carbon'

interface Props {
    realTime: DeviceRealTime
    historical: DeviceHistorical
    costEstimate: DeviceCostEstimate
    carbonImpact: DeviceCarbonImpact
    unit: string
}

export default function DeviceMainChart({ realTime, historical, costEstimate, carbonImpact, unit }: Props) {
    const [view, setView] = useState<ChartView>('daily')
    const [overlay, setOverlay] = useState<DataOverlay>('usage')

    const viewButtons: { key: ChartView; label: string; icon: typeof Activity }[] = [
        { key: 'realtime', label: 'Live', icon: Activity },
        { key: 'daily', label: 'Daily', icon: Calendar },
        { key: 'weekly', label: 'Weekly', icon: Calendar },
        { key: 'monthly', label: 'Monthly', icon: Calendar },
    ]

    const overlayButtons: { key: DataOverlay; label: string; color: string }[] = [
        { key: 'usage', label: `Usage (${unit})`, color: '#14b8a6' },
        { key: 'cost', label: 'Cost (₹)', color: '#f59e0b' },
        { key: 'carbon', label: 'CO₂ (kg)', color: '#10b981' },
    ]

    // Get chart data
    const getChartData = () => {
        if (view === 'realtime') return realTime.liveReadings
        if (view === 'daily') return historical.daily
        if (view === 'weekly') return historical.weekly
        return historical.monthly
    }

    const getXKey = () => {
        if (view === 'realtime') return 'time'
        if (view === 'daily') return 'date'
        if (view === 'weekly') return 'week'
        return 'month'
    }

    const getYKey = () => {
        if (view === 'realtime') return 'value'
        if (overlay === 'cost') return 'cost'
        return 'usage'
    }

    const chartData = getChartData()
    const xKey = getXKey()
    const yKey = getYKey()
    const chartColor = overlay === 'usage' ? '#14b8a6' : overlay === 'cost' ? '#f59e0b' : '#10b981'

    // If showing carbon overlay for non-realtime, use carbon trend data
    const carbonData = carbonImpact.trend
    const showCarbon = overlay === 'carbon' && view !== 'realtime'

    const tooltipStyle = {
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 12,
        fontSize: 11,
        color: '#1f2937',
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
                <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary-500" />
                    <h3 className="text-sm font-bold text-gray-900">Consumption Analysis</h3>
                </div>

                <div className="sm:ml-auto flex flex-wrap gap-2">
                    {/* Timeframe toggles */}
                    <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                        {viewButtons.map(v => (
                            <button
                                key={v.key}
                                onClick={() => { setView(v.key); if (v.key === 'realtime') setOverlay('usage') }}
                                className={`px-2.5 py-1 text-[10px] font-semibold transition-all ${view === v.key
                                    ? 'bg-primary-500 text-white'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>

                    {/* Data overlay toggles (not for realtime) */}
                    {view !== 'realtime' && (
                        <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                            {overlayButtons.map(o => (
                                <button
                                    key={o.key}
                                    onClick={() => setOverlay(o.key)}
                                    className={`px-2.5 py-1 text-[10px] font-semibold transition-all ${overlay === o.key
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                        }`}
                                    style={overlay === o.key ? { background: o.color } : {}}
                                >
                                    {o.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Real-time stat */}
            {view === 'realtime' && (
                <div className="flex items-center gap-3 mb-4 px-2">
                    <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full bg-emerald-500"
                    />
                    <span className="text-xs text-gray-500">Live Reading:</span>
                    <span className="text-lg font-extrabold text-gray-900">{realTime.currentPower} <span className="text-xs text-gray-400">{realTime.unit}</span></span>
                    <span className="text-[10px] text-gray-400 ml-2">Today: {realTime.todayUsage} {realTime.todayUnit}</span>
                </div>
            )}

            {/* Chart */}
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    {view === 'realtime' ? (
                        <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey={xKey} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey={yKey} stroke="#14b8a6" strokeWidth={2.5} fill="url(#liveGrad)"
                                dot={{ r: 3, fill: '#14b8a6', strokeWidth: 0 }} activeDot={{ r: 5, fill: '#14b8a6' }} />
                        </AreaChart>
                    ) : showCarbon ? (
                        <AreaChart data={carbonData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <defs>
                                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Area type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={2} fill="url(#carbonGrad)" dot={{ r: 3, fill: '#10b981' }} />
                        </AreaChart>
                    ) : overlay === 'cost' ? (
                        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barCategoryGap="25%">
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey={xKey} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Bar dataKey={yKey} fill="#f59e0b" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    ) : (
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey={xKey} tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={32} />
                            <Tooltip contentStyle={tooltipStyle} />
                            <Line type="monotone" dataKey={yKey} stroke={chartColor} strokeWidth={2.5}
                                dot={{ r: 4, fill: chartColor, strokeWidth: 0 }} activeDot={{ r: 6, fill: chartColor }} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>

            {/* Cost summary mini-strip */}
            {view !== 'realtime' && overlay !== 'carbon' && (
                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-[10px]">
                    <span className="text-gray-500">This Month: <span className="text-gray-900 font-bold">₹{costEstimate.currentMonth}</span></span>
                    <span className="text-gray-500">Projected: <span className="text-amber-600 font-bold">₹{costEstimate.projectedMonth}</span></span>
                    <span className="text-gray-500">Last Month: <span className="text-gray-600 font-medium">₹{costEstimate.lastMonth}</span></span>
                    <span className="text-gray-500 ml-auto">Daily Avg: <span className="text-primary-600 font-bold">₹{costEstimate.dailyAvg}</span></span>
                </div>
            )}
        </motion.div>
    )
}
