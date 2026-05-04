import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

const powers = ['ease', 'space', 'amplification', 'enjoyment']

export default function Solution() {
  return (
    <section id="solution" className="bg-dark-2 py-24 px-6 relative overflow-hidden">
      {/* Gold radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            The Answer
          </p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <Zap size={28} className="text-gold" fill="#C6A667" />
            <h2 className="text-cream text-3xl md:text-5xl font-bold">
              The Solution —{' '}
              <span className="gold-shimmer">THUNDERDRUMS</span>
            </h2>
            <Zap size={28} className="text-gold" fill="#C6A667" />
          </div>
        </motion.div>

        <motion.div
          className="glass-card rounded-2xl p-8 md:p-12 mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-cream/85 text-lg md:text-xl leading-relaxed mb-6">
            Introducing the world's first{' '}
            <span className="text-gold font-bold">TRUE analogue drumkit</span>. We've engineered
            a completely new type of drum that produces a{' '}
            <span className="text-gold font-semibold">
              pure analogue audio signal directly from the drum skin
            </span>{' '}
            — no microphones, no software, no digital triggers. It's{' '}
            <span className="text-gold font-bold">70% smaller</span>, fully plug-and-play, and
            gives you the{' '}
            <span className="text-gold font-semibold">real feel and nuance</span> of acoustic
            drumming with none of the hassle.
          </p>

          <p className="text-cream/80 text-lg md:text-xl leading-relaxed">
            Thunder Drums gives you power:{' '}
            {powers.map((p, i) => (
              <span key={p}>
                <span className="text-gold font-bold">Power</span>{' '}
                <span className="text-cream/70">in {p}</span>
                {i < powers.length - 1 ? '. ' : '.'}
              </span>
            ))}
          </p>
        </motion.div>

        {/* Tagline graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src={`${CDN}69b082e64adb1_TrueFeel.TrueSound.TrueFreedomPNG.png`}
            alt="True Feel. True Sound. True Freedom."
            className="block w-3/4 sm:w-full max-w-xl mx-auto drop-shadow-[0_0_40px_rgba(198,166,103,0.2)]"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
