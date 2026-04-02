import { AlertTriangle, CheckCircle, Clock, Zap, Activity, RefreshCw } from 'lucide-react'

const severityStyles = {
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: AlertTriangle },
  info: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', icon: Activity },
  critical: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: Zap },
}

export default function DeviceAnomalyHistory({ anomalies }) {
  return (
    <div className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="section-title">Anomaly History</h2>
        </div>
        <span className="text-xs text-gray-400">{anomalies.length} events</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {anomalies.map(anomaly => {
          const style = severityStyles[anomaly.severity] || severityStyles.info
          const SevIcon = style.icon
          return (
            <div
              key={anomaly.id}
              className={`flex items-start rounded-xl border ${style.border} ${style.bg}`}
              style={{ padding: 18, gap: 14 }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <SevIcon className={`w-4 h-4 ${style.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800">{anomaly.type}</span>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
                    {anomaly.severity}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">{anomaly.message}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[10px] text-gray-400">
                    <Clock className="w-3 h-3" /> {anomaly.time}
                  </span>
                  <span className={`flex items-center gap-1 text-[10px] font-semibold ${anomaly.resolved ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {anomaly.resolved ? <CheckCircle className="w-3 h-3" /> : <RefreshCw className="w-3 h-3" />}
                    {anomaly.resolved ? 'Resolved' : 'Active'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
