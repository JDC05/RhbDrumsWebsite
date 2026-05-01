import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

const products = [
  { src: `${CDN}69a2efe5bcff4_3quarterright.png`, label: '3/4 Right View' },
  { src: `${CDN}69a2ef0486e33_3quarterleft.png`, label: '3/4 Left View' },
  { src: `${CDN}69a2efeeb973b_frontortho.png`, label: 'Front View' },
  { src: `${CDN}69a2efeb46217_backortho.png`, label: 'Back View' },
  { src: `${CDN}69a2eff155767_sideorthoL.png`, label: 'Side Left View' },
  { src: `${CDN}69a2eff36fe26_sideortho.png`, label: 'Side Right View' },
  { src: `${CDN}69a2effa30c07_toportho.png`, label: 'Top View' },
]

export default function ProductGallery() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(0)

  const navigate = (next: number) => {
    const clamped = (next + products.length) % products.length
    setDirection(next > active ? 1 : -1)
    setActive(clamped)
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60, scale: 0.96 }),
    center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60, scale: 0.96, transition: { duration: 0.25 } }),
  }

  return (
    <section id="gallery" className="bg-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            The Product
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold">
            Meet the <span className="gold-shimmer">ThunderDrum</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Main image */}
          <div className="glass-card rounded-2xl p-4 md:p-8 mb-6 relative overflow-hidden gold-glow">
            <div className="relative h-72 md:h-96 overflow-hidden rounded-2xl mb-4">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={products[active].src}
                    alt={products[active].label}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_0_40px_rgba(198,166,103,0.15)]"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(active - 1)}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/50 transition-all duration-200 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              <p className="text-cream/60 text-sm font-medium tracking-wider uppercase">
                {products[active].label}
              </p>

              <button
                onClick={() => navigate(active + 1)}
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold/50 transition-all duration-200 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 justify-center flex-wrap">
            {products.map((p, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                className={`w-16 h-16 rounded-xl border overflow-hidden transition-all duration-200 cursor-pointer ${
                  i === active
                    ? 'border-gold shadow-md shadow-gold/20 scale-110'
                    : 'border-white/10 hover:border-gold/40 opacity-60 hover:opacity-90'
                }`}
                aria-label={p.label}
              >
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-contain bg-dark-3 p-1"
                  loading="lazy"
                />
              </button>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === active ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
