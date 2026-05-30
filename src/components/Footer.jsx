import { GithubIcon, LinkedinIcon, FacebookIcon } from './SocialIcons'

const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com/Prinss-git',                                   label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/princechristian.parnada.9',              label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8" role="contentinfo">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--tx-3)]">
          © {new Date().getFullYear()} Prince Christian Parnada
        </p>
        <div className="flex items-center gap-2">
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
    </footer>
  )
}
