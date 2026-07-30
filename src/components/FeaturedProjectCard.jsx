import { useState } from 'react'
import { ExternalLink, Lock } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

const TECH_COLOR = {
  React: '#61dafb', TypeScript: '#3178c6', JavaScript: '#f7df1e',
  'Next.js': '#aaaaaa', Go: '#00add8', Python: '#3776ab',
  'Node.js': '#339933', GraphQL: '#e535ab', Docker: '#2496ed',
  Redis: '#dc382d', PostgreSQL: '#336791', Rust: '#ce422b',
  'Tailwind CSS': '#06b6d4', MySQL: '#4479a1', PHP: '#777bb4',
  'Chart.js': '#ff6384', Express: '#68a063', Axios: '#5a29e4',
  default: 'var(--ac)',
}

export default function FeaturedProjectCard({ project }) {
  const { title, description, stack, github, live, image, demo, stats } = project
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <article className="card overflow-hidden" aria-label={`Featured project: ${title}`}>
      <div className="grid md:grid-cols-2">

        {/* Image */}
        <div className="relative h-64 sm:h-72 md:h-auto bg-[var(--bg-3)] overflow-hidden group">
          {image ? (
            <img src={image} alt={title} loading="lazy"
                 onLoad={() => setImgLoaded(true)}
                 className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105
                             ${imgLoaded ? 'blur-0 scale-100' : 'blur-sm scale-105'}`} />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="space-y-3 opacity-[0.08]">
                {[100, 70, 85, 55, 75].map((w, i) => (
                  <div key={i} className="h-2 rounded-full bg-[var(--tx)]" style={{ width: w }} />
                ))}
              </div>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 md:inset-y-0 md:inset-x-auto md:right-0 md:w-1 h-1 md:h-auto"
               style={{ background: 'var(--ac)' }} />
        </div>

        {/* Content */}
        <div className="p-7 flex flex-col gap-4">
          <div>
            <span className="eyebrow text-[10px] mb-3 block">Featured Project</span>
            <h3 className="font-extrabold text-[var(--tx)] text-2xl mb-2">{title}</h3>
            {stats && (
              <div className="flex flex-wrap gap-2 mb-3">
                {stats.map(s => (
                  <span key={s} className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                        style={{ background: 'var(--ac-dim)', color: 'var(--ac)' }}>
                    {s}
                  </span>
                ))}
              </div>
            )}
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

          <div className="mt-auto flex items-center gap-3 pt-4 border-t border-[var(--border)]">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer"
                 className="btn btn-primary text-sm">
                Live Demo <ExternalLink size={13} />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer"
                 aria-label={`${title} source code`}
                 className="w-9 h-9 rounded-lg flex items-center justify-center border border-[var(--border)]
                            bg-[var(--bg-3)] text-[var(--tx-3)] hover:text-[var(--ac)] hover:border-[var(--ac)]
                            transition-all duration-200">
                <GithubIcon size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
