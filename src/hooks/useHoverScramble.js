import { useState, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&?'

export function useHoverScramble(text) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef(null)

  const onEnter = () => {
    cancelAnimationFrame(rafRef.current)
    const start = performance.now()
    const duration = 500

    const tick = now => {
      const p = Math.min((now - start) / duration, 1)
      setDisplay(
        text.split('').map((c, i) => {
          if (c === ' ' || c === '.' || c === ',') return c
          if (p > i / text.length + 0.12) return c
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    rafRef.current = requestAnimationFrame(tick)
  }

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current)
    setDisplay(text)
  }

  return { display, onEnter, onLeave }
}
