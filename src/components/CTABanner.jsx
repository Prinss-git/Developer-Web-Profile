export default function CTABanner() {
  return (
    <section id="contact" className="py-20 bg-[var(--bg-3)] border-y border-[var(--border)]" aria-label="Call to action">
      <div className="wrap flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ac)] mb-3">
            Currently looking for
          </p>
          <h2 className="font-extrabold text-[var(--tx)] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            An internship or entry-level role<br className="hidden sm:block" /> starting 2026.
          </h2>
        </div>
        <a
          href="mailto:princechristianparnada@gmail.com"
          className="btn btn-primary shrink-0 text-base px-6 py-3 group">
          Let's talk
          <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  )
}
