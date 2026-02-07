import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown } from 'lucide-react'

export interface MetricCardProps {
  title: string
  value: number
  unit?: string
  delta?: number
  statusColor?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'cyan'
  icon?: React.ReactNode
  sparkline?: {
    data: number[]
    color?: string
  }
  className?: string
}

const statusColorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    icon: 'text-blue-600 dark:text-blue-400',
    deltaPositive: 'text-blue-600 dark:text-blue-400',
    deltaNegative: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    icon: 'text-green-600 dark:text-green-400',
    deltaPositive: 'text-green-600 dark:text-green-400',
    deltaNegative: 'text-green-600 dark:text-green-400',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    icon: 'text-red-600 dark:text-red-400',
    deltaPositive: 'text-red-600 dark:text-red-400',
    deltaNegative: 'text-red-600 dark:text-red-400',
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    icon: 'text-yellow-600 dark:text-yellow-400',
    deltaPositive: 'text-yellow-600 dark:text-yellow-400',
    deltaNegative: 'text-yellow-600 dark:text-yellow-400',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    icon: 'text-purple-600 dark:text-purple-400',
    deltaPositive: 'text-purple-600 dark:text-purple-400',
    deltaNegative: 'text-purple-600 dark:text-purple-400',
  },
  cyan: {
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    icon: 'text-cyan-600 dark:text-cyan-400',
    deltaPositive: 'text-cyan-600 dark:text-cyan-400',
    deltaNegative: 'text-cyan-600 dark:text-cyan-400',
  },
}

const defaultSparklineData = [10, 20, 15, 25, 20, 30, 25, 35, 30, 40, 35, 45]

function CountUpNumber({
  value,
  duration = 1.5,
}: {
  value: number
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    // Don't animate if value hasn't changed significantly
    if (Math.abs(displayValue - value) < 0.01) {
      setDisplayValue(value)
      return
    }

    const startValue = displayValue
    const endValue = value
    const startTime = Date.now()
    let animationFrameId: number | null = null

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      const current = startValue + (endValue - startValue) * eased
      setDisplayValue(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setDisplayValue(endValue)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  // Format number with appropriate decimal places
  const formatValue = (val: number) => {
    if (val % 1 === 0) {
      return Math.round(val).toLocaleString()
    }
    return val.toFixed(1).toLocaleString()
  }

  return <>{formatValue(displayValue)}</>
}

function Sparkline({
  data = defaultSparklineData,
  color = '#3b82f6',
}: {
  data?: number[]
  color?: string
}) {
  const width = 120
  const height = 30
  const padding = 4
  
  // Generate unique ID for gradient to avoid conflicts (memoized)
  const gradientId = useMemo(
    () => `gradient-${color.replace('#', '')}-${Math.random().toString(36).substr(2, 9)}`,
    [color]
  )

  // Normalize data to fit within the chart area
  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2)
    const y =
      height -
      padding -
      ((value - minValue) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const pathData = `M ${points.join(' L ')}`

  return (
    <div className="flex items-center justify-end mt-1">
      <svg
        width={width}
        height={height}
        className="overflow-visible"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path
          d={`${pathData} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`}
          fill={`url(#${gradientId})`}
        />
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function MetricCard({
  title,
  value,
  unit,
  delta,
  statusColor = 'blue',
  icon,
  sparkline,
  className = '',
}: MetricCardProps) {
  const colors = statusColorClasses[statusColor]
  const isPositive = delta !== undefined && delta >= 0
  const sparklineColor =
    sparkline?.color || (isPositive ? '#10b981' : '#ef4444')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all duration-200 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        {icon && (
          <div className={`p-2 rounded-lg ${colors.bg}`}>{icon}</div>
        )}
        {delta !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              isPositive ? colors.deltaPositive : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div className="space-y-0.5 mb-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <div className="flex items-baseline gap-1.5">
          <motion.p
            key={value}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            <CountUpNumber value={value} />
            {unit && (
              <span className="text-lg font-normal text-gray-500 dark:text-gray-400 ml-1">
                {unit}
              </span>
            )}
          </motion.p>
        </div>
      </div>

      {/* Sparkline */}
      {sparkline && (
        <Sparkline
          data={sparkline.data || defaultSparklineData}
          color={sparklineColor}
        />
      )}
    </motion.div>
  )
}

