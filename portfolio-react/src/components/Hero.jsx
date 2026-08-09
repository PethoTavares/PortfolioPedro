import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const copy = {
  'pt-BR': {
    roleA: 'Designer Grafico',
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
      <div className="relative w-full px-4 text-center min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 1.15, filter: 'blur(18px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 font-medium leading-[1] tracking-[-0.04em] mb-5"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
        >
          Pedro Tavares
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 text-[clamp(0.85rem,1.6vw,1.05rem)] ${subtitleColor} font-light tracking-[0.08em] uppercase transition-colors duration-500`}
        >
          {text.roleA} <span className={isDark ? 'text-[#333]' : 'text-[#ccc]'}>/</span> {text.roleB}{' '}
          <span className={isDark ? 'text-[#333]' : 'text-[#ccc]'}>/</span> {text.roleC}
        </motion.p>
      </div>
    </section>
  )
}
