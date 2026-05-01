import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2 } from 'lucide-react'

const CDN = 'https://d1yei2z3i6k35z.cloudfront.net/15504798/'
const AUDIO_SRC = `${CDN}69d562d0ac4f26.44410067_EDITEDTest4-10mmMAGCORE-50mmfromouterdia-A500KPot-EQtheMagtoraisehighend.wav`
const WAVEFORM_SRC = `${CDN}69d568535583e0.82040545_Sound-FloorTom.png`

function formatTime(t: number): string {
  if (!isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioDemo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  // Register audio event listeners once on mount
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onLoad = () => setDuration(audio.duration)
    const onEnded = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoad)
    audio.addEventListener('ended', onEnded)
    audio.volume = 0.8
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoad)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // Update volume separately so event listeners are not re-registered
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Autoplay blocked by browser policy
      }
    }
  }

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const t = Number(e.target.value)
    audio.currentTime = t
    setCurrentTime(t)
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section id="audio-demo" className="bg-dark-2 py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Prototype Demo
          </p>
          <h2 className="text-cream text-3xl md:text-5xl font-bold">
            Hear It For <span className="gold-shimmer">Yourself</span>
          </h2>
        </motion.div>

        <motion.div
          className="glass-card rounded-2xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-cream/70 text-base leading-relaxed mb-8 text-center">
            Here's an early glimpse of our ThunderDrum technology in development.{' '}
            <strong className="text-cream">No microphones were used in this recording</strong>{' '}
            — the audio comes entirely from our prototype system. It's rough, it's early, but
            the potential is starting to show.
          </p>

          {/* Waveform image */}
          <div className="mb-8 rounded-xl overflow-hidden bg-dark/50">
            <img
              src={WAVEFORM_SRC}
              alt="Audio waveform - Floor Tom prototype recording"
              className="w-full object-cover opacity-80"
              loading="lazy"
            />
          </div>

          {/* Player */}
          <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

          <div className="flex flex-col gap-4">
            {/* Time + progress */}
            <div className="flex items-center gap-4">
              <span className="text-cream/50 text-xs font-mono w-10 text-right shrink-0">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 rounded-full bg-gold/50 pointer-events-none" style={{ width: `${progress}%` }} />
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.01}
                  value={currentTime}
                  onChange={seek}
                  className="relative w-full cursor-pointer"
                  aria-label="Seek"
                  style={{
                    background: `linear-gradient(to right, #C6A667 ${progress}%, rgba(255,255,255,0.15) ${progress}%)`,
                  }}
                />
              </div>
              <span className="text-cream/50 text-xs font-mono w-10 shrink-0">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1">
                <Volume2 size={16} className="text-cream/40 shrink-0" />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={changeVolume}
                  className="w-24 cursor-pointer"
                  aria-label="Volume"
                  style={{
                    background: `linear-gradient(to right, #C6A667 ${volume * 100}%, rgba(255,255,255,0.15) ${volume * 100}%)`,
                  }}
                />
              </div>

              <motion.button
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-dark cursor-pointer hover:bg-gold-light transition-colors duration-200 shadow-lg shadow-gold/30"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
              </motion.button>

              <div className="flex-1" />
            </div>
          </div>

          <p className="text-center text-cream/40 text-xs mt-6 italic">
            Curious what you think of the sound.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
