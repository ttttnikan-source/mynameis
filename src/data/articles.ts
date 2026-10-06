export interface Article {
  id: number
  title: string
  slug: string
  category: string
  date: string
  excerpt: string
  image: string
  content: string[]
}

const _imgPool = ['1490806843957-31f4c9a91c65', '1497366216548-37526070297c', '1568605114967-8130f3a36994', '1502005229762-cf1b2da7c5d6']
let _imgIdx = 0
const img = (_id: string) => `https://images.unsplash.com/photo-${_imgPool[_imgIdx++ % _imgPool.length]}?auto=format&fit=crop&w=1200&q=80`

export const articles: Article[] = [
  {
    id: 1,
    title: 'Where to Invest in Dubai in 2026',
    slug: 'where-to-invest-in-dubai-2026',
    category: 'Investment',
    date: 'Jan 15, 2026',
    excerpt: 'A comprehensive guide to Dubai\'s most promising investment zones, emerging communities, and the trends shaping the market this year.',
    image: img('1567958451986-2de427a4a0be'),
    content: [
      'Dubai\'s real estate market continues to attract global investors, with transaction volumes reaching record highs. In 2026, several communities stand out for their growth potential and rental yields.',
      'Business Bay and Dubai Creek Harbour remain top picks for apartment investors, offering strong rental yields of 6.5–7.5%. Meanwhile, Dubai Hills Estate and Arabian Ranches continue to see capital appreciation driven by family demand.',
      'Off-plan investments in master-planned communities with strong infrastructure and upcoming metro extensions offer the best long-term value. Investors should focus on communities with clear delivery timelines and reputable developers.',
    ],
  },
  {
    id: 2,
    title: 'Dubai\'s Most Promising Luxury Communities',
    slug: 'dubai-luxury-communities',
    category: 'Lifestyle',
    date: 'Jan 8, 2026',
    excerpt: 'From Palm Jumeirah to Dubai Hills, explore the communities redefining luxury living in Dubai.',
    image: img('1538332576228-eb5b4c4de6f5'),
    content: [
      'Luxury living in Dubai goes beyond four walls — it is about the lifestyle a community offers. Palm Jumeirah remains the pinnacle of beachfront luxury, while Downtown Dubai offers the energy of city-centre living.',
      'Emerging luxury destinations like Dubai Creek Harbour are redefining waterfront living with nature-integrated design and world-class amenities. These communities combine architectural excellence with lifestyle infrastructure.',
      'For those seeking privacy and space, the villas of Jumeirah and Emirates Hills offer unparalleled exclusivity, while Dubai Hills Estate provides a balanced family lifestyle centred around golf and green spaces.',
    ],
  },
  {
    id: 3,
    title: 'Understanding Rental Yields in Dubai',
    slug: 'understanding-rental-yields-dubai',
    category: 'Market Analysis',
    date: 'Dec 28, 2025',
    excerpt: 'Dubai offers some of the highest rental yields globally. Here\'s how to evaluate and maximise your returns.',
    image: img('1613490493576-7fde63acd811'),
    content: [
      'Dubai\'s rental yields consistently rank among the highest in the world, averaging 5–8% for apartments and 4–6% for villas. Understanding the factors that influence yield is key to making smart investment decisions.',
      'Location, property type, and community amenities all play a role. Apartments in Business Bay and Dubai Marina typically offer the highest yields, while luxury villas in Palm Jumeirah offer lower yields but stronger capital appreciation.',
      'Investors should also consider service charges, vacancy rates, and the impact of off-plan vs. ready properties on cash flow. A diversified portfolio across communities and property types can help balance yield and appreciation.',
    ],
  },
  {
    id: 4,
    title: 'Buying Property in Dubai: A Complete Guide',
    slug: 'buying-property-dubai-complete-guide',
    category: 'Guide',
    date: 'Dec 12, 2025',
    excerpt: 'Everything you need to know about purchasing property in Dubai — from legal requirements to financing options.',
    image: img('1600210491369-e753d80a41f3'),
    content: [
      'Buying property in Dubai is a straightforward process for both residents and non-residents. Foreigners can own freehold property in designated areas, with full ownership rights.',
      'The process involves selecting a property, signing a Memorandum of Understanding (MOU), obtaining a No Objection Certificate (NOC) from the developer, and transferring ownership at the Dubai Land Department.',
      'Financing is available through UAE banks for both residents and non-residents, typically with a maximum loan-to-value ratio of 50–80% depending on the property value and buyer profile. Working with a trusted advisor ensures a smooth transaction.',
    ],
  },
]

export const getArticleBySlug = (slug: string) => articles.find(a => a.slug === slug)
