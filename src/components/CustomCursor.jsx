import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let mx = 0, my = 0
    let rx = 0, ry = 0
    let raf

    const onMove = e => { mx = e.clientX; my = e.clientY }

    const tick = () => {
      if (dotRef.current)  dotRef.current.style.transform  = `translate(${mx}px,${my}px)`
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px,${ry}px)`
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => { dotRef.current?.classList.add('h'); ringRef.current?.classList.add('h') }
    const onLeave = () => { dotRef.current?.classList.remove('h'); ringRef.current?.classList.remove('h') }

    const bindHover = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    document.addEventListener('mousemove', onMove)
    bindHover()
    raf = requestAnimationFrame(tick)
    document.documentElement.classList.add('custom-cursor')

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="c-dot"  aria-hidden="true" />
      <div ref={ringRef} className="c-ring" aria-hidden="true" />
    </>
  )
}
