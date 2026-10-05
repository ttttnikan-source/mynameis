import { useRef, useState } from 'react'

/**
 * Accessible drag-to-scroll carousel with snap, arrows and keyboard support.
 * items: array; renderItem(item, index); getItemWidth for scroll stepping.
 */
export default function Carousel({ items, renderItem, ariaLabel, getRef }) {
  const trackRef = useRef(null)
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false })
  const [dragging, setDragging] = useState(false)

  const step = () => trackRef.current?.firstElementChild?.getBoundingClientRect().width + 18 || 400

  const scrollBy = (dir) => {
    trackRef.current?.scrollBy({ left: dir * step() * 1.2, behavior: 'smooth' })
  }

  const onPointerDown = (e) => {
    const track = trackRef.current
    drag.current = { down: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false }
    setDragging(true)
  }
  const onPointerMove = (e) => {
    if (!drag.current.down) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 6) drag.current.moved = true
    trackRef.current.scrollLeft = drag.current.startScroll - dx
  }
  const endDrag = () => {
    drag.current.down = false
    setDragging(false)
  }
  /* suppress card link navigation right after a drag */
  const onClickCapture = (e) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); scrollBy(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); scrollBy(-1) }
  }

  return (
    <div className="carousel-wrap">
      <button className="car-btn prev" onClick={() => scrollBy(-1)} aria-label="Previous properties">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <div
        ref={(el) => { trackRef.current = el; if (getRef) getRef.current = el }}
        className={`carousel${dragging ? ' dragging' : ''}`}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKeyDown}
      >
        {items.map((item, i) => renderItem(item, i))}
      </div>
      <button className="car-btn next" onClick={() => scrollBy(1)} aria-label="Next properties">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  )
}
