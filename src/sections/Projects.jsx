import { useEffect, useRef } from 'react'
import { projects } from '../data/projects'
import ProjectCarousel from '../components/ProjectCarousel'

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
    <section id="projects" className="relative divider-top py-16 lg:py-28 bg-[var(--bg)] overflow-hidden" ref={ref} aria-label="Projects">
      <div className="bg-dots -right-16 -top-10 w-[520px] h-[520px]" aria-hidden="true" />
      <div className="bg-glow left-1/2 top-[18%] -translate-x-1/2 w-[900px] h-[700px] max-w-[120vw]" aria-hidden="true" />
      <div className="bg-glow -left-48 bottom-0 w-[520px] h-[520px] opacity-70" aria-hidden="true" />
      <div className="wrap relative">
        <div data-r className="reveal mb-6">
          <div className="eyebrow">02 — Projects</div>
          <h2 className="section-title mt-3">Things I've built.</h2>
        </div>
      </div>

      {/* Wider than the text column so the side cards have room to show in full */}
      <div data-r className="reveal relative mx-auto max-w-[1440px] px-4">
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  )
}
