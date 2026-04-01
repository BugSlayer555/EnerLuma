import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', savings: 1200 }, { month: 'Feb', savings: 1380 }, { month: 'Mar', savings: 1450 },
  { month: 'Apr', savings: 1520 }, { month: 'May', savings: 1580 }, { month: 'Jun', savings: 1580 },
]

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function CostSavingsTimeline() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="section-title">Cost Savings Over Time</h2>
          <p className="text-xs text-gray-400 mt-1">Cumulative savings from efficiency optimizations</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">₹8,710</p>
          <p className="text-[10px] text-emerald-500 font-semibold">Total saved this half</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" ₹" />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
          <Area type="monotone" dataKey="savings" stroke="#f59e0b" strokeWidth={2.5} fill="url(#costGrad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
