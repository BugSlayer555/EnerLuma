import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Zap, Droplets, X, ArrowRight, TrendingUp } from 'lucide-react'

export default function UsageAlertCard({ alert, onDismiss, onViewInsights }) {
  if (!alert) return null

  const isEnergy = alert.type === 'energy' || alert.type === 'both'
  const isWater = alert.type === 'water' || alert.type === 'both'

  const energyOverPercent = alert.energyThreshold
    ? Math.round(((alert.energyUsage - alert.energyThreshold) / alert.energyThreshold) * 100)
    : 0
  const waterOverPercent = alert.waterThreshold
    ? Math.round(((alert.waterUsage - alert.waterThreshold) / alert.waterThreshold) * 100)
    : 0

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.25)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          padding: '24px',
        }}
        onClick={onDismiss}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '480px',
            background: '#ffffff',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div style={{
            height: '4px',
            background: 'linear-gradient(90deg, #fbbf24, #f97316, #ef4444)',
          }} />

          {/* Close button */}
          <button
            onClick={onDismiss}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '8px',
              borderRadius: '12px',
              border: 'none',
              background: '#f3f4f6',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
            onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
          >
            <X style={{ width: '16px', height: '16px', color: '#9ca3af' }} />
          </button>

          {/* Content */}
          <div style={{ padding: '36px 36px 32px' }}>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{
                padding: '14px',
                background: '#fffbeb',
                borderRadius: '16px',
                flexShrink: 0,
              }}>
                <AlertTriangle style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#111827',
                  margin: 0,
                  lineHeight: 1.2,
                }}>
                  Usage Alert
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  margin: '4px 0 0',
                }}>
                  Weekly threshold exceeded
                </p>
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>

              {isEnergy && (
                <div style={{
                  padding: '20px',
                  background: '#fffbeb',
                  borderRadius: '16px',
                  border: '1px solid #fef3c7',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        padding: '8px',
                        background: '#fef3c7',
                        borderRadius: '10px',
                      }}>
                        <Zap style={{ width: '16px', height: '16px', color: '#d97706' }} />
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>
                        Energy Usage
                      </span>
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#ef4444',
                      background: '#fef2f2',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}>
                      <TrendingUp style={{ width: '12px', height: '12px' }} />
                      +{energyOverPercent}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{
                    height: '10px',
                    background: '#fef3c7',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '10px',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((alert.energyUsage / alert.energyThreshold) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #f59e0b, #f97316)',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>
                      <span style={{ fontWeight: 600, color: '#d97706' }}>{alert.energyUsage} kWh</span> used
                    </span>
                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>{alert.energyThreshold} kWh limit</span>
                  </div>
                </div>
              )}

              {isWater && (
                <div style={{
                  padding: '20px',
                  background: '#ecfeff',
                  borderRadius: '16px',
                  border: '1px solid #cffafe',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '14px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        padding: '8px',
                        background: '#cffafe',
                        borderRadius: '10px',
                      }}>
                        <Droplets style={{ width: '16px', height: '16px', color: '#0891b2' }} />
                      </div>
                      <span style={{ fontSize: '15px', fontWeight: 600, color: '#374151' }}>
                        Water Usage
                      </span>
                    </div>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#ef4444',
                      background: '#fef2f2',
                      padding: '4px 10px',
                      borderRadius: '20px',
                    }}>
                      <TrendingUp style={{ width: '12px', height: '12px' }} />
                      +{waterOverPercent}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{
                    height: '10px',
                    background: '#cffafe',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginBottom: '10px',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((alert.waterUsage / alert.waterThreshold) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
                        borderRadius: '10px',
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>
                      <span style={{ fontWeight: 600, color: '#0891b2' }}>{alert.waterUsage} L</span> used
                    </span>
                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>{alert.waterThreshold} L limit</span>
                  </div>
                </div>
              )}

            </div>

            {/* Tip */}
            <div style={{
              padding: '14px 18px',
              background: '#f0fdfa',
              borderRadius: '14px',
              marginBottom: '28px',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '13px',
                color: '#0f766e',
                fontWeight: 500,
                margin: 0,
                lineHeight: 1.5,
              }}>
                💡 Check <strong>AI Insights</strong> for personalized tips to reduce your consumption
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '14px' }}>
              <button
                onClick={onDismiss}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#6b7280',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.target.style.background = '#e5e7eb'}
                onMouseLeave={(e) => e.target.style.background = '#f3f4f6'}
              >
                Dismiss
              </button>
              <button
                onClick={onViewInsights}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                  border: 'none',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 118, 110, 0.3)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 6px 20px rgba(15, 118, 110, 0.4)'
                  e.target.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 14px rgba(15, 118, 110, 0.3)'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                View Insights
                <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
