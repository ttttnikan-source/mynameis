import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from './Header.jsx'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS } from '../data'

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
)
const IconPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)

const SOCIALS = [
  { label: 'Instagram', path: 'M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Zm-4 12.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5ZM17.2 6.8a.9.9 0 1 1 .9.9.9.9 0 0 1-.9-.9Z' },
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A6 6 0 0 1 16 8ZM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z' },
  { label: 'X', path: 'M4 3l7.1 9.5L4.4 21h2.6l5.3-6.7L17 21h4l-7.5-10L20 3h-2.6l-4.8 6L8 3H4Z' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const onSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Logo />
            <p>
              Horizon Properties connects people with extraordinary homes and smart
              investments across America's most desirable markets.
            </p>
            <div className="footer-social">
              {SOCIALS.map((s) => (
                <a key={s.label} href="#" aria-label={s.label} onClick={(e) => e.preventDefault()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5>Explore</h5>
            <ul className="footer-links">
              {NAV_LINKS.map((l) => (
                <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul className="footer-contact">
              <li><IconPhone /> <a href={PHONE_TEL}>{PHONE_DISPLAY}</a></li>
              <li><IconMail /> <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><IconPin /> {ADDRESS}</li>
            </ul>
          </div>

          <div>
            <h5>Newsletter</h5>
            <p style={{ fontSize: 14 }}>Market insight and new listings, once a month.</p>
            {subscribed ? (
              <p className="newsletter-msg" role="status">Thanks — you're on the list.</p>
            ) : (
              <form className="newsletter" onSubmit={onSubscribe}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Email address"
                />
                <button type="submit">Join</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</span>
          <span><a href="#" onClick={(e) => e.preventDefault()}>Privacy</a> · <a href="#" onClick={(e) => e.preventDefault()}>Terms</a></span>
        </div>
      </div>
    </footer>
  )
}
