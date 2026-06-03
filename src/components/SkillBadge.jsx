export default function SkillBadge({ name, primary = false }) {
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium
                     border transition-colors duration-150 cursor-default
                     ${primary
                       ? 'bg-[var(--ac-dim)] border-[var(--ac)]/30 text-[var(--tx)] hover:border-[var(--ac)]/60'
                       : 'bg-[var(--bg-3)] border-[var(--border)] text-[var(--tx-2)] hover:border-[var(--border-2)] hover:text-[var(--tx)]'
                     }`}>
      {name}
    </span>
  )
}
