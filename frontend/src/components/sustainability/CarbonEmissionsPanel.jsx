import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', co2: 18.2 }, { month: 'Feb', co2: 16.8 }, { month: 'Mar', co2: 15.5 },
  { month: 'Apr', co2: 14.2 }, { month: 'May', co2: 13.8 }, { month: 'Jun', co2: 14.6 },
]

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function CarbonEmissionsPanel() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="section-title">Carbon Emissions Estimate</h2>
          <p className="text-xs text-gray-400 mt-1">Monthly CO₂ footprint from energy consumption (GHG Protocol Scope 2)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">14.6 kg</p>
            <p className="text-[10px] text-emerald-500 font-semibold">↓ 19.8% vs baseline</p>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" kg" />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
          <Area type="monotone" dataKey="co2" stroke="#10b981" strokeWidth={2.5} fill="url(#co2Grad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
