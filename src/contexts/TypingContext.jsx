import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

const TypingContext = createContext({
  stats: {
    wpm: 0,
    accuracy: 100,
    timeElapsed: 0,
    errorCount: 0,
    correctChars: 0,
    totalChars: 0
  },
  isActive: false,
  userInput: '',
  startTime: null,
  updateStats: () => {},
  setIsActive: () => {},
  setUserInput: () => {},
  resetSession: () => {},
  startSession: () => {}
})

export const TypingProvider = ({ children }) => {
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    timeElapsed: 0,
    errorCount: 0,
    correctChars: 0,
    totalChars: 0
  })
  const [isActive, setIsActive] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState(null)
  const timerRef = useRef(null)

  // Timer logic
  useEffect(() => {
    if (isActive && startTime) {
      timerRef.current = setInterval(() => {
        const now = Date.now()
        const elapsed = Math.floor((now - startTime) / 1000)
        setStats(prev => ({ ...prev, timeElapsed: elapsed }))
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [isActive, startTime])

  const calculateStats = useCallback((input, targetText) => {
    if (!targetText || !input) return stats

    const totalChars = input.length
    let correctChars = 0
    let errorCount = 0

    // Character-by-character comparison
    for (let i = 0; i < input.length; i++) {
      if (i < targetText.length && input[i] === targetText[i]) {
        correctChars++
      } else {
        errorCount++
      }
    }

    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100
    const timeInMinutes = stats.timeElapsed / 60
    const wpm = timeInMinutes > 0 ? Math.round((correctChars / 5) / timeInMinutes) : 0

    return {
      wpm,
      accuracy,
      timeElapsed: stats.timeElapsed,
      errorCount,
      correctChars,
      totalChars
    }
  }, [stats.timeElapsed])

  const updateStats = useCallback((input, targetText) => {
    const newStats = calculateStats(input, targetText)
    setStats(newStats)
  }, [calculateStats])

  const startSession = useCallback(() => {
    setIsActive(true)
    setStartTime(Date.now())
  }, [])

  const resetSession = useCallback(() => {
    setUserInput('')
    setIsActive(false)
    setStartTime(null)
    setStats({
      wpm: 0,
      accuracy: 100,
      timeElapsed: 0,
      errorCount: 0,
      correctChars: 0,
      totalChars: 0
    })
  }, [])

  const value = {
    stats,
    isActive,
    userInput,
    startTime,
    updateStats,
    setIsActive,
    setUserInput,
    resetSession,
    startSession
  }

  return (
    <TypingContext.Provider value={value}>
      {children}
    </TypingContext.Provider>
  )
}

export const useTyping = () => useContext(TypingContext)
