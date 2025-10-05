import { motion, AnimatePresence } from 'framer-motion'
import { usePoints } from '../contexts/PointsContext'

export default function StatsModal({ isOpen, onClose }) {
  const { totalPoints, stats, level, progressToNextLevel, nextLevelPoints, currentLevelPoints } = usePoints()

  if (!isOpen) return null

  const avgWPM = stats.totalRaces > 0 ? Math.round(stats.totalWords / (stats.totalTime / 60)) : 0
  const avgAccuracy = stats.bestAccuracy

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl rounded-2xl p-8"
          style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Your Progress
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-opacity-10 transition-all"
              style={{ color: 'var(--text-secondary)' }}
            >
              ✕
            </button>
          </div>

          {/* Level & XP Section */}
          <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                     style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
                  {level}
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    Level {level}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {totalPoints} / {nextLevelPoints} XP
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Next Level</p>
                <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
                  {nextLevelPoints - totalPoints} XP to go
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-3 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  width: `${progressToNextLevel}%`
                }}
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{stats.totalRaces}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Total Races</p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>{stats.bestWPM}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Best WPM</p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>{stats.bestAccuracy}%</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Best Accuracy</p>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{stats.streak}</p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Day Streak 🔥</p>
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Performance</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Total Words Typed:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{stats.totalWords.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Total Time:</span>
                  <span style={{ color: 'var(--text-primary)' }}>{Math.round(stats.totalTime / 60)} min</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--text-secondary)' }}>Perfect Races:</span>
                  <span style={{ color: 'var(--success)' }}>{stats.perfectRaces}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Achievements</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {stats.achievements.length > 0 ? (
                  stats.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded"
                         style={{ backgroundColor: 'var(--bg-primary)' }}>
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        {achievement.name}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--accent)' }}>
                        +{achievement.points} XP
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
                    No achievements yet. Keep typing!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
