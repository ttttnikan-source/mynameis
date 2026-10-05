export const img = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const PHONE_DISPLAY = '(555) 246-7890'
export const PHONE_TEL = 'tel:+15552467890'
export const EMAIL = 'hello@horizonproperties.com'
export const ADDRESS = '410 Congress Avenue, Suite 900, Austin, TX 78701'

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export const AGENTS = [
  { name: 'Daniel Morgan', role: 'Managing Director', phone: PHONE_TEL, email: `mailto:daniel@horizonproperties.com`, photo: img('photo-1560250097-0b93528c311a', 300) },
  { name: 'Olivia Carter', role: 'Luxury Property Advisor', phone: PHONE_TEL, email: `mailto:olivia@horizonproperties.com`, photo: img('photo-1573496359142-b8d87734a5a2', 300) },
  { name: 'James Wilson', role: 'Investment Consultant', phone: PHONE_TEL, email: `mailto:james@horizonproperties.com`, photo: img('photo-1472099645785-5658abf4ff4e', 300) },
  { name: 'Sophia Bennett', role: 'Senior Property Specialist', phone: PHONE_TEL, email: `mailto:sophia@horizonproperties.com`, photo: img('photo-1580489944761-15a19d654956', 300) },
]

export const TEAM = AGENTS

export const SERVICES = [
  { title: 'Luxury Home Sales', desc: 'Bespoke representation for buyers and sellers of architecturally significant homes, from first viewing to final signature.' },
  { title: 'Property Investment', desc: 'Data-driven acquisition strategies across residential and mixed-use assets, built around your yield and horizon.' },
  { title: 'Property Marketing', desc: 'Editorial photography, cinematic film and targeted placement that present every property at its absolute best.' },
  { title: 'Real Estate Advisory', desc: 'Independent counsel on portfolio shaping, market timing and off-market opportunities in prime locations.' },
  { title: 'Property Valuation', desc: 'Rigorous, defensible valuations for private owners, family offices and lending institutions.' },
  { title: 'Relocation Services', desc: 'A single point of contact for every detail of your move — schools, neighborhoods, logistics and settling in.' },
]

