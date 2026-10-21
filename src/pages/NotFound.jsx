import { useEffect } from 'react'
import { InkFilter, Stamp } from '../components/Record'
import { useTheme } from '../hooks/useTheme'

export default function NotFound() {
  useTheme()
  useEffect(() => { document.title = 'No record found · Prince Parnada' }, [])

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <InkFilter />
      <div className="sheet w-full max-w-xl">
        <div className="bar"><h1 className="!text-[1.1rem]">Record request · result</h1></div>
        <div className="field !p-7 relative">
          <span className="field-label">Requested page</span>
          <p className="typed break-all">{window.location.pathname}</p>
          <p className="mt-8 display text-[clamp(2.4rem,9vw,4rem)]">No record found</p>
          <p className="mt-4 text-[var(--ink-2)] max-w-[40ch]">
            This address doesn’t match anything on file. The link may be broken or out of date.
          </p>
          <a href="/" className="act mt-8">Back to the record</a>
          <div className="absolute right-6 top-8">
            <Stamp tilt={-12} size="1.9rem" instant>Void</Stamp>
          </div>
        </div>
      </div>
    </main>
  )
}
