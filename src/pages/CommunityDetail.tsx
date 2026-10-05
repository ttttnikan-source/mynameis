import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import { getCommunityBySlug } from '../data/communities'
import { properties } from '../data/properties'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import PageHeader from '../components/PageHeader'

export default function CommunityDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const community = slug ? getCommunityBySlug(slug) : undefined

  if (!community) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-navy-400 mb-4">Community not found.</p>
        <Link to="/communities" className="btn-primary">Back to Communities</Link>
      </div>
    )
  }

  const communityProperties = properties.filter(p => p.community === community.name)

  return (
    <>
      <PageHeader
        eyebrow="Community"
        title={community.name}
        subtitle={community.shortDescription}
        image={community.image}
      />

      {/* Overview */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3]">
                <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="eyebrow mb-3">About {community.name}</div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4 tracking-tight">A Premier Dubai Address</h2>
              <p className="text-navy-400 leading-relaxed mb-6">{community.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-mist">
                  <div className="text-2xl font-bold text-navy-900">{community.propertyCount}</div>
                  <div className="text-sm text-navy-400">Available Properties</div>
                </div>
                <div className="p-4 rounded-2xl bg-mist">
                  <div className="text-2xl font-bold text-navy-900">{community.averagePrice}</div>
                  <div className="text-sm text-navy-400">Average Price</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Highlights */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-navy-900 mb-5">Community Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {community.highlights.map((h, i) => (
                <Reveal key={h} delay={i * 80}>
                  <div className="flex items-center gap-2.5 p-4 rounded-2xl border border-navy-50">
                    <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-gold" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-navy-700">{h}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Properties in community */}
      <section className="py-12 lg:py-16 bg-mist">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-navy-900">Properties in {community.name}</h2>
            <Link to="/properties" className="text-sm font-semibold text-navy-800 hover:text-gold flex items-center gap-1.5 transition-colors">
              View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
          {communityProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {communityProperties.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin className="w-10 h-10 text-navy-200 mx-auto mb-3" strokeWidth={1} />
              <p className="text-navy-400">No properties currently available in this community.</p>
              <button onClick={() => navigate('/properties')} className="btn-primary mt-5">Browse All Properties</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
