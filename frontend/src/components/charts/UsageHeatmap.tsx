import { useMemo } from 'react'
import { Cell } from 'recharts'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

export interface HeatmapData {
  day: string
  hour: number | string
  value: number
}

export interface UsageHeatmapProps {
  data?: HeatmapData[]
  days?: string[]
  hours?: (number | string)[]
  valueLabel?: string
  height?: number
  className?: string
  colorRange?: {
    min: string
    max: string
  }
}

// Generate sample heatmap data (7 days x 24 hours)
const generateSampleData = (): HeatmapData[] => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const data: HeatmapData[] = []
  
  days.forEach((day) => {
    for (let hour = 0; hour < 24; hour++) {
      // Simulate higher usage during peak hours (6-9 AM, 6-10 PM)
      let value = Math.random() * 50
      if ((hour >= 6 && hour <= 9) || (hour >= 18 && hour <= 22)) {
        value += Math.random() * 50 + 30
      }
      // Lower usage during night (11 PM - 5 AM)
      if (hour >= 23 || hour <= 5) {
        value = Math.random() * 20
      }
      
      data.push({
        day,
        hour: hour.toString().padStart(2, '0') + ':00',
        value: Math.round(value),
      })
    }
  })
  
  return data
}

// Get color based on value intensity
const getColor = (
  value: number,
  min: number,
  max: number,
  colorRange: { min: string; max: string }
): string => {
  if (max === min) return colorRange.min
  
  const intensity = (value - min) / (max - min)
  
  // Interpolate between min and max colors
  const hex1 = colorRange.min.replace('#', '')
  const hex2 = colorRange.max.replace('#', '')
  
  const r1 = parseInt(hex1.substring(0, 2), 16)
  const g1 = parseInt(hex1.substring(2, 4), 16)
  const b1 = parseInt(hex1.substring(4, 6), 16)
  
  const r2 = parseInt(hex2.substring(0, 2), 16)
  const g2 = parseInt(hex2.substring(2, 4), 16)
  const b2 = parseInt(hex2.substring(4, 6), 16)
  
  const r = Math.round(r1 + (r2 - r1) * intensity)
  const g = Math.round(g1 + (g2 - g1) * intensity)
  const b = Math.round(b1 + (b2 - b1) * intensity)
  
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`
}

// Transform data for heatmap visualization
const transformDataForHeatmap = (
  data: HeatmapData[],
  days: string[],
  hours: (number | string)[]
) => {
  const transformed: Array<{
    day: string
    [key: string]: number | string
  }> = []

  days.forEach((day) => {
    const dayData: { day: string; [key: string]: number | string } = { day }
    hours.forEach((hour) => {
      const hourStr = typeof hour === 'number' ? hour.toString().padStart(2, '0') + ':00' : hour
      const entry = data.find((d) => d.day === day && d.hour === hourStr)
      dayData[hourStr] = entry?.value || 0
    })
    transformed.push(dayData)
  })

  return transformed
}

export default function UsageHeatmap({
  data = generateSampleData(),
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0') + ':00'),
  valueLabel = 'Usage',
  height = 400,
  className = '',
  colorRange = {
    min: '#ebedf0',
    max: '#216e39',
  },
}: UsageHeatmapProps) {
  // Calculate min/max for color scaling
  const { min, max } = useMemo(() => {
    const values = data.map((d) => d.value)
    return {
      min: Math.min(...values, 0),
      max: Math.max(...values, 1),
    }
  }, [data])

  // Transform data for grouped bar chart
  const chartData = useMemo(
    () => transformDataForHeatmap(data, days, hours),
    [data, days, hours]
  )


  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <XAxis
            dataKey="day"
            className="text-xs fill-gray-500 dark:fill-gray-400"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            className="text-xs fill-gray-500 dark:fill-gray-400"
            tick={{ fontSize: 12 }}
            label={{ value: valueLabel, angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}
            labelStyle={{ color: '#374151', fontWeight: '600' }}
            itemStyle={{ color: '#6b7280' }}
            formatter={(value: number, name: string) => [
              `${value} ${valueLabel}`,
              name,
            ]}
          />
          <Legend />
          {hours.map((hour) => (
            <Bar
              key={hour.toString()}
              dataKey={hour.toString()}
              stackId="a"
              fill="#8884d8"
            >
              {chartData.map((entry, index) => {
                const value = entry[hour.toString()] as number
                const color = getColor(value, min, max, colorRange)
                return <Cell key={`cell-${index}`} fill={color} />
              })}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
      
      {/* Color scale legend */}
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 10 }, (_, i) => {
            const intensity = i / 9
            const color = getColor(intensity * max, 0, max, colorRange)
            return (
              <div
                key={i}
                className="w-4 h-3 rounded"
                style={{ backgroundColor: color }}
              />
            )
          })}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

