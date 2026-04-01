import { useState } from 'react'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Check, ArrowRight, RotateCcw } from 'lucide-react'

export default function SmartThresholdAdjust({ thresholds }) {
  const [accepted, setAccepted] = useState(new Set())

  const handleAccept = (id) => {
    setAccepted(prev => new Set(prev).add(id))
  }

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
        <SlidersHorizontal style={{ width: 20, height: 20, color: '#8b5cf6' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Smart Auto-Threshold</h2>
        <span style={{
          marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
          background: '#f5f3ff', color: '#7c3aed',
          padding: '3px 10px', borderRadius: '20px',
          border: '1px solid #ddd6fe',
        }}>Auto-Learning</span>
      </div>

      {/* Threshold list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {thresholds.map((t, i) => {
          const isAccepted = accepted.has(t.applianceId)
          return (
            <motion.div
              key={t.applianceId}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              style={{
                padding: '18px 20px', borderRadius: '14px',
                background: '#f9fafb', border: '1px solid #f3f4f6',
              }}
            >
              {/* Name + meta */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0 }}>{t.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {t.autoAdjusted && (
                    <span style={{
                      fontSize: '9px', fontWeight: 600,
                      padding: '2px 8px', borderRadius: '6px',
                      background: '#f0fdfa', color: '#0f766e',
                      display: 'flex', alignItems: 'center', gap: '3px',
                    }}>
                      <RotateCcw style={{ width: 10, height: 10 }} /> Auto
                    </span>
                  )}
                  <span style={{ fontSize: '9px', color: '#d1d5db' }}>{t.lastUpdated}</span>
                </div>
              </div>

              {/* Threshold comparison */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#9ca3af' }}>{t.currentThreshold}</span>
                  <p style={{ fontSize: '9px', color: '#d1d5db', margin: 0 }}>Current</p>
                </div>
                <ArrowRight style={{ width: 16, height: 16, color: '#14b8a6' }} />
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#14b8a6' }}>{t.suggestedThreshold}</span>
                  <p style={{ fontSize: '9px', color: '#0f766e', margin: 0 }}>Suggested</p>
                </div>
                <div style={{ flex: 1, marginLeft: '8px' }}>
                  <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, lineHeight: 1.4 }}>{t.reason}</p>
                </div>
              </div>

              {/* Impact + Apply button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>{t.impact}</span>
                {!isAccepted ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleAccept(t.applianceId)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '6px 16px', borderRadius: '10px',
                      fontSize: '11px', fontWeight: 700,
                      background: '#f0fdfa', color: '#0f766e',
                      border: '1px solid #99f6e4', cursor: 'pointer',
                    }}
                  >
                    <Check style={{ width: 12, height: 12 }} /> Apply
                  </motion.button>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: '#10b981' }}>
                    <Check style={{ width: 14, height: 14 }} /> Applied
                  </span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
