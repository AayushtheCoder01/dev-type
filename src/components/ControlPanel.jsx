import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'

export default function ControlPanel() {
  const { 
    difficultyOptions, 
    selectedDifficulty, 
    setDifficulty, 
    loadSnippet,
    currentSnippet 
  } = useLanguage()

  const handleNewSnippet = () => {
    loadSnippet()
  }

  const handleReset = () => {
    // This would be handled by TypingContainer
    window.dispatchEvent(new CustomEvent('resetTyping'))
  }

  const handleStart = () => {
    // This would be handled by TypingContainer
    window.dispatchEvent(new CustomEvent('startTyping'))
  }

  return (
    <div className="space-y-6">
      {/* Difficulty Selector */}
      <div className="p-6 rounded-xl border shadow-sm"
           style={{ 
             backgroundColor: 'var(--bg-secondary)', 
             borderColor: 'var(--border)',
             boxShadow: 'var(--shadow)'
           }}>
        <h3 className="font-inter font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Difficulty Level
        </h3>
        
        <div className="flex space-x-3">
          {difficultyOptions.map((difficulty) => (
            <motion.button
              key={difficulty.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDifficulty(difficulty.id)}
              className={`flex-1 py-3 px-4 rounded-lg border-2 font-inter font-medium transition-all duration-200 focus-ring ${
                selectedDifficulty === difficulty.id ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: selectedDifficulty === difficulty.id ? 'var(--accent)' : 'var(--bg-primary)',
                borderColor: selectedDifficulty === difficulty.id ? 'var(--accent)' : 'var(--border)',
                color: selectedDifficulty === difficulty.id ? 'white' : 'var(--text-primary)',
                ringColor: 'var(--accent)'
              }}
            >
              {difficulty.label}
            </motion.button>
          ))}
        </div>
        
        <div className="mt-3 text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
          {selectedDifficulty === 'easy' && 'Simple syntax and basic concepts'}
          {selectedDifficulty === 'medium' && 'Intermediate patterns and logic'}
          {selectedDifficulty === 'hard' && 'Complex algorithms and advanced features'}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Start Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl border-2 font-inter font-semibold transition-all duration-200 focus-ring"
          style={{
            backgroundColor: 'var(--success)',
            borderColor: 'var(--success)',
            color: 'white'
          }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          <span>Start</span>
        </motion.button>

        {/* Reset Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl border-2 font-inter font-semibold transition-all duration-200 focus-ring"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset</span>
        </motion.button>

        {/* New Snippet Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNewSnippet}
          className="flex items-center justify-center space-x-2 py-4 px-6 rounded-xl border-2 font-inter font-semibold transition-all duration-200 focus-ring"
          style={{
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--accent)',
            color: 'white'
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>New Snippet</span>
        </motion.button>
      </div>

      {/* Current Snippet Info */}
      {currentSnippet && (
        <div className="p-4 rounded-lg border"
             style={{ 
               backgroundColor: 'var(--bg-primary)', 
               borderColor: 'var(--border)'
             }}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-inter font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                Current Challenge
              </h4>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {currentSnippet.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: 'var(--accent)', 
                      color: 'white' 
                    }}>
                {currentSnippet.language}
              </span>
              <span className="px-2 py-1 rounded text-xs font-medium"
                    style={{ 
                      backgroundColor: selectedDifficulty === 'easy' ? 'var(--success)' : 
                                      selectedDifficulty === 'medium' ? 'var(--accent)' : 'var(--error)', 
                      color: 'white' 
                    }}>
                {currentSnippet.difficulty}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts */}
      <div className="p-4 rounded-lg border"
           style={{ 
             backgroundColor: 'var(--bg-secondary)', 
             borderColor: 'var(--border)'
           }}>
        <h4 className="font-inter font-medium text-sm mb-3" style={{ color: 'var(--text-primary)' }}>
          Keyboard Shortcuts
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>New Snippet:</span>
            <kbd className="px-2 py-1 rounded font-mono" 
                 style={{ backgroundColor: 'var(--code-bg)', color: 'var(--text-primary)' }}>
              Ctrl + N
            </kbd>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Reset:</span>
            <kbd className="px-2 py-1 rounded font-mono" 
                 style={{ backgroundColor: 'var(--code-bg)', color: 'var(--text-primary)' }}>
              Ctrl + R
            </kbd>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Start/Focus:</span>
            <kbd className="px-2 py-1 rounded font-mono" 
                 style={{ backgroundColor: 'var(--code-bg)', color: 'var(--text-primary)' }}>
              Ctrl + Enter
            </kbd>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--text-secondary)' }}>Theme:</span>
            <kbd className="px-2 py-1 rounded font-mono" 
                 style={{ backgroundColor: 'var(--code-bg)', color: 'var(--text-primary)' }}>
              Ctrl + T
            </kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
