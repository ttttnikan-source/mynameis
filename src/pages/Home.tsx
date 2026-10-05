import { useNavigate } from 'react-router-dom'
import { ArrowRight, KeyRound, Home as HomeIcon, TrendingUp, Building, BarChart3, Quote } from 'lucide-react'
import Hero from '../components/Hero'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import PropertyCarousel from '../components/PropertyCarousel'
import { properties } from '../data/properties'
import { communities } from '../data/communities'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import { articles } from '../data/articles'

const serviceIcons: Record<string, any> = { home: HomeIcon, 'trending-up': TrendingUp, building: Building, 'bar-chart': BarChart3 }

export default function Home() {
  const navigate = useNavigate()
  const featured = properties.filter(p => p.featured)
  const stats = [
    { value: '10+', label: 'Years of Experience' },
    { value: '500+', label: 'Properties Sold' },
    { value: '25+', label: 'Prime Communities' },
    { value: '98%', label: 'Client Satisfaction' },
  ]

  return (
    <>
      <Hero />

      {/* Spacer for floating search */}
      <div className="h-32 sm:h-28" />

      {/* About Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="eyebrow mb-3">About Horizon</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight tracking-tight">
                Where Exceptional Properties Meet Smart Investments
              </h2>
              <p className="mt-6 text-base lg:text-lg text-navy-400 leading-relaxed max-w-xl">
                At Horizon Properties, we connect discerning buyers and investors with exceptional real estate opportunities across Dubai. Our approach combines local market expertise, transparency and personalized advisory.
              </p>
              <button onClick={() => navigate('/about')} className="btn-primary mt-8">
                Learn More
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Dubai villa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-4 sm:-left-8 w-40 sm:w-52 rounded-2xl overflow-hidden shadow-card-hover border-4 border-white hidden sm:block">
                  <img
                    src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=500&q=80"
                    alt="Modern property"
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                </div>
                <button
                  onClick={() => navigate('/properties')}
                  className="absolute -bottom-6 right-6 w-14 h-14 rounded-full bg-gold text-navy-900 flex items-center justify-center shadow-card-hover hover:bg-gold-dark hover:text-white transition-all hover:scale-110"
                >
                  <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Dubai / Stats */}
      <section className="py-20 lg:py-28 bg-navy-900 text-white">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="text-center mb-14">
            <Reveal>
              <div className="eyebrow mb-3">Why Dubai</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
                Invest in One of the World's Most Dynamic Real Estate Markets
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all">
                  <div className="text-4xl lg:text-5xl font-bold text-gold">{s.value}</div>
                  <div className="mt-2 text-sm text-white/60">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white/70 text-sm leading-relaxed max-w-5xl mx-auto">
              <p>Dubai attracts global investors with its tax-free environment, strategic location, and world-class infrastructure connecting East and West.</p>
              <p>The city offers diverse property opportunities — from beachfront villas to high-yield apartments — catering to every investment strategy.</p>
              <p>A thriving international business environment and prime lifestyle destinations make Dubai a market of enduring appeal.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Curated for You" title="Featured Properties" subtitle="A handpicked selection of Dubai's most distinguished residences and investment opportunities." />
          <div className="mt-12">
            <PropertyCarousel properties={featured} />
          </div>
          <Reveal className="text-center mt-10">
            <button onClick={() => navigate('/properties')} className="btn-primary">
              View All Properties
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Communities */}
      <section className="py-20 lg:py-28 bg-mist">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Explore Dubai" title="Desirable Communities" subtitle="Discover the neighbourhoods that define luxury living in Dubai." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {communities.slice(0, 8).map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <button
                  onClick={() => navigate(`/communities/${c.slug}`)}
                  className="group relative block w-full rounded-3xl overflow-hidden aspect-[3/4] text-left"
                >
                  <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent transition-opacity group-hover:from-navy-950/90" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-lg font-bold mb-1">{c.name}</h3>
                    <p className="text-xs text-white/70 mb-2 line-clamp-2">{c.shortDescription}</p>
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

      {/* Services */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Our Expertise" title="Complete Real Estate Advisory" subtitle="From acquisition to management, we provide end-to-end property expertise." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon] || HomeIcon
              return (
                <Reveal key={s.id} delay={i * 100}>
                  <div className="group p-7 rounded-3xl border border-navy-50 bg-white hover:bg-navy-900 hover:border-navy-900 transition-all duration-400 hover:shadow-card-hover h-full">
                    <div className="text-sm font-bold text-gold mb-4">{s.number}</div>
                    <div className="w-12 h-12 rounded-2xl bg-mist group-hover:bg-gold/15 flex items-center justify-center mb-5 transition-all">
                      <Icon className="w-6 h-6 text-navy-800 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 group-hover:text-white transition-colors mb-2">{s.title}</h3>
                    <p className="text-sm text-navy-400 group-hover:text-white/60 transition-colors leading-relaxed">{s.description}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-mist">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Client Stories" title="Trusted by Clients Who Expect More" subtitle="Our clients' experiences speak to the standard of service we deliver." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 120}>
                <div className="p-7 rounded-3xl bg-white shadow-card h-full flex flex-col">
                  <Quote className="w-8 h-8 text-gold/40 mb-4" strokeWidth={1.5} />
                  <p className="text-sm text-navy-400 leading-relaxed flex-1 italic">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3 pt-5 border-t border-navy-50">
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-bold text-navy-900">{t.name}</div>
                      <div className="text-xs text-navy-400">{t.clientType} • {t.location}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insights preview */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Market Knowledge" title="Dubai Real Estate Insights" subtitle="Expert analysis and guides to help you navigate the Dubai property market." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.id} delay={i * 100}>
                <button onClick={() => navigate(`/insights/${a.slug}`)} className="group block text-left w-full rounded-3xl overflow-hidden bg-white shadow-card hover:shadow-card-hover transition-all duration-400 hover:-translate-y-1">
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute top-4 left-4 rounded-full bg-navy-900/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5">{a.category}</span>
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-navy-400 mb-2">{a.date}</div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-gold transition-colors">{a.title}</h3>
                    <p className="text-sm text-navy-400 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 group-hover:text-gold transition-colors">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 lg:py-20">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl bg-mist px-6 py-10 lg:px-12 lg:py-14 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
              <div className="w-16 h-16 rounded-full bg-navy-800 flex items-center justify-center shrink-0">
                <KeyRound className="w-7 h-7 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold text-navy-900">Ready to Find Your Perfect Property?</h3>
                <p className="mt-2 text-navy-400">Let our Dubai real estate experts help you discover the right property or investment opportunity.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button onClick={() => navigate('/contact')} className="btn-primary">
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button onClick={() => navigate('/properties')} className="btn-outline !border-navy-200 !text-navy-800 hover:!bg-navy-50">
                  Explore Properties
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
