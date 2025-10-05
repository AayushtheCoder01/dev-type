import { motion } from 'framer-motion'
import { useTyping } from '../contexts/TypingContext'

export default function StatsPanel() {
  const { stats } = useTyping()

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const StatCard = ({ icon, label, value, color, suffix = '' }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl border shadow-sm"
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg" style={{ backgroundColor: color, opacity: 0.1 }}>
          <div style={{ color: color }}>{icon}</div>
        </div>
        <div className="text-right">
          <motion.div
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-inter font-bold"
            style={{ color: color }}
          >
            {value}{suffix}
          </motion.div>
        </div>
      </div>
      <div className="text-sm font-inter font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-inter font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          Live Statistics
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Track your typing performance in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
          label="Words Per Minute"
          value={stats.wpm}
          color="var(--accent)"
        />

        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="Accuracy"
          value={stats.accuracy}
          suffix="%"
          color="var(--success)"
        />

        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="Time Elapsed"
          value={formatTime(stats.timeElapsed)}
          color="var(--text-primary)"
        />

        <StatCard
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          }
          label="Errors"
          value={stats.errorCount}
          color="var(--error)"
        />
      </div>

      {/* Performance Insights */}
      <div className="p-6 rounded-xl border"
           style={{ 
             backgroundColor: 'var(--bg-secondary)', 
             borderColor: 'var(--border)',
             boxShadow: 'var(--shadow)'
           }}>
        <h3 className="font-inter font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Performance Insights
        </h3>
        
        <div className="space-y-3">
          {stats.wpm >= 40 && (
            <div className="flex items-center space-x-3 p-3 rounded-lg" 
                 style={{ backgroundColor: 'var(--success)', opacity: 0.1 }}>
              <div style={{ color: 'var(--success)' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--success)' }}>
                  Great Speed!
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  You're typing faster than average
                </p>
              </div>
            </div>
          )}

          {stats.accuracy >= 95 && (
            <div className="flex items-center space-x-3 p-3 rounded-lg" 
                 style={{ backgroundColor: 'var(--success)', opacity: 0.1 }}>
              <div style={{ color: 'var(--success)' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--success)' }}>
                  Excellent Accuracy!
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Very few mistakes made
                </p>
              </div>
            </div>
          )}

          {stats.wpm < 30 && stats.timeElapsed > 30 && (
            <div className="flex items-center space-x-3 p-3 rounded-lg" 
                 style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}>
              <div style={{ color: 'var(--accent)' }}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
                  Focus on Speed
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Try to type faster while maintaining accuracy
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-inter font-semibold" style={{ color: 'var(--text-primary)' }}>
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 gap-2">
          <button className="flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200 hover:scale-105 focus-ring"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-inter font-medium">New Snippet</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-3 rounded-lg border transition-all duration-200 hover:scale-105 focus-ring"
                  style={{ 
                    backgroundColor: 'var(--bg-primary)', 
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)'
                  }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span className="font-inter font-medium">View History</span>
          </button>
        </div>
      </div>
    </div>
  )
}
