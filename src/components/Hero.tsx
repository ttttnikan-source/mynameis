import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, MapPin, Home, Tag, Bed, ChevronDown } from 'lucide-react'

// ---------------------------------------------------------------------------
// Scroll-driven hero video
//
// Hosted source (per user request — not stored in the repo). If this URL is
// replaced, prefer a web-optimized MP4 (H.264, yuv420p, `+faststart` so the
// moov atom sits at the front) or a WebM/VP9 companion source:
//   - keyframe interval ~1s (frequent keyframes make random-access seeking,
//     which is what scroll scrubbing does hundreds of times, fast and cheap)
//   - 1080p max resolution, ~4–8 Mbps bitrate — plenty under an object-cover
//     hero, and small enough for mobile decoders
//   - CBR-ish rate control for predictable buffering
// Long-GOP encodings with keyframes every few seconds stutter badly when
// scrubbed, because every seek decodes from the previous keyframe.
// ---------------------------------------------------------------------------
const HERO_VIDEO_URL =
  'https://media.base44.com/videos/public/6ac39f26c10dc04d5bd50a62/762201135_HooshaAI_2026_10_05_171726.mp4'

// Scroll distance for the pinned hero: 300vh section / 100vh viewport.
const HERO_SCROLL_VH = 300

const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial']
const locations = ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Dubai Hills Estate', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Dubai Creek Harbour']
const purposes = ['Buy', 'Rent', 'Invest']
const priceRanges = ['AED 500K', 'AED 1M', 'AED 2M', 'AED 5M+', 'Custom']
const bedrooms = ['Studio', '1', '2', '3', '4+']

// Seconds — a new seek is only issued past this threshold (≈ one frame at
// 30fps), so raw scroll events never flood the decoder with currentTime writes.
const SEEK_EPSILON = 0.02
// If the target jumps this far from the in-flight seek (fast scrolling),
// interrupt the pending seek immediately instead of waiting for `seeked`.
const SEEK_INTERRUPT = 0.35
// Interpolation factor per frame — high enough to stay directly connected to
// the scroll, low enough to absorb scroll-event jitter into smooth motion.
const SMOOTHING = 0.22
// Fraction of the scroll range over which the hero copy fades away.
const TEXT_FADE_END = 0.3

