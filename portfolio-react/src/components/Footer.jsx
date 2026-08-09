import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  'pt-BR': {
    email: 'Email',
  },
  en: {
    email: 'Email',
  },
}

export default function Footer() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isDark = theme === 'dark'
  const text = copy[language]

  const textColor = isDark ? 'text-white/60' : 'text-[#1a1a1a]/60'
  const hoverColor = isDark ? 'hover:text-white' : 'hover:text-[#1a1a1a]'
  const borderColor = isDark ? 'border-white/5' : 'border-black/5'

  return (
    <footer className={`border-t ${borderColor} transition-colors duration-500`}>
      <div className="max-w-[1100px] mx-auto px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className={`text-[12px] ${textColor} font-light transition-colors duration-500`}>
            © 2026 Pedro Tavares
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:contato@pedrogiacomini.com"
              className={`text-[12px] ${textColor} ${hoverColor} transition-colors duration-300`}
            >
              {text.email}
            </a>
            <a
              href="https://www.linkedin.com/in/pedrogiacomini"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[12px] ${textColor} ${hoverColor} transition-colors duration-300`}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
