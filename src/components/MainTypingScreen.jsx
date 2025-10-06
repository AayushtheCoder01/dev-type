import { useState, useEffect, useRef } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { usePoints } from '../contexts/PointsContext'
import { useAuth } from '../contexts/AuthContext'
import { getRandomSnippet } from '../services/snippetService'
import StatsModal from './StatsModal'
import AdvancedAnalytics from './AdvancedAnalytics'
import Settings from './Settings'

export default function MainTypingScreen({ settings, onSettingsChange, onComplete, onNavigateToAuth }) {
  const { themes, currentTheme, setTheme } = useTheme()
  const { totalPoints, level, progressToNextLevel } = usePoints()
  const { currentUser, logout } = useAuth()
  const [currentSnippet, setCurrentSnippet] = useState(null)
  const [userInput, setUserInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState(settings.duration)
  const [charStats, setCharStats] = useState([]) // Track each character's correctness
  const [showStats, setShowStats] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showAdvancedAnalytics, setShowAdvancedAnalytics] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  // Load snippet on mount or when settings change
  useEffect(() => {
    loadNewSnippet()
  }, [settings.language, settings.difficulty])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Tab to reset (only when not typing in select dropdowns)
      if (e.key === 'Tab' && !e.target.matches('select')) {
        e.preventDefault()
        loadNewSnippet()
      }
      // Ctrl+R or Cmd+R to reset
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault()
        loadNewSnippet()
      }
      // Escape to reset
      if (e.key === 'Escape') {
        loadNewSnippet()
        setShowUserMenu(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUserMenu && !e.target.closest('.user-menu-container')) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showUserMenu])

  // Timer logic
  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isTyping, timeLeft])

  const loadNewSnippet = () => {
    try {
      const snippet = getRandomSnippet(settings.language, settings.difficulty)
      setCurrentSnippet(snippet)
      resetSession()
    } catch (error) {
      console.error('Error loading snippet:', error)
      alert('Failed to load snippet. Please try again.')
    }
  }

  const resetSession = () => {
    setUserInput('')
    setIsTyping(false)
    setStartTime(null)
    setTimeLeft(settings.duration)
    setCharStats([])
    clearInterval(timerRef.current)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    
    // Check if snippet is loaded
    if (!currentSnippet) return
    
    // Start timer on first keystroke
    if (!isTyping && value.length > 0) {
      setIsTyping(true)
      setStartTime(Date.now())
    }

    // Don't allow typing beyond snippet length
    if (value.length <= currentSnippet.code.length) {
      setUserInput(value)
      
      // Track character accuracy
      const newCharStats = []
      for (let i = 0; i < value.length; i++) {
        newCharStats.push({
          expected: currentSnippet.code[i],
          typed: value[i],
          correct: value[i] === currentSnippet.code[i],
          timestamp: Date.now()
        })
      }
      setCharStats(newCharStats)

      // Auto-complete when all characters are typed (even if time remains)
      if (value.length === currentSnippet.code.length) {
        // Small delay to show the last character before completing
        setTimeout(() => {
          handleComplete()
        }, 100)
      }
    }
  }

  const calculateStats = () => {
    const timeElapsed = startTime ? Math.max((Date.now() - startTime) / 1000, 1) : settings.duration
    const correctChars = charStats.filter(char => char.correct).length
    const incorrectChars = charStats.length - correctChars
    const totalChars = charStats.length
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0
    const wpm = Math.round((correctChars / 5) / (timeElapsed / 60))

    return {
      correctChars,
      incorrectChars,
      totalChars,
      accuracy,
      wpm,
      timeElapsed,
      targetText: currentSnippet?.code || '',
      userInput,
      charStats,
      completed: userInput.length === (currentSnippet?.code.length || 0),
      timeLeft,
      originalDuration: settings.duration
    }
  }

  const handleComplete = () => {
    if (!isTyping) return
    
    setIsTyping(false)
    clearInterval(timerRef.current)
    
    // No premium restrictions - all users can take unlimited tests
    
    const results = calculateStats()
    
    // Save test data for analytics
    const testData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...results,
      language: settings.language,
      difficulty: settings.difficulty
    }
    
    // Store in test history for analytics
    const existingHistory = JSON.parse(localStorage.getItem('codetype_test_history') || '[]')
    existingHistory.push(testData)
    
    // Keep only last 100 tests
    if (existingHistory.length > 100) {
      existingHistory.splice(0, existingHistory.length - 100)
    }
    
    localStorage.setItem('codetype_test_history', JSON.stringify(existingHistory))
    
    onComplete(results)
  }

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value })
  }

  const renderCharacter = (char, index) => {
    let className = 'transition-all duration-100'
    
    if (index < userInput.length) {
      className += userInput[index] === char ? ' char-correct' : ' char-incorrect'
    } else if (index === userInput.length && isTyping) {
      className += ' char-current'
    } else {
      className += ' char-pending'
    }

    return (
      <span key={index} className={className}>
        {char === '\n' ? '↵\n' : char}
      </span>
    )
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentSnippet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" 
               style={{ borderColor: 'var(--accent)' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>
            Loading snippet...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Top Settings Bar - Hide when typing */}
      {!isTyping && (
        <div className="flex items-center justify-between px-8 py-4 border-b transition-all duration-300" style={{ borderColor: 'var(--border)' }}>
        
        {/* Left: Points & Level Display */}
        <div className="flex items-center space-x-6">
          {/* Level Badge - Clickable */}
          <button 
            onClick={() => setShowStats(true)}
            className="flex items-center space-x-2 hover:opacity-80 transition-all"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg"
                 style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
              {level}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Level {level}</span>
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{totalPoints} XP</span>
            </div>
          </button>
          
          {/* Progress Bar */}
          <div className="hidden md:flex flex-col w-32">
            <span className="text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>
              {Math.round(progressToNextLevel)}% to Level {level + 1}
            </span>
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  width: `${progressToNextLevel}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Center: Language & Difficulty */}
        <div className="flex items-center space-x-4">
          <select
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="typescript">TypeScript</option>
            <option value="java">Java</option>
          </select>

          <select
            value={settings.difficulty}
            onChange={(e) => handleSettingChange('difficulty', e.target.value)}
            className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            value={settings.duration}
            onChange={(e) => handleSettingChange('duration', parseInt(e.target.value))}
            className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <option value="30">30s</option>
            <option value="60">60s</option>
            <option value="120">2m</option>
            <option value="300">5m</option>
          </select>
        </div>

        {/* Center: Timer (only show when typing) */}
        {isTyping && (
          <div className={`text-3xl font-mono font-bold ${timeLeft <= 10 ? 'text-red-500' : ''}`}
               style={{ color: timeLeft <= 10 ? 'var(--error)' : 'var(--text-primary)' }}>
            {formatTime(timeLeft)}
          </div>
        )}

        {/* Right: Theme Selector & Reset */}
        <div className="flex items-center space-x-4">
          <select
            value={currentTheme.id}
            onChange={(e) => {
              const theme = themes.find(t => t.id === e.target.value)
              if (theme) setTheme(theme)
            }}
            className="px-3 py-2 rounded-lg border bg-transparent focus:outline-none focus:ring-2"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            {themes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>

          <button
            onClick={loadNewSnippet}
            className="flex items-center justify-center w-10 h-10 rounded-lg border hover:bg-opacity-10 transition-all text-xl"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            title="Reset (Tab or Esc)"
          >
            ↻
          </button>

          {/* Advanced Analytics Button */}
          <button
            onClick={() => setShowAdvancedAnalytics(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border hover:bg-opacity-10 transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            title="Advanced Analytics"
          >
            📊
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center justify-center w-10 h-10 rounded-lg border hover:bg-opacity-10 transition-all"
            style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            title="Settings"
          >
            ⚙️
          </button>

          {/* User Profile Button */}
          <div className="relative user-menu-container">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center justify-center w-10 h-10 rounded-full border hover:bg-opacity-10 transition-all"
              style={{ borderColor: 'var(--border)', color: 'var(--text-primary)', backgroundColor: 'var(--accent)' }}
              title={currentUser ? currentUser.username : 'Guest'}
            >
              <span className="text-white font-semibold">
                {currentUser ? currentUser.username.charAt(0).toUpperCase() : '?'}
              </span>
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-50"
                   style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
                <div className="p-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {currentUser ? currentUser.username : 'Guest'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {currentUser ? currentUser.email : 'Not signed in'}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setShowUserMenu(false)
                    setShowSettings(true)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-opacity-10 transition-all"
                  style={{ color: 'var(--text-primary)' }}
                >
                  ⚙️ Settings
                </button>
                
                {currentUser ? (
                  <button
                    onClick={() => {
                      logout()
                      setShowUserMenu(false)
                      window.location.reload()
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-opacity-10 transition-all"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        onNavigateToAuth?.('login')
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-opacity-10 transition-all"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        onNavigateToAuth?.('signup')
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-opacity-10 transition-all"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        </div>
      )}

      {/* Timer Display - Show when typing */}
      {isTyping && (
        <div className="fixed top-4 right-4 z-50">
          <div className={`text-2xl font-mono font-bold px-4 py-2 rounded-lg ${timeLeft <= 10 ? 'text-red-500 bg-red-100' : 'text-white bg-gray-800'}`}>
            {formatTime(timeLeft)}
          </div>
        </div>
      )}

      {/* Main Typing Area - Centered like Monkeytype */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-4xl">
          
          {/* Snippet Info */}
          {currentSnippet && (
            <div className="text-center mb-6">
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {currentSnippet.description}
              </p>
            </div>
          )}

          {/* Code Display with Overlay Input */}
          <div className="relative">
            <div 
              className="font-mono text-xl leading-relaxed p-8 rounded-2xl min-h-[200px] whitespace-pre-wrap cursor-text"
              style={{ 
                backgroundColor: 'var(--code-bg)',
                color: 'var(--text-primary)'
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {currentSnippet ? 
                currentSnippet.code.split('').map((char, index) => renderCharacter(char, index)) :
                <div className="text-gray-500">Loading snippet...</div>
              }
            </div>

            {/* Hidden Input - Auto-focus */}
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              className="absolute inset-0 opacity-0 resize-none cursor-text"
              style={{ caretColor: 'transparent' }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              autoFocus
            />
          </div>

          {/* Progress Indicator */}
          {currentSnippet && (
            <div className="mt-6">
              <div className="w-full h-1 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-200"
                  style={{ 
                    backgroundColor: 'var(--accent)',
                    width: `${Math.min((userInput.length / currentSnippet.code.length) * 100, 100)}%`
                  }}
                />
              </div>
            </div>
          )}

          {/* Live Stats (only show when typing) */}
          {isTyping && currentSnippet && (
            <div className="mt-8 flex justify-center space-x-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <div>
                <span className="font-semibold" style={{ color: 'var(--accent)' }}>
                  {Math.round((charStats.filter(c => c.correct).length / 5) / ((Date.now() - startTime) / 1000 / 60)) || 0}
                </span> wpm
              </div>
              <div>
                <span className="font-semibold" style={{ color: 'var(--success)' }}>
                  {Math.round((charStats.filter(c => c.correct).length / charStats.length) * 100) || 100}%
                </span> accuracy
              </div>
              <div>
                <span className="font-semibold">
                  {userInput.length}/{currentSnippet.code.length}
                </span> chars
              </div>
            </div>
          )}

          {/* Instructions (only show when not typing) */}
          {!isTyping && (
            <div className="mt-8 text-center text-sm space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <p>Click above or start typing to begin</p>
              <p className="text-xs">Complete all characters to finish early • Press Tab/Esc to reset</p>
            </div>
          )}
        </div>
      </div>


      {/* Stats Modal */}
      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
      
      {/* Advanced Analytics Modal */}
      {showAdvancedAnalytics && (
        <AdvancedAnalytics
          onClose={() => setShowAdvancedAnalytics(false)}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
