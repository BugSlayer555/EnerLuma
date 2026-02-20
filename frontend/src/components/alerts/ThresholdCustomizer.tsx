import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Bell, Mail, MessageSquare, ToggleLeft, ToggleRight } from 'lucide-react'
import type { ThresholdConfig, AlertSeverity } from '@/types/alerts.types'
import { severityConfig } from '@/utils/alertEngine'

interface Props { configs: ThresholdConfig[] }

export default function ThresholdCustomizer({ configs: initialConfigs }: Props) {
    const [configs, setConfigs] = useState(initialConfigs)

    const toggleEnabled = (id: string) => {
        setConfigs(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))
    }

    const updateThreshold = (id: string, value: number) => {
        setConfigs(prev => prev.map(c => c.id === id ? { ...c, maxThreshold: value } : c))
    }

    const cycleSeverity = (id: string) => {
        const order: AlertSeverity[] = ['low', 'medium', 'high', 'critical']
        setConfigs(prev => prev.map(c => {
            if (c.id !== id) return c
            const next = order[(order.indexOf(c.severity) + 1) % order.length]
            return { ...c, severity: next }
        }))
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <SlidersHorizontal className="w-5 h-5 text-teal-500" />
                <h2 className="text-lg font-bold text-gray-900">Threshold Configuration</h2>
                <span className="text-[10px] text-gray-500 ml-auto">{configs.filter(c => c.enabled).length} active thresholds</span>
            </div>

            <div className="space-y-3">
                {configs.map((c, i) => {
                    const sev = severityConfig[c.severity]
                    const pct = c.maxThreshold > 0 ? (c.currentValue / c.maxThreshold) * 100 : 0
                    const isOver = pct > 100

                    return (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            className="rounded-xl p-4 transition-all"
                            style={{
                                background: c.enabled ? '#ffffff' : '#f8fafc',
                                border: `1px solid ${c.enabled ? '#e2e8f0' : '#f1f5f9'}`,
                                opacity: c.enabled ? 1 : 0.6,
                                boxShadow: c.enabled ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xl">{c.deviceIcon}</span>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-gray-900">{c.device}</h3>
                                    <span className="text-[10px] text-gray-500">{c.metric} ({c.unit})</span>
                                </div>

                                {/* Severity badge (clickable) */}
                                <button onClick={() => cycleSeverity(c.id)}
                                    className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white cursor-pointer hover:opacity-80 transition-opacity"
                                    style={{ background: sev.color }}
                                    title="Click to change severity">
                                    {sev.label}
                                </button>

                                {/* Toggle */}
                                <button onClick={() => toggleEnabled(c.id)} className="transition-transform hover:scale-110">
                                    {c.enabled
                                        ? <ToggleRight className="w-6 h-6 text-teal-500" />
                                        : <ToggleLeft className="w-6 h-6 text-gray-400" />
                                    }
                                </button>
                            </div>

                            {c.enabled && (
                                <>
                                    {/* Current vs threshold bar */}
                                    <div className="mb-3">
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className={isOver ? 'text-red-500 font-bold' : 'text-gray-500'}>
                                                Current: {c.currentValue} {c.unit}
                                            </span>
                                            <span className="text-gray-500">Max: {c.maxThreshold} {c.unit}</span>
                                        </div>
                                        <div className="h-2 rounded-full bg-gray-100 overflow-hidden relative">
                                            <motion.div
                                                initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                                className="h-full rounded-full"
                                                style={{
                                                    background: isOver
                                                        ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                                                        : pct > 80
                                                            ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                                                            : 'linear-gradient(90deg, #14b8a6, #10b981)',
                                                }}
                                            />
                                            {/* Threshold marker */}
                                            <div className="absolute top-0 w-0.5 h-full bg-white" style={{ left: '100%' }} />
                                        </div>
                                    </div>

                                    {/* Slider */}
                                    <div className="mb-3">
                                        <label className="text-[10px] text-gray-500 mb-1 block">Adjust threshold</label>
                                        <input
                                            type="range"
                                            min={c.minThreshold}
                                            max={c.maxThreshold * 2}
                                            value={c.maxThreshold}
                                            onChange={e => updateThreshold(c.id, Number(e.target.value))}
                                            className="w-full h-1 rounded-full appearance-none bg-gray-200 cursor-pointer accent-teal-500"
                                        />
                                    </div>

                                    {/* Notification channels */}
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-gray-500">Notify via:</span>
                                        {[
                                            { key: 'toast' as const, icon: Bell, label: 'Toast' },
                                            { key: 'email' as const, icon: Mail, label: 'Email' },
                                            { key: 'sms' as const, icon: MessageSquare, label: 'SMS' },
                                        ].map(ch => {
                                            const active = c.notifyVia.includes(ch.key)
                                            return (
                                                <span key={ch.key}
                                                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium cursor-pointer transition-all ${active ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'text-gray-500 border border-transparent hover:text-gray-700'}`}>
                                                    <ch.icon className="w-3 h-3" />
                                                    {ch.label}
                                                </span>
                                            )
                                        })}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

