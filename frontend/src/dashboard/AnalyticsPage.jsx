import { motion } from 'framer-motion'
import {
  BarChart3, TrendingUp, TrendingDown, Zap, Droplets, IndianRupee,
  Calendar, Download, ArrowUpRight, ArrowDownRight, Clock, Target,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  ComposedChart, Line, RadialBarChart, RadialBar, Legend,
} from 'recharts'

/* ─── Mock Data ─── */

const monthlyTrend = [
  { month: 'Jan', energy: 520, water: 4200, cost: 2340 },
  { month: 'Feb', energy: 480, water: 3900, cost: 2160 },
  { month: 'Mar', energy: 510, water: 4100, cost: 2295 },
  { month: 'Apr', energy: 460, water: 3600, cost: 2070 },
  { month: 'May', energy: 440, water: 3400, cost: 1980 },
  { month: 'Jun', energy: 490, water: 3800, cost: 2205 },
]

const weeklyUsage = [
  { day: 'Mon', energy: 24.3, water: 142 },
  { day: 'Tue', energy: 22.1, water: 155 },
  { day: 'Wed', energy: 26.8, water: 138 },
  { day: 'Thu', energy: 21.5, water: 160 },
  { day: 'Fri', energy: 25.2, water: 147 },
  { day: 'Sat', energy: 18.4, water: 120 },
  { day: 'Sun', energy: 16.9, water: 105 },
]

const hourlyPattern = [
  { hour: '00', value: 0.4 }, { hour: '02', value: 0.3 },
  { hour: '04', value: 0.3 }, { hour: '06', value: 1.1 },
  { hour: '08', value: 2.3 }, { hour: '10', value: 2.8 },
  { hour: '12', value: 2.5 }, { hour: '14', value: 3.1 },
  { hour: '16', value: 2.9 }, { hour: '18', value: 3.5 },
  { hour: '20', value: 2.8 }, { hour: '22', value: 1.2 },
]

const categoryBreakdown = [
  { name: 'HVAC', value: 35, color: '#0f766e' },
  { name: 'Kitchen', value: 21, color: '#14b8a6' },
  { name: 'Lighting', value: 20, color: '#5eead4' },
  { name: 'Water Heating', value: 12, color: '#06b6d4' },
  { name: 'Smart Plugs', value: 8, color: '#67e8f9' },
  { name: 'Others', value: 4, color: '#d1d5db' },
]

const deviceEfficiency = [
  { name: 'Smart Thermostat', score: 92, fill: '#0f766e' },
  { name: 'Refrigerator', score: 78, fill: '#14b8a6' },
  { name: 'Water Heater', score: 65, fill: '#06b6d4' },
  { name: 'EV Charger', score: 88, fill: '#0891b2' },
]

const costComparison = [
  { month: 'Jan', actual: 2340, optimized: 1950 },
  { month: 'Feb', actual: 2160, optimized: 1820 },
  { month: 'Mar', actual: 2295, optimized: 1900 },
  { month: 'Apr', actual: 2070, optimized: 1750 },
  { month: 'May', actual: 1980, optimized: 1680 },
  { month: 'Jun', actual: 2205, optimized: 1850 },
]

