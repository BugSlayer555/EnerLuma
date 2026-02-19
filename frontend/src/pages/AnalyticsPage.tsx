import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BarChart3, TrendingUp, Zap, Droplets, DollarSign,
    Download, FileText, Filter, Eye, EyeOff,
    Activity, AlertTriangle, Clock,
} from 'lucide-react'
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Bar, ComposedChart, Line,
    ScatterChart, Scatter, ZAxis, ReferenceDot, Cell,
} from 'recharts'

/* ═══════════════════════════════════════════════════════════════
   TIMEFRAME-AWARE DATA SETS
   ═══════════════════════════════════════════════════════════════ */
type Timeframe = 'daily' | 'weekly' | 'monthly' | 'yearly'

const trendDataSets: Record<Timeframe, any[]> = {
    daily: [
        { label: '12 AM', actual: 0.8, forecast: 0.9, upper: 1.1, lower: 0.7, historical: 1.0 },
        { label: '3 AM', actual: 0.4, forecast: 0.5, upper: 0.7, lower: 0.3, historical: 0.6 },
        { label: '6 AM', actual: 1.2, forecast: 1.0, upper: 1.3, lower: 0.7, historical: 1.1 },
        { label: '9 AM', actual: 2.4, forecast: 2.2, upper: 2.6, lower: 1.8, historical: 2.1 },
        { label: '12 PM', actual: 2.6, forecast: 2.6, upper: 3.0, lower: 2.2, historical: 2.7 },
        { label: '2 PM', actual: 3.8, forecast: 2.8, upper: 3.2, lower: 2.4, historical: 2.6, anomaly: true },
        { label: '4 PM', actual: 2.9, forecast: 2.7, upper: 3.1, lower: 2.3, historical: 2.8 },
        { label: '6 PM', actual: 3.5, forecast: 3.0, upper: 3.4, lower: 2.6, historical: 3.2 },
        { label: '9 PM', actual: 2.2, forecast: 2.3, upper: 2.7, lower: 1.9, historical: 2.4 },
        { label: '11 PM', actual: 1.0, forecast: 1.1, upper: 1.4, lower: 0.8, historical: 1.2 },
    ],
    weekly: [
        { label: 'Mon', actual: 18.2, forecast: 17.5, upper: 20.0, lower: 15.0, historical: 19.0 },
        { label: 'Tue', actual: 22.1, forecast: 20.0, upper: 23.0, lower: 17.0, historical: 20.5 },
        { label: 'Wed', actual: 19.8, forecast: 19.5, upper: 22.5, lower: 16.5, historical: 21.0 },
        { label: 'Thu', actual: 28.3, forecast: 21.0, upper: 24.0, lower: 18.0, historical: 22.0, anomaly: true },
        { label: 'Fri', actual: 20.5, forecast: 20.8, upper: 23.8, lower: 17.8, historical: 19.5 },
        { label: 'Sat', actual: 16.1, forecast: 16.5, upper: 19.5, lower: 13.5, historical: 17.0 },
        { label: 'Sun', actual: 14.8, forecast: 15.0, upper: 18.0, lower: 12.0, historical: 15.5 },
    ],
    monthly: [
        { label: 'Jan', actual: 520, forecast: 510, upper: 560, lower: 460, historical: 580 },
        { label: 'Feb', actual: 480, forecast: 470, upper: 520, lower: 420, historical: 540 },
        { label: 'Mar', actual: 510, forecast: 500, upper: 550, lower: 450, historical: 560 },
        { label: 'Apr', actual: 460, forecast: 480, upper: 530, lower: 430, historical: 530 },
        { label: 'May', actual: 440, forecast: 450, upper: 500, lower: 400, historical: 510 },
        { label: 'Jun', actual: 620, forecast: 460, upper: 510, lower: 410, historical: 500, anomaly: true },
    ],
    yearly: [
        { label: '2020', actual: 6200, forecast: 6000, upper: 6600, lower: 5400, historical: 6800 },
        { label: '2021', actual: 5800, forecast: 5700, upper: 6300, lower: 5100, historical: 6200 },
        { label: '2022', actual: 5500, forecast: 5400, upper: 6000, lower: 4800, historical: 5800 },
        { label: '2023', actual: 5100, forecast: 5200, upper: 5800, lower: 4600, historical: 5500 },
        { label: '2024', actual: 4800, forecast: 4900, upper: 5500, lower: 4300, historical: 5100 },
        { label: '2025', actual: 4400, forecast: 4500, upper: 5100, lower: 3900, historical: 4800 },
    ],
}

