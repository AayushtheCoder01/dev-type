import { motion } from 'framer-motion'
import { usePoints } from '../contexts/PointsContext'
import { useState, useEffect, useRef } from 'react'

export default function AnalysisScreen({ results, settings, onRestart }) {
  const { addPoints, totalPoints, level } = usePoints()
  const [pointsData, setPointsData] = useState(null)
  const pointsAddedRef = useRef(false)
  
  // Safety check
  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p style={{ color: 'var(--text-primary)' }}>Loading results...</p>
      </div>
    )
  }
  
  const {
    correctChars = 0,
    incorrectChars = 0,
    totalChars = 0,
    accuracy = 0,
    wpm = 0,
    timeElapsed = 0,
    targetText = '',
    userInput = '',
    charStats = [],
    completed = false,
    timeLeft = 0,
    originalDuration = 60
  } = results

  // Calculate additional metrics
  const actualTimeUsed = originalDuration - timeLeft
  const wordsTyped = Math.floor(correctChars / 5)
  const errorsPerMinute = (incorrectChars / (actualTimeUsed / 60)) || 0
  
  // Character-by-character precision analysis
  const getCharacterAccuracyBreakdown = () => {
    const breakdown = {
      letters: { correct: 0, total: 0 },
      numbers: { correct: 0, total: 0 },
      symbols: { correct: 0, total: 0 },
      whitespace: { correct: 0, total: 0 }
    }

    charStats.forEach(stat => {
      const char = stat.expected
      let category = 'symbols'
      
      if (/[a-zA-Z]/.test(char)) category = 'letters'
      else if (/[0-9]/.test(char)) category = 'numbers'
      else if (/\s/.test(char)) category = 'whitespace'
      
      breakdown[category].total++
      if (stat.correct) breakdown[category].correct++
    })

    return breakdown
  }

  const charBreakdown = getCharacterAccuracyBreakdown()

  // Add points when component mounts (only once)
  useEffect(() => {
    if (results && !pointsAddedRef.current) {
      pointsAddedRef.current = true
      const data = addPoints(results)
      setPointsData(data)
    }
  }, [results, addPoints])

  // Performance rating
  const getPerformanceRating = () => {
    if (wpm >= 60 && accuracy >= 95) return { rating: 'Excellent', color: 'var(--success)', emoji: '🔥' }
    if (wpm >= 40 && accuracy >= 90) return { rating: 'Good', color: 'var(--accent)', emoji: '👍' }
    if (wpm >= 25 && accuracy >= 80) return { rating: 'Average', color: 'var(--text-secondary)', emoji: '📈' }
    return { rating: 'Keep Practicing', color: 'var(--error)', emoji: '💪' }
  }

  const performance = getPerformanceRating()

  // Render character comparison
  const renderComparison = () => {
    const maxLength = Math.max(targetText.length, userInput.length)
    const chars = []

    for (let i = 0; i < maxLength; i++) {
      const targetChar = targetText[i] || ''
      const userChar = userInput[i] || ''
      
      let status = 'missing'
      if (i >= userInput.length) status = 'missing'
      else if (userChar === targetChar) status = 'correct'
      else status = 'incorrect'

      chars.push({
        index: i,
        target: targetChar,
        user: userChar,
        status
      })
    }

    return chars
  }

  const comparisonChars = renderComparison()

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Session Complete!
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Here's how you performed
          </p>
        </motion.div>

        {/* XP Earned Banner */}
        {pointsData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="mb-8 p-6 rounded-2xl text-center"
            style={{ 
              backgroundColor: 'var(--accent)',
              color: 'white',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)'
            }}
          >
            <div className="flex items-center justify-center space-x-8">
              <div>
                <p className="text-sm opacity-90">XP Earned</p>
                <p className="text-4xl font-bold">+{pointsData.earnedPoints}</p>
              </div>
              <div className="h-12 w-px bg-white opacity-30"></div>
              <div>
                <p className="text-sm opacity-90">Total XP</p>
                <p className="text-2xl font-bold">{pointsData.newTotalPoints}</p>
              </div>
              <div className="h-12 w-px bg-white opacity-30"></div>
              <div>
                <p className="text-sm opacity-90">Level</p>
                <p className="text-2xl font-bold">{pointsData.level}</p>
              </div>
            </div>
            
            {/* Achievement Notifications */}
            {pointsData.newAchievements && pointsData.newAchievements.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 pt-4 border-t border-white border-opacity-30"
              >
                <p className="text-sm font-semibold mb-2">🎉 New Achievements!</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {pointsData.newAchievements.map(achievement => (
                    <div key={achievement.id} className="px-3 py-1 rounded-full bg-white bg-opacity-20 text-sm">
                      {achievement.name} (+{achievement.points} XP)
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          
          {/* WPM */}
          <div className="p-6 rounded-2xl border text-center"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
              {wpm}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Words Per Minute
            </div>
          </div>

          {/* Accuracy */}
          <div className="p-6 rounded-2xl border text-center"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--success)' }}>
              {accuracy}%
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Accuracy
            </div>
          </div>

          {/* Time */}
          <div className="p-6 rounded-2xl border text-center"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {Math.round(actualTimeUsed)}s
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Time Used
            </div>
          </div>

          {/* Errors */}
          <div className="p-6 rounded-2xl border text-center"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <div className="text-3xl font-bold mb-2" style={{ color: 'var(--error)' }}>
              {incorrectChars}
            </div>
            <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Errors Made
            </div>
          </div>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          
          {/* Character Precision Breakdown */}
          <div className="p-6 rounded-2xl border"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Character Precision
            </h3>
            <div className="space-y-4">
              {Object.entries(charBreakdown).map(([category, data]) => {
                const categoryAccuracy = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0
                return (
                  <div key={category}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize" style={{ color: 'var(--text-secondary)' }}>{category}:</span>
                      <span style={{ color: 'var(--text-primary)' }}>
                        {data.correct}/{data.total} ({categoryAccuracy}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          backgroundColor: categoryAccuracy >= 90 ? 'var(--success)' : categoryAccuracy >= 70 ? 'var(--accent)' : 'var(--error)',
                          width: `${categoryAccuracy}%`
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Session Info */}
          <div className="p-6 rounded-2xl border"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Session Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Language:</span>
                <span style={{ color: 'var(--text-primary)' }}>{settings.language}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Difficulty:</span>
                <span style={{ color: 'var(--text-primary)' }}>{settings.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Characters Typed:</span>
                <span style={{ color: 'var(--text-primary)' }}>{totalChars}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Words Typed:</span>
                <span style={{ color: 'var(--text-primary)' }}>{wordsTyped}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Status:</span>
                <span style={{ color: timeLeft > 0 ? 'var(--success)' : 'var(--accent)' }}>
                  {timeLeft > 0 ? `Finished Early (${timeLeft}s left)` : 'Time Completed'}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-secondary)' }}>Time Used:</span>
                <span style={{ color: 'var(--text-primary)' }}>
                  {Math.round(actualTimeUsed)}s / {originalDuration}s
                </span>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="p-6 rounded-2xl border"
               style={{ 
                 backgroundColor: 'var(--bg-secondary)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Performance Insights
            </h3>
            <div className="space-y-3">
              {wpm >= 50 && (
                <div className="flex items-center space-x-2 p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--success)', opacity: 0.1 }}>
                  <span style={{ color: 'var(--success)' }}>✅</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Excellent typing speed!
                  </span>
                </div>
              )}
              {accuracy >= 95 && (
                <div className="flex items-center space-x-2 p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--success)', opacity: 0.1 }}>
                  <span style={{ color: 'var(--success)' }}>✅</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Outstanding accuracy!
                  </span>
                </div>
              )}
              {incorrectChars === 0 && (
                <div className="flex items-center space-x-2 p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--success)', opacity: 0.1 }}>
                  <span style={{ color: 'var(--success)' }}>🎯</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Perfect! No errors made.
                  </span>
                </div>
              )}
              {wpm < 30 && (
                <div className="flex items-center space-x-2 p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}>
                  <span style={{ color: 'var(--accent)' }}>💡</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Practice more to improve speed.
                  </span>
                </div>
              )}
              {accuracy < 85 && (
                <div className="flex items-center space-x-2 p-3 rounded-lg" 
                     style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}>
                  <span style={{ color: 'var(--accent)' }}>💡</span>
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    Focus on accuracy over speed.
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Code Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Code Comparison
          </h3>
          <div className="p-6 rounded-2xl border font-mono text-sm leading-relaxed overflow-auto max-h-60"
               style={{ 
                 backgroundColor: 'var(--code-bg)', 
                 borderColor: 'var(--border)',
                 boxShadow: 'var(--shadow)'
               }}>
            {comparisonChars.map((char, index) => (
              <span
                key={index}
                className={`${
                  char.status === 'correct' ? 'bg-green-500 text-white' :
                  char.status === 'incorrect' ? 'bg-red-500 text-white' :
                  'opacity-50'
                }`}
              >
                {char.target || '·'}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={onRestart}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--accent)',
              color: 'white'
            }}
          >
            Next Challenge
          </button>
        </motion.div>
      </div>
    </div>
  )
}
