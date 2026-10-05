import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import About from '../components/About.jsx'
import CTA from '../components/CTA.jsx'

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
)
const IconEye = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
)
const IconHandshake = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.9-3.9a2 2 0 0 0-2.8 0l-.8.8a2 2 0 0 1-2.8 0l-1.4-1.4L4 12l4 4"/><path d="m2 12 6-6"/><path d="m22 12-4-4"/></svg>
)
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z"/></svg>
)

const STATS = [
  { value: '18+', label: 'Years of Experience' },
  { value: '$2.4B', label: 'Property Sold' },
  { value: '900+', label: 'Happy Clients' },
  { value: '45', label: 'Design Awards' },
]

const VALUES = [
  { icon: <IconShield />, title: 'Integrity First', desc: 'Straight answers, full transparency and advice we would give our own family — before every transaction.' },
  { icon: <IconEye />, title: 'Curated, Not Crowded', desc: 'We list fewer properties and know each one intimately, so every introduction is worth your time.' },
  { icon: <IconHandshake />, title: 'Long-Term Relationships', desc: 'Nine out of ten clients return or refer us. We build for the decade, not the deal.' },
  { icon: <IconStar />, title: 'Quiet Excellence', desc: 'Premium is how we operate — precise communication, meticulous preparation, calm execution.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="strip">
        <div className="container">
          <span className="label">About Us</span>
          <h1 className="h1" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>Built on Trust, Defined by Design</h1>
          <p className="lead">A boutique agency for people who take homes — and investments — seriously.</p>
        </div>
      </section>

      <About />

      <section className="section tight bg-mist" aria-label="Company statistics">
        <div className="container">
          <div className="stats-row">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i % 4} className="stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Our values">
        <div className="container">
          <Reveal className="section-head center" style={{ marginBottom: 52 }}>
            <span className="label">Our Values</span>
            <h2 className="h2">What Guides Us</h2>
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i % 3} className="value-card">
                <span className="why-icon">{v.icon}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
