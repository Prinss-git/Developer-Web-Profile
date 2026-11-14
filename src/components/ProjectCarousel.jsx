import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

const AUTOPLAY_MS = 3200

const SIDE_SCALE = 0.86
const GAP = 28 // px between the front card and a side card when there's room

// Where a card sits relative to the front card: -1 left, 0 front, 1 right.
// `spread` is how far (px) a side card's centre sits from the front card's.
// Anything further away waits hidden just beyond the side cards.
function placement(offset, spread) {
  if (offset === 0) return { x: 0, scale: 1, opacity: 1, z: 30, blur: 0 }
  if (Math.abs(offset) === 1) return { x: offset * spread, scale: SIDE_SCALE, opacity: 0.6, z: 20, blur: 0 }
  return { x: Math.sign(offset) * spread * 1.35, scale: 0.74, opacity: 0, z: 10, blur: 2 }
}

function ProjectCard({ project, offset, spread, onSelect }) {
  const { title, tag, summary, stack, live, github, image, demo } = project
  const front = offset === 0
  const p = placement(offset, spread)

  return (
    <article
      aria-hidden={!front}
      onClick={front ? undefined : onSelect}
      className={`[grid-area:1/1] w-[min(86vw,420px)] rounded-[22px] p-3.5 pb-4
                  bg-[var(--bg-2)] border border-[var(--border-2)]
                  transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(.22,.68,0,1)]
                  ${front ? 'shadow-[0_30px_70px_-25px_rgba(0,0,0,0.6)]' : 'cursor-pointer'}
                  ${Math.abs(offset) > 1 ? 'pointer-events-none' : ''}`}
      style={{
        transform: `translateX(${p.x}px) scale(${p.scale})`,
        opacity: p.opacity,
        zIndex: p.z,
        filter: p.blur ? `blur(${p.blur}px) saturate(0.8)` : 'none',
      }}>

      {/* Full, uncropped screenshot */}
      <div className="rounded-[14px] overflow-hidden bg-black ring-1 ring-[var(--border)]">
        <img src={image} alt={`${title} screenshot`} loading="lazy" width="1919" height="948"
             className="block w-full aspect-[1919/948] object-contain" />
      </div>

      <div className="px-1.5 pt-4">
        <h3 className="text-[1.3rem] font-bold leading-tight tracking-[-0.01em] text-[var(--tx)]">{title}</h3>
        {tag && <p className="mt-1 text-[0.8rem] font-medium text-[var(--ac)]">{tag}</p>}
        <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--tx-2)]">{summary}</p>
        <p className="mt-3 font-mono text-[11px] text-[var(--tx-3)]">
          {stack.slice(0, 4).join(' · ')}
          {demo && <><br />demo: {demo.email} · {demo.password}</>}
        </p>

        <div className="mt-4 flex items-center gap-2">
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" tabIndex={front ? 0 : -1}
               className="btn btn-primary flex-1 justify-center py-3 text-sm">
              Open live demo <ArrowUpRight size={15} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" tabIndex={front ? 0 : -1}
               aria-label={`${title} source code`}
               className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center border border-[var(--border-2)]
                          text-[var(--tx-2)] hover:text-[var(--ac)] hover:border-[var(--ac)] transition-colors">
              <GithubIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ProjectCarousel({ projects }) {
  const n = projects.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [spread, setSpread] = useState(240)
  const touchX = useRef(null)
  const deckRef = useRef(null)

  // Push side cards out until they clear the front card, but never past the
  // edge of the deck. Wide screens show all three cards in full.
  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    const measure = () => {
      const card = deck.querySelector('article')
      if (!card) return
      const w = card.offsetWidth
      const clear = w / 2 + (w * SIDE_SCALE) / 2 + GAP
      const fit = deck.clientWidth / 2 - (w * SIDE_SCALE) / 2 - 12
      setSpread(Math.max(w * 0.45, Math.min(clear, fit)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(deck)
    return () => ro.disconnect()
  }, [])

  const go = useCallback(step => setActive(a => (a + step + n) % n), [n])

  // Auto-advance like the reference; pause on hover/focus and for reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [paused, go])

  // Shortest signed distance around the loop, so cards wrap both ways.
  const offsetOf = i => {
    let d = i - active
    if (d > n / 2) d -= n
    if (d < -n / 2) d += n
    return d
  }

  const onKeyDown = e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); go(-1) }
  }

  const arrow = 'w-11 h-11 rounded-full flex items-center justify-center border border-[var(--border-2)] bg-[var(--bg-2)] ' +
                'text-[var(--tx-2)] hover:text-[var(--ac)] hover:border-[var(--ac)] transition-colors'

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects"
         onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
         onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>

      <div ref={deckRef} tabIndex={0} onKeyDown={onKeyDown}
           onTouchStart={e => { touchX.current = e.touches[0].clientX }}
           onTouchEnd={e => {
             if (touchX.current == null) return
             const dx = e.changedTouches[0].clientX - touchX.current
             if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
             touchX.current = null
           }}
           aria-label="Use the left and right arrow keys to browse projects"
           className="grid place-items-center py-6 focus-visible:outline-none">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} offset={offsetOf(i)} spread={spread} onSelect={() => setActive(i)} />
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Project {active + 1} of {n}: {projects[active].title}
      </p>

      <div className="mt-6 flex items-center justify-center gap-5">
        <button className={arrow} onClick={() => go(-1)} aria-label="Previous project"><ArrowLeft size={18} /></button>
        <div className="flex gap-2" role="tablist" aria-label="Choose a project">
          {projects.map((p, i) => (
            <button key={p.id} role="tab" aria-selected={i === active} aria-label={p.title}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300
                                ${i === active ? 'w-7 bg-[var(--ac)]' : 'w-2 bg-[var(--border-2)] hover:bg-[var(--tx-3)]'}`} />
          ))}
        </div>
        <button className={arrow} onClick={() => go(1)} aria-label="Next project"><ArrowRight size={18} /></button>
      </div>
    </div>
  )
}
