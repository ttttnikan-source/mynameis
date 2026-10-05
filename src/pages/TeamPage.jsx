import Reveal from '../components/Reveal.jsx'
import Team from '../components/Team.jsx'
import CTA from '../components/CTA.jsx'

export default function TeamPage() {
  return (
    <>
      <section className="strip">
        <div className="container">
          <span className="label">Our Team</span>
          <h1 className="h1" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>People You Can Rely On</h1>
          <p className="lead">Advisors who know the market — and answer the phone.</p>
        </div>
      </section>
      <Team />
      <CTA />
    </>
  )
}
