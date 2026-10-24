import { useState, useEffect } from 'react'

const SHORTCUTS = [
  { key: 'G', label: 'GitHub',   action: () => window.open('https://github.com/Prinss-git', '_blank') },
  { key: 'L', label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/', '_blank') },
  { key: 'E', label: 'Email',    action: () => { window.location.href = 'mailto:princechristianparnada@gmail.com' } },
  { key: 'R', label: 'Resume',   action: () => window.open('/resume.pdf', '_blank') },
]

export default function KeyboardNav() {
  const [show, setShow] = useState(false)
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    const handler = e => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === '?') { setShow(s => !s); return }

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
      {/* ? hint button */}
      <button
        onClick={() => setShow(s => !s)}
        className="fixed bottom-5 right-5 z-50 w-8 h-8 rounded-full border border-[var(--border-2)]
                   bg-[var(--bg-3)] text-[var(--tx-3)] text-xs font-bold hover:text-[var(--ac)]
                   hover:border-[var(--ac)] transition-all duration-200 hidden md:flex items-center justify-center"
        aria-label="Keyboard shortcuts">
        ?
      </button>

      {/* Shortcuts panel */}
      {show && (
        <div className="fixed bottom-16 right-5 z-50 card p-4 w-52 shadow-lg" role="dialog" aria-label="Keyboard shortcuts">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--tx-3)] mb-3">
            Shortcuts
          </p>
          <ul className="space-y-2">
            {SHORTCUTS.map(({ key, label }) => (
              <li key={key} className="flex items-center justify-between">
                <span className="text-xs text-[var(--tx-2)]">{label}</span>
                <kbd className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border
                                transition-all duration-150
                                ${flash === key
                                  ? 'bg-[var(--ac)] border-[var(--ac)] text-white'
                                  : 'bg-[var(--bg-3)] border-[var(--border-2)] text-[var(--tx-3)]'}`}>
                  {key}
                </kbd>
              </li>
            ))}
            <li className="flex items-center justify-between pt-1 border-t border-[var(--border)]">
              <span className="text-xs text-[var(--tx-2)]">Toggle this</span>
              <kbd className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border bg-[var(--bg-3)] border-[var(--border-2)] text-[var(--tx-3)]">?</kbd>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
