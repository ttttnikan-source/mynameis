import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { MapPin, Bed, Bath, Maximize, Heart, Share2, Check, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Phone, Mail, MessageCircle, Calendar, Building2 } from 'lucide-react'
import { getPropertyBySlug, getRelatedProperties } from '../data/properties'
import { getAgentById } from '../data/agents'
import { useFavorites } from '../context/FavoritesContext'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'

export default function PropertyDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const property = slug ? getPropertyBySlug(slug) : undefined
  const { toggleFavorite, isFavorite } = useFavorites()
  const [activeImage, setActiveImage] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [formSent, setFormSent] = useState(false)

  if (!property) {
    return (
      <div className="pt-32 pb-20 text-center">
        <p className="text-navy-400 mb-4">Property not found.</p>
        <Link to="/properties" className="btn-primary">Back to Properties</Link>
      </div>
    )
  }

  const agent = getAgentById(property.agentId)
  const related = getRelatedProperties(property)
  const fav = isFavorite(property.id)

  return (
    <>
      {/* Gallery */}
      <section className="pt-24 lg:pt-28 pb-8">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-navy-400 hover:text-navy-800 mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back
          </button>

          <div className="grid lg:grid-cols-[1fr_360px] gap-4">
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] group cursor-pointer" onClick={() => setFullscreen(true)}>
              <img src={property.images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id) }}
                  className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/25 transition-all"
                >
                  <Heart className={`w-5 h-5 ${fav ? 'fill-gold text-gold' : 'text-white'}`} strokeWidth={1.5} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/10 hover:bg-white/25 transition-all">
                  <Share2 className="w-5 h-5 text-white" strokeWidth={1.5} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage - 1 + property.images.length) % property.images.length) }}
                  className="w-10 h-10 rounded-full bg-navy-900/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-navy-900 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage + 1) % property.images.length) }}
                  className="w-10 h-10 rounded-full bg-navy-900/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-navy-900 transition-all"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-3 lg:max-h-[400px] lg:overflow-y-auto no-scrollbar">
              {property.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-24 h-20 lg:w-full lg:h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Left: details */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="rounded-full bg-mist text-navy-800 text-xs font-semibold px-3 py-1.5">{property.propertyType}</span>
                    {property.offPlan && <span className="rounded-full bg-gold/15 text-gold text-xs font-semibold px-3 py-1.5">Off-Plan</span>}
                    <span className="rounded-full bg-navy-50 text-navy-500 text-xs font-semibold px-3 py-1.5">For {property.status}</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-navy-900 tracking-tight">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-navy-400 mt-2">
                    <MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} />
                    {property.location}, {property.community}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-3xl font-bold text-navy-900">{property.priceLabel}</div>
                  {property.rentalYield > 0 && <div className="text-sm text-gold font-semibold mt-1">{property.rentalYield}% Rental Yield</div>}
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 p-5 rounded-3xl bg-mist mb-8">
                <Stat icon={Bed} label="Bedrooms" value={property.bedrooms} />
                <Stat icon={Bath} label="Bathrooms" value={property.bathrooms} />
                <Stat icon={Maximize} label="Area" value={`${property.area.toLocaleString()} sq.ft`} />
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-900 mb-3">Description</h2>
                <p className="text-navy-400 leading-relaxed">{property.description}</p>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-sm text-navy-500">
                      <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-gold" strokeWidth={2} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-navy-900 mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map(a => (
                    <span key={a} className="rounded-full border border-navy-100 px-4 py-2 text-sm text-navy-500">{a}</span>
                  ))}
                </div>
              </div>

              {/* Developer + Investment info */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-3xl border border-navy-50">
                  <div className="flex items-center gap-2 text-navy-400 text-sm mb-1">
                    <Building2 className="w-4 h-4" strokeWidth={1.5} /> Developer
                  </div>
                  <div className="font-bold text-navy-900">{property.developer}</div>
                </div>
                {property.rentalYield > 0 && (
                  <div className="p-5 rounded-3xl border border-navy-50">
                    <div className="text-navy-400 text-sm mb-1">Estimated Rental Yield</div>
                    <div className="font-bold text-gold text-lg">{property.rentalYield}% per annum</div>
                  </div>
                )}
              </div>

              {/* Map placeholder */}
              <div className="rounded-3xl overflow-hidden aspect-[16/8] bg-mist relative">
                <div className="absolute inset-0 flex items-center justify-center text-navy-300">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 mx-auto mb-2 text-gold" strokeWidth={1} />
                    <p className="text-sm text-navy-400">{property.community}, Dubai, UAE</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-navy-50/50 to-mist" />
              </div>
            </div>

            {/* Right: agent + contact */}
            <div>
              <div className="sticky top-24 space-y-5">
                {/* Agent card */}
                {agent && (
                  <div className="rounded-3xl border border-navy-50 bg-white p-6 shadow-card">
                    <div className="flex items-center gap-4 mb-5">
                      <img src={agent.image} alt={agent.name} className="w-16 h-16 rounded-full object-cover" />
                      <div>
                        <div className="font-bold text-navy-900">{agent.name}</div>
                        <div className="text-sm text-navy-400">{agent.title}</div>
                      </div>
                    </div>
                    <div className="space-y-2.5 text-sm">
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 text-navy-500 hover:text-navy-800 transition-colors">
                        <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} /> {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 text-navy-500 hover:text-navy-800 transition-colors">
                        <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} /> {agent.email}
                      </a>
                    </div>
                    <div className="flex gap-2 mt-5">
                      <button className="flex-1 rounded-full bg-navy-800 text-white text-sm font-semibold py-2.5 flex items-center justify-center gap-1.5 hover:bg-navy-900 transition-all">
                        <MessageCircle className="w-4 h-4" strokeWidth={1.5} /> WhatsApp
                      </button>
                      <button className="flex-1 rounded-full border border-navy-200 text-navy-800 text-sm font-semibold py-2.5 flex items-center justify-center gap-1.5 hover:bg-mist transition-all">
                        <Calendar className="w-4 h-4" strokeWidth={1.5} /> Schedule
                      </button>
                    </div>
                  </div>
                )}

                {/* Contact form */}
                <div className="rounded-3xl border border-navy-50 bg-white p-6 shadow-card">
                  <h3 className="font-bold text-navy-900 mb-1">Request Information</h3>
                  <p className="text-xs text-navy-400 mb-4">Interested in this property? Send us a message.</p>
                  {formSent ? (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-gold" strokeWidth={2} />
                      </div>
                      <p className="text-sm text-navy-800 font-semibold">Message sent!</p>
                      <p className="text-xs text-navy-400 mt-1">We'll be in touch shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); setFormSent(true) }} className="space-y-3">
                      <input required placeholder="Full Name" className="w-full rounded-xl border border-navy-100 bg-mist/50 px-4 py-2.5 text-sm focus:outline-none focus:border-gold" />
                      <input required type="email" placeholder="Email" className="w-full rounded-xl border border-navy-100 bg-mist/50 px-4 py-2.5 text-sm focus:outline-none focus:border-gold" />
                      <input required type="tel" placeholder="Phone" className="w-full rounded-xl border border-navy-100 bg-mist/50 px-4 py-2.5 text-sm focus:outline-none focus:border-gold" />
                      <textarea placeholder="Your message" rows={3} className="w-full rounded-xl border border-navy-100 bg-mist/50 px-4 py-2.5 text-sm focus:outline-none focus:border-gold resize-none" />
                      <button type="submit" className="btn-primary w-full">Request Consultation</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-mist">
          <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900">Similar Properties</h2>
              <Link to="/properties" className="text-sm font-semibold text-navy-800 hover:text-gold flex items-center gap-1.5 transition-colors">
                View All <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <PropertyCard property={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen gallery */}
      {fullscreen && (
        <div className="fixed inset-0 z-[60] bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setFullscreen(false)}>
          <button className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all" onClick={() => setFullscreen(false)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <img src={property.images[activeImage]} alt={property.title} className="max-w-full max-h-[85vh] rounded-2xl object-contain" onClick={e => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage - 1 + property.images.length) % property.images.length) }} className="absolute left-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); setActiveImage((activeImage + 1) % property.images.length) }} className="absolute right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: any }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-navy-700" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-xs text-navy-400">{label}</div>
        <div className="font-bold text-navy-900">{value}</div>
      </div>
    </div>
  )
}
