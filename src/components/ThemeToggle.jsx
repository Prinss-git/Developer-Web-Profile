import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({ theme, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="w-9 h-9 rounded-xl glass flex items-center justify-center
                 border border-[var(--glass-border)] text-[var(--tx-2)]
                 hover:text-[var(--ac)] hover:border-[var(--ac)] hover:bg-[var(--ac-dim)]
                 transition-all duration-200"
    >
      {theme === 'dark' ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
    </button>
  )
}
