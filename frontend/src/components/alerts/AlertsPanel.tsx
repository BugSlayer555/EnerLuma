import { useMemo, useState } from 'react'
import { useToast } from './ToastManager'

type Severity = 'error' | 'warning' | 'info'

type AlertItem = {
  id: string
  severity: Severity
  appliance: string
  message: string
  date: string // ISO
}

const DUMMY_ALERTS: AlertItem[] = [
  { id: 'a1', severity: 'error', appliance: 'HVAC', message: 'Compressor failure detected', date: '2025-11-20T09:12:00Z' },
  { id: 'a2', severity: 'warning', appliance: 'Washer', message: 'High vibration level', date: '2025-11-22T12:34:00Z' },
  { id: 'a3', severity: 'info', appliance: 'Fridge', message: 'Filter replacement recommended', date: '2025-11-18T07:00:00Z' },
  { id: 'a4', severity: 'error', appliance: 'Dryer', message: 'Overheat shutdown', date: '2025-11-23T16:45:00Z' },
  { id: 'a5', severity: 'warning', appliance: 'Dishwasher', message: 'Water supply intermittent', date: '2025-11-21T11:20:00Z' },
  { id: 'a6', severity: 'info', appliance: 'HVAC', message: 'Routine check complete', date: '2025-11-19T08:00:00Z' },
]

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function SeverityBadge({ s }: { s: Severity }) {
  const base = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium'
  if (s === 'error') return <span className={`${base} bg-red-100 text-red-800`}>Error</span>
  if (s === 'warning') return <span className={`${base} bg-yellow-100 text-yellow-800`}>Warning</span>
  return <span className={`${base} bg-blue-100 text-blue-800`}>Info</span>
}

export default function AlertsPanel() {
  const [severity, setSeverity] = useState<'all' | Severity>('all')
  const [appliance, setAppliance] = useState<'all' | string>('all')
  const [fromDate, setFromDate] = useState<string>('')

  const { showToast } = useToast()

  const appliances = useMemo(() => {
    const set = new Set(DUMMY_ALERTS.map((a) => a.appliance))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    return DUMMY_ALERTS.filter((a) => {
      if (severity !== 'all' && a.severity !== severity) return false
      if (appliance !== 'all' && a.appliance !== appliance) return false
      if (fromDate) {
        const from = new Date(fromDate)
        const ad = new Date(a.date)
        from.setHours(0, 0, 0, 0)
        if (ad < from) return false
      }
      return true
    })
  }, [severity, appliance, fromDate])

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Alerts</h2>
        <div className="text-sm text-gray-600">Showing {filtered.length} / {DUMMY_ALERTS.length}</div>
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-4">
        <label className="flex items-center gap-2">
          <span className="text-sm">Severity</span>
          <select value={severity} onChange={(e) => setSeverity(e.target.value as any)} className="ml-1 border rounded px-2 py-1">
            <option value="all">All</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm">Appliance</span>
          <select value={appliance} onChange={(e) => setAppliance(e.target.value)} className="ml-1 border rounded px-2 py-1">
            <option value="all">All</option>
            {appliances.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-sm">From Date</span>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="ml-1 border rounded px-2 py-1" />
        </label>

        <div className="ml-auto">
          <button
            onClick={() => filtered.forEach((f) => showToast(`${f.appliance}: ${f.message}`, f.severity))}
            className="px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-800"
          >
            Notify All Filtered
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="px-3 py-2">Severity</th>
              <th className="px-3 py-2">Appliance</th>
              <th className="px-3 py-2">Message</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-3 py-2 align-top"><SeverityBadge s={a.severity} /></td>
                <td className="px-3 py-2 align-top">{a.appliance}</td>
                <td className="px-3 py-2 align-top">{a.message}</td>
                <td className="px-3 py-2 align-top">{formatDate(a.date)}</td>
                <td className="px-3 py-2 align-top">
                  <button
                    onClick={() => showToast(`${a.appliance}: ${a.message}`, a.severity)}
                    className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700"
                  >
                    Notify
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-gray-500">No alerts match the filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
