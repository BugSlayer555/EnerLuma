import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function EcoScoreGauge() {
  const score = 87
  const circumference = 2 * Math.PI * 70
  const offset = circumference - (score / 100) * circumference

  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <h2 className="section-title" style={{ marginBottom: 28 }}>Monthly Eco-Score</h2>
      <div className="flex flex-col items-center" style={{ gap: 20 }}>
        <div className="relative" style={{ width: 180, height: 180 }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="70" fill="none" stroke="#f0f0f0" strokeWidth="12" />
            <circle
              cx="90" cy="90" r="70" fill="none"
              stroke="url(#ecoGrad)" strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dashoffset 1s ease-out' }}
            />
            <defs>
              <linearGradient id="ecoGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{score}</span>
            <span className="text-xs text-gray-500">/ 100</span>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-emerald-600">Excellent</p>
          <p className="text-xs text-gray-400 mt-1">AHP-weighted composite score</p>
        </div>
        <div className="w-full grid grid-cols-3 gap-4" style={{ marginTop: 8 }}>
          {[
            { label: 'Energy', value: 82, color: 'bg-primary-500' },
            { label: 'Water', value: 90, color: 'bg-cyan-500' },
            { label: 'Carbon', value: 88, color: 'bg-emerald-500' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <p className="text-xs text-gray-500 mb-2">{item.label}</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
              <p className="text-xs font-semibold text-gray-700 mt-1">{item.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
