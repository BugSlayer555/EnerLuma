import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu, Zap, Droplets,
  Thermometer, LightbulbIcon, Plug, Plus,
  Search, LayoutGrid, List, ChevronRight, X,
} from 'lucide-react'

const defaultDevices = [
  { id: 1, slug: 'hvac', name: 'Smart Thermostat', room: 'Living Room', type: 'HVAC', icon: Thermometer, status: 'online', consumption: '1.2 kWh', lastSeen: 'Now', signal: 92 },
  { id: 2, slug: 'refrigerator', name: 'Refrigerator', room: 'Kitchen', type: 'Appliance', icon: Plug, status: 'online', consumption: '1.8 kWh', lastSeen: 'Now', signal: 95 },
  { id: 3, slug: 'water-heater', name: 'Water Heater', room: 'Bathroom', type: 'Water', icon: Droplets, status: 'online', consumption: '2.1 kWh', lastSeen: 'Now', signal: 88 },
  { id: 4, slug: 'ev-charger', name: 'EV Charger', room: 'Garage', type: 'Charging', icon: Zap, status: 'online', consumption: '6.5 kWh', lastSeen: 'Now', signal: 90 },
  { id: 5, slug: 'washing-machine', name: 'Washing Machine', room: 'Utility', type: 'Appliance', icon: Plug, status: 'online', consumption: '0.8 kWh', lastSeen: 'Now', signal: 90 },
  { id: 6, slug: 'shower', name: 'Shower System', room: 'Master Bath', type: 'Water', icon: Droplets, status: 'online', consumption: '85 L', lastSeen: 'Now', signal: 85 },
  { id: 7, slug: 'led-strip', name: 'LED Strip', room: 'Living Room', type: 'Lighting', icon: LightbulbIcon, status: 'online', consumption: '0.3 kWh', lastSeen: 'Now', signal: 85 },
  { id: 8, slug: 'dishwasher', name: 'Dishwasher', room: 'Kitchen', type: 'Appliance', icon: Droplets, status: 'idle', consumption: '0.0 kWh', lastSeen: '2h ago', signal: 78 },
  { id: 9, slug: 'bedroom-ac', name: 'Bedroom AC', room: 'Bedroom', type: 'HVAC', icon: Thermometer, status: 'offline', consumption: '—', lastSeen: '5h ago', signal: 0 },
  { id: 10, slug: 'smart-plug-1', name: 'Smart Plug #1', room: 'Bedroom', type: 'Plug', icon: Plug, status: 'online', consumption: '0.1 kWh', lastSeen: 'Now', signal: 72 },
  { id: 11, slug: 'garden-sprinkler', name: 'Garden Sprinkler', room: 'Outdoor', type: 'Water', icon: Droplets, status: 'idle', consumption: '0.0 kWh', lastSeen: '1d ago', signal: 65 },
  { id: 12, slug: 'smart-meter', name: 'Smart Meter', room: 'Utility', type: 'Sensor', icon: Zap, status: 'online', consumption: '—', lastSeen: 'Now', signal: 98 },
]

