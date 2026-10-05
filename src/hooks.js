import { useEffect, useRef, useState } from 'react'

/* Adds the 'in' class when the element scrolls into view (one-shot). */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

/* localStorage-backed state (favorites). */
export function useFavorites() {
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hp_favs') || '[]') } catch { return [] }
  })
  useEffect(() => {
    localStorage.setItem('hp_favs', JSON.stringify(favs))
  }, [favs])
  const toggle = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  return { favs, toggle, has: (id) => favs.includes(id) }
}
