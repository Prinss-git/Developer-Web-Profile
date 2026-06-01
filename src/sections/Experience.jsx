import { useEffect, useRef } from 'react'
import { experience } from '../data/experience'
import { MapPin } from 'lucide-react'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 110))
      }),
      { threshold: 0.05 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function Experience() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="experience" className="py-28" ref={ref} aria-label="Experience">
      <div className="wrap">
        <div data-r className="reveal mb-12">
          <div className="eyebrow">03 — Education</div>
          <h2 className="section-title mt-3">Where I've been.</h2>
        </div>
        <div className="max-w-2xl space-y-4">
          {experience.map((job, i) => (
            <article data-r key={job.id} className={`reveal d${Math.min(i + 1, 6)} card p-6`}>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-[var(--tx)]">{job.role}</h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--ac)' }}>{job.company}</p>
                  {job.location && (
                    <p className="flex items-center gap-1 text-xs text-[var(--tx-3)] mt-1">
                      <MapPin size={10} aria-hidden="true" />{job.location}
                    </p>
                  )}
                </div>
                <span className="chip shrink-0">{job.period}</span>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5 text-sm text-[var(--tx-2)] leading-relaxed">
                    <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[var(--border-2)]"
                          aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
