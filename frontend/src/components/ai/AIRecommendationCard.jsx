import { motion } from 'framer-motion'
import { Zap, Droplets, TrendingUp, Check } from 'lucide-react'

const priorityColors = {
  high: { bg: '#fef2f2', text: '#dc2626', border: '#fecaca' },
  medium: { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
  low: { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
}

const categoryIcons = { Energy: Zap, Water: Droplets }

export default function AIRecommendationCard({ recommendation: r, index }) {
  const p = priorityColors[r.priority]
  const Icon = categoryIcons[r.category] || Zap

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      style={{
        background: r.implemented ? '#f9fafb' : '#ffffff',
        borderRadius: '16px',
        padding: '22px',
        border: '1px solid',
        borderColor: r.implemented ? '#e5e7eb' : '#f3f4f6',
        boxShadow: r.implemented ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
        opacity: r.implemented ? 0.65 : 1,
        transition: 'box-shadow 0.2s',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{
          padding: '10px',
          borderRadius: '12px',
          background: p.bg,
          flexShrink: 0,
        }}>
          <Icon style={{ width: '20px', height: '20px', color: p.text }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', margin: 0 }}>
              {r.implemented && <Check style={{ width: '14px', height: '14px', display: 'inline', marginRight: '6px', color: '#16a34a' }} />}
              {r.title}
            </h3>
            <span style={{
              padding: '2px 8px',
              fontSize: '10px',
              fontWeight: 700,
              borderRadius: '20px',
              background: p.bg,
              color: p.text,
              textTransform: 'uppercase',
            }}>
              {r.priority}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{r.description}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#059669' }}>{r.impact}</span>
            <span style={{ fontSize: '11px', color: '#9ca3af', background: '#f9fafb', padding: '2px 8px', borderRadius: '8px' }}>{r.category}</span>
            {r.implemented && <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>✓ Implemented</span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
