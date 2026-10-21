// Shared pieces of the record: ink filter, stamps, fields, guilloché rosette.

export function InkFilter() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        {/* Rubber-stamp ink: a slight warp at the edges, then speckled holes
            where the stamp did not take. */}
        <filter id="ink" x="-6%" y="-10%" width="112%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="7" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="warped" />
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="grain" />
          <feColorMatrix in="grain" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.6 0 0 0 2.75" result="holes" />
          <feComposite in="warped" in2="holes" operator="in" />
        </filter>
      </defs>
    </svg>
  )
}

// `instant` strikes on mount, for stamps that appear after the page loads.
export function Stamp({ children, sub, tilt = -6, size = '1rem', delay = 0, tone, instant = false, className = '' }) {
  return (
    <span
      className={`stamp ${tone === 'blue' ? 'stamp-blue' : ''} ${instant ? 'struck' : ''} ${className}`}
      style={{ '--tilt': `${tilt}deg`, '--delay': `${delay}ms`, fontSize: size }}
      aria-hidden="true">
      {children}
      {sub && <small>{sub}</small>}
    </span>
  )
}

export function Field({ label, children, typed = true, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`field ${className}`}>
      <span className="field-label">{label}</span>
      {typed ? <div className="typed">{children}</div> : children}
    </Tag>
  )
}

export function Tick({ children, checked = true }) {
  return (
    <span className="tick">
      <span className="tick-box" aria-hidden="true">
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        )}
      </span>
      <span className="typed" style={{ marginTop: 0 }}>{children}</span>
      {checked && <span className="sr-only">(checked)</span>}
    </span>
  )
}

// Hypotrochoid rosettes, the engraved pattern on certificates and banknotes.
function rosette(R, r, d, steps = 1400) {
  const k = (R - r) / r
  const turns = r / gcd(R, r)
  let p = ''
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2 * turns
    const x = (R - r) * Math.cos(t) + d * Math.cos(k * t)
    const y = (R - r) * Math.sin(t) - d * Math.sin(k * t)
    p += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`
  }
  return p
}
function gcd(a, b) { return b ? gcd(b, a % b) : a }

const ROSETTES = [
  rosette(96, 36, 62),
  rosette(96, 40, 30),
  rosette(70, 26, 48),
]

export function Rosette({ className = '', style }) {
  return (
    <svg viewBox="-170 -170 340 340" className={className} style={style} aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--guil)" strokeWidth="0.7">
        {ROSETTES.map((d, i) => <path key={i} d={d} />)}
        <circle r="164" strokeWidth="1" />
        <circle r="158" />
      </g>
    </svg>
  )
}
