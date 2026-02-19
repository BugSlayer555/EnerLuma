import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Filter, CheckCircle, BellOff, Eye, Search } from 'lucide-react'
import type { AlertItem, AlertSeverity, AlertStatus } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

const statusIcons: Record<AlertStatus, { icon: typeof CheckCircle; color: string; label: string }> = {
    active: { icon: Eye, color: '#ef4444', label: 'Active' },
    acknowledged: { icon: CheckCircle, color: '#f59e0b', label: 'Ack\'d' },
    snoozed: { icon: BellOff, color: '#6366f1', label: 'Snoozed' },
    resolved: { icon: CheckCircle, color: '#10b981', label: 'Resolved' },
}

interface Props { alerts: AlertItem[] }

export default function AlertTimeline({ alerts }: Props) {
    const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all')
    const [filterStatus, setFilterStatus] = useState<AlertStatus | 'all'>('all')
    const [search, setSearch] = useState('')

    const filtered = alerts.filter(a => {
        if (filterSeverity !== 'all' && a.severity !== filterSeverity) return false
        if (filterStatus !== 'all' && a.status !== filterStatus) return false
        if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.device.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-300">Filters</span>
                    <span className="text-[10px] text-gray-500 ml-auto">{filtered.length} alerts</span>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search alerts or devices..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white/[0.04] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/40 transition-colors"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* Severity filters */}
                    <button onClick={() => setFilterSeverity('all')}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${filterSeverity === 'all' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                        All
                    </button>
                    {(Object.keys(severityConfig) as AlertSeverity[]).map(s => (
                        <button key={s} onClick={() => setFilterSeverity(filterSeverity === s ? 'all' : s)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all"
                            style={{
                                background: filterSeverity === s ? `${severityConfig[s].color}20` : 'transparent',
                                color: filterSeverity === s ? severityConfig[s].color : '#6b7280',
                                border: `1px solid ${filterSeverity === s ? severityConfig[s].color + '40' : 'transparent'}`
                            }}>
                            {severityConfig[s].icon} {severityConfig[s].label}
                        </button>
                    ))}

                    <div className="w-px bg-white/10 mx-1" />

                    {/* Status filters */}
                    {(Object.keys(statusIcons) as AlertStatus[]).map(s => (
                        <button key={s} onClick={() => setFilterStatus(filterStatus === s ? 'all' : s)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all ${filterStatus === s ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                            {statusIcons[s].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/30 via-white/10 to-transparent" />

                <div className="space-y-1">
                    {filtered.map((alert, i) => {
                        const sev = severityConfig[alert.severity]
                        const st = statusIcons[alert.status]
                        const StatusIcon = st.icon

                        return (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className="relative flex items-start gap-4 p-3 rounded-xl ml-2 group hover:bg-white/[0.03] transition-colors"
                            >
                                {/* Timeline dot */}
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                    style={{ background: `${sev.color}15`, border: `2px solid ${sev.color}40` }}>
                                    {alert.deviceIcon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="text-sm font-bold text-white">{alert.title}</h3>
                                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white" style={{ background: sev.color }}>
                                            {sev.label}
                                        </span>
                                        <span className="flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full"
                                            style={{ color: st.color, background: `${st.color}15` }}>
                                            <StatusIcon className="w-2.5 h-2.5" /> {st.label}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-gray-400 leading-relaxed mb-1">{alert.message}</p>
                                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {alert.timestamp}
                                        </span>
                                        <span>{alert.device}</span>
                                        {alert.value !== undefined && alert.threshold !== undefined && (
                                            <span className="text-red-400 font-medium">
                                                {alert.value} / {alert.threshold} {alert.unit}
                                            </span>
                                        )}
                                        {alert.confidence !== undefined && (
                                            <span className="text-indigo-400">{alert.confidence}% confidence</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-sm">No alerts match your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}
