import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Settings({ onClose }) {
  const { currentUser, logout } = useAuth()
  const { themes, currentTheme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('account')


  const handleExportData = () => {
    const data = {
      user: currentUser,
      testHistory: JSON.parse(localStorage.getItem('codetype_test_history') || '[]'),
      points: localStorage.getItem(currentUser ? `codetype_points_${currentUser.id}` : 'codetype_points'),
      stats: JSON.parse(localStorage.getItem(currentUser ? `codetype_stats_${currentUser.id}` : 'codetype_stats') || '{}'),
      settings: JSON.parse(localStorage.getItem('codetype_settings') || '{}'),
      exportDate: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `codeflow-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your data? This cannot be undone.')) {
      // Clear all localStorage data
      const keysToRemove = Object.keys(localStorage).filter(key => key.startsWith('codetype'))
      keysToRemove.forEach(key => localStorage.removeItem(key))
      
      // Reload the page to reset everything
      window.location.reload()
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString()
  }

  const tabs = [
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'themes', name: 'Themes', icon: '🎨' },
    { id: 'data', name: 'Data', icon: '📊' }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">⚙️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <p className="text-gray-400 text-sm">Manage your account and preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar */}
          <div className="w-64 bg-gray-800 p-4">
            <nav className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                  <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {currentUser ? currentUser.username.charAt(0).toUpperCase() : '?'}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold flex items-center space-x-2">
                          <span>{currentUser ? currentUser.username : 'Guest'}</span>
                        </h4>
                        <p className="text-gray-400">{currentUser ? currentUser.email : 'Not signed in'}</p>
                        <p className="text-gray-500 text-sm">
                          Member since {currentUser ? formatDate(currentUser.createdAt) : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {currentUser && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Account Actions</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          logout()
                          onClose()
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* Themes Tab */}
            {activeTab === 'themes' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Choose Theme</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {themes.map(theme => (
                      <div
                        key={theme.id}
                        className={`relative bg-gray-800 rounded-lg p-4 border-2 cursor-pointer transition-all ${
                          currentTheme.id === theme.id
                            ? 'border-blue-500'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => setTheme(theme)}
                      >
                        {/* Theme Preview */}
                        <div 
                          className="w-full h-20 rounded-lg mb-3 border border-gray-600"
                          style={{ backgroundColor: theme.colors['--bg-primary'] }}
                        >
                          <div className="p-2 h-full flex flex-col justify-between">
                            <div 
                              className="w-full h-2 rounded"
                              style={{ backgroundColor: theme.colors['--accent'] }}
                            />
                            <div className="flex space-x-1">
                              <div 
                                className="w-8 h-2 rounded"
                                style={{ backgroundColor: theme.colors['--text-primary'] }}
                              />
                              <div 
                                className="w-6 h-2 rounded"
                                style={{ backgroundColor: theme.colors['--text-secondary'] }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <h4 className="text-white font-medium">{theme.name}</h4>
                          {currentTheme.id === theme.id && (
                            <p className="text-blue-400 text-sm mt-1">Active</p>
                          )}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data Tab */}
            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Export Data</h4>
                      <p className="text-gray-400 text-sm mb-3">
                        Download your typing data, progress, and statistics.
                      </p>
                      <button 
                        onClick={handleExportData}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Export Data (JSON)
                      </button>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Clear Data</h4>
                      <p className="text-gray-400 text-sm mb-3">
                        Reset all your progress, statistics, and test history.
                      </p>
                      <button 
                        onClick={handleClearData}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Clear All Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
