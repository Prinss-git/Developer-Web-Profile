export default function CTABanner() {
  return (
    <section id="contact" className="relative cta-band divider-top py-20 lg:py-24 overflow-hidden" aria-label="Call to action">
      <div className="bg-dots right-0 top-1/2 -translate-y-1/2 w-[620px] h-[620px] max-w-[90vw] !opacity-30" aria-hidden="true" />
      <div className="bg-glow -left-32 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-90" aria-hidden="true" />
      <div className="wrap relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--ac)] mb-3">
            Currently looking for
          </p>
          <h2 className="font-extrabold text-[var(--tx)] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
            An internship or<br className="hidden sm:block" /> entry-level role.
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
