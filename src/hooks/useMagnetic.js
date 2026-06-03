import { useEffect } from 'react'

export function useMagnetic(ref, strength = 0.4) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = e => {
      const rect = el.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width  / 2)) * strength
      const dy = (e.clientY - (rect.top  + rect.height / 2)) * strength
      el.style.transform  = `translate(${dx}px, ${dy}px)`
      el.style.transition = 'transform 0.15s ease'
    }

    const onLeave = () => {
      el.style.transform  = 'translate(0, 0)'
      el.style.transition = 'transform 0.5s cubic-bezier(.22,.68,0,1.2)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
}
