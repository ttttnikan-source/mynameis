import { useMemo, useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import PropertyCard from '../components/PropertyCard.jsx'
import { PROPERTIES } from '../data'

const PRICE_BRACKETS = [
  { label: 'Any price', test: () => true },
  { label: 'Up to $3M', test: (p) => p.price <= 3000000 },
  { label: '$3M – $4M', test: (p) => p.price > 3000000 && p.price <= 4000000 },
  { label: '$4M – $5M', test: (p) => p.price > 4000000 && p.price <= 5000000 },
  { label: '$5M+', test: (p) => p.price > 5000000 },
]
const BED_OPTIONS = ['Any beds', '3+', '4+', '5+']

export default function PropertiesPage() {
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('Any location')
  const [type, setType] = useState('Any type')
  const [priceIdx, setPriceIdx] = useState(0)
  const [beds, setBeds] = useState(0)
  const [sort, setSort] = useState('featured')

  const cities = useMemo(() => ['Any location', ...new Set(PROPERTIES.map((p) => p.city))], [])
  const types = useMemo(() => ['Any type', ...new Set(PROPERTIES.map((p) => p.type))], [])

  const results = useMemo(() => {
    let list = PROPERTIES.filter((p) => {
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
      const matchesCity = city === 'Any location' || p.city === city
      const matchesType = type === 'Any type' || p.type === type
      const matchesPrice = PRICE_BRACKETS[priceIdx].test(p)
      const minBeds = beds === 0 ? 0 : Number(BED_OPTIONS[beds].replace('+', ''))
      return matchesQuery && matchesCity && matchesType && matchesPrice && p.beds >= minBeds
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'featured') list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    return list
  }, [query, city, type, priceIdx, beds, sort])

  const hasFilters = query || city !== 'Any location' || type !== 'Any type' || priceIdx !== 0 || beds !== 0 || sort !== 'featured'
  const clearAll = () => {
    setQuery(''); setCity('Any location'); setType('Any type'); setPriceIdx(0); setBeds(0); setSort('featured')
  }

  return (
    <>
      <section className="strip">
        <div className="container">
          <span className="label">Portfolio</span>
          <h1 className="h1" style={{ fontSize: 'clamp(30px, 4vw, 46px)' }}>Our Properties</h1>
          <p className="lead">Hand-selected homes and investments across America's most desirable markets.</p>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <form className="filters" onSubmit={(e) => e.preventDefault()} aria-label="Property filters">
            <div className="search-field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="search"
                placeholder="Search by name or location…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search properties"
              />
            </div>
            <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="Location">
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Property type">
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select value={priceIdx} onChange={(e) => setPriceIdx(Number(e.target.value))} aria-label="Price range">
              {PRICE_BRACKETS.map((b, i) => <option key={b.label} value={i}>{b.label}</option>)}
            </select>
            <select value={beds} onChange={(e) => setBeds(Number(e.target.value))} aria-label="Bedrooms">
              {BED_OPTIONS.map((b, i) => <option key={b} value={i}>{b}</option>)}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </form>

          <div className="results-meta">
            <p role="status">
              {results.length} {results.length === 1 ? 'property' : 'properties'} found
            </p>
            {hasFilters && <button className="clear-btn" onClick={clearAll}>Clear filters</button>}
          </div>

          {results.length === 0 ? (
            <div className="empty">
              <h3 className="h3">No properties match your search</h3>
              <p>Try adjusting the filters or clearing them to see the full portfolio.</p>
            </div>
          ) : (
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {results.map((p, i) => (
                <Reveal key={p.id} delay={i % 3}>
                  <PropertyCard property={p} variant="tile" />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
