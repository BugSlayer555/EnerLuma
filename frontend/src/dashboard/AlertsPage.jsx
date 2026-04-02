import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle, Bell, Shield, Activity,
  CheckCircle, Clock, Zap, TrendingDown,
  TrendingUp, Eye, Filter, XCircle,
  Settings, BarChart3, Cpu, RefreshCw,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  getAlertHistory,
  getAlertGroups,
  getThresholdConfigs,
  getAnomalyAlerts,
  getPredictiveWarnings,
  getDeviceHealthData,
  getAlertAnalytics,
} from '../utils/alertEngine'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const severityStyles = {
  critical: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500', border: 'border-red-200', icon: Zap },
  warning: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-500', border: 'border-amber-200', icon: AlertTriangle },
  info: { bg: 'bg-blue-50', text: 'text-blue-600', dot: 'bg-blue-400', border: 'border-blue-200', icon: Eye },
}

const statusStyleMap = {
  active: { bg: 'bg-red-50', text: 'text-red-600' },
  resolved: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
  investigating: { bg: 'bg-amber-50', text: 'text-amber-600' },
}

export default function AlertsPage() {
  const [filter, setFilter] = useState('all')
  const alerts = getAlertHistory()
  const groups = getAlertGroups()
  const thresholds = getThresholdConfigs()
  const anomalies = getAnomalyAlerts()
  const predictions = getPredictiveWarnings()
  const deviceHealth = getDeviceHealthData()
  const analytics = getAlertAnalytics()

  const filtered = alerts.filter(a => {
    if (filter === 'all') return true
    if (filter === 'active') return a.status === 'active'
    if (filter === 'resolved') return a.status === 'resolved'
    if (filter === 'critical') return a.severity === 'critical'
    return true
  })

  const activeCount = alerts.filter(a => a.status === 'active').length
  const criticalCount = alerts.filter(a => a.severity === 'critical').length

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-12 pb-10">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-amber-500" /> Alerts & Monitoring
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {activeCount} active alerts · {criticalCount} critical
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="live-badge">Live</div>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings className="w-4 h-4" /> Configure
          </button>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Alerts', value: analytics.totalAlerts, icon: Bell, bg: 'bg-primary-50', color: 'text-primary-600' },
          { label: 'Resolved', value: analytics.resolvedAlerts, icon: CheckCircle, bg: 'bg-emerald-50', color: 'text-emerald-600' },
          { label: 'Avg Resolution', value: analytics.avgResolutionTime, icon: Clock, bg: 'bg-blue-50', color: 'text-blue-600' },
          { label: 'Critical Rate', value: analytics.criticalRate, icon: Zap, bg: 'bg-red-50', color: 'text-red-600' },
        ].map(kpi => {
          const Icon = kpi.icon
          return (
            <div key={kpi.label} className="kpi-card">
              <div className={`p-2 rounded-xl ${kpi.bg} w-fit`}>
                <Icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
            </div>
          )
        })}
      </motion.div>

      {/* Alert History */}
      <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ marginBottom: 28 }}>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary-500" />
            <h2 className="section-title">Alert History</h2>
          </div>
          <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
            {['all', 'active', 'resolved', 'critical'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${filter === f ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(alert => {
            const sev = severityStyles[alert.severity] || severityStyles.info
            const SevIcon = sev.icon
            const stat = statusStyleMap[alert.status] || statusStyleMap.active
            return (
              <motion.div
                key={alert.id}
                whileHover={{ x: 4 }}
                className={`flex items-start rounded-xl border ${sev.border} ${sev.bg} cursor-pointer`}
                style={{ padding: 20, gap: 16 }}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <SevIcon className={`w-5 h-5 ${sev.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-gray-800">{alert.title}</span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${sev.bg} ${sev.text}`}>
                      {alert.severity}
                    </span>
                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${stat.bg} ${stat.text}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">{alert.message}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Cpu className="w-3 h-3" /> {alert.device}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" /> {alert.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Anomaly Detection + Predictive Warnings */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Anomaly Detection */}
        <div className="card-static" style={{ padding: '36px 40px' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
            <Activity className="w-5 h-5 text-purple-500" />
            <h2 className="section-title">AI Anomaly Detection</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {anomalies.map(a => {
              const stat = statusStyleMap[a.status] || statusStyleMap.active
              return (
                <div key={a.id} className="flex items-center bg-gray-50 rounded-xl" style={{ padding: 18, gap: 16 }}>
                  <div className="flex-shrink-0">
                    <div className="relative" style={{ width: 44, height: 44 }}>
                      <svg width="44" height="44" viewBox="0 0 44 44">
                        <circle cx="22" cy="22" r="18" fill="none" stroke="#f0f0f0" strokeWidth="4" />
                        <circle cx="22" cy="22" r="18" fill="none" stroke={a.confidence >= 90 ? '#ef4444' : a.confidence >= 80 ? '#f59e0b' : '#3b82f6'} strokeWidth="4" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 18} strokeDashoffset={2 * Math.PI * 18 * (1 - a.confidence / 100)} transform="rotate(-90 22 22)" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-700">{a.confidence}%</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{a.device} — {a.type}</p>
                    <p className="text-xs text-gray-400 mt-1">Expected: {a.expected} · Actual: {a.actual} · {a.time}</p>
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full ${stat.bg} ${stat.text}`}>
                    {a.status}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Predictive Warnings */}
        <div className="card-static" style={{ padding: '36px 40px' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <h2 className="section-title">Predictive Warnings</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {predictions.map(p => {
              const sev = severityStyles[p.severity] || severityStyles.info
              const SevIcon = sev.icon
              return (
                <div key={p.id} className={`flex items-start rounded-xl border ${sev.border} ${sev.bg}`} style={{ padding: 18, gap: 14 }}>
                  <div className="flex-shrink-0 mt-0.5">
                    <SevIcon className={`w-4 h-4 ${sev.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{p.device}</p>
                    <p className="text-xs text-gray-500 mt-1.5">{p.prediction}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${p.confidence >= 85 ? 'bg-red-400' : p.confidence >= 75 ? 'bg-amber-400' : 'bg-blue-400'}`}
                          style={{ width: `${p.confidence}%` }} />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-500">{p.confidence}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Device Health Overview */}
      <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
          <Shield className="w-5 h-5 text-emerald-500" />
          <h2 className="section-title">Device Health Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {deviceHealth.map(d => {
            const healthColor = d.health >= 85 ? 'text-emerald-600' : d.health >= 70 ? 'text-amber-600' : d.health > 0 ? 'text-red-500' : 'text-gray-400'
            const healthBg = d.health >= 85 ? 'bg-emerald-50' : d.health >= 70 ? 'bg-amber-50' : d.health > 0 ? 'bg-red-50' : 'bg-gray-100'
            const statusDot = d.status === 'online' ? 'bg-emerald-500' : 'bg-red-400'
            return (
              <div key={d.id} className="bg-white rounded-2xl border border-gray-100 shadow-card" style={{ padding: 20 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
                  <p className="text-sm font-semibold text-gray-800 truncate">{d.name}</p>
                  <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                </div>
                <div className="flex items-center justify-center" style={{ marginBottom: 12 }}>
                  <div className="relative" style={{ width: 72, height: 72 }}>
                    <svg width="72" height="72" viewBox="0 0 72 72">
                      <circle cx="36" cy="36" r="28" fill="none" stroke="#f0f0f0" strokeWidth="6" />
                      {d.health > 0 && (
                        <circle cx="36" cy="36" r="28" fill="none"
                          stroke={d.health >= 85 ? '#10b981' : d.health >= 70 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="6" strokeLinecap="round"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - d.health / 100)}
                          transform="rotate(-90 36 36)" />
                      )}
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${healthColor}`}>
                      {d.health > 0 ? `${d.health}%` : '—'}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>Signal: {d.signal}%</span>
                  <span>{d.uptime}</span>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Threshold Config + Weekly Trend */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Threshold Configurations */}
        <div className="card-static" style={{ padding: '36px 40px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-500" />
              <h2 className="section-title">Threshold Rules</h2>
            </div>
            <button className="text-xs text-primary-600 font-medium hover:text-primary-700 transition-colors">+ Add Rule</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {thresholds.map(t => (
              <div key={t.id} className="flex items-center bg-gray-50 rounded-xl" style={{ padding: 18, gap: 16 }}>
                <div className={`p-2 rounded-lg ${t.enabled ? 'bg-primary-50' : 'bg-gray-200'}`}>
                  <Zap className={`w-4 h-4 ${t.enabled ? 'text-primary-600' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{t.metric} &gt; {t.threshold} {t.unit}</p>
                </div>
                <div className={`w-10 h-5 rounded-full flex items-center cursor-pointer transition-colors ${t.enabled ? 'bg-primary-500 justify-end' : 'bg-gray-300 justify-start'}`}
                  style={{ padding: 2 }}>
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="card-static" style={{ padding: '36px 40px' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
            <BarChart3 className="w-5 h-5 text-primary-500" />
            <h2 className="section-title">Weekly Alert Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={analytics.weeklyTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
              <Bar dataKey="count" fill="#f59e0b" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Alert Groups */}
      <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: 24 }}>
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="section-title">Alert Groups</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {groups.map(g => {
            const sev = severityStyles[g.severity] || severityStyles.info
            const SevIcon = sev.icon
            return (
              <motion.div key={g.id} whileHover={{ y: -2 }} className={`rounded-2xl border ${sev.border} ${sev.bg} cursor-pointer`} style={{ padding: 24 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
                  <div className="flex items-center gap-2">
                    <SevIcon className={`w-5 h-5 ${sev.text}`} />
                    <span className="text-sm font-semibold text-gray-800">{g.name}</span>
                  </div>
                  <span className={`text-lg font-bold ${sev.text}`}>{g.count}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {g.devices.map(d => (
                    <span key={d} className="text-[10px] bg-white px-2 py-1 rounded-full text-gray-500 font-medium">{d}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
