import { useState, useEffect, useRef } from 'react'
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
  const indicatorRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Move the sliding indicator pill to the active link
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return
    const activeEl = navRef.current.querySelector('[data-active="true"]')
    if (!activeEl) { indicatorRef.current.style.opacity = '0'; return }
    const { offsetLeft, offsetWidth } = activeEl
    indicatorRef.current.style.opacity  = '1'
    indicatorRef.current.style.left     = `${offsetLeft}px`
    indicatorRef.current.style.width    = `${offsetWidth}px`
  }, [activeId])

  const nav = (e, href) => {
    e.preventDefault(); setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300
        ${scrolled
          ? 'glass border-b border-[var(--glass-border)] shadow-[0_8px_32px_rgba(0,0,0,0.25)]'
          : 'bg-transparent'}`}
    >
      <nav className="wrap h-[68px] flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="font-mono font-semibold text-[var(--ac)] text-sm tracking-tight select-none"
          aria-label="Go to top"
        >
          <span className="grad-text font-bold text-base">PP</span>
          <span className="text-[var(--tx-2)] font-normal ml-2 hidden sm:inline">Prince Christian Parnada</span>
        </a>

        {/* Desktop nav with sliding pill */}
        <ul ref={navRef} className="hidden md:flex items-center gap-1 relative" role="list">
          {/* Sliding background pill */}
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute inset-y-0 my-1 rounded-lg bg-[var(--ac-dim)] transition-all duration-300 ease-out pointer-events-none"
            style={{ opacity: 0, left: 0, width: 0 }}
          />
          {LINKS.map(({ label, href }) => {
            const active = activeId === href.slice(1)
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={e => nav(e, href)}
                  data-active={active}
                  aria-current={active ? 'location' : undefined}
                  className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                    ${active ? 'text-[var(--ac)]' : 'text-[var(--tx-2)] hover:text-[var(--tx)]'}`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggleTheme} />
          <button
            className="md:hidden w-9 h-9 rounded-xl glass flex items-center justify-center
                       text-[var(--tx-2)] hover:text-[var(--ac)] transition-colors border border-[var(--glass-border)]"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass border-t border-[var(--glass-border)]">
          <ul className="wrap py-4 flex flex-col gap-1">
            {LINKS.map(({ label, href }) => (
              <li key={href}>
                <a href={href} onClick={e => nav(e, href)}
                   className="block px-4 py-2.5 rounded-xl text-sm text-[var(--tx-2)]
                              hover:text-[var(--ac)] hover:bg-[var(--ac-dim)] transition-all">
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
