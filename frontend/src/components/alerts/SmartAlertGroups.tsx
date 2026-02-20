import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, BellOff, ChevronDown, Clock } from 'lucide-react'
import type { AlertGroup } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

interface Props { groups: AlertGroup[] }

export default function SmartAlertGroups({ groups }: Props) {
    const [expanded, setExpanded] = useState<string | null>(null)
    const [snoozed, setSnoozed] = useState<Set<string>>(new Set(groups.filter(g => g.snoozed).map(g => g.groupId)))

    const toggleSnooze = (id: string) => {
        setSnoozed(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-900">Smart Alert Groups</h2>
                <span className="text-[10px] text-gray-500 ml-auto">{groups.length} groups • {snoozed.size} snoozed</span>
            </div>

            <div className="space-y-3">
                {groups.map((g, i) => {
                    const sev = severityConfig[g.severity]
                    const isOpen = expanded === g.groupId
                    const isSnoozed = snoozed.has(g.groupId)

                    return (
                        <motion.div
                            key={g.groupId}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="rounded-xl overflow-hidden shadow-sm"
                            style={{
                                background: isSnoozed ? '#f8fafc' : '#ffffff',
                                border: `1px solid ${isSnoozed ? '#e2e8f0' : sev.color + '30'}`,
                                opacity: isSnoozed ? 0.7 : 1,
                            }}
                        >
                            {/* Group header */}
                            <div
                                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setExpanded(isOpen ? null : g.groupId)}
                            >
                                <span className="text-xl">{g.deviceIcon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                        <h3 className="text-sm font-bold text-gray-900">{g.title}</h3>
                                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full text-white" style={{ background: sev.color }}>
                                            {sev.label}
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                            ×{g.count}
                                        </span>
                                        {isSnoozed && (
                                            <span className="text-[9px] text-indigo-500 flex items-center gap-1">
                                                <BellOff className="w-3 h-3" /> Snoozed {g.snoozeUntil && `(${g.snoozeUntil})`}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                                        <span>First: {g.firstOccurrence}</span>
                                        <span>Latest: {g.lastOccurrence}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleSnooze(g.groupId) }}
                                    className={`p-2 rounded-lg text-xs transition-all ${isSnoozed ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-100 text-gray-500'}`}
                                    title={isSnoozed ? 'Un-snooze' : 'Snooze group'}
                                >
                                    <BellOff className="w-4 h-4" />
                                </button>

                                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </motion.div>
                            </div>

                            {/* Expanded alerts */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="border-t border-gray-100 px-4 pb-4 bg-gray-50/50">
                                            {g.alerts.map((a) => {
                                                const aSev = severityConfig[a.severity]
                                                return (
                                                    <div key={a.id} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
                                                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: aSev.color }} />
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <span className="text-xs font-semibold text-gray-700">{a.title}</span>
                                                                <span className="text-[9px] px-1 py-0.5 rounded" style={{ color: aSev.color, background: `${aSev.color}15` }}>
                                                                    {aSev.label}
                                                                </span>
                                                            </div>
                                                            <p className="text-[10px] text-gray-600">{a.message}</p>
                                                        </div>
                                                        <span className="text-[10px] text-gray-500 flex items-center gap-1 flex-shrink-0">
                                                            <Clock className="w-3 h-3" /> {a.timestamp}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                            {g.count > g.alerts.length && (
                                                <p className="text-[10px] text-gray-500 mt-2 text-center">
                                                    +{g.count - g.alerts.length} more alerts in this group
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
