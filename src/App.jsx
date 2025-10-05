import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { PointsProvider } from './contexts/PointsContext'
import MainTypingScreen from './components/MainTypingScreen'
import AnalysisScreen from './components/AnalysisScreen'
import { snippetsLibrary } from './data/snippets'

function App() {
  const [currentScreen, setCurrentScreen] = useState('typing') // 'typing' or 'analysis'
  const [sessionResults, setSessionResults] = useState(null)
  const [settings, setSettings] = useState({
    language: 'javascript',
    difficulty: 'easy',
    duration: 60
  })

  // Load saved settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('codetype_settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  // Save settings whenever they change
  const updateSettings = (newSettings) => {
    setSettings(newSettings)
    localStorage.setItem('codetype_settings', JSON.stringify(newSettings))
  }

  const handleSessionComplete = (results) => {
    setSessionResults(results)
    setCurrentScreen('analysis')
  }

  const handleRestart = () => {
    setCurrentScreen('typing')
  }

  return (
    <ThemeProvider>
      <PointsProvider>
        <div className="min-h-screen transition-colors duration-300"
             style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

          {currentScreen === 'typing' && (
            <MainTypingScreen
              settings={settings}
              onSettingsChange={updateSettings}
              onComplete={handleSessionComplete}
            />
          )}

          {currentScreen === 'analysis' && sessionResults && (
            <AnalysisScreen
              results={sessionResults}
              settings={settings}
              onRestart={handleRestart}
            />
          )}

        </div>
      </PointsProvider>
    </ThemeProvider>
  )
}

export default App
