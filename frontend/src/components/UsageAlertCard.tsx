import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, ArrowRight, Zap, Droplets } from 'lucide-react'

/* ─────────────────────────── TYPES ─────────────────────────── */

interface UsageAlertData {
    type: 'energy' | 'water' | 'both'
    energyUsage?: number
    energyThreshold?: number
    waterUsage?: number
    waterThreshold?: number
}

interface UsageAlertCardProps {
    alert: UsageAlertData
    onDismiss: () => void
    onViewInsights: () => void
}

/* ─────────────────────── ANIMATION VARIANTS ────────────────── */

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
}

const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: 10,
        scale: 0.98,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
}

/* ────────────────── THRESHOLD BAR SUB-COMPONENT ────────────── */

function ThresholdBar({
    label,
    icon: Icon,
    usage,
    threshold,
    unit,
    accentFrom,
    accentTo,
}: {
    label: string
    icon: React.ElementType
    usage: number
    threshold: number
    unit: string
    accentFrom: string
    accentTo: string
}) {
    const percent = Math.min((usage / (threshold * 1.5)) * 100, 100)
    const thresholdPercent = (threshold / (threshold * 1.5)) * 100
    const exceeded = usage > threshold

    return (
        <div className="p-3.5 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2.5">
                <div
                    className="p-1.5 rounded-lg"
                    style={{ background: `linear-gradient(135deg, ${accentFrom}14, ${accentFrom}08)` }}
                >
                    <Icon className="w-3.5 h-3.5" style={{ color: accentFrom }} />
                </div>
                <span className="text-xs font-semibold text-gray-700">{label}</span>
                <span className="ml-auto text-xs text-gray-400">
                    Threshold: <span className="font-semibold text-gray-600">{threshold} {unit}</span>
                </span>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{
                        background: exceeded
                            ? `linear-gradient(90deg, ${accentFrom}, #f59e0b)`
                            : `linear-gradient(90deg, ${accentFrom}, ${accentTo})`,
                    }}
                />
                {/* Threshold marker */}
                <div
                    className="absolute top-0 h-full w-0.5 bg-gray-400"
                    style={{ left: `${thresholdPercent}%` }}
                />
            </div>

            <div className="flex justify-between mt-1.5">
                <span className="text-[10px] font-semibold" style={{ color: exceeded ? '#d97706' : accentFrom }}>
                    {usage} {unit}
                </span>
                {exceeded && (
                    <span className="text-[10px] font-semibold text-amber-500">
                        +{((usage - threshold) / threshold * 100).toFixed(0)}% over limit
                    </span>
                )}
            </div>
        </div>
    )
}

/* ──────────────────── MAIN ALERT CARD COMPONENT ────────────── */

export default function UsageAlertCard({ alert, onDismiss, onViewInsights }: UsageAlertCardProps) {
    const [isVisible, setIsVisible] = useState(true)

    const handleDismiss = () => {
        setIsVisible(false)
        setTimeout(onDismiss, 220)
    }

    if (!isVisible) return null

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="usage-alert-overlay"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
                    onClick={handleDismiss}
                >
                    {/* Dim overlay */}
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Card */}
                    <motion.div
                        key="usage-alert-card"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-[500px] bg-white rounded-2xl overflow-hidden"
                        style={{
                            boxShadow:
                                '0 24px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
                        }}
                    >
                        {/* Top accent bar */}
                        <div
                            className="h-1"
                            style={{
                                background: 'linear-gradient(90deg, #0f766e, #14b8a6, #f59e0b)',
                            }}
                        />

                        {/* Close button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors group"
                            aria-label="Dismiss alert"
                        >
                            <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </button>

                        {/* Content */}
                        <div className="px-7 pt-6 pb-7">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4"
                                style={{ background: '#FFF4D8' }}
                            >
                                <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#b46a00' }} />
                                <span className="text-xs font-bold tracking-wide" style={{ color: '#b46a00' }}>
                                    Usage Alert
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-xl font-bold text-gray-900 leading-tight mb-2">
                                High Consumption Detected This Week
                            </h2>

                            {/* Subtext */}
                            <p className="text-sm text-gray-500 leading-relaxed mb-5">
                                Your {alert.type === 'energy' ? 'energy' : alert.type === 'water' ? 'water' : 'energy and water'} usage
                                has exceeded the recommended weekly threshold. Reviewing your consumption
                                may help you reduce costs and improve sustainability.
                            </p>

                            {/* Threshold Bars */}
                            <div className="space-y-3 mb-6">
                                {(alert.type === 'energy' || alert.type === 'both') && alert.energyUsage != null && alert.energyThreshold != null && (
                                    <ThresholdBar
                                        label="Weekly Energy"
                                        icon={Zap}
                                        usage={alert.energyUsage}
                                        threshold={alert.energyThreshold}
                                        unit="kWh"
                                        accentFrom="#0f766e"
                                        accentTo="#14b8a6"
                                    />
                                )}
                                {(alert.type === 'water' || alert.type === 'both') && alert.waterUsage != null && alert.waterThreshold != null && (
                                    <ThresholdBar
                                        label="Weekly Water"
                                        icon={Droplets}
                                        usage={alert.waterUsage}
                                        threshold={alert.waterThreshold}
                                        unit="L"
                                        accentFrom="#0891b2"
                                        accentTo="#22d3ee"
                                    />
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <motion.button
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onViewInsights}
                                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-shadow"
                                    style={{
                                        background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                                        boxShadow: '0 4px 14px rgba(15, 118, 110, 0.3)',
                                    }}
                                >
                                    View Insights
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>

                                <motion.button
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleDismiss}
                                    className="px-5 py-3 rounded-xl text-sm font-semibold text-gray-500 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-700 transition-all"
                                >
                                    Dismiss
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
