import { useRef, useEffect } from 'react'
import { ArrowDown, Download } from 'lucide-react'
import { useScramble } from '../hooks/useScramble'
import { useMagnetic } from '../hooks/useMagnetic'

function addRipple(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const span = document.createElement('span')
  span.className = 'ripple-effect'
  span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
  btn.style.position = 'relative'
  btn.style.overflow = 'hidden'
  btn.appendChild(span)
  setTimeout(() => span.remove(), 600)
}

export default function Hero() {
  const name    = useScramble('Prince Parnada', { delay: 400, duration: 1400 })
  const btn1Ref = useRef(null)
  const btn2Ref = useRef(null)
  const gridRef = useRef(null)
  useMagnetic(btn1Ref, 0.35)
  useMagnetic(btn2Ref, 0.35)

  useEffect(() => {
    const fn = () => {
      if (gridRef.current)
        gridRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
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
             style={{ background: 'radial-gradient(ellipse, rgba(232,145,106,0.07) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="hero-scan" style={{ top: '20%' }} />
        <div className="hero-scan hero-scan-2" style={{ top: '20%' }} />
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(14,12,10,0.88) 100%)' }} />
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
              style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}
              aria-label="Prince Parnada">
            {name}
          </h1>
        </div>

        <p className="reveal in d1 text-sm font-semibold text-[var(--tx-2)] mb-10 tracking-wide">
          Full-Stack Developer &amp; IT Student · University of Cebu
        </p>

        <div className="reveal in d2 flex flex-wrap items-center justify-center gap-3">
          <div ref={btn1Ref}>
            <button
              onClick={e => { addRipple(e); setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 150) }}
              className="btn btn-primary group">
              View Projects
              <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
          <div ref={btn2Ref}>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
               className="btn btn-secondary" onClick={addRipple}>
              <Download size={13} />
              Download Resume
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
