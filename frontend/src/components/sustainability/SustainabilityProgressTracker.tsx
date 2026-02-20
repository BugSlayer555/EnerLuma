import { motion } from 'framer-motion'
import { Target, CheckCircle2, Circle, Clock } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

type MilestoneStatus = 'completed' | 'in-progress' | 'upcoming'

interface Milestone {
    title: string
    description: string
    status: MilestoneStatus
    date: string
    progress?: number
}

const milestones: Milestone[] = [
    { title: 'LED Full Migration', description: 'Replace all incandescent bulbs with smart LEDs', status: 'completed', date: 'Oct 2025' },
    { title: 'Smart Thermostat', description: 'Install AI-enabled thermostat for HVAC optimization', status: 'completed', date: 'Nov 2025' },
    { title: 'Water Leak Detection', description: 'Deploy smart water leak sensors across all zones', status: 'completed', date: 'Dec 2025' },
    { title: 'Solar Panel Phase 1', description: 'Install 3 kW rooftop solar array — 72% complete', status: 'in-progress', date: 'Mar 2026', progress: 72 },
    { title: 'EV Charger Integration', description: 'Connect EV charger to smart grid scheduling', status: 'in-progress', date: 'May 2026', progress: 35 },
    { title: 'Battery Storage', description: 'Add home battery for off-peak energy storage', status: 'upcoming', date: 'Aug 2026' },
    { title: 'Carbon Neutral Goal', description: 'Achieve net-zero carbon footprint household', status: 'upcoming', date: 'Dec 2027' },
]

const goals = [
    { label: 'Solar Adoption', progress: 72, target: '100% by 2027', color: '#14b8a6' },
    { label: 'Water Reduction', progress: 54, target: '30% reduction', color: '#06b6d4' },
    { label: 'Cost Savings', progress: 83, target: '₹20K/year', color: '#0f766e' },
    { label: 'Carbon Neutral', progress: 45, target: 'Net zero by 2030', color: '#10b981' },
]

const statusConfig: Record<MilestoneStatus, { icon: React.ElementType; color: string; bg: string; line: string }> = {
    'completed': { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', line: 'bg-emerald-300' },
    'in-progress': { icon: Clock, color: 'text-primary-500', bg: 'bg-primary-50', line: 'bg-primary-200' },
    'upcoming': { icon: Circle, color: 'text-gray-300', bg: 'bg-gray-50', line: 'bg-gray-200' },
}

export default function SustainabilityProgressTracker() {
    const completed = milestones.filter(m => m.status === 'completed').length
    const total = milestones.length
    const overallProgress = Math.round((completed / total) * 100)

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary-50 rounded-lg">
                        <Target className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                        <h2 className="section-title">Sustainability Progress</h2>
                        <p className="text-[10px] text-gray-400">Goal-setting framework (Locke & Latham, 1990)</p>
                    </div>
                </div>
                <div className="px-3 py-1.5 bg-primary-50 rounded-xl">
                    <span className="text-sm font-bold text-primary-700">{overallProgress}%</span>
                    <span className="text-[10px] text-primary-500 ml-1">overall</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Timeline */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Milestone Timeline</h3>
                    <div className="space-y-0">
                        {milestones.map((m, i) => {
                            const cfg = statusConfig[m.status]
                            const Icon = cfg.icon
                            const isLast = i === milestones.length - 1
                            return (
                                <motion.div
                                    key={m.title}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.06 * i }}
                                    className="flex gap-3"
                                >
                                    {/* Timeline line + dot */}
                                    <div className="flex flex-col items-center">
                                        <div className={`p-1 rounded-full ${cfg.bg}`}>
                                            <Icon className={`w-4 h-4 ${cfg.color}`} />
                                        </div>
                                        {!isLast && <div className={`w-0.5 flex-1 min-h-[24px] ${cfg.line}`} />}
                                    </div>
                                    {/* Content */}
                                    <div className={`pb-4 flex-1 ${m.status === 'upcoming' ? 'opacity-50' : ''}`}>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-gray-800">{m.title}</p>
                                            <span className="text-[10px] text-gray-400">{m.date}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-500 mt-0.5">{m.description}</p>
                                        {m.progress !== undefined && (
                                            <div className="mt-1.5">
                                                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }} animate={{ width: `${m.progress}%` }}
                                                        transition={{ duration: 0.6, delay: 0.1 * i }}
                                                        className="h-full rounded-full bg-primary-400"
                                                    />
                                                </div>
                                                <span className="text-[9px] text-primary-600 font-bold">{m.progress}%</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* Goal Progress Bars */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Sustainability Goals</h3>
                    <div className="space-y-4">
                        {goals.map((g, i) => (
                            <div key={g.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm font-medium text-gray-700">{g.label}</span>
                                    <span className="text-xs text-gray-400">{g.target}</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${g.progress}%` }}
                                        transition={{ duration: 0.8, delay: 0.1 * i, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: g.color }}
                                    />
                                </div>
                                <div className="text-right mt-0.5">
                                    <span className="text-xs font-bold" style={{ color: g.color }}>{g.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 p-3 bg-emerald-50 rounded-xl">
                        <p className="text-xs font-medium text-emerald-700 text-center">
                            🏆 <strong>{completed}</strong> of {total} milestones achieved — {overallProgress}% complete
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
