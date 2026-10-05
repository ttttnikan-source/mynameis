import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from '../data'

export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="Horizon Properties — home">
      <svg className="brand-mark" width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="32" height="32" rx="7" stroke="#c79a4e" strokeWidth="1.4" />
        <path d="M8 25V14.5L17 7l9 7.5V25" stroke="#c79a4e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 25v-5.5h8V25" stroke="#c79a4e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 25h24" stroke="#c79a4e" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="brand-name">
        <b>HORIZON</b>
        <span>PROPERTIES</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="container header-inner">
          <Logo />
          <nav className="nav" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-cta">
            <a className="btn-outline-light" href={PHONE_TEL}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {PHONE_DISPLAY}
            </a>
            <button
              className={`burger${open ? ' open' : ''}`}
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        {NAV_LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'active' : '')} end={l.to === '/'}>
            {l.label}
          </NavLink>
        ))}
        <a className="mm-cta btn-outline-light" href={PHONE_TEL} style={{ justifyContent: 'center' }}>
          {PHONE_DISPLAY}
        </a>
      </div>
    </>
  )
}
