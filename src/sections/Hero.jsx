import { useEffect, useRef } from 'react'
import { ArrowDown, Download } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('[data-r]')
    const timers = []
    els.forEach((el, i) => timers.push(setTimeout(() => el.classList.add('in'), 80 + i * 80)))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="hero" ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden text-center"
      aria-label="Hero">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid */}
        <div className="hero-dot-grid" />

        {/* Fade grid out toward center so name reads clean */}
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%, var(--bg) 30%, transparent 100%)' }} />

        {/* Orange glow behind name */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full"
             style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        {/* Scan lines */}
        <div className="hero-scan" style={{ top: '20%' }} />
        <div className="hero-scan hero-scan-2" style={{ top: '20%' }} />

        {/* Edge vignette */}
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(9,9,11,0.85) 100%)' }} />
      </div>

      {/* ── Content ── */}
      <div className="wrap w-full relative z-10 py-16 flex flex-col items-center">

        <div data-r className="reveal mb-6">
          <h1 className="font-extrabold leading-[0.9] tracking-tight text-[var(--tx)]"
              style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}>
            Prince Parnada
          </h1>
        </div>

        <p data-r className="reveal d1 text-sm font-semibold text-[var(--tx-2)] mb-10 tracking-wide">
          Full-Stack Developer &amp; IT Student · University of Cebu
        </p>

        <div data-r className="reveal d2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-primary group">
            View Projects
            <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <Download size={13} />
            Download Resume
          </a>
        </div>

      </div>
    </section>
  )
}
