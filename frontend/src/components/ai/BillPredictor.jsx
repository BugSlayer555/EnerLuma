import { TrendingUp } from 'lucide-react'

export default function BillPredictor({ prediction }) {
  const p = prediction
  const changePercent = Math.round(((p.predictedMonth - p.currentMonth) / p.currentMonth) * 100)

  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Monthly Bill Forecast</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        {[
          { label: 'Current Month', value: `₹${p.currentMonth}`, color: '#1f2937' },
          { label: 'Predicted Next', value: `₹${p.predictedMonth}`, color: changePercent > 0 ? '#ef4444' : '#10b981' },
          { label: 'Savings Possible', value: `₹${p.savingsOpportunity}`, color: '#10b981' },
        ].map((item) => (
          <div key={item.label} style={{
            padding: '20px', background: '#fff', borderRadius: '14px',
            border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 6px' }}>{item.label}</p>
            <p style={{ fontSize: '24px', fontWeight: 700, color: item.color, margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={{
        padding: '20px', background: '#fff', borderRadius: '14px',
        border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '14px' }}>Category Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {p.breakdown.map((b) => (
            <div key={b.category}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{b.category}</span>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>₹{b.amount} → ₹{b.predicted}</span>
              </div>
              <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '8px',
                  width: `${(b.amount / 2500) * 100}%`,
                  background: 'linear-gradient(90deg, #0f766e, #14b8a6)',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
