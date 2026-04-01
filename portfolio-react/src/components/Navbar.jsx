import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { label: 'Social Media', href: '#social-media' },
  { label: 'Conteúdo', href: '#conteudo' },
  { label: 'Banners', href: '#banners' },
  { label: 'Campanhas', href: '#campanhas' },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = theme === 'dark'

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
        <div className="flex items-center justify-center h-[60px] gap-6">
          {/* Nav Links — centered */}
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

          {/* Separator dot */}
          <div className={`hidden md:block w-[3px] h-[3px] rounded-full ${isDark ? 'bg-white/15' : 'bg-black/15'}`} />

          {/* Theme Toggle */}
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

          {/* Mobile Hamburger — absolute right */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden absolute right-4 flex flex-col gap-[5px] p-1 cursor-pointer"
          >
            <span className={`w-5 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
            <span className={`w-5 h-[1.5px] ${hamburgerColor} transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
