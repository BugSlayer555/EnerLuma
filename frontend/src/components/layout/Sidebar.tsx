import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Zap,
  Droplets,
  Cpu,
  BarChart3,
  Bell,
  Settings,
  Leaf,
  Brain,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isMobile: boolean
  onToggle?: () => void
}

interface NavItem {
  path: string
  label: string
  icon: React.ElementType
  badge?: number
  section?: string
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard, section: 'Main' },
  { path: '/energy', label: 'Energy', icon: Zap, section: 'Main' },
  { path: '/water', label: 'Water', icon: Droplets, section: 'Main' },
  { path: '/devices', label: 'Devices', icon: Cpu, section: 'Main' },
  { path: '/alerts', label: 'Alerts', icon: Bell, badge: 3, section: 'Monitoring' },
  { path: '/ai', label: 'AI Insights', icon: Brain, section: 'Monitoring' },
  { path: '/green', label: 'Sustainability', icon: Leaf, section: 'Monitoring' },
  { path: '/analytics', label: 'Analytics', icon: BarChart3, section: 'Monitoring' },
  { path: '/settings', label: 'Settings', icon: Settings, section: 'System' },
  { path: '/admin', label: 'Admin', icon: ShieldCheck, section: 'System' },
]

export default function Sidebar({ isOpen, onClose, isMobile, onToggle }: SidebarProps) {
  const location = useLocation()

  // Group items by section
  const sections = navItems.reduce((acc, item) => {
    const section = item.section || 'Main'
    if (!acc[section]) acc[section] = []
    acc[section].push(item)
    return acc
  }, {} as Record<string, NavItem[]>)

  return (
    <motion.aside
      initial={false}
      animate={{ width: isMobile ? 260 : isOpen ? 260 : 76 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className={`
        fixed top-0 left-0 z-50 h-screen flex flex-col
        bg-white border-r border-gray-100
        ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
        transition-transform duration-300
      `}
      style={{ boxShadow: '1px 0 8px rgba(0,0,0,0.03)' }}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
        <AnimatePresence mode="wait">
          {isOpen || isMobile ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-9 h-9 bg-eco-gradient rounded-xl">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-gradient leading-tight">EnerLuma</h1>
                <p className="text-[10px] font-medium text-gray-400 tracking-wide uppercase">Smart Dashboard</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="logo-icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center justify-center w-9 h-9 bg-eco-gradient rounded-xl mx-auto"
            >
              <Leaf className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {Object.entries(sections).map(([sectionName, items]) => (
          <div key={sectionName} className="mb-4">
            {/* Section Label */}
            <AnimatePresence>
              {(isOpen || isMobile) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
                >
                  {sectionName}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Nav Items */}
            <ul className="space-y-0.5">
              {items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={isMobile ? onClose : undefined}
                      className={`
                        relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                        transition-all duration-200 group
                        ${isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        }
                      `}
                      title={!isOpen && !isMobile ? item.label : undefined}
                    >
                      <Icon
                        className={`flex-shrink-0 w-[18px] h-[18px] ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-600'
                          }`}
                      />
                      <AnimatePresence>
                        {(isOpen || isMobile) && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-[13px] font-medium whitespace-nowrap overflow-hidden"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Badge */}
                      {item.badge && (isOpen || isMobile) && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-500 rounded-full"
                        >
                          {item.badge}
                        </motion.span>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActiveIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary-500 rounded-r-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Eco Score Footer */}
      {(isOpen || isMobile) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 border-t border-gray-100"
        >
          <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-2xl">
            <div className="w-10 h-10 bg-eco-gradient rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-primary-700">Eco Score</p>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex-1 h-1.5 bg-primary-100 rounded-full overflow-hidden">
                  <div className="h-full w-[87%] bg-eco-gradient rounded-full" />
                </div>
                <span className="text-xs font-bold text-primary-600">87</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Collapse Toggle (desktop only) */}
      {!isMobile && onToggle && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors z-50"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? (
            <ChevronLeft className="w-3 h-3 text-gray-500" />
          ) : (
            <ChevronRight className="w-3 h-3 text-gray-500" />
          )}
        </button>
      )}
    </motion.aside>
  )
}
