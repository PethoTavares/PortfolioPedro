import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroImage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.05, 1])

  return (
    <section ref={ref} className="px-4 md:px-8 lg:px-12 mb-[120px]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-[1400px] mx-auto overflow-hidden rounded-[6px]"
      >
        <motion.div style={{ y, scale }} className="will-change-transform">
          <img
            src="/assets/campanhas/KV - Campanha SP - Cadastro MASP.jpg"
            alt="KV Campanha São Paulo - Cadastro MASP"
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
