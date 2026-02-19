import { motion } from 'framer-motion'
import { Wrench, CheckCircle, Clock, AlertTriangle, ClipboardList, DollarSign, User } from 'lucide-react'
import type { MaintenanceEntry } from '@/types/device.types'

const typeConfig = {
    scheduled: { color: '#3b82f6', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    unscheduled: { color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    repair: { color: '#ef4444', bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
    inspection: { color: '#8b5cf6', bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
}

const statusConfig = {
    completed: { icon: CheckCircle, color: '#10b981', bg: 'bg-emerald-50', text: 'text-emerald-600', label: 'Completed' },
    pending: { icon: Clock, color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-600', label: 'Pending' },
    overdue: { icon: AlertTriangle, color: '#ef4444', bg: 'bg-red-50', text: 'text-red-500', label: 'Overdue' },
}

interface Props {
    maintenanceLog: MaintenanceEntry[]
}

export default function DeviceMaintenanceLog({ maintenanceLog }: Props) {
    if (maintenanceLog.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <ClipboardList className="w-4 h-4 text-primary-500" />
                    <h3 className="text-sm font-bold text-gray-900">Maintenance Log</h3>
                </div>
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <Wrench className="w-8 h-8 text-gray-300" />
                    <p className="text-sm font-semibold text-gray-600">No maintenance records</p>
                    <p className="text-[10px] text-gray-400">Maintenance activities will appear here when logged</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
        >
            <div className="flex items-center gap-2 mb-4">
                <ClipboardList className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-bold text-gray-900">Maintenance Log</h3>
                <span className="ml-auto text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-semibold">
                    {maintenanceLog.length} entries
                </span>
            </div>

            <div className="space-y-2.5">
                {maintenanceLog.map((entry, i) => {
                    const typ = typeConfig[entry.type]
                    const stat = statusConfig[entry.status]
                    const StatusIcon = stat.icon

                    return (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 + i * 0.06 }}
                            className="p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100/60 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                {/* Type badge */}
                                <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full ${typ.bg} ${typ.text} border ${typ.border}`}>
                                    {entry.type}
                                </span>
                                {/* Status badge */}
                                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full ${stat.bg} border`}
                                    style={{ borderColor: `${stat.color}40` }}>
                                    <StatusIcon className="w-2.5 h-2.5" style={{ color: stat.color }} />
                                    <span className={`text-[8px] font-bold ${stat.text}`}>{stat.label}</span>
                                </div>
                                {/* Date */}
                                <span className="text-[9px] text-gray-400 ml-auto">{entry.date}</span>
                            </div>

                            <p className="text-[11px] text-gray-700 font-medium mb-1.5">{entry.description}</p>

                            <div className="flex items-center gap-4 text-[9px] text-gray-400">
                                <div className="flex items-center gap-1">
                                    <User className="w-2.5 h-2.5" />
                                    <span>{entry.technician}</span>
                                </div>
                                {entry.cost > 0 && (
                                    <div className="flex items-center gap-1">
                                        <DollarSign className="w-2.5 h-2.5" />
                                        <span className="font-semibold text-gray-600">₹{entry.cost.toLocaleString()}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
