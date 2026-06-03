import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'
import { useTilt } from '../hooks/useTilt'

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
  const photoRef = useRef(null)
  useReveal(ref)
  useTilt(photoRef, { max: 6, scale: 1.01 })

  return (
    <section id="about" className="py-16 lg:py-28 bg-[var(--bg-2)] overflow-x-hidden" ref={ref} aria-label="About me">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Photo + socials */}
          <div data-r className="reveal-left flex flex-col gap-6">
            <div ref={photoRef} className="relative w-full max-w-[280px]">
              <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-[var(--border-2)]"
                   aria-hidden="true" />
              <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-[var(--bg-3)]">
                <img
                  src="/images/prince.jpg"
                  alt="Prince Christian Parnada"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { icon: Mail,         href: 'mailto:princechristianparnada@gmail.com',                             label: 'Email' },
                { icon: GithubIcon,   href: 'https://github.com/Prinss-git',                                       label: 'GitHub' },
                { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/',     label: 'LinkedIn' },
                { icon: FacebookIcon, href: 'https://www.facebook.com/princechristian.parnada.9',                  label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                   className="w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border)]
                              bg-[var(--bg-3)] text-[var(--tx-3)] hover:text-[var(--ac)] hover:border-[var(--ac)]
                              transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-6">
            <div data-r className="reveal">
              <div className="eyebrow">01 — About me</div>
              <h2 className="section-title mt-3">
                IT student.<br />
                <span className="grad-text">Full-stack builder.</span>
              </h2>
            </div>

            <div data-r className="reveal d1 space-y-4 text-[var(--tx-2)] leading-loose text-[0.95rem]">
              <p>
                I'm Prince Christian, 20, studying BSIT at the University of Cebu – Banilad.
                I build full-stack web apps — the kind that actually get used by real people,
                not just demoed in class.
              </p>
              <p>
                My main stack is React on the frontend and Node.js + MySQL on the backend.
                I've also worked with PHP, Firebase, and plain CSS when the project calls for it.
                MotoTrack — an inventory and sales system for a real motor parts shop here in Cebu —
                is probably my most complete project so far.
              </p>
              <p>
                Looking for an internship or entry-level role where I can work on real problems
                and keep getting better.
              </p>
            </div>

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
