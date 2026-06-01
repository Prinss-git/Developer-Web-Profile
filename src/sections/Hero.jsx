import { useEffect, useRef } from 'react'
import { ArrowDown, Download } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('[data-r]')
    const timers = []
    els.forEach((el, i) => timers.push(setTimeout(() => el.classList.add('in'), 80 + i * 70)))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="hero" ref={ref}
      className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden"
      aria-label="Hero">
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
           style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(9,9,11,0.75) 100%)' }} />

      <div className="wrap w-full py-16 relative z-10">

        {/* Top rule row */}
        <div data-r className="reveal mb-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tx-3)]">
          <span>Available for internships &amp; freelance</span>
          <span>2026</span>
        </div>

        {/* Divider */}
        <div data-r className="reveal d1 h-px bg-[var(--border)] mb-10" />

        {/* Name — massive display type */}
        <div data-r className="reveal d2 mb-10">
          <h1 className="font-extrabold leading-[0.88] tracking-[-0.03em] text-[var(--tx)]"
              style={{ fontSize: 'clamp(3rem, 12vw, 11rem)' }}>
            Prince<br />
            <span className="grad-text">Parnada.</span>
          </h1>
        </div>

        {/* Divider */}
        <div data-r className="reveal d3 h-px bg-[var(--border)] mb-8" />

        {/* Bottom row — role + CTAs */}
        <div data-r className="reveal d4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--tx-2)]">Full-Stack Developer</p>
            <p className="text-xs text-[var(--tx-3)] mt-0.5">University of Cebu · BSIT</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary group">
              View Projects
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Download size={13} />
              Resume
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
