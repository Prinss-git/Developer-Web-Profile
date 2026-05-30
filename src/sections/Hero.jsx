import { useEffect, useRef } from 'react'
import { ArrowRight, Download } from 'lucide-react'

export default function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('[data-r]')
    const timers = []
    els.forEach((el, i) => timers.push(setTimeout(() => el.classList.add('in'), 120 + i * 90)))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="hero" ref={ref}
      className="min-h-screen flex items-center pt-16 pb-24"
      aria-label="Hero">
      <div className="wrap w-full">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 xl:gap-24 items-center">

          {/* Text */}
          <div>
            <div data-r className="reveal mb-8 flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
                    style={{ boxShadow: '0 0 8px #34d399' }} />
              <span className="text-sm text-[var(--tx-2)]">Available for work</span>
            </div>

            <h1 data-r className="reveal d1 font-extrabold leading-[0.9] tracking-tight mb-7"
                style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
              <span className="block text-[var(--tx)]">Prince</span>
              <span className="block grad-text">Parnada.</span>
            </h1>

            <p data-r className="reveal d2 text-base font-semibold text-[var(--tx-2)] mb-4 tracking-wide">
              Full-Stack Developer &amp; IT Student
            </p>

            <p data-r className="reveal d3 text-[var(--tx-3)] leading-relaxed mb-10 max-w-[440px]">
              I build full-stack web applications for real businesses.
              Based in Cebu, Philippines — studying BSIT at the University of Cebu.
            </p>

            <div data-r className="reveal d4 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary group">
                View Projects
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Download size={14} />
                Resume
              </a>
            </div>
          </div>

          {/* Photo */}
          <div data-r className="reveal-scale hidden lg:flex justify-end">
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-[var(--border-2)]"
                   aria-hidden="true" />
              <div className="relative w-[280px] h-[340px] rounded-2xl overflow-hidden bg-[var(--bg-3)]">
                <img
                  src="/images/prince.jpg"
                  alt="Prince Christian Parnada"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
