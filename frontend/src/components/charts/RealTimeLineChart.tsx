import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

export interface RealTimeLineChartProps {
  data?: Array<{
    time: string
    energy?: number
    water?: number
    power?: number
    flowRate?: number
  }>
  dataKeys?: string[]
  colors?: string[]
  showGrid?: boolean
  showLegend?: boolean
  height?: number
  className?: string
}

// Generate sample real-time data
const generateSampleData = () => {
  const now = new Date()
  const data = []
  
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }),
      energy: Math.random() * 3 + 2,
      power: Math.random() * 2 + 1,
      water: Math.random() * 50 + 20,
      flowRate: Math.random() * 0.5,
    })
  }
  
  return data
}

const defaultData = generateSampleData()

export default function RealTimeLineChart({
  data = defaultData,
  dataKeys = ['energy', 'power'],
  colors = ['#3b82f6', '#10b981'],
  showGrid = true,
  showLegend = true,
  height = 300,
  className = '',
}: RealTimeLineChartProps) {
  const dataKeyLabels: Record<string, string> = {
    energy: 'Energy (kWh)',
    power: 'Power (kW)',
    water: 'Water (L)',
    flowRate: 'Flow Rate (L/min)',
  }

  const chartColors = {
    energy: '#3b82f6',
    power: '#10b981',
    water: '#06b6d4',
    flowRate: '#8b5cf6',
  }

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
          )}
          <XAxis
            dataKey="time"
            className="text-xs fill-gray-500 dark:fill-gray-400"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            className="text-xs fill-gray-500 dark:fill-gray-400"
            tick={{ fontSize: 12 }}
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
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
          )}
          {dataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={chartColors[key as keyof typeof chartColors] || colors[index]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: chartColors[key as keyof typeof chartColors] || colors[index] }}
              name={dataKeyLabels[key] || key}
            />
          ))}
          <ReferenceLine
            y={0}
            stroke="#e5e7eb"
            strokeDasharray="2 2"
            className="dark:stroke-gray-700"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

