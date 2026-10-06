import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, MapPin, Home, Tag, Bed, ChevronDown } from 'lucide-react'

/**
 * Scroll-driven hero video ("scroll scrubbing").
 *
 * The video NEVER autoplays and is never played via video.play() — the user's
 * scroll position drives video.currentTime directly through a rAF loop with
 * smoothing, so the timeline feels physically attached to the scroll (both
 * directions) without stutter or seek flooding.
 *
 * Encoding notes for smooth random-access seeking:
 * - The source MP4 (public/videos/hero.mp4) is a compact, web-optimized
 *   H.264 file (~2.2 MB). Ideal characteristics for scrubbing are: frequent
 *   keyframes (keyint <= ~1s / 30 frames), moderate bitrate (2–6 Mbps),
 *   1080p max resolution, H.264 "High" profile with a closed GOP, faststart
 *   (moov atom at the front). If the video is ever re-encoded, e.g.:
 *   ffmpeg -i in.mp4 -an -c:v libx264 -profile:v high -preset slow -crf 21
 *     -g 30 -keyint_min 30 -sc_threshold 0 -movflags +faststart out.mp4
 *   Frequent keyframes matter most: every currentTime write snaps to the
 *   nearest preceding keyframe, so sparse keyframes cause visible frame jumps.
 */

const HERO_VIDEO = '/videos/hero.mp4'
const HERO_FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80'

/** Total scroll distance of the hero, in viewport heights. Tune to taste. */
const HERO_SCROLL_VH = 320
/** 0..1 — lower = more responsive, higher = silkier. 0.14 feels attached. */
const SMOOTHING = 0.14
/** Minimum seconds between currentTime writes (seek flood guard). */
const MIN_SEEK_DELTA = 0.05

const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial']
const locations = ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Dubai Hills Estate', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Dubai Creek Harbour']
const purposes = ['Buy', 'Rent', 'Invest']
const priceRanges = ['AED 500K', 'AED 1M', 'AED 2M', 'AED 5M+', 'Custom']
const bedrooms = ['Studio', '1', '2', '3', '4+']

