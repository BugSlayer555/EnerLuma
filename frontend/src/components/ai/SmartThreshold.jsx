export default function SmartThresholdAdjust({ thresholds }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Smart Threshold Recommendations</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {thresholds.map((t) => {
          const diff = t.current - t.recommended
          const isOver = diff > 0
          return (
            <div key={t.name} style={{
              padding: '20px', background: '#fff', borderRadius: '14px',
              border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', margin: 0 }}>{t.name}</h3>
                <span style={{
                  fontSize: '11px', fontWeight: 600, borderRadius: '20px', padding: '3px 10px',
                  background: isOver ? '#fef2f2' : '#f0fdf4',
                  color: isOver ? '#dc2626' : '#16a34a',
                }}>
                  {isOver ? `${diff.toFixed(1)} ${t.unit} over` : 'On target'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '8px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', display: 'block' }}>Current</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: isOver ? '#ef4444' : '#1f2937' }}>{t.current} {t.unit}</span>
                </div>
                <span style={{ fontSize: '16px', color: '#d1d5db' }}>→</span>
                <div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', display: 'block' }}>Recommended</span>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: '#10b981' }}>{t.recommended} {t.unit}</span>
                </div>
              </div>
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>{t.reason}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
