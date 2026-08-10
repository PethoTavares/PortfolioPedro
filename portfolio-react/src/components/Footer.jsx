import { motion, AnimatePresence } from 'framer-motion'
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
      <div className="mx-auto max-w-[1100px] px-6 py-6 md:px-8">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className={`text-[12px] ${textColor} font-light transition-colors duration-500`}>
            {'\u00A9'} 2026 Pedro Tavares
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:petholite.tavares@gmail.com"
              className={`text-[12px] ${textColor} ${hoverColor} transition-colors duration-300`}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={language}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {text.email}
                </motion.span>
              </AnimatePresence>
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
