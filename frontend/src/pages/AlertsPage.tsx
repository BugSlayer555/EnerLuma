import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Bell, Clock, BarChart3, SlidersHorizontal, Layers,
    Scan, Eye, Cpu, ChevronDown,
} from 'lucide-react'

// ── Alert Components ────────────────────────────────────────────────────────
import AlertToastSystem from '@/components/alerts/AlertToastSystem'
import AlertTimeline from '@/components/alerts/AlertTimeline'
import AlertAnalyticsDash from '@/components/alerts/AlertAnalyticsDash'
import ThresholdCustomizer from '@/components/alerts/ThresholdCustomizer'
import SmartAlertGroups from '@/components/alerts/SmartAlertGroups'
import AnomalyDetection from '@/components/alerts/AnomalyDetection'
import PredictiveWarnings from '@/components/alerts/PredictiveWarnings'
import DeviceHealthMonitor from '@/components/alerts/DeviceHealthMonitor'

// ── Alert Engine ────────────────────────────────────────────────────────────
import {
    getAlertHistory, getToastQueue, getAlertGroups,
    getThresholdConfigs, getAnomalyAlerts, getPredictiveWarnings,
    getDeviceHealthData, getAlertAnalytics,
} from '@/utils/alertEngine'

// ── Tab config ──────────────────────────────────────────────────────────────
const tabs = [
    { id: 'timeline', label: 'Alert History', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'thresholds', label: 'Thresholds', icon: SlidersHorizontal },
    { id: 'groups', label: 'Smart Groups', icon: Layers },
    { id: 'anomalies', label: 'Anomalies', icon: Scan },
    { id: 'predictive', label: 'Predictive', icon: Eye },
    { id: 'devices', label: 'Device Health', icon: Cpu },
]

// ── Page ────────────────────────────────────────────────────────────────────
export default function AlertsPage() {
    const [activeTab, setActiveTab] = useState('timeline')
    const [dropdownOpen, setDropdownOpen] = useState(false)

    // Data
    const alertHistory = getAlertHistory()
    const toasts = getToastQueue()
    const alertGroups = getAlertGroups()
    const thresholds = getThresholdConfigs()
    const anomalies = getAnomalyAlerts()
    const predictive = getPredictiveWarnings()
    const devices = getDeviceHealthData()
    const analytics = getAlertAnalytics()

    const activeTabData = tabs.find(t => t.id === activeTab)!

    // Counts for header badges
    const activeAlerts = alertHistory.filter(a => a.status === 'active').length
    const criticalCount = alertHistory.filter(a => a.severity === 'critical' && a.status === 'active').length

    return (
        <>
            {/* Toast overlay */}
            <AlertToastSystem toasts={toasts} />

            <div className="space-y-6">
                {/* ── Header ──────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-amber-500/20 border border-red-500/20 relative">
                            <Bell className="w-6 h-6 text-red-500" />
                            {criticalCount > 0 && (
                                <motion.span
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center"
                                >
                                    {criticalCount}
                                </motion.span>
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Alert Command Center</h1>
                            <p className="text-xs text-gray-500">Real-time monitoring &amp; intelligent alerting</p>
                        </div>
                    </div>
                    <div className="sm:ml-auto flex items-center gap-3">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] text-red-600 font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            {activeAlerts} Active
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-600 font-semibold">
                            {analytics.resolvedAlerts} Resolved
                        </span>
                        <span className="text-[10px] text-gray-500">WebSocket: Connected</span>
                    </div>
                </motion.div>

                {/* ── Tab Navigation ──────────────────────────────────── */}
                {/* Desktop */}
                <div className="hidden sm:block overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="flex gap-1.5 min-w-max">
                        {tabs.map(t => {
                            const isActive = activeTab === t.id
                            return (
                                <button
                                    key={t.id}
                                    onClick={() => setActiveTab(t.id)}
                                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${isActive
                                        ? 'bg-teal-500/10 text-teal-700 border border-teal-500/20 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 border border-transparent'
                                        }`}
                                >
                                    <t.icon className="w-3.5 h-3.5" />
                                    {t.label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Mobile dropdown */}
                <div className="sm:hidden relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-900 shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <activeTabData.icon className="w-4 h-4 text-teal-500" />
                            {activeTabData.label}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white"
                            >
                                {tabs.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => { setActiveTab(t.id); setDropdownOpen(false) }}
                                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-colors ${activeTab === t.id ? 'bg-teal-50 text-teal-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <t.icon className="w-3.5 h-3.5" />
                                        {t.label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* ── Tab Content ─────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {activeTab === 'timeline' && <AlertTimeline alerts={alertHistory} />}
                        {activeTab === 'analytics' && <AlertAnalyticsDash analytics={analytics} />}
                        {activeTab === 'thresholds' && <ThresholdCustomizer configs={thresholds} />}
                        {activeTab === 'groups' && <SmartAlertGroups groups={alertGroups} />}
                        {activeTab === 'anomalies' && <AnomalyDetection anomalies={anomalies} />}
                        {activeTab === 'predictive' && <PredictiveWarnings warnings={predictive} />}
                        {activeTab === 'devices' && <DeviceHealthMonitor devices={devices} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

