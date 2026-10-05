import Reveal from './Reveal.jsx'
import { TEAM } from '../data'

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
)
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4V9h4v1.5A6 6 0 0 1 16 8ZM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
)

export default function Team() {
  return (
    <section className="section bg-ivory" aria-label="Our team">
      <div className="container">
        <Reveal className="section-head center" style={{ marginBottom: 52 }}>
          <span className="label">Our Team</span>
          <h2 className="h2">Meet the Experts</h2>
        </Reveal>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i % 4} className="team-card">
              <div className="team-photo">
                <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" />
                <div className="team-links">
                  <a href={m.email} aria-label={`Email ${m.name}`}><IconMail /></a>
                  <a href={m.phone} aria-label={`Call ${m.name}`}><IconPhone /></a>
                  <a href="#" aria-label={`${m.name} on LinkedIn`} onClick={(e) => e.preventDefault()}><IconLinkedin /></a>
                </div>
              </div>
              <h4>{m.name}</h4>
              <span>{m.role}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
