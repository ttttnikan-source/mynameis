export interface Testimonial {
  id: number
  quote: string
  name: string
  clientType: string
  location: string
  avatar: string
}

const avatar = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Horizon Properties made our relocation to Dubai effortless. Their team understood exactly what we were looking for and found us a stunning family villa in Dubai Hills. The entire process was seamless and professional.',
    name: 'Sophie & Marcus Laurent',
    clientType: 'Relocating Family',
    location: 'Paris, France',
    avatar: avatar('1494790108377-be9c29b29330'),
  },
  {
    id: 2,
    quote: 'As an international investor, I needed a partner who understood the Dubai market deeply. Horizon\'s investment advisory team provided detailed yield analysis and helped me build a portfolio of three high-yield apartments.',
    name: 'Rajiv Mehta',
    clientType: 'International Investor',
    location: 'London, UK',
    avatar: avatar('1507003211169-0a1dd7228f2d'),
  },
  {
    id: 3,
    quote: 'The level of service was exceptional from day one. They didn\'t just sell me a property — they helped me find a home. My penthouse in Dubai Marina exceeded every expectation.',
    name: 'Aisha Al Bakr',
    clientType: 'Luxury Home Buyer',
    location: 'Riyadh, KSA',
    avatar: avatar('1438761681033-6461ffad8d80'),
  },
]
