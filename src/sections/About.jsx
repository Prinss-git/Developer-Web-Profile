import { useEffect, useRef } from 'react'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'

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
    <section id="about" className="py-28 bg-[var(--bg-2)]" ref={ref} aria-label="About me">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Photo + socials */}
          <div data-r className="reveal-left flex flex-col gap-6">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border border-[var(--border-2)]"
                   aria-hidden="true" />
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[var(--bg-3)]">
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
