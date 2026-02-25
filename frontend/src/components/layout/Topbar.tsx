import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
} from 'lucide-react'

interface TopbarProps {
  onMenuClick: () => void
}

interface Notification {
  id: number
  message: string
  time: string
  type: 'warning' | 'info' | 'success'
  read: boolean
}

const notificationIcons = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
}

const notificationColors = {
  warning: 'text-amber-500 bg-amber-50',
  info: 'text-cyan-500 bg-cyan-50',
  success: 'text-emerald-500 bg-emerald-50',
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Read user data from localStorage
  const storedUser = (() => {
    try {
      const raw = localStorage.getItem('enerluma_user')
      if (raw) return JSON.parse(raw) as { name: string; email: string }
    } catch { /* ignore */ }
    return { name: 'User', email: 'user@enerluma.com' }
  })()
  const userName = storedUser.name
  const userEmail = storedUser.email
  const userInitial = userName.charAt(0).toUpperCase()

  const handleSignOut = () => {
    localStorage.removeItem('enerluma_user')
    window.location.replace('/index.html')
  }

  const notifications: Notification[] = [
    { id: 1, message: 'High energy consumption detected in HVAC', time: '5 min ago', type: 'warning', read: false },
    { id: 2, message: 'Water leak sensor test passed', time: '1 hour ago', type: 'success', read: false },
    { id: 3, message: 'Smart Thermostat firmware update available', time: '2 hours ago', type: 'info', read: true },
    { id: 4, message: 'Monthly energy report ready', time: '1 day ago', type: 'info', read: true },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left — Menu + Search */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile/Compact Logo */}
          <div className="flex md:hidden items-center gap-2 mr-2">
            <div className="flex items-center justify-center w-8 h-8 bg-eco-gradient rounded-lg">
              <img src="/enerluma-logo.svg" alt="EnerLuma" className="w-4 h-4 object-contain invert brightness-0" />
            </div>
            <span className="text-sm font-bold text-gray-900">EnerLuma</span>
          </div>

          {/* Search */}
          <div
            className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all duration-200 ${searchFocused
              ? 'bg-white ring-2 ring-primary-200 shadow-sm w-80'
              : 'bg-gray-50 w-64'
              }`}
          >
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search devices, rooms..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 rounded border border-gray-200">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right — Actions */}
        <div className="flex items-center gap-1">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setUserMenuOpen(false)
              }}
              className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-[9px] font-bold text-white bg-red-500 rounded-full"
                >
                  {unreadCount}
                </motion.span>
              )}
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-[360px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold text-primary-700 bg-primary-50 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Notification List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification, index) => {
                      const Icon = notificationIcons[notification.type]
                      const colorClass = notificationColors[notification.type]
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-primary-50/30' : ''
                            }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${colorClass}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 mt-1.5 bg-primary-500 rounded-full shrink-0" />
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Footer */}
                  <div className="p-3 border-t border-gray-100">
                    <button className="w-full py-2 text-center text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 mx-1" />

          {/* User menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen)
                setNotificationsOpen(false)
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-eco-gradient rounded-xl flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{userInitial}</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-700 leading-tight">{userName}</p>
                <p className="text-[10px] text-gray-400">Admin</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{userName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{userEmail}</p>
                  </div>
                  <div className="py-1.5">
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
