import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const badges = [
  { name: 'Energy Saver', desc: '7-day streak below daily average', earned: true, icon: '⚡' },
  { name: 'Water Guardian', desc: 'Reduced water usage by 20%', earned: true, icon: '💧' },
  { name: 'Carbon Neutral Week', desc: 'Net-zero carbon for 7 days', earned: true, icon: '🌿' },
  { name: 'Smart Scheduler', desc: 'Used off-peak power for 30 days', earned: true, icon: '⏰' },
  { name: 'Eco Champion', desc: 'Top 10% in neighborhood', earned: false, icon: '🏆' },
  { name: 'Solar Pioneer', desc: 'Generate 50% power from solar', earned: false, icon: '☀️' },
]

export default function GreenBadgeAchievements() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 28 }}>
        <Award className="w-5 h-5 text-amber-500" />
        <h2 className="section-title">Green Badge Achievements</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {badges.map(b => (
          <motion.div
            key={b.name}
            whileHover={{ y: -2 }}
            className={`rounded-2xl border p-5 transition-all ${b.earned ? 'bg-white border-emerald-200 shadow-sm' : 'bg-gray-50 border-gray-200 opacity-60'}`}
          >
            <div className="flex items-center gap-3" style={{ marginBottom: 12 }}>
              <span className="text-2xl">{b.icon}</span>
              <span className={`text-sm font-semibold ${b.earned ? 'text-gray-900' : 'text-gray-500'}`}>{b.name}</span>
            </div>
            <p className="text-xs text-gray-500">{b.desc}</p>
            {b.earned && (
              <p className="text-[10px] text-emerald-600 font-semibold mt-3">✓ Earned</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
