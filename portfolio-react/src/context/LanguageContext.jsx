import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'pt-BR'
    }
    return 'pt-BR'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.setAttribute('lang', language === 'pt-BR' ? 'pt-BR' : 'en')
  }, [language])

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'pt-BR' ? 'en' : 'pt-BR'))
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
