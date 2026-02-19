import { motion } from 'framer-motion'
import { BarChart3, Clock, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell,
} from 'recharts'
import type { AlertAnalytics } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

interface Props { analytics: AlertAnalytics }

export default function AlertAnalyticsDash({ analytics: a }: Props) {
    return (
        <div className="space-y-4">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { label: 'Total Alerts', value: a.totalAlerts, icon: BarChart3, color: '#6366f1', sub: 'Last 7 days' },
                    { label: 'Active Now', value: a.activeAlerts, icon: AlertTriangle, color: '#ef4444', sub: 'Needs attention' },
                    { label: 'Resolved', value: a.resolvedAlerts, icon: CheckCircle2, color: '#10b981', sub: `${((a.resolvedAlerts / a.totalAlerts) * 100).toFixed(0)}% resolve rate` },
                    { label: 'Avg Response', value: a.avgResponseTime, icon: Clock, color: '#f59e0b', sub: 'Time to first ack' },
                ].map((kpi, i) => (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-xl p-4 bg-white shadow-sm"
                        style={{ border: `1px solid ${kpi.color}30` }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-lg" style={{ background: `${kpi.color}15` }}>
                                <kpi.icon className="w-4 h-4" style={{ color: kpi.color }} />
                            </div>
                            <span className="text-[10px] text-gray-500 font-medium">{kpi.label}</span>
                        </div>
                        <p className="text-2xl font-extrabold text-gray-900">{kpi.value}</p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{kpi.sub}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Daily Trend Stacked Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-teal-500" />
                        <h3 className="text-sm font-bold text-gray-900">Daily Alert Trend</h3>
                    </div>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={a.dailyTrend} barCategoryGap="20%">
                                <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                                <Tooltip
                                    contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 11, color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="critical" stackId="a" fill="#dc2626" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="high" stackId="a" fill="#ef4444" />
                                <Bar dataKey="medium" stackId="a" fill="#f59e0b" />
                                <Bar dataKey="low" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex gap-3 mt-2 justify-center">
                        {(['critical', 'high', 'medium', 'low'] as const).map(s => (
                            <div key={s} className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-sm" style={{ background: severityConfig[s].color }} />
                                <span className="text-[9px] text-gray-500 capitalize">{s}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Severity Distribution Pie */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm"
                >
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Severity Distribution</h3>
                    <div className="flex items-center gap-4">
                        <div className="h-44 w-44 flex-shrink-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={a.severityDistribution} cx="50%" cy="50%"
                                        innerRadius={38} outerRadius={68} dataKey="count"
                                        paddingAngle={4} stroke="none">
                                        {a.severityDistribution.map((s, i) => (
                                            <Cell key={i} fill={s.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 12, fontSize: 11, color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-2 flex-1">
                            {a.severityDistribution.map(s => (
                                <div key={s.severity} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                                    <span className="text-xs text-gray-600 capitalize flex-1">{s.severity}</span>
                                    <span className="text-xs font-bold text-gray-900">{s.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Top Alerting Devices */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm"
                >
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Top Alerting Devices</h3>
                    <div className="space-y-3">
                        {a.topDevices.map((d, i) => {
                            const pct = (d.count / a.topDevices[0].count) * 100
                            return (
                                <div key={d.device} className="flex items-center gap-3">
                                    <span className="text-lg">{d.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-700 font-medium truncate">{d.device}</span>
                                            <span className="text-xs font-bold text-gray-900">{d.count}</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                                transition={{ duration: 0.8, delay: 0.35 + i * 0.08 }}
                                                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Category Breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="rounded-2xl p-5 bg-white border border-gray-200 shadow-sm"
                >
                    <h3 className="text-sm font-bold text-gray-900 mb-4">Category Breakdown</h3>
                    <div className="space-y-2.5">
                        {a.categoryBreakdown.map(c => (
                            <div key={c.category} className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.color }} />
                                <span className="text-xs text-gray-600 capitalize flex-1">{c.category}</span>
                                <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${(c.count / a.totalAlerts) * 100}%`, background: c.color }} />
                                </div>
                                <span className="text-xs font-bold text-gray-900 w-8 text-right">{c.count}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