const topConsumers = [
  { name: 'HVAC System', type: 'HVAC', consumption: '8.4 kWh/day', cost: '₹38/day', trend: -5, icon: '🌡️' },
  { name: 'EV Charger', type: 'Charging', consumption: '6.5 kWh/day', cost: '₹29/day', trend: 12, icon: '⚡' },
  { name: 'Water Heater', type: 'Water', consumption: '3.0 kWh/day', cost: '₹14/day', trend: -8, icon: '💧' },
  { name: 'Kitchen Appliances', type: 'Appliance', consumption: '5.0 kWh/day', cost: '₹23/day', trend: 3, icon: '🍳' },
  { name: 'Lighting', type: 'Lighting', consumption: '4.8 kWh/day', cost: '₹22/day', trend: -15, icon: '💡' },
]

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#fff', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      border: '1px solid #f3f4f6', padding: '14px 18px',
    }}>
      <p style={{ fontSize: 12, fontWeight: 600, color: '#6b7280', marginBottom: 8 }}>{label}</p>
      {payload.map((e, i) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 600, color: e.color, margin: '3px 0' }}>
          {e.name}: {e.value}{typeof e.value === 'number' && e.value > 100 ? '' : ' kW'}
        </p>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const totalEnergy = monthlyTrend.reduce((s, m) => s + m.energy, 0)
  const totalCost = monthlyTrend.reduce((s, m) => s + m.cost, 0)
  const totalWater = monthlyTrend.reduce((s, m) => s + m.water, 0)
  const avgEfficiency = Math.round(deviceEfficiency.reduce((s, d) => s + d.score, 0) / deviceEfficiency.length)
  const potentialSavings = costComparison.reduce((s, m) => s + (m.actual - m.optimized), 0)

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible"
      style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 40 }}
    >
      {/* Header */}
      <motion.div variants={fadeUp} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16, marginBottom: 40,
      }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <BarChart3 style={{ width: 26, height: 26, color: '#14b8a6' }} />
            Analytics Dashboard
          </h1>
          <p style={{ fontSize: 14, color: '#9ca3af', margin: '6px 0 0' }}>
            Comprehensive resource usage analytics and insights
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="live-badge">Live</div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 500,
            background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
            color: '#4b5563', cursor: 'pointer',
          }}>
            <Calendar style={{ width: 16, height: 16 }} /> Last 6 Months
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 600,
            background: 'linear-gradient(135deg, #0f766e, #14b8a6)', border: 'none', borderRadius: 12,
            color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(20,184,166,0.3)',
          }}>
            <Download style={{ width: 16, height: 16 }} /> Export Report
          </button>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={fadeUp} className="dash-grid-4col" style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 20, marginBottom: 40,
      }}>
        {[
          { label: 'Total Energy', value: `${totalEnergy} kWh`, sub: '6-month total', change: -8.2, icon: Zap, iconBg: '#f0fdfa', iconColor: '#0f766e' },
          { label: 'Total Water', value: `${(totalWater / 1000).toFixed(1)}K L`, sub: '6-month total', change: -12.5, icon: Droplets, iconBg: '#ecfeff', iconColor: '#0891b2' },
          { label: 'Total Cost', value: `₹${(totalCost).toLocaleString()}`, sub: '6-month total', change: -5.4, icon: IndianRupee, iconBg: '#fefce8', iconColor: '#ca8a04' },
          { label: 'Avg Efficiency', value: `${avgEfficiency}%`, sub: 'Across all devices', change: 4.1, icon: Target, iconBg: '#f0fdf4', iconColor: '#16a34a' },
        ].map(kpi => {
          const Icon = kpi.icon
          return (
            <motion.div key={kpi.label} whileHover={{ y: -3 }} style={{
              background: '#fff', borderRadius: 20, padding: 28,
              border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.2s',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 14, background: kpi.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon style={{ width: 22, height: 22, color: kpi.iconColor }} />
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  fontSize: 12, fontWeight: 600,
                  color: kpi.change < 0 ? '#16a34a' : '#ef4444',
                }}>
                  {kpi.change < 0
                    ? <ArrowDownRight style={{ width: 14, height: 14 }} />
                    : <ArrowUpRight style={{ width: 14, height: 14 }} />
                  }
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#111827', lineHeight: 1.1 }}>{kpi.value}</div>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: '6px 0 0' }}>{kpi.label} · {kpi.sub}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Monthly Trend + Category Breakdown */}
      <motion.div variants={fadeUp} className="dash-grid-sidebar" style={{
        display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, marginBottom: 32,
      }}>
        {/* Monthly Trend Chart */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Monthly Consumption Trend</h2>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 0' }}>Energy & water usage over the last 6 months</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 11, color: '#9ca3af' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 3, borderRadius: 2, background: '#14b8a6' }} /> Energy (kWh)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 10, height: 3, borderRadius: 2, background: '#06b6d4' }} /> Water (L)
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ag-energy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Area yAxisId="left" type="monotone" dataKey="energy" name="Energy" stroke="#14b8a6" strokeWidth={2.5} fill="url(#ag-energy)" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="water" name="Water" stroke="#06b6d4" strokeWidth={2} strokeDasharray="6 4" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown Pie */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 28px',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Category Breakdown</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 16px' }}>Energy distribution by appliance type</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                dataKey="value" paddingAngle={3} strokeWidth={0}>
                {categoryBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            {categoryBreakdown.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: '#4b5563', flex: 1 }}>{c.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#111827' }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Weekly Usage + Peak Hours */}
      <motion.div variants={fadeUp} className="dash-grid-2col" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32,
      }}>
        {/* Weekly Usage */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Weekly Consumption</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 24px' }}>Daily energy usage pattern this week</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklyUsage} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kWh" />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="energy" name="Energy" fill="#14b8a6" radius={[8, 8, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Hours Heatmap */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Peak Hours Analysis</h2>
              <p style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 0' }}>Hourly consumption pattern</p>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              background: '#fef3c7', borderRadius: 20, fontSize: 11, fontWeight: 600, color: '#d97706',
            }}>
              <Clock style={{ width: 12, height: 12 }} /> Peak: 6-8 PM
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={hourlyPattern} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="ag-peak" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${v}:00`} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kW" />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="value" name="Usage" stroke="#f59e0b" strokeWidth={2.5}
                fill="url(#ag-peak)" dot={false} activeDot={{ r: 4, fill: '#d97706', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Cost Analysis */}
      <motion.div variants={fadeUp} style={{
        background: '#fff', borderRadius: 20, padding: '32px 36px',
        border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>Cost Analysis — Actual vs Optimized</h2>
            <p style={{ fontSize: 12, color: '#9ca3af', margin: '4px 0 0' }}>
              Potential savings with AI-recommended optimizations
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
            background: '#f0fdf4', borderRadius: 12, fontSize: 13, fontWeight: 700, color: '#16a34a',
          }}>
            <TrendingDown style={{ width: 16, height: 16 }} />
            ₹{potentialSavings.toLocaleString()} saveable
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costComparison} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
              tickFormatter={v => `₹${v}`} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="actual" name="Actual Cost" fill="#e5e7eb" radius={[6, 6, 0, 0]} barSize={28} />
            <Bar dataKey="optimized" name="Optimized" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 16, justifyContent: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9ca3af' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: '#e5e7eb' }} /> Actual Cost
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#9ca3af' }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: '#14b8a6' }} /> AI-Optimized
          </span>
        </div>
      </motion.div>

      {/* Top Consumers + Device Efficiency */}
      <motion.div variants={fadeUp} className="dash-grid-2col" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32,
      }}>
        {/* Top Consumers Table */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Top Energy Consumers</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 24px' }}>Ranked by daily consumption</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {topConsumers.map((device, i) => (
              <div key={device.name} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 20px', borderRadius: 16, background: '#f9fafb',
                border: '1px solid #f3f4f6',
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#d1d5db', width: 20, textAlign: 'center' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 24 }}>{device.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{device.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                      background: '#f0fdfa', color: '#0f766e',
                    }}>{device.type}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 16, marginTop: 4, fontSize: 11, color: '#9ca3af' }}>
                    <span>{device.consumption}</span>
                    <span>{device.cost}</span>
                  </div>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  fontSize: 12, fontWeight: 600,
                  color: device.trend < 0 ? '#16a34a' : '#ef4444',
                }}>
                  {device.trend < 0
                    ? <TrendingDown style={{ width: 14, height: 14 }} />
                    : <TrendingUp style={{ width: 14, height: 14 }} />
                  }
                  {Math.abs(device.trend)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Efficiency Scores */}
        <div style={{
          background: '#fff', borderRadius: 20, padding: '32px 36px',
          border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>Device Efficiency Scores</h2>
          <p style={{ fontSize: 12, color: '#9ca3af', margin: '0 0 24px' }}>Performance rating of connected devices</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {deviceEfficiency.map(device => (
              <div key={device.name}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1f2937' }}>{device.name}</span>
                  <span style={{
                    fontSize: 13, fontWeight: 800,
                    color: device.score >= 85 ? '#16a34a' : device.score >= 70 ? '#d97706' : '#ef4444',
                  }}>
                    {device.score}%
                  </span>
                </div>
                <div style={{ height: 10, background: '#f3f4f6', borderRadius: 20, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${device.score}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{
                      height: '100%', borderRadius: 20,
                      background: device.score >= 85
                        ? 'linear-gradient(90deg, #16a34a, #22c55e)'
                        : device.score >= 70
                          ? 'linear-gradient(90deg, #d97706, #f59e0b)'
                          : 'linear-gradient(90deg, #ef4444, #f87171)',
                    }}
                  />
                </div>
                <p style={{ fontSize: 10, color: '#9ca3af', marginTop: 4 }}>
                  {device.score >= 85 ? 'Excellent — operating optimally'
                    : device.score >= 70 ? 'Good — minor improvements possible'
                      : 'Below average — optimization recommended'}
                </p>
              </div>
            ))}
          </div>

          {/* Average Score */}
          <div style={{
            marginTop: 28, padding: '20px 24px', borderRadius: 16,
            background: 'linear-gradient(135deg, #f0fdfa, #ecfeff)',
            border: '1px solid #ccfbf1',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#0f766e', margin: 0 }}>Average Efficiency Score</p>
              <p style={{ fontSize: 11, color: '#5eead4', margin: '2px 0 0' }}>Across {deviceEfficiency.length} monitored devices</p>
            </div>
            <span style={{ fontSize: 32, fontWeight: 800, color: '#0f766e' }}>{avgEfficiency}%</span>
          </div>
        </div>
      </motion.div>

      {/* Insights Summary */}
      <motion.div variants={fadeUp} style={{
        background: '#fff', borderRadius: 20, padding: '32px 36px',
        border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: '0 0 24px' }}>Key Insights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            { icon: '📉', title: 'Energy Declining', desc: 'Overall energy consumption dropped 8.2% over 6 months — HVAC optimization is the primary driver.', color: '#f0fdf4', border: '#bbf7d0' },
            { icon: '⏰', title: 'Peak Shift Opportunity', desc: 'Moving 15% of peak-hour load (6-8 PM) to off-peak could save ₹280/month on time-of-use tariffs.', color: '#fefce8', border: '#fde68a' },
            { icon: '💧', title: 'Water Conservation', desc: 'Shower usage accounts for 42% of water consumption. Smart flow limiters could reduce usage by 20%.', color: '#ecfeff', border: '#a5f3fc' },
            { icon: '🔋', title: 'EV Charging Smart', desc: 'Scheduling EV charging during off-peak hours (11 PM - 5 AM) would reduce daily charging cost by ₹12.', color: '#f0fdf4', border: '#bbf7d0' },
            { icon: '🏠', title: 'Standby Power', desc: 'Smart plugs drawing 0.1 kWh in standby mode across 3 devices — auto-off scheduling recommended.', color: '#faf5ff', border: '#e9d5ff' },
            { icon: '📊', title: 'Efficiency Trend', desc: 'Average device efficiency improved from 74% to 81% this quarter — continue current optimization plan.', color: '#f0fdfa', border: '#99f6e4' },
          ].map(insight => (
            <div key={insight.title} style={{
              padding: 24, borderRadius: 16,
              background: insight.color, border: `1px solid ${insight.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{insight.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#1f2937' }}>{insight.title}</span>
              </div>
              <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{insight.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
