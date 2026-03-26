import { AlertTriangle, Clock, CheckCircle } from 'lucide-react'

const statusConfig = {
  due: { bg: '#fef2f2', border: '#fecaca', color: '#dc2626', Icon: AlertTriangle },
  upcoming: { bg: '#fffbeb', border: '#fde68a', color: '#d97706', Icon: Clock },
  ok: { bg: '#f0fdf4', border: '#bbf7d0', color: '#16a34a', Icon: CheckCircle },
}

export default function PredictiveMaintenanceAlerts({ alerts }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Predictive Maintenance</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.map((a, i) => {
          const s = statusConfig[a.status]
          const Icon = s.Icon
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: '14px',
              padding: '20px', borderRadius: '14px',
              background: s.bg, border: `1px solid ${s.border}`,
            }}>
              <div style={{ padding: '8px', background: '#fff', borderRadius: '10px', flexShrink: 0 }}>
                <Icon style={{ width: '18px', height: '18px', color: s.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', margin: 0 }}>{a.device}</h3>
                  <span style={{
                    fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: '20px',
                    background: '#fff', color: s.color, border: `1px solid ${s.border}`,
                  }}>
                    {a.status === 'due' ? 'Overdue' : a.status === 'upcoming' ? `${a.daysUntil}d` : 'OK'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>{a.message}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
