import { Sun } from 'lucide-react'

export default function SeasonalPatterns({ patterns }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Seasonal Usage Patterns</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        {patterns.patterns.map((s) => {
          const isCurrent = s.season === patterns.currentSeason
          return (
            <div key={s.season} style={{
              padding: '20px', borderRadius: '14px',
              background: isCurrent ? '#f0fdfa' : '#fff',
              border: `1px solid ${isCurrent ? '#99f6e4' : '#f3f4f6'}`,
              boxShadow: isCurrent ? '0 0 0 2px rgba(20,184,166,0.1)' : '0 1px 2px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sun style={{ width: '16px', height: '16px', color: isCurrent ? '#0f766e' : '#9ca3af' }} />
                <span style={{ fontSize: '14px', fontWeight: 600, color: isCurrent ? '#0f766e' : '#374151' }}>
                  {s.season} {isCurrent && '(Now)'}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>Energy</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{s.energy} kWh</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>Water</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{s.water} L</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>Avg Bill</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>₹{s.avgBill}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ padding: '16px 20px', background: '#f0fdfa', borderRadius: '12px', border: '1px solid #99f6e4' }}>
        <p style={{ fontSize: '13px', color: '#0f766e', fontWeight: 500, margin: 0 }}>💡 {patterns.tip}</p>
      </div>
    </div>
  )
}
