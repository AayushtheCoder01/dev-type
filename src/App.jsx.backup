import { useState, useEffect } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { PointsProvider } from './contexts/PointsContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import MainTypingScreen from './components/MainTypingScreen'
import AnalysisScreen from './components/AnalysisScreen'
import Login from './components/Login'
import Signup from './components/Signup'
import { snippetsLibrary } from './data/snippets'

function AppContent() {
  const { currentUser } = useAuth()
  const [currentScreen, setCurrentScreen] = useState('typing') // 'typing', 'analysis', 'login', 'signup'
  const [sessionResults, setSessionResults] = useState(null)
  const [settings, setSettings] = useState({
    language: 'javascript',
    difficulty: 'easy',
    duration: 60
  })

  // Authentication is now optional - users start on typing screen by default
  // They can choose to sign in from the profile menu

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

  const handleLoginSuccess = () => {
    setCurrentScreen('typing')
  }

  const handleSignupSuccess = () => {
    setCurrentScreen('typing')
  }

  const handleNavigateToAuth = (screen) => {
    setCurrentScreen(screen)
  }

  return (
    <ThemeProvider>
      <PointsProvider>
        <div className="min-h-screen transition-colors duration-300"
             style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

          {currentScreen === 'login' && (
            <Login
              onSwitchToSignup={() => setCurrentScreen('signup')}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {currentScreen === 'signup' && (
            <Signup
              onSwitchToLogin={() => setCurrentScreen('login')}
              onSignupSuccess={handleSignupSuccess}
            />
          )}

          {currentScreen === 'typing' && (
            <MainTypingScreen
              settings={settings}
              onSettingsChange={updateSettings}
              onComplete={handleSessionComplete}
              onNavigateToAuth={handleNavigateToAuth}
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
