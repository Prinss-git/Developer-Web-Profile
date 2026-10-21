import { useState, useEffect } from 'react'

const SHORTCUTS = [
  { key: 'G', label: 'GitHub',   action: () => window.open('https://github.com/Prinss-git', '_blank') },
  { key: 'L', label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/', '_blank') },
  { key: 'E', label: 'Email',    action: () => { window.location.href = 'mailto:princechristianparnada@gmail.com' } },
  { key: 'R', label: 'Résumé',   action: () => window.open('/resume.pdf', '_blank') },
]

function Key({ children, lit }) {
  return (
    <kbd className={`typed !mt-0 inline-flex min-w-[1.6rem] justify-center px-1.5 py-0.5 text-[0.75rem] font-bold border transition-colors duration-150
      ${lit ? 'bg-[var(--stamp)] border-[var(--stamp)] text-[var(--on-stamp)]' : 'border-[var(--rule)] text-[var(--rule)]'}`}>
      {children}
    </kbd>
  )
}

export default function KeyboardNav() {
  const [show, setShow] = useState(false)
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    const handler = e => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.metaKey || e.ctrlKey || e.altKey) return

      if (e.key === '?') { setShow(s => !s); return }
      if (e.key === 'Escape') { setShow(false); return }

      const shortcut = SHORTCUTS.find(s => s.key.toLowerCase() === e.key.toLowerCase())
      if (shortcut) {
        setFlash(shortcut.key)
        setTimeout(() => setFlash(null), 400)
        shortcut.action()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        onClick={() => setShow(s => !s)}
        className="fixed bottom-5 right-5 z-50 max-md:!hidden icon-btn !w-9 !h-9 bg-[var(--paper)] typed !mt-0 font-bold"
        aria-label="Keyboard shortcuts"
        aria-expanded={show}>
        ?
      </button>

      {show && (
        <div className="fixed bottom-16 right-5 z-50 w-56 bg-[var(--paper)] border-[1.5px] border-[var(--rule)]"
             style={{ boxShadow: 'var(--photo-shadow)' }}
             role="dialog" aria-label="Keyboard shortcuts">
          <p className="bar !py-1.5 !text-[0.7rem] font-bold uppercase tracking-[0.09em]">Shortcuts</p>
          <ul className="px-3 py-2">
            {SHORTCUTS.map(({ key, label }) => (
              <li key={key} className="flex items-center justify-between py-1.5 border-b border-[var(--rule-soft)]">
                <span className="text-[0.85rem]">{label}</span>
                <Key lit={flash === key}>{key}</Key>
              </li>
            ))}
            <li className="flex items-center justify-between py-1.5">
              <span className="text-[0.85rem]">Toggle this</span>
              <Key>?</Key>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
