import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Download, Sparkles } from 'lucide-react'

const ROLES = ['Full-Stack Developer', 'Systems Engineer', 'Open-Source Builder', 'UI Craftsman']

function Typewriter({ words }) {
  const [display, setDisplay] = useState('')
  const [wi, setWi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = words[wi]
    const delay = del ? 38 : ci === cur.length ? 2400 : 82
    const t = setTimeout(() => {
      if (!del && ci < cur.length) { setDisplay(cur.slice(0, ci + 1)); setCi(c => c + 1) }
      else if (!del) { setDel(true) }
      else if (del && ci > 0) { setDisplay(cur.slice(0, ci - 1)); setCi(c => c - 1) }
      else { setDel(false); setWi(i => (i + 1) % words.length) }
    }, delay)
    return () => clearTimeout(t)
  }, [ci, del, wi])
  return (
    <span className="shimmer-text font-bold">
      {display}
      <span className="inline-block w-[3px] h-[1em] bg-[var(--ac)] ml-[2px] align-middle cursor-blink rounded-full" />
    </span>
  )
}

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('[data-r]')
    const timers = []
    els.forEach((el, i) => timers.push(setTimeout(() => el.classList.add('in'), 160 + i * 100)))
    return () => timers.forEach(clearTimeout)
  }, [])
}

export default function Hero() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="hero" ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      aria-label="Hero">

      {/* ── Mesh background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'var(--mesh-1)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--mesh-2)' }} />
        <div className="absolute inset-0" style={{ background: 'var(--mesh-3)' }} />
        {/* Large blurred orbs — opacity via CSS var so both themes look rich */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
             style={{ background: 'var(--ac)', filter: 'blur(120px)', opacity: 'var(--orb-opacity, 0.07)' }} />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full"
             style={{ background: 'var(--ac2)', filter: 'blur(100px)', opacity: 'var(--orb-opacity, 0.06)' }} />
      </div>

      <div className="wrap relative z-10">
        <div className="grid lg:grid-cols-[1fr_480px] gap-16 xl:gap-24 items-center py-20">

          {/* ── Left ── */}
          <div className="flex flex-col gap-8">

            {/* Badge */}
            <div data-r className="reveal w-fit">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass
                              border border-[var(--ac)]/25 text-xs font-mono tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[var(--ac)] animate-pulse" />
                <span className="text-[var(--ac)]">Open to opportunities</span>
                <Sparkles size={11} className="text-[var(--ac2)]" />
              </div>
            </div>

            {/* Headline */}
            <div data-r className="reveal d1">
              <h1 className="text-[clamp(3.2rem,9vw,6rem)] font-extrabold leading-[1.0] tracking-tight">
                <span className="text-[var(--tx)]">Prince</span>
                <br />
                <span className="grad-text">Parnada</span>
              </h1>
            </div>

            {/* Typewriter */}
            <div data-r className="reveal d2 text-xl sm:text-2xl text-[var(--tx-2)] font-light h-9 flex items-center">
              <Typewriter words={ROLES} />
            </div>

            {/* Bio */}
            <p data-r className="reveal d3 text-[var(--tx-2)] text-base leading-loose max-w-[520px]">
              I build products end-to-end — distributed backends in Go, real-time systems,
              and interfaces people actually love. 3+ years across startups and scale-ups.
            </p>

            {/* CTAs */}
            <div data-r className="reveal d4 flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-primary group">
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="/resume.pdf" download className="btn btn-secondary">
                <Download size={15} />
                Resume
              </a>
            </div>

            {/* Stats row */}
            <div data-r className="reveal d5 flex flex-wrap gap-6 pt-2 border-t border-[var(--glass-border)]">
              {[['3+','Years exp.'],['15+','Projects'],['∞','Curiosity']].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-extrabold grad-text leading-none">{v}</div>
                  <div className="text-xs text-[var(--tx-3)] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: code card ── */}
          <div data-r className="reveal d3 hidden lg:block">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-px rounded-[22px] opacity-50"
                   style={{ background: 'var(--grad)', filter: 'blur(20px)' }} />

              {/* Card */}
              <div className="relative grad-border float-anim overflow-hidden">
                {/* Inner card */}
                <div className="bg-[var(--bg-2)] rounded-[19px] p-6 font-mono text-[11px] leading-6">
                  {/* Chrome */}
                  <div className="flex items-center gap-1.5 mb-5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <span className="w-3 h-3 rounded-full bg-[#febb2d]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <span className="ml-3 px-2.5 py-0.5 rounded-full text-[9px] tracking-widest uppercase
                                     glass border border-[var(--glass-border)] text-[var(--tx-3)]">
                      developer.ts
                    </span>
                  </div>

                  {/* Code */}
                  <pre className="text-[var(--tx-3)] select-none"><code>
<span className="text-[var(--ac2)]">interface</span>{' '}
<span className="text-yellow-300/80">Developer</span>{' {\n'}
{'  '}<span className="text-[var(--tx)]">name</span>{': '}
<span className="text-green-400/80">string</span>{'\n'}
{'  '}<span className="text-[var(--tx)]">role</span>{': '}
<span className="text-green-400/80">string</span>{'\n'}
{'  '}<span className="text-[var(--tx)]">stack</span>{': '}
<span className="text-green-400/80">string</span>{'[]\n'}
{'  '}<span className="text-[var(--tx)]">open</span>{': '}
<span className="text-sky-400/80">boolean</span>{'\n'}{'}'}
{'\n\n'}
<span className="text-[var(--ac2)]">const</span>{' '}
<span className="text-[var(--tx)]">me</span>{': '}
<span className="text-yellow-300/80">Developer</span>{' = {\n'}
{'  name:  '}<span className="text-[var(--ac)]">"Prince Christian Parnada"</span>{',\n'}
{'  role:  '}<span className="text-[var(--ac)]">"Full-Stack Eng."</span>{',\n'}
{'  stack: '}<span className="text-[var(--tx-2)]">['</span>
<span className="text-[var(--ac)]">"React"</span>
<span className="text-[var(--tx-2)]">, </span>
<span className="text-[var(--ac)]">"Go"</span>
<span className="text-[var(--tx-2)]">]</span>{',\n'}
{'  open:  '}<span className="text-sky-400/80">true</span>
{'\n}'}
                  </code></pre>

                  {/* Blinking cursor line */}
                  <div className="mt-3 flex items-center gap-2 text-[var(--ac)]">
                    <span className="opacity-60">{'>'}</span>
                    <span className="cursor-blink">█</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                        text-[var(--tx-3)] opacity-40" aria-hidden="true">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--ac)] to-transparent animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">scroll</span>
        </div>
      </div>
    </section>
  )
}
