import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle2 } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

const socials = [
  {
    name: 'Discord',
    icon: `${CDN}69d556557ca343.52382698_discordiconwithf1eee7background.png`,
    label: 'JOIN OUR DISCORD SERVER',
    body: 'Connect directly with us and stay close to the ThunderDrum journey. Share ideas, give feedback, and be part of shaping the future of drumming.',
    href: 'https://discord.gg/tnm3u9cN',
    cta: 'Join Discord',
  },
  {
    name: 'Instagram',
    icon: `${CDN}69d556fc7693e9.01337736_instagramiconwithf1eee7background.png`,
    label: 'FOLLOW US ON INSTAGRAM',
    body: 'See key moments, progress updates, and the evolution of the ThunderDrum. Get behind-the-scenes insights on our journey.',
    href: 'https://www.instagram.com/rhb_analogue_drums/',
    cta: 'Follow @rhb_analogue_drums',
  },
]

export default function Community() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
  }

  return (
    <section id="community" className="bg-dark py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Community heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Connect
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold">
            Join the <span className="gold-shimmer">Community</span>
          </h2>
          <p className="text-cream/60 text-lg mt-4 max-w-xl mx-auto">
            Get breaking news, join our community, and unlock early perks.
          </p>
        </motion.div>

        {/* Social cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {socials.map((s, i) => (
            <motion.a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-8 flex flex-col items-center text-center group cursor-pointer hover:border-gold/20 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="mb-5"
              >
                <img
                  src={s.icon}
                  alt={s.name}
                  className="w-20 h-20 object-contain rounded-2xl"
                />
              </motion.div>

              <h3 className="text-gold font-bold text-sm tracking-widest uppercase mb-3">
                {s.label}
              </h3>
              <p className="text-cream/65 text-base leading-relaxed mb-5">{s.body}</p>

              <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                {s.cta}
                <ExternalLink size={14} />
              </span>
            </motion.a>
          ))}
        </div>

        {/* Perks */}
        <motion.div
          className="glass-card rounded-2xl p-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-cream text-xl font-bold mb-6 text-center">
            What you get as a community member
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'Breaking News', body: 'Exclusive updates on our progress, behind-the-scenes insights, and early access to launch announcements.' },
              { title: 'Community Voice', body: 'Connect with forward-thinking musicians. Share ideas, give feedback, and help shape the future of drumming.' },
              { title: 'Early Perks', body: 'First to hear about pre-orders, beta testing opportunities, and special offers for community members.' },
            ].map((perk, i) => (
              <motion.div
                key={i}
                className="flex flex-col gap-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={18} className="text-gold shrink-0" />
                  <h4 className="text-gold font-semibold text-sm tracking-wide">{perk.title}</h4>
                </div>
                <p className="text-cream/60 text-sm leading-relaxed">{perk.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Feedback form */}
        <motion.div
          className="glass-card rounded-2xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Your Voice Matters
            </p>
            <h3 className="text-cream text-2xl md:text-3xl font-bold">
              What features of Thunder Drums by RHB appeal most to you?
            </h3>
            <p className="text-cream/55 text-base mt-3">
              Give as much or as little detail as you like — we mainly want to know what you think.
            </p>
          </div>

          {feedbackSubmitted ? (
            <motion.div
              className="flex flex-col items-center text-center gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle2 size={52} className="text-gold" />
              <h4 className="text-cream text-xl font-bold">Thank you for your feedback!</h4>
              <p className="text-cream/60 text-base">
                Your input helps shape the future of the ThunderDrum.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleFeedback} className="flex flex-col gap-4">
              <label htmlFor="feedback" className="sr-only">
                Your feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                rows={5}
                placeholder="Tell us what excites you most about the ThunderDrum — the compact size, pure analogue sound, no microphone setup, or something else entirely..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 text-base focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200 resize-none"
              />
              <motion.button
                type="submit"
                className="self-end bg-gold text-dark font-bold px-8 py-3 rounded-full text-base hover:bg-gold-light transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/20"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Send Feedback
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-8" />
          <img
            src={`${CDN}69a3381902a9a_logohammerwhite.png`}
            alt="Thunder Drums"
            className="h-10 w-auto mx-auto mb-3 opacity-60"
          />
          <p className="text-cream/40 text-sm">
            © 2025 RHB Analogue Drums. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs mt-1 italic">Drumming, Liberated.</p>
        </motion.div>
      </div>
    </section>
  )
}
