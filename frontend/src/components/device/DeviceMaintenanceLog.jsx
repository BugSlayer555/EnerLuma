import { Wrench, CheckCircle, Clock, Calendar } from 'lucide-react'

const statusStyles = {
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle, label: 'Completed' },
  upcoming: { bg: 'bg-blue-50', text: 'text-blue-600', icon: Clock, label: 'Upcoming' },
  overdue: { bg: 'bg-red-50', text: 'text-red-600', icon: Calendar, label: 'Overdue' },
}

export default function DeviceMaintenanceLog({ maintenanceLog }) {
  return (
    <div className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-purple-500" />
          <h2 className="section-title">Maintenance Log</h2>
        </div>
        <button className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors">
          Schedule New
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {maintenanceLog.map(entry => {
          const style = statusStyles[entry.status] || statusStyles.completed
          const StatusIcon = style.icon
          return (
            <div
              key={entry.id}
              className="flex items-center bg-gray-50 rounded-xl"
              style={{ padding: 18, gap: 16 }}
            >
              <div className={`p-2.5 rounded-xl ${style.bg} flex-shrink-0`}>
                <StatusIcon className={`w-4 h-4 ${style.text}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{entry.type}</p>
                <p className="text-xs text-gray-400 mt-1">{entry.desc}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-medium text-gray-600">{entry.date}</p>
                <p className={`text-[10px] font-semibold mt-1 ${style.text}`}>{style.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
