import { supabase } from './supabase'

// =============================================
// USER PROFILE OPERATIONS
// =============================================

export const getUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase getUserProfile error:', error.message)
    return null
  }
}

export const updateUserProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase updateUserProfile error:', error.message)
    return null
  }
}

export const createUserProfile = async (userId, profileData) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{ id: userId, ...profileData }])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase createUserProfile error:', error.message)
    return null
  }
}

// =============================================
// TEST HISTORY OPERATIONS
// =============================================

export const saveTestResult = async (userId, testData) => {
  try {
    const { data, error } = await supabase
      .from('test_history')
      .insert([{
        user_id: userId,
        ...testData
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase saveTestResult error:', error.message)
    return null
  }
}

export const getTestHistory = async (userId, limit = 100) => {
  try {
    const { data, error } = await supabase
      .from('test_history')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase getTestHistory error:', error.message)
    return []
  }
}

export const getTestsByTimeframe = async (userId, timeframe) => {
  try {
    const now = new Date()
    let startDate
    
    switch (timeframe) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        break
      case 'yesterday':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0)
        const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
        const { data, error } = await supabase
          .from('test_history')
          .select('*')
          .eq('user_id', userId)
          .gte('timestamp', startDate.toISOString())
          .lt('timestamp', endDate.toISOString())
          .order('timestamp', { ascending: false })
        
        if (error) throw error
        return data
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6, 0, 0, 0)
        break
      default:
        startDate = new Date(0)
    }
    
    const { data, error } = await supabase
      .from('test_history')
      .select('*')
      .eq('user_id', userId)
      .gte('timestamp', startDate.toISOString())
      .order('timestamp', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase getTestsByTimeframe error:', error.message)
    return []
  }
}

export const deleteTestHistory = async (userId) => {
  try {
    const { error } = await supabase
      .from('test_history')
      .delete()
      .eq('user_id', userId)
    
    if (error) throw error
  } catch (error) {
    console.log('Supabase deleteTestHistory error:', error.message)
  }
}

// =============================================
// ACHIEVEMENTS OPERATIONS
// =============================================

export const getUserAchievements = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('user_id', userId)
      .order('unlocked_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase getUserAchievements error:', error.message)
    return []
  }
}

export const unlockAchievement = async (userId, achievement) => {
  try {
    const { data, error } = await supabase
      .from('achievements')
      .insert([{
        user_id: userId,
        achievement_id: achievement.id,
        achievement_name: achievement.name,
        achievement_description: achievement.description,
        points: achievement.points
      }])
      .select()
      .single()
    
    if (error) {
      if (error.code === '23505') return null
      throw error
    }
    return data
  } catch (error) {
    console.log('Supabase unlockAchievement error:', error.message)
    return null
  }
}

// =============================================
// USER STATS OPERATIONS
// =============================================

export const getUserStats = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase getUserStats error:', error.message)
    return null
  }
}

export const updateUserStats = async (userId, stats) => {
  try {
    const { data, error } = await supabase
      .from('user_stats')
      .update(stats)
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase updateUserStats error:', error.message)
    return null
  }
}

// =============================================
// LEADERBOARD OPERATIONS
// =============================================

export const getLeaderboard = async (limit = 100) => {
  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .select('*')
      .limit(limit)
    
    if (error) throw error
    return data
  } catch (error) {
    console.log('Supabase getLeaderboard error:', error.message)
    return []
  }
}

// =============================================
// MIGRATION HELPERS
// =============================================

export const migrateLocalStorageToSupabase = async (userId) => {
  try {
    const testHistory = localStorage.getItem('codetype_test_history')
    if (testHistory) {
      const tests = JSON.parse(testHistory)
      const testsToInsert = tests.map(test => ({
        user_id: userId,
        timestamp: test.timestamp || new Date().toISOString(),
        wpm: test.wpm || 0,
        accuracy: test.accuracy || 0,
        time_elapsed: test.timeElapsed || 60,
        correct_chars: test.correctChars || 0,
        incorrect_chars: test.incorrectChars || 0,
        total_chars: test.totalChars || 0,
        language: test.language || 'javascript',
        difficulty: test.difficulty || 'easy',
        mode: test.mode || 'practice',
        completed: test.completed || false,
        char_stats: test.charStats || [],
        snippet_id: test.snippetId || null
      }))
      
      if (testsToInsert.length > 0) {
        const { error } = await supabase
          .from('test_history')
          .insert(testsToInsert)
        
        if (error && error.code !== '23505') {
          console.log('Migration error:', error.message)
        }
      }
    }
    
    const userStatsKey = `codetype_stats_${userId}`
    const stats = localStorage.getItem(userStatsKey)
    if (stats) {
      const parsedStats = JSON.parse(stats)
      await updateUserStats(userId, {
        total_races: parsedStats.totalRaces || 0,
        total_words: parsedStats.totalWords || 0,
        total_time: parsedStats.totalTime || 0,
        perfect_races: parsedStats.perfectRaces || 0,
        last_race_date: parsedStats.lastRaceDate || null
      })
    }
    
    const userPointsKey = `codetype_points_${userId}`
    const points = localStorage.getItem(userPointsKey)
    if (points) {
      await updateUserProfile(userId, {
        xp: parseInt(points) || 0
      })
    }
    
    console.log('Migration completed successfully')
    return true
  } catch (error) {
    console.log('Migration error:', error.message)
    return false
  }
}
