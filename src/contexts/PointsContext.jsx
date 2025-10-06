import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { useAuth } from './AuthContext'
import { saveTestResult, getUserStats, updateUserStats, unlockAchievement } from '../lib/supabaseHelpers'

const PointsContext = createContext()

const POINTS_STORAGE_KEY = 'codetype_points'
const STATS_STORAGE_KEY = 'codetype_stats'

// Points calculation based on performance
const calculatePoints = (results) => {
  const { wpm, accuracy, timeElapsed, correctChars, completed } = results
  
  let points = 0
  
  // Base points for completion
  if (completed || correctChars > 0) {
    points += 10 // Base participation points
  }
  
  // WPM bonus (1 point per WPM)
  points += Math.floor(wpm)
  
  // Accuracy bonus
  if (accuracy >= 95) points += 50
  else if (accuracy >= 90) points += 30
  else if (accuracy >= 80) points += 15
  else if (accuracy >= 70) points += 5
  
  // Speed bonus
  if (wpm >= 80) points += 40
  else if (wpm >= 60) points += 25
  else if (wpm >= 40) points += 10
  
  // Perfect score bonus
  if (accuracy === 100 && wpm >= 40) points += 100
  
  // Completion bonus (finished all characters)
  if (completed) points += 25
  
  return Math.max(points, 0)
}

// Level calculation (similar to Duolingo)
const calculateLevel = (totalPoints) => {
  const level = Math.floor(Math.sqrt(totalPoints / 50)) + 1
  return level
}

const getPointsForNextLevel = (currentLevel) => {
  return Math.pow(currentLevel, 2) * 50
}

