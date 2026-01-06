import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import { ToastProvider } from './components/alerts'
import Dashboard from './pages/Dashboard'
import EnergyPage from './pages/EnergyPage'
import WaterPage from './pages/WaterPage'
import NotFound from './pages/NotFound'

// Create a query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <AppShell>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/energy" element={<EnergyPage />} />
              <Route path="/water" element={<WaterPage />} />
              {/* Additional routes will be added here as pages are created */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppShell>
        </ToastProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

