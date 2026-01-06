import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

type ToastSeverity = 'info' | 'warning' | 'error'

type Toast = {
  id: string
  message: string
  severity: ToastSeverity
}

type ToastContextValue = {
  showToast: (message: string, severity?: ToastSeverity) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export const ToastProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, severity: ToastSeverity = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    setToasts((s) => [{ id, message, severity }, ...s])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  useEffect(() => {
    const id = setTimeout(onClose, 4000)
    return () => clearTimeout(id)
  }, [onClose])

  const bg = toast.severity === 'error' ? 'bg-red-600' : toast.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-600'

  return (
    <div className={`max-w-sm w-full text-white px-4 py-2 rounded shadow-lg ${bg} animate-fade-in`}>
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="font-semibold capitalize">{toast.severity}</div>
          <div className="text-sm">{toast.message}</div>
        </div>
        <button aria-label="close" onClick={onClose} className="opacity-90 hover:opacity-100">×</button>
      </div>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider
