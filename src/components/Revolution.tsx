import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const bullets = [
  { icon: '🎵', text: 'Amplify your sound instantly' },
  { icon: '🎙️', text: 'Record cleanly — no microphones, no setup' },
  { icon: '📦', text: 'Store your kit without sacrificing your home' },
  { icon: '🚚', text: 'Take it anywhere without breaking your back' },
  { icon: '🎛️', text: 'Shape your sound in seconds' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Revolution() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const [firstName, ...rest] = form.name.trim().split(' ')
    const lastName = rest.join(' ') || undefined

    try {
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, firstName, lastName, phoneNumber: form.phone || undefined }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.detail || 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="revolution" className="bg-dark-2 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Join Us
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold">
            We need you to join the{' '}
            <span className="gold-shimmer">REVOLUTION</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Info */}
          <motion.div
            className="glass-card rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-cream/80 text-lg leading-relaxed mb-8">
              At RHB Analogue Drums, we're building the Thunder Drum — a breakthrough system
              designed to give drummers{' '}
              <span className="text-gold font-semibold">real freedom</span>, not just another
              compromise.
            </p>

            <motion.ul
              className="flex flex-col gap-4 mb-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-3 text-cream/85 text-base"
                >
                  <span className="text-lg">{b.icon}</span>
                  <span>{b.text}</span>
                </motion.li>
              ))}
            </motion.ul>

            <p className="text-gold font-bold text-lg mb-4">
              No microphones. No limits. Just pure analogue power.
            </p>

            <p className="text-cream/70 text-base leading-relaxed mb-6">
              But here's the truth: we don't want to build this{' '}
              <em>for</em> drummers — we want to build it{' '}
              <strong className="text-cream">WITH</strong> drummers. If you want to influence
              the future of the instrument you love, help us shape the Thunder Drum from the
              ground up.
            </p>

            <p className="text-gold/90 font-semibold text-base animate-pulse">
              ⚡ Join the community. Claim your spot. Sign up now. ⚡
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="glass-card rounded-2xl p-8 md:p-10 flex flex-col justify-center"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <motion.div
                className="flex flex-col items-center text-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle2 size={56} className="text-gold" />
                <h3 className="text-cream text-2xl font-bold">You're in the Revolution!</h3>
                <p className="text-cream/70 text-base leading-relaxed">
                  Thank you for joining. We'll be in touch with exclusive updates, early access,
                  and behind-the-scenes insights.
                </p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-cream text-2xl font-bold mb-2">Claim Your Spot</h3>
                <p className="text-cream/60 text-sm mb-8">
                  Get exclusive early access to Thunder Drums.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-cream/70 text-sm font-medium mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-cream/70 text-sm font-medium mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-cream/70 text-sm font-medium mb-1.5"
                    >
                      Phone Number{' '}
                      <span className="text-cream/40 font-normal">(optional)</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+44 7700 000000"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 text-sm focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 w-full bg-gold text-dark font-bold py-4 rounded-full text-base hover:bg-gold-light transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: submitting ? 1 : 1.02 }}
                    whileTap={{ scale: submitting ? 1 : 0.98 }}
                  >
                    {submitting ? 'Signing up…' : 'SIGN UP'}
                  </motion.button>

                  <p className="text-center text-cream/35 text-xs mt-1">
                    We will not send spam.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
