import { motion } from 'framer-motion'
import { Activity, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react'

export default function AppliancePredictiveModel({ predictions }) {
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
        <Activity style={{ width: 20, height: 20, color: '#14b8a6' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Appliance Predictive Model</h2>
        <span style={{
          marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
          background: '#f0fdfa', color: '#0f766e',
          padding: '3px 10px', borderRadius: '20px',
          border: '1px solid #99f6e4',
        }}>ML Powered</span>
      </div>

      {/* Appliance List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {predictions.map((p, i) => {
          const isUp = p.usageTrend > 0
          return (
            <motion.div
              key={p.applianceId}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 18px', borderRadius: '14px',
                background: p.anomalyDetected ? '#fef2f2' : '#f9fafb',
                border: `1px solid ${p.anomalyDetected ? '#fecaca' : '#f3f4f6'}`,
                transition: 'background 0.15s',
                cursor: 'pointer',
              }}
            >
              {/* Icon */}
              <span style={{ fontSize: '22px' }}>{p.icon}</span>

              {/* Name + usage details */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937' }}>{p.name}</span>
                  {p.anomalyDetected && (
                    <AlertTriangle style={{ width: 14, height: 14, color: '#ef4444', flexShrink: 0 }} />
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '5px', fontSize: '11px', color: '#9ca3af' }}>
                  <span>Now: <strong style={{ color: '#6b7280' }}>{p.currentUsage} kWh</strong></span>
                  <span>→</span>
                  <span style={{ color: '#0f766e', fontWeight: 600 }}>Predicted: {p.predictedUsage} kWh</span>
                </div>
              </div>

              {/* Right side: trend + cost + confidence */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                {/* Trend */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '12px', fontWeight: 700,
                  color: isUp ? '#ef4444' : '#10b981',
                }}>
                  {isUp
                    ? <TrendingUp style={{ width: 14, height: 14 }} />
                    : <TrendingDown style={{ width: 14, height: 14 }} />
                  }
                  {isUp ? '+' : ''}{p.usageTrend}%
                </div>
                {/* Cost */}
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>₹{p.predictedCost}/day</span>
                {/* Confidence bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <div style={{
                    width: 60, height: 5, borderRadius: 999,
                    background: '#e5e7eb', overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.confidence}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      style={{
                        height: '100%', borderRadius: 999,
                        background: p.confidence >= 90 ? '#10b981' : p.confidence >= 80 ? '#14b8a6' : '#f59e0b',
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: 600 }}>{p.confidence}%</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

