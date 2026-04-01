import { motion } from 'framer-motion'
import { Leaf, TreePine, Car, TrendingDown, Lightbulb } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function CarbonFootprintView({ data }) {
  const isBelow = data.comparedToAvg < 0

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
        <Leaf style={{ width: 20, height: 20, color: '#10b981' }} />
        <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Carbon Footprint</h2>
        <span style={{
          marginLeft: 'auto', fontSize: '10px', fontWeight: 700,
          padding: '3px 10px', borderRadius: '20px',
          background: isBelow ? '#f0fdf4' : '#fef2f2',
          color: isBelow ? '#10b981' : '#ef4444',
          border: `1px solid ${isBelow ? '#bbf7d0' : '#fecaca'}`,
        }}>
          {isBelow ? `${Math.abs(data.comparedToAvg)}% below avg` : `${data.comparedToAvg}% above avg`}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        {/* Left: Metrics */}
        <div>
          {/* Big number */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '18px' }}>
            <span style={{ fontSize: '38px', fontWeight: 800, color: '#111827' }}>{data.totalEmissions}</span>
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>kg CO₂/mo</span>
          </div>

          {/* Equivalents */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px', borderRadius: '12px',
              background: '#f0fdf4', border: '1px solid #bbf7d0',
            }}>
              <TreePine style={{ width: 18, height: 18, color: '#10b981' }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#10b981' }}>{data.treesEquivalent}</span>
                <p style={{ fontSize: '9px', color: '#9ca3af', margin: 0 }}>trees to offset</p>
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '12px 16px', borderRadius: '12px',
              background: '#eff6ff', border: '1px solid #bfdbfe',
            }}>
              <Car style={{ width: 18, height: 18, color: '#3b82f6' }} />
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6' }}>{data.carKmEquivalent} km</span>
                <p style={{ fontSize: '9px', color: '#9ca3af', margin: 0 }}>driving equivalent</p>
              </div>
            </div>
          </div>

          {/* Breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
            {data.breakdown.map(b => (
              <div key={b.source} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: '#6b7280', flex: 1 }}>{b.source}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1f2937' }}>{b.emissions} kg</span>
                <span style={{ fontSize: '10px', color: '#9ca3af', width: 32, textAlign: 'right' }}>{b.percentage}%</span>
              </div>
            ))}
          </div>

          {/* Offset suggestions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {data.offsetSuggestions.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                <Lightbulb style={{ width: 12, height: 12, color: '#f59e0b', marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: '10px', color: '#9ca3af', lineHeight: 1.4 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trend chart */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <TrendingDown style={{ width: 16, height: 16, color: '#10b981' }} />
            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 700 }}>6-Month Trend</span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.monthlyTrend}>
                <defs>
                  <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: '#ffffff', border: '1px solid #e5e7eb',
                    borderRadius: 12, fontSize: 12, color: '#1f2937',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                  formatter={(v) => [`${v} kg CO₂`, 'Emissions']}
                />
                <Area type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={2.5} fill="url(#carbonGrad)" dot={false} activeDot={{ r: 4, fill: '#059669', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

