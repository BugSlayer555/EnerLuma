import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Mon', usage: 4 },
  { day: 'Tue', usage: 3 },
  { day: 'Wed', usage: 5 },
  { day: 'Thu', usage: 4 },
  { day: 'Fri', usage: 6 },
  { day: 'Sat', usage: 7 },
  { day: 'Sun', usage: 5 },
]

export default function EnergyChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="usage" stroke="#8884d8" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}

