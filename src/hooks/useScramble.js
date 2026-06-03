import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!&'

export function useScramble(text, { delay = 300, duration = 1400 } = {}) {
  const [output, setOutput] = useState(() => text.split('').map(c => c === ' ' ? ' ' : CHARS[0]).join(''))

  useEffect(() => {
    let raf
    const start = performance.now() + delay

    const tick = now => {
      if (now < start) { raf = requestAnimationFrame(tick); return }
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)

      setOutput(
        text.split('').map((char, i) => {
          if (char === ' ') return ' '
          const threshold = i / text.length
          if (progress > threshold + 0.1) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )

      if (progress < 1) raf = requestAnimationFrame(tick)
      else setOutput(text)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text])

  return output
}