export default function Hero() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('Buy')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [beds, setBeds] = useState('')

  // Zero-dependency reduced-motion detection (no re-render churn).
  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (purpose) params.set('purpose', purpose)
    if (type) params.set('type', type)
    if (location) params.set('community', location)
    if (price) params.set('price', price)
    if (beds) params.set('beds', beds)
    navigate(`/properties?${params.toString()}`)
  }

  // ------------------------------------------------------------------
  // Scroll scrub engine — all timeline work happens here, never in state.
  // ------------------------------------------------------------------
  useEffect(() => {
    if (reducedMotion) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    // Scroll track bounds, cached and refreshed only on resize (no per-scroll layout reads).
    let start = 0
    let end = 1
    const measure = () => {
      const rect = section.getBoundingClientRect()
      start = rect.top + window.scrollY
      end = start + section.offsetHeight - window.innerHeight
    }
    measure()
    window.addEventListener('resize', measure)

    let ready = false
    const onLoadedData = () => {
      ready = true
      setVideoReady(true)
    }
    const onError = () => setVideoFailed(true)
    // Hard guarantee: nothing in this experience ever plays the video.
    const guardPlay = () => {
      video.pause()
      video.currentTime = Math.min(video.currentTime, Number.isFinite(video.duration) ? video.duration : video.currentTime)
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('error', onError)
    video.addEventListener('play', guardPlay)
    video.pause()

    const target = { p: 0 }
    const current = { p: 0 }
    let rafId: number | null = null

    const applyProgress = (converged: boolean) => {
      const duration = video.duration
      if (ready && Number.isFinite(duration) && duration > 0) {
        const t = current.p * duration
        // Seek flood guard: only write currentTime when the frame meaningfully
        // changes, or once — exactly — when the animation settles.
        if (converged || Math.abs(t - video.currentTime) > MIN_SEEK_DELTA) {
          video.currentTime = t
        }
      }
      // Direct DOM writes for the chrome (no React re-renders on scroll).
      const content = contentRef.current
      if (content) {
        const fade = Math.min(1, current.p / 0.15)
        content.style.opacity = String(1 - fade)
        content.style.transform = `translateY(${(-fade * 48).toFixed(1)}px)`
        content.style.pointerEvents = fade >= 0.999 ? 'none' : ''
      }
      const search = searchRef.current
      if (search) {
        const fade = Math.min(1, current.p / 0.22)
        search.style.opacity = String(1 - fade)
        search.style.pointerEvents = fade >= 0.999 ? 'none' : ''
      }
    }

    const tick = () => {
      const diff = target.p - current.p
      if (Math.abs(diff) < 0.0005) {
        current.p = target.p
        applyProgress(true) // land exactly on the target frame, then stop the loop
        rafId = null
        return
      }
      current.p += diff * SMOOTHING
      applyProgress(false)
      rafId = requestAnimationFrame(tick)
    }

    // Passive listener: only computes the target progress and wakes the loop.
    const onScroll = () => {
      const span = end - start
      target.p = span > 0 ? Math.min(1, Math.max(0, (window.scrollY - start) / span)) : 0
      if (rafId === null) rafId = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', measure)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('error', onError)
      video.removeEventListener('play', guardPlay)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  const searchProps = {
    purpose, setPurpose, type, setType, location, setLocation,
    price, setPrice, beds, setBeds, onSearch: handleSearch,
  }

  // ------------------------------------------------------------------
  // Reduced motion: simple static hero (fallback image), no scrub animation.
  // ------------------------------------------------------------------
  if (reducedMotion) {
    return (
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
        <HeroBackdrop />
        <HeroContent />
        <HeroSearch innerRef={searchRef} {...searchProps} />
      </section>
    )
  }

  return (
    // Tall scroll track — the viewport pins inside it while the video scrubs.
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Fallback image layer — also the graceful failure / pre-load state */}
        <HeroBackdrop dimmed={videoReady && !videoFailed} />

        {/* Scroll-scrubbed video — muted, inline, never plays on its own */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          muted
          playsInline
          preload="auto"
          disableRemotePlayback
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
            videoReady && !videoFailed ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle readability veil — keeps the video visually dominant */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-navy-900/20 to-navy-950/60" />

        {/* Text fades away as the camera starts moving */}
        <div ref={contentRef} className="absolute inset-x-0 top-0 z-10 will-change-transform">
          <HeroContent />
        </div>

        {/* Floating search bar, fades out as the scrub experience begins */}
        <div ref={searchRef} className="absolute -bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-10 translate-y-1/2 will-change-transform">
          <HeroSearch innerRef={undefined} {...searchProps} />
        </div>

        {/* Minimal premium loading hint */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 transition-opacity duration-700 ${
            videoReady || videoFailed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">Preparing experience</span>
        </div>

        {/* Scroll hint */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}>
          <ChevronDown className="w-5 h-5 animate-bounce" strokeWidth={1.5} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Static pieces ---------- */

function HeroBackdrop({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <div className="absolute inset-0">
      <img
        src={HERO_FALLBACK_IMAGE}
        alt="Luxury Dubai villa at dusk"
        className="w-full h-full object-cover"
      />
      {dimmed && <div className="absolute inset-0 bg-navy-950/60" />}
    </div>
  )
}

function HeroContent() {
  const navigate = useNavigate()
  return (
    <div className="text-center px-4 sm:px-6 pt-28 pb-20 max-w-4xl mx-auto">
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
        <button onClick={() => navigate('/properties')} className="btn-gold w-full sm:w-auto">
          Explore Properties
        </button>
        <button onClick={() => navigate('/contact')} className="btn-outline w-full sm:w-auto">
          Book a Consultation
        </button>
      </div>
      <p className="mt-8 text-sm text-white/50 tracking-wide">
        Trusted Property Advisory • Dubai • UAE
      </p>
    </div>
  )
}

type SearchProps = {
  purpose: string; setPurpose: (v: string) => void
  type: string; setType: (v: string) => void
  location: string; setLocation: (v: string) => void
  price: string; setPrice: (v: string) => void
  beds: string; setBeds: (v: string) => void
  onSearch: () => void
  innerRef?: React.Ref<HTMLDivElement>
}

function HeroSearch({ purpose, setPurpose, type, setType, location, setLocation, price, setPrice, beds, setBeds, onSearch, innerRef }: SearchProps) {
  return (
    <div ref={innerRef} className="mx-auto max-w-6xl rounded-3xl bg-white/95 backdrop-blur-xl shadow-card-hover p-5 sm:p-6">
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
        <button onClick={onSearch} className="btn-gold sm:ml-auto flex-1 sm:flex-none">
          <Search className="w-4 h-4" strokeWidth={1.5} />
          Search Properties
        </button>
      </div>
    </div>
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
