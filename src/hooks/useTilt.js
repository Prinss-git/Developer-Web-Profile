import { useEffect } from 'react'

export function useTilt(ref, { max = 10, scale = 1.02 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    let raf
    let tx = 0, ty = 0, cx = 0, cy = 0

    const onMove = e => {
      const rect = el.getBoundingClientRect()
      tx = ((e.clientY - rect.top)  / rect.height - 0.5) * -max
      ty = ((e.clientX - rect.left) / rect.width  - 0.5) *  max
    }

    const animate = () => {
      cx += (tx - cx) * 0.1
      cy += (ty - cy) * 0.1
      el.style.transform = `perspective(900px) rotateX(${cx}deg) rotateY(${cy}deg) scale(${scale})`
      raf = requestAnimationFrame(animate)
    }

    const onEnter = () => { raf = requestAnimationFrame(animate) }

    const onLeave = () => {
      cancelAnimationFrame(raf)
      tx = 0; ty = 0
      const snap = () => {
        cx += (0 - cx) * 0.12
        cy += (0 - cy) * 0.12
        el.style.transform = `perspective(900px) rotateX(${cx}deg) rotateY(${cy}deg) scale(1)`
        if (Math.abs(cx) > 0.05 || Math.abs(cy) > 0.05) raf = requestAnimationFrame(snap)
        else el.style.transform = ''
      }
      raf = requestAnimationFrame(snap)
    }

    el.style.transformStyle = 'preserve-3d'
    el.style.willChange = 'transform'
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])
}
