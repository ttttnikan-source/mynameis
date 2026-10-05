export interface Community {
  id: number
  name: string
  slug: string
  shortDescription: string
  description: string
  image: string
  propertyCount: number
  averagePrice: string
  highlights: string[]
}

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`

export const communities: Community[] = [
  {
    id: 1,
    name: 'Downtown Dubai',
    slug: 'downtown-dubai',
    shortDescription: 'The vibrant centre of Dubai with iconic landmarks.',
    description: 'Downtown Dubai is the city\'s beating heart, home to the Burj Khalifa, The Dubai Mall, and the Dubai Fountain. This prestigious district offers a mix of high-rise luxury apartments and penthouses with unparalleled access to world-class dining, retail, and entertainment.',
    image: img('1546412414-e1885259563a'),
    propertyCount: 142,
    averagePrice: 'AED 3.2M',
    highlights: ['Burj Khalifa views', 'The Dubai Mall', 'Dubai Fountain', 'Metro connectivity'],
  },
  {
    id: 2,
    name: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    shortDescription: 'Iconic island living with private beach access.',
    description: 'Palm Jumeirah is Dubai\'s most iconic residential development, an artificial archipelago offering exclusive beachfront villas, signature apartments, and resort-style living. Residents enjoy private beach access, world-class hotels, and stunning sea views.',
    image: img('1538332576228-eb5b4c4de6f5'),
    propertyCount: 89,
    averagePrice: 'AED 12.5M',
    highlights: ['Private beach access', 'Sea views', 'Resort lifestyle', 'Signature villas'],
  },
  {
    id: 3,
    name: 'Dubai Marina',
    slug: 'dubai-marina',
    shortDescription: 'Waterfront living along the iconic marina promenade.',
    description: 'Dubai Marina is a vibrant waterfront community known for its impressive skyline, luxury yachts, and bustling promenade. The area offers a wide range of apartments with marina and sea views, alongside an abundance of dining and entertainment options.',
    image: img('1567958451986-2de427a4a0be'),
    propertyCount: 210,
    averagePrice: 'AED 2.8M',
    highlights: ['Marina promenade', 'Yacht club', 'Beach access', 'Nightlife'],
  },
  {
    id: 4,
    name: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    shortDescription: 'Green, family-friendly community with a championship golf course.',
    description: 'Dubai Hills Estate is a master-planned community centred around an 18-hole championship golf course. It offers a mix of luxury villas, townhouses, and apartments surrounded by parks, schools, and retail, making it ideal for families seeking a balanced lifestyle.',
    image: img('1613490493576-7fde63acd811'),
    propertyCount: 175,
    averagePrice: 'AED 6.8M',
    highlights: ['Golf course', 'Family friendly', 'Parks & schools', 'Dubai Hills Mall'],
  },
  {
    id: 5,
    name: 'Business Bay',
    slug: 'business-bay',
    shortDescription: 'The dynamic business and lifestyle hub of Dubai.',
    description: 'Business Bay is Dubai\'s central business district, featuring sleek high-rise apartments along the Dubai Canal. It combines commercial and residential living with easy access to Downtown, making it a favourite among young professionals and investors.',
    image: img('1567958451986-2de427a4a0be'),
    propertyCount: 198,
    averagePrice: 'AED 2.1M',
    highlights: ['Canal living', 'Business hub', 'Skyline views', 'Metro access'],
  },
  {
    id: 6,
    name: 'Jumeirah',
    slug: 'jumeirah',
    shortDescription: 'Established coastal community with luxury villas and beaches.',
    description: 'Jumeirah is one of Dubai\'s most established and prestigious residential areas, stretching along the coast. It features grand villas, low-rise apartments, and direct beach access, with a relaxed, upscale atmosphere.',
    image: img('1538332576228-eb5b4c4de6f5'),
    propertyCount: 64,
    averagePrice: 'AED 18.0M',
    highlights: ['Beachfront living', 'Luxury villas', 'Established community', 'Coastal lifestyle'],
  },
  {
    id: 7,
    name: 'Dubai Creek Harbour',
    slug: 'dubai-creek-harbour',
    shortDescription: 'Future-forward waterfront city with nature reserves.',
    description: 'Dubai Creek Harbour is a visionary waterfront development by Emaar, set around a vast nature reserve. It offers modern apartments with creek and skyline views, promising a sustainable, future-focused lifestyle minutes from Downtown.',
    image: img('1600210491369-e753d80a41f3'),
    propertyCount: 112,
    averagePrice: 'AED 4.5M',
    highlights: ['Nature reserve', 'Waterfront living', 'Future city', 'Creek views'],
  },
  {
    id: 8,
    name: 'Arabian Ranches',
    slug: 'arabian-ranches',
    shortDescription: 'Tranquil desert-inspired family community.',
    description: 'Arabian Ranches is a serene, family-oriented community of villas and townhouses set amid landscaped parks and desert-inspired architecture. It offers a peaceful suburban lifestyle with excellent schools, parks, and a community golf course.',
    image: img('1613490493576-7fde63acd811'),
    propertyCount: 98,
    averagePrice: 'AED 5.0M',
    highlights: ['Family community', 'Golf course', 'Parks & schools', 'Suburban tranquility'],
  },
]

export const getCommunityBySlug = (slug: string) => communities.find(c => c.slug === slug)
