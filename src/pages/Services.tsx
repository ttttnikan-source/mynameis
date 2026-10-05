import { useNavigate } from 'react-router-dom'
import { Home, TrendingUp, Building, BarChart3, ArrowRight, Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'

const serviceIcons: Record<string, any> = { home: Home, 'trending-up': TrendingUp, building: Building, 'bar-chart': BarChart3 }

const process = [
  { step: '01', title: 'Consultation', text: 'We begin with a detailed consultation to understand your goals, preferences and investment criteria.' },
  { step: '02', title: 'Property Search', text: 'Our team curates a selection of properties that match your requirements across Dubai\'s top communities.' },
  { step: '03', title: 'Viewings & Analysis', text: 'We arrange viewings and provide detailed market analysis, yield projections and investment insights.' },
  { step: '04', title: 'Acquisition & Beyond', text: 'From negotiation to handover and ongoing management, we support you well beyond the purchase.' },
]

export default function Services() {
  const navigate = useNavigate()

  return (
    <>
      <PageHeader
        eyebrow="Our Expertise"
        title="Services"
        subtitle="Complete real estate advisory for buyers, investors and property owners."
        image="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Services grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="What We Do" title="Complete Real Estate Advisory" subtitle="From acquisition to management, we provide end-to-end property expertise." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => {
              const Icon = serviceIcons[s.icon] || Home
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

      {/* Process */}
      <section className="py-16 lg:py-24 bg-mist">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <SectionHeading eyebrow="How We Work" title="Our Process" subtitle="A structured approach that puts your goals at the centre of everything we do." />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 100}>
                <div className="relative">
                  <div className="text-5xl font-bold text-navy-100 mb-3">{p.step}</div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-navy-400 leading-relaxed">{p.text}</p>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-6 -right-3 text-navy-200">
                      <ArrowRight className="w-6 h-6" strokeWidth={1} />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="eyebrow mb-3">Why Horizon</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-6 tracking-tight">
                A Partner You Can Trust
              </h2>
              <div className="space-y-4">
                {[
                  'Deep expertise across all of Dubai\'s prime communities',
                  'Data-driven investment analysis and yield projections',
                  'Personalized advisory for every client profile',
                  'Full-service support from search to management',
                  'Strong relationships with Dubai\'s leading developers',
                  'Transparent, discreet and professional service',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-gold" strokeWidth={2} />
                    </div>
                    <p className="text-navy-500">{item}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate('/contact')} className="btn-primary mt-8">
                Book a Consultation
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&w=1000&q=80" alt="Dubai skyline" className="w-full h-full object-cover" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
