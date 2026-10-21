import { experience } from '../data/experience'

// One unbroken ruler from the first school year to the end of the
// internship year, with the present marked on it.
const START = 2021
const now = new Date()
const NOW = now.getFullYear() + now.getMonth() / 12
const END = Math.max(2027, Math.ceil(NOW + 0.25))
const SPAN = END - START
const pct = y => `${((y - START) / SPAN) * 100}%`

function parsePeriod(period) {
  const [a, b] = period.split(/\s*[–-]\s*/)
  const from = parseInt(a, 10)
  const to = /present/i.test(b) ? NOW : parseInt(b, 10)
  return { from, to, open: /present/i.test(b) }
}

const RANGES = [...experience].reverse().map(e => ({ ...parsePeriod(e.period), label: e.company, role: e.role }))
const YEARS = Array.from({ length: SPAN + 1 }, (_, i) => START + i)
const MONTHS = Array.from({ length: SPAN * 12 + 1 }, (_, i) => START + i / 12)
const NEAR_END = (NOW - START) / SPAN > 0.7
const NOW_LABEL =now.toLocaleDateString('en-PH', { month: 'short', year: 'numeric' })

export default function Timeline() {
  return (
    <figure className="field !py-6" aria-label={`Timeline from ${START} to ${END}`}>
      <figcaption className="field-label mb-5">Timeline</figcaption>

      <div className="relative mx-1 sm:mx-3">
        {/* ranges */}
        <div className="relative h-[4.6rem] sm:h-[3.8rem]">
          {RANGES.map((r, i) => (
            <div key={r.label} className="absolute" style={{ left: pct(r.from), width: `calc(${pct(r.to)} - ${pct(r.from)})`, top: `${i * 2.3}rem` }}>
              <div className={`h-2 ${r.open ? 'bg-[var(--rule)]' : 'bg-[var(--rule)] opacity-60'}`}
                   style={r.open ? { maskImage: 'linear-gradient(90deg,#000 85%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,#000 85%,transparent)' } : undefined} />
              <p className="mt-1 text-[0.72rem] sm:text-[0.78rem] font-semibold leading-tight whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 85" }}>
                {r.label}
              </p>
            </div>
          ))}
        </div>

        {/* ruler */}
        <div className="relative h-7 border-t-[1.5px] border-[var(--rule)] mt-2">
          {MONTHS.map((m, i) => (
            <span key={i} className="absolute top-0 w-px bg-[var(--rule)]"
                  style={{ left: pct(m), height: i % 12 === 0 ? '0.9rem' : i % 6 === 0 ? '0.5rem' : '0.3rem', opacity: i % 12 === 0 ? 1 : 0.55 }}
                  aria-hidden="true" />
          ))}
          {YEARS.map((y, i) => (
            <span key={y} className={`absolute top-[0.95rem] typed !mt-0 text-[0.72rem] sm:text-[0.8rem] -translate-x-1/2 ${i === 0 ? '!translate-x-0' : ''} ${i === YEARS.length - 1 ? '!-translate-x-full' : ''}`}
                  style={{ left: pct(y) }}>
              {y}
            </span>
          ))}
        </div>

        {/* now */}
        <div className="absolute top-[-0.6rem] bottom-[1.6rem] w-0 border-l-2 border-[var(--stamp)]" style={{ left: pct(NOW) }} aria-hidden="true">
          <span className={`absolute -top-[1.1rem] ${NEAR_END ? 'right-1' : 'left-1'} whitespace-nowrap text-[0.66rem] font-bold uppercase tracking-[0.09em] text-[var(--stamp)]`}
                style={{ fontVariationSettings: "'wdth' 80" }}>
            Now · {NOW_LABEL}
          </span>
        </div>
      </div>
      <p className="sr-only">
        {RANGES.map(r => `${r.label}, ${r.role}: ${r.from} to ${r.open ? 'present' : r.to}.`).join(' ')}
      </p>
    </figure>
  )
}
