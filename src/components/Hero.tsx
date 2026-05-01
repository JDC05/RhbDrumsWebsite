import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="hero" ref={ref} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${CDN}69a74b4d7c5b6_1866719.jpg)`,
          y: bgY,
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/50 to-dark" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-transparent to-dark/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ y: contentY, opacity }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Left: Text */}
          <div className="md:col-span-3 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="gold-shimmer text-[clamp(3.5rem,12vw,9rem)] font-bold leading-[0.9] tracking-tight">
                THUNDER
                <br />
                DRUMS
              </h1>
            </motion.div>

            <motion.p
              className="text-cream text-lg md:text-2xl font-light tracking-widest mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            >
              by RHB — Analogue Drums
            </motion.p>

            <motion.p
              className="text-cream/50 text-base md:text-lg mt-2 italic font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              Drumming, Liberated.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
            >
              <motion.a
                href="#revolution"
                className="inline-flex items-center gap-2 bg-gold text-dark font-bold px-8 py-4 rounded-full text-base hover:bg-gold-light transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/20"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Join the Revolution
              </motion.a>
              <motion.a
                href="#mission"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-medium px-8 py-4 rounded-full text-base hover:border-gold hover:text-gold transition-colors duration-200 cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Logo */}
          <motion.div
            className="md:col-span-2 hidden md:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-125" />
              <img
                src={`${CDN}69a3381902a9a_logohammerwhite.png`}
                alt="Thunder Drums Hammer Logo"
                className="relative w-44 md:w-64 lg:w-72 drop-shadow-[0_0_80px_rgba(198,166,103,0.35)]"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#mission"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40 hover:text-gold transition-colors duration-200 cursor-pointer flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        aria-label="Scroll down"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={20} />
      </motion.a>
    </section>
  )
}
