export default function SkillBadge({ name }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium
                     bg-[var(--bg-3)] border border-[var(--border)] text-[var(--tx-2)]
                     hover:border-[var(--border-2)] hover:text-[var(--tx)]
                     transition-colors duration-150 cursor-default">
      {name}
    </span>
  )
}
