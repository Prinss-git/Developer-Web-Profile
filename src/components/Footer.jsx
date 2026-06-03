import { GithubIcon, LinkedinIcon, FacebookIcon } from './SocialIcons'

const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com/Prinss-git',                                   label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/princechristian.parnada.9',              label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer role="contentinfo">

      {/* Big CTA */}
      <div className="border-t border-[var(--border)] py-16 lg:py-24 bg-[var(--bg-2)]">
        <div className="wrap">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--tx-3)] mb-8">
            Let's work together
          </p>
          <a
            href="mailto:princechristianparnada@gmail.com"
            className="group inline-block font-extrabold leading-[0.88] tracking-tight text-[var(--tx)]
                       hover:text-[var(--ac)] transition-colors duration-300 break-all"
            style={{ fontSize: 'clamp(1rem, 3.5vw, 3.75rem)' }}>
            princechristianparnada@gmail.com
            <span className="inline-block ml-3 opacity-0 -translate-x-2
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-300 text-[var(--ac)]">↗</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)] py-6 bg-[var(--bg-2)]">
        <div className="wrap grid grid-cols-3 items-center gap-4">
          <p className="text-xs text-[var(--tx-3)]">
            © {new Date().getFullYear()} Prince Christian Parnada
          </p>
          <p className="text-xs text-[var(--tx-3)] text-center font-medium">Let's work together</p>
          <div className="flex items-center gap-2 justify-end">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                 className="w-8 h-8 rounded-lg flex items-center justify-center border border-[var(--border)]
                            text-[var(--tx-3)] hover:text-[var(--ac)] hover:border-[var(--ac)]
                            transition-all duration-200">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
