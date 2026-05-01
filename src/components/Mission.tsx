import { motion } from 'framer-motion'

const paragraphs = [
  "We've been playing in a band for years — guitar, bass, vocals, and of course, drums. Every instrument was easy to live with, whether we were recording, performing, amplifying, transporting, or even just leaving it in the corner of a room…",
  "...except one — the drums.",
  "It always felt like the drummer carried an unfair burden, no matter what they chose. Either you could enjoy an acoustic kit and sacrifice half your living space to a wooden behemoth, or you bite the bullet and buy a MIDI kit that packs away neatly… and usually stays packed away because you never actually want to play it.",
  "So we set out to build a kit that gives you everything you adore about acoustic drums — the feel, the rebound, the raw physicality — without demanding the lifestyle that usually comes with them. A kit that behaves with the convenience of an electronic setup, but sounds and responds like the real thing.",
  "With our system, drumming becomes simple again: the instrument you love, without the labour of love.",
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Mission() {
  return (
    <section id="mission" className="bg-dark py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Story
        </motion.p>

        <motion.h2
          className="text-cream text-3xl md:text-5xl font-bold leading-tight mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          We're on a mission to change drumming —{' '}
          <span className="text-gold">here's why</span>
        </motion.h2>

        <div className="flex flex-col gap-6">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`text-cream/75 text-lg leading-relaxed ${
                i === 1 ? 'text-gold font-semibold text-2xl italic' : ''
              }`}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.p
          className="mt-10 text-2xl md:text-3xl font-bold text-cream"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          This is drumming,{' '}
          <span className="gold-shimmer">liberated.</span>
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mt-16 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
    </section>
  )
}
