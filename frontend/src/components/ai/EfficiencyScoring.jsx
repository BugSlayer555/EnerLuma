import { motion } from 'framer-motion'
import { Award, AlertTriangle, IndianRupee } from 'lucide-react'

function GaugeArc({ score, color }) {
  const r = 32, c = Math.PI * r, offset = c - (score / 100) * c
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 76, height: 44 }}>
      <svg width="76" height="44" viewBox="0 0 76 44">
        <path d="M 6 40 A 32 32 0 0 1 70 40" fill="none" stroke="#e5e7eb" strokeWidth="6" strokeLinecap="round" />
        <path d="M 6 40 A 32 32 0 0 1 70 40" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
      </svg>
      <span style={{ position: 'absolute', bottom: 0, fontSize: '14px', fontWeight: 800, color: '#1f2937' }}>{score}</span>
    </div>
  )
}

export default function EfficiencyScoring({ scores }) {
  const totalWasted = scores.reduce((s, a) => s + a.wastedCost, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        padding: '28px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
        <Award style={{ width: 20, height: 20, color: '#f59e0b' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Efficiency Scoring</h2>
      </div>
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 22px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <IndianRupee style={{ width: 14, height: 14, color: '#ef4444' }} />
        Total waste: <span style={{ color: '#ef4444', fontWeight: 700 }}>₹{totalWasted}/mo</span> recoverable
      </p>

      {/* Appliance list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {scores.map((a, i) => (
          <motion.div
            key={a.applianceId}
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 18px', borderRadius: '14px',
              background: '#f9fafb', border: '1px solid #f3f4f6',
            }}
          >
            <span style={{ fontSize: '22px' }}>{a.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>{a.name}</span>
                <span style={{
                  fontSize: '11px', fontWeight: 800,
                  padding: '2px 8px', borderRadius: '20px',
                  background: `${a.gradeColor}15`, color: a.gradeColor,
                }}>{a.grade}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '5px', fontSize: '10px', color: '#9ca3af' }}>
                <span>Avg: {a.avgUsage} kWh</span>
                <span>Optimal: {a.optimalUsage} kWh</span>
                {a.wastedCost > 0 && (
                  <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <AlertTriangle style={{ width: 10, height: 10 }} />
                    ₹{a.wastedCost}/mo waste
                  </span>
                )}
              </div>
              {a.recommendations.length > 0 && (
                <p style={{ fontSize: '10px', color: '#14b8a6', margin: '4px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.recommendations[0]}</p>
              )}
            </div>
            <GaugeArc score={a.score} color={a.gradeColor} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
