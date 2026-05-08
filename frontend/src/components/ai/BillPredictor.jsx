import { motion } from 'framer-motion'
import { Receipt, TrendingDown, AlertCircle, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function BillPredictor({ prediction: bp }) {
  const diff = bp.previousAmount - bp.predictedAmount
  const pctChange = ((Math.abs(diff) / bp.previousAmount) * 100).toFixed(1)
  const isSaving = diff > 0

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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <Receipt style={{ width: 20, height: 20, color: '#14b8a6' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Monthly Bill Prediction</h2>
        <span style={{
          marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
          background: '#eef2ff', color: '#4f46e5',
          padding: '3px 10px', borderRadius: '20px',
          border: '1px solid #c7d2fe',
        }}>{bp.month}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
        {/* Left: Bill Amount */}
        <div>
          {/* Big number */}
          <div style={{ marginBottom: '4px' }}>
            <span style={{ fontSize: '38px', fontWeight: 800, color: '#111827' }}>₹{bp.predictedAmount.toLocaleString()}</span>
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 14px' }}>
            Predicted total
            <span style={{ color: '#d1d5db', marginLeft: '8px' }}>
              (₹{bp.confidenceLow.toLocaleString()} – ₹{bp.confidenceHigh.toLocaleString()})
            </span>
          </p>

          {/* Vs previous */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '6px 14px', borderRadius: '10px',
            fontSize: '12px', fontWeight: 700,
            background: isSaving ? '#f0fdf4' : '#fef2f2',
            color: isSaving ? '#10b981' : '#ef4444',
            border: `1px solid ${isSaving ? '#bbf7d0' : '#fecaca'}`,
          }}>
            {isSaving
              ? <><TrendingDown style={{ width: 14, height: 14 }} /> ↓ ₹{Math.abs(diff)} ({pctChange}%) vs last month</>
              : <><AlertCircle style={{ width: 14, height: 14 }} /> ↑ ₹{Math.abs(diff)} ({pctChange}%) vs last month</>
            }
          </div>

          {/* Savings potential */}
          <div style={{
            marginTop: '18px', padding: '16px', borderRadius: '14px',
            background: '#f0fdfa', border: '1px solid #99f6e4',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ChevronDown style={{ width: 16, height: 16, color: '#14b8a6' }} />
              <span style={{ fontSize: '12px', color: '#0f766e', fontWeight: 700 }}>Savings Potential</span>
            </div>
            <p style={{ fontSize: '28px', fontWeight: 800, color: '#0f766e', margin: '6px 0 0' }}>₹{bp.savingsPotential}/mo</p>
            <p style={{ fontSize: '10px', color: '#9ca3af', margin: '4px 0 0' }}>Apply AI recommendations to unlock</p>
          </div>

          {/* Confidence bar */}
          <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, height: 7, borderRadius: 999, background: '#e5e7eb', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${bp.confidence}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{
                  height: '100%', borderRadius: 999,
                  background: 'linear-gradient(90deg, #0f766e, #14b8a6)',
                }}
              />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f766e' }}>{bp.confidence}% confident</span>
          </div>
        </div>

        {/* Right: Pie Chart Breakdown */}
        <div>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#6b7280', marginBottom: '8px' }}>Cost Breakdown</p>
          <div style={{ height: 170 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bp.breakdown}
                  cx="50%" cy="50%"
                  innerRadius={45} outerRadius={70}
                  dataKey="amount"
                  paddingAngle={3}
                  stroke="none"
                >
                  {bp.breakdown.map((b, i) => (
                    <Cell key={i} fill={b.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#ffffff', border: '1px solid #e5e7eb',
                    borderRadius: 12, fontSize: 12, color: '#1f2937',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                  formatter={(val) => [`₹${val}`]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
            {bp.breakdown.map(b => (
              <div key={b.category} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.color }} />
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{b.category} ({b.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

