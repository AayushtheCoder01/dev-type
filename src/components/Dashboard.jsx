import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useGame } from '../contexts/GameContext'
import { snippetsLibrary } from '../data/snippets'

export default function Dashboard({ user, onStartSession }) {
  const { 
    getLevel, 
    getXPForNextLevel, 
    getTrendingChallenges, 
    getRecommendations,
    streaks,
    achievements,
    ACHIEVEMENTS
  } = useGame()

  const [selectedCategory, setSelectedCategory] = useState('continue')
  const [hoveredChallenge, setHoveredChallenge] = useState(null)

  const currentLevel = getLevel()
  const xpForNext = getXPForNextLevel()
  const xpProgress = ((user.xp - (currentLevel > 1 ? Math.pow(currentLevel - 2, 2) * 100 : 0)) / (xpForNext - (currentLevel > 1 ? Math.pow(currentLevel - 2, 2) * 100 : 0))) * 100

  // Netflix-style categories
  const categories = [
    { id: 'continue', name: 'Continue Coding', icon: '▶️' },
    { id: 'trending', name: 'Trending Now', icon: '🔥' },
    { id: 'recommended', name: 'Recommended for You', icon: '✨' },
    { id: 'daily', name: 'Daily Challenge', icon: '🎯' },
    { id: 'languages', name: 'Explore Languages', icon: '🌍' }
  ]

  const getChallengesByCategory = (categoryId) => {
    switch (categoryId) {
      case 'continue':
        return [
          { id: 'last-session', name: 'Resume JavaScript Practice', progress: 65, language: 'javascript', difficulty: 'medium' },
          { id: 'incomplete', name: 'Python Functions', progress: 30, language: 'python', difficulty: 'easy' }
        ]
      case 'trending':
        return getTrendingChallenges()
      case 'recommended':
        return getRecommendations().map(rec => ({
          id: rec.action,
          name: rec.title,
          description: rec.description,
          type: rec.type
        }))
      case 'daily':
        return [
          { id: 'daily-js', name: "Today's JavaScript Challenge", difficulty: 'medium', xp: 150, timeLimit: '10 min' },
          { id: 'daily-py', name: "Python Speed Round", difficulty: 'easy', xp: 100, timeLimit: '5 min' }
        ]
      case 'languages':
        return Object.keys(snippetsLibrary).map(lang => ({
          id: lang,
          name: lang.charAt(0).toUpperCase() + lang.slice(1),
          language: lang,
          snippetCount: Object.values(snippetsLibrary[lang]).flat().length
        }))
      default:
        return []
    }
  }

  const handleChallengeClick = (challenge) => {
    if (challenge.language) {
      // Get random snippet from language/difficulty
      const snippets = snippetsLibrary[challenge.language]?.[challenge.difficulty || 'easy'] || []
      if (snippets.length > 0) {
        const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)]
        onStartSession({
          language: challenge.language,
          difficulty: challenge.difficulty || 'easy',
          snippet: randomSnippet,
          duration: 120 // 2 minutes default
        })
      }
    }
  }

  return (
    <div className="min-h-screen">
      
      {/* Header with User Stats */}
      <header className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 py-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
            
            {/* Welcome Section */}
            <div className="mb-8 lg:mb-0">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-bold mb-2"
              >
                Welcome back! 👋
              </motion.h1>
              <p className="text-xl text-gray-300">Ready to level up your coding skills?</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Level */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-blue-400">L{currentLevel}</div>
                <div className="text-xs text-gray-300">Level</div>
              </motion.div>

              {/* XP */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-purple-400">{user.xp}</div>
                <div className="text-xs text-gray-300">XP</div>
              </motion.div>

              {/* Streak */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-orange-400">{streaks.daily?.count || 0}🔥</div>
                <div className="text-xs text-gray-300">Day Streak</div>
              </motion.div>

              {/* Sessions */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-green-400">{user.stats.totalSessions}</div>
                <div className="text-xs text-gray-300">Sessions</div>
              </motion.div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Level {currentLevel} Progress</span>
              <span className="text-sm text-gray-300">{Math.round(xpProgress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        
        {/* Category Navigation */}
        <div className="flex space-x-6 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-white text-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Challenge Grid */}
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {getChallengesByCategory(selectedCategory).map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredChallenge(challenge.id)}
              onMouseLeave={() => setHoveredChallenge(null)}
            >
              <div 
                className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-gray-800/70 hover:scale-105"
                onClick={() => handleChallengeClick(challenge)}
              >
                
                {/* Challenge Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{challenge.name}</h3>
                    {challenge.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">{challenge.description}</p>
                    )}
                  </div>
                  {challenge.language && (
                    <div className="ml-2 px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium">
                      {challenge.language}
                    </div>
                  )}
                </div>

                {/* Challenge Metadata */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    {challenge.difficulty && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        challenge.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                        challenge.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    )}
                    {challenge.xp && (
                      <span className="text-purple-300">+{challenge.xp} XP</span>
                    )}
                    {challenge.timeLimit && (
                      <span className="text-blue-300">{challenge.timeLimit}</span>
                    )}
                    {challenge.snippetCount && (
                      <span className="text-gray-300">{challenge.snippetCount} snippets</span>
                    )}
                  </div>
                </div>

                {/* Progress Bar (for continue category) */}
                {challenge.progress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Hover Effect */}
                {hoveredChallenge === challenge.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Recent Achievements 🏆</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.slice(-3).map((achievement) => (
                <div 
                  key={achievement.id}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold">{achievement.name}</div>
                      <div className="text-sm text-gray-300">{achievement.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
