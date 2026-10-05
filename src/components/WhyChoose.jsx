import Reveal from './Reveal.jsx'
import { WHY_IMAGE } from '../data'

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
)
const IconChart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18"/><path d="m7 14 4-4 4 3 5-6"/></svg>
)
const IconKey = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
)
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></svg>
)

const POINTS = [
  { icon: <IconShield />, title: 'Trusted Expertise', desc: 'Decades of combined experience across luxury sales, investment and advisory.' },
  { icon: <IconChart />, title: 'Market Intelligence', desc: 'Off-market access and rigorous analysis, so you buy and sell with confidence.' },
  { icon: <IconKey />, title: 'Seamless Process', desc: 'One dedicated point of contact from first viewing through final signature.' },
  { icon: <IconHeart />, title: 'Client-First', desc: 'We measure success by the relationships we keep — most clients return or refer.' },
]

export default function WhyChoose() {
  return (
    <section className="section" aria-label="Why choose Horizon">
      <div className="container why-grid">
        <Reveal>
          <div className="why-media">
            <img src={WHY_IMAGE} alt="Modern villa with pool at golden hour" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={1}>
          <span className="label">Why Choose Us</span>
          <h2 className="h2">The Horizon Advantage</h2>
          <div className="why-list">
            {POINTS.map((p) => (
              <div className="why-item" key={p.title}>
                <span className="why-icon">{p.icon}</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
