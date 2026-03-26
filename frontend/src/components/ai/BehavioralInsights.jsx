import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

const typeConfig = {
  warning: { bg: '#fffbeb', border: '#fde68a', color: '#d97706', Icon: AlertTriangle },
  positive: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', Icon: CheckCircle },
  info: { bg: '#eff6ff', border: '#bfdbfe', color: '#2563eb', Icon: Info },
}

export default function BehavioralInsights({ insights }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Behavioral Insights</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {insights.map((item, i) => {
          const t = typeConfig[item.type]
          const Icon = t.Icon
          return (
            <div key={i} style={{
              padding: '20px', borderRadius: '14px',
              background: t.bg, border: `1px solid ${t.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Icon style={{ width: '20px', height: '20px', color: t.color, flexShrink: 0, marginTop: '2px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', margin: 0 }}>{item.insight}</p>
                    <span style={{
                      fontSize: '12px', fontWeight: 700, color: t.color,
                      background: '#fff', padding: '3px 10px', borderRadius: '20px',
                      border: `1px solid ${t.border}`, flexShrink: 0, marginLeft: '12px',
                    }}>
                      {item.metric}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{item.suggestion}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
