import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Phone, Building2 } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Properties', path: '/properties' },
  { label: 'Communities', path: '/communities' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Insights', path: '/insights' },
  { label: 'Contact', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isHome = location.pathname === '/'
  const headerSolid = scrolled || !isHome

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerSolid
            ? 'bg-navy-900/90 backdrop-blur-xl shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center transition-all group-hover:bg-gold/25">
                <Building2 className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <span className="text-white font-bold text-sm tracking-[0.1em] uppercase leading-tight">
                Horizon<br className="hidden sm:block sm:hidden" />
                <span className="hidden sm:inline"> </span>Properties
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const active = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                      active ? 'text-gold' : 'text-white/85 hover:text-gold'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-px bg-gold" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+97141234567" className="flex items-center gap-2 text-white/85 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-medium">+971 4 123 4567</span>
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-gold/50"
              >
                Book a Consultation
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {/* Scroll progress line */}
        {scrolled && <div className="h-px bg-gradient-to-r from-gold via-gold to-transparent" />}
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-navy-900 shadow-2xl transition-transform duration-400 pt-20 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col p-6 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-gold bg-gold/10'
                    : 'text-white/85 hover:text-gold hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+97141234567" className="flex items-center gap-2 px-4 py-3.5 text-white/85">
              <Phone className="w-4 h-4" /> +971 4 123 4567
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="btn-gold mt-4 w-full"
            >
              Book a Consultation
            </button>
          </nav>
        </div>
      </div>
    </>
  )
}
