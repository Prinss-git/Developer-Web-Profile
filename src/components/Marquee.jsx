const ITEMS = [
  'Full-Stack Developer',
  'Cebu, Philippines',
  'Open to Work',
  'React',
  'Node.js',
  'MySQL',
  'Tailwind CSS',
  'IT Student',
]

const text = ITEMS.join(' · ') + ' · '

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-[var(--border)] py-3 bg-[var(--bg)]"
         aria-hidden="true">
      <div className="marquee-inner flex whitespace-nowrap select-none">
        {[0, 1, 2, 3].map(i => (
          <span key={i}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--tx-3)] shrink-0 px-6">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
