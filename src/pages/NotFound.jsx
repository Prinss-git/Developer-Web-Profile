export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ac)] mb-4">404</p>
      <h1 className="font-extrabold text-[var(--tx)] mb-3"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
        Page not found.
      </h1>
      <p className="text-[var(--tx-3)] text-sm mb-8 max-w-xs">
        This URL doesn't exist. You might have followed a broken link.
      </p>
      <a href="/"
         className="btn btn-primary">
        Back to portfolio
      </a>
    </div>
  )
}
