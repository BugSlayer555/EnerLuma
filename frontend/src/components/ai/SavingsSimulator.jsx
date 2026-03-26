export default function SavingsSimulator({ scenarios }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Savings Simulator</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {scenarios.map((s, i) => (
          <div key={i} style={{
            padding: '22px', background: '#fff', borderRadius: '16px',
            border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1f2937', margin: '0 0 14px' }}>{s.scenario}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div style={{ padding: '12px', background: '#f9fafb', borderRadius: '10px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 2px' }}>Investment</p>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: 0 }}>₹{s.investment.toLocaleString()}</p>
              </div>
              <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '10px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', margin: '0 0 2px' }}>Monthly Savings</p>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#10b981', margin: 0 }}>₹{s.monthlySaving.toLocaleString()}</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Payback: <strong style={{ color: '#374151' }}>{s.paybackMonths} months</strong>
              </span>
              <span style={{
                fontSize: '11px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px',
                background: s.risk === 'low' ? '#f0fdf4' : '#fffbeb',
                color: s.risk === 'low' ? '#16a34a' : '#d97706',
              }}>
                {s.risk} risk
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
