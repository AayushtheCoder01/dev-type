import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { snippetsLibrary } from '../data/snippets'

export default function StartScreen({ onStartSession }) {
  const { themes, currentTheme, setTheme } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')
  const [duration, setDuration] = useState(60) // seconds

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'java', name: 'Java', icon: '☕' },
  ]

  const difficulties = [
    { id: 'easy', name: 'Easy', description: 'Simple syntax and concepts' },
    { id: 'medium', name: 'Medium', description: 'Intermediate patterns' },
    { id: 'hard', name: 'Hard', description: 'Complex algorithms' },
  ]

  const durations = [
    { value: 30, label: '30s' },
    { value: 60, label: '1m' },
    { value: 120, label: '2m' },
    { value: 300, label: '5m' },
  ]

  const handleStart = () => {
    // Get available snippets for selected language/difficulty
    const availableSnippets = snippetsLibrary[selectedLanguage]?.[selectedDifficulty] || []
    
    if (availableSnippets.length === 0) {
      alert('No snippets available for this combination. Please select different options.')
      return
    }

    // Pick random snippet
    const randomSnippet = availableSnippets[Math.floor(Math.random() * availableSnippets.length)]

    const config = {
      language: selectedLanguage,
      difficulty: selectedDifficulty,
      duration,
      snippet: randomSnippet,
      theme: currentTheme.id
    }

    onStartSession(config)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            CodeType
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Practice typing code like a pro
          </p>
        </div>

        {/* Configuration Panel */}
        <div className="rounded-2xl border p-8 space-y-8" 
             style={{ 
               backgroundColor: 'var(--bg-secondary)', 
               borderColor: 'var(--border)',
               boxShadow: 'var(--shadow)'
             }}>
          
          {/* Language Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Language
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLanguage(lang.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedLanguage === lang.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: selectedLanguage === lang.id ? 'var(--accent)' : 'var(--bg-primary)',
                    borderColor: selectedLanguage === lang.id ? 'var(--accent)' : 'var(--border)',
                    color: selectedLanguage === lang.id ? 'white' : 'var(--text-primary)'
                  }}
                >
                  <div className="text-2xl mb-2">{lang.icon}</div>
                  <div className="font-medium text-sm">{lang.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Difficulty
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    selectedDifficulty === diff.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: selectedDifficulty === diff.id ? 'var(--accent)' : 'var(--bg-primary)',
                    borderColor: selectedDifficulty === diff.id ? 'var(--accent)' : 'var(--border)',
                    color: selectedDifficulty === diff.id ? 'white' : 'var(--text-primary)'
                  }}
                >
                  <div className="font-semibold">{diff.name}</div>
                  <div className="text-sm opacity-75">{diff.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Duration
            </h3>
            <div className="flex gap-3">
              {durations.map((dur) => (
                <button
                  key={dur.value}
                  onClick={() => setDuration(dur.value)}
                  className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200 ${
                    duration === dur.value ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: duration === dur.value ? 'var(--accent)' : 'var(--bg-primary)',
                    borderColor: duration === dur.value ? 'var(--accent)' : 'var(--border)',
                    color: duration === dur.value ? 'white' : 'var(--text-primary)'
                  }}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
              Theme
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    currentTheme.id === theme.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: theme.colors['--bg-primary'],
                    borderColor: currentTheme.id === theme.id ? theme.colors['--accent'] : theme.colors['--border'],
                    color: theme.colors['--text-primary']
                  }}
                >
                  <div className="font-semibold text-sm mb-2">{theme.name}</div>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--accent'] }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--success'] }}></div>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors['--error'] }}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4">
            <button
              onClick={handleStart}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'white'
              }}
            >
              Start Typing Session
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
