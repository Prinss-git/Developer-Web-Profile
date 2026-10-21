import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useScrollSpy } from '../hooks/useScrollSpy'

const LINKS = [
  { label: 'Entries',   href: '#projects' },
  { label: 'Statement', href: '#about' },
  { label: 'Education', href: '#experience' },
  { label: 'Subjects',  href: '#skills' },
  { label: 'Request',   href: '#contact' },
]
const IDS = LINKS.map(l => l.href.slice(1))

export default function Navbar({ theme, toggleTheme }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen]     = useState(false)
  const activeId            = useScrollSpy(IDS)
  const lastY               = useRef(0)

  useEffect(() => {
    const fn = () => {
      const y = window.scrollY
      if (!open) setHidden(y > lastY.current && y > 120)
      lastY.current = y
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [open])

  const nav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-[var(--paper)] border-b border-[var(--rule)]
      transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <nav className="wrap h-[60px] flex items-center justify-between gap-4" aria-label="Main navigation">

        <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
           className="flex items-center gap-2.5 no-underline shrink-0">
          <span className="w-9 h-9 flex items-center justify-center border-[1.5px] border-[var(--rule)] text-[var(--rule)]
                           font-extrabold text-[0.85rem]" style={{ fontVariationSettings: "'wdth' 125" }} aria-hidden="true">
            PP
          </span>
          <span className="leading-tight hidden min-[420px]:block">
            <span className="block text-[0.9rem] font-bold" style={{ fontVariationSettings: "'wdth' 110" }}>Prince Parnada</span>
            <span className="hidden sm:block field-label">Record of shipped work</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-stretch h-full" role="list">
          {LINKS.map(({ label, href }) => {
            const active = activeId === href.slice(1)
            return (
              <li key={href} className="flex">
                <a href={href} onClick={e => nav(e, href)}
                   aria-current={active ? 'location' : undefined}
                   className={`relative flex items-center px-4 text-[0.78rem] font-semibold uppercase tracking-[0.08em] no-underline
                     border-l border-[var(--rule-soft)] last:border-r transition-colors duration-150
                     ${active ? 'bg-[var(--paper-2)] text-[var(--ink)]' : 'text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--paper-2)]'}`}
                   style={{ fontVariationSettings: "'wdth' 88" }}>
                  {label}
                  {active && <span className="absolute inset-x-0 -bottom-px h-[3px] bg-[var(--stamp)]" aria-hidden="true" />}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            className="lg:hidden icon-btn"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-[var(--rule)] bg-[var(--paper)]">
          <ul className="wrap py-2" role="list">
            {LINKS.map(({ label, href }, i) => (
              <li key={href} className="border-b border-[var(--rule-soft)] last:border-0">
                <a href={href} onClick={e => nav(e, href)}
                   className="flex items-baseline gap-4 py-3.5 no-underline">
                  <span className="typed text-[var(--ink-3)] text-sm" style={{ marginTop: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-bold uppercase" style={{ fontVariationSettings: "'wdth' 110" }}>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
