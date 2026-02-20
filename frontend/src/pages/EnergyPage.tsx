import { motion } from 'framer-motion'
import {
  Zap, TrendingDown, TrendingUp, Activity, Cpu,
  Calendar, Download, AlertTriangle,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, ComposedChart, Line,
} from 'recharts'

const hourlyData = [
  { time: '00:00', actual: 0.8, forecast: 0.9 }, { time: '01:00', actual: 0.6, forecast: 0.7 },
  { time: '02:00', actual: 0.5, forecast: 0.6 }, { time: '03:00', actual: 0.4, forecast: 0.5 },
  { time: '04:00', actual: 0.3, forecast: 0.4 }, { time: '05:00', actual: 0.5, forecast: 0.5 },
  { time: '06:00', actual: 1.2, forecast: 1.0 }, { time: '07:00', actual: 1.8, forecast: 1.5 },
  { time: '08:00', actual: 2.1, forecast: 1.8 }, { time: '09:00', actual: 2.4, forecast: 2.2 },
  { time: '10:00', actual: 2.8, forecast: 2.5 }, { time: '11:00', actual: 2.6, forecast: 2.6 },
  { time: '12:00', actual: 2.4, forecast: 2.6 }, { time: '13:00', actual: 2.7, forecast: 2.5 },
  { time: '14:00', actual: 3.1, forecast: 2.8 }, { time: '15:00', actual: 3.0, forecast: 2.7 },
  { time: '16:00', actual: 2.9, forecast: 2.7 }, { time: '17:00', actual: 3.2, forecast: 3.0 },
  { time: '18:00', actual: 3.5, forecast: 3.0 }, { time: '19:00', actual: 3.3, forecast: 3.1 },
  { time: '20:00', actual: 2.8, forecast: 2.9 }, { time: '21:00', actual: 2.2, forecast: 2.4 },
  { time: '22:00', actual: 1.5, forecast: 1.6 }, { time: '23:00', actual: 1.0, forecast: 1.1 },
]

const monthlyData = [
  { month: 'Jan', consumption: 520, cost: 2340 },
  { month: 'Feb', consumption: 480, cost: 2160 },
  { month: 'Mar', consumption: 510, cost: 2295 },
  { month: 'Apr', consumption: 460, cost: 2070 },
  { month: 'May', consumption: 440, cost: 1980 },
  { month: 'Jun', consumption: 490, cost: 2205 },
]

const applianceData = [
  { name: 'HVAC', consumption: 8.4, percentage: 35, status: 'high' },
  { name: 'Water Heater', consumption: 3.0, percentage: 12, status: 'normal' },
  { name: 'Kitchen', consumption: 5.0, percentage: 21, status: 'normal' },
  { name: 'Lighting', consumption: 4.8, percentage: 20, status: 'normal' },
  { name: 'Smart Plugs', consumption: 2.0, percentage: 8, status: 'low' },
  { name: 'Others', consumption: 0.8, percentage: 4, status: 'low' },
]

const anomalies = [
  { time: '14:00', device: 'HVAC', expected: 2.8, actual: 3.1, confidence: 94 },
  { time: '18:00', device: 'Water Heater', expected: 1.0, actual: 1.8, confidence: 88 },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value} kW
        </p>
      ))}
    </div>
  )
}

export default function EnergyPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary-500" /> Energy Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Deep dive into your energy consumption patterns</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge">Live</div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Draw', value: '1.5 kW', change: -8, icon: Activity, color: 'primary' },
          { label: 'Today Total', value: '24.3 kWh', change: -12, icon: Zap, color: 'primary' },
          { label: "Today's Cost", value: '₹109', change: -5, icon: TrendingDown, color: 'emerald' },
          { label: 'Active Devices', value: '8 / 12', change: 0, icon: Cpu, color: 'cyan' },
        ].map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="kpi-card">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl bg-${kpi.color}-50`}>
                  <Icon className={`w-5 h-5 text-${kpi.color}-600`} />
                </div>
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
              <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Main Chart — Actual vs Forecast */}
      <motion.div variants={fadeUp} className="card-static">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="section-title">24-Hour Energy Profile</h2>
            <p className="text-xs text-gray-400 mt-0.5">Actual consumption vs AI forecast with anomaly markers</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary-500 rounded-full" /> Actual</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-primary-300 rounded-full" /> Forecast</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={hourlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kW" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="actual" stroke="#14b8a6" strokeWidth={2.5} fill="url(#energyGrad)" dot={false} />
            <Line type="monotone" dataKey="forecast" stroke="#99f6e4" strokeWidth={2} strokeDasharray="6 4" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Appliance Breakdown + Monthly Trend */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Appliance Breakdown */}
        <div className="card-static">
          <h2 className="section-title mb-4">Appliance Breakdown</h2>
          <div className="space-y-3">
            {applianceData.map((app) => (
              <div key={app.name} className="flex items-center gap-3">
                <span className="w-20 text-sm text-gray-600 flex-shrink-0">{app.name}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${app.percentage}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${app.status === 'high' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-eco-gradient'}`}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-16 text-right">{app.consumption} kWh</span>
                <span className="text-xs text-gray-400 w-10 text-right">{app.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="card-static">
          <h2 className="section-title mb-4">Monthly Consumption</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kWh" />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="consumption" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Anomaly Detection */}
      <motion.div variants={fadeUp} className="card-static">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h2 className="section-title">Anomaly Detection</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {anomalies.map((a, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="p-1.5 bg-amber-100 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-800">{a.device}</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded-full">{a.confidence}% confidence</span>
                </div>
                <p className="text-xs text-gray-500">
                  At {a.time} — Expected {a.expected} kW, measured {a.actual} kW
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="px-2.5 py-1 text-[11px] font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Acknowledge
                  </button>
                  <button className="px-2.5 py-1 text-[11px] font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                    View Device
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
