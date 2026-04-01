import { Lightbulb } from 'lucide-react'

export default function DeviceAIInsights({ efficiency, recommendations, comparisons }) {
  return (
    <div className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>
        <div>
          <h2 className="section-title">AI Insights & Recommendations</h2>
          <p className="text-xs text-gray-400 mt-1">Efficiency score: {efficiency.score}% · {efficiency.rating} rated · Top {100 - efficiency.percentile}%</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>vs Average: <b className={comparisons.vsAverage < 0 ? 'text-emerald-600' : 'text-red-500'}>{comparisons.vsAverage > 0 ? '+' : ''}{comparisons.vsAverage}%</b></span>
          <span>vs Similar: <b className={comparisons.vsSimilar < 0 ? 'text-emerald-600' : 'text-red-500'}>{comparisons.vsSimilar > 0 ? '+' : ''}{comparisons.vsSimilar}%</b></span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {recommendations.map(rec => (
          <div key={rec.id} className="flex items-start rounded-xl bg-gray-50" style={{ padding: 20, gap: 16 }}>
            <div className={`p-2 rounded-lg flex-shrink-0 ${rec.priority === 'high' ? 'bg-red-50' : rec.priority === 'medium' ? 'bg-amber-50' : 'bg-blue-50'}`}>
              <Lightbulb className={`w-4 h-4 ${rec.priority === 'high' ? 'text-red-500' : rec.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{rec.text}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-2">Potential savings: {rec.savings}</p>
            </div>
            <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full ${rec.priority === 'high' ? 'bg-red-100 text-red-600' : rec.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
              {rec.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
