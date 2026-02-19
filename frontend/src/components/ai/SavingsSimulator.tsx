import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Leaf, DollarSign, Zap, ChevronRight } from 'lucide-react'
import type { SavingsScenario } from '@/types/ai.types'

const difficultyColors: Record<string, { bg: string; text: string }> = {
    easy: { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
    medium: { bg: 'bg-amber-500/20', text: 'text-amber-300' },
    hard: { bg: 'bg-red-500/20', text: 'text-red-300' },
}

interface Props { scenarios: SavingsScenario[] }

export default function SavingsSimulator({ scenarios }: Props) {
    const [selected, setSelected] = useState<string | null>(null)

    const totalMonthlySavings = scenarios.reduce((s, sc) => s + sc.monthlySavings, 0)
    const totalAnnualSavings = scenarios.reduce((s, sc) => s + sc.annualSavings, 0)
    const totalCarbon = scenarios.reduce((s, sc) => s + sc.carbonReduction, 0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-2xl p-6"
            style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))', border: '1px solid rgba(20,184,166,0.15)', backdropFilter: 'blur(16px)' }}
        >
            <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-teal-400" />
                <h2 className="text-lg font-bold text-white">Savings Simulator</h2>
            </div>
            <p className="text-xs text-gray-400 mb-5">"What if…" scenarios to visualize potential savings</p>

            {/* Summary cards */}
            <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-center">
                    <DollarSign className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <span className="text-lg font-extrabold text-emerald-400">₹{totalMonthlySavings}</span>
                    <p className="text-[9px] text-gray-400">Max Monthly</p>
                </div>
                <div className="p-3 rounded-xl bg-teal-500/[0.08] border border-teal-500/20 text-center">
                    <Zap className="w-4 h-4 text-teal-400 mx-auto mb-1" />
                    <span className="text-lg font-extrabold text-teal-400">₹{(totalAnnualSavings / 1000).toFixed(1)}K</span>
                    <p className="text-[9px] text-gray-400">Max Yearly</p>
                </div>
                <div className="p-3 rounded-xl bg-green-500/[0.08] border border-green-500/20 text-center">
                    <Leaf className="w-4 h-4 text-green-400 mx-auto mb-1" />
                    <span className="text-lg font-extrabold text-green-400">{totalCarbon.toFixed(1)}</span>
                    <p className="text-[9px] text-gray-400">kg CO₂ saved</p>
                </div>
            </div>

            {/* Scenarios */}
            <div className="space-y-3">
                {scenarios.map((sc, i) => {
                    const dc = difficultyColors[sc.difficulty]
                    const isOpen = selected === sc.id

                    return (
                        <motion.div
                            key={sc.id}
                            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.06 }}
                            className="rounded-xl overflow-hidden cursor-pointer"
                            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                            onClick={() => setSelected(isOpen ? null : sc.id)}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 p-4">
                                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-lg font-bold text-teal-400">
                                    {sc.reductionPercent}%
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold text-white truncate">{sc.title}</h3>
                                    <p className="text-[10px] text-gray-500">{sc.appliances.join(', ')}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-emerald-400">₹{sc.monthlySavings}/mo</span>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${dc.bg} ${dc.text}`}>
                                            {sc.difficulty}
                                        </span>
                                    </div>
                                </div>
                                <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronRight className="w-4 h-4 text-gray-500" />
                                </motion.div>
                            </div>

                            {/* Expanded detail */}
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 pt-0 border-t border-white/5">
                                            <p className="text-[11px] text-gray-400 mt-3 mb-3">{sc.description}</p>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="text-center p-2 rounded-lg bg-black/20">
                                                    <span className="text-sm font-bold text-emerald-400">₹{(sc.annualSavings / 1000).toFixed(1)}K</span>
                                                    <p className="text-[9px] text-gray-500">Annual</p>
                                                </div>
                                                <div className="text-center p-2 rounded-lg bg-black/20">
                                                    <span className="text-sm font-bold text-teal-400">{sc.carbonReduction} kg</span>
                                                    <p className="text-[9px] text-gray-500">CO₂/mo saved</p>
                                                </div>
                                                <div className="text-center p-2 rounded-lg bg-black/20">
                                                    <span className="text-sm font-bold text-blue-400">{sc.reductionPercent}%</span>
                                                    <p className="text-[9px] text-gray-500">Reduction</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
            </div>
        </motion.div>
    )
}
