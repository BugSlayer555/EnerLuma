import { motion } from 'framer-motion'

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const neighbors = [
  { rank: 1, name: 'Sharma Residence', score: 94, you: false },
  { rank: 2, name: 'Patel Home', score: 91, you: false },
  { rank: 3, name: 'Your Home', score: 87, you: true },
  { rank: 4, name: 'Kumar House', score: 82, you: false },
  { rank: 5, name: 'Singh Villa', score: 78, you: false },
  { rank: 6, name: 'Gupta Flat', score: 74, you: false },
]

export default function NeighborhoodRanking() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div style={{ marginBottom: 28 }}>
        <h2 className="section-title">Neighborhood Ranking</h2>
        <p className="text-xs text-gray-400 mt-1">How your efficiency compares to nearby homes (Social Norm Theory)</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {neighbors.map(n => (
          <div
            key={n.rank}
            className={`flex items-center rounded-xl transition-colors ${n.you ? 'bg-primary-50 border border-primary-200' : 'bg-gray-50'}`}
            style={{ padding: '16px 20px', gap: 16 }}
          >
            <span className={`text-lg font-bold ${n.rank <= 3 ? 'text-amber-500' : 'text-gray-400'}`} style={{ width: 32 }}>
              #{n.rank}
            </span>
            <span className={`text-sm font-semibold flex-1 ${n.you ? 'text-primary-700' : 'text-gray-700'}`}>
              {n.name} {n.you && <span className="text-[10px] text-primary-500 ml-1">(You)</span>}
            </span>
            <div className="flex items-center" style={{ gap: 12 }}>
              <div className="bg-gray-100 rounded-full overflow-hidden" style={{ width: 120, height: 6 }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${n.score}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`h-full rounded-full ${n.you ? 'bg-eco-gradient' : 'bg-gray-300'}`}
                />
              </div>
              <span className="text-sm font-bold text-gray-800" style={{ width: 40, textAlign: 'right' }}>{n.score}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
