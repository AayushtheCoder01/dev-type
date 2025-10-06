import { snippetsLibrary as defaultSnippets } from '../data/snippets'

const USED_SNIPPETS_KEY = 'codetype_used_snippets'

class SnippetService {
  constructor() {
    this.snippetsLibrary = defaultSnippets
    this.usedSnippets = this.loadUsedSnippets()
  }


  // Load used snippets from localStorage
  loadUsedSnippets() {
    try {
      const stored = localStorage.getItem(USED_SNIPPETS_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch (error) {
      console.error('Error loading used snippets:', error)
      return {}
    }
  }

  // Save used snippets to localStorage
  saveUsedSnippets() {
    try {
      localStorage.setItem(USED_SNIPPETS_KEY, JSON.stringify(this.usedSnippets))
    } catch (error) {
      console.error('Error saving used snippets:', error)
    }
  }

  // Get a random snippet that hasn't been used recently
  getRandomSnippet(language, difficulty) {
    const snippets = this.snippetsLibrary[language]?.[difficulty] || []
    
    if (snippets.length === 0) {
      throw new Error(`No snippets found for ${language} - ${difficulty}`)
    }

    // Create key for tracking used snippets
    const key = `${language}_${difficulty}`
    
    // Initialize used snippets array for this key if not exists
    if (!this.usedSnippets[key]) {
      this.usedSnippets[key] = []
    }

    // Get available snippets (not recently used)
    let availableSnippets = snippets.filter(
      snippet => !this.usedSnippets[key].includes(snippet.id)
    )

    // If all snippets have been used, reset the used list
    if (availableSnippets.length === 0) {
      console.log(`🔄 Resetting used snippets for ${key}`)
      this.usedSnippets[key] = []
      availableSnippets = snippets
    }

    // Pick a random snippet from available ones
    const randomIndex = Math.floor(Math.random() * availableSnippets.length)
    const selectedSnippet = availableSnippets[randomIndex]

    // Mark this snippet as used
    this.usedSnippets[key].push(selectedSnippet.id)
    
    // Keep only last N used snippets to allow rotation
    const maxHistory = Math.min(snippets.length - 1, 10)
    if (this.usedSnippets[key].length > maxHistory) {
      this.usedSnippets[key].shift()
    }

    // Save used snippets
    this.saveUsedSnippets()

    return selectedSnippet
  }

  // Clear used snippets (useful for debugging)
  clearCache() {
    localStorage.removeItem(USED_SNIPPETS_KEY)
    this.usedSnippets = {}
    console.log('🗑️ Used snippets cleared')
  }

  // Reset used snippets for a specific language/difficulty
  resetUsedSnippets(language, difficulty) {
    const key = `${language}_${difficulty}`
    if (this.usedSnippets[key]) {
      this.usedSnippets[key] = []
      this.saveUsedSnippets()
      console.log(`🔄 Reset used snippets for ${key}`)
    }
  }
}

// Export singleton instance
export const snippetService = new SnippetService()

// Export for direct use (backward compatibility)
export const getRandomSnippet = (language, difficulty) => 
  snippetService.getRandomSnippet(language, difficulty)
export const clearSnippetCache = () => snippetService.clearCache()
