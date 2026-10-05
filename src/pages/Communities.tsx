import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { communities } from '../data/communities'

export default function Communities() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        eyebrow="Explore Dubai"
        title="Communities"
        subtitle="Discover the neighbourhoods that define luxury living in Dubai."
        image="https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?auto=format&fit=crop&w=1920&q=80"
      />
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {communities.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <button
                  onClick={() => navigate(`/communities/${c.slug}`)}
                  className="group relative block w-full rounded-3xl overflow-hidden aspect-[3/4] text-left"
                >
                  <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent transition-opacity group-hover:from-navy-950/90" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                    <p className="text-xs text-white/70 mb-3 line-clamp-2">{c.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gold font-semibold">{c.propertyCount} Properties</span>
                      <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center group-hover:bg-gold group-hover:text-navy-900 transition-all">
                        <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