export const PointsProvider = ({ children }) => {
  const { currentUser, updateUserStats: updateAuthUserStats } = useAuth()
  const [totalPoints, setTotalPoints] = useState(0)
  const [stats, setStats] = useState({
    totalRaces: 0,
    totalWords: 0,
    totalTime: 0,
    bestWPM: 0,
    bestAccuracy: 0,
    perfectRaces: 0,
    streak: 0,
    lastRaceDate: null,
    achievements: []
  })
  
  const lastLoadedUserId = useRef(null)

  // Load data from Supabase or localStorage
  useEffect(() => {
    const loadData = async () => {
      if (currentUser) {
        // Only reload if user changed
        if (lastLoadedUserId.current === currentUser.id) return
        lastLoadedUserId.current = currentUser.id

        try {
          // Load from Supabase
          const userStats = await getUserStats(currentUser.id)
          
          setTotalPoints(currentUser.xp || 0)
          setStats({
            totalRaces: userStats.total_races || 0,
            totalWords: userStats.total_words || 0,
            totalTime: userStats.total_time || 0,
            bestWPM: currentUser.bestWpm || 0,
            bestAccuracy: currentUser.bestAccuracy || 0,
            perfectRaces: userStats.perfect_races || 0,
            streak: currentUser.currentStreak || 0,
            lastRaceDate: userStats.last_race_date || null,
            achievements: []
          })
        } catch (error) {
          console.error('Error loading user stats:', error)
          // Fallback to default stats
          setTotalPoints(0)
          setStats({
            totalRaces: 0,
            totalWords: 0,
            totalTime: 0,
            bestWPM: 0,
            bestAccuracy: 0,
            perfectRaces: 0,
            streak: 0,
            lastRaceDate: null,
            achievements: []
          })
        }
      } else {
        // Load guest data from localStorage
        lastLoadedUserId.current = null
        const savedPoints = localStorage.getItem(POINTS_STORAGE_KEY)
        const savedStats = localStorage.getItem(STATS_STORAGE_KEY)
        
        if (savedPoints) {
          setTotalPoints(parseInt(savedPoints))
        } else {
          setTotalPoints(0)
        }
        
        if (savedStats) {
          setStats(JSON.parse(savedStats))
        } else {
          setStats({
            totalRaces: 0,
            totalWords: 0,
            totalTime: 0,
            bestWPM: 0,
            bestAccuracy: 0,
            perfectRaces: 0,
            streak: 0,
            lastRaceDate: null,
            achievements: []
          })
        }
      }
    }

    loadData()
  }, [currentUser?.id])

  // Save to localStorage for guest users
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem(POINTS_STORAGE_KEY, totalPoints.toString())
    }
  }, [totalPoints, currentUser])

  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats))
    }
  }, [stats, currentUser])

  const addPoints = useCallback(async (results) => {
    const earnedPoints = calculatePoints(results)
    
    const today = new Date().toDateString()
    const isNewDay = stats.lastRaceDate !== today
    
    const newStats = {
      totalRaces: stats.totalRaces + 1,
      totalWords: stats.totalWords + Math.floor(results.correctChars / 5),
      totalTime: stats.totalTime + results.timeElapsed,
      bestWPM: Math.max(stats.bestWPM, results.wpm),
      bestAccuracy: Math.max(stats.bestAccuracy, results.accuracy),
      perfectRaces: results.accuracy === 100 ? stats.perfectRaces + 1 : stats.perfectRaces,
      streak: isNewDay ? stats.streak + 1 : stats.streak,
      lastRaceDate: today,
      achievements: stats.achievements
    }
    
    const newTotalPoints = totalPoints + earnedPoints
    const newLevel = calculateLevel(newTotalPoints)
    
    // Check for achievements
    const newAchievements = checkAchievements(newStats, stats)
    if (newAchievements.length > 0) {
      newStats.achievements = [...stats.achievements, ...newAchievements]
    }
    
    // Update local state
    setTotalPoints(newTotalPoints)
    setStats(newStats)
    
    // Save test to localStorage history
    const testHistory = JSON.parse(localStorage.getItem('codetype_test_history') || '[]')
    testHistory.push({
      id: Date.now(),
      timestamp: new Date().toISOString(),
      wpm: results.wpm,
      accuracy: results.accuracy,
      timeElapsed: results.timeElapsed,
      correctChars: results.correctChars,
      incorrectChars: results.incorrectChars,
      totalChars: results.totalChars,
      language: results.language || 'javascript',
      difficulty: results.difficulty || 'easy',
      mode: results.mode || 'practice',
      completed: results.completed || false,
      charStats: results.charStats || [],
      snippetId: results.snippetId || null
    })
    localStorage.setItem('codetype_test_history', JSON.stringify(testHistory))
    
    // Save to Supabase if user is logged in
    if (currentUser) {
      try {
        // Save test result
        await saveTestResult(currentUser.id, {
          wpm: results.wpm,
          accuracy: results.accuracy,
          time_elapsed: results.timeElapsed,
          correct_chars: results.correctChars,
          incorrect_chars: results.incorrectChars,
          total_chars: results.totalChars,
          language: results.language || 'javascript',
          difficulty: results.difficulty || 'easy',
          mode: results.mode || 'practice',
          completed: results.completed || false,
          char_stats: results.charStats || [],
          snippet_id: results.snippetId || null
        })
        
        // Update user stats in Supabase
        await updateUserStats(currentUser.id, {
          total_races: newStats.totalRaces,
          total_words: newStats.totalWords,
          total_time: newStats.totalTime,
          perfect_races: newStats.perfectRaces,
          last_race_date: today
        })
        
        // Update user profile (XP, level, best scores)
        await updateAuthUserStats({
          xp: newTotalPoints,
          level: newLevel,
          stats: {
            avgWpm: newStats.bestWPM,
            avgAccuracy: newStats.bestAccuracy
          }
        })
        
        // Unlock achievements in Supabase
        for (const achievement of newAchievements) {
          await unlockAchievement(currentUser.id, achievement)
        }
      } catch (error) {
        console.error('Error saving to Supabase:', error)
      }
    }
    
    return {
      earnedPoints,
      newTotalPoints,
      level: newLevel,
      newAchievements
    }
  }, [totalPoints, stats, currentUser, updateAuthUserStats])

  const checkAchievements = (newStats, oldStats) => {
    const achievements = []
    
    // First race
    if (newStats.totalRaces === 1) {
      achievements.push({ id: 'first_race', name: 'First Steps', description: 'Complete your first race', points: 50 })
    }
    
    // 10 races
    if (newStats.totalRaces === 10 && oldStats.totalRaces < 10) {
      achievements.push({ id: 'ten_races', name: 'Getting Started', description: 'Complete 10 races', points: 100 })
    }
    
    // 50 races
    if (newStats.totalRaces === 50 && oldStats.totalRaces < 50) {
      achievements.push({ id: 'fifty_races', name: 'Dedicated Typer', description: 'Complete 50 races', points: 250 })
    }
    
    // First perfect race
    if (newStats.perfectRaces === 1 && oldStats.perfectRaces === 0) {
      achievements.push({ id: 'perfect', name: 'Perfectionist', description: '100% accuracy in a race', points: 150 })
    }
    
    // 60+ WPM
    if (newStats.bestWPM >= 60 && oldStats.bestWPM < 60) {
      achievements.push({ id: 'speed_demon', name: 'Speed Demon', description: 'Reach 60 WPM', points: 200 })
    }
    
    // 7 day streak
    if (newStats.streak === 7 && oldStats.streak < 7) {
      achievements.push({ id: 'week_streak', name: 'Week Warrior', description: '7 day streak', points: 300 })
    }
    
    return achievements
  }

  const resetProgress = async () => {
    setTotalPoints(0)
    setStats({
      totalRaces: 0,
      totalWords: 0,
      totalTime: 0,
      bestWPM: 0,
      bestAccuracy: 0,
      perfectRaces: 0,
      streak: 0,
      lastRaceDate: null,
      achievements: []
    })
    
    if (currentUser) {
      // Reset in Supabase would require deleting records
      // For now, just reset local state
      console.log('Reset progress for user:', currentUser.id)
    } else {
      localStorage.removeItem(POINTS_STORAGE_KEY)
      localStorage.removeItem(STATS_STORAGE_KEY)
    }
  }

  const level = calculateLevel(totalPoints)
  const currentLevelPoints = getPointsForNextLevel(level - 1)
  const nextLevelPoints = getPointsForNextLevel(level)
  const progressToNextLevel = ((totalPoints - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100

  return (
    <PointsContext.Provider
      value={{
        totalPoints,
        stats,
        level,
        currentLevelPoints,
        nextLevelPoints,
        progressToNextLevel,
        addPoints,
        resetProgress
      }}
    >
      {children}
    </PointsContext.Provider>
  )
}

export const usePoints = () => {
  const context = useContext(PointsContext)
  if (!context) {
    throw new Error('usePoints must be used within PointsProvider')
  }
  return context
}
