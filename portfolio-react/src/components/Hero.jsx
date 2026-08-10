import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  'pt-BR': {
    roleA: 'Designer Gr\u00E1fico',
    roleB: 'Frontend Developer',
    roleC: 'UI/UX',
  },
  en: {
    roleA: 'Graphic Designer',
    roleB: 'Frontend Developer',
    roleC: 'UI/UX',
  },
}

export default function Hero() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isDark = theme === 'dark'
  const text = copy[language]

  const subtitleColor = isDark ? 'text-[#888]' : 'text-[#999]'

  return (
    <section className="relative pt-[60px] pb-[40px] md:pt-[80px] md:pb-[60px]">
      <div className="relative flex min-h-[72vh] w-full flex-col items-center justify-center overflow-hidden px-4 text-center md:min-h-[76.5vh]">
        <motion.h1
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-5 font-medium leading-[1] tracking-[-0.04em]"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
        >
          Pedro Tavares
        </motion.h1>

        <div className="relative z-10 min-h-[1.75rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={language}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`text-[clamp(0.85rem,1.6vw,1.05rem)] ${subtitleColor} relative z-10 font-light uppercase tracking-[0.08em] transition-colors duration-500`}
            >
              {text.roleA} <span className={isDark ? 'text-[#333]' : 'text-[#ccc]'}>/</span> {text.roleB}{' '}
              <span className={isDark ? 'text-[#333]' : 'text-[#ccc]'}>/</span> {text.roleC}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
