import { motion } from 'framer-motion'
import { CheckCircle, Circle } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const goals = [
  { label: 'Reduce energy usage by 15%', current: 12, target: 15, unit: '%', done: false },
  { label: 'Achieve 4-Star BEE Rating', current: 4, target: 4, unit: 'stars', done: true },
  { label: 'Install smart thermostat', current: 1, target: 1, unit: '', done: true },
  { label: 'Reduce water by 20%', current: 18, target: 20, unit: '%', done: false },
  { label: 'Zero carbon week', current: 5, target: 7, unit: 'days', done: false },
]

export default function SustainabilityProgressTracker() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 className="section-title">Sustainability Progress Tracker</h2>
        <p className="text-xs text-gray-400 mt-1">Goal-Setting Theory — track your targets (Locke & Latham, 1990)</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {goals.map(g => {
          const pct = Math.min(100, (g.current / g.target) * 100)
          return (
            <div key={g.label}>
              <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
                <div className="flex items-center gap-3">
                  {g.done
                    ? <CheckCircle className="w-5 h-5 text-emerald-500" />
                    : <Circle className="w-5 h-5 text-gray-300" />}
                  <span className={`text-sm ${g.done ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>{g.label}</span>
                </div>
                <span className="text-xs text-gray-500">{g.current}/{g.target} {g.unit}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden" style={{ marginLeft: 32 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${g.done ? 'bg-emerald-500' : 'bg-eco-gradient'}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
