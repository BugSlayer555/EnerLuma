import { motion } from 'framer-motion'
import {
    Flame, Star, Zap, Trophy, Target, Sparkles, ChevronRight,
} from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const level = 14
const currentXP = 2840
const nextLevelXP = 3500
const totalXP = 12840
const streak = 18

const xpProgress = Math.round((currentXP / nextLevelXP) * 100)

const recentActions = [
    { action: 'Eco Mode activated 5 days straight', xp: '+120 XP', time: '2h ago', icon: Zap, color: '#14b8a6' },
    { action: 'Water usage below target — 3 days', xp: '+80 XP', time: '1d ago', icon: Target, color: '#06b6d4' },
    { action: 'Badge unlocked: Solar Pioneer', xp: '+200 XP', time: '3d ago', icon: Star, color: '#f59e0b' },
    { action: 'Energy below baseline for a week', xp: '+150 XP', time: '5d ago', icon: Sparkles, color: '#10b981' },
]

const challenges = [
    { title: 'Weekend Warrior', desc: 'Use 20% less energy this weekend', reward: '100 XP', progress: 65, deadline: '2 days', color: '#14b8a6' },
    { title: 'Drip Detective', desc: 'No water leak alerts for 7 days', reward: '150 XP', progress: 85, deadline: '2 days', color: '#06b6d4' },
    { title: 'Peak Shift Pro', desc: 'Shift 50% of usage to off-peak hours', reward: '200 XP', progress: 40, deadline: '5 days', color: '#0f766e' },
]

export default function GamificationPanel() {
    return (
        <motion.div variants={fadeUp} className="card-static">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-purple-50 rounded-lg">
                        <Trophy className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="section-title">Gamification Hub</h2>
                        <p className="text-[10px] text-gray-400">Fogg Behavior Model + SDT (Deci & Ryan, 2000)</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* XP & Level */}
                <div>
                    {/* Level Display */}
                    <div className="flex items-center gap-4 mb-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <span className="text-lg font-bold text-white">Lv.{level}</span>
                            </div>
                            {/* Tiny XP ring */}
                            <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
                                <motion.circle
                                    cx="20" cy="20" r="18" fill="none"
                                    stroke="#fff" strokeWidth="2" strokeLinecap="round"
                                    initial={{ strokeDasharray: `0 ${2 * Math.PI * 18}` }}
                                    animate={{ strokeDasharray: `${(xpProgress / 100) * 2 * Math.PI * 18} ${2 * Math.PI * 18}` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800">Eco Enthusiast</p>
                            <div className="mt-1.5">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] text-gray-500">{currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP</span>
                                    <span className="text-[10px] font-bold text-purple-600">{xpProgress}%</span>
                                </div>
                                <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${xpProgress}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                                    />
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">Total: {totalXP.toLocaleString()} XP earned</p>
                        </div>
                    </div>

                    {/* Streak */}
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                        <div className="relative">
                            <Flame className="w-8 h-8 text-orange-500" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full opacity-50"
                            />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-orange-700">{streak} Days</p>
                            <p className="text-[10px] text-orange-500">Active eco-streak 🔥</p>
                        </div>
                    </div>
                </div>

                {/* Challenges */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Active Challenges</h3>
                    <div className="space-y-3">
                        {challenges.map((c, i) => (
                            <motion.div
                                key={c.title}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                whileHover={{ scale: 1.01 }}
                                className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-primary-50/30 transition-colors group"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-800">{c.title}</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${c.color}15`, color: c.color }}>{c.reward}</span>
                                </div>
                                <p className="text-[11px] text-gray-500">{c.desc}</p>
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[10px] text-gray-400">{c.deadline} left</span>
                                        <span className="text-[10px] font-bold" style={{ color: c.color }}>{c.progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }} animate={{ width: `${c.progress}%` }}
                                            transition={{ duration: 0.5, delay: 0.15 * i }}
                                            className="h-full rounded-full" style={{ background: c.color }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent XP Feed */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent XP Earned</h3>
                    <div className="space-y-2.5">
                        {recentActions.map((a, i) => (
                            <motion.div
                                key={a.action}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.08 * i }}
                                className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: `${a.color}15` }}>
                                    <a.icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-medium text-gray-700 leading-snug">{a.action}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{a.time}</p>
                                </div>
                                <span className="text-[10px] font-bold text-emerald-600 flex-shrink-0">{a.xp}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
