import { useState } from 'react'
import { MapPin, Phone, Mail, MessageCircle, Check, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'

const contactMethods = [
  { icon: Phone, label: 'Phone', value: '+971 4 123 4567', href: 'tel:+97141234567' },
  { icon: Mail, label: 'Email', value: 'info@horizonproperties.ae', href: 'mailto:info@horizonproperties.ae' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+971 50 123 4567', href: '#' },
  { icon: MapPin, label: 'Office', value: 'Boulevard Plaza, Downtown Dubai, UAE', href: '#' },
]

const propertyInterests = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial', 'Investment']
const contactMethodsList = ['Phone', 'Email', 'WhatsApp']
const budgets = ['Under AED 2M', 'AED 2M - 5M', 'AED 5M - 10M', 'AED 10M - 20M', 'AED 20M+']

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', contactMethod: '', interest: '', budget: '', message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (validate()) setSent(true)
  }

  const update = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }))
  }

  return (
    <>
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Ready to find your perfect property? Our Dubai real estate experts are here to help."
        image="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10">
            {/* Contact info */}
            <Reveal>
              <div>
                <div className="eyebrow mb-3">Contact Us</div>
                <h2 className="text-3xl font-bold text-navy-900 mb-4 tracking-tight">Let's Start a Conversation</h2>
                <p className="text-navy-400 leading-relaxed mb-8">
                  Whether you're looking for your dream home or a strategic investment, our team is ready to provide the guidance you need.
                </p>
                <div className="space-y-4">
                  {contactMethods.map(m => {
                    const Icon = m.icon
                    return (
                      <a key={m.label} href={m.href} className="flex items-center gap-4 p-4 rounded-2xl border border-navy-50 hover:shadow-card hover:border-gold/30 transition-all group">
                        <div className="w-11 h-11 rounded-xl bg-mist group-hover:bg-gold/15 flex items-center justify-center shrink-0 transition-all">
                          <Icon className="w-5 h-5 text-navy-700 group-hover:text-gold transition-colors" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div className="text-xs text-navy-400">{m.label}</div>
                          <div className="text-sm font-semibold text-navy-900">{m.value}</div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={150}>
              <div className="rounded-3xl border border-navy-50 bg-white p-6 lg:p-8 shadow-card">
                {sent ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-5">
                      <Check className="w-8 h-8 text-gold" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">Thank You!</h3>
                    <p className="text-navy-400 max-w-sm mx-auto">Your consultation request has been received. One of our advisors will contact you within 24 hours.</p>
                    <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', contactMethod: '', interest: '', budget: '', message: '' }) }} className="btn-primary mt-6">
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-navy-900 mb-2">Request a Consultation</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Full Name" required error={errors.name}>
                        <input value={form.name} onChange={e => update('name', e.target.value)} className="form-input" placeholder="John Doe" />
                      </Field>
                      <Field label="Email" required error={errors.email}>
                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} className="form-input" placeholder="john@email.com" />
                      </Field>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Phone" required error={errors.phone}>
                        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} className="form-input" placeholder="+971 ..." />
                      </Field>
                      <Field label="Preferred Contact">
                        <select value={form.contactMethod} onChange={e => update('contactMethod', e.target.value)} className="form-input cursor-pointer">
                          <option value="">Select method</option>
                          {contactMethodsList.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </Field>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Property Interest">
                        <select value={form.interest} onChange={e => update('interest', e.target.value)} className="form-input cursor-pointer">
                          <option value="">Select type</option>
                          {propertyInterests.map(i => <option key={i} value={i}>{i}</option>)}
                        </select>
                      </Field>
                      <Field label="Budget">
                        <select value={form.budget} onChange={e => update('budget', e.target.value)} className="form-input cursor-pointer">
                          <option value="">Select budget</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </Field>
                    </div>
                    <Field label="Message" required error={errors.message}>
                      <textarea value={form.message} onChange={e => update('message', e.target.value)} rows={4} className="form-input resize-none" placeholder="Tell us about your property needs..." />
                    </Field>
                    <button type="submit" className="btn-primary w-full">
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                      Request Consultation
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #E8EFF5;
          background: #EEF4F880;
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: #082B4C;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: #C9A45C;
          box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.15);
        }
        .form-input::placeholder { color: #9FB8CE; }
      `}</style>
    </>
  )
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wide text-navy-400 mb-1.5">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
