import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const metrics = [
  { label: 'Appliance Rating', value: 82, max: 100 },
  { label: 'Insulation Score', value: 71, max: 100 },
  { label: 'HVAC Efficiency', value: 88, max: 100 },
  { label: 'Lighting Efficiency', value: 65, max: 100 },
  { label: 'Water Heating', value: 75, max: 100 },
]

export default function EfficiencyIndex() {
  const overall = 78
  const stars = 4

  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <h2 className="section-title" style={{ marginBottom: 28 }}>Home Efficiency Index</h2>
      <div className="flex items-center gap-6" style={{ marginBottom: 28 }}>
        <div className="flex items-center justify-center rounded-2xl bg-primary-50 border border-primary-100" style={{ width: 80, height: 80 }}>
          <span className="text-2xl font-bold text-primary-700">{overall}</span>
        </div>
        <div>
          <div className="flex items-center gap-1" style={{ marginBottom: 4 }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-800">4-Star BEE Rating</p>
          <p className="text-xs text-gray-400 mt-1">Bureau of Energy Efficiency, India</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {metrics.map(m => (
          <div key={m.label}>
            <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
              <span className="text-sm text-gray-600">{m.label}</span>
              <span className="text-sm font-semibold text-gray-800">{m.value}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full rounded-full bg-eco-gradient"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
