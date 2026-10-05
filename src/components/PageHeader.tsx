import { Link } from 'react-router-dom'

export default function PageHeader({ eyebrow, title, subtitle, image }: {
  eyebrow: string; title: string; subtitle?: string; image: string
}) {
  return (
    <section className="relative h-[42vh] min-h-[320px] flex items-center justify-center overflow-hidden">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 to-navy-950/80" />
      <div className="relative z-10 text-center px-4 pt-20">
        <div className="eyebrow mb-3">{eyebrow}</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{title}</h1>
        {subtitle && <p className="mt-4 text-white/70 max-w-2xl mx-auto">{subtitle}</p>}
        <nav className="mt-5 text-sm text-white/50">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gold">{title}</span>
        </nav>
      </div>
    </section>
  )
}
