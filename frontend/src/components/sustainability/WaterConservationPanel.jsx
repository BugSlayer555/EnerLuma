import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', saved: 280 }, { month: 'Feb', saved: 320 }, { month: 'Mar', saved: 350 },
  { month: 'Apr', saved: 310 }, { month: 'May', saved: 290 }, { month: 'Jun', saved: 300 },
]

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function WaterConservationPanel() {
  return (
    <motion.div variants={fadeUp} className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="section-title">Water Conservation Impact</h2>
          <p className="text-xs text-gray-400 mt-1">Monthly water savings from smart scheduling &amp; leak prevention</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">1,850 L</p>
          <p className="text-[10px] text-cyan-500 font-semibold">↑ 18% vs baseline</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit=" L" />
          <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
          <Bar dataKey="saved" fill="#06b6d4" radius={[6, 6, 0, 0]} barSize={36} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
