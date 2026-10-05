import { useEffect, useState } from 'react'
import { img } from '../data'

/**
 * Property gallery: main image, thumbnails, fullscreen lightbox with
 * keyboard navigation (Esc / arrows).
 */
export default function Gallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const urls = images.map((i) => img(i, 1600))

  useEffect(() => { setIndex(0) }, [images])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(false)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % urls.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + urls.length) % urls.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, urls.length])

  const next = () => setIndex((i) => (i + 1) % urls.length)
  const prev = () => setIndex((i) => (i - 1 + urls.length) % urls.length)

  return (
    <>
      <div className="gallery-main">
        <img key={index} src={urls[index]} alt={`${name} — view ${index + 1}`} />
        {urls.length > 1 && (
          <>
            <button className="gal-nav prev" onClick={prev} aria-label="Previous image">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="gal-nav next" onClick={next} aria-label="Next image">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}
        <button className="gal-expand" onClick={() => setLightbox(true)} aria-label="Open fullscreen gallery">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </button>
      </div>
      <div className="thumbs" role="tablist" aria-label="Gallery thumbnails">
        {urls.map((u, i) => (
          <button
            key={u}
            className={i === index ? 'active' : ''}
            onClick={() => setIndex(i)}
            role="tab"
            aria-selected={i === index}
            aria-label={`View image ${i + 1}`}
          >
            <img src={img(images[i], 300)} alt="" loading="lazy" />
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} gallery`} onClick={() => setLightbox(false)}>
          <img key={index} src={urls[index]} alt={`${name} — fullscreen view ${index + 1}`} onClick={(e) => e.stopPropagation()} />
          <button className="lb-close" onClick={() => setLightbox(false)} aria-label="Close gallery">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <span className="lb-count">{index + 1} / {urls.length}</span>
        </div>
      )}
    </>
  )
}
