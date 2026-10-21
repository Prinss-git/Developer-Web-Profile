import { useState } from 'react'
import { ArrowUpRight, Copy, Check, Lock } from 'lucide-react'
import { projects } from '../data/projects'
import { Field, Stamp } from '../components/Record'
import { GithubIcon } from '../components/SocialIcons'

const no = id => String(id).padStart(3, '0')

function CopyLine({ label, value }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch { /* clipboard blocked: the value is still selectable */ }
  }
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <div className="min-w-0">
        <span className="field-label">{label}</span>
        <span className="typed block !mt-0 truncate select-all">{value}</span>
      </div>
      <button type="button" onClick={copy}
              className="icon-btn !w-8 !h-8 shrink-0"
              aria-label={done ? `${label} copied` : `Copy ${label.toLowerCase()}`}>
        {done ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  )
}

function Exhibit({ project, letter }) {
  const [on, setOn] = useState(null)
  const { notes = [] } = project
  return (
    <figure>
      <div className="flex items-baseline justify-between mb-2">
        <span className="field-label">Exhibit {letter} · {project.title} dashboard</span>
        <span className="typed !mt-0 text-[0.8rem] text-[var(--ink-3)]">screenshot</span>
      </div>
      <div className="exhibit">
        <img src={project.image} alt={`${project.title} dashboard: today's performance, product counts, monthly sales trend and inventory status`}
             width="1919" height="948" loading="lazy" />
        {notes.map((n, i) => (
          <span key={i}
                className={`callout ${on === i ? 'on' : ''}`}
                style={{ left: `${n.x}%`, top: `${n.y}%`, '--delay': `${i * 90}ms` }}
                onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)}
                aria-hidden="true">
            {i + 1}
          </span>
        ))}
      </div>
      {notes.length > 0 && (
        <figcaption className="mt-4">
          <span className="field-label">Reviewer’s notes</span>
          <ol className="mt-1.5 grid sm:grid-cols-2 gap-x-4">
            {notes.map((n, i) => (
              <li key={i} className={`note ${on === i ? 'on' : ''}`}
                  onMouseEnter={() => setOn(i)} onMouseLeave={() => setOn(null)}>
                <span className="note-n" aria-hidden="true">{i + 1}</span>
                <span className="text-[0.92rem] leading-snug">{n.text}</span>
              </li>
            ))}
          </ol>
        </figcaption>
      )}
    </figure>
  )
}

function SourceStamp({ project, tilt, delay }) {
  if (project.github) return null
  return <Stamp tone="blue" tilt={tilt} size="0.82rem" delay={delay} sub="on request">Private source</Stamp>
}

function FeaturedEntry({ project }) {
  const { id, title, description, stack, github, live, demo, stats, client } = project
  return (
    <article className="sheet" aria-labelledby={`entry-${id}`}>
      <div className="cells grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">

        <div className="cells !border-0 grid-cols-1 content-start">
          <div className="field relative !pb-6 [container-type:inline-size]">
            <span className="field-label">Entry No.</span>
            <span className="display block mt-1 text-[clamp(1.1rem,2vw,1.4rem)] text-[var(--ink-3)]">{no(id)}</span>
            <h3 id={`entry-${id}`} className="display text-[min(4.4rem,11.5cqi)] mt-2 sm:mt-5">{title}</h3>
            <div className="mt-4 sm:mt-0 sm:absolute sm:right-5 sm:top-4">
              <Stamp sub="1 real client" tilt={7} size="clamp(0.9rem,1.6vw,1.1rem)">Live in production</Stamp>
            </div>
          </div>

          {client && <Field label="Built for">{client}</Field>}

          <div className="field">
            <span className="field-label">Scope of work</span>
            <p className="mt-2 text-[0.98rem] leading-relaxed text-[var(--ink-2)] max-w-[60ch]">{description}</p>
          </div>

          <Field label="Stack">{stack.join(' / ')}</Field>

          {stats && (
            <div className="cells !border-0 grid-cols-2">
              {stats.slice(0, 2).map((s, i) => {
                const [num, ...rest] = s.split(' ')
                return (
                  <div key={s} className="field">
                    <span className="field-label">{i === 0 ? 'Records' : 'Catalogue'}</span>
                    <span className="block mt-1 font-extrabold text-[1.7rem] leading-none tabular-nums" style={{ fontVariationSettings: "'wdth' 112" }}>{num}</span>
                    <span className="typed block !mt-1 text-[0.85rem] text-[var(--ink-2)]">{rest.join(' ')}</span>
                  </div>
                )
              })}
            </div>
          )}

          {demo && (
            <div className="field !pt-0 !pb-4">
              <div className="perf -mx-[0.85rem] mb-3" aria-hidden="true" />
              <div className="flex items-baseline justify-between">
                <span className="field-label">Access slip · demo login</span>
                <Stamp tone="blue" tilt={-3} size="0.7rem" delay={250}>Demo login</Stamp>
              </div>
              <CopyLine label="Email" value={demo.email} />
              <CopyLine label="Password" value={demo.password} />
            </div>
          )}

          <div className="field flex flex-wrap items-center gap-x-5 gap-y-2 !py-4">
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="act">
                Open live system <ArrowUpRight size={16} strokeWidth={2.4} />
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="act-line">
                <GithubIcon size={15} /> Source code
              </a>
            )}
          </div>
        </div>

        <div className="field !p-4 sm:!p-6">
          <Exhibit project={project} letter="A" />
        </div>
      </div>
    </article>
  )
}

