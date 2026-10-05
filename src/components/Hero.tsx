import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, MapPin, Home, Tag, Bed, ChevronDown } from 'lucide-react'

const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial']
const locations = ['Dubai Marina', 'Downtown Dubai', 'Palm Jumeirah', 'Dubai Hills Estate', 'Business Bay', 'Jumeirah', 'Arabian Ranches', 'Dubai Creek Harbour']
const purposes = ['Buy', 'Rent', 'Invest']
const priceRanges = ['AED 500K', 'AED 1M', 'AED 2M', 'AED 5M+', 'Custom']
const bedrooms = ['Studio', '1', '2', '3', '4+']

export default function Hero() {
  const navigate = useNavigate()
  const [purpose, setPurpose] = useState('Buy')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [beds, setBeds] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (purpose) params.set('purpose', purpose)
    if (type) params.set('type', type)
    if (location) params.set('community', location)
    if (price) params.set('price', price)
    if (beds) params.set('beds', beds)
    navigate(`/properties?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Dubai villa at dusk"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-900/50 to-navy-950/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 pt-28 pb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 backdrop-blur-sm px-4 py-1.5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">Dubai Luxury Real Estate</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight">
          Discover Exceptional
          <br />
          Homes &amp; Investments in Dubai
        </h1>
        <p className="mt-6 text-base sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
          Explore Dubai's most distinguished properties, prime communities and exceptional investment opportunities.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/properties')}
            className="btn-gold w-full sm:w-auto"
          >
            Explore Properties
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="btn-outline w-full sm:w-auto"
          >
            Book a Consultation
          </button>
        </div>
        <p className="mt-8 text-sm text-white/50 tracking-wide">
          Trusted Property Advisory • Dubai • UAE
        </p>
      </div>

      {/* Floating search bar */}
      <div className="absolute -bottom-0 left-0 right-0 z-20 px-4 sm:px-6 lg:px-10 translate-y-1/2">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white/95 backdrop-blur-xl shadow-card-hover p-5 sm:p-6">
          {/* Segmented purpose control */}
          <div className="flex items-center gap-1 mb-5 p-1 rounded-full bg-mist w-fit">
            {purposes.map(p => (
              <button
                key={p}
                onClick={() => setPurpose(p)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  purpose === p ? 'bg-navy-800 text-white shadow-sm' : 'text-navy-500 hover:text-navy-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <SelectField icon={Home} label="Property Type" value={type} onChange={setType} options={propertyTypes} placeholder="Any Type" />
            <SelectField icon={MapPin} label="Location" value={location} onChange={setLocation} options={locations} placeholder="Any Location" />
            <SelectField icon={Tag} label="Price Range" value={price} onChange={setPrice} options={priceRanges} placeholder="Any Price" />
            <SelectField icon={Bed} label="Bedrooms" value={beds} onChange={setBeds} options={bedrooms} placeholder="Any" />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-navy-500 hover:text-navy-800 transition-colors">
              <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
              Advanced Filters
            </button>
            <button
              onClick={handleSearch}
              className="btn-gold sm:ml-auto flex-1 sm:flex-none"
            >
              <Search className="w-4 h-4" strokeWidth={1.5} />
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SelectField({ icon: Icon, label, value, onChange, options, placeholder }: {
  icon: any; label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder: string
}) {
  return (
    <div className="relative">
      <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-navy-400 mb-1.5">
        <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-navy-100 bg-mist/50 px-4 py-3 text-sm font-medium text-navy-800 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all cursor-pointer"
        >
          <option value="">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 text-navy-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
      </div>
    </div>
  )
}
