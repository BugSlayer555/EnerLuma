import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const trendIcons = { up: TrendingUp, down: TrendingDown, stable: Minus }
const trendColors = { up: '#ef4444', down: '#10b981', stable: '#6b7280' }

export default function AppliancePredictiveModel({ predictions }) {
  return (
    <div>
      <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#1f2937', marginBottom: '16px' }}>Appliance Usage Predictions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {predictions.map((p) => {
          const TrendIcon = trendIcons[p.trend]
          return (
            <div key={p.name} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 20px', background: '#fff', borderRadius: '14px',
              border: '1px solid #f3f4f6', boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            }}>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937', margin: 0 }}>{p.name}</h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', margin: '4px 0 0' }}>Confidence: {p.confidence}%</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Current</p>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: 0 }}>{p.currentUsage} {p.unit}</p>
                </div>
                <TrendIcon style={{ width: '18px', height: '18px', color: trendColors[p.trend] }} />
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Predicted</p>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: trendColors[p.trend], margin: 0 }}>{p.predictedUsage} {p.unit}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
