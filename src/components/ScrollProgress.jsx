import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const fn = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setPct(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[99999] h-[2px] pointer-events-none"
      style={{
        width: `${pct}%`,
        background: 'var(--ac)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px var(--ac)',
      }}
    />
  )
}
