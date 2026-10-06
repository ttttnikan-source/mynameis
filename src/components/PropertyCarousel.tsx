import { useRef, useState, useCallback, MouseEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Property } from '../data/properties'
import PropertyCard from './PropertyCard'

export default function PropertyCarousel({ properties }: { properties: Property[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.offsetWidth / getVisibleCards()
    scrollRef.current.scrollBy({ left: dir === 'left' ? -cardWidth : cardWidth, behavior: 'smooth' })
  }

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }

  const onMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  const onMouseUp = useCallback(() => setIsDragging(false), [])

  return (
    <div className="relative">
      {/* Nav buttons */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-card-hover items-center justify-center text-navy-800 hover:bg-navy-800 hover:text-white transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-card-hover items-center justify-center text-navy-800 hover:bg-navy-800 hover:text-white transition-all"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto no-scrollbar cursor-grab select-none pb-2 -mx-1 px-1"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {properties.map(p => (
          <div
            key={p.id}
            className="shrink-0 w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
          >
            <PropertyCard property={p} />
          </div>
        ))}
      </div>
    </div>
  )
}
