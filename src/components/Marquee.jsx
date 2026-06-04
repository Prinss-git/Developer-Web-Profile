const ITEMS = [
  'Full-Stack Developer',
  'Built MotoTrack for a real business',
  'Cebu, Philippines',
  'Open to Internships',
  'React · Node.js · MySQL',
  'IT Student — 3rd Year',
]

export default function Marquee() {
  return (
    <div className="marquee-wrap overflow-hidden border-y border-[var(--border)] py-3 bg-[var(--bg)]"
         aria-hidden="true">
      <div className="marquee-inner flex whitespace-nowrap select-none">
        {[0, 1, 2, 3].map(i => (
          <span key={i} className="flex items-center shrink-0">
            {ITEMS.map((item, j) => (
              <span key={j} className="flex items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tx-3)] px-5">
                  {item}
                </span>
                <span className="text-[6px]" style={{ color: 'var(--ac)' }}>◆</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
