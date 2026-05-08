import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, CheckCircle2 } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36" aria-hidden="true">
      <path
        fill="#5865F2"
        d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
      />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-grad)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  )
}

const socials = [
  {
    name: 'Discord',
    Icon: DiscordIcon,
    label: 'JOIN OUR DISCORD SERVER',
    body: 'Connect directly with us and stay close to the ThunderDrum journey. Share ideas, give feedback, and be part of shaping the future of drumming.',
    href: 'https://discord.gg/tnm3u9cN',
    cta: 'Join Discord',
  },
  {
    name: 'Instagram',
    Icon: InstagramIcon,
    label: 'FOLLOW US ON INSTAGRAM',
    body: 'See key moments, progress updates, and the evolution of the ThunderDrum. Get behind-the-scenes insights on our journey.',
    href: 'https://www.instagram.com/rhb_analogue_drums/',
    cta: 'Follow @rhb_analogue_drums',
  },
]

export default function Community() {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data?.message || 'Something went wrong. Please try again.')
        return
      }

      setFeedbackSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
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
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
            >
              <motion.div
                whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="mb-5"
              >
                <s.Icon className="w-20 h-20" />
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
              <label htmlFor="feedback" className="sr-only">Your feedback</label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
                placeholder="Tell us what excites you most about the ThunderDrum — the compact size, pure analogue sound, no microphone setup, or something else entirely..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream placeholder-cream/30 text-base focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all duration-200 resize-none"
              />
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <motion.button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto sm:self-end bg-gold text-dark font-bold px-8 py-3 rounded-full text-base hover:bg-gold-light transition-colors duration-200 cursor-pointer shadow-lg shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
                whileHover={{ scale: submitting ? 1 : 1.04 }}
                whileTap={{ scale: submitting ? 1 : 0.97 }}
              >
                {submitting ? 'Sending…' : 'Send Feedback'}
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
            className="h-10 w-auto mx-auto mb-3 opacity-60 block"
            loading="lazy"
          />
          <p className="text-cream/40 text-sm">
            © 2026 RHB Analogue Drums. All rights reserved.
          </p>
          <p className="text-cream/30 text-xs mt-1 italic">Drumming, Liberated.</p>
        </motion.div>
      </div>
    </section>
  )
}
