import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Leaf, IndianRupee, Zap, ChevronRight } from 'lucide-react'

const difficultyColors = {
  easy:   { bg: '#f0fdf4', border: '#bbf7d0', text: '#10b981' },
  medium: { bg: '#fffbeb', border: '#fde68a', text: '#f59e0b' },
  hard:   { bg: '#fef2f2', border: '#fecaca', text: '#ef4444' },
}

export default function SavingsSimulator({ scenarios }) {
  const [selected, setSelected] = useState(null)

  const totalMonthlySavings = scenarios.reduce((s, sc) => s + sc.monthlySavings, 0)
  const totalAnnualSavings = scenarios.reduce((s, sc) => s + sc.annualSavings, 0)
  const totalCarbon = scenarios.reduce((s, sc) => s + sc.carbonReduction, 0)

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
        <Calculator style={{ width: 20, height: 20, color: '#14b8a6' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Savings Simulator</h2>
      </div>
      <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 20px' }}>"What if…" scenarios to visualize potential savings</p>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        <div style={{ padding: '14px', borderRadius: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', textAlign: 'center' }}>
          <IndianRupee style={{ width: 16, height: 16, color: '#10b981', margin: '0 auto 4px' }} />
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#10b981' }}>₹{totalMonthlySavings}</span>
          <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>Max Monthly</p>
        </div>
        <div style={{ padding: '14px', borderRadius: '14px', background: '#f0fdfa', border: '1px solid #99f6e4', textAlign: 'center' }}>
          <Zap style={{ width: 16, height: 16, color: '#14b8a6', margin: '0 auto 4px' }} />
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#14b8a6' }}>₹{(totalAnnualSavings / 1000).toFixed(1)}K</span>
          <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>Max Yearly</p>
        </div>
        <div style={{ padding: '14px', borderRadius: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', textAlign: 'center' }}>
          <Leaf style={{ width: 16, height: 16, color: '#16a34a', margin: '0 auto 4px' }} />
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#16a34a' }}>{totalCarbon.toFixed(1)}</span>
          <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>kg CO₂ saved</p>
        </div>
      </div>

      {/* Scenario rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {scenarios.map((sc, i) => {
          const dc = difficultyColors[sc.difficulty] || difficultyColors.medium
          const isOpen = selected === sc.id

          return (
            <motion.div
              key={sc.id}
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(isOpen ? null : sc.id)}
              style={{
                borderRadius: '14px', overflow: 'hidden', cursor: 'pointer',
                background: '#f9fafb', border: '1px solid #f3f4f6',
              }}
            >
              {/* Row header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '12px',
                  background: '#f0fdfa', border: '1px solid #99f6e4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 800, color: '#0f766e',
                }}>
                  {sc.reductionPercent}%
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sc.title}</h3>
                  <p style={{ fontSize: '10px', color: '#9ca3af', margin: '2px 0 0' }}>{sc.appliances.join(', ')}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>₹{sc.monthlySavings}/mo</span>
                  <div style={{ marginTop: '4px' }}>
                    <span style={{
                      fontSize: '9px', fontWeight: 700,
                      padding: '2px 8px', borderRadius: '20px',
                      background: dc.bg, color: dc.text, border: `1px solid ${dc.border}`,
                    }}>{sc.difficulty}</span>
                  </div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight style={{ width: 16, height: 16, color: '#9ca3af' }} />
                </motion.div>
              </div>

              {/* Expanded detail */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 18px 18px', borderTop: '1px solid #f3f4f6' }}>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '14px 0', lineHeight: 1.5 }}>{sc.description}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                        <div style={{ textAlign: 'center', padding: '10px', borderRadius: '10px', background: '#f0fdf4' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>₹{(sc.annualSavings / 1000).toFixed(1)}K</span>
                          <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>Annual</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '10px', borderRadius: '10px', background: '#f0fdfa' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#14b8a6' }}>{sc.carbonReduction} kg</span>
                          <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>CO₂/mo saved</p>
                        </div>
                        <div style={{ textAlign: 'center', padding: '10px', borderRadius: '10px', background: '#eff6ff' }}>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6' }}>{sc.reductionPercent}%</span>
                          <p style={{ fontSize: '9px', color: '#9ca3af', margin: '2px 0 0' }}>Reduction</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
