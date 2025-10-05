import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const THEME_STORAGE_KEY = 'codetyper_theme'

const themeDefinitions = [
  {
    id: 'light',
    name: 'Light',
    colors: {
      '--bg-primary': '#ffffff',
      '--bg-secondary': '#f8fafc',
      '--text-primary': '#1f2937',
      '--text-secondary': '#6b7280',
      '--accent': '#3b82f6',
      '--success': '#10b981',
      '--error': '#ef4444',
      '--border': '#e5e7eb',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      '--code-bg': '#f9fafb',
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    colors: {
      '--bg-primary': '#111827',
      '--bg-secondary': '#1f2937',
      '--text-primary': '#f9fafb',
      '--text-secondary': '#9ca3af',
      '--accent': '#3b82f6',
      '--success': '#10b981',
      '--error': '#ef4444',
      '--border': '#374151',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
      '--code-bg': '#1f2937',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    colors: {
      '--bg-primary': '#2e3440',
      '--bg-secondary': '#3b4252',
      '--text-primary': '#eceff4',
      '--text-secondary': '#d8dee9',
      '--accent': '#88c0d0',
      '--success': '#a3be8c',
      '--error': '#bf616a',
      '--border': '#4c566a',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      '--code-bg': '#3b4252',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    colors: {
      '--bg-primary': '#282a36',
      '--bg-secondary': '#44475a',
      '--text-primary': '#f8f8f2',
      '--text-secondary': '#6272a4',
      '--accent': '#bd93f9',
      '--success': '#50fa7b',
      '--error': '#ff5555',
      '--border': '#6272a4',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      '--code-bg': '#44475a',
    },
  },
  {
    id: 'monokai',
    name: 'Monokai',
    colors: {
      '--bg-primary': '#272822',
      '--bg-secondary': '#3e3d32',
      '--text-primary': '#f8f8f2',
      '--text-secondary': '#75715e',
      '--accent': '#66d9ef',
      '--success': '#a6e22e',
      '--error': '#f92672',
      '--border': '#49483e',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      '--code-bg': '#3e3d32',
    },
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox',
    colors: {
      '--bg-primary': '#282828',
      '--bg-secondary': '#3c3836',
      '--text-primary': '#ebdbb2',
      '--text-secondary': '#a89984',
      '--accent': '#fe8019',
      '--success': '#b8bb26',
      '--error': '#fb4934',
      '--border': '#504945',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      '--code-bg': '#3c3836',
    },
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    colors: {
      '--bg-primary': '#002b36',
      '--bg-secondary': '#073642',
      '--text-primary': '#fdf6e3',
      '--text-secondary': '#93a1a1',
      '--accent': '#268bd2',
      '--success': '#859900',
      '--error': '#dc322f',
      '--border': '#586e75',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
      '--code-bg': '#073642',
    },
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    colors: {
      '--bg-primary': '#1a1b26',
      '--bg-secondary': '#24283b',
      '--text-primary': '#c0caf5',
      '--text-secondary': '#565f89',
      '--accent': '#7aa2f7',
      '--success': '#9ece6a',
      '--error': '#f7768e',
      '--border': '#414868',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.4)',
      '--code-bg': '#24283b',
    },
  },
]

const ThemeContext = createContext({
  themes: themeDefinitions,
  currentTheme: themeDefinitions[0],
  setTheme: () => {},
})

const applyThemeToDocument = (theme) => {
  if (typeof document === 'undefined' || !theme) return
  const root = document.documentElement
  root.style.setProperty('--transitioning', 'true')
  Object.entries(theme.colors).forEach(([varName, value]) => {
    root.style.setProperty(varName, value)
  })
  window.requestAnimationFrame(() => {
    root.style.removeProperty('--transitioning')
  })
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Load theme from localStorage on initial render
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    const matched = themeDefinitions.find((theme) => theme.id === stored)
    return matched ?? themeDefinitions[1] // Default to dark theme
  })

  // Apply theme on mount
  useEffect(() => {
    applyThemeToDocument(currentTheme)
  }, [])

  // Save and apply theme whenever it changes
  useEffect(() => {
    applyThemeToDocument(currentTheme)
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id)
  }, [currentTheme])

  const value = useMemo(
    () => ({
      themes: themeDefinitions,
      currentTheme,
      setTheme: setCurrentTheme,
    }),
    [currentTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
