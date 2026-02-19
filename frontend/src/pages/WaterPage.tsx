import { motion } from 'framer-motion'
import {
  Droplets, TrendingDown, TrendingUp, Activity,
  AlertTriangle, Shield, Calendar, Download,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts'

const hourlyData = [
  { time: '00:00', value: 2.1 }, { time: '02:00', value: 1.5 },
  { time: '04:00', value: 0.8 }, { time: '06:00', value: 3.2 },
  { time: '08:00', value: 5.8 }, { time: '10:00', value: 4.2 },
  { time: '12:00', value: 3.5 }, { time: '14:00', value: 2.8 },
  { time: '16:00', value: 4.6 }, { time: '18:00', value: 6.2 },
  { time: '20:00', value: 5.1 }, { time: '22:00', value: 3.0 },
]

const fixtureData = [
  { name: 'Shower', usage: 18, percentage: 42, status: 'high' },
  { name: 'Kitchen Sink', usage: 8, percentage: 19, status: 'normal' },
  { name: 'Washing Machine', usage: 7, percentage: 16, status: 'normal' },
  { name: 'Toilet', usage: 5, percentage: 12, status: 'normal' },
  { name: 'Garden', usage: 3, percentage: 7, status: 'low' },
  { name: 'Others', usage: 1, percentage: 4, status: 'low' },
]

const weeklyData = [
  { day: 'Mon', water: 145 }, { day: 'Tue', water: 162 },
  { day: 'Wed', water: 138 }, { day: 'Thu', water: 170 },
  { day: 'Fri', water: 155 }, { day: 'Sat', water: 120 },
  { day: 'Sun', water: 110 },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      {payload.map((e: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: e.color }}>{e.name}: {e.value} L</p>
      ))}
    </div>
  )
}

export default function WaterPage() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Droplets className="w-6 h-6 text-cyan-500" /> Water Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Monitor and optimize your water consumption</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge">Live</div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-cyan-500 text-white rounded-xl hover:bg-cyan-600 transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Current Flow', value: '0.2 L/min', change: 0, icon: Activity, bg: 'bg-cyan-50', color: 'text-cyan-600' },
          { label: 'Today Total', value: '42 L', change: 5.4, icon: Droplets, bg: 'bg-cyan-50', color: 'text-cyan-600' },
          { label: "Today's Cost", value: '₹12', change: -3, icon: TrendingDown, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Leak Status', value: 'Clear', change: 0, icon: Shield, bg: 'bg-emerald-50', color: 'text-emerald-600' },
        ].map((kpi) => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="kpi-card">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-xl ${kpi.bg}`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                {kpi.change !== 0 && (
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.change < 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    {kpi.change < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                    {Math.abs(kpi.change)}%
                  </span>
                )}
              </div>
              <div className="mt-3"><span className="text-2xl font-bold text-gray-900">{kpi.value}</span></div>
              <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Hourly Consumption Chart */}
      <motion.div variants={fadeUp} className="card-static">
        <h2 className="section-title mb-4">Today's Water Profile</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={hourlyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" L" />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="value" name="water" stroke="#06b6d4" strokeWidth={2.5} fill="url(#waterGrad)" dot={false} activeDot={{ r: 4, fill: '#0891b2', strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Fixture Breakdown + Weekly */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card-static">
          <h2 className="section-title mb-4">Fixture Breakdown</h2>
          <div className="space-y-3">
            {fixtureData.map((f) => (
              <div key={f.name} className="flex items-center gap-3">
                <span className="w-28 text-sm text-gray-600 flex-shrink-0">{f.name}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.percentage}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={`h-full rounded-full ${f.status === 'high' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-gradient-to-r from-cyan-500 to-cyan-400'}`}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-12 text-right">{f.usage} L</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-static">
          <h2 className="section-title mb-4">Weekly Consumption</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" L" />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="water" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Leak Detection */}
      <motion.div variants={fadeUp} className="card-static">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-emerald-600" />
          <h2 className="section-title">Leak Detection</h2>
        </div>
        <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
          <div className="p-2 bg-emerald-100 rounded-xl">
            <Shield className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">All Systems Normal</p>
            <p className="text-xs text-emerald-600 mt-0.5">Last check: 5 minutes ago · Next check in 10 minutes</p>
          </div>
          <button className="ml-auto px-3 py-1.5 text-xs font-medium text-emerald-700 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
            Run Test
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
