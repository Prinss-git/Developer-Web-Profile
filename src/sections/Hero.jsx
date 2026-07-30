import { useRef, useEffect } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

export default function Hero() {
  const btn1Ref = useRef(null)
  const btn2Ref = useRef(null)
  const gridRef = useRef(null)
  useMagnetic(btn1Ref, 0.35)
  useMagnetic(btn2Ref, 0.35)

  useEffect(() => {
    let raf = 0
    const fn = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (gridRef.current)
          gridRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      })
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => { window.removeEventListener('scroll', fn); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden text-center"
      aria-label="Hero">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div ref={gridRef} className="hero-dot-grid" />
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse 65% 65% at 50% 50%, var(--bg) 30%, transparent 100%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full"
             style={{ background: 'radial-gradient(ellipse, var(--ac-glow) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, var(--vignette) 100%)' }} />
      </div>

      {/* Content */}
      <div className="wrap w-full relative z-10 py-16 flex flex-col items-center">

        {/* Photo */}
        <div className="reveal in mb-7">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 mx-auto"
               style={{ borderColor: 'var(--border-2)' }}>
            <img src="/images/prince.jpg" alt="Prince Christian Parnada"
                 className="w-full h-full object-cover object-center" />
          </div>
        </div>

        <div className="reveal in mb-5">
          <h1 className="font-extrabold leading-[0.9] tracking-tight text-[var(--tx)] font-mono"
              style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}>
            Prince Parnada
          </h1>
        </div>

        <p className="reveal in d1 text-sm font-semibold text-[var(--tx-2)] mb-10 tracking-wide">
          Full-Stack Developer · Cebu, Philippines
        </p>

        <div className="reveal in d2 flex flex-wrap items-center justify-center gap-3">
          <div ref={btn1Ref}>
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn btn-primary group">
              View Projects
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div ref={btn2Ref}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
               className="btn btn-secondary">
              <Download size={13} />
              Download Resume
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
