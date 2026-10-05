import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import { ABOUT_MAIN, ABOUT_SIDE } from '../data'

export default function About() {
  return (
    <section className="section">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <span className="label">About Us</span>
          <h2 className="h2" style={{ marginBottom: 20 }}>Who We Are</h2>
          <p className="lead">
            At Horizon Properties, we connect people with extraordinary homes and
            smart investments. Integrity, transparency, and client satisfaction
            are at the heart of everything we do.
          </p>
          <Link to="/about" className="btn">
            Learn More
            <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </Link>
        </Reveal>

        <Reveal delay={1} className="about-media">
          <Link to="/about" className="about-main" aria-label="Learn more about Horizon Properties">
            <img src={ABOUT_MAIN} alt="Luxury modern home with pool and palm trees" loading="lazy" />
          </Link>
          <div className="about-side">
            <img src={ABOUT_SIDE} alt="Contemporary residence exterior detail" loading="lazy" />
          </div>
          <Link to="/about" className="about-arrow" aria-label="Explore more about us">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
