import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Gallery from '../components/Gallery.jsx'
import Carousel from '../components/Carousel.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { useFavorites } from '../hooks'
import { propertyById, PROPERTIES, AGENTS, PHONE_DISPLAY, PHONE_TEL, img } from '../data'

const IconBed = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>
)
const IconBath = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h16a1 1 0 0 1 1 1 5 5 0 0 1-5 5H8a5 5 0 0 1-5-5 1 1 0 0 1 1-1Z"/><path d="M6 12V5a2 2 0 0 1 4 0"/><path d="M9 18l-1 3M15 18l1 3"/></svg>
)
const IconArea = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3h18v18H3z"/><path d="M3 9h6V3"/></svg>
)
const IconHome = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/></svg>
)
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>
)

export default function PropertyDetailPage() {
  const { slug } = useParams()
  const property = propertyById(slug)
  const { has, toggle } = useFavorites()

  if (!property) {
    return (
      <section className="section">
        <div className="container empty">
          <h3 className="h3">Property not found</h3>
          <p style={{ marginBottom: 24 }}>This listing may have been removed.</p>
          <Link to="/properties" className="btn">Browse all properties</Link>
        </div>
      </section>
    )
  }

  const agent = AGENTS[property.agent]
  const similar = PROPERTIES.filter((p) => p.id !== property.id)
    .sort((a, b) => (b.type === property.type) - (a.type === property.type) || Math.abs(a.price - property.price) - Math.abs(b.price - property.price))
    .slice(0, 4)
  const facts = [
    { icon: <IconBed />, value: property.beds, label: 'Bedrooms' },
    { icon: <IconBath />, value: property.baths, label: 'Bathrooms' },
    { icon: <IconArea />, value: property.sqft, label: 'Square feet' },
    { icon: <IconHome />, value: property.type, label: 'Property type' },
  ]

  return (
    <>
      <section className="section tight" style={{ paddingTop: 130 }}>
        <div className="container">
          <Link to="/properties" className="clear-btn" style={{ display: 'inline-block', marginBottom: 20 }}>
            ← Back to properties
          </Link>
          <div className="detail-top">
            <div>
              <h1 className="h1">{property.name}</h1>
              <p className="lead" style={{ marginTop: 6 }}>{property.location}</p>
            </div>
            <div className="detail-price-row">
              <span className="detail-price">{property.priceLabel}</span>
              <button
                className={`fav-btn${has(property.id) ? ' active' : ''}`}
                onClick={() => toggle(property.id)}
                aria-pressed={has(property.id)}
                aria-label={has(property.id) ? 'Remove from favorites' : 'Save to favorites'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={has(property.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/></svg>
              </button>
            </div>
          </div>

          <Gallery images={property.images} name={property.name} />

          <div className="facts">
            {facts.map((f) => (
              <div className="fact" key={f.label}>
                {f.icon}
                <div><b>{f.value}</b><span>{f.label}</span></div>
              </div>
            ))}
          </div>

          <div className="detail-grid">
            <Reveal className="detail-desc">
              <h2>About this property</h2>
              <p>{property.description}</p>
              <h3 className="detail-sub">Key features</h3>
              <ul className="feature-list">
                {property.features.map((f) => (
                  <li key={f}><IconCheck /> {f}</li>
                ))}
              </ul>
              <h3 className="detail-sub">Amenities</h3>
              <ul className="amenity-chips">
                {property.amenities.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </Reveal>

            <Reveal delay={1}>
              <aside className="agent-card" aria-label="Listing agent">
                <div className="agent-head">
                  <img src={agent.photo} alt={`Portrait of ${agent.name}`} loading="lazy" />
                  <div>
                    <b>{agent.name}</b>
                    <span>{agent.role}</span>
                  </div>
                </div>
                <Link
                  to={`/contact?property=${encodeURIComponent(property.name)}`}
                  className="btn"
                >
                  Contact Agent
                </Link>
                <Link
                  to={`/contact?property=${encodeURIComponent(property.name)}&viewing=1`}
                  className="btn-outline-navy"
                >
                  Schedule a Viewing
                </Link>
                <div className="agent-note">
                  <b>{PHONE_DISPLAY}</b>
                  Available 7 days a week, 9:00 – 19:00. Private showings by appointment.
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section tight bg-ivory" aria-label="Similar properties">
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: 40 }}>
            <span className="label">Keep Exploring</span>
            <h2 className="h2" style={{ fontSize: 30 }}>Similar Properties</h2>
          </Reveal>
          <Carousel
            ariaLabel="Similar properties carousel"
            items={similar}
            renderItem={(p, i) => (
              <PropertyCard key={p.id} property={p} variant="overlay" wide={i === 0} />
            )}
          />
        </div>
      </section>

      {/* Sticky contact bar on small screens */}
      <div className="mobile-cta">
        <Link to={`/contact?property=${encodeURIComponent(property.name)}&viewing=1`} className="btn">
          Schedule a Viewing
        </Link>
        <a href={PHONE_TEL} className="btn-outline-navy" style={{ background: '#fff', justifyContent: 'center' }}>
          {PHONE_DISPLAY}
        </a>
      </div>
    </>
  )
}
