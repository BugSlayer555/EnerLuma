import { motion } from 'framer-motion'
import {
  Zap,
  Droplets,
  DollarSign,
  TrendingUp,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import EnergyChart from '../components/EnergyChart'
import WaterChart from '../components/WaterChart'

// Dummy data
const summaryMetrics = {
  energy: {
    today: 5.2,
    unit: 'kWh',
    cost: 0.78,
    change: -3.2,
    efficiencyScore: 85,
  },
  water: {
    today: 42,
    unit: 'L',
    cost: 0.12,
    change: 5.4,
    efficiencyScore: 78,
  },
  totalCost: {
    today: 0.9,
    change: 2.1,
  },
  activeDevices: 8,
  totalDevices: 12,
  realTimeEnergy: 1.5,
  realTimeWater: 0.0,
}

type AlertSeverity = 'high' | 'medium' | 'low'

type AlertItem = {
  id: number
  type: 'warning' | 'info' | 'success'
  severity: AlertSeverity
  message: string
  time: string
  icon: any
}

const alerts: AlertItem[] = [
  {
    id: 1,
    type: 'warning',
    severity: 'high',
    message: 'High energy consumption detected in HVAC system',
    time: '5 min ago',
    icon: AlertTriangle,
  },
  {
    id: 2,
    type: 'info',
    severity: 'medium',
    message: 'Water consumption threshold reached',
    time: '1 hour ago',
    icon: Info,
  },
  {
    id: 3,
    type: 'success',
    severity: 'low',
    message: 'All devices operating normally',
    time: '2 hours ago',
    icon: CheckCircle,
  },
]

const recommendations: Recommendation[] = [
  {
    id: 1,
    type: 'energy',
    title: 'Optimize HVAC Usage',
    description: 'Your HVAC system is consuming 15% more energy than usual. Consider adjusting the temperature by 2°C.',
    impact: 'Save ~$12/month',
    icon: Lightbulb,
    priority: 'high',
  },
  {
    id: 2,
    type: 'water',
    title: 'Fix Leaky Faucet',
    description: 'Kitchen faucet shows irregular flow patterns. Check for leaks to reduce water waste.',
    impact: 'Save ~$5/month',
    icon: Droplets,
    priority: 'medium',
  },
  {
    id: 3,
    type: 'general',
    title: 'Upgrade Smart Thermostat',
    description: 'Your current thermostat is 5 years old. Upgrading to a smart model could reduce energy costs by 10-15%.',
    impact: 'Save ~$20/month',
    icon: TrendingUp,
    priority: 'low',
  },
]

type Recommendation = {
  id: number
  type: string
  title: string
  description: string
  impact: string
  icon: any
  priority: 'high' | 'medium' | 'low'
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s your home&apos;s consumption summary
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Activity className="w-4 h-4 text-green-500" />
          <span>All systems operational</span>
        </div>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Energy Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={0}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                summaryMetrics.energy.change < 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {summaryMetrics.energy.change < 0 ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
              {Math.abs(summaryMetrics.energy.change)}%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Energy Today</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {summaryMetrics.energy.today} {summaryMetrics.energy.unit}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ${summaryMetrics.energy.cost.toFixed(2)}
            </p>
          </div>
        </motion.div>

        {/* Water Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
              <Droplets className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                summaryMetrics.water.change < 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {summaryMetrics.water.change < 0 ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
              {Math.abs(summaryMetrics.water.change)}%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Water Today</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {summaryMetrics.water.today} {summaryMetrics.water.unit}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ${summaryMetrics.water.cost.toFixed(2)}
            </p>
          </div>
        </motion.div>

        {/* Total Cost Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                summaryMetrics.totalCost.change < 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}
            >
              {summaryMetrics.totalCost.change < 0 ? (
                <ArrowDown className="w-4 h-4" />
              ) : (
                <ArrowUp className="w-4 h-4" />
              )}
              {Math.abs(summaryMetrics.totalCost.change)}%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Cost Today</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${summaryMetrics.totalCost.today.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Energy + Water</p>
          </div>
        </motion.div>

        {/* Active Devices Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={3}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Devices</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {summaryMetrics.activeDevices}/{summaryMetrics.totalDevices}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 dark:bg-purple-400 h-2 rounded-full transition-all"
                style={{
                  width: `${(summaryMetrics.activeDevices / summaryMetrics.totalDevices) * 100}%`,
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Real-time Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Real-Time Energy
            </h3>
            <Activity className="w-5 h-5 text-green-500 animate-pulse" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {summaryMetrics.realTimeEnergy}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">kW</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Current power consumption</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Real-Time Water
            </h3>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {summaryMetrics.realTimeWater.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">L/min</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Current flow rate</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Energy Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Energy Usage
            </h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View Details
            </button>
          </div>
          <div className="h-64">
            <EnergyChart />
          </div>
        </motion.div>

        {/* Water Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Water Usage
            </h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View Details
            </button>
          </div>
          <div className="h-64">
            <WaterChart />
          </div>
        </motion.div>
      </div>

      {/* Alerts and Recommendations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Alerts Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Alerts
            </h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = alert.icon
              const severityColors = {
                high: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
                medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
                low: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
              }
              return (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${severityColors[alert.severity]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Recommendations Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              AI Recommendations
            </h3>
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec) => {
              const Icon = rec.icon
              const priorityColors = {
                high: 'border-l-red-500',
                medium: 'border-l-yellow-500',
                low: 'border-l-blue-500',
              }
              return (
                <div
                  key={rec.id}
                  className={`border-l-4 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${priorityColors[rec.priority]}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {rec.title}
                        </h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            rec.priority === 'high'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                              : rec.priority === 'medium'
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {rec.description}
                      </p>
                      <p className="text-xs font-medium text-green-600 dark:text-green-400">
                        {rec.impact}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
