import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import PropertyCard from '../components/PropertyCard'
import Reveal from '../components/Reveal'
import { properties } from '../data/properties'
import { communities } from '../data/communities'

const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Townhouse', 'Commercial']
const allCommunities = communities.map(c => c.name)
const allStatuses = ['Buy', 'Rent', 'Invest']
const priceRanges = [
  { label: 'Under AED 3M', min: 0, max: 3000000 },
  { label: 'AED 3M - 5M', min: 3000000, max: 5000000 },
  { label: 'AED 5M - 10M', min: 5000000, max: 10000000 },
  { label: 'AED 10M+', min: 10000000, max: Infinity },
]
const bedOptions = [0, 1, 2, 3, 4, 5]
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'area-desc', label: 'Largest Area' },
]

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    type: searchParams.get('type') || '',
    community: searchParams.get('community') || '',
    status: searchParams.get('purpose') || '',
    priceRange: '',
    beds: '',
    furnished: '',
    offPlan: '',
  })
  const [sort, setSort] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    setVisibleCount(6)
  }, [filters, sort])

  const filtered = useMemo(() => {
    let result = [...properties]
    if (filters.type) result = result.filter(p => p.propertyType === filters.type)
    if (filters.community) result = result.filter(p => p.community === filters.community)
    if (filters.status) result = result.filter(p => p.status === filters.status)
    if (filters.priceRange) {
      const range = priceRanges.find(r => r.label === filters.priceRange)
      if (range) result = result.filter(p => p.price >= range.min && p.price <= range.max)
    }
    if (filters.beds !== '') result = result.filter(p => p.bedrooms >= Number(filters.beds))
    if (filters.offPlan === 'offplan') result = result.filter(p => p.offPlan)
    if (filters.offPlan === 'ready') result = result.filter(p => !p.offPlan)

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'area-desc': result.sort((a, b) => b.area - a.area); break
      default: result.sort((a, b) => Number(b.featured) - Number(a.featured)); break
    }
    return result
  }, [filters, sort])

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ type: '', community: '', status: '', priceRange: '', beds: '', furnished: '', offPlan: '' })
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <>
      <PageHeader
        eyebrow="Browse Listings"
        title="Properties"
        subtitle="Discover Dubai's finest residences and investment opportunities."
        image="https://images.unsplash.com/photo-1567958451986-2de427a4a0be?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[120rem] px-4 sm:px-6 lg:px-10">
          {/* Top bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 rounded-full border border-navy-100 px-5 py-2.5 text-sm font-semibold text-navy-800"
              >
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
                Filters
                {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full bg-gold text-navy-900 text-xs flex items-center justify-center">{activeFilterCount}</span>}
              </button>
              <p className="text-sm text-navy-400">
                Showing <span className="font-bold text-navy-900">{filtered.length}</span> properties
              </p>
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none rounded-full border border-navy-100 bg-white px-5 py-2.5 pr-10 text-sm font-medium text-navy-800 focus:outline-none focus:border-gold cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>Sort: {o.label}</option>)}
              </select>
              <ChevronDown className="w-4 h-4 text-navy-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters */}
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="sticky top-24 rounded-3xl border border-navy-50 bg-white p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-navy-900">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-xs text-gold font-semibold hover:underline flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear all
                    </button>
                  )}
                </div>

                <FilterGroup label="Purpose">
                  <div className="flex flex-wrap gap-2">
                    {allStatuses.map(s => (
                      <Chip key={s} active={filters.status === s} onClick={() => updateFilter('status', filters.status === s ? '' : s)}>{s}</Chip>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label="Property Type">
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map(t => (
                      <Chip key={t} active={filters.type === t} onClick={() => updateFilter('type', filters.type === t ? '' : t)}>{t}</Chip>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label="Community">
                  <select
                    value={filters.community}
                    onChange={e => updateFilter('community', e.target.value)}
                    className="w-full rounded-xl border border-navy-100 bg-mist/50 px-3 py-2.5 text-sm text-navy-800 focus:outline-none focus:border-gold cursor-pointer"
                  >
                    <option value="">All Communities</option>
                    {allCommunities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FilterGroup>

                <FilterGroup label="Price Range">
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(r => (
                      <Chip key={r.label} active={filters.priceRange === r.label} onClick={() => updateFilter('priceRange', filters.priceRange === r.label ? '' : r.label)}>{r.label}</Chip>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label="Bedrooms (min)">
                  <div className="flex flex-wrap gap-2">
                    {bedOptions.map(b => (
                      <Chip key={b} active={filters.beds === String(b)} onClick={() => updateFilter('beds', filters.beds === String(b) ? '' : String(b))}>
                        {b === 0 ? 'Studio' : `${b}+`}
                      </Chip>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup label="Status">
                  <div className="flex flex-wrap gap-2">
                    <Chip active={filters.offPlan === 'ready'} onClick={() => updateFilter('offPlan', filters.offPlan === 'ready' ? '' : 'ready')}>Ready</Chip>
                    <Chip active={filters.offPlan === 'offplan'} onClick={() => updateFilter('offPlan', filters.offPlan === 'offplan' ? '' : 'offplan')}>Off-Plan</Chip>
                  </div>
                </FilterGroup>
              </div>
            </aside>

            {/* Grid */}
            <div>
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <Search className="w-12 h-12 text-navy-200 mx-auto mb-4" strokeWidth={1} />
                  <p className="text-navy-400">No properties match your filters. Try adjusting your search.</p>
                  <button onClick={clearFilters} className="btn-primary mt-6">Clear Filters</button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.slice(0, visibleCount).map((p, i) => (
                      <Reveal key={p.id} delay={i * 60}>
                        <PropertyCard property={p} />
                      </Reveal>
                    ))}
                  </div>
                  {visibleCount < filtered.length && (
                    <div className="text-center mt-10">
                      <button onClick={() => setVisibleCount(c => c + 6)} className="btn-primary">
                        Load More Properties
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 pb-5 border-b border-navy-50 last:border-0 last:pb-0 last:mb-0">
      <h4 className="text-xs font-semibold uppercase tracking-wide text-navy-400 mb-3">{label}</h4>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        active ? 'bg-navy-800 text-white' : 'bg-mist text-navy-500 hover:bg-navy-100'
      }`}
    >
      {children}
    </button>
  )
}
