import { motion } from 'framer-motion'
import {
    Award, Droplets, Zap, Leaf, TreePine, Sun, Flame, Shield,
} from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

type BadgeTier = 'Gold' | 'Silver' | 'Bronze' | 'Locked'

interface Badge {
    name: string
    icon: React.ElementType
    tier: BadgeTier
    description: string
    progress: number // 0-100
    requirement: string
}

const badges: Badge[] = [
    { name: 'Water Saver', icon: Droplets, tier: 'Gold', description: '30% water reduction achieved', progress: 100, requirement: '30% reduction' },
    { name: 'Energy Champion', icon: Zap, tier: 'Gold', description: 'Top 10% energy efficiency', progress: 100, requirement: 'Top 10% efficiency' },
    { name: 'Eco Warrior', icon: Leaf, tier: 'Silver', description: 'Eco-score above 80 for 6 months', progress: 100, requirement: '80+ eco-score × 6mo' },
    { name: 'Carbon Crusher', icon: TreePine, tier: 'Silver', description: '100 kg CO₂ saved lifetime', progress: 100, requirement: '100 kg CO₂ saved' },
    { name: 'Solar Pioneer', icon: Sun, tier: 'Bronze', description: 'First month of solar usage', progress: 100, requirement: '1 month solar' },
    { name: 'Streak Master', icon: Flame, tier: 'Bronze', description: '30-day green streak', progress: 82, requirement: '30-day streak' },
    { name: 'Grid Guardian', icon: Shield, tier: 'Locked', description: 'Off-peak usage for 3 months', progress: 45, requirement: '3 months off-peak' },
    { name: 'Net Zero Hero', icon: Award, tier: 'Locked', description: 'Achieve net-zero month', progress: 28, requirement: 'Net-zero month' },
]

const tierConfig: Record<BadgeTier, { bg: string; border: string; iconBg: string; text: string }> = {
    Gold: { bg: 'from-amber-50 to-yellow-50', border: 'border-amber-200', iconBg: 'from-amber-400 to-yellow-500', text: 'text-amber-600' },
    Silver: { bg: 'from-gray-50 to-slate-50', border: 'border-gray-300', iconBg: 'from-gray-400 to-slate-500', text: 'text-gray-600' },
    Bronze: { bg: 'from-orange-50 to-amber-50', border: 'border-orange-200', iconBg: 'from-orange-400 to-amber-600', text: 'text-orange-600' },
    Locked: { bg: 'from-gray-50 to-gray-50', border: 'border-gray-200', iconBg: 'from-gray-300 to-gray-400', text: 'text-gray-400' },
}

export default function GreenBadgeAchievements() {
    const earned = badges.filter(b => b.tier !== 'Locked').length
    const total = badges.length

    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-50 rounded-lg">
                        <Award className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                        <h2 className="section-title">Green Badge Achievements</h2>
                        <p className="text-[10px] text-gray-400">Milestones unlocked through sustainable actions</p>
                    </div>
                </div>
                <div className="px-3 py-1.5 bg-amber-50 rounded-xl">
                    <span className="text-sm font-bold text-amber-700">{earned}/{total}</span>
                    <span className="text-[10px] text-amber-500 ml-1">earned</span>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {badges.map((b, i) => {
                    const cfg = tierConfig[b.tier]
                    const isLocked = b.tier === 'Locked'
                    return (
                        <motion.div
                            key={b.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * i, type: 'spring', stiffness: 200 }}
                            whileHover={{ scale: 1.04, y: -2 }}
                            className={`relative p-4 rounded-2xl text-center border transition-all cursor-pointer bg-gradient-to-br ${cfg.bg} ${cfg.border} ${isLocked ? 'opacity-60' : ''}`}
                        >
                            {/* Badge Icon */}
                            <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center bg-gradient-to-br ${cfg.iconBg}`}>
                                <b.icon className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-gray-800 mt-2">{b.name}</p>
                            <p className={`text-[10px] font-bold mt-0.5 ${cfg.text}`}>{b.tier}</p>

                            {/* Progress for in-progress badges */}
                            {b.progress < 100 && (
                                <div className="mt-2">
                                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${b.progress}%` }}
                                            transition={{ duration: 0.6, delay: 0.1 * i }}
                                            className="h-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500"
                                        />
                                    </div>
                                    <p className="text-[9px] text-gray-400 mt-1">{b.progress}%</p>
                                </div>
                            )}

                            {/* Tooltip-style hover description */}
                            <p className="text-[9px] text-gray-400 mt-1.5 leading-snug">{b.requirement}</p>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
