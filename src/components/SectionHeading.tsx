import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, center = true }: {
  eyebrow: string; title: string; subtitle?: string; center?: boolean
}) {
  return (
    <Reveal className={center ? 'text-center' : ''}>
      {eyebrow && (
        <div className={`eyebrow mb-3 ${center ? '' : 'text-left'}`}>{eyebrow}</div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base lg:text-lg text-navy-400 max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
