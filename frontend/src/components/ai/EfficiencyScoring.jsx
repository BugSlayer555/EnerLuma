export default function EfficiencyScoring({ scores }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Efficiency Scores</h2>

      {/* Overall */}
      <div style={{
        padding: '24px', background: '#fff', borderRadius: '16px',
        border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        textAlign: 'center', marginBottom: '16px',
      }}>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 8px' }}>Overall Efficiency</p>
        <p style={{ fontSize: '48px', fontWeight: 800, color: '#0f766e', margin: 0, lineHeight: 1 }}>{scores.overall}</p>
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0' }}>out of 100</p>
        <p style={{ fontSize: '12px', fontWeight: 600, color: '#10b981', margin: '8px 0 0' }}>↑ {scores.improvement}% improvement this month</p>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scores.categories.map((c) => (
          <div key={c.name} style={{
            padding: '16px 20px', background: '#fff', borderRadius: '14px',
            border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>{c.name}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: c.color }}>{c.score}/{c.maxScore}</span>
            </div>
            <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: '8px', transition: 'width 0.8s ease',
                width: `${c.score}%`, background: c.color,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