const P = {
  lakeside: {
    id: 'lakeside-modern-villa',
    name: 'Lakeside Modern Villa',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    price: 2350000,
    priceLabel: '$2.35 Million',
    type: 'Villa',
    beds: 5, baths: 6, sqft: '6,800',
    featured: true,
    agent: 0,
    description: 'A striking modern villa set on a private lakeside lot, defined by floor-to-ceiling glass, warm natural stone and seamless indoor-outdoor living. The open-plan great room flows onto a heated infinity pool and covered terrace with a full summer kitchen — an entertainers stage with sunset water views from nearly every room.',
    features: ['Heated infinity pool', 'Private boat dock', 'Home theater & wine room', 'Whole-home automation', 'Chef\u2019s kitchen with double islands', 'Three-car garage'],
    amenities: ['Smart home', 'Pool & spa', 'Lake access', 'Gated entry', 'Outdoor kitchen', 'Gym'],
    images: ['photo-1613490493576-7fde63acd811', 'photo-1600585154526-990dced4db0d', 'photo-1600566752355-35792bedcfea', 'photo-1600607687920-4e2a09cf159d'],
  },
  pacific: {
    id: 'pacific-glass-house',
    name: 'Pacific Glass House',
    location: 'Malibu, California, USA',
    city: 'Malibu',
    price: 4800000,
    priceLabel: '$4.8 Million',
    type: 'Villa',
    beds: 4, baths: 5, sqft: '5,400',
    featured: true,
    agent: 1,
    description: 'Perched above the Pacific, this glass-and-steel residence dissolves the line between architecture and ocean. Walls of glass retract to a cantilevered deck, while the primary suite frames an uninterrupted horizon. A rare blend of sculptural design and barefoot coastal living.',
    features: ['Retractable glass walls', 'Cantilevered ocean deck', 'Primary suite with horizon view', 'Saltwater lap pool', ' Imported stone chef\u2019s kitchen', 'Private beach path'],
    amenities: ['Ocean view', 'Pool & spa', 'Smart home', 'Beach access', 'Security system'],
    images: ['photo-1600596542815-ffad4c1539a9', 'photo-1512917774080-9991f1c4c750', 'photo-1600607687644-c7171b42498f', 'photo-1600573472592-401b489a3eca'],
  },
  desert: {
    id: 'desert-horizon-estate',
    name: 'Desert Horizon Estate',
    location: 'Scottsdale, Arizona, USA',
    city: 'Scottsdale',
    price: 3150000,
    priceLabel: '$3.15 Million',
    type: 'Estate',
    beds: 6, baths: 7, sqft: '7,900',
    featured: true,
    agent: 2,
    description: 'A desert-modern estate carved into the McDowell foothills, where monolithic stone walls meet sunset-colored courtyards. Vanishing-edge pool, casita guest wing and a wine cave of Arizona oak — privacy and drama in equal measure.',
    features: ['Vanishing-edge pool', 'Guest casita wing', 'Temperature-controlled wine cave', 'Desert landscaping', 'Outdoor fire lounge', 'Golf course adjacency'],
    amenities: ['Pool & spa', 'Mountain view', 'Gated entry', 'Casita', 'Fire pit'],
    images: ['photo-1600585154340-be6161a56a0c', 'photo-1580587771525-78b9dba3b914', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600210492486-724fe5c67fb0'],
  },
  oceanfront: {
    id: 'oceanfront-residence',
    name: 'Oceanfront Residence',
    location: 'Miami, Florida, USA',
    city: 'Miami',
    price: 5200000,
    priceLabel: '$5.2 Million',
    type: 'Residence',
    beds: 5, baths: 6, sqft: '6,100',
    featured: true,
    agent: 3,
    description: 'Directly on the sand, this contemporary residence layers white oak, honed marble and glass for a calm, hotel-grade feel. Steps to the water, a resort-style pool deck and a private rooftop terrace make everyday life feel like a five-star escape.',
    features: ['Direct beach access', 'Private rooftop terrace', 'Resort-style pool deck', 'Hotel-grade finishes', 'Summer kitchen & bar', 'Flood-resilient construction'],
    amenities: ['Beachfront', 'Pool & spa', 'Rooftop terrace', 'Security system', 'Smart home'],
    images: ['photo-1512917774080-9991f1c4c750', 'photo-1613977257363-707ba9348227', 'photo-1600566753190-17f0baa2a6c3', 'photo-1523217582562-09d0def993a6'],
  },
  hillside: {
    id: 'modern-hillside-retreat',
    name: 'Modern Hillside Retreat',
    location: 'Los Angeles, California, USA',
    city: 'Los Angeles',
    price: 3750000,
    priceLabel: '$3.75 Million',
    type: 'Villa',
    beds: 4, baths: 4, sqft: '4,900',
    featured: false,
    agent: 1,
    description: 'A serene hillside retreat with canyon-to-city views, cantilevered over a wooded ravine. Warm woods, blackened steel and a floating fireplace anchor the living spaces; the glass-walled pool house doubles as a studio.',
    features: ['Canyon & city views', 'Glass-walled pool house', 'Floating fireplace', 'Zen garden courtyard', 'Two-car gallery garage', 'Solar array'],
    amenities: ['City view', 'Pool', 'Smart home', 'Gym', 'Solar'],
    images: ['photo-1600566753190-17f0baa2a6c3', 'photo-1600585154340-be6161a56a0c', 'photo-1600607687939-ce8a6c25118c', 'photo-1600585154526-990dced4db0d'],
  },
  palm: {
    id: 'palm-garden-residence',
    name: 'Palm Garden Residence',
    location: 'Beverly Hills, California, USA',
    city: 'Beverly Hills',
    price: 6400000,
    priceLabel: '$6.4 Million',
    type: 'Estate',
    beds: 7, baths: 9, sqft: '9,300',
    featured: false,
    agent: 0,
    description: 'Behind mature palms, a freshly reimagined estate balancing classic Beverly Hills proportions with crisp contemporary detailing. Hotel-scale primary suite, championship tennis court and a mosaic-tiled pool wrapped in formal gardens.',
    features: ['Championship tennis court', 'Mosaic garden pool', 'Hotel-scale primary suite', 'Formal gardens', 'Staff quarters', 'Motor court for 8'],
    amenities: ['Pool & spa', 'Tennis court', 'Gated entry', 'Garden', 'Security system', 'Staff quarters'],
    images: ['photo-1600607687939-ce8a6c25118c', 'photo-1564013799919-ab600027ffc6', 'photo-1613490493576-7fde63acd811', 'photo-1600047509358-9dc75507daeb'],
  },
  lakehouse: {
    id: 'contemporary-lake-house',
    name: 'Contemporary Lake House',
    location: 'Lake Tahoe, Nevada, USA',
    city: 'Lake Tahoe',
    price: 2950000,
    priceLabel: '$2.95 Million',
    type: 'House',
    beds: 4, baths: 4, sqft: '4,300',
    featured: false,
    agent: 2,
    description: 'A warm contemporary retreat among the pines, with a double-height great room built around a stone hearth and windows that frame the lake. Ski-in access in winter, paddleboard mornings in summer — a four-season compound.',
    features: ['Double-height great room', 'Stone hearth', 'Lake-view balcony', 'Ski storage & mudroom', 'Cedar hot tub', 'Heated driveway'],
    amenities: ['Lake view', 'Hot tub', 'Fire pit', 'Gated entry', 'Ski access'],
    images: ['photo-1600047509807-ba8f99d2cdde', 'photo-1523217582562-09d0def993a6', 'photo-1600573472592-401b489a3eca', 'photo-1580587771525-78b9dba3b914'],
  },
  penthouse: {
    id: 'architectural-downtown-penthouse',
    name: 'Architectural Downtown Penthouse',
    location: 'Austin, Texas, USA',
    city: 'Austin',
    price: 1850000,
    priceLabel: '$1.85 Million',
    type: 'Penthouse',
    beds: 3, baths: 3, sqft: '3,200',
    featured: false,
    agent: 3,
    description: 'Crowning a landmark tower, this penthouse opens to 270\u00B0 skyline and river views through wraparound glass. Custom Italian cabinetry, a private elevator landing and a terrace built for sunset dinners above the city.',
    features: ['270\u00B0 skyline views', 'Private elevator landing', 'Wraparound terrace', 'Italian cabinetry', 'Concierge & valet', 'Club-level amenities'],
    amenities: ['Skyline view', 'Concierge', 'Smart home', 'Gym', 'Terrace'],
    images: ['photo-1600210492486-724fe5c67fb0', 'photo-1600607687920-4e2a09cf159d', 'photo-1600566752355-35792bedcfea', 'photo-1600607687644-c7171b42498f'],
  },
}

export const PROPERTIES = Object.values(P)

export const HERO_IMAGE = img('photo-1600596542815-ffad4c1539a9', 2000)
export const ABOUT_MAIN = img('photo-1580587771525-78b9dba3b914', 900)
export const ABOUT_SIDE = img('photo-1600607687644-c7171b42498f', 600)
export const WHY_IMAGE = img('photo-1613977257363-707ba9348227', 1000)

export const propertyById = (id) => PROPERTIES.find((p) => p.id === id)
