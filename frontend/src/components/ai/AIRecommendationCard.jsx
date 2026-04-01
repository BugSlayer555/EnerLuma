import { motion } from 'framer-motion'
import {
  Shield, TrendingDown, Leaf, Clock, CheckCircle, ChevronRight, Star,
  Zap, Droplets,
} from 'lucide-react'

/* ─── Priority color palette (light theme) ─── */
const priorityColors = {
  critical: { bg: '#fef2f2', border: '#fecaca', badge: '#ef4444', badgeBg: '#fef2f2', text: '#dc2626', accent: 'rgba(239,68,68,0.12)' },
  high:     { bg: '#fffbeb', border: '#fde68a', badge: '#f59e0b', badgeBg: '#fffbeb', text: '#d97706', accent: 'rgba(245,158,11,0.12)' },
  medium:   { bg: '#f0fdfa', border: '#99f6e4', badge: '#14b8a6', badgeBg: '#f0fdfa', text: '#0f766e', accent: 'rgba(20,184,166,0.12)' },
  low:      { bg: '#eef2ff', border: '#c7d2fe', badge: '#6366f1', badgeBg: '#eef2ff', text: '#4f46e5', accent: 'rgba(99,102,241,0.12)' },
}

/* ─── Category icons ─── */
const categoryIcons = {
  maintenance: Shield,
  cost: TrendingDown,
  energy: Zap,
  water: Droplets,
  sustainability: Leaf,
}

/* ─── Confidence Ring (SVG circular progress) ─── */
function ConfidenceRing({ value }) {
  const r = 22
  const c = 2 * Math.PI * r
  const offset = c - (value / 100) * c
  const color = value >= 90 ? '#10b981' : value >= 75 ? '#14b8a6' : '#f59e0b'
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, flexShrink: 0 }}>
      <svg width="56" height="56" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="#f1f5f9" strokeWidth="4" />
        <circle cx="28" cy="28" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
      </svg>
      <span style={{ position: 'absolute', fontSize: '11px', fontWeight: 800, color }}>{value}%</span>
    </div>
  )
}

export default function AIRecommendationCard({ recommendation: r, index }) {
  const style = priorityColors[r.priority] || priorityColors.medium
  const CategoryIcon = categoryIcons[r.category] || Star

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
      style={{
        background: r.implemented ? '#f9fafb' : '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        border: `1px solid ${r.implemented ? '#e5e7eb' : style.border}`,
        position: 'relative',
        overflow: 'hidden',
        opacity: r.implemented ? 0.75 : 1,
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 120, height: 120, borderRadius: '50%',
        background: style.accent, filter: 'blur(30px)',
        pointerEvents: 'none',
      }} />

      {/* ─── Header Row ─── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
        {/* Icon */}
        <div style={{ fontSize: '26px', flexShrink: 0, marginTop: '2px' }}>{r.icon}</div>

        {/* Title + badges */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
            {/* Priority badge */}
            <span style={{
              fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
              padding: '3px 10px', borderRadius: '20px',
              background: style.badge, color: '#ffffff',
            }}>
              {r.priority}
            </span>
            {/* Category */}
            <span style={{ fontSize: '10px', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CategoryIcon style={{ width: 12, height: 12 }} />
              {r.category}
            </span>
            {/* Implemented badge */}
            {r.implemented && (
              <span style={{ fontSize: '10px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <CheckCircle style={{ width: 12, height: 12 }} /> Done
              </span>
            )}
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0, lineHeight: 1.35 }}>{r.title}</h3>
        </div>

        {/* Confidence ring */}
        <ConfidenceRing value={r.confidence} />
      </div>

      {/* ─── Description ─── */}
      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6, margin: '0 0 16px 40px' }}>{r.description}</p>

      {/* ─── Savings Indicators ─── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginLeft: '40px', flexWrap: 'wrap', marginBottom: r.implemented ? 0 : '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <TrendingDown style={{ width: 14, height: 14, color: '#10b981' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>₹{r.potentialSavings}/mo</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Leaf style={{ width: 14, height: 14, color: '#14b8a6' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#14b8a6' }}>{r.carbonImpact} kg CO₂</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock style={{ width: 14, height: 14, color: '#9ca3af' }} />
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{r.timeToImplement}</span>
        </div>
      </div>

      {/* ─── Action Button ─── */}
      {!r.implemented && (
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginLeft: '40px',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '9px 20px', borderRadius: '14px',
            fontSize: '12px', fontWeight: 700, color: '#ffffff',
            background: `linear-gradient(135deg, ${style.badge}, ${style.text})`,
            border: 'none', cursor: 'pointer',
            boxShadow: `0 4px 14px ${style.accent}`,
            transition: 'box-shadow 0.2s',
          }}
        >
          {r.actionLabel}
          <ChevronRight style={{ width: 14, height: 14 }} />
        </motion.button>
      )}
    </motion.div>
  )
}

