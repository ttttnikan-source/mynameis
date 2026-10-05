export interface Service {
  id: number
  number: string
  title: string
  description: string
  icon: string
}

export const services: Service[] = [
  {
    id: 1,
    number: '01',
    title: 'Property Sales',
    description: 'Find and acquire exceptional residential and luxury properties across Dubai\'s most sought-after communities.',
    icon: 'home',
  },
  {
    id: 2,
    number: '02',
    title: 'Property Investment',
    description: 'Identify high-potential opportunities aligned with your investment goals, with data-driven market analysis.',
    icon: 'trending-up',
  },
  {
    id: 3,
    number: '03',
    title: 'Property Management',
    description: 'Professional management designed to protect and maximize the value of your property portfolio.',
    icon: 'building',
  },
  {
    id: 4,
    number: '04',
    title: 'Market Advisory',
    description: 'Data-driven insights and strategic guidance to help you make confident real estate decisions.',
    icon: 'bar-chart',
  },
]
