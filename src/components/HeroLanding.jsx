import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function HeroLanding({ onGetStarted }) {
  const [particles, setParticles] = useState([])

  // Generate floating code particles
  useEffect(() => {
    const codeSnippets = [
      'const', 'function', 'async', 'await', 'import', 'export', 'class', 'return',
      'if', 'else', 'for', 'while', 'try', 'catch', 'let', 'var', 'def', 'print',
      '{}', '[]', '()', '=>', '&&', '||', '===', '!==', '++', '--'
    ]

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 0.8 + 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 20 + 10
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Floating Code Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute font-mono text-blue-300/30 pointer-events-none select-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}rem`,
              opacity: particle.opacity
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, -5, 0],
              rotate: [0, 5, -5, 0],
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {particle.text}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-6">
            <span className="text-4xl">⚡</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight"
        >
          CodeFlow
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-2xl md:text-3xl text-gray-300 mb-4 font-light"
        >
          The Netflix of Typing for Developers
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Master coding through addictive typing practice. Level up your skills with 
          gamified challenges, personalized learning paths, and real-time feedback.
        </motion.p>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
            <p className="text-gray-400 text-sm">XP, achievements, and streaks that keep you coming back</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🧠</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400 text-sm">Personalized challenges that adapt to your skill level</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Flow State</h3>
            <p className="text-gray-400 text-sm">Seamless experience designed for deep focus</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.button
            onClick={onGetStarted}
            className="group relative px-12 py-6 text-xl font-bold text-white rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center space-x-3">
              <span>Start Your Journey</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
          </motion.button>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">50K+</div>
            <div className="text-sm text-gray-400">Developers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">1M+</div>
            <div className="text-sm text-gray-400">Code Snippets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">15+</div>
            <div className="text-sm text-gray-400">Languages</div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
  )
}
