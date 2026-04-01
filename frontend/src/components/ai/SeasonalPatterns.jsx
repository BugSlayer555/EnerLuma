import { motion } from 'framer-motion'
import { Sun, CloudRain, Snowflake, Flower2, TrendingUp, TrendingDown, Lightbulb } from 'lucide-react'

const seasonIcons = {
  summer: Sun,
  monsoon: CloudRain,
  winter: Snowflake,
  spring: Flower2,
}

export default function SeasonalPatterns({ patterns }) {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
        <Sun style={{ width: 20, height: 20, color: '#f59e0b' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Seasonal Pattern Detection</h2>
      </div>

      {/* Season cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        {patterns.map((p, i) => {
          const Icon = seasonIcons[p.season] || Sun
          const isUp = p.expectedChange > 0
          return (
            <motion.div
              key={p.season}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: '18px', borderRadius: '14px',
                background: `${p.color}08`, border: `1px solid ${p.color}20`,
                cursor: 'pointer', transition: 'transform 0.15s',
              }}
            >
              {/* Season header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ padding: '8px', borderRadius: '10px', background: `${p.color}15` }}>
                  <Icon style={{ width: 16, height: 16, color: p.color }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, textTransform: 'capitalize' }}>{p.season}</h3>
                  <span style={{ fontSize: '10px', color: '#9ca3af' }}>Peak: {p.peakMonth}</span>
                </div>
                <div style={{
                  marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '3px',
                  fontSize: '12px', fontWeight: 700,
                  color: isUp ? '#ef4444' : '#10b981',
                }}>
                  {isUp ? <TrendingUp style={{ width: 14, height: 14 }} /> : <TrendingDown style={{ width: 14, height: 14 }} />}
                  {isUp ? '+' : ''}{p.expectedChange}%
                </div>
              </div>

              {/* Avg consumption */}
              <div style={{ marginBottom: '12px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#111827' }}>{p.avgConsumption}</span>
                <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '6px' }}>kWh/day avg</span>
              </div>

              <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 12px' }}>
                Dominant: <span style={{ fontWeight: 600, color: '#374151' }}>{p.dominantAppliance}</span>
              </p>

              {/* Tips */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {p.tips.map((tip, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '5px' }}>
                    <Lightbulb style={{ width: 11, height: 11, color: '#f59e0b', marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '10px', color: '#9ca3af', lineHeight: 1.4 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