export default function Hero() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('Buy')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [beds, setBeds] = useState('')

  // Static, non-interactive state — updated only on media lifecycle events,
  // never from scroll handlers (scroll progress lives in refs below).
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const targetProgress = useRef(0)
  const currentTime = useRef(0)
  const seekInFlight = useRef(false)

  const scrubbing = !reducedMotion && !videoFailed

  // --- Scroll → timeline engine -------------------------------------------
  // The passive scroll listener ONLY records target progress. Every
  // video.currentTime write happens inside a single requestAnimationFrame
  // loop, smoothed toward the target, and only when it differs meaningfully
  // from the rendered frame — so the video never "plays", it is scrubbed.
  useEffect(() => {
    if (!scrubbing) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    let raf = 0
    let duration = 0

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) {
        targetProgress.current = 0
        return
      }
      targetProgress.current = Math.min(1, Math.max(0, -rect.top / scrollable))
    }

    const onSeeked = () => { seekInFlight.current = false }

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const progress = targetProgress.current

      // Hero copy fades/moves away over the first part of the scroll —
      // direct style writes, no React re-render.
      const copy = copyRef.current
      if (copy) {
        const fade = Math.min(1, progress / TEXT_FADE_END)
        copy.style.opacity = String(1 - fade)
        copy.style.transform = `translateY(${(-32 * fade).toFixed(2)}px)`
        copy.style.visibility = fade === 1 ? 'hidden' : 'visible'
      }

      // Duration arrives asynchronously with metadata.
      if (!duration) {
        duration = video.duration
        if (!duration || Number.isNaN(duration)) return
      }

      // Not enough data to seek yet — park until the browser has a frame.
      if (video.readyState < 2) return

      // Smooth interpolation between the scroll target and rendered time.
      const target = progress * duration
      const current = currentTime.current
      const smoothed = current + (target - current) * SMOOTHING
      currentTime.current = smoothed

      const drift = Math.abs(smoothed - video.currentTime)
      if (drift <= SEEK_EPSILON) return
      if (seekInFlight.current && drift < SEEK_INTERRUPT) return

      video.currentTime = Math.min(Math.max(smoothed, 0), duration)
      seekInFlight.current = true
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    video.addEventListener('seeked', onSeeked)
    onScroll()
    raf = requestAnimationFrame(tick)

    // A fully buffered/cached video may fire `canplay` before this listener
    // attaches — reveal it immediately if data is already there.
    if (video.readyState >= 2) setVideoReady(true)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('seeked', onSeeked)
    }
  }, [scrubbing])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (purpose) params.set('purpose', purpose)
    if (type) params.set('type', type)
    if (location) params.set('community', location)
    if (price) params.set('price', price)
    if (beds) params.set('beds', beds)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <section
      ref={sectionRef}
      className={scrubbing ? 'relative' : 'relative min-h-[88vh] flex items-center justify-center overflow-hidden'}
      style={scrubbing ? { height: `${HERO_SCROLL_VH}vh` } : undefined}
    >
      {/* Sticky viewport — pinned while the user scrolls through the video */}
      <div
        className={
          scrubbing
            ? 'sticky top-0 h-screen overflow-hidden'
            : 'absolute inset-0'
        }
      >
        {/* Fallback image — always rendered underneath; also the error state */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Dubai villa at dusk"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scroll-scrubbed video — muted/paused, timeline driven by scroll */}
        {!videoFailed && (
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            preload="auto"
            muted
            playsInline
            // Deliberately NO autoplay, NO loop, NO play() — scroll scrubs it.
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoReady ? 'opacity-100' : 'opacity-0'
            }`}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        {/* Subtle readability overlay — video stays visually dominant */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-900/25 to-navy-950/55" />

        {/* Minimal loading treatment while the video prepares */}
        {scrubbing && !videoReady && !videoFailed && (
          <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center" aria-hidden="true">
            <div className="h-px w-40 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-1/3 animate-pulse rounded-full bg-gold" />
            </div>
          </div>
        )}

        {/* Content */}
        <div
          ref={copyRef}
          className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 pt-28 pb-24 max-w-4xl mx-auto will-change-transform"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm px-4 py-1.5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Dubai Luxury Real Estate</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight">
              Discover Exceptional
              <br />
              Homes &amp; Investments in Dubai
            </h1>
            <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              Explore Dubai's most distinguished properties, prime communities and exceptional investment opportunities.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/properties')}
                className="btn-gold w-full sm:w-auto"
              >
                Explore Properties
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="btn-outline w-full sm:w-auto"
              >
                Book a Consultation
              </button>
            </div>
            <p className="mt-8 text-sm text-white/50 tracking-wide">
              Trusted Property Advisory • Dubai • UAE
            </p>
          </div>
        </div>

        {/* Floating search bar */}
        <div className="absolute -bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-10 translate-y-1/2">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 backdrop-blur-xl shadow-card-hover p-5 sm:p-6">
            {/* Segmented purpose control */}
            <div className="flex items-center gap-1 mb-5 p-1 rounded-full bg-mist w-fit">
              {purposes.map(p => (
                <button
                  key={p}
                  onClick={() => setPurpose(p)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    purpose === p ? 'bg-navy-800 text-white shadow-sm' : 'text-navy-500 hover:text-navy-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <SelectField icon={Home} label="Property Type" value={type} onChange={setType} options={propertyTypes} placeholder="Any Type" />
              <SelectField icon={MapPin} label="Location" value={location} onChange={setLocation} options={locations} placeholder="Any Location" />
              <SelectField icon={Tag} label="Price Range" value={price} onChange={setPrice} options={priceRanges} placeholder="Any Price" />
              <SelectField icon={Bed} label="Bedrooms" value={beds} onChange={setBeds} options={bedrooms} placeholder="Any" />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
              <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-navy-500 hover:text-navy-800 transition-colors">
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
                Advanced Filters
              </button>
              <button
                onClick={handleSearch}
                className="btn-gold sm:ml-auto flex-1 sm:flex-none"
              >
                <Search className="w-4 h-4" strokeWidth={1.5} />
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SelectField({ icon: Icon, label, value, onChange, options, placeholder }: {
  icon: any; label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string
}) {
  return (
    <div className="relative">
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400 mb-1.5">
        <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-navy-100 bg-mist/50 px-4 py-3 text-sm font-medium text-navy-800 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 text-navy-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
      </div>
    </div>
  )
}
