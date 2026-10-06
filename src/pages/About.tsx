import { useNavigate } from 'react-router-dom'
import { ArrowRight, Target, Eye, Award, Users } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { agents } from '../data/agents'

const values = [
  { icon: Target, title: 'Our Mission', text: 'To connect discerning clients with exceptional Dubai properties through expertise, integrity and personalized service.' },
  { icon: Eye, title: 'Our Vision', text: 'To be Dubai\'s most trusted luxury real estate advisory, setting the standard for property investment excellence.' },
  { icon: Award, title: 'Our Values', text: 'Transparency, discretion, and an unwavering commitment to our clients\' success guide every decision we make.' },
]

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '500+', label: 'Properties Sold' },
  { value: '25+', label: 'Prime Communities' },
  { value: '98%', label: 'Client Satisfaction' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Who We Are"
        subtitle="Dubai's premier luxury real estate advisory for international investors and discerning buyers."
        image="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="eyebrow mb-3">About Horizon</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight tracking-tight mb-6">
                Where Exceptional Properties Meet Smart Investments
              </h2>
              <p className="text-navy-400 leading-relaxed mb-4">
                Horizon Properties is a Dubai-based luxury real estate advisory founded on the belief that property decisions deserve expert guidance. We serve international investors, high-net-worth individuals, and families seeking exceptional homes in Dubai's most distinguished communities.
              </p>
              <p className="text-navy-400 leading-relaxed mb-8">
                Our team combines deep local market knowledge with a global perspective, offering personalized advisory that goes beyond the transaction. From identifying the right property to managing your investment, we are your trusted partner at every step.
              </p>
              <button onClick={() => navigate('/contact')} className="btn-primary">
                Get in Touch
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </Reveal>
            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-card">
                  <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80" alt="Luxury villa" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-card mt-8">
                  <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80" alt="Modern home" className="w-full h-full object-cover" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-20 bg-navy-900 text-white">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-gold">{s.value}</div>
                  <div className="mt-2 text-sm text-white/60">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Our Principles" title="What Drives Us" subtitle="The principles that shape every client relationship and property decision." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <Reveal key={v.title} delay={i * 120}>
                  <div className="p-7 rounded-3xl border border-navy-50 hover:shadow-card-hover transition-all h-full">
                    <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-navy-700" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-2">{v.title}</h3>
                    <p className="text-sm text-navy-400 leading-relaxed">{v.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="Our People" title="Meet the Team" subtitle="Experienced advisors dedicated to finding your perfect property." />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((a, i) => (
              <Reveal key={a.id} delay={i * 120}>
                <div className="rounded-3xl bg-white shadow-card overflow-hidden group">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy-900">{a.name}</h3>
                    <p className="text-sm text-gold font-semibold mb-3">{a.title}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-navy-400">
                      <span className="rounded-full bg-mist px-3 py-1">{a.experience}</span>
                      <span className="rounded-full bg-mist px-3 py-1">{a.propertiesSold}+ sold</span>
                    </div>
                    <div className="mt-3 text-xs text-navy-400">
                      Speaks: {a.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
