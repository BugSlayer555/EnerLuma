import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center"
      style={{ minHeight: '75vh', padding: '40px 24px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-lg w-full"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            width: 88,
            height: 88,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 8px 32px rgba(20, 184, 166, 0.25)',
          }}
        >
          <Zap style={{ width: 40, height: 40, color: '#fff', opacity: 0.9 }} />
        </motion.div>

        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          style={{
            fontSize: 120,
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: '-4px',
            marginBottom: 8,
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{ fontSize: 26, fontWeight: 700, color: '#1f2937', marginBottom: 12 }}
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          style={{ fontSize: 15, lineHeight: 1.7, color: '#6b7280', maxWidth: 380, margin: '0 auto 40px' }}
        >
          The page you're looking for doesn't exist, has been moved, or is temporarily unavailable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
              background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
              borderRadius: 14,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(20, 184, 166, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(20, 184, 166, 0.4)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 184, 166, 0.3)' }}
          >
            <Home style={{ width: 18, height: 18 }} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 32px',
              fontSize: 14,
              fontWeight: 600,
              color: '#374151',
              background: '#fff',
              border: '1.5px solid #e5e7eb',
              borderRadius: 14,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)' }}
          >
            <ArrowLeft style={{ width: 18, height: 18 }} />
            Go Back
          </button>
        </motion.div>

        {/* Subtle Divider + Help text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          style={{ marginTop: 48, paddingTop: 28, borderTop: '1px solid #f3f4f6' }}
        >
          <p style={{ fontSize: 13, color: '#9ca3af' }}>
            Need help?{' '}
            <Link to="/contact" style={{ color: '#0f766e', fontWeight: 600, textDecoration: 'none' }}>
              Contact Support
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
