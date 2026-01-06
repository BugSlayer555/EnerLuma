import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'

export interface ApplianceData {
  name: string
  energy: number
  water?: number
  cost?: number
  color?: string
}

export interface ApplianceCompareChartProps {
  data?: ApplianceData[]
  type?: 'energy' | 'water' | 'cost' | 'all'
  showGrid?: boolean
  showLegend?: boolean
  height?: number
  className?: string
  stackId?: string
}

// Sample appliance data
const defaultApplianceData: ApplianceData[] = [
  {
    name: 'HVAC',
    energy: 2.5,
    water: 0,
    cost: 0.38,
    color: '#ef4444',
  },
  {
    name: 'Refrigerator',
    energy: 1.8,
    water: 0,
    cost: 0.27,
    color: '#3b82f6',
  },
  {
    name: 'Washing Machine',
    energy: 1.2,
    water: 45,
    cost: 0.22,
    color: '#10b981',
  },
  {
    name: 'Dishwasher',
    energy: 1.0,
    water: 30,
    cost: 0.18,
    color: '#f59e0b',
  },
  {
    name: 'TV',
    energy: 0.5,
    water: 0,
    cost: 0.08,
    color: '#8b5cf6',
  },
  {
    name: 'Lighting',
    energy: 0.4,
    water: 0,
    cost: 0.06,
    color: '#ec4899',
  },
  {
    name: 'Others',
    energy: 0.8,
    water: 15,
    cost: 0.14,
    color: '#6b7280',
  },
]

export default function ApplianceCompareChart({
  data = defaultApplianceData,
  type = 'energy',
  showGrid = true,
  showLegend = true,
  height = 350,
  className = '',
  stackId,
}: ApplianceCompareChartProps) {
  const colors = data.map((item) => item.color || '#3b82f6')

  const renderBars = () => {
    if (type === 'all') {
      return (
        <>
          <Bar dataKey="energy" name="Energy (kWh)" stackId={stackId || 'a'} fill="#3b82f6">
            {data.map((entry, index) => (
              <Cell key={`cell-energy-${index}`} fill={entry.color || colors[index]} />
            ))}
          </Bar>
          {data.some((item) => item.water && item.water > 0) && (
            <Bar dataKey="water" name="Water (L)" stackId={stackId || 'b'} fill="#06b6d4">
              {data.map((entry, index) => (
                <Cell key={`cell-water-${index}`} fill={entry.color || colors[index]} />
              ))}
            </Bar>
          )}
        </>
      )
    }

    if (type === 'energy') {
      return (
        <Bar dataKey="energy" name="Energy (kWh)" fill="#3b82f6">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || colors[index]} />
          ))}
        </Bar>
      )
    }

    if (type === 'water') {
      return (
        <Bar dataKey="water" name="Water (L)" fill="#06b6d4">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || colors[index]} />
          ))}
        </Bar>
      )
    }

    if (type === 'cost') {
      return (
        <Bar dataKey="cost" name="Cost ($)" fill="#10b981">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || colors[index]} />
          ))}
        </Bar>
      )
    }

    return null
  }

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-gray-200 dark:stroke-gray-700"
            />
          )}
          <XAxis
            dataKey="name"
            className="text-xs fill-gray-500 dark:fill-gray-400"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
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
              iconType="rect"
            />
          )}
          {renderBars()}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

