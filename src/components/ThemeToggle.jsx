// The theme switch reads as the two copies of the record.
export default function ThemeToggle({ theme, toggle }) {
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Carbon copy (dark theme)"
      onClick={toggle}
      className="group flex items-stretch border border-[var(--rule)] text-[0.66rem] font-semibold uppercase tracking-[0.09em]"
      style={{ fontVariationSettings: "'wdth' 80" }}>
      <span className={`px-2.5 py-1.5 transition-colors ${!dark ? 'bg-[var(--rule)] text-[var(--on-rule)]' : 'text-[var(--rule)] group-hover:bg-[var(--paper-2)]'}`}>
        Original
      </span>
      <span className={`px-2.5 py-1.5 border-l border-[var(--rule)] transition-colors ${dark ? 'bg-[var(--rule)] text-[var(--on-rule)]' : 'text-[var(--rule)] group-hover:bg-[var(--paper-2)]'}`}>
        Carbon<span className="hidden sm:inline"> copy</span>
      </span>
    </button>
  )
}
