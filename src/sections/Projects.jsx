import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import FeaturedProjectCard from '../components/FeaturedProjectCard'

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 100))
      }),
      { threshold: 0.05 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function Projects() {
  const ref = useRef(null)
  useReveal(ref)
  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="relative divider-top py-16 lg:py-28 bg-[var(--bg)] overflow-hidden" ref={ref} aria-label="Projects">
      <div className="bg-dots -right-16 -top-10 w-[520px] h-[520px]" aria-hidden="true" />
      <div className="bg-glow left-1/2 top-[18%] -translate-x-1/2 w-[900px] h-[700px] max-w-[120vw]" aria-hidden="true" />
      <div className="bg-glow -left-48 bottom-0 w-[520px] h-[520px] opacity-70" aria-hidden="true" />
      <div className="wrap relative">
        <div data-r className="reveal mb-12">
          <div className="eyebrow">02 — Projects</div>
          <h2 className="section-title mt-3">Things I've built.</h2>
        </div>

        {/* Featured */}
        {featured.map(p => (
          <div data-r key={p.id} className="reveal-scale mb-5">
            <FeaturedProjectCard project={p} />
          </div>
        ))}

        {/* Rest */}
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p, i) => (
              <div data-r key={p.id} className={`reveal d${Math.min(i + 1, 6)}`}>
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
