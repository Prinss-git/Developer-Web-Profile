import { ExternalLink, Lock, ScanEye } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import ScreenFrame from './ScreenFrame'

export default function FeaturedProjectCard({ project }) {
  const { title, label, description, stack, github, live, image, demo, stats } = project

  return (
    <article className="card overflow-hidden" aria-label={`Featured project: ${title}`}>

      {/* Full screenshot */}
      <div className="p-3 sm:p-5 pb-0 sm:pb-0">
        <ScreenFrame image={image} title={title} live={live}
          placeholder={
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--tx-3)]" aria-hidden="true">
              <ScanEye size={44} strokeWidth={1.4} className="text-[var(--ac)]" />
              <span className="text-xs font-medium uppercase tracking-[0.15em]">Screenshot coming soon</span>
            </div>
          } />
      </div>

      {/* Details */}
      <div className="grid lg:grid-cols-[1.45fr_1fr] gap-x-10 gap-y-5 p-6 sm:p-7">
        <div>
          <span className="eyebrow text-[10px] mb-3 block">{label || 'Featured Project'}</span>
          <h3 className="font-extrabold text-[var(--tx)] text-2xl mb-3">{title}</h3>
          <p className="text-sm text-[var(--tx-2)] leading-relaxed">{description}</p>
        </div>

        <div className="flex flex-col gap-4 lg:pt-1">
          {stats && (
            <div className="flex flex-wrap gap-2">
              {stats.map(s => (
                <span key={s} className="text-[11px] font-bold px-2.5 py-1 rounded-md"
                      style={{ background: 'var(--ac-dim)', color: 'var(--ac)' }}>
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {stack.map(tech => (
              <span key={tech} className="tech-tag">{tech}</span>
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
            {github && !live && (
              <a href={github} target="_blank" rel="noopener noreferrer"
                 className="btn btn-primary text-sm">
                <GithubIcon size={14} /> View on GitHub
              </a>
            )}
            {github && live && (
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
