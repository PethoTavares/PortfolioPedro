import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Social Media',
    category: 'Posts & Campanhas',
    image: '/assets/social-media/Post---Sicoob---21.01.jpg',
  },
  {
    title: 'Banners Web',
    category: 'Design Digital',
    image: '/assets/banners/BANNER_SITE - Fast Consórsio 10.04.webp',
  },
  {
    title: 'Conteúdo Educativo',
    category: 'Carrossel & Stories',
    image: '/assets/carrossel/Rota-Do-Iniciante_Carrossel---Vip_01.jpg',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function MoreProjects() {
  return (
    <section className="py-[100px] md:py-[140px] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="flex items-end justify-between mb-16"
        >
          <h2
            className="text-[clamp(1.75rem,4vw,3rem)] font-medium tracking-[-0.03em] leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Categorias
          </h2>
          <a
            href="#work"
            className="hidden md:flex items-center gap-2 text-[13px] text-[#888] hover:text-white transition-colors duration-300"
          >
            Ver todos
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href="#work"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group block"
            >
              <div className="overflow-hidden rounded-[6px] bg-[#141414] mb-5 aspect-[4/3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-[16px] font-medium text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-[13px] text-[#666] font-light">
                    {project.category}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
