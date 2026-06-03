import { useRef } from 'react'
import { ExternalLink, Lock } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useTilt } from '../hooks/useTilt'

const TECH_COLOR = {
  React: '#61dafb', TypeScript: '#3178c6', JavaScript: '#f7df1e',
  'Next.js': '#aaaaaa', Go: '#00add8', Python: '#3776ab',
  'Node.js': '#339933', GraphQL: '#e535ab', Docker: '#2496ed',
  Redis: '#dc382d', PostgreSQL: '#336791', Rust: '#ce422b',
  'Tailwind CSS': '#06b6d4', MySQL: '#4479a1', PHP: '#777bb4',
  'Chart.js': '#ff6384', Express: '#68a063', Axios: '#5a29e4',
  default: 'var(--ac)',
}

function addRipple(e) {
  const btn = e.currentTarget
  const rect = btn.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const span = document.createElement('span')
  span.className = 'ripple-effect'
  span.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`
  btn.style.position = 'relative'
  btn.style.overflow = 'hidden'
  btn.appendChild(span)
  setTimeout(() => span.remove(), 600)
}

export default function ProjectCard({ project }) {
  const { title, description, stack, github, live, image, demo } = project
  const cardRef = useRef(null)
  useTilt(cardRef, { max: 8, scale: 1.02 })

  return (
    <article ref={cardRef} className="card group flex flex-col h-full overflow-hidden"
             aria-label={`Project: ${title}`}>

      {/* Image */}
      <div className="relative h-44 bg-[var(--bg-3)] overflow-hidden shrink-0">
        {image ? (
          <>
            <img src={image} alt={title}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[var(--bg)]/85 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 flex items-center justify-center p-5">
              <p className="text-xs text-[var(--tx-2)] text-center leading-relaxed line-clamp-5">
                {description}
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="space-y-2.5 opacity-[0.08]">
              {[80, 55, 70, 40, 62].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full bg-[var(--tx)]" style={{ width: w }} />
              ))}
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: 'var(--ac)' }} />
      </div>

      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-bold text-[var(--tx)] text-base mb-2">{title}</h3>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {stack.map(tech => (
            <span key={tech}
              className="text-[11px] px-2 py-0.5 rounded-md font-mono font-medium bg-[var(--bg-3)] border border-[var(--border)]"
              style={{ color: TECH_COLOR[tech] || TECH_COLOR.default }}>
              {tech}
            </span>
          ))}
        </div>

        {demo && (
          <div className="flex items-start gap-2 text-[11px] font-mono p-3 rounded-lg bg-[var(--bg-3)] border border-[var(--border)]">
            <Lock size={11} className="text-[var(--tx-3)] mt-0.5 shrink-0" aria-hidden="true" />
            <div className="text-[var(--tx-2)] space-y-0.5">
              <div><span className="text-[var(--tx-3)]">email </span>{demo.email}</div>
              <div><span className="text-[var(--tx-3)]">pass  </span>{demo.password}</div>
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--border)]">
          {live ? (
            <a href={live} target="_blank" rel="noopener noreferrer"
               aria-label={`${title} live demo`}
               onClick={addRipple}
               className="btn btn-primary text-xs py-1.5 px-3">
              Live Demo <ExternalLink size={12} />
            </a>
          ) : (
            <span className="text-xs text-[var(--tx-3)] italic">In progress</span>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
               aria-label={`${title} source code`}
               className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)]
                          bg-[var(--bg-3)] text-[var(--tx-3)] hover:text-[var(--ac)] hover:border-[var(--ac)]
                          transition-all duration-200">
              <GithubIcon size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
