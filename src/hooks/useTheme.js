import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio-theme')
      if (stored === 'light' || stored === 'dark') return stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* private mode */ }
  }, [theme])

  // Switch themes with a circular reveal that grows from the toggle button.
  // Browsers without View Transitions get a short colour cross-fade instead,
  // and reduced-motion users get an instant switch.
  const toggle = e => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const apply = () => {
      root.setAttribute('data-theme', next)
      flushSync(() => setTheme(next))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return apply()

    if (!document.startViewTransition) {
      root.classList.add('theme-fade')
      apply()
      setTimeout(() => root.classList.remove('theme-fade'), 500)
      return
    }

    // Origin: the button's centre (works for mouse, touch and keyboard).
    const rect = e?.currentTarget?.getBoundingClientRect?.()
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40
    const y = rect ? rect.top + rect.height / 2 : 32
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(apply)
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(.22,.68,0,1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
  }

  return { theme, toggle }
}
