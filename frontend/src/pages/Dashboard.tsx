import { motion } from 'framer-motion'
import {
  Zap,
  Droplets,
  DollarSign,
  Cpu,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  ArrowRight,
  Activity,
  Leaf,
  BarChart3,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

/* ────────────────────────────── MOCK DATA ────────────────────────────── */

const energyTrendData = [
  { time: '00:00', actual: 0.8, forecast: 0.9 },
  { time: '02:00', actual: 0.5, forecast: 0.6 },
  { time: '04:00', actual: 0.3, forecast: 0.4 },
  { time: '06:00', actual: 1.2, forecast: 1.0 },
  { time: '08:00', actual: 2.1, forecast: 1.8 },
  { time: '10:00', actual: 2.8, forecast: 2.5 },
  { time: '12:00', actual: 2.4, forecast: 2.6 },
  { time: '14:00', actual: 3.1, forecast: 2.8 },
  { time: '16:00', actual: 2.9, forecast: 2.7 },
  { time: '18:00', actual: 3.5, forecast: 3.0 },
  { time: '20:00', actual: 2.8, forecast: 2.9 },
  { time: '22:00', actual: 1.5, forecast: 1.6 },
]

const weeklyData = [
  { day: 'Mon', energy: 18.2, water: 145 },
  { day: 'Tue', energy: 22.1, water: 162 },
  { day: 'Wed', energy: 19.8, water: 138 },
  { day: 'Thu', energy: 24.3, water: 170 },
  { day: 'Fri', energy: 20.5, water: 155 },
  { day: 'Sat', energy: 16.1, water: 120 },
  { day: 'Sun', energy: 14.8, water: 110 },
]

const deviceBreakdown = [
  { name: 'HVAC', value: 35, color: '#0f766e' },
  { name: 'Lighting', value: 20, color: '#14b8a6' },
  { name: 'Appliances', value: 25, color: '#5eead4' },
  { name: 'Water Heater', value: 12, color: '#06b6d4' },
  { name: 'Others', value: 8, color: '#99f6e4' },
]

const alerts = [
  { id: 1, type: 'warning' as const, severity: 'high', message: 'HVAC consuming 40% above average', time: '5 min ago', icon: AlertTriangle },
  { id: 2, type: 'info' as const, severity: 'medium', message: 'Smart Thermostat firmware v2.3 available', time: '1 hour ago', icon: Info },
  { id: 3, type: 'success' as const, severity: 'low', message: 'Water leak test passed — all sensors normal', time: '3 hours ago', icon: CheckCircle },
]

const recommendations = [
  { id: 1, title: 'Switch HVAC to Eco Mode', description: 'Current HVAC usage is 40% above your weekly average. Switching to eco mode during 10 AM – 4 PM can save energy.', impact: 'Save ~₹340/month', priority: 'high' as const, icon: Zap },
  { id: 2, title: 'Optimize Water Heater Schedule', description: 'Your water heater runs 6 hours daily. Reducing to 4 hours with a smart schedule covers your usage.', impact: 'Save ~₹180/month', priority: 'medium' as const, icon: Droplets },
  { id: 3, title: 'Upgrade Smart Thermostat', description: 'Your thermostat is 5 years old. Upgrading to an AI-enabled model can reduce energy costs by 10-15%.', impact: 'Save ~₹240/month', priority: 'low' as const, icon: TrendingUp },
]

const alertStyles = {
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: 'text-amber-500' },
  info: { bg: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-200', icon: 'text-cyan-500' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', icon: 'text-emerald-500' },
}

const priorityBadge = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-primary-50 text-primary-600',
}

/* ────────────────────────────── ANIMATIONS ────────────────────────────── */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* ───────────────────── CUSTOM TOOLTIP FOR RECHARTS ──────────────────── */

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3">
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {entry.value} {entry.name === 'actual' || entry.name === 'forecast' ? 'kW' : ''}
        </p>
      ))}
    </div>
  )
}

/* ────────────────────────────── MAIN COMPONENT ────────────────────────── */

