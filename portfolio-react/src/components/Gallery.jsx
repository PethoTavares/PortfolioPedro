import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

const sectionData = [
  {
    id: 'social-media',
    label: { 'pt-BR': 'Social Media', en: 'Social Media' },
    images: [
      '/assets/social-media/01. Post - Bradesco - Campanhas Always On.jpg',
      '/assets/social-media/Post---Sicoob---21.01.jpg',
      '/assets/social-media/Post - BV Placas Solares - 29.01.2025.jpg',
      '/assets/social-media/Post-IG-BV-13.03.25.jpg',
      '/assets/social-media/Post-FB_Leilão_Camaro_14.03.jpg',
      '/assets/social-media/01.-Post-IG-Leilão-Premium-18.03.jpg',
      '/assets/social-media/01.-Post-IG-Leilão-de-Pesados-21.03.jpg',
      '/assets/social-media/Post Meta - TJSP - Fazenda - 30.04.26.jpg',
      '/assets/social-media/META - Post IG BRA_Leilão 07.04.26.jpg',
      '/assets/social-media/Capa-Carrossel---Leilão-de-Oportunidades-20.03.jpg',
      '/assets/social-media/Capa Post-IG-Leilão-Veículos-de-Trânsito-31.03.jpg',
      '/assets/social-media/Post 1350px KV1 - Campanha Quero Vender_Março 26.jpg',
      '/assets/social-media/VIP_OlhoNoLance_PostFeed_1080x1080.png',
      '/assets/social-media/01.-Post-IG-Leilão-Financiamento_23.05.jpg',
      '/assets/social-media/Post Leilão Sabadão 31.05.jpg',
      '/assets/social-media/Post  IG Leilão Especial Motos 06.06.2025.jpg',
      '/assets/social-media/Post-IG---Leilão-Premium-TJPI-29.05.jpg',
      '/assets/social-media/CONSORCIO - POST 1200 X 1200 - 10.04@1x_1.jpg',
      '/assets/social-media/Post IG - Santander 10.06.25.jpg',
      '/assets/social-media/01.-Post-FB---Ação-Recompra.jpg',
      '/assets/social-media/01.Post-IG---BV-27.03.25.jpg',
      '/assets/social-media/Post - LEILÃO - SMDT - 180326.jpg',
      '/assets/social-media/Post - Leilão Pesados 11.65.2025.jpg',
      '/assets/social-media/01. Post IG Leilão Veículos Detran MA_13.06.2025.png',
    ],
  },
  {
    id: 'conteudo',
    label: { 'pt-BR': 'Conteudo', en: 'Content' },
    images: [
      '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_01.jpg',
      '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_02.jpg',
      '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_03.jpg',
      '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_04.jpg',
      '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_05.jpg',
      '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_06.jpg',
    ],
  },
  {
    id: 'banners',
    label: { 'pt-BR': 'Banners', en: 'Banners' },
    images: [
      '/assets/banners/VIP_Correios_Banner Site_Mais Barato copiar.jpg',
      '/assets/banners/02. BANNER_SITE - SICOOB - 30 e 31.03.26.webp',
      '/assets/banners/BANNER_SITE - Fast Consórsio 10.04.webp',
      '/assets/banners/Banner Site - BV Placa Solares 30.04.25.webp',
      '/assets/banners/Banner Site - SICOOB 07 e 09.04.25 copy.webp',
      '/assets/banners/BANNER_SITE - BRA 08 e 12.05.webp',
    ],
  },
  {
    id: 'campanhas',
    label: { 'pt-BR': 'Campanhas', en: 'Campaigns' },
    images: [
      '/assets/campanhas/KV - Campanha SP - Cadastro MASP.jpg',
      '/assets/campanhas/KV - Campanha SP - Visite o pátio.jpg',
      '/assets/campanhas/AON Lote a Lote - Alto investimento - SP.jpg',
      '/assets/campanhas/Carrossel - Recorrentes.jpg',
    ],
  },
  {
    id: 'portfolio',
    label: { 'pt-BR': 'Flex Academia', en: 'Flex Gym' },
    images: [
      '/assets/Portfolio/Flex_NovaTurmaYoga_POST.png',
      '/assets/Portfolio/Flex_NovaTurmaYoga_STORY.png',
      '/assets/Portfolio/Flex_TV_NovaTurmaYogaTV.png',
      '/assets/Portfolio/Flex_Email Post.png',
      '/assets/Portfolio/Flex_Email Stories.png',
      '/assets/Portfolio/Flex Email TV.png',
      '/assets/Portfolio/Flex_Whatsapp Post.png',
      '/assets/Portfolio/Flex_Whatsapp Stories.png',
      '/assets/Portfolio/Flex Whatsapp TV.png',
      '/assets/Portfolio/BannerWhatsExemplo.png',
      '/assets/Portfolio/Mockup Camiseta Flex.png',
      '/assets/Portfolio/MockupWindBanner.png',
      '/assets/Portfolio/ExemploAdesivo.png',
      '/assets/Portfolio/ExemploBanner.png',
      '/assets/Portfolio/ExemploMedalha.png',
      '/assets/Portfolio/FlexKidsFerias - Post.png',
      '/assets/Portfolio/FlexKidsFerias - Stories.png',
      '/assets/Portfolio/FlexKidsFeriasEmMovimento.png',
      '/assets/Portfolio/AulaoJuninoFlex.png',
      '/assets/Portfolio/Flex Aulao Junino Stories.png',
      '/assets/Portfolio/ExemploVoucher.png',
    ],
  },
]

