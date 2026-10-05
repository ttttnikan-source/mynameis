import Reveal from './Reveal.jsx'
import { SERVICES } from '../data'

export default function Services() {
  return (
    <section className="section bg-ivory" aria-label="Our services">
      <div className="container">
        <Reveal className="section-head center" style={{ marginBottom: 52 }}>
          <span className="label">What We Do</span>
          <h2 className="h2">Our Services</h2>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i % 3} className="service-card">
              <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
