import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { snippetsLibrary } from '../data/snippets'

const LANGUAGE_STORAGE_KEY = 'codetyper_language'
const DIFFICULTY_STORAGE_KEY = 'codetyper_difficulty'

const languageMetadata = {
  javascript: { label: 'JavaScript', icon: '🟨' },
  typescript: { label: 'TypeScript', icon: '🔷' },
  python: { label: 'Python', icon: '🐍' },
  java: { label: 'Java', icon: '☕️' },
  cpp: { label: 'C++', icon: '💠' },
  go: { label: 'Go', icon: '🌀' },
  rust: { label: 'Rust', icon: '🦀' },
  sql: { label: 'SQL', icon: '🗄️' },
}

const difficultyOptions = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]

const LanguageContext = createContext({
  languageOptions: Object.entries(languageMetadata).map(([id, meta]) => ({ id, ...meta })),
  difficultyOptions,
  selectedLanguage: 'javascript',
  selectedDifficulty: 'easy',
  currentSnippet: null,
  setLanguage: () => {},
  setDifficulty: () => {},
  loadSnippet: () => {},
})

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy')
  const [currentSnippet, setCurrentSnippet] = useState(null)

  const loadSnippet = useCallback(
    (lang = selectedLanguage, difficulty = selectedDifficulty) => {
      const languageSnippets = snippetsLibrary[lang]?.[difficulty] ?? []
      if (!languageSnippets.length) return null
      const nextSnippet =
        languageSnippets[Math.floor(Math.random() * languageSnippets.length)]
      setCurrentSnippet(nextSnippet)
      return nextSnippet
    },
    [selectedLanguage, selectedDifficulty],
  )

  useEffect(() => {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    const storedDifficulty = localStorage.getItem(DIFFICULTY_STORAGE_KEY)
    if (storedLanguage && snippetsLibrary[storedLanguage]) {
      setSelectedLanguage(storedLanguage)
    }
    if (storedDifficulty && ['easy', 'medium', 'hard'].includes(storedDifficulty)) {
      setSelectedDifficulty(storedDifficulty)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, selectedLanguage)
  }, [selectedLanguage])

  useEffect(() => {
    localStorage.setItem(DIFFICULTY_STORAGE_KEY, selectedDifficulty)
  }, [selectedDifficulty])

  useEffect(() => {
    loadSnippet(selectedLanguage, selectedDifficulty)
  }, [loadSnippet, selectedLanguage, selectedDifficulty])

  const setLanguage = useCallback((language) => {
    if (!snippetsLibrary[language]) return
    setSelectedLanguage(language)
  }, [])

  const setDifficulty = useCallback((difficulty) => {
    if (!['easy', 'medium', 'hard'].includes(difficulty)) return
    setSelectedDifficulty(difficulty)
  }, [])

  const languageOptions = useMemo(
    () =>
      Object.entries(languageMetadata).map(([id, meta]) => ({
        id,
        ...meta,
      })),
    [],
  )

  const value = useMemo(
    () => ({
      languageOptions,
      difficultyOptions,
      selectedLanguage,
      selectedDifficulty,
      currentSnippet,
      setLanguage,
      setDifficulty,
      loadSnippet,
    }),
    [currentSnippet, languageOptions, loadSnippet, selectedDifficulty, selectedLanguage],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
