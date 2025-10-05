import { useEffect, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTyping } from '../contexts/TypingContext'
import CodeDisplay from './CodeDisplay'
import TypingInput from './TypingInput'

export default function TypingContainer() {
  const { currentSnippet, loadSnippet } = useLanguage()
  const { 
    stats, 
    isActive, 
    userInput, 
    setUserInput, 
    updateStats, 
    startSession, 
    resetSession 
  } = useTyping()
  
  const inputRef = useRef(null)

  // Load initial snippet
  useEffect(() => {
    if (!currentSnippet) {
      loadSnippet()
    }
  }, [currentSnippet, loadSnippet])

  // Handle input changes
  const handleInputChange = (value) => {
    if (!currentSnippet) return

    // Start timer on first keystroke
    if (!isActive && value.length > 0) {
      startSession()
    }

    setUserInput(value)
    updateStats(value, currentSnippet.code)

    // Check if completed
    if (value === currentSnippet.code) {
      // Could trigger completion animation/modal here
      console.log('Completed!')
    }
  }

  // Reset function
  const handleReset = () => {
    resetSession()
    loadSnippet() // Load new snippet
    inputRef.current?.focus()
  }

  // Start function
  const handleStart = () => {
    if (!isActive) {
      startSession()
      inputRef.current?.focus()
    }
  }

  // Listen for global events from ControlPanel
  useEffect(() => {
    const handleResetEvent = () => handleReset()
    const handleStartEvent = () => handleStart()

    window.addEventListener('resetTyping', handleResetEvent)
    window.addEventListener('startTyping', handleStartEvent)

    return () => {
      window.removeEventListener('resetTyping', handleResetEvent)
      window.removeEventListener('startTyping', handleStartEvent)
    }
  }, [isActive])

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  if (!currentSnippet) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border p-8 text-center"
             style={{ 
               backgroundColor: 'var(--bg-secondary)', 
               borderColor: 'var(--border)' 
             }}>
          <div className="animate-spin w-8 h-8 border-2 border-t-transparent rounded-full mx-auto mb-4"
               style={{ borderColor: 'var(--accent)' }}></div>
          <p style={{ color: 'var(--text-secondary)' }}>Loading code snippet...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Code Display */}
      <div className="rounded-xl border shadow-sm"
           style={{ 
             backgroundColor: 'var(--bg-secondary)', 
             borderColor: 'var(--border)',
             boxShadow: 'var(--shadow)'
           }}>
        <div className="p-4 border-b" style={{ borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-inter font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                {currentSnippet.description}
              </h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {currentSnippet.language} • {currentSnippet.difficulty}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>WPM: <span className="font-semibold" style={{ color: 'var(--accent)' }}>{stats.wpm}</span></span>
              <span>Accuracy: <span className="font-semibold" style={{ color: 'var(--success)' }}>{stats.accuracy}%</span></span>
              <span>Time: <span className="font-semibold">{formatTime(stats.timeElapsed)}</span></span>
            </div>
          </div>
        </div>
        
        <CodeDisplay 
          code={currentSnippet.code} 
          language={currentSnippet.language}
          userInput={userInput}
        />
      </div>

      {/* Typing Input */}
      <div className="rounded-xl border shadow-sm"
           style={{ 
             backgroundColor: 'var(--bg-primary)', 
             borderColor: 'var(--border)',
             boxShadow: 'var(--shadow)'
           }}>
        <TypingInput
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          targetText={currentSnippet.code}
          isActive={isActive}
          onStart={handleStart}
          onReset={handleReset}
        />
      </div>
    </div>
  )
}
