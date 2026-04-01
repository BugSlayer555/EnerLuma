import { motion } from 'framer-motion'
import { Wrench, Heart, AlertTriangle, Clock, DollarSign } from 'lucide-react'

const urgencyColors = {
  critical: '#ef4444',
  high: '#f59e0b',
  medium: '#14b8a6',
  low: '#6366f1',
}

const statusLabels = {
  optimal:         { label: 'Healthy',         color: '#10b981' },
  degraded:        { label: 'Degraded',        color: '#f59e0b' },
  needs_attention: { label: 'Needs Attention', color: '#ef4444' },
  critical:        { label: 'Critical',        color: '#dc2626' },
}

export default function PredictiveMaintenanceAlerts({ alerts }) {
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
        <Wrench style={{ width: 20, height: 20, color: '#f97316' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Predictive Maintenance</h2>
      </div>

      {/* Alerts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.map((a, i) => {
          const sl = statusLabels[a.status] || statusLabels.optimal
          const uColor = urgencyColors[a.urgency] || urgencyColors.low
          return (
            <motion.div
              key={a.applianceId}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: '18px 20px', borderRadius: '14px',
                background: `${uColor}08`, border: `1px solid ${uColor}25`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <span style={{ fontSize: '22px', marginTop: '2px' }}>{a.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name + badges */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0 }}>{a.name}</h3>
                    <span style={{
                      fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
                      padding: '2px 8px', borderRadius: '20px',
                      background: uColor, color: '#ffffff',
                    }}>{a.urgency}</span>
                    <span style={{
                      fontSize: '10px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: '20px',
                      color: sl.color, background: `${sl.color}12`,
                    }}>{sl.label}</span>
                  </div>

                  {/* Health bar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                    <Heart style={{ width: 14, height: 14, color: sl.color }} />
                    <div style={{ flex: 1, height: 7, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${a.healthScore}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                        style={{ height: '100%', borderRadius: 999, background: sl.color }}
                      />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: sl.color }}>{a.healthScore}%</span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px', lineHeight: 1.5 }}>{a.recommendation}</p>

                  {/* Meta row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', fontSize: '10px', color: '#9ca3af' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle style={{ width: 12, height: 12, color: uColor }} />
                      {a.issueType}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock style={{ width: 12, height: 12 }} />
                      {a.daysUntilMaintenance < 0 ? `${Math.abs(a.daysUntilMaintenance)} days overdue` : `${a.daysUntilMaintenance} days`}
                    </span>
                    {a.estimatedCost > 0 && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <DollarSign style={{ width: 12, height: 12 }} />
                        ~₹{a.estimatedCost.toLocaleString()}
                      </span>
                    )}
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
