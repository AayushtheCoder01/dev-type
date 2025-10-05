import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from '../contexts/ThemeContext'

export default function CodeDisplay({ code, language, userInput = '' }) {
  const { currentTheme } = useTheme()
  
  // Map our language names to Prism language identifiers
  const languageMap = {
    javascript: 'javascript',
    typescript: 'typescript',
    python: 'python',
    java: 'java',
    cpp: 'cpp',
    go: 'go',
    rust: 'rust',
    sql: 'sql'
  }

  // Choose syntax highlighting theme based on current theme
  const isDarkTheme = ['dark', 'nord', 'dracula', 'monokai', 'solarized'].includes(currentTheme.id)
  const syntaxTheme = isDarkTheme ? oneDark : oneLight

  // Custom style to match our theme
  const customStyle = {
    backgroundColor: 'var(--code-bg)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    lineHeight: '1.6',
    fontFamily: "'Fira Code', 'JetBrains Mono', 'Monaco', 'Consolas', monospace",
    margin: 0,
    padding: '1.5rem',
    borderRadius: '0',
    overflow: 'auto',
    maxHeight: '400px'
  }

  return (
    <div className="relative">
      <SyntaxHighlighter
        language={languageMap[language] || 'text'}
        style={syntaxTheme}
        customStyle={customStyle}
        showLineNumbers={false}
        wrapLines={true}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
      
      {/* Progress indicator */}
      {userInput && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-opacity-20"
             style={{ backgroundColor: 'var(--border)' }}>
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--accent)',
              width: `${Math.min((userInput.length / code.length) * 100, 100)}%`
            }}
          />
        </div>
      )}
    </div>
  )
}
