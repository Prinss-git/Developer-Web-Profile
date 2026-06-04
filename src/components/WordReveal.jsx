import { useRef, useState, useEffect } from 'react'

export default function WordReveal({ children, className, baseDelay = 0 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true); return
    }
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const words = children.split(' ')

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity 0.4s ease ${baseDelay + i * 28}ms, transform 0.4s ease ${baseDelay + i * 28}ms`,
        }}>
          {word}{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
