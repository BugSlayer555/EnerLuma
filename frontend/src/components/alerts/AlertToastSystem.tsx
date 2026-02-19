import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, ChevronRight } from 'lucide-react'
import type { ToastAlert } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

interface Props {
    toasts: ToastAlert[]
}

export default function AlertToastSystem({ toasts: initialToasts }: Props) {
    const [toasts, setToasts] = useState<ToastAlert[]>(initialToasts)

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    useEffect(() => {
        const timers = toasts.map(t =>
            setTimeout(() => dismiss(t.id), t.autoDismiss)
        )
        return () => timers.forEach(clearTimeout)
    }, [toasts, dismiss])

    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm w-full pointer-events-none">
            <AnimatePresence>
                {toasts.map(t => {
                    const sev = severityConfig[t.severity]
                    return (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, x: 80, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 80, scale: 0.85 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                            className="pointer-events-auto rounded-2xl p-4 shadow-2xl cursor-pointer"
                            style={{
                                background: '#ffffff',
                                border: `2px solid ${sev.border}`,
                                boxShadow: `0 8px 32px ${sev.color}18`,
                            }}
                            onClick={() => dismiss(t.id)}
                        >
                            {/* Severity accent bar */}
                            <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: sev.color }} />

                            <div className="flex items-start gap-3 pl-2">
                                <div className="p-2 rounded-xl flex-shrink-0" style={{ background: sev.bg }}>
                                    <Bell className="w-4 h-4" style={{ color: sev.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xl">{t.deviceIcon}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                                            style={{ background: sev.color }}>
                                            {sev.label}
                                        </span>
                                        <span className="text-[10px] text-gray-400 ml-auto">{t.timestamp}</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900">{t.title}</h4>
                                    <p className="text-[11px] text-gray-500 mt-0.5">{t.message}</p>
                                    <div className="flex items-center gap-1 mt-2 text-[10px] font-semibold" style={{ color: sev.color }}>
                                        View Details <ChevronRight className="w-3 h-3" />
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); dismiss(t.id) }}
                                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                                >
                                    <X className="w-3.5 h-3.5 text-gray-400" />
                                </button>
                            </div>

                            {/* Auto-dismiss progress bar */}
                            <motion.div
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: t.autoDismiss / 1000, ease: 'linear' }}
                                className="h-0.5 rounded-full mt-3"
                                style={{ background: sev.color, opacity: 0.4 }}
                            />
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
