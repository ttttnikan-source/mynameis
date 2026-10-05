import { Link } from 'react-router-dom'
import { Building2, Instagram, Facebook, Linkedin, MessageCircle, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <span className="text-white font-bold text-sm tracking-[0.1em] uppercase">
                Horizon Properties
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Exceptional properties. Intelligent investments. Dubai's premier luxury real estate advisory.
            </p>
            <div className="flex gap-3 mt-6">
              {[Instagram, Facebook, Linkedin, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-gold hover:text-navy-900 hover:border-gold transition-all"
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home', path: '/' },
                { label: 'Properties', path: '/properties' },
                { label: 'Communities', path: '/communities' },
                { label: 'About', path: '/about' },
                { label: 'Services', path: '/services' },
                { label: 'Insights', path: '/insights' },
                { label: 'Contact', path: '/contact' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Properties</h4>
            <ul className="space-y-3 text-sm">
              {['Apartments', 'Villas', 'Penthouses', 'Townhouses', 'Off-Plan'].map(l => (
                <li key={l}>
                  <Link to="/properties" className="hover:text-gold transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Communities */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Popular Communities</h4>
            <ul className="space-y-3 text-sm">
              {['Downtown Dubai', 'Palm Jumeirah', 'Dubai Marina', 'Dubai Hills', 'Business Bay'].map(l => (
                <li key={l}>
                  <Link to="/communities" className="hover:text-gold transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                <span>Dubai, UAE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
                <span>+971 4 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold shrink-0" strokeWidth={1.5} />
                <span>info@horizonproperties.ae</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2026 Horizon Properties. All Rights Reserved.</p>
          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
