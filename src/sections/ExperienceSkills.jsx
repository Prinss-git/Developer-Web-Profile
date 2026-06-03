import { useEffect, useRef } from 'react'
import { experience } from '../data/experience'
import { skills } from '../data/skills'
import { MapPin } from 'lucide-react'
import SkillBadge from '../components/SkillBadge'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 80))
      }),
      { threshold: 0.05 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function ExperienceSkills() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="experience" className="py-16 lg:py-28" ref={ref} aria-label="Experience and Skills">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Experience */}
          <div>
            <div data-r className="reveal mb-8">
              <div className="eyebrow">03 — Education</div>
              <h2 className="section-title mt-3">Where I've been.</h2>
            </div>
            <div className="space-y-4">
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

          {/* Skills */}
          <div id="skills">
            <div data-r className="reveal mb-8">
              <div className="eyebrow">04 — Skills</div>
              <h2 className="section-title mt-3">What I work with.</h2>
            </div>
            <div className="space-y-8">
              {skills.map((group, gi) => (
                <div data-r key={group.category} className={`reveal d${Math.min(gi + 1, 6)}`}>
                  <div className="flex items-baseline gap-3 mb-3">
                    <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-[0.12em]">
                      {group.category}
                    </h3>
                    {group.note && (
                      <span className="text-[10px] text-[var(--tx-3)] italic normal-case tracking-normal">
                        — {group.note}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.category} skills`}>
                    {group.items.map(item => (
                      <div key={item.name} role="listitem">
                        <SkillBadge name={item.name} primary={gi === 0} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
