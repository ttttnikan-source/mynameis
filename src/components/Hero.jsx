import { HERO_IMAGE } from '../data'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="h1 fade-in">Discover Exceptional<br />Homes &amp; Investments</h1>
        <p className="lead fade-in d1">
          Premium properties in prime locations. Find your dream home
          or the perfect investment with confidence.
        </p>
      </div>
      <div className="hero-media">
        <img
          src={HERO_IMAGE}
          alt="Modern luxury villa with glass walls and an infinity pool at dusk"
          fetchpriority="high"
        />
      </div>
    </section>
  )
}
