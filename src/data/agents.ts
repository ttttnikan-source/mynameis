export interface Agent {
  id: number
  name: string
  title: string
  phone: string
  email: string
  image: string
  languages: string[]
  experience: string
  propertiesSold: number
}

const avatar = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=400&q=80`

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Layla Al Mansouri',
    title: 'Senior Property Consultant',
    phone: '+971 50 123 4567',
    email: 'layla@horizonproperties.ae',
    image: avatar('1573496359142-b8d87734a5a2'),
    languages: ['Arabic', 'English', 'French'],
    experience: '12 years',
    propertiesSold: 340,
  },
  {
    id: 2,
    name: 'James Whitfield',
    title: 'Investment Advisor',
    phone: '+971 50 234 5678',
    email: 'james@horizonproperties.ae',
    image: avatar('1500648767791-00dcc994a43e'),
    languages: ['English', 'Arabic', 'Mandarin'],
    experience: '10 years',
    propertiesSold: 285,
  },
  {
    id: 3,
    name: 'Priya Sharma',
    title: 'Luxury Villa Specialist',
    phone: '+971 50 345 6789',
    email: 'priya@horizonproperties.ae',
    image: avatar('1580489944761-15a19d654956'),
    languages: ['English', 'Hindi', 'Arabic'],
    experience: '8 years',
    propertiesSold: 195,
  },
]

export const getAgentById = (id: number) => agents.find(a => a.id === id)
