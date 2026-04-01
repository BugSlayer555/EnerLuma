import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function DeviceHealthPanel({ health }) {
  return (
    <div className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
        <Heart className="w-5 h-5 text-red-500" />
        <h2 className="section-title">Device Health</h2>
      </div>
      <div className="flex flex-col items-center" style={{ marginBottom: 24 }}>
        <div className="relative" style={{ width: 120, height: 120, marginBottom: 12 }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="48" fill="none" stroke="#f0f0f0" strokeWidth="8" />
            <circle cx="60" cy="60" r="48" fill="none" stroke={health.overall >= 85 ? '#10b981' : health.overall >= 70 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 48} strokeDashoffset={2 * Math.PI * 48 * (1 - health.overall / 100)} transform="rotate(-90 60 60)" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{health.overall}%</span>
          </div>
        </div>
        <p className="text-xs text-gray-500">Overall Health Score</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Firmware</span><span className="font-medium text-gray-800">{health.firmware}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Uptime</span><span className="font-medium text-gray-800">{health.uptime}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Signal</span><span className="font-medium text-gray-800">{health.signal}%</span></div>
        {health.components.map(c => (
          <div key={c.name}>
            <div className="flex justify-between text-xs text-gray-500 mb-1"><span>{c.name}</span><span>{c.health}%</span></div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${c.health}%` }} transition={{ duration: 0.6 }}
                className={`h-full rounded-full ${c.health >= 90 ? 'bg-emerald-500' : c.health >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
