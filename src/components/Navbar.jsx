import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { useScrollSpy } from '../hooks/useScrollSpy'

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]
const IDS = LINKS.map(l => l.href.slice(1))

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const activeId = useScrollSpy(IDS)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const nav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-200
      ${scrolled ? 'bg-[var(--bg)] border-b border-[var(--border)]' : 'bg-transparent'}`}>
      <nav className="wrap h-[64px] flex items-center justify-between" aria-label="Main navigation">

        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-bold text-[var(--tx)] text-sm tracking-tight"
          aria-label="Go to top">
          Prince Parnada
        </a>

        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {LINKS.map(({ label, href }) => {
            const active = activeId === href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={e => nav(e, href)}
                  aria-current={active ? 'location' : undefined}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-150
                    ${active ? 'text-[var(--ac)]' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'}`}>
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center
                       text-[var(--tx-2)] hover:text-[var(--tx)] transition-colors"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}>
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--bg)] border-b border-[var(--border)]">
          <ul className="wrap py-3 flex flex-col gap-0.5">
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={e => nav(e, href)}
                   className="block px-3 py-2.5 rounded-lg text-sm text-[var(--tx-2)]
                              hover:text-[var(--tx)] transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
