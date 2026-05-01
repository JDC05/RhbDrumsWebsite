import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'

const acoustic = [
  'Amplification is costly and complicated',
  'Microphones are an expensive nightmare',
  'Transporting a kit requires a van (and money)',
  'Drums take up half your living space',
  'Live sound checks take forever',
  'Playing without amplification kills your sound',
]

const midi = [
  'Feels fake and uninspiring',
  'Glitches, lag, and VST headaches',
  'Miss-hits and unreliable triggering',
  'Samples never match real tone from a skin',
  'Decent kits cost a fortune',
  'Bulky, plasticky, and ugly',
]

function ProblemCard({
  title,
  items,
  delay,
  direction,
}: {
  title: string
  items: string[]
  delay: number
  direction: 'left' | 'right'
}) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-8"
      initial={{ opacity: 0, x: direction === 'left' ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="text-gold text-lg font-bold tracking-wider uppercase mb-6 flex items-center gap-2">
        <span className="w-8 h-px bg-gold/50" />
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-cream/75 text-base"
            initial={{ opacity: 0, x: direction === 'left' ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: delay + 0.1 + i * 0.06 }}
          >
            <XCircle size={18} className="text-red-400/70 mt-0.5 shrink-0" />
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function Problems() {
  return (
    <section id="problems" className="bg-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            The Problem
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold mb-4">
            You have a problem —{' '}
            <span className="text-gold">it's your drumkit</span>
          </h2>
          <p className="text-cream/60 text-lg max-w-2xl mx-auto">
            Whether acoustic or MIDI, every drumkit brings its own set of problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <ProblemCard title="Acoustic Problems" items={acoustic} delay={0} direction="left" />
          <ProblemCard title="MIDI Problems" items={midi} delay={0.1} direction="right" />
        </div>

        <motion.p
          className="text-center text-xl md:text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="text-cream/80">
            Unfortunately there has been no escape of these issues —
          </span>{' '}
          <span className="gold-shimmer">until NOW</span>
        </motion.p>
      </div>
    </section>
  )
}
