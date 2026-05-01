import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'

const links = [
  { label: 'Mission', href: '#mission' },
  { label: 'Revolution', href: '#revolution' },
  { label: 'Problems', href: '#problems' },
  { label: 'Solution', href: '#solution' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Features', href: '#features' },
  { label: 'Community', href: '#community' },
]

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(latest > 50)
    if (latest > prev && latest > 150) {
      setHidden(true)
      setMobileOpen(false)
    } else {
      setHidden(false)
    }
  })

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <motion.header
      className={`fixed top-3 left-3 right-3 z-50 rounded-2xl transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-dark/90 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40'
          : 'bg-transparent'
      }`}
      animate={{ y: hidden ? -120 : 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className="flex items-center justify-between px-5 py-3">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 cursor-pointer group">
          <img
            src={`${CDN}69a3381902a9a_logohammerwhite.png`}
            alt="Thunder Drums"
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-cream font-bold text-sm tracking-widest uppercase hidden sm:block">
            Thunder Drums
          </span>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-5">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/60 hover:text-gold text-sm font-medium transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#revolution"
            className="hidden sm:inline-flex items-center bg-gold text-dark text-sm font-bold px-5 py-2 rounded-full hover:bg-gold-light transition-colors duration-200 cursor-pointer"
          >
            Join Now
          </a>
          <button
            className="lg:hidden text-cream p-1 cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden lg:hidden"
      >
        <div className="px-5 pb-5 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-cream/70 hover:text-gold text-base font-medium py-2 border-b border-white/5 transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#revolution"
            onClick={() => setMobileOpen(false)}
            className="mt-2 bg-gold text-dark text-sm font-bold px-5 py-3 rounded-full text-center hover:bg-gold-light transition-colors duration-200 cursor-pointer"
          >
            Join the Revolution
          </a>
        </div>
      </motion.div>
    </motion.header>
  )
}
