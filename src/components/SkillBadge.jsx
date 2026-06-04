export default function SkillBadge({ name, context, primary = false }) {
  return (
    <div className="relative group/badge">
      <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium
                       border transition-all duration-150 cursor-default
                       hover:-translate-y-0.5
                       ${primary
                         ? 'bg-[var(--ac-dim)] border-[var(--ac)]/30 text-[var(--tx)] hover:border-[var(--ac)]/60'
                         : 'bg-[var(--bg-3)] border-[var(--border)] text-[var(--tx-2)] hover:border-[var(--border-2)] hover:text-[var(--tx)]'
                       }`}>
        {name}
      </span>
      {context && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5
                        text-[10px] leading-snug bg-[var(--bg-4)] border border-[var(--border-2)]
                        rounded-lg whitespace-nowrap text-[var(--tx-2)] shadow-lg
                        opacity-0 group-hover/badge:opacity-100 pointer-events-none
                        transition-opacity duration-150 z-20">
          {context}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent"
               style={{ borderTopColor: 'var(--border-2)' }} />
        </div>
      )}
    </div>
  )
}