export default function Dashboard() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="max-w-[1400px] mx-auto space-y-6"
    >
      {/* ─── Page Header ─── */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Welcome back, Prince. Here's your home overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge">Live</div>
          <select className="text-sm bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-600 focus:ring-2 focus:ring-primary-200 focus:border-primary-300 outline-none">
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </motion.div>

      {/* ─── KPI Summary Row ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={Zap}
          iconBg="bg-primary-50"
          iconColor="text-primary-600"
          label="Energy Today"
          value="2.4"
          unit="kWh"
          change={-12}
          sparkData={[0.8, 0.5, 1.2, 2.1, 2.8, 2.4, 3.1, 2.9]}
        />
        <KpiCard
          icon={Droplets}
          iconBg="bg-cyan-50"
          iconColor="text-cyan-600"
          label="Water Today"
          value="42"
          unit="Liters"
          change={5.4}
          sparkData={[3, 2, 4, 5, 4, 6, 5, 4]}
        />
        <KpiCard
          icon={Cpu}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          label="Active Devices"
          value="8"
          unit="/ 12 Online"
          change={0}
          sparkData={[8, 8, 7, 8, 8, 9, 8, 8]}
        />
        <KpiCard
          icon={DollarSign}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          label="Est. Monthly Cost"
          value="₹724"
          unit=""
          change={-2.1}
          sparkData={[800, 780, 760, 750, 740, 730, 724, 720]}
        />
      </motion.div>

      {/* ─── Main Charts Row ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Energy Trend Chart */}
        <div className="lg:col-span-2 card-static">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-title">Energy Consumption</h2>
              <p className="text-xs text-gray-400 mt-0.5">Actual vs AI Forecast — Today</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-primary-500 rounded-full" />
                Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-primary-300 rounded-full opacity-60" style={{ borderTop: '1px dashed' }} />
                Forecast
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={energyTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gradientEnergy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kW" />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="forecast" stroke="#99f6e4" strokeWidth={2} strokeDasharray="6 4" fill="none" dot={false} />
              <Area type="monotone" dataKey="actual" stroke="#14b8a6" strokeWidth={2.5} fill="url(#gradientEnergy)" dot={false} activeDot={{ r: 4, fill: '#0f766e', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Device Breakdown */}
        <div className="card-static">
          <h2 className="section-title mb-4">Device Breakdown</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {deviceBreakdown.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {deviceBreakdown.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-gray-500">{d.name}</span>
                <span className="text-xs font-semibold text-gray-700 ml-auto">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Weekly Overview + Alerts Row ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Weekly Bar Chart */}
        <div className="lg:col-span-3 card-static">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="section-title">Weekly Overview</h2>
              <p className="text-xs text-gray-400 mt-0.5">Energy consumption this week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kWh" />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="energy" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts Panel */}
        <div className="lg:col-span-2 card-static">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recent Alerts</h2>
            <span className="text-xs font-medium text-primary-600 hover:text-primary-700 cursor-pointer">View All</span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const style = alertStyles[alert.type]
              const Icon = alert.icon
              return (
                <motion.div
                  key={alert.id}
                  whileHover={{ x: 4 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${style.bg} ${style.border} cursor-pointer transition-colors`}
                >
                  <div className={`p-1.5 rounded-lg ${style.bg}`}>
                    <Icon className={`w-4 h-4 ${style.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${style.text}`}>{alert.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{alert.time}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* ─── AI Recommendations + Sustainability Row ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI Recommendations */}
        <div className="lg:col-span-2 card-static">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary-50 rounded-lg">
                <Lightbulb className="w-4 h-4 text-primary-600" />
              </div>
              <h2 className="section-title">AI Recommendations</h2>
            </div>
            <span className="text-xs font-medium text-primary-600 cursor-pointer">View All</span>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const RecIcon = rec.icon
              return (
                <motion.div
                  key={rec.id}
                  whileHover={{ scale: 1.005 }}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-primary-50/30 transition-colors cursor-pointer group"
                >
                  <div className="p-2 bg-white rounded-xl shadow-sm flex-shrink-0">
                    <RecIcon className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-800">{rec.title}</h3>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${priorityBadge[rec.priority]}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{rec.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs font-semibold text-emerald-600">{rec.impact}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Sustainability Score */}
        <div className="card-static">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-4 h-4 text-primary-600" />
            <h2 className="section-title">Eco Impact</h2>
          </div>

          {/* Score Ring */}
          <div className="flex flex-col items-center py-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f0fdfa" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#ecoGradient)" strokeWidth="8" strokeLinecap="round"
                  strokeDasharray={`${87 * 2.64} ${100 * 2.64}`}
                />
                <defs>
                  <linearGradient id="ecoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0f766e" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gradient">87</span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Score</span>
              </div>
            </div>
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full"
            >
              A+ Rating
            </motion.span>
          </div>

          {/* Impact Metrics */}
          <div className="space-y-3 mt-2">
            <EcoMetric label="CO₂ Saved" value="12.4 kg" change={8} />
            <EcoMetric label="Water Saved" value="340 L" change={15} />
            <EcoMetric label="Cost Saved" value="₹1,240" change={11} />
          </div>

          <div className="mt-4 p-3 bg-primary-50 rounded-xl">
            <p className="text-xs text-primary-700 font-medium text-center">
              🌳 Equivalent to <strong>2 trees planted</strong> this month
            </p>
          </div>
        </div>
      </motion.div>

      {/* ─── Real-Time Monitor Row ─── */}
      <motion.div variants={fadeUp} className="card-static">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary-600" />
            <h2 className="section-title">Real-Time Monitor</h2>
          </div>
          <div className="live-badge">Live</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Energy */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Energy</span>
              <span className="text-lg font-bold text-primary-700">1.5 kW</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '62%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-eco-gradient rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400">0 kW</span>
              <span className="text-[10px] text-gray-400">Capacity: 5 kW</span>
            </div>
          </div>
          {/* Water */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Water</span>
              <span className="text-lg font-bold text-cyan-600">0.2 L/min</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '15%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-400">0 L/min</span>
              <span className="text-[10px] text-gray-400">Capacity: 8 L/min</span>
            </div>
          </div>
        </div>
        {/* Active Devices Strip */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">Active now:</span>
          {['Kitchen Light', 'HVAC', 'Water Heater', 'Smart Plug #2'].map((device) => (
            <span key={device} className="px-2.5 py-1 bg-primary-50 text-primary-700 text-[11px] font-medium rounded-lg">
              {device}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── Quick Stats Footer ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat icon={BarChart3} label="Avg Daily Energy" value="18.4 kWh" />
        <QuickStat icon={Droplets} label="Avg Daily Water" value="143 L" />
        <QuickStat icon={Activity} label="Peak Hour" value="6 – 8 PM" />
        <QuickStat icon={Leaf} label="Green Streak" value="12 days" />
      </motion.div>
    </motion.div>
  )
}

/* ────────────────────────────── SUB COMPONENTS ────────────────────────── */

interface KpiCardProps {
  icon: React.ElementType
  iconBg: string
  iconColor: string
  label: string
  value: string
  unit: string
  change: number
  sparkData: number[]
}

function KpiCard({ icon: Icon, iconBg, iconColor, label, value, unit, change, sparkData }: KpiCardProps) {
  const isPositive = change > 0
  const isNeutral = change === 0
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="kpi-card"
    >
      <div className="flex items-start justify-between">
        <div className={`p-2 rounded-xl ${iconBg}`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {!isNeutral && (
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-red-500' : 'text-emerald-500'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-400 ml-1">{unit}</span>
      </div>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>

      {/* Mini sparkline */}
      <div className="flex items-end gap-[3px] mt-3 h-6">
        {sparkData.map((v, i) => {
          const max = Math.max(...sparkData)
          const height = max > 0 ? (v / max) * 100 : 0
          return (
            <div
              key={i}
              className="flex-1 rounded-sm bg-primary-200 opacity-60"
              style={{ height: `${height}%`, minHeight: '2px' }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

interface EcoMetricProps {
  label: string
  value: string
  change: number
}

function EcoMetric({ label, value, change }: EcoMetricProps) {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-xl">
      <span className="text-xs text-gray-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-800">{value}</span>
        <span className="text-[10px] font-semibold text-emerald-500">↑ {change}%</span>
      </div>
    </div>
  )
}

interface QuickStatProps {
  icon: React.ElementType
  label: string
  value: string
}

function QuickStat({ icon: Icon, label, value }: QuickStatProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-card border border-gray-100/60">
      <div className="p-2 bg-primary-50 rounded-xl">
        <Icon className="w-4 h-4 text-primary-600" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}
