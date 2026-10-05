import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'

export default function CTA() {
  return (
    <section className="section tight" aria-label="Get in touch">
      <div className="container">
        <Reveal className="cta-card">
          <span className="cta-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
          </span>
          <div>
            <h3>Ready to Find Your Perfect Property?</h3>
            <p>Let our experts guide you to the right home or investment.</p>
          </div>
          <Link to="/contact" className="btn">
            Get in Touch
            <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
