import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'

const STATS = [
  { value: '20',   label: 'Years old',           color: 'var(--ac)' },
  { value: '3+',   label: 'Projects built',       color: 'var(--ac2)' },
  { value: 'BSIT', label: 'Degree (in progress)', color: 'var(--ac)' },
  { value: 'Open', label: 'To opportunities',     color: 'var(--ac2)' },
]

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 90))
      }),
      { threshold: 0.1 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function About() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="about" className="py-28" ref={ref} aria-label="About me">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ── Left: avatar ── */}
          <div className="flex flex-col items-center lg:items-start gap-8">
            <div data-r className="reveal-left relative w-fit mx-auto lg:mx-0">
              {/* Rotating dashed ring */}
              <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[var(--ac)]/25 spin-slow" />
              {/* Solid ring */}
              <div className="absolute -inset-1.5 rounded-full" style={{
                background: 'var(--grad)', padding: '2px', borderRadius: '9999px'
              }}>
                <div className="w-full h-full rounded-full bg-[var(--bg-2)]" />
              </div>
              {/* Avatar */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden
                              ring-2 ring-[var(--ac)]/30 ring-offset-4 ring-offset-[var(--bg)]">
                <img
                  src="/images/prince.jpeg"
                  alt="Prince Christian Parnada"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Status badge */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5
                              px-3 py-1 rounded-full glass border border-[var(--glass-border)] whitespace-nowrap text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[var(--tx-2)] font-medium">Available</span>
              </div>
            </div>

            {/* Name + title */}
            <div data-r className="reveal text-center lg:text-left">
              <h3 className="text-2xl font-extrabold text-[var(--tx)]">Prince Christian Parnada</h3>
              <p className="text-sm font-mono text-[var(--ac)] mt-1">IT Student & Web Developer</p>
            </div>

            {/* Social row */}
            <div data-r className="reveal d1 flex gap-2">
              {[
                { icon: Mail,         href: 'mailto:princechristianparnada@gmail.com',                              label: 'Email' },
                { icon: GithubIcon,   href: 'https://github.com/Prinss-git',                                        label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/',      label: 'LinkedIn' },
                { icon: FacebookIcon, href: 'https://www.facebook.com/princechristian.parnada.9',                   label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                   className="w-10 h-10 rounded-xl glass flex items-center justify-center
                              border border-[var(--glass-border)] text-[var(--tx-2)]
                              hover:text-[var(--ac)] hover:border-[var(--ac)]
                              transition-all duration-200">
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Stats grid */}
            <div data-r className="reveal d2 grid grid-cols-2 gap-3 w-full max-w-xs">
              {STATS.map(({ value, label, color }) => (
                <div key={label} className="card p-4 text-center">
                  <div className="text-2xl font-extrabold" style={{ color }}>{value}</div>
                  <div className="text-xs text-[var(--tx-3)] mt-0.5 leading-snug">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: bio ── */}
          <div className="flex flex-col gap-7">
            <div data-r className="reveal">
              <div className="eyebrow">About me</div>
              <h2 className="section-title mt-2">
                Building with care,<br />
                <span className="grad-text">shipping with speed.</span>
              </h2>
            </div>

            <div data-r className="reveal d1 space-y-4 text-[var(--tx-2)] leading-loose text-[0.95rem]">
              <p>
                I'm Prince Christian S. Parnada, a 20-year-old IT student at the University of Cebu – Banilad,
                passionate about building web applications that are both functional and beautifully designed.
              </p>
              <p>
                I work across the full stack — from crafting responsive frontends in React to building
                server-side logic with Node.js and PHP, and managing databases with MySQL and Firebase.
                I love turning ideas into real, working products.
              </p>
              <p>
                Currently open to internships, freelance projects, and entry-level opportunities where I
                can grow, contribute, and keep building things that matter.
              </p>
            </div>

            {/* Highlight chips */}
            <div data-r className="reveal d2 flex flex-wrap gap-2">
              {['React', 'JavaScript', 'PHP', 'Node.js', 'MySQL', 'Firebase'].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
