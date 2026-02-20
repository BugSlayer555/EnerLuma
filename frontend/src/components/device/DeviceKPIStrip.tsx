import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import type { DeviceKPI } from '@/types/device.types'

interface Props { kpis: DeviceKPI[] }

export default function DeviceKPIStrip({ kpis }: Props) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {kpis.map((kpi, i) => {
                const isPositiveTrend = kpi.trend < 0 // lower is better for cost/usage
                return (
                    <motion.div
                        key={kpi.label}
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="bg-white rounded-xl p-4 relative overflow-hidden group hover:scale-[1.02] transition-transform border border-gray-100 shadow-card hover:shadow-card-hover"
                    >
                        {/* Decorative circle */}
                        <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full opacity-[0.08] group-hover:opacity-[0.12] transition-opacity"
                            style={{ background: kpi.color }} />

                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{kpi.icon}</span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{kpi.label}</span>
                        </div>

                        <p className="text-xl font-extrabold text-gray-900">
                            {kpi.value}<span className="text-xs text-gray-400 ml-1 font-medium">{kpi.unit}</span>
                        </p>

                        {/* Trend indicator */}
                        <div className="flex items-center gap-1 mt-1.5">
                            {kpi.trend >= 0
                                ? <TrendingUp className="w-3 h-3" style={{ color: isPositiveTrend ? '#10b981' : '#ef4444' }} />
                                : <TrendingDown className="w-3 h-3" style={{ color: isPositiveTrend ? '#10b981' : '#ef4444' }} />
                            }
                            <span className="text-[10px] font-semibold" style={{ color: isPositiveTrend ? '#10b981' : kpi.trend === 0 ? '#6b7280' : '#ef4444' }}>
                                {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                            </span>
                            <span className="text-[9px] text-gray-400">{kpi.trendLabel}</span>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
