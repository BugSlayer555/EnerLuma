import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export default function DeviceMainChart({ realTime, historical, costEstimate, carbonImpact, unit }) {
  return (
    <div className="card-static" style={{ padding: '36px 40px' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
        <div>
          <h2 className="section-title">Consumption Profile</h2>
          <p className="text-xs text-gray-400 mt-1">Hourly usage today · Current draw: {realTime.currentDraw} kW</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-right">
            <p className="text-xs text-gray-500">Today</p>
            <p className="font-bold text-gray-900">{realTime.todayTotal} {unit}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Est. Cost</p>
            <p className="font-bold text-gray-900">₹{costEstimate.daily}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">CO₂</p>
            <p className="font-bold text-gray-900">{carbonImpact.daily} kg</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={realTime.todayHourly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="deviceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} interval={3} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit={` ${unit}`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2.5} fill="url(#deviceGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-3">Weekly Average</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={historical.daily} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', fontSize: 12 }} />
              <Bar dataKey="value" fill="#14b8a6" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
