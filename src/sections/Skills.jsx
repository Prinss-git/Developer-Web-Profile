import { useEffect, useRef } from 'react'
import { skills } from '../data/skills'
import SkillBadge from '../components/SkillBadge'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 70))
      }),
      { threshold: 0.05 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function Skills() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id="skills" className="py-16 lg:py-28 bg-[var(--bg-2)]" ref={ref} aria-label="Skills">
      <div className="wrap">
        <div data-r className="reveal mb-12">
          <div className="eyebrow">04 — Skills</div>
          <h2 className="section-title mt-3">What I work with.</h2>
        </div>
        <div className="space-y-10">
          {skills.map((group, gi) => (
            <div data-r key={group.category} className={`reveal d${Math.min(gi + 1, 6)}`}>
              <h3 className="text-xs font-semibold text-[var(--tx-3)] uppercase tracking-[0.12em] mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.category} skills`}>
                {group.items.map(item => (
                  <div key={item.name} role="listitem">
                    <SkillBadge name={item.name} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
