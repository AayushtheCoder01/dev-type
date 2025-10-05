import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'

export default function Header() {
  const { setTheme } = useTheme()
  const { languageOptions, selectedLanguage, setLanguage } = useLanguage()
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)

  const handleThemeClick = () => {
    window.dispatchEvent(new CustomEvent('openThemeModal'))
  }

  const selectedLanguageData = languageOptions.find(lang => lang.id === selectedLanguage)

  return (
    <header className="sticky top-0 z-50 border-b transition-colors duration-200" 
            style={{ 
              backgroundColor: 'var(--bg-primary)', 
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)'
            }}>
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold"
                 style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
              ⌨️
            </div>
            <h1 className="text-2xl font-inter font-semibold" style={{ color: 'var(--text-primary)' }}>
              CodeTyper
            </h1>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 focus-ring"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)'
                }}
              >
                <span className="text-lg">{selectedLanguageData?.icon}</span>
                <span className="font-inter font-medium">{selectedLanguageData?.label}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLanguageDropdown && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-lg border shadow-lg z-10"
                     style={{ 
                       backgroundColor: 'var(--bg-primary)', 
                       borderColor: 'var(--border)',
                       boxShadow: 'var(--shadow)'
                     }}>
                  {languageOptions.map((language) => (
                    <button
                      key={language.id}
                      onClick={() => {
                        setLanguage(language.id)
                        setShowLanguageDropdown(false)
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-opacity-50 transition-colors duration-200"
                      style={{ 
                        backgroundColor: selectedLanguage === language.id ? 'var(--accent)' : 'transparent',
                        color: selectedLanguage === language.id ? 'white' : 'var(--text-primary)'
                      }}
                    >
                      <span className="text-lg">{language.icon}</span>
                      <span className="font-inter font-medium">{language.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 hover:scale-105 focus-ring"
              style={{ 
                backgroundColor: 'var(--bg-secondary)', 
                borderColor: 'var(--border)',
                color: 'var(--text-primary)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
              <span className="font-inter font-medium">Themes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showLanguageDropdown) && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowLanguageDropdown(false)}
        />
      )}
    </header>
  )
}
