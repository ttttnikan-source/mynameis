import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import FeaturedCarousel from '../components/FeaturedCarousel.jsx'
import Services from '../components/Services.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import Team from '../components/Team.jsx'
import CTA from '../components/CTA.jsx'
import { PROPERTIES } from '../data'

export default function Home() {
  const featured = PROPERTIES.filter((p) => p.featured)
  return (
    <>
      <Hero />
      <About />
      <FeaturedCarousel properties={featured} />
      <Services />
      <WhyChoose />
      <Team />
      <CTA />
    </>
  )
}
