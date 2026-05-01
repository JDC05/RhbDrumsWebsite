import { motion } from 'framer-motion'
import { Hand, Activity, Plug, Globe } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

const steps = [
  {
    icon: Hand,
    number: '01',
    title: 'Hit the TRUE-SKIN drum',
    body: 'A real drum skin vibrates naturally — just like an acoustic kit.',
  },
  {
    icon: Activity,
    number: '02',
    title: "Vibration converts to analogue signal",
    body: 'No triggers. No samples. No digital processing.',
  },
  {
    icon: Plug,
    number: '03',
    title: 'Plug into any amp, interface, mixer, or PA',
    body: 'Instant sound. No mics. No setup. No software.',
  },
  {
    icon: Globe,
    number: '04',
    title: 'Play anywhere',
    body: 'Home, studio, gig — Thunder Drums adapts instantly.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            The Technology
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold">
            How It <span className="gold-shimmer">Works</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Funnel image */}
          <motion.div
            className="glass-card rounded-2xl p-6 flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={`${CDN}69b08f42da731_HowitWorksFunnel.png`}
              alt="How it Works diagram"
              className="max-w-full w-full max-w-sm mx-auto drop-shadow-[0_0_30px_rgba(198,166,103,0.1)]"
            />
          </motion.div>

          {/* Steps timeline */}
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  className="flex gap-6 group"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full border-2 border-gold/40 bg-gold/10 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300 shrink-0">
                      <Icon size={20} className="text-gold" />
                    </div>
                    {i < steps.length - 1 && (
                      <motion.div
                        className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-gold/40 to-gold/10 mt-2"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <span className="text-gold/40 text-xs font-bold tracking-widest uppercase">
                      Step {step.number}
                    </span>
                    <h3 className="text-cream font-bold text-lg mt-1 mb-1 group-hover:text-gold transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-cream/60 text-base leading-relaxed">{step.body}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Closing */}
        <motion.div
          className="mt-16 glass-card rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-cream/80 text-lg md:text-xl leading-relaxed">
            It's simple: you hit the drum, the skin vibrates, the ThunderDrum converts that
            vibration into a{' '}
            <span className="text-gold font-semibold">pure analogue signal</span>, and you
            amplify, record, and play.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
