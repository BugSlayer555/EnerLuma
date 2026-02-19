import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Cpu, Wifi, WifiOff, Power, Zap, Droplets,
    Thermometer, LightbulbIcon, Plug, Plus,
    Search, LayoutGrid, List, ChevronRight,
} from 'lucide-react'

interface Device {
    id: number
    name: string
    room: string
    type: string
    icon: React.ElementType
    status: 'online' | 'offline' | 'idle'
    consumption: string
    lastSeen: string
    signal: number
}

const devices: Device[] = [
    { id: 1, name: 'Smart Thermostat', room: 'Living Room', type: 'HVAC', icon: Thermometer, status: 'online', consumption: '1.2 kWh', lastSeen: 'Now', signal: 92 },
    { id: 2, name: 'LED Strip', room: 'Living Room', type: 'Lighting', icon: LightbulbIcon, status: 'online', consumption: '0.3 kWh', lastSeen: 'Now', signal: 85 },
    { id: 3, name: 'Refrigerator', room: 'Kitchen', type: 'Appliance', icon: Plug, status: 'online', consumption: '1.8 kWh', lastSeen: 'Now', signal: 95 },
    { id: 4, name: 'Dishwasher', room: 'Kitchen', type: 'Appliance', icon: Droplets, status: 'idle', consumption: '0.0 kWh', lastSeen: '2h ago', signal: 78 },
    { id: 5, name: 'Water Heater', room: 'Bathroom', type: 'Water', icon: Droplets, status: 'online', consumption: '2.1 kWh', lastSeen: 'Now', signal: 88 },
    { id: 6, name: 'Bedroom AC', room: 'Bedroom', type: 'HVAC', icon: Thermometer, status: 'offline', consumption: '—', lastSeen: '5h ago', signal: 0 },
    { id: 7, name: 'Smart Plug #1', room: 'Bedroom', type: 'Plug', icon: Plug, status: 'online', consumption: '0.1 kWh', lastSeen: 'Now', signal: 72 },
    { id: 8, name: 'Garden Sprinkler', room: 'Outdoor', type: 'Water', icon: Droplets, status: 'idle', consumption: '0.0 kWh', lastSeen: '1d ago', signal: 65 },
    { id: 9, name: 'Washing Machine', room: 'Utility', type: 'Appliance', icon: Plug, status: 'online', consumption: '0.8 kWh', lastSeen: 'Now', signal: 90 },
    { id: 10, name: 'Porch Light', room: 'Outdoor', type: 'Lighting', icon: LightbulbIcon, status: 'online', consumption: '0.1 kWh', lastSeen: 'Now', signal: 80 },
    { id: 11, name: 'Study Lamp', room: 'Study', type: 'Lighting', icon: LightbulbIcon, status: 'offline', consumption: '—', lastSeen: '3h ago', signal: 0 },
    { id: 12, name: 'Smart Meter', room: 'Utility', type: 'Sensor', icon: Zap, status: 'online', consumption: '—', lastSeen: 'Now', signal: 98 },
]

const statusStyles = {
    online: { bg: 'bg-emerald-50', text: 'text-emerald-600', dot: 'bg-emerald-500' },
    offline: { bg: 'bg-red-50', text: 'text-red-500', dot: 'bg-red-400' },
    idle: { bg: 'bg-amber-50', text: 'text-amber-600', dot: 'bg-amber-400' },
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function DevicesPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid')
    const [filter, setFilter] = useState<'all' | 'online' | 'offline'>('all')
    const [search, setSearch] = useState('')

    const filtered = devices.filter(d => {
        if (filter === 'online' && d.status !== 'online') return false
        if (filter === 'offline' && d.status !== 'offline') return false
        if (search && !d.name.toLowerCase().includes(search.toLowerCase()) && !d.room.toLowerCase().includes(search.toLowerCase())) return false
        return true
    })

    // Group by room
    const rooms = filtered.reduce((acc, d) => {
        if (!acc[d.room]) acc[d.room] = []
        acc[d.room].push(d)
        return acc
    }, {} as Record<string, Device[]>)

    const online = devices.filter(d => d.status === 'online').length

    return (
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-6">
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Cpu className="w-6 h-6 text-primary-500" /> Devices
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">{online} of {devices.length} devices online</p>
                </div>
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                    <Plus className="w-4 h-4" /> Add Device
                </button>
            </motion.div>

            {/* Filters */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-xl border border-gray-200 w-full sm:w-auto">
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
                    {(['all', 'online', 'offline'] as const).map(f => (
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
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">{room}</h2>
                    <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'space-y-2'}>
                        {devs.map(device => (
                            <DeviceCard key={device.id} device={device} view={view} />
                        ))}
                    </div>
                </motion.div>
            ))}
        </motion.div>
    )
}

function DeviceCard({ device, view }: { device: Device; view: 'grid' | 'list' }) {
    const style = statusStyles[device.status]
    const Icon = device.icon

    if (view === 'list') {
        return (
            <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-card cursor-pointer group"
            >
                <div className={`p-2 rounded-xl ${style.bg}`}><Icon className={`w-5 h-5 ${style.text}`} /></div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{device.name}</p>
                    <p className="text-xs text-gray-400">{device.room}</p>
                </div>
                <span className="text-sm font-medium text-gray-700">{device.consumption}</span>
                <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                    <span className={`text-xs font-medium capitalize ${style.text}`}>{device.status}</span>
                </div>
                <SignalBars signal={device.signal} />
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-500 transition-colors" />
            </motion.div>
        )
    }

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-card cursor-pointer group transition-shadow hover:shadow-card-hover"
        >
            <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl ${style.bg}`}><Icon className={`w-5 h-5 ${style.text}`} /></div>
                <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                    <span className={`text-[10px] font-medium capitalize ${style.text}`}>{device.status}</span>
                </div>
            </div>
            <p className="text-sm font-semibold text-gray-800">{device.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{device.type}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-700">{device.consumption}</span>
                <SignalBars signal={device.signal} />
            </div>
        </motion.div>
    )
}

function SignalBars({ signal }: { signal: number }) {
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
