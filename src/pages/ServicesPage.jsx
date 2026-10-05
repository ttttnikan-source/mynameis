import Reveal from '../components/Reveal.jsx'
import CTA from '../components/CTA.jsx'
import { SERVICES } from '../data'

const LONG = {
  'Luxury Home Sales': 'From private viewings to negotiation strategy, we represent buyers and sellers of architecturally significant homes. Every listing is prepared like a magazine feature; every purchase is navigated with discretion and precision.',
  'Property Investment': 'We identify, underwrite and acquire residential and mixed-use assets aligned to your yield targets and time horizon — including off-market opportunities never publicly listed.',
  'Property Marketing': 'Editorial photography, cinematic film, staging direction and targeted digital placement. Our campaigns are designed to make a property unforgettable in a crowded market.',
  'Real Estate Advisory': 'Independent, conflict-free counsel on portfolio shaping, market timing, 1031 exchanges and prime-market entry. We sit on your side of the table, exclusively.',
  'Property Valuation': 'Rigorous, defensible valuations for private owners, family offices and lending institutions — combining local comparables with architectural and land-value analysis.',
  'Relocation Services': 'One point of contact for neighborhood tours, school searches, move logistics and settling-in support, so a new city feels like home from week one.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="strip">
        <div className="container">
          <span className="label">What We Do</span>
          <h1 className="h1" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>Services Built Around You</h1>
          <p className="lead">Six disciplines, one standard: calm, precise, premium execution.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: 0, maxWidth: 860, margin: '0 auto' }}>
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} className="service-card" style={{ padding: '34px 0' }}>
                <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                  <span className="service-num" style={{ marginTop: 6 }}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 style={{ fontSize: 22 }}>{s.title}</h3>
                    <p style={{ marginTop: 10 }}>{LONG[s.title]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
