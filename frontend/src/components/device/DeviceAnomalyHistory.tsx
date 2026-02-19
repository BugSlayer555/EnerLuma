import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Clock, Scan } from 'lucide-react'
import type { DeviceAnomaly } from '@/types/device.types'

const severityConfig = {
    low: { color: '#3b82f6', bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    medium: { color: '#f59e0b', bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    high: { color: '#ef4444', bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200' },
    critical: { color: '#dc2626', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
}

interface Props {
    anomalies: DeviceAnomaly[]
}

export default function DeviceAnomalyHistory({ anomalies }: Props) {
    if (anomalies.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
            >
                <div className="flex items-center gap-2 mb-4">
                    <Scan className="w-4 h-4 text-primary-500" />
                    <h3 className="text-sm font-bold text-gray-900">Anomaly History</h3>
                </div>
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                    <p className="text-sm font-semibold text-gray-700">No anomalies detected</p>
                    <p className="text-[10px] text-gray-400">This device is operating within normal parameters</p>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card"
        >
            <div className="flex items-center gap-2 mb-4">
                <Scan className="w-4 h-4 text-primary-500" />
                <h3 className="text-sm font-bold text-gray-900">Anomaly History</h3>
                <span className="ml-auto text-[9px] bg-red-50 text-red-500 px-2 py-0.5 rounded-full font-semibold border border-red-200">
                    {anomalies.filter(a => !a.resolved).length} active
                </span>
            </div>

            {/* Timeline */}
            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200" />

                <div className="space-y-3">
                    {anomalies.map((anomaly, i) => {
                        const sev = severityConfig[anomaly.severity]
                        return (
                            <motion.div
                                key={anomaly.id}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.06 }}
                                className="flex gap-3 relative"
                            >
                                {/* Timeline dot */}
                                <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 border-white"
                                    style={{ background: sev.color }}>
                                    {anomaly.resolved
                                        ? <CheckCircle className="w-3 h-3 text-white" />
                                        : <AlertTriangle className="w-3 h-3 text-white" />
                                    }
                                </div>

                                {/* Card */}
                                <div className={`flex-1 p-3 rounded-xl ${sev.bg} border ${sev.border}`}>
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                        <span className={`text-xs font-bold ${sev.text}`}>{anomaly.type}</span>
                                        <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full text-white"
                                            style={{ background: sev.color }}>
                                            {anomaly.severity}
                                        </span>
                                        {anomaly.resolved ? (
                                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200">RESOLVED</span>
                                        ) : (
                                            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 border border-red-200">ACTIVE</span>
                                        )}
                                    </div>
                                    <p className="text-[10px] text-gray-600 mb-1.5">{anomaly.description}</p>
                                    <div className="flex items-center gap-3 text-[9px] text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-2.5 h-2.5" />
                                            <span>{anomaly.date}</span>
                                        </div>
                                        <span className="font-bold" style={{ color: sev.color }}>
                                            +{anomaly.deviation}% deviation
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </motion.div>
    )
}