const statusStyles = {
  online: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  offline: { bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400' },
  idle: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400' },
}

const typeOptions = ['HVAC', 'Appliance', 'Water', 'Lighting', 'Charging', 'Plug', 'Sensor']

const iconMap = {
  HVAC: Thermometer,
  Appliance: Plug,
  Water: Droplets,
  Lighting: LightbulbIcon,
  Charging: Zap,
  Plug: Plug,
  Sensor: Zap,
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function DevicesPage() {
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [devices, setDevices] = useState(defaultDevices)
  const [showModal, setShowModal] = useState(false)
  const [newDevice, setNewDevice] = useState({ name: '', room: '', type: 'Appliance' })

  const filtered = devices.filter(d => {
    if (filter === 'online' && d.status !== 'online') return false
    if (filter === 'offline' && d.status !== 'offline') return false
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.room.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const rooms = filtered.reduce((acc, d) => {
    if (!acc[d.room]) acc[d.room] = []
    acc[d.room].push(d)
    return acc
  }, {})

  const online = devices.filter(d => d.status === 'online').length

  const handleAddDevice = () => {
    if (!newDevice.name.trim() || !newDevice.room.trim()) return
    const slug = newDevice.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const device = {
      id: devices.length + 1,
      slug,
      name: newDevice.name.trim(),
      room: newDevice.room.trim(),
      type: newDevice.type,
      icon: iconMap[newDevice.type] || Plug,
      status: 'online',
      consumption: '0.0 kWh',
      lastSeen: 'Now',
      signal: 80,
    }
    setDevices(prev => [...prev, device])
    setNewDevice({ name: '', room: '', type: 'Appliance' })
    setShowModal(false)
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-12 pb-10">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary-500" /> Devices
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">{online} of {devices.length} devices online</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 22px', fontSize: 13, fontWeight: 600,
            background: 'linear-gradient(135deg, #0f766e, #14b8a6)', border: 'none', borderRadius: 12,
            color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(20,184,166,0.3)',
            transition: 'all 0.15s',
          }}
        >
          <Plus className="w-4 h-4" /> Add Device
        </button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl border border-gray-200 w-full sm:w-auto">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search devices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl">
          {['all', 'online', 'offline'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${filter === f ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setView('grid')} className={`p-2 rounded-lg ${view === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}>
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button onClick={() => setView('list')} className={`p-2 rounded-lg ${view === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400'}`}>
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Device Cards by Room */}
      {Object.entries(rooms).map(([room, devs]) => (
        <motion.div key={room} variants={fadeUp}>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide" style={{ marginBottom: 16 }}>{room}</h2>
          <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5' : 'space-y-3'}>
            {devs.map(device => (
              <DeviceCard key={device.id} device={device} view={view} />
            ))}
          </div>
        </motion.div>
      ))}

      {/* Add Device Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
            }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: '#fff',
                borderRadius: 24,
                width: '100%',
                maxWidth: 520,
                boxShadow: '0 32px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)',
                overflow: 'hidden',
              }}
            >
              {/* Premium Header with gradient */}
              <div style={{
                background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
                padding: '32px 36px 28px',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Decorative circles */}
                <div style={{
                  position: 'absolute', top: -30, right: -30, width: 100, height: 100,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.08)',
                }} />
                <div style={{
                  position: 'absolute', bottom: -20, right: 60, width: 60, height: 60,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Plus style={{ width: 20, height: 20, color: '#fff' }} />
                      </div>
                      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0 }}>Add New Device</h2>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                      Connect a new smart device to your dashboard
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      width: 32, height: 32, borderRadius: 8, border: 'none',
                      background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#fff', transition: 'all 0.15s',
                    }}
                  >
                    <X style={{ width: 16, height: 16 }} />
                  </button>
                </div>
              </div>

              {/* Form Body */}
              <div style={{ padding: '28px 36px 36px' }}>
                {/* Device Type Selector */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>
                    Device Type
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                    {typeOptions.map(t => {
                      const TypeIcon = iconMap[t] || Plug
                      const isSelected = newDevice.type === t
                      return (
                        <button
                          key={t}
                          onClick={() => setNewDevice(prev => ({ ...prev, type: t }))}
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                            padding: '14px 4px', borderRadius: 14,
                            border: isSelected ? '2px solid #14b8a6' : '1.5px solid #e5e7eb',
                            background: isSelected ? '#f0fdfa' : '#fff',
                            cursor: 'pointer', transition: 'all 0.2s',
                          }}
                        >
                          <TypeIcon style={{
                            width: 20, height: 20,
                            color: isSelected ? '#0f766e' : '#9ca3af',
                            transition: 'color 0.2s',
                          }} />
                          <span style={{
                            fontSize: 10, fontWeight: 600,
                            color: isSelected ? '#0f766e' : '#9ca3af',
                            transition: 'color 0.2s',
                          }}>{t}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Device Name */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
                    Device Name
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '0 16px', background: '#f9fafb', border: '1.5px solid #e5e7eb',
                    borderRadius: 14, transition: 'border-color 0.15s',
                  }}>
                    <Cpu style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} />
                    <input
                      type="text"
                      placeholder="e.g. Smart Thermostat"
                      value={newDevice.name}
                      onChange={e => setNewDevice(prev => ({ ...prev, name: e.target.value }))}
                      style={{
                        width: '100%', padding: '13px 0', fontSize: 14, border: 'none',
                        outline: 'none', color: '#1f2937', background: 'transparent',
                      }}
                    />
                  </div>
                </div>

                {/* Room / Location */}
                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6b7280', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 10 }}>
                    Room / Location
                  </label>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '0 16px', background: '#f9fafb', border: '1.5px solid #e5e7eb',
                    borderRadius: 14, transition: 'border-color 0.15s',
                  }}>
                    <LayoutGrid style={{ width: 16, height: 16, color: '#9ca3af', flexShrink: 0 }} />
                    <input
                      type="text"
                      placeholder="e.g. Living Room"
                      value={newDevice.room}
                      onChange={e => setNewDevice(prev => ({ ...prev, room: e.target.value }))}
                      style={{
                        width: '100%', padding: '13px 0', fontSize: 14, border: 'none',
                        outline: 'none', color: '#1f2937', background: 'transparent',
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => setShowModal(false)}
                    style={{
                      flex: 1, padding: '13px 0', fontSize: 14, fontWeight: 600, color: '#64748b',
                      background: '#f1f5f9', border: 'none', borderRadius: 14, cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddDevice}
                    disabled={!newDevice.name.trim() || !newDevice.room.trim()}
                    style={{
                      flex: 1.5, padding: '13px 0', fontSize: 14, fontWeight: 600, color: '#fff',
                      background: (!newDevice.name.trim() || !newDevice.room.trim()) ? '#d1d5db' : 'linear-gradient(135deg, #0f766e, #14b8a6)',
                      border: 'none', borderRadius: 14,
                      cursor: (!newDevice.name.trim() || !newDevice.room.trim()) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: (!newDevice.name.trim() || !newDevice.room.trim()) ? 'none' : '0 4px 14px rgba(20,184,166,0.35)',
                      letterSpacing: 0.3,
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                      <Plus style={{ width: 16, height: 16 }} /> Add Device
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function DeviceCard({ device, view }) {
  const style = statusStyles[device.status]
  const Icon = device.icon

  if (view === 'list') {
    return (
      <Link to={`/dashboard/devices/${device.slug}`}>
        <motion.div
          whileHover={{ x: 4 }}
          className="flex items-center bg-white rounded-2xl border border-gray-100 shadow-card cursor-pointer group"
          style={{ padding: 20, gap: 20 }}
        >
          <div className={`p-2.5 rounded-xl ${style.bg}`}><Icon className={`w-5 h-5 ${style.text}`} /></div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800">{device.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{device.room}</p>
          </div>
          <span className="text-sm font-medium text-gray-700">{device.consumption}</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${style.dot}`} />
            <span className={`text-xs font-medium capitalize ${style.text}`}>{device.status}</span>
          </div>
          <SignalBars signal={device.signal} />
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
        </motion.div>
      </Link>
    )
  }

  return (
    <Link to={`/dashboard/devices/${device.slug}`}>
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-card cursor-pointer group transition-shadow hover:shadow-card-hover"
        style={{ padding: 24 }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
          <div className={`p-2.5 rounded-xl ${style.bg}`}><Icon className={`w-5 h-5 ${style.text}`} /></div>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${style.dot}`} />
            <span className={`text-[10px] font-medium capitalize ${style.text}`}>{device.status}</span>
          </div>
        </div>
        <p className="text-sm font-semibold text-gray-800">{device.name}</p>
        <p className="text-xs text-gray-400 mt-1">{device.type}</p>
        <div className="flex items-center justify-between" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
          <span className="text-sm font-bold text-gray-700">{device.consumption}</span>
          <SignalBars signal={device.signal} />
        </div>
      </motion.div>
    </Link>
  )
}

function SignalBars({ signal }) {
  const bars = 4
  const active = signal > 0 ? Math.ceil((signal / 100) * bars) : 0
  return (
    <div className="flex items-end gap-[2px]" title={`${signal}% signal`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm ${i < active ? 'bg-primary-400' : 'bg-gray-200'}`}
          style={{ height: `${6 + i * 3}px` }}
        />
      ))}
    </div>
  )
}