const kpiSets: Record<Timeframe, { energy: string; water: string; cost: string; eff: string; sub: string }> = {
    daily: { energy: '24.3 kWh', water: '185 L', cost: '₹92', eff: '-12%', sub: 'Today' },
    weekly: { energy: '139 kWh', water: '1,120 L', cost: '₹580', eff: '-8%', sub: 'This week' },
    monthly: { energy: '520 kWh', water: '4,200 L', cost: '₹2,400', eff: '+15%', sub: 'This month' },
    yearly: { energy: '4,800 kWh', water: '42,000 L', cost: '₹24,000', eff: '+18%', sub: 'This year' },
}

/* ─── Appliance heatmap: 6 devices × 24 hours ─── */
const applianceNames = ['HVAC', 'Water Heater', 'Kitchen', 'Lighting', 'Smart Plugs', 'EV Charger']
const applianceHeatmap = [
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 1.0, 1.8, 2.2, 2.5, 2.8, 2.6, 2.4, 2.7, 3.1, 3.0, 2.9, 3.2, 3.5, 3.3, 2.8, 2.2, 1.5, 0.8],
    [0.8, 0.8, 0.8, 0.8, 0.8, 1.2, 1.6, 0.4, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.8, 1.4, 1.6, 1.5, 1.2, 1.0, 0.9],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 1.2, 0.4, 0.1, 0.1, 0.5, 1.8, 0.6, 0.1, 0.1, 0.2, 1.0, 1.6, 2.0, 0.8, 0.2, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.8, 1.2, 1.4, 1.2, 0.8, 0.4, 0.1],
    [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.4, 0.4, 0.3, 0.3, 0.2, 0.2, 0.1, 0.1],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 3.2, 3.4, 3.2, 2.0, 0.0],
]

/* ─── Peak usage radial: 24 hours ─── */
const peakHourData = [0.8, 0.5, 0.3, 0.2, 0.2, 0.4, 1.2, 1.8, 2.1, 2.4, 2.8, 2.6, 2.4, 2.7, 3.1, 3.0, 2.9, 3.2, 3.5, 3.3, 2.8, 2.2, 1.5, 0.8]

/* ─── Cluster scatter ─── */
const clusterData = [
    { consumption: 18.2, cost: 78, type: 'weekday' }, { consumption: 22.1, cost: 95, type: 'weekday' },
    { consumption: 19.8, cost: 85, type: 'weekday' }, { consumption: 24.3, cost: 104, type: 'weekday' },
    { consumption: 20.5, cost: 88, type: 'weekday' }, { consumption: 16.1, cost: 69, type: 'weekend' },
    { consumption: 14.8, cost: 64, type: 'weekend' }, { consumption: 21.0, cost: 90, type: 'weekday' },
    { consumption: 23.5, cost: 101, type: 'weekday' }, { consumption: 15.0, cost: 65, type: 'weekend' },
    { consumption: 13.2, cost: 57, type: 'weekend' }, { consumption: 17.8, cost: 76, type: 'weekday' },
    { consumption: 15.5, cost: 67, type: 'weekend' }, { consumption: 14.0, cost: 60, type: 'weekend' },
]

