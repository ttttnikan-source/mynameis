import { Link } from 'react-router-dom'
import { img } from '../data'

const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)

/**
 * variant "overlay" — image card with info overlaid at the bottom (carousel).
 * variant "tile" — image on top, info in a white body below (grids).
 */
export default function PropertyCard({ property, variant = 'tile', wide = false }) {
  const { id, name, location, priceLabel, type } = property
  const cover = img(property.images[0], variant === 'overlay' ? 900 : 800)

  if (variant === 'overlay') {
    return (
      <Link to={`/properties/${id}`} className={`p-card overlay${wide ? ' wide' : ''}`} aria-label={`${name}, ${location}, ${priceLabel}`}>
        <img src={cover} alt={name} loading="lazy" />
        <div className="p-shade" aria-hidden="true" />
        <div className="p-info">
          <h3>{name}</h3>
          <span className="p-loc"><IconPin /> {location}</span>
          <div className="p-price">{priceLabel}</div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/properties/${id}`} className="p-card tile" aria-label={`${name}, ${location}, ${priceLabel}`}>
      <div className="p-media">
        <img src={cover} alt={name} loading="lazy" />
        {property.featured && <span className="p-badge">Featured</span>}
      </div>
      <div className="p-body">
        <h3>{name}</h3>
        <span className="p-loc"><IconPin /> {location}</span>
        <div className="p-meta">
          <span className="p-price">{priceLabel}</span>
          <span className="p-type">{type}</span>
        </div>
      </div>
    </Link>
  )
}
