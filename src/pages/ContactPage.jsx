import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { PHONE_DISPLAY, PHONE_TEL, EMAIL, ADDRESS } from '../data'

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
)
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
)
const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
)
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
)

export default function ContactPage() {
  const params = useSearchParams()[0]
  const property = params.get('property') || ''
  const isViewing = params.get('viewing') === '1'
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    interest: property ? (isViewing ? 'Schedule a viewing' : 'Buying') : 'Buying',
    message: property ? (isViewing ? `I would like to schedule a viewing of ${property}.` : `I am interested in ${property}.`) : '',
  })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const info = [
    { icon: <IconPhone />, title: 'Call Us', desc: PHONE_DISPLAY, href: PHONE_TEL },
    { icon: <IconMail />, title: 'Email Us', desc: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <IconPin />, title: 'Visit Us', desc: ADDRESS },
    { icon: <IconClock />, title: 'Office Hours', desc: 'Monday – Sunday, 9:00 – 19:00' },
  ]

  return (
    <>
      <section className="strip">
        <div className="container">
          <span className="label">Contact</span>
          <h1 className="h1" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>Let's Start the Conversation</h1>
          <p className="lead">Tell us what you're looking for — we reply within one business day.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <Reveal>
            <div className="contact-info">
              {info.map((item) => {
                const inner = (
                  <>
                    <span className="why-icon">{item.icon}</span>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </>
                )
                return item.href ? (
                  <a className="why-item" key={item.title} href={item.href}>{inner}</a>
                ) : (
                  <div className="why-item" key={item.title}>{inner}</div>
                )
              })}
            </div>
          </Reveal>

          <Reveal delay={1}>
            {sent ? (
              <div className="contact-form form-success" role="status">
                <span className="ok-ring">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7"/></svg>
                </span>
                <h3 className="h3">Message received</h3>
                <p>Thank you, {form.name || 'friend'}. A Horizon advisor will reach out within one business day.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <div className="form-row">
                  <div>
                    <label htmlFor="cf-name">Full name</label>
                    <input id="cf-name" required value={form.name} onChange={set('name')} placeholder="Jane Cooper" />
                  </div>
                  <div>
                    <label htmlFor="cf-email">Email</label>
                    <input id="cf-email" type="email" required value={form.email} onChange={set('email')} placeholder="jane@email.com" />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label htmlFor="cf-phone">Phone</label>
                    <input id="cf-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label htmlFor="cf-interest">I'm interested in</label>
                    <select id="cf-interest" value={form.interest} onChange={set('interest')}>
                      <option>Buying</option>
                      <option>Selling</option>
                      <option>Investing</option>
                      <option>Schedule a viewing</option>
                      <option>Something else</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" value={form.message} onChange={set('message')} placeholder="Tell us about the property or the lifestyle you're after…" />
                </div>
                <button type="submit" className="btn" style={{ justifyContent: 'center' }}>
                  Send Message
                  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