/* ─── Cost + budget ─── */
const costBreakdown = [
    { name: 'HVAC', cost: 840, pct: 31 }, { name: 'Kitchen', cost: 600, pct: 22 },
    { name: 'Lighting', cost: 480, pct: 18 }, { name: 'Water Heater', cost: 360, pct: 13 },
    { name: 'Smart Plugs', cost: 240, pct: 9 }, { name: 'Water Usage', cost: 180, pct: 7 },
]
const treemapColors = ['#0f766e', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1']

const budgetData = [
    { week: 'W1', actual: 420, budget: 500 }, { week: 'W2', actual: 380, budget: 500 },
    { week: 'W3', actual: 510, budget: 500 }, { week: 'W4', actual: 450, budget: 500 },
]

/* ═══════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════ */
function getHeatColor(v: number) {
    if (v < 0.3) return '#f0fdfa'
    if (v < 0.6) return '#ccfbf1'
    if (v < 1.0) return '#99f6e4'
    if (v < 1.5) return '#5eead4'
    if (v < 2.0) return '#2dd4bf'
    if (v < 2.5) return '#14b8a6'
    if (v < 3.0) return '#0d9488'
    return '#0f766e'
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }
const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null
    return (
        <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 px-4 py-3 z-50"
        >
            <p className="text-xs font-medium text-gray-500 mb-1.5">{label}</p>
            {payload.map((e: any, i: number) => (
                <p key={i} className="text-sm font-semibold flex items-center gap-1.5" style={{ color: e.color }}>
                    <span className="w-2 h-2 rounded-full inline-block" style={{ background: e.color }} />
                    {e.name}: {typeof e.value === 'number' ? e.value.toLocaleString() : e.value}
                </p>
            ))}
        </motion.div>
    )
}

