import { useEffect, useRef } from 'react'
import { skills } from '../data/skills'
import SkillBadge from '../components/SkillBadge'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 60))
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
    <section id="skills" className="py-28 relative" ref={ref} aria-label="Skills">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(180deg, transparent, var(--bg-2) 20%, var(--bg-2) 80%, transparent)' }} />
      <div className="wrap relative">
        <div data-r className="reveal text-center mb-16">
          <div className="eyebrow justify-center">Toolbox</div>
          <h2 className="section-title mt-2">Skills</h2>
          <p className="text-[var(--tx-2)] mt-4 max-w-md mx-auto leading-relaxed">
            Technologies I reach for across the full stack.
          </p>
        </div>
        <div className="space-y-12">
          {skills.map((group, gi) => (
            <div key={group.category}>
              <div data-r className={`reveal d${gi+1} flex items-center gap-4 mb-5`}>
                <h3 className="text-xs font-mono font-semibold text-[var(--tx-3)] uppercase tracking-[0.18em]">{group.category}</h3>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, var(--border-2), transparent)' }} />
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3" role="list" aria-label={`${group.category} skills`}>
                {group.items.map((item, ii) => (
                  <div data-r key={item.name} className={`reveal-scale d${Math.min(ii+1,6)}`} role="listitem">
                    <SkillBadge name={item.name} icon={item.icon} />
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
