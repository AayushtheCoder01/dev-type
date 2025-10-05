import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SkillAssessment({ onComplete }) {
  const [step, setStep] = useState(0) // 0: intro, 1: typing test, 2: preferences, 3: results
  const [testStarted, setTestStarted] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [startTime, setStartTime] = useState(null)
  const [preferences, setPreferences] = useState({
    language: 'javascript',
    experience: 'intermediate',
    goals: []
  })
  
  const inputRef = useRef(null)
  const timerRef = useRef(null)

  // Assessment code snippet
  const assessmentCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result);`

  // Timer logic
  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTestComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [testStarted, timeLeft])

  const handleStartTest = () => {
    setTestStarted(true)
    setStartTime(Date.now())
    setStep(1)
    inputRef.current?.focus()
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    if (value.length <= assessmentCode.length) {
      setUserInput(value)
      
      // Auto-complete if user finishes early
      if (value === assessmentCode) {
        handleTestComplete()
      }
    }
  }

  const handleTestComplete = () => {
    setTestStarted(false)
    clearInterval(timerRef.current)
    setStep(2)
  }

  const calculateResults = () => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 30
    const actualTime = Math.min(timeElapsed, 30)
    
    let correctChars = 0
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === assessmentCode[i]) correctChars++
    }
    
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 0
    const wpm = Math.round((correctChars / 5) / (actualTime / 60))
    
    // Determine skill level
    let level = 'beginner'
    if (wpm >= 40 && accuracy >= 90) level = 'advanced'
    else if (wpm >= 25 && accuracy >= 80) level = 'intermediate'
    
    return { wpm, accuracy, level, correctChars, totalChars: userInput.length }
  }

  const handleComplete = () => {
    const results = calculateResults()
    onComplete({
      ...results,
      preferences
    })
  }

  const renderCharacter = (char, index) => {
    let className = 'char-pending'
    
    if (index < userInput.length) {
      className = userInput[index] === char ? 'char-correct' : 'char-incorrect'
    } else if (index === userInput.length && testStarted) {
      className = 'char-current'
    }

    return (
      <span key={index} className={className}>
        {char}
      </span>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        
        <AnimatePresence mode="wait">
          
          {/* Step 0: Introduction */}
          {step === 0 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="text-6xl mb-4">🎯</div>
                <h1 className="text-4xl font-bold mb-4">Quick Skill Assessment</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Let's see where you stand! Type the code below as accurately and quickly as possible. 
                  This helps us personalize your learning journey.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8 border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">What to expect:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⏱️</div>
                    <div className="font-medium">30 seconds</div>
                    <div className="text-gray-400">Quick assessment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">📝</div>
                    <div className="font-medium">JavaScript code</div>
                    <div className="text-gray-400">Simple function</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎮</div>
                    <div className="font-medium">Personalized path</div>
                    <div className="text-gray-400">Based on results</div>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleStartTest}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Assessment
              </motion.button>
            </motion.div>
          )}

          {/* Step 1: Typing Test */}
          {step === 1 && (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Timer */}
              <div className="text-center mb-8">
                <div className={`text-6xl font-bold ${timeLeft <= 5 ? 'text-red-400' : 'text-blue-400'}`}>
                  {timeLeft}
                </div>
                <div className="text-gray-400">seconds remaining</div>
              </div>

              {/* Code Display */}
              <div className="relative mb-8">
                <div className="bg-gray-900 rounded-2xl p-8 font-mono text-lg leading-relaxed border border-gray-700">
                  {assessmentCode.split('').map((char, index) => renderCharacter(char, index))}
                </div>

                {/* Hidden Input */}
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  className="absolute inset-0 opacity-0 resize-none"
                  spellCheck={false}
                  autoComplete="off"
                  disabled={!testStarted}
                />
              </div>

              {/* Progress */}
              <div className="bg-gray-800 rounded-full h-3 mb-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((userInput.length / assessmentCode.length) * 100, 100)}%` }}
                />
              </div>
              <div className="text-center text-sm text-gray-400">
                {userInput.length} / {assessmentCode.length} characters
              </div>
            </motion.div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Tell us about yourself</h2>
                <p className="text-gray-300">Help us customize your experience</p>
              </div>

              <div className="space-y-8">
                {/* Favorite Language */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Favorite Programming Language</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['javascript', 'python', 'typescript', 'java'].map(lang => (
                      <button
                        key={lang}
                        onClick={() => setPreferences(prev => ({ ...prev, language: lang }))}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          preferences.language === lang 
                            ? 'border-blue-500 bg-blue-500/20' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium capitalize">{lang}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Experience Level</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'beginner', label: 'Beginner', desc: '< 1 year coding' },
                      { id: 'intermediate', label: 'Intermediate', desc: '1-3 years coding' },
                      { id: 'advanced', label: 'Advanced', desc: '3+ years coding' }
                    ].map(level => (
                      <button
                        key={level.id}
                        onClick={() => setPreferences(prev => ({ ...prev, experience: level.id }))}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          preferences.experience === level.id 
                            ? 'border-blue-500 bg-blue-500/20' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium">{level.label}</div>
                        <div className="text-sm text-gray-400">{level.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">What are your goals? (Select all that apply)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'speed', label: 'Increase typing speed', icon: '⚡' },
                      { id: 'accuracy', label: 'Improve accuracy', icon: '🎯' },
                      { id: 'languages', label: 'Learn new languages', icon: '🌍' },
                      { id: 'interview', label: 'Prepare for interviews', icon: '💼' }
                    ].map(goal => (
                      <button
                        key={goal.id}
                        onClick={() => {
                          setPreferences(prev => ({
                            ...prev,
                            goals: prev.goals.includes(goal.id)
                              ? prev.goals.filter(g => g !== goal.id)
                              : [...prev.goals, goal.id]
                          }))
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          preferences.goals.includes(goal.id)
                            ? 'border-blue-500 bg-blue-500/20' 
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{goal.icon}</span>
                          <span className="font-medium">{goal.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <motion.button
                  onClick={handleComplete}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Complete Setup
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