function LedgerEntry({ project, index }) {
  const { id, title, description, stack, github, live, image } = project
  const tilts = [-5, 4, -7]
  return (
    <article className="cells !border-0 grid-cols-[3.25rem_1fr] md:grid-cols-[4.5rem_minmax(0,15rem)_minmax(0,1fr)_12.5rem]"
             aria-labelledby={`entry-${id}`}>
      <div className="field row-span-3 md:row-span-1 !px-2 text-center">
        <span className="field-label">No.</span>
        <span className="display block mt-1.5 text-[1.05rem] md:text-[1.3rem]">{no(index + 2)}</span>
      </div>

      <div className="field !p-3 md:order-none">
        {image && (
          <a href={live || undefined} target="_blank" rel="noopener noreferrer" className="block exhibit group overflow-hidden" tabIndex={-1} aria-hidden="true">
            <img src={image} alt="" loading="lazy" width="1919" height="948"
                 className="aspect-[16/9] object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
          </a>
        )}
      </div>

      <div className="field">
        <h3 id={`entry-${id}`} className="display text-[clamp(1.5rem,2.6vw,2.1rem)]">{title}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-[var(--ink-2)] max-w-[62ch]">{description}</p>
        <p className="typed text-[0.9rem]"><span className="field-label inline mr-2">Stack</span>{stack.join(' / ')}</p>
      </div>

      <div className="field relative flex flex-col justify-between gap-5 min-h-[8.5rem]">
        <div className="flex flex-wrap items-start gap-3 pt-1">
          {live && <Stamp tilt={tilts[index % 3]} size="0.95rem" delay={0}>Live</Stamp>}
          <SourceStamp project={project} tilt={-tilts[index % 3] / 2} delay={180} />
          {project.privateRepo && <span className="sr-only">Source code is private.</span>}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="act !py-2.5 !px-3.5 !text-[0.8rem]"
               aria-label={`Open ${title} live`}>
              Open live <ArrowUpRight size={14} strokeWidth={2.4} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={`${title} source code`}>
              <GithubIcon size={15} />
            </a>
          )}
          {!github && project.privateRepo && <Lock size={14} className="text-[var(--ink-3)]" aria-hidden="true" />}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [featured, ...rest] = projects
  const live = projects.filter(p => p.live).length

  return (
    <section id="projects" className="pb-16 lg:pb-24" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="bar">
          <h2 id="projects-title">Entries · shipped work</h2>
          <p>{projects.length} entries, {live} live. Every one opens.</p>
        </div>

        <div className="mt-6">
          {featured && <FeaturedEntry project={featured} />}
        </div>

        {rest.length > 0 && (
          <div className="sheet mt-8">
            <div className="cells !border-0 grid-cols-1">
              {rest.map((p, i) => <LedgerEntry key={p.id} project={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
