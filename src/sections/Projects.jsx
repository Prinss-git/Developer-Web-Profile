import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

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
  return (
    <section id="projects" className="py-28 bg-[var(--bg-2)]" ref={ref} aria-label="Projects">
      <div className="wrap">
        <div data-r className="reveal mb-12">
          <div className="eyebrow">02 — Projects</div>
          <h2 className="section-title mt-3">Things I've built.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <div data-r key={p.id} className={`reveal d${Math.min(i + 1, 6)}`}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
