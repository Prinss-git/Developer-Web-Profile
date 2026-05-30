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
    <section id="experience" className="py-28" ref={ref} aria-label="Work experience">
      <div className="wrap">
        <div data-r className="reveal text-center mb-16">
          <div className="eyebrow justify-center">Career</div>
          <h2 className="section-title mt-2">Experience</h2>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 top-2 bottom-2 w-px"
               style={{ background: 'linear-gradient(to bottom, var(--ac), var(--ac2), transparent)' }}
               aria-hidden="true" />
          <ol className="space-y-6">
            {experience.map((job, i) => (
              <li data-r key={job.id} className={`reveal d${Math.min(i+1,6)} relative pl-16`}>
                <div className="absolute left-[18px] top-6 w-[18px] h-[18px] rounded-full flex items-center justify-center"
                     style={{ background: 'var(--grad)' }} aria-hidden="true">
                  <div className="w-2 h-2 rounded-full bg-[var(--bg)]" />
                </div>
                <article className="card p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-bold text-[var(--tx)] text-base">{job.role}</h3>
                      <p className="grad-text font-semibold text-sm mt-0.5">{job.company}</p>
                      {job.location && (
                        <p className="flex items-center gap-1 text-xs text-[var(--tx-3)] mt-1">
                          <MapPin size={10} />{job.location}
                        </p>
                      )}
                    </div>
                    <span className="chip shrink-0 self-start">{job.period}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-sm text-[var(--tx-2)] leading-relaxed">
                        <span className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--ac)' }} aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
