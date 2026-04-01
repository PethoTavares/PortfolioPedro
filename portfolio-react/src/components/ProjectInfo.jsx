import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function ProjectInfo() {
  return (
    <section id="about" className="py-[80px] md:py-[120px]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left Column - Label */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="md:col-span-4 lg:col-span-3"
          >
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#555] font-medium">
              Sobre o projeto
            </p>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="md:col-span-8 lg:col-span-9"
          >
            <p className="text-[clamp(1.125rem,2vw,1.5rem)] text-[#ccc] leading-[1.7] font-light mb-8">
              Responsavel pela criacao de toda a identidade visual e campanhas digitais
              da VIP Leiloes, unindo estrategia de marketing com design de alto impacto.
              O trabalho envolveu posts para redes sociais, banners web, key visuals de
              campanhas e conteudo educativo — tudo pensado para engajar e converter.
            </p>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-[#888] leading-[1.8] font-light">
              As pecas atenderam parceiros como Bradesco, Sicoob, Santander, BV e
              Correios, mantendo consistencia visual enquanto adaptava a comunicacao
              para diferentes publicos e plataformas. Cada arte foi desenvolvida com
              foco em resultado — desde o engajamento organico ate campanhas de
              performance no Meta Ads.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
