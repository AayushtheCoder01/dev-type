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
    id: 'cyberpunk',
    name: 'Cyberpunk',
    colors: {
      '--bg-primary': '#0f0f0f',
      '--bg-secondary': '#1a1a1a',
      '--text-primary': '#00ff9f',
      '--text-secondary': '#ff0080',
      '--accent': '#ff0080',
      '--success': '#00ff9f',
      '--error': '#ff3030',
      '--border': '#333333',
      '--shadow': '0 0 20px rgba(255, 0, 128, 0.3)',
      '--code-bg': '#1a1a1a',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    colors: {
      '--bg-primary': '#0f1419',
      '--bg-secondary': '#1e2328',
      '--text-primary': '#e6e1cf',
      '--text-secondary': '#5c6773',
      '--accent': '#39bae6',
      '--success': '#7fd962',
      '--error': '#f07178',
      '--border': '#2d3640',
      '--shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.6)',
      '--code-bg': '#1e2328',
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
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    colors: {
      '--bg-primary': '#1e1e2e',
      '--bg-secondary': '#313244',
      '--text-primary': '#cdd6f4',
      '--text-secondary': '#a6adc8',
      '--accent': '#89b4fa',
      '--success': '#a6e3a1',
      '--error': '#f38ba8',
      '--border': '#45475a',
      '--shadow': '0 8px 16px rgba(0, 0, 0, 0.3)',
      '--code-bg': '#313244',
    },
  },
  {
    id: 'rose-pine',
    name: 'Rosé Pine',
    colors: {
      '--bg-primary': '#191724',
      '--bg-secondary': '#1f1d2e',
      '--text-primary': '#e0def4',
      '--text-secondary': '#908caa',
      '--accent': '#c4a7e7',
      '--success': '#9ccfd8',
      '--error': '#eb6f92',
      '--border': '#26233a',
      '--shadow': '0 8px 16px rgba(0, 0, 0, 0.4)',
      '--code-bg': '#1f1d2e',
    },
  },
  {
    id: 'midnight-espresso',
    name: 'Midnight Espresso',
    colors: {
      '--bg-primary': '#1a1410',
      '--bg-secondary': '#2d2419',
      '--text-primary': '#f4e8d8',
      '--text-secondary': '#b8a896',
      '--accent': '#d4a574',
      '--success': '#a8c084',
      '--error': '#d47d7d',
      '--border': '#3d3428',
      '--shadow': '0 10px 20px rgba(0, 0, 0, 0.5)',
      '--code-bg': '#2d2419',
    },
  },
  {
    id: 'forest-night',
    name: 'Forest Night',
    colors: {
      '--bg-primary': '#1a2421',
      '--bg-secondary': '#243530',
      '--text-primary': '#d8e5e0',
      '--text-secondary': '#8fa89e',
      '--accent': '#7fb069',
      '--success': '#a3d977',
      '--error': '#e07a5f',
      '--border': '#2d4238',
      '--shadow': '0 8px 16px rgba(0, 0, 0, 0.4)',
      '--code-bg': '#243530',
    },
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    colors: {
      '--bg-primary': '#1e1a2e',
      '--bg-secondary': '#2d2640',
      '--text-primary': '#e8dff5',
      '--text-secondary': '#b8a8d4',
      '--accent': '#9d84c7',
      '--success': '#a8d8b9',
      '--error': '#e88d9e',
      '--border': '#3d3450',
      '--shadow': '0 8px 20px rgba(157, 132, 199, 0.15)',
      '--code-bg': '#2d2640',
    },
  },
  {
    id: 'warm-sunset',
    name: 'Warm Sunset',
    colors: {
      '--bg-primary': '#2a1f1a',
      '--bg-secondary': '#3d2e26',
      '--text-primary': '#f5e6d3',
      '--text-secondary': '#c9b8a3',
      '--accent': '#e8956f',
      '--success': '#b8c77d',
      '--error': '#d97777',
      '--border': '#4d3d33',
      '--shadow': '0 10px 25px rgba(232, 149, 111, 0.2)',
      '--code-bg': '#3d2e26',
    },
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    colors: {
      '--bg-primary': '#0d1b2a',
      '--bg-secondary': '#1b263b',
      '--text-primary': '#e0e9f5',
      '--text-secondary': '#8fa8c4',
      '--accent': '#5e9ed6',
      '--success': '#7bc7c7',
      '--error': '#e07a7a',
      '--border': '#2d3e50',
      '--shadow': '0 8px 20px rgba(94, 158, 214, 0.15)',
      '--code-bg': '#1b263b',
    },
  },
  {
    id: 'champagne',
    name: 'Champagne',
    colors: {
      '--bg-primary': '#faf8f3',
      '--bg-secondary': '#f0ebe0',
      '--text-primary': '#3d3428',
      '--text-secondary': '#6d6250',
      '--accent': '#b8956a',
      '--success': '#8fa876',
      '--error': '#d47d7d',
      '--border': '#d9d0c1',
      '--shadow': '0 4px 12px rgba(184, 149, 106, 0.15)',
      '--code-bg': '#f5f0e5',
    },
  },
  {
    id: 'cherry-blossom',
    name: 'Cherry Blossom',
    colors: {
      '--bg-primary': '#fff5f7',
      '--bg-secondary': '#ffe8ed',
      '--text-primary': '#4a2c35',
      '--text-secondary': '#8a6570',
      '--accent': '#d88ca6',
      '--success': '#9dc8a8',
      '--error': '#e07a8c',
      '--border': '#f5d0db',
      '--shadow': '0 4px 12px rgba(216, 140, 166, 0.2)',
      '--code-bg': '#fff0f3',
    },
  },
  {
    id: 'deep-ocean',
    name: 'Deep Ocean',
    colors: {
      '--bg-primary': '#0a1929',
      '--bg-secondary': '#132f4c',
      '--text-primary': '#b2d4f5',
      '--text-secondary': '#6b9bc3',
      '--accent': '#3ea8ff',
      '--success': '#5fb3b3',
      '--error': '#f48771',
      '--border': '#1e3a5f',
      '--shadow': '0 10px 30px rgba(62, 168, 255, 0.2)',
      '--code-bg': '#132f4c',
    },
  },
  {
    id: 'velvet-noir',
    name: 'Velvet Noir',
    colors: {
      '--bg-primary': '#0f0a0a',
      '--bg-secondary': '#1c1414',
      '--text-primary': '#e8d4d4',
      '--text-secondary': '#a89090',
      '--accent': '#c49696',
      '--success': '#96c4a3',
      '--error': '#c47676',
      '--border': '#2d2323',
      '--shadow': '0 12px 30px rgba(196, 150, 150, 0.25)',
      '--code-bg': '#1c1414',
    },
  },
  {
    id: 'mint-cream',
    name: 'Mint Cream',
    colors: {
      '--bg-primary': '#f0faf5',
      '--bg-secondary': '#e0f5eb',
      '--text-primary': '#1a3d2e',
      '--text-secondary': '#4a7a63',
      '--accent': '#52b788',
      '--success': '#74c69d',
      '--error': '#e07a7a',
      '--border': '#b7e4c7',
      '--shadow': '0 4px 12px rgba(82, 183, 136, 0.15)',
      '--code-bg': '#e8f7f0',
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
