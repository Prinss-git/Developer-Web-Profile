import { useRef, useEffect } from 'react'
import { ArrowRight, Code2, Rocket, Smartphone } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'

const FEATURES = [
  { icon: Code2,      title: 'Full-Stack',      sub: 'React, Node & MySQL' },
  { icon: Rocket,     title: 'Production Ready', sub: 'Live with real users' },
  { icon: Smartphone, title: 'Responsive',      sub: 'Seamless on all devices' },
]

export default function Hero() {
  const ctaRef  = useRef(null)
  const gridRef = useRef(null)
  useMagnetic(ctaRef, 0.35)

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
      className="relative min-h-screen flex items-center pt-24 pb-16 lg:pt-20 lg:pb-0 overflow-hidden"
      aria-label="Hero">

      {/* ── Background ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div ref={gridRef} className="hero-dot-grid opacity-40" />
        {/* Gold bloom behind the portrait */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4
                        w-[850px] h-[850px] max-w-[110vw] rounded-full"
             style={{ background: 'radial-gradient(circle, var(--ac-glow) 0%, transparent 65%)',
                      filter: 'blur(30px)' }} />
        <div className="absolute inset-0"
             style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 45%, var(--vignette) 100%)' }} />
        {/* Dot cluster, top right */}
        <div className="hero-dot-cluster hidden md:block" />
      </div>

      {/* ── Content ──────────────────────────────── */}
      <div className="wrap w-full relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-8 items-center">

          {/* Left column */}
          <div className="order-2 lg:order-1">

            <div className="reveal in eyebrow mb-6">Full-Stack Developer</div>

            <h1 className="reveal in d1 font-extrabold tracking-[-0.03em] leading-[1.05] text-[var(--tx)]"
                style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.4rem)' }}>
              I Design &amp; Develop<br />
              Web Apps that <span className="grad-text">Elevate</span><br />
              Real Businesses
            </h1>

            <p className="reveal in d2 mt-6 max-w-[34rem] text-[var(--tx-2)] leading-relaxed"
               style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)' }}>
              I build modern, responsive, production-grade web applications — including
              a live inventory and forecasting system running a real motor parts shop in Cebu.
            </p>

            <div className="reveal in d3 mt-9 flex flex-wrap items-center gap-4">
              <div ref={ctaRef}>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn btn-primary group text-[0.8rem] tracking-[0.08em] uppercase font-bold px-6 py-3.5">
                  View My Work
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                 className="text-sm font-semibold text-[var(--tx-2)] hover:text-[var(--ac)]
                            underline underline-offset-4 decoration-[var(--border-2)]
                            hover:decoration-[var(--ac)] transition-colors">
                Download Resume
              </a>
            </div>

            {/* Feature row */}
            <ul className="reveal in d4 mt-12 lg:mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3"
                role="list">
              {FEATURES.map(({ icon: Icon, title, sub }) => (
                <li key={title}
                    className="flex items-center gap-3 rounded-xl border border-[var(--border)]
                               bg-[var(--bg-2)]/60 px-3.5 py-3 backdrop-blur-sm
                               transition-colors duration-200 hover:border-[var(--border-2)]">
                  <span className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center
                                   border border-[var(--border-2)] text-[var(--ac)]"
                        aria-hidden="true">
                    <Icon size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.8rem] font-bold text-[var(--tx)] leading-tight">{title}</span>
                    <span className="block text-[0.7rem] text-[var(--tx-3)] leading-tight mt-0.5">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Signature line */}
            <div className="reveal in d5 mt-10 flex items-center gap-3">
              <span className="font-mono text-lg font-bold text-[var(--ac)] leading-none"
                    aria-hidden="true">PP</span>
              <span className="w-px h-7 bg-[var(--border-2)]" aria-hidden="true" />
              <p className="text-[0.72rem] text-[var(--tx-3)] leading-snug max-w-[15rem]">
                Building digital experiences<br className="hidden sm:block" /> that make a difference.
              </p>
            </div>
          </div>

          {/* Right column — portrait */}
          <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
            {/* Gold arc */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
                 aria-hidden="true">
              <div className="hero-arc" />
            </div>

            <div className="relative w-[min(78vw,26rem)] lg:w-full lg:max-w-[27rem] aspect-[4/5]">
              <img
                src="/images/prince-hero.jpg"
                alt="Prince Christian Parnada"
                fetchPriority="high"
                className="hero-portrait w-full h-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
