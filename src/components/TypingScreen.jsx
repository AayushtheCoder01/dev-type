import { useState, useEffect, useRef, useCallback } from 'react'

export default function TypingScreen({ config, onComplete }) {
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(config.duration)
  const [startTime, setStartTime] = useState(null)
  const [isActive, setIsActive] = useState(false)
  const [stats, setStats] = useState({
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    accuracy: 100,
    wpm: 0
  })

  const inputRef = useRef(null)
  const timerRef = useRef(null)
  const targetText = config.snippet.code

  // Start session on mount
  useEffect(() => {
    inputRef.current?.focus()
    setStartTime(Date.now())
    setIsActive(true)
  }, [])

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
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
  }, [isActive, timeLeft])

  // Calculate stats in real-time
  const calculateStats = useCallback((input) => {
    let correctChars = 0
    let incorrectChars = 0
    const totalChars = input.length

    for (let i = 0; i < input.length; i++) {
      if (i < targetText.length && input[i] === targetText[i]) {
        correctChars++
      } else {
        incorrectChars++
      }
    }

    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0 // minutes
    const wpm = timeElapsed > 0 ? Math.round((correctChars / 5) / timeElapsed) : 0

    return { correctChars, incorrectChars, totalChars, accuracy, wpm }
  }, [targetText, startTime])

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value
    
    // Prevent input beyond target text length
    if (value.length <= targetText.length) {
      setUserInput(value)
      const newStats = calculateStats(value)
      setStats(newStats)

      // Check if completed
      if (value === targetText) {
        handleComplete()
      }
    }
  }

  // Handle completion
  const handleComplete = useCallback(() => {
    setIsActive(false)
    clearInterval(timerRef.current)
    
    const finalStats = calculateStats(userInput)
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : config.duration
    
    const results = {
      ...finalStats,
      timeElapsed,
      targetText,
      userInput,
      completed: userInput === targetText,
      timeLeft,
      originalDuration: config.duration
    }

    onComplete(results)
  }, [userInput, calculateStats, startTime, config.duration, targetText, timeLeft, onComplete])

  // Render character with styling
  const renderCharacter = (char, index) => {
    let className = 'char-pending'
    
    if (index < userInput.length) {
      className = userInput[index] === char ? 'char-correct' : 'char-incorrect'
    } else if (index === userInput.length) {
      className = 'char-current'
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    )
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Timer Header */}
      <div className="flex justify-center pt-8 pb-4">
        <div className={`text-4xl font-mono font-bold transition-colors duration-200 ${
          timeLeft <= 10 ? 'text-red-500' : ''
        }`} style={{ color: timeLeft <= 10 ? 'var(--error)' : 'var(--text-primary)' }}>
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Typing Area */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-4xl">
          
          {/* Code Display */}
          <div className="relative">
            <div 
              className="font-mono text-lg leading-relaxed p-8 rounded-2xl border-2 min-h-[300px] whitespace-pre-wrap"
              style={{ 
                backgroundColor: 'var(--code-bg)', 
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              {targetText.split('').map((char, index) => renderCharacter(char, index))}
            </div>

            {/* Hidden Input */}
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              className="absolute inset-0 opacity-0 resize-none"
              style={{ caretColor: 'transparent' }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              disabled={!isActive}
            />
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full h-2 rounded-full" style={{ backgroundColor: 'var(--border)' }}>
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: 'var(--accent)',
                  width: `${Math.min((userInput.length / targetText.length) * 100, 100)}%`
                }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span>{userInput.length} / {targetText.length} characters</span>
              <span>{Math.round((userInput.length / targetText.length) * 100)}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center pb-8">
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Type the code above. Press Escape to quit.
        </p>
      </div>

      {/* Keyboard shortcut to quit */}
      <div className="hidden">
        <input
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleComplete()
            }
          }}
          autoFocus
        />
      </div>
    </div>
  )
}
