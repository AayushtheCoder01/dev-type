import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'
import { useState, useEffect } from 'react'

export default function ThemeModal() {
  const { themes, currentTheme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  // Listen for theme modal trigger
  useEffect(() => {
    const handleThemeModal = () => setIsOpen(true)
    window.addEventListener('openThemeModal', handleThemeModal)
    return () => window.removeEventListener('openThemeModal', handleThemeModal)
  }, [])

  const handleThemeSelect = (theme) => {
    setTheme(theme)
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative max-w-2xl w-full rounded-xl border shadow-2xl p-6"
              style={{ 
                backgroundColor: 'var(--bg-primary)', 
                borderColor: 'var(--border)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-inter font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Choose Theme
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-10"
                  style={{ backgroundColor: 'var(--text-secondary)' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeSelect(theme)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      currentTheme.id === theme.id ? 'ring-2' : ''
                    }`}
                    style={{ 
                      backgroundColor: theme.colors['--bg-primary'],
                      borderColor: currentTheme.id === theme.id ? theme.colors['--accent'] : theme.colors['--border'],
                      ringColor: theme.colors['--accent']
                    }}
                  >
                    {/* Theme Preview */}
                    <div className="space-y-3">
                      {/* Theme Name */}
                      <div className="text-left">
                        <h3 className="font-inter font-semibold text-sm" 
                            style={{ color: theme.colors['--text-primary'] }}>
                          {theme.name}
                        </h3>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex space-x-2">
                        <div 
                          className="w-6 h-6 rounded-full border"
                          style={{ 
                            backgroundColor: theme.colors['--bg-primary'],
                            borderColor: theme.colors['--border']
                          }}
                        />
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: theme.colors['--accent'] }}
                        />
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: theme.colors['--success'] }}
                        />
                        <div 
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: theme.colors['--error'] }}
                        />
                      </div>

                      {/* Sample Text */}
                      <div className="text-left space-y-1">
                        <div className="text-xs font-mono" 
                             style={{ color: theme.colors['--text-primary'] }}>
                          const code = 'sample'
                        </div>
                        <div className="text-xs" 
                             style={{ color: theme.colors['--text-secondary'] }}>
                          Secondary text
                        </div>
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {currentTheme.id === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: theme.colors['--accent'] }}
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Export function to open modal from other components
export const openThemeModal = () => {
  window.dispatchEvent(new CustomEvent('openThemeModal'))
}
