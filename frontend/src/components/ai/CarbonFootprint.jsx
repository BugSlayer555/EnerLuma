import { Leaf } from 'lucide-react'

export default function CarbonFootprintView({ data }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Carbon Footprint</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '16px' }}>
        <div style={{
          padding: '22px', background: '#f0fdf4', borderRadius: '14px', border: '1px solid #bbf7d0', textAlign: 'center',
        }}>
          <Leaf style={{ width: '24px', height: '24px', color: '#16a34a', margin: '0 auto 8px' }} />
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#166534', margin: 0 }}>{data.totalKg} kg</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0' }}>CO₂ this month</p>
        </div>
        <div style={{
          padding: '22px', background: '#fff', borderRadius: '14px', border: '1px solid #f3f4f6', textAlign: 'center',
        }}>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#0f766e', margin: 0 }}>{data.treesEquivalent}</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0' }}>Trees equivalent saved</p>
        </div>
        <div style={{
          padding: '22px', background: '#fff', borderRadius: '14px', border: '1px solid #f3f4f6', textAlign: 'center',
        }}>
          <p style={{ fontSize: '28px', fontWeight: 800, color: '#10b981', margin: 0 }}>-{data.reductionPercent}%</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0' }}>vs. 3 months ago</p>
        </div>
      </div>

      <div style={{
        padding: '20px', background: '#fff', borderRadius: '14px',
        border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
      }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', marginBottom: '14px' }}>Emission Breakdown</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {data.breakdown.map((b) => (
            <div key={b.source}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{b.source}</span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>{b.kg} kg — {b.percent}%</span>
              </div>
              <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '8px', width: `${b.percent}%`, background: '#10b981' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
