import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const navLabels = {
  'pt-BR': {
    portfolio: 'Portfolio',
    social: 'Social Media',
    content: 'Conteudo',
    banners: 'Banners',
    campaigns: 'Campanhas',
    language: 'Idioma',
  },
  en: {
    portfolio: 'Portfolio',
    social: 'Social Media',
    content: 'Content',
    banners: 'Banners',
    campaigns: 'Campaigns',
    language: 'Language',
  },
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { language, toggleLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = theme === 'dark'
  const labels = navLabels[language]

  const navItems = [
    { label: labels.portfolio, href: '#portfolio' },
    { label: labels.social, href: '#social-media' },
    { label: labels.content, href: '#conteudo' },
    { label: labels.banners, href: '#banners' },
    { label: labels.campaigns, href: '#campanhas' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const bgScrolled = isDark
    ? 'bg-[#0a0a0a]/80 backdrop-blur-xl'
    : 'bg-[#f5f5f0]/80 backdrop-blur-xl'

  const textColor = isDark ? 'text-[#888]' : 'text-[#777]'
  const textHover = isDark ? 'hover:text-white' : 'hover:text-black'
  const toggleBg = isDark ? 'bg-white/10 hover:bg-white/15' : 'bg-black/5 hover:bg-black/10'
  const hamburgerColor = isDark ? 'bg-white' : 'bg-black'
  const borderColor = isDark ? 'border-white/8' : 'border-black/8'
  const langBtnClass = isDark
    ? 'bg-white/[0.06] text-white/75 hover:bg-white/[0.12]'
    : 'bg-black/[0.04] text-black/70 hover:bg-black/[0.08]'

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        scrolled
          ? `${bgScrolled} ${isDark ? 'border-white/5' : 'border-black/5'}`
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-4 md:px-8">
        <div className="relative flex h-[60px] items-center justify-center gap-4">
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                className={`text-[12px] ${textColor} ${textHover} transition-colors duration-300 tracking-[0.06em] uppercase font-medium`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className={`hidden md:block w-[3px] h-[3px] rounded-full ${isDark ? 'bg-white/15' : 'bg-black/15'}`} />

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.12em] ${langBtnClass} ${borderColor} transition-all duration-300 cursor-pointer`}
              aria-label={labels.language}
            >
              <span className={language === 'pt-BR' ? 'text-current' : 'opacity-45'}>PT/BR</span>
              <span className="opacity-35">|</span>
              <span className={language === 'en' ? 'text-current' : 'opacity-45'}>ENG</span>
            </button>

            <button
              onClick={toggle}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${toggleBg} transition-all duration-300 cursor-pointer`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>

          <div className="md:hidden absolute right-4 flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`rounded-full border px-3 py-2 text-[10px] uppercase tracking-[0.12em] ${langBtnClass} ${borderColor} transition-all duration-300 cursor-pointer`}
              aria-label={labels.language}
            >
              {language === 'pt-BR' ? 'PT/BR' : 'ENG'}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-[5px] p-1 cursor-pointer"
            >
              <span className={`w-5 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
              <span className={`w-5 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`md:hidden ${isDark ? 'bg-[#0a0a0a]/95' : 'bg-[#f5f5f0]/95'} backdrop-blur-xl border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}
          >
            <div className="px-4 py-5 flex flex-col gap-4 text-center">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  className={`text-[13px] ${textColor} ${textHover} transition-colors uppercase tracking-[0.06em] font-medium`}
                >
                  {item.label}
                </a>
              ))}

              <button
                onClick={toggle}
                className={`mx-auto mt-2 w-8 h-8 flex items-center justify-center rounded-full ${toggleBg} transition-all duration-300 cursor-pointer`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