const allImages = sectionData.flatMap((section) => section.images)

function Lightbox({ index, onClose, onPrev, onNext }) {
  const src = allImages[index]
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  const btnClass = isDark
    ? 'bg-white/8 hover:bg-white/15 text-white/70 hover:text-white'
    : 'bg-white/40 hover:bg-white/60 text-black/60 hover:text-black'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 ${
        isDark ? 'bg-black/92' : 'bg-white/92'
      } backdrop-blur-md`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt=""
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-full max-h-[88vh] object-contain rounded-[4px] cursor-default"
        />
      </AnimatePresence>

      <button onClick={onClose} className={`absolute top-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${btnClass} transition-all duration-300`}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <button onClick={(e) => { e.stopPropagation(); onPrev() }} className={`absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full md:left-8 ${btnClass} transition-all duration-300`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button onClick={(e) => { e.stopPropagation(); onNext() }} className={`absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full md:right-8 ${btnClass} transition-all duration-300`}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 text-[12px] font-light tabular-nums ${isDark ? 'text-white/30' : 'text-black/30'}`}>
        {index + 1} / {allImages.length}
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { theme } = useTheme()
  const { language } = useLanguage()
  const isDark = theme === 'dark'
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const openLightbox = useCallback((src) => {
    const idx = allImages.indexOf(src)
    setLightboxIndex(idx >= 0 ? idx : null)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % allImages.length)
  }, [])

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + allImages.length) % allImages.length)
  }, [])

  const cardBg = isDark ? 'bg-[#131315]' : 'bg-[#e8e8e3]'
  const titleColor = isDark ? 'text-white' : 'text-[#1a1a1a]'

  return (
    <>
      <section className="pb-[80px] md:pb-[120px]">
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 space-y-[80px] md:space-y-[110px]">
          {sectionData.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="scroll-mt-[80px]"
            >
              <div className="mb-8 md:mb-10">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={`${section.id}-${language}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium tracking-[-0.02em] ${titleColor} text-center transition-colors duration-500`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {section.label[language]}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 md:gap-5">
                {section.images.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{
                      duration: 0.75,
                      delay: (i % 3) * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => openLightbox(src)}
                    className={`group overflow-hidden rounded-[4px] ${cardBg} cursor-zoom-in transition-colors duration-500`}
                    style={{ aspectRatio: '1 / 1' }}
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:brightness-110"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