/* ─── 10. CSV Export ─── */
function exportCSV(data: any[], filename: string) {
    if (!data.length) return
    const headers = Object.keys(data[0])
    const csv = [headers.join(','), ...data.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
}

/* ─── 9. PDF Export (native print-to-PDF, no extra deps) ─── */
function exportPDF() {
    const style = document.createElement('style')
    style.textContent = `@media print {
    body * { visibility: hidden; }
    #analytics-page, #analytics-page * { visibility: visible; }
    #analytics-page { position: absolute; left: 0; top: 0; width: 100%; }
    @page { size: landscape; margin: 10mm; }
  }`
    document.head.appendChild(style)
    window.print()
    setTimeout(() => document.head.removeChild(style), 500)
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function AnalyticsPage() {
    const [timeframe, setTimeframe] = useState<Timeframe>('daily')
    const [showHistorical, setShowHistorical] = useState(false)
    const [showConfidence, setShowConfidence] = useState(true)
    const [activeAppliances, setActiveAppliances] = useState<Set<number>>(new Set(applianceNames.map((_, i) => i)))

    const trendData = trendDataSets[timeframe]
    const kpis = kpiSets[timeframe]
    const anomalyPoints = trendData.filter((d: any) => d.anomaly)
    const maxPeak = Math.max(...peakHourData)
    const topPeakHour = peakHourData.indexOf(maxPeak)

    const toggleAppliance = useCallback((idx: number) => {
        setActiveAppliances(prev => {
            const next = new Set(prev)
            if (next.has(idx)) { if (next.size > 1) next.delete(idx) } else next.add(idx)
            return next
        })
    }, [])

    return (
        <motion.div id="analytics-page" variants={stagger} initial="hidden" animate="visible" className="max-w-[1400px] mx-auto space-y-6">

            {/* ═══════════ HEADER + TIMEFRAME TOGGLE + EXPORTS ═══════════ */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <BarChart3 className="w-6 h-6 text-primary-500" /> Advanced Analytics
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">Multi-timeframe consumption analytics, AI forecasts & data exports</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="live-badge">Live</div>
                    {/* 1️⃣ TIMEFRAME TOGGLE */}
                    <div className="flex items-center gap-0.5 p-1 bg-gray-100 rounded-xl">
                        {(['daily', 'weekly', 'monthly', 'yearly'] as Timeframe[]).map(tf => (
                            <button key={tf} onClick={() => setTimeframe(tf)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all ${timeframe === tf ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            >{tf}</button>
                        ))}
                    </div>
                    {/* 9️⃣ PDF */}
                    <button onClick={() => exportPDF()}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors">
                        <FileText className="w-4 h-4" /> PDF
                    </button>
                    {/* 🔟 CSV */}
                    <button onClick={() => exportCSV(trendData, `energy-${timeframe}`)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" /> CSV
                    </button>
                </div>
            </motion.div>

            {/* ═══════════ KPI CARDS (react to timeframe) ═══════════ */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: Zap, label: 'Energy', value: kpis.energy, bg: 'bg-primary-50', color: 'text-primary-600' },
                    { icon: Droplets, label: 'Water', value: kpis.water, bg: 'bg-cyan-50', color: 'text-cyan-600' },
                    { icon: DollarSign, label: 'Cost', value: kpis.cost, bg: 'bg-amber-50', color: 'text-amber-600' },
                    { icon: TrendingUp, label: 'Efficiency', value: kpis.eff, bg: 'bg-emerald-50', color: 'text-emerald-600' },
                ].map(k => (
                    <motion.div key={k.label} whileHover={{ y: -2 }} className="kpi-card">
                        <div className={`p-2 rounded-xl ${k.bg} w-fit`}><k.icon className={`w-5 h-5 ${k.color}`} /></div>
                        <div className="mt-3"><span className="text-2xl font-bold text-gray-900">{k.value}</span></div>
                        <p className="text-xs text-gray-500 mt-0.5">{k.label} · {kpis.sub}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* ═══════════ TREND CHART (6,7,8) + PEAK DIAL (3) ═══════════ */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Main Trend: confidence bands (8), anomaly markers (7), historical overlay (6) */}
                <div className="lg:col-span-2 card-static">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                        <div>
                            <h2 className="section-title">Energy Trend — {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}</h2>
                            <p className="text-xs text-gray-400 mt-0.5">Actual vs Forecast · Confidence bands · Anomaly detection</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowConfidence(!showConfidence)}
                                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${showConfidence ? 'bg-primary-50 text-primary-700 border-primary-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                <Activity className="w-3 h-3" /> Bands
                            </button>
                            <button onClick={() => setShowHistorical(!showHistorical)}
                                className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors ${showHistorical ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                {showHistorical ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />} Historical
                            </button>
                        </div>
                    </div>
                    {/* Legend */}
                    <div className="flex items-center gap-3 mb-3 text-[11px] text-gray-500 flex-wrap">
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary-500 rounded-full" /> Actual</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary-300 rounded-full opacity-60" /> Forecast</span>
                        {showConfidence && <span className="flex items-center gap-1"><span className="w-3 h-2 bg-primary-100 rounded-sm" /> ±σ Band</span>}
                        {showHistorical && <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-amber-400 rounded-full" /> Historical</span>}
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> Anomaly</span>
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.08} />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.03} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip />} />
                            {/* 8️⃣ Confidence bands */}
                            {showConfidence && <>
                                <Area type="monotone" dataKey="upper" stroke="none" fill="url(#bandGrad)" dot={false} activeDot={false} name="Upper Bound" />
                                <Area type="monotone" dataKey="lower" stroke="none" fill="#f0fdfa" dot={false} activeDot={false} name="Lower Bound" />
                            </>}
                            {/* 6️⃣ Historical overlay */}
                            {showHistorical && <Area type="monotone" dataKey="historical" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="6 4" fill="none" dot={false} name="Historical" />}
                            {/* Forecast */}
                            <Area type="monotone" dataKey="forecast" stroke="#99f6e4" strokeWidth={2} strokeDasharray="6 4" fill="none" dot={false} name="Forecast" />
                            {/* Actual */}
                            <Area type="monotone" dataKey="actual" stroke="#14b8a6" strokeWidth={2.5} fill="url(#trendGrad)" dot={false} activeDot={{ r: 4, fill: '#0f766e', strokeWidth: 0 }} name="Actual" />
                            {/* 7️⃣ Anomaly markers */}
                            {anomalyPoints.map((pt: any) => (
                                <ReferenceDot key={pt.label} x={pt.label} y={pt.actual} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* 3️⃣ PEAK USAGE HOUR — 24h Radial Dial */}
                <div className="card-static flex flex-col">
                    <h2 className="section-title">Peak Usage Hours</h2>
                    <p className="text-xs text-gray-400 mt-0.5 mb-4">24-hour consumption intensity dial</p>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                {peakHourData.map((val, h) => {
                                    const angle = (h / 24) * 360 - 90
                                    const rad = (angle * Math.PI) / 180
                                    const r1 = 50, barLen = 30 * (val / maxPeak), r2 = r1 + barLen
                                    return (
                                        <g key={h}>
                                            <line
                                                x1={100 + r1 * Math.cos(rad)} y1={100 + r1 * Math.sin(rad)}
                                                x2={100 + r2 * Math.cos(rad)} y2={100 + r2 * Math.sin(rad)}
                                                stroke={h === topPeakHour ? '#ef4444' : '#14b8a6'}
                                                strokeWidth={5} strokeLinecap="round"
                                                opacity={0.3 + 0.7 * (val / maxPeak)}
                                            />
                                            {h % 6 === 0 && (
                                                <text x={100 + 88 * Math.cos(rad)} y={100 + 88 * Math.sin(rad)}
                                                    textAnchor="middle" dominantBaseline="middle" className="fill-gray-400" fontSize="9">
                                                    {h === 0 ? '12A' : h === 6 ? '6A' : h === 12 ? '12P' : '6P'}
                                                </text>
                                            )}
                                        </g>
                                    )
                                })}
                                <circle cx="100" cy="100" r="40" fill="white" />
                                <text x="100" y="94" textAnchor="middle" className="fill-gray-800 font-bold" fontSize="18">
                                    {topPeakHour > 12 ? topPeakHour - 12 : topPeakHour || 12}
                                </text>
                                <text x="100" y="108" textAnchor="middle" className="fill-gray-400" fontSize="9">
                                    {topPeakHour >= 12 ? 'PM Peak' : 'AM Peak'}
                                </text>
                            </svg>
                        </div>
                    </div>
                    {/* Top 3 peak hours */}
                    <div className="space-y-2 mt-2">
                        {[...peakHourData].map((v, i) => ({ hour: i, val: v })).sort((a, b) => b.val - a.val).slice(0, 3).map((p, rank) => (
                            <div key={p.hour} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${rank === 0 ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>{rank + 1}</span>
                                <span className="text-sm text-gray-700 flex-1">{p.hour === 0 ? '12 AM' : p.hour < 12 ? `${p.hour} AM` : p.hour === 12 ? '12 PM' : `${p.hour - 12} PM`}</span>
                                <span className="text-sm font-bold text-gray-800">{p.val} kW</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* ═══════════ 2️⃣ APPLIANCE COMPARISON HEATMAP ═══════════ */}
            <motion.div variants={fadeUp} className="card-static">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                        <h2 className="section-title">Appliance Comparison Heatmap</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Hourly consumption intensity by appliance (kW)</p>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                        <Filter className="w-3.5 h-3.5 text-gray-400 mr-1" />
                        {applianceNames.map((name, i) => (
                            <button key={name} onClick={() => toggleAppliance(i)}
                                className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-all ${activeAppliances.has(i) ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-400'}`}>
                                {name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-[650px]">
                        <div className="flex items-center gap-0 ml-28">
                            {Array.from({ length: 24 }).map((_, h) => (
                                <div key={h} className="flex-1 text-center text-[8px] text-gray-400">{h}</div>
                            ))}
                        </div>
                        <AnimatePresence>
                            {applianceHeatmap.map((row, di) =>
                                activeAppliances.has(di) && (
                                    <motion.div key={di} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-0 mt-[2px]">
                                        <span className="w-28 text-[11px] text-gray-600 text-right pr-3 flex-shrink-0 font-medium">{applianceNames[di]}</span>
                                        {row.map((val, hi) => (
                                            <div key={hi} className="flex-1 aspect-square rounded-[3px] mx-[1px] transition-all hover:scale-125 hover:z-10 cursor-crosshair"
                                                style={{ backgroundColor: getHeatColor(val) }}
                                                title={`${applianceNames[di]} at ${hi}:00 — ${val} kW`} />
                                        ))}
                                    </motion.div>
                                )
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-[10px] text-gray-400">
                    <span>Low</span>
                    {['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e'].map(c => (
                        <div key={c} className="w-5 h-3 rounded-sm" style={{ background: c }} />
                    ))}
                    <span>High</span>
                </div>
            </motion.div>

            {/* ═══════════ 5️⃣ COST BREAKDOWN + 4️⃣ USAGE CLUSTERS ═══════════ */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Cost Breakdown with treemap */}
                <div className="card-static">
                    <h2 className="section-title mb-4">Cost Breakdown by Category</h2>
                    <div className="space-y-3 mb-5">
                        {costBreakdown.map((c, i) => (
                            <div key={c.name} className="flex items-center gap-3">
                                <span className="w-24 text-sm text-gray-600 flex-shrink-0">{c.name}</span>
                                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                                        transition={{ duration: 0.6, delay: i * 0.08 }}
                                        className="h-full rounded-full" style={{ background: treemapColors[i] }} />
                                </div>
                                <span className="text-sm font-bold text-gray-700 w-14 text-right">₹{c.cost}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mb-2">Proportional cost share</p>
                    <div className="flex h-8 rounded-xl overflow-hidden">
                        {costBreakdown.map((c, i) => (
                            <motion.div key={c.name} initial={{ width: 0 }} animate={{ width: `${c.pct}%` }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                                className="h-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                                style={{ background: treemapColors[i] }}
                                title={`${c.name}: ₹${c.cost} (${c.pct}%)`}>
                                {c.pct > 10 && <span className="text-[9px] font-bold text-white">{c.pct}%</span>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4️⃣ Usage Pattern Clustering */}
                <div className="card-static">
                    <h2 className="section-title mb-1">Usage Pattern Clustering</h2>
                    <p className="text-xs text-gray-400 mb-4">Weekday vs Weekend consumption-cost clusters</p>
                    <div className="flex items-center gap-4 mb-3 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-primary-500 rounded-full" /> Weekday</span>
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-amber-400 rounded-full" /> Weekend</span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <ScatterChart margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="consumption" name="Consumption" unit=" kWh" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis dataKey="cost" name="Cost" unit=" ₹" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <ZAxis range={[50, 120]} />
                            <Tooltip content={<ChartTooltip />} />
                            <Scatter data={clusterData.filter(d => d.type === 'weekday')} name="Weekday" fill="#14b8a6">
                                {clusterData.filter(d => d.type === 'weekday').map((_, i) => <Cell key={i} fill="#14b8a6" />)}
                            </Scatter>
                            <Scatter data={clusterData.filter(d => d.type === 'weekend')} name="Weekend" fill="#f59e0b">
                                {clusterData.filter(d => d.type === 'weekend').map((_, i) => <Cell key={i} fill="#f59e0b" />)}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* ═══════════ BUDGET TRACKER ═══════════ */}
            <motion.div variants={fadeUp} className="card-static">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="section-title">Budget Tracker — This Month</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Actual spend vs budget target</p>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-primary-500 rounded-sm" /> Actual</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-500 rounded-full" /> Budget</span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <ComposedChart data={budgetData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                        <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="actual" name="Actual (₹)" fill="#14b8a6" radius={[6, 6, 0, 0]} barSize={32} />
                        <Line type="monotone" dataKey="budget" name="Budget (₹)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </motion.div>

            {/* ═══════════ QUICK STATS FOOTER ═══════════ */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { icon: Zap, label: 'Avg Daily Energy', value: '18.4 kWh' },
                    { icon: Droplets, label: 'Avg Daily Water', value: '143 L' },
                    { icon: Clock, label: 'Peak Hour', value: `${topPeakHour > 12 ? topPeakHour - 12 : topPeakHour || 12} ${topPeakHour >= 12 ? 'PM' : 'AM'}` },
                    { icon: AlertTriangle, label: 'Anomalies Detected', value: `${anomalyPoints.length}` },
                ].map(s => (
                    <div key={s.label} className="flex items-center gap-3 p-4 bg-white rounded-2xl shadow-card border border-gray-100/60">
                        <div className="p-2 bg-primary-50 rounded-xl"><s.icon className="w-4 h-4 text-primary-600" /></div>
                        <div>
                            <p className="text-xs text-gray-400">{s.label}</p>
                            <p className="text-sm font-bold text-gray-800">{s.value}</p>
                        </div>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    )
}
