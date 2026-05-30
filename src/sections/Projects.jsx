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
    <section id="projects" className="py-28 relative" ref={ref} aria-label="Projects">
      {/* Section background tint */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: 'linear-gradient(180deg, transparent, var(--bg-2) 20%, var(--bg-2) 80%, transparent)' }} />

      <div className="wrap relative">
        <div data-r className="reveal text-center mb-16">
          <div className="eyebrow justify-center">Selected work</div>
          <h2 className="section-title mt-2">Projects</h2>
          <p className="text-[var(--tx-2)] mt-4 max-w-md mx-auto leading-relaxed">
            A handful of things I've built — from real-time collaboration tools to distributed systems.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div data-r key={project.id} className={`reveal d${i + 1}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
