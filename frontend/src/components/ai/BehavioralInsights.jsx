import { motion } from 'framer-motion'
import { Brain, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const typeColors = {
  habit:        { bg: '#eef2ff', border: '#c7d2fe', label: 'Habit' },
  anomaly:      { bg: '#fef2f2', border: '#fecaca', label: 'Anomaly' },
  optimization: { bg: '#f0fdfa', border: '#99f6e4', label: 'Optimization' },
  achievement:  { bg: '#f0fdf4', border: '#bbf7d0', label: 'Achievement' },
}

export default function BehavioralInsights({ insights }) {
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
        <Brain style={{ width: 20, height: 20, color: '#6366f1' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Behavioral Insights</h2>
        <span style={{
          marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
          background: '#eef2ff', color: '#4f46e5',
          padding: '3px 10px', borderRadius: '20px',
          border: '1px solid #c7d2fe',
        }}>AI Detected</span>
      </div>

      {/* Insights List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {insights.map((insight, i) => {
          const tc = typeColors[insight.type] || typeColors.habit
          const ImpactIcon =
            insight.impact === 'positive' ? TrendingDown :
            insight.impact === 'negative' ? TrendingUp : Minus

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '18px 20px', borderRadius: '14px',
                background: tc.bg, border: `1px solid ${tc.border}`,
                transition: 'transform 0.15s',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                {/* Icon */}
                <span style={{ fontSize: '22px', marginTop: '2px' }}>{insight.icon}</span>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0 }}>{insight.title}</h3>
                    <span style={{
                      fontSize: '9px', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '20px',
                      background: `${tc.border}40`, color: '#6b7280',
                    }}>
                      {tc.label}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.55, margin: '0 0 10px' }}>{insight.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                    {/* Impact metric */}
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '12px', fontWeight: 700,
                      color: insight.impact === 'positive' ? '#10b981' : insight.impact === 'negative' ? '#ef4444' : '#6b7280',
                    }}>
                      <ImpactIcon style={{ width: 14, height: 14 }} />
                      {insight.metric}
                    </span>
                    {/* Confidence */}
                    <span style={{ fontSize: '10px', color: '#9ca3af' }}>Confidence: {insight.confidence}%</span>
                    {/* Detected at */}
                    <span style={{ fontSize: '10px', color: '#d1d5db' }}>{insight.detectedAt}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

