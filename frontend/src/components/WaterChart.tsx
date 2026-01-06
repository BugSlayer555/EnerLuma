import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Mon', litres: 30 },
  { day: 'Tue', litres: 45 },
  { day: 'Wed', litres: 40 },
  { day: 'Thu', litres: 55 },
  { day: 'Fri', litres: 35 },
  { day: 'Sat', litres: 50 },
  { day: 'Sun', litres: 60 },
]

export default function WaterChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="litres" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

