import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePoints } from '../contexts/PointsContext'

export default function AdvancedAnalytics({ onClose }) {
  const { stats } = usePoints()
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')
  const [selectedMetric, setSelectedMetric] = useState('wpm')

  // All users now have access to advanced analytics

  // Get real session data from localStorage
  const realSessions = useMemo(() => {
    const sessions = []
    
    // Get test history from localStorage
    const testHistory = localStorage.getItem('codetype_test_history')
    if (testHistory) {
      const parsedHistory = JSON.parse(testHistory)
      return parsedHistory.map(test => ({
        id: test.id || Date.now(),
        date: test.timestamp || new Date().toISOString(),
        wpm: test.wpm || 0,
        accuracy: test.accuracy || 0,
        duration: test.timeElapsed || 60,
        language: test.language || 'javascript',
        errors: test.charStats ? generateErrorsFromCharStats(test.charStats) : [],
        keystrokes: test.totalChars || 0
      }))
    }
    
    // If no real data, show message instead of dummy data
    return []
  }, [])

  // Generate errors from real character statistics
  function generateErrorsFromCharStats(charStats) {
    const errorMap = {}
    
    charStats.forEach(char => {
      if (!char.correct) {
        const expected = char.expected
        errorMap[expected] = (errorMap[expected] || 0) + 1
      }
    })
    
    return Object.entries(errorMap)
      .map(([char, count]) => ({ char, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }

  // Filter sessions by timeframe
  const filteredSessions = useMemo(() => {
    const now = new Date()
    let cutoffDate
    
    switch (selectedTimeframe) {
      case 'day':
        cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case 'week':
        cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default:
        return realSessions
    }
    
    return realSessions.filter(session => new Date(session.date) >= cutoffDate)
  }, [realSessions, selectedTimeframe])

  // Calculate analytics
  const analytics = useMemo(() => {
    if (filteredSessions.length === 0) return null
    
    const totalSessions = filteredSessions.length
    const avgWpm = filteredSessions.reduce((sum, s) => sum + s.wpm, 0) / totalSessions
    const avgAccuracy = filteredSessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions
    const totalTime = filteredSessions.reduce((sum, s) => sum + s.duration, 0)
    const totalKeystrokes = filteredSessions.reduce((sum, s) => sum + s.keystrokes, 0)
    
    // Error analysis
    const allErrors = filteredSessions.flatMap(s => s.errors)
    const errorMap = {}
    allErrors.forEach(error => {
      errorMap[error.char] = (errorMap[error.char] || 0) + error.count
    })
    
    const topErrors = Object.entries(errorMap)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([char, count]) => ({ char, count }))
    
    // Progress trend
    const wpmTrend = filteredSessions.map(s => ({ date: s.date, value: s.wpm }))
    const accuracyTrend = filteredSessions.map(s => ({ date: s.date, value: s.accuracy }))
    
    return {
      totalSessions,
      avgWpm: Math.round(avgWpm),
      avgAccuracy: Math.round(avgAccuracy),
      totalTime: Math.round(totalTime),
      totalKeystrokes,
      topErrors,
      wpmTrend,
      accuracyTrend,
      consistency: Math.round(100 - (Math.max(...filteredSessions.map(s => s.wpm)) - Math.min(...filteredSessions.map(s => s.wpm))))
    }
  }, [filteredSessions])

  if (!analytics) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md mx-4">
          <h2 className="text-xl font-bold mb-4">No Data Available</h2>
          <p className="text-gray-400 mb-6">Complete some typing sessions to see your analytics.</p>
          <button
            onClick={onClose}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Advanced Analytics</h2>
              <p className="text-gray-400">Deep insights into your typing performance</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Timeframe Selector */}
          <div className="flex space-x-2 mt-4">
            {['day', 'week', 'month', 'all'].map(timeframe => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {timeframe === 'all' ? 'All Time' : `Last ${timeframe}`}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              title="Average WPM"
              value={analytics.avgWpm}
              icon="⚡"
              color="blue"
            />
            <MetricCard
              title="Average Accuracy"
              value={`${analytics.avgAccuracy}%`}
              icon="🎯"
              color="green"
            />
            <MetricCard
              title="Total Sessions"
              value={analytics.totalSessions}
              icon="📊"
              color="purple"
            />
            <MetricCard
              title="Consistency"
              value={`${analytics.consistency}%`}
              icon="📈"
              color="orange"
            />
          </div>

          {/* Progress Chart */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Progress Over Time</h3>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                <option value="wpm">WPM</option>
                <option value="accuracy">Accuracy</option>
              </select>
            </div>
            <ProgressChart
              data={selectedMetric === 'wpm' ? analytics.wpmTrend : analytics.accuracyTrend}
              metric={selectedMetric}
            />
          </div>

          {/* Error Heatmap */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Error Heatmap</h3>
            <ErrorHeatmap errors={analytics.topErrors} />
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Session Breakdown</h3>
              <div className="space-y-3">
                <StatRow label="Total Time" value={`${Math.round(analytics.totalTime / 60)} minutes`} />
                <StatRow label="Total Keystrokes" value={analytics.totalKeystrokes.toLocaleString()} />
                <StatRow label="Avg Session Length" value={`${Math.round(analytics.totalTime / analytics.totalSessions)} seconds`} />
                <StatRow label="Best WPM" value={Math.max(...analytics.wpmTrend.map(d => d.value))} />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">AI Insights</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <InsightCard
                  icon="🎯"
                  text={`Your accuracy has ${analytics.avgAccuracy > 90 ? 'excellent' : 'room for improvement'}. Focus on ${analytics.topErrors[0]?.char || 'special characters'}.`}
                />
                <InsightCard
                  icon="⚡"
                  text={`Your typing speed is ${analytics.avgWpm > 50 ? 'above average' : 'developing'}. Practice more ${analytics.avgWpm < 40 ? 'basic' : 'advanced'} patterns.`}
                />
                <InsightCard
                  icon="📈"
                  text={`Your consistency score of ${analytics.consistency}% suggests ${analytics.consistency > 80 ? 'stable' : 'variable'} performance.`}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Helper Components
function MetricCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    green: 'bg-green-500/20 text-green-400',
    purple: 'bg-purple-500/20 text-purple-400',
    orange: 'bg-orange-500/20 text-orange-400'
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4">
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center text-lg`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-white text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

function ProgressChart({ data, metric }) {
  const maxValue = Math.max(...data.map(d => d.value))
  const minValue = Math.min(...data.map(d => d.value))
  const range = maxValue - minValue

  return (
    <div className="h-48 flex items-end space-x-1">
      {data.map((point, index) => {
        const height = range === 0 ? 50 : ((point.value - minValue) / range) * 100
        return (
          <div
            key={index}
            className="flex-1 bg-blue-500 rounded-t opacity-70 hover:opacity-100 transition-opacity"
            style={{ height: `${Math.max(height, 5)}%` }}
            title={`${new Date(point.date).toLocaleDateString()}: ${point.value}${metric === 'accuracy' ? '%' : ''}`}
          />
        )
      })}
    </div>
  )
}

function ErrorHeatmap({ errors }) {
  const maxErrors = Math.max(...errors.map(e => e.count), 1)

  return (
    <div className="grid grid-cols-5 gap-2">
      {errors.map(error => {
        const intensity = error.count / maxErrors
        return (
          <div
            key={error.char}
            className="bg-red-500 rounded-lg p-3 text-center text-white font-mono"
            style={{ opacity: 0.3 + intensity * 0.7 }}
            title={`${error.char}: ${error.count} errors`}
          >
            <div className="text-lg">{error.char}</div>
            <div className="text-xs">{error.count}</div>
          </div>
        )
      })}
    </div>
  )
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  )
}

function InsightCard({ icon, text }) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
      <span className="text-lg">{icon}</span>
      <p className="text-sm">{text}</p>
    </div>
  )
}
