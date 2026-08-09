import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const previewImages = [
  '/assets/Portfolio/AulaoJuninoFlex.png',
  '/assets/Portfolio/Mockup Camiseta Flex.png',
  '/assets/campanhas/KV - Campanha SP - Cadastro MASP.jpg',
  '/assets/social-media/Post---Sicoob---21.01.jpg',
  '/assets/Portfolio/FlexKidsFeriasEmMovimento.png',
  '/assets/social-media/Post-FB_Leilão_Camaro_14.03.jpg',
  '/assets/campanhas/AON Lote a Lote - Alto investimento - SP.jpg',
  '/assets/social-media/VIP_OlhoNoLance_PostFeed_1080x1080.png',
]

const copy = {
  'pt-BR': {
    roleA: 'Designer Grafico',
    roleB: 'Frontend Developer',
    roleC: 'UI/UX',
    description:
      'Neste portfolio, voce encontra uma selecao de artes digitais, mockups e materiais de campanha desenvolvidos para manter consistencia visual entre redes sociais, eventos e pontos de contato da marca.',
  },
  en: {
    roleA: 'Graphic Designer',
    roleB: 'Frontend Developer',
    roleC: 'UI/UX',
    description:
      'In this portfolio, you will find a selection of digital pieces, mockups, and campaign materials created to keep a consistent visual language across social media, events, and brand touchpoints.',
  },
}

export default function Hero() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isDark = theme === 'dark'
  const text = copy[language]
  const containerRef = useRef(null)
  const [visibleImages, setVisibleImages] = useState([])
  const indexRef = useRef(0)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const lastTimeRef = useRef(0)

  const handleMouseMove = (e) => {
    const now = Date.now()
    if (now - lastTimeRef.current < 250) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist > 120) {
      lastTimeRef.current = now
      lastPosRef.current = { x, y }
      const idx = indexRef.current % previewImages.length
      indexRef.current++

      const id = Date.now() + Math.random()
      const rotation = Math.random() * 14 - 7

      setVisibleImages((prev) => [
        ...prev.slice(-2),
        { id, src: previewImages[idx], x, y, rotation },
      ])

      setTimeout(() => {
        setVisibleImages((prev) => prev.filter((img) => img.id !== id))
      }, 1200)
    }
  }

  const subtitleColor = isDark ? 'text-[#888]' : 'text-[#999]'
  const descColor = isDark ? 'text-[#555]' : 'text-[#aaa]'
  const imgShadow = isDark ? 'shadow-black/60' : 'shadow-black/15'
  const imgRing = isDark ? 'ring-white/5' : 'ring-black/5'

  return (
    <section className="relative pt-[60px] pb-[40px] md:pt-[80px] md:pb-[60px]">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setVisibleImages([])}
        className="relative w-full px-4 text-center min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center cursor-default overflow-hidden"
      >
        <AnimatePresence>
          {visibleImages.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.3, rotate: img.rotation, filter: 'blur(10px)' }}
              animate={{ opacity: 0.65, scale: 1, rotate: img.rotation * 0.5, filter: 'blur(0px)' }}
              exit={{
                opacity: 0,
                scale: 0.5,
                filter: 'blur(8px)',
                transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute pointer-events-none z-0"
              style={{ left: img.x - 55, top: img.y - 42 }}
            >
              <div className={`w-[110px] h-[84px] rounded-[3px] overflow-hidden shadow-2xl ${imgShadow} ring-1 ${imgRing}`}>
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`relative z-10 text-[clamp(0.8rem,1.3vw,0.95rem)] ${descColor} font-light max-w-[520px] mt-7 leading-[1.7] transition-colors duration-500`}
        >
          {text.description}
        </motion.p>
      </div>
    </section>
  )
}
