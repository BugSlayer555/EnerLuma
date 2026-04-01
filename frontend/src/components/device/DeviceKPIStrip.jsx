import { TrendingDown, TrendingUp } from 'lucide-react'

export default function DeviceKPIStrip({ kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map(kpi => (
        <div key={kpi.label} className="kpi-card">
          <div className="flex items-start justify-between">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            {kpi.change !== 0 && (
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.change < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {kpi.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                {Math.abs(kpi.change)}%
              </span>
            )}
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
