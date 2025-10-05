import { forwardRef, useEffect, useRef } from 'react'

const TypingInput = forwardRef(({ 
  value, 
  onChange, 
  targetText, 
  isActive, 
  onStart, 
  onReset 
}, ref) => {
  const textareaRef = useRef(null)
  const overlayRef = useRef(null)

  // Combine refs
  useEffect(() => {
    if (ref) {
      ref.current = textareaRef.current
    }
  }, [ref])

  // Handle input changes
  const handleChange = (e) => {
    const newValue = e.target.value
    
    // Prevent input beyond target text length
    if (newValue.length <= targetText.length) {
      onChange(newValue)
    }
  }

  // Handle key events
  const handleKeyDown = (e) => {
    // Prevent paste
    if (e.ctrlKey && e.key === 'v') {
      e.preventDefault()
      return
    }

    // Start typing on first key
    if (!isActive && e.key.length === 1) {
      onStart()
    }
  }

  // Create character overlay
  const renderOverlay = () => {
    if (!targetText) return null

    return targetText.split('').map((char, index) => {
      let className = 'char-pending'
      
      if (index < value.length) {
        className = value[index] === char ? 'char-correct' : 'char-incorrect'
      }

      return (
        <span key={index} className={className}>
          {char}
        </span>
      )
    })
  }

  // Auto-focus when active
  useEffect(() => {
    if (isActive && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isActive])

  // Sync scroll between textarea and overlay
  const handleScroll = () => {
    if (overlayRef.current && textareaRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b" 
           style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center space-x-4">
          <h3 className="font-inter font-semibold" style={{ color: 'var(--text-primary)' }}>
            Type the code above
          </h3>
          {!isActive && (
            <span className="text-sm px-3 py-1 rounded-full" 
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    color: 'var(--text-secondary)' 
                  }}>
              Click to start typing
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 focus-ring"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              borderColor: 'var(--border)',
              color: 'var(--text-primary)'
            }}
          >
            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative p-6">
        {/* Overlay for character highlighting */}
        <div
          ref={overlayRef}
          className="typing-overlay font-mono text-sm leading-relaxed resize-none"
          style={{ 
            color: 'var(--text-secondary)',
            minHeight: '200px',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
        >
          {renderOverlay()}
        </div>

        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          placeholder={!isActive ? "Click here and start typing..." : ""}
          className="w-full h-full min-h-[200px] resize-none bg-transparent border-none outline-none font-mono text-sm leading-relaxed"
          style={{ 
            color: 'transparent',
            caretColor: 'var(--accent)',
            fontSize: '14px',
            lineHeight: '1.6'
          }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          disabled={!targetText}
        />

        {/* Cursor indicator when not active */}
        {!isActive && (
          <div className="absolute top-6 left-6 w-0.5 h-5 animate-pulse"
               style={{ backgroundColor: 'var(--accent)' }} />
        )}
      </div>

      {/* Progress bar */}
      <div className="h-2" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            backgroundColor: 'var(--success)',
            width: targetText ? `${Math.min((value.length / targetText.length) * 100, 100)}%` : '0%'
          }}
        />
      </div>
    </div>
  )
})

TypingInput.displayName = 'TypingInput'

export default TypingInput
