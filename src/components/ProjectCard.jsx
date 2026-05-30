import { ExternalLink } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

const TECH_COLOR = {
  React: '#61dafb', TypeScript: '#3178c6', JavaScript: '#f7df1e',
  'Next.js': '#aaaaaa', Go: '#00add8', Python: '#3776ab',
  'Node.js': '#339933', GraphQL: '#e535ab', Docker: '#2496ed',
  Redis: '#dc382d', PostgreSQL: '#336791', Rust: '#ce422b',
  default: 'var(--ac)',
}

export default function ProjectCard({ project }) {
  const { title, description, stack, github, live, image, demo } = project
  return (
    <article className="card group flex flex-col h-full overflow-hidden" aria-label={`Project: ${title}`}>
      <div className="relative h-44 overflow-hidden rounded-t-[20px]"
           style={{ background: 'linear-gradient(135deg, var(--bg-3), var(--bg-4))' }}>
        {image
          ? <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          : (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="space-y-2 opacity-20">
                {[70,45,60,35,55].map((w,i) => (
                  <div key={i} className="h-1.5 rounded-full" style={{ width: w, background: 'var(--grad)' }} />
                ))}
              </div>
            </div>
          )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--bg-2)] to-transparent" />
        <div className="absolute inset-x-0 top-0 h-[2px]" style={{ background: 'var(--grad)' }} />
      </div>
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div>
          <h3 className="font-bold text-[var(--tx)] text-base leading-snug mb-2">{title}</h3>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed line-clamp-2">{description}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {stack.map(tech => (
            <span key={tech}
              className="text-[11px] px-2.5 py-0.5 rounded-full font-mono font-medium bg-[var(--glass)] border border-[var(--glass-border)]"
              style={{ color: TECH_COLOR[tech] || TECH_COLOR.default }}>
              {tech}
            </span>
          ))}
        </div>
        {demo && (
          <div className="text-[11px] font-mono px-3 py-2 rounded-lg bg-[var(--glass)] border border-[var(--glass-border)] text-[var(--tx-2)] space-y-0.5">
            <div><span className="text-[var(--tx-3)]">email</span> {demo.email}</div>
            <div><span className="text-[var(--tx-3)]">pass </span> {demo.password}</div>
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--glass-border)]">
          {live ? (
            <a href={live} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}
               className="btn btn-primary text-xs py-2 px-4 rounded-lg">
              Live Demo <ExternalLink size={12} />
            </a>
          ) : (
            <span className="text-xs text-[var(--tx-3)] italic">In progress</span>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} source`}
               className="w-8 h-8 rounded-lg glass flex items-center justify-center border border-[var(--glass-border)] text-[var(--tx-3)] hover:text-[var(--ac)] hover:border-[var(--ac)] transition-all">
              <GithubIcon size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
