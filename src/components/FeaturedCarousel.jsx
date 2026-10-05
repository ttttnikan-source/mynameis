import Reveal from './Reveal.jsx'
import Carousel from './Carousel.jsx'
import PropertyCard from './PropertyCard.jsx'

export default function FeaturedCarousel({ properties, title = 'Featured Properties', label = 'Featured' }) {
  return (
    <section className="section carousel-section" aria-label={title}>
      <div className="container">
        <Reveal className="section-head center">
          <span className="label">{label}</span>
          <h2 className="h2">{title}</h2>
        </Reveal>
      </div>
      <Reveal delay={1}>
        <div className="container carousel-wrap">
          <Carousel
            ariaLabel={`${title} carousel`}
            items={properties}
            renderItem={(p, i) => (
              <PropertyCard key={p.id} property={p} variant="overlay" wide={i % 4 === 0} />
            )}
          />
        </div>
      </Reveal>
    </section>
  )
}
