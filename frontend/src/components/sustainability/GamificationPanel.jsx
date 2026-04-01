import { motion } from 'framer-motion'
import { Flame, Star, Target } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const challenges = [
  { title: 'Peak Hour Challenge', desc: 'Avoid high usage during 6–9 PM', reward: '+50 pts', progress: 70, active: true },
  { title: 'Shower Timer', desc: 'Keep showers under 5 minutes', reward: '+30 pts', progress: 100, active: false },
  { title: 'Weekend Warrior', desc: 'Reduce weekend usage vs weekday', reward: '+40 pts', progress: 45, active: true },
]

export default function GamificationPanel() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>
        <div>
          <h2 className="section-title">Gamification Hub</h2>
          <p className="text-xs text-gray-400 mt-1">Fogg Behavior Model — motivation through micro-challenges</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-xl">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700">680 pts</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-xl">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-600">12 day streak</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {challenges.map(c => (
          <motion.div
            key={c.title}
            whileHover={{ y: -2 }}
            className={`rounded-2xl border p-5 ${c.progress === 100 ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-200'}`}
          >
            <div className="flex items-center gap-2" style={{ marginBottom: 12 }}>
              <Target className={`w-4 h-4 ${c.progress === 100 ? 'text-emerald-600' : 'text-primary-500'}`} />
              <span className="text-sm font-semibold text-gray-800">{c.title}</span>
            </div>
            <p className="text-xs text-gray-500" style={{ marginBottom: 16 }}>{c.desc}</p>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden" style={{ marginBottom: 10 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${c.progress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`h-full rounded-full ${c.progress === 100 ? 'bg-emerald-500' : 'bg-eco-gradient'}`}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400">{c.progress}% complete</span>
              <span className="text-[10px] text-amber-600 font-bold">{c.reward}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
