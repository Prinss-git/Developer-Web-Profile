import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    const raf = time => { lenis.raf(time); requestAnimationFrame(raf) }
    const id = requestAnimationFrame(raf)

    return () => { lenis.destroy(); cancelAnimationFrame(id) }
  }, [])
}
