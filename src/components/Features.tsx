import { motion } from 'framer-motion'
import { Radio, Minimize2, MicOff, Music2 } from 'lucide-react'

const features = [
  {
    icon: Radio,
    title: 'PURE ANALOGUE SIGNAL',
    body: 'Produces a true analogue audio signal directly from the drum skin. Record or amplify instantly with plug-and-play simplicity.',
  },
  {
    icon: Minimize2,
    title: '70% REDUCED SHELL DEPTH',
    body: 'A compact design that takes up a fraction of the space. Store and transport your kit cheaply, easily, and without a van.',
  },
  {
    icon: MicOff,
    title: 'NO EXTERNAL MICROPHONES',
    body: 'Your sound is captured directly from the drum. No bleed, no noise, no setup — just clean, consistent tone.',
  },
  {
    icon: Music2,
    title: 'TRUE SKIN TECHNOLOGY',
    body: 'A real drum skin produces the sound, not a digital trigger. Real feel, real dynamics, real drumming.',
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-dark-2 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Features
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold">
            Why <span className="gold-shimmer">ThunderDrum</span>?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
                className="glass-card rounded-2xl p-8 group hover:border-gold/20 transition-all duration-300 cursor-default"
                whileHover={{ y: -4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-300">
                  <Icon size={24} className="text-gold" />
                </div>
                <h3 className="text-gold font-bold text-sm tracking-widest uppercase mb-3">
                  {f.title}
                </h3>
                <p className="text-cream/75 text-base leading-relaxed">{f.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
