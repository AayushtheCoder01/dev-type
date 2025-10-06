import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const AUTH_STORAGE_KEY = 'codetype_auth'
const USERS_STORAGE_KEY = 'codetype_users'

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load current user from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      setCurrentUser(authData.user)
    }
    setLoading(false)
  }, [])

  // Save current user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: currentUser }))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [currentUser])

  const signup = async (email, password, username) => {
    try {
      // Get existing users
      const usersData = localStorage.getItem(USERS_STORAGE_KEY)
      const users = usersData ? JSON.parse(usersData) : []

      // Check if user already exists
      const existingUser = users.find(u => u.email === email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        password, // In production, this should be hashed!
        createdAt: new Date().toISOString(),
        xp: 0,
        stats: {
          totalSessions: 0,
          totalTime: 0,
          avgWpm: 0,
          avgAccuracy: 0,
          favoriteLanguage: null,
          languagesPracticed: []
        },
        preferences: {
          languages: [],
          theme: 'dark'
        }
      }

      // Save to users list
      users.push(newUser)
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = newUser
      setCurrentUser(userWithoutPassword)

      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const login = async (email, password) => {
    try {
      // Get existing users
      const usersData = localStorage.getItem(USERS_STORAGE_KEY)
      const users = usersData ? JSON.parse(usersData) : []

      // Find user
      const user = users.find(u => u.email === email && u.password === password)
      if (!user) {
        throw new Error('Invalid email or password')
      }

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = user
      setCurrentUser(userWithoutPassword)

      return { success: true, user: userWithoutPassword }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const updateUserStats = (updates) => {
    if (!currentUser) return

    const updatedUser = {
      ...currentUser,
      ...updates
    }

    // Update in users list (preserve password)
    const usersData = localStorage.getItem(USERS_STORAGE_KEY)
    const users = usersData ? JSON.parse(usersData) : []
    const userIndex = users.findIndex(u => u.id === currentUser.id)
    
    if (userIndex !== -1) {
      // Merge updates while preserving password and other fields
      users[userIndex] = { 
        ...users[userIndex], 
        ...updates,
        // Ensure password is preserved
        password: users[userIndex].password 
      }
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
    }

    setCurrentUser(updatedUser)
  }

  // Function to prepare data for Supabase (for future use)
  const syncToSupabase = async () => {
    if (!currentUser) return

    // This will be implemented when Supabase is integrated
    console.log('Supabase sync will be implemented here')
    
    // Example structure:
    // const { data, error } = await supabase
    //   .from('users')
    //   .upsert({
    //     id: currentUser.id,
    //     email: currentUser.email,
    //     username: currentUser.username,
    //     xp: currentUser.xp,
    //     stats: currentUser.stats,
    //     preferences: currentUser.preferences,
    //     updated_at: new Date().toISOString()
    //   })
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    updateUserStats,
    syncToSupabase
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
