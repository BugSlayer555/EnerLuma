import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Wifi, WifiOff, AlertTriangle, Wrench } from 'lucide-react'
import { getDeviceAnalytics } from '@/utils/deviceEngine'
import DeviceKPIStrip from '@/components/device/DeviceKPIStrip'
import DeviceMainChart from '@/components/device/DeviceMainChart'
import DeviceAIInsights from '@/components/device/DeviceAIInsights'
import DeviceHealthPanel from '@/components/device/DeviceHealthPanel'
import DeviceMetadata from '@/components/device/DeviceMetadata'
import DeviceAnomalyHistory from '@/components/device/DeviceAnomalyHistory'
import DeviceMaintenanceLog from '@/components/device/DeviceMaintenanceLog'

const statusStyles = {
    online: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500', icon: Wifi, label: 'Online' },
    offline: { bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400', icon: WifiOff, label: 'Offline' },
    degraded: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400', icon: AlertTriangle, label: 'Degraded' },
    maintenance: { bg: 'bg-purple-50', text: 'text-purple-600', dot: 'bg-purple-400', icon: Wrench, label: 'Maintenance' },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function DeviceDetailPage() {
    const { deviceId } = useParams<{ deviceId: string }>()
    const data = getDeviceAnalytics(deviceId || 'hvac')
    const { profile, realTime, historical, kpis, efficiency, aiRecommendations, health, costEstimate, carbonImpact, comparisons, anomalies, maintenanceLog } = data

    const statusStyle = statusStyles[profile.status]
    const StatusIcon = statusStyle.icon

    return (
        <motion.div
            variants={stagger} initial="hidden" animate="visible"
            className="max-w-[1400px] mx-auto space-y-6"
        >
            {/* ─── Header ─────────────────────────────────────────────── */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Link to="/devices" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Devices
                </Link>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-3xl border border-primary-100">
                    {profile.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-xl font-bold text-gray-900">{profile.name}</h1>
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${statusStyle.bg} border`}
                            style={{ borderColor: `${statusStyle.dot.replace('bg-', '')}20` }}>
                            <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                            <StatusIcon className={`w-3 h-3 ${statusStyle.text}`} />
                            <span className={`text-[10px] font-semibold ${statusStyle.text}`}>{statusStyle.label}</span>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {profile.type} · {profile.brand} {profile.model} · {profile.location}
                    </p>
                </div>
            </motion.div>

            {/* ─── Section 1: KPI Strip ───────────────────────────────── */}
            <motion.div variants={fadeUp}>
                <DeviceKPIStrip kpis={kpis} />
            </motion.div>

            {/* ─── Section 2: Main Chart ──────────────────────────────── */}
            <motion.div variants={fadeUp}>
                <DeviceMainChart
                    realTime={realTime}
                    historical={historical}
                    costEstimate={costEstimate}
                    carbonImpact={carbonImpact}
                    unit={realTime.todayUnit}
                />
            </motion.div>

            {/* ─── Section 3: AI Insights ─────────────────────────────── */}
            <motion.div variants={fadeUp}>
                <DeviceAIInsights
                    efficiency={efficiency}
                    recommendations={aiRecommendations}
                    comparisons={comparisons}
                />
            </motion.div>

            {/* ─── Section 4: Metadata — Profile + Health + Cost + Carbon ── */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Health Panel takes 1 column */}
                <DeviceHealthPanel health={health} />
                {/* Metadata stretches across remaining space */}
                <div className="lg:col-span-2">
                    <DeviceMetadata
                        profile={profile}
                        costEstimate={costEstimate}
                        carbonImpact={carbonImpact}
                    />
                </div>
            </motion.div>

            {/* ─── Section 5: Alerts & History ────────────────────────── */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DeviceAnomalyHistory anomalies={anomalies} />
                <DeviceMaintenanceLog maintenanceLog={maintenanceLog} />
            </motion.div>
        </motion.div>
    )
}
