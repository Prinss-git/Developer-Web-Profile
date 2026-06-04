import { useState, useEffect } from 'react'

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('visible')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('fading'), 1200)
    const t2 = setTimeout(() => { setPhase('done'); onDone?.() }, 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--bg)]
                    transition-opacity duration-500 ${phase === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="text-center select-none">
        <p className="loader-text font-extrabold text-[var(--tx)]"
           style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
          PP
        </p>
        <div className="loader-bar mt-3 h-0.5 mx-auto rounded-full" style={{ background: 'var(--ac)' }} />
      </div>
    </div>
  )
}
