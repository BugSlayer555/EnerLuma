import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const data = [
  { month: 'Jan', thisYear: 480, lastYear: 540 },
  { month: 'Feb', thisYear: 440, lastYear: 510 },
  { month: 'Mar', thisYear: 460, lastYear: 520 },
  { month: 'Apr', thisYear: 420, lastYear: 500 },
  { month: 'May', thisYear: 400, lastYear: 490 },
  { month: 'Jun', thisYear: 430, lastYear: 480 },
]

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function YearOverYearComparison() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="section-title">Year-over-Year Comparison</h2>
          <p className="text-xs text-gray-400 mt-1">Energy consumption comparison with previous year</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary-500" /> This Year</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-gray-300" /> Last Year</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kWh" />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
          <Bar dataKey="lastYear" fill="#d1d5db" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="thisYear" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
