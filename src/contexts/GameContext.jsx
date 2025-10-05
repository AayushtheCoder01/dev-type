import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext({
  user: null,
  achievements: [],
  streaks: {},
  leaderboard: [],
  addAchievement: () => {},
  updateStreak: () => {},
  getLevel: () => 1,
  getXPForNextLevel: () => 100,
  getTrendingChallenges: () => [],
  getRecommendations: () => []
})

// Achievement definitions
const ACHIEVEMENTS = {
  FIRST_SESSION: { id: 'first_session', name: 'Getting Started', description: 'Complete your first typing session', icon: '🎯', xp: 25 },
  SPEED_DEMON: { id: 'speed_demon', name: 'Speed Demon', description: 'Type at 60+ WPM', icon: '⚡', xp: 100 },
  PERFECTIONIST: { id: 'perfectionist', name: 'Perfectionist', description: 'Achieve 100% accuracy', icon: '💎', xp: 75 },
  STREAK_7: { id: 'streak_7', name: 'Week Warrior', description: '7 day streak', icon: '🔥', xp: 150 },
  POLYGLOT: { id: 'polyglot', name: 'Code Polyglot', description: 'Practice 5 different languages', icon: '🌍', xp: 200 },
  MARATHON: { id: 'marathon', name: 'Code Marathon', description: 'Type for 30+ minutes in one session', icon: '🏃', xp: 300 },
  SYNTAX_SAVANT: { id: 'syntax_savant', name: 'Syntax Savant', description: 'Complete 50 sessions', icon: '🧠', xp: 500 }
}

// Level calculation (exponential growth)
const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

const getXPForLevel = (level) => {
  return Math.pow(level - 1, 2) * 100
}

export const GameProvider = ({ children, user }) => {
  const [achievements, setAchievements] = useState([])
  const [streaks, setStreaks] = useState({})
  const [leaderboard, setLeaderboard] = useState([])

  // Load game data on mount
  useEffect(() => {
    const savedAchievements = localStorage.getItem('codeflow_achievements')
    const savedStreaks = localStorage.getItem('codeflow_streaks')
    const savedLeaderboard = localStorage.getItem('codeflow_leaderboard')

    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
    if (savedStreaks) setStreaks(JSON.parse(savedStreaks))
    if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard))
  }, [])

  const addAchievement = (achievementId) => {
    if (!user || achievements.some(a => a.id === achievementId)) return

    const achievement = ACHIEVEMENTS[achievementId]
    if (!achievement) return

    const newAchievement = {
      ...achievement,
      unlockedAt: new Date().toISOString(),
      userId: user.id
    }

    const updatedAchievements = [...achievements, newAchievement]
    setAchievements(updatedAchievements)
    localStorage.setItem('codeflow_achievements', JSON.stringify(updatedAchievements))

    // Show achievement notification (you could add a toast system here)
    console.log(`🎉 Achievement Unlocked: ${achievement.name}`)
    
    return newAchievement
  }

  const updateStreak = (type = 'daily') => {
    if (!user) return

    const today = new Date().toDateString()
    const currentStreak = streaks[type] || { count: 0, lastDate: null }
    
    // Check if streak continues
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    let newCount = 1
    if (currentStreak.lastDate === yesterday.toDateString()) {
      newCount = currentStreak.count + 1
    } else if (currentStreak.lastDate === today) {
      // Already counted today
      return currentStreak.count
    }

    const updatedStreak = {
      count: newCount,
      lastDate: today
    }

    const updatedStreaks = {
      ...streaks,
      [type]: updatedStreak
    }

    setStreaks(updatedStreaks)
    localStorage.setItem('codeflow_streaks', JSON.stringify(updatedStreaks))

    // Check for streak achievements
    if (newCount === 7) addAchievement('STREAK_7')

    return newCount
  }

  const getLevel = () => {
    return user ? calculateLevel(user.xp) : 1
  }

  const getXPForNextLevel = () => {
    const currentLevel = getLevel()
    return getXPForLevel(currentLevel + 1)
  }

  const getTrendingChallenges = () => {
    // Mock trending data - in real app, this would come from analytics
    return [
      { id: 'js-async', name: 'Async/Await Mastery', language: 'javascript', difficulty: 'medium', popularity: 95 },
      { id: 'py-comprehensions', name: 'List Comprehensions', language: 'python', difficulty: 'easy', popularity: 87 },
      { id: 'ts-generics', name: 'TypeScript Generics', language: 'typescript', difficulty: 'hard', popularity: 78 },
      { id: 'react-hooks', name: 'React Hooks Patterns', language: 'javascript', difficulty: 'medium', popularity: 92 }
    ]
  }

  const getRecommendations = () => {
    if (!user) return []

    const favoriteLanguage = user.stats.favoriteLanguage
    const userLevel = getLevel()
    
    // AI-like recommendations based on user data
    const recommendations = []
    
    if (user.stats.avgAccuracy < 85) {
      recommendations.push({
        type: 'improvement',
        title: 'Focus on Accuracy',
        description: 'Try easier snippets to build muscle memory',
        action: 'practice_accuracy'
      })
    }
    
    if (user.stats.avgWpm < 40) {
      recommendations.push({
        type: 'speed',
        title: 'Speed Training',
        description: 'Practice common code patterns',
        action: 'speed_drills'
      })
    }

    if (userLevel >= 3 && !user.preferences.languages?.includes('typescript')) {
      recommendations.push({
        type: 'language',
        title: 'Try TypeScript',
        description: 'Expand your skills with static typing',
        action: 'learn_typescript'
      })
    }

    return recommendations
  }

  const value = {
    user,
    achievements,
    streaks,
    leaderboard,
    addAchievement,
    updateStreak,
    getLevel,
    getXPForNextLevel,
    getTrendingChallenges,
    getRecommendations,
    ACHIEVEMENTS
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => useContext(GameContext)
