import { useState } from 'react'

// A project screenshot shown uncropped inside a minimal browser window.
export default function ScreenFrame({ image, title, live, width = 1919, height = 948, placeholder }) {
  const [loaded, setLoaded] = useState(false)
  const host = live ? new URL(live).host : null

  return (
    <div className="rounded-xl overflow-hidden border border-[var(--border-2)] bg-[var(--bg-3)] shadow-[var(--shadow)]">
      <div className="flex items-center gap-3 px-3.5 h-8 border-b border-[var(--border)] bg-[var(--bg-4)]" aria-hidden="true">
        <span className="flex gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-2)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-2)]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-2)]" />
        </span>
        {host && (
          <span className="min-w-0 truncate font-mono text-[11px] text-[var(--tx-3)] px-2.5 py-0.5 rounded-md bg-[var(--bg-3)]">
            {host}
          </span>
        )}
      </div>

      <div className="relative overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }}>
        {image ? (
          <img src={image} alt={`${title} screenshot`} loading="lazy"
               width={width} height={height}
               onLoad={() => setLoaded(true)}
               className={`absolute inset-0 w-full h-full object-contain transition-[filter,opacity] duration-700
                           ${loaded ? 'blur-0 opacity-100' : 'blur-sm opacity-60'}`} />
        ) : placeholder}
      </div>
    </div>
  )
}
