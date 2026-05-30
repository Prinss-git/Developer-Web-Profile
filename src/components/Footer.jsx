import { GithubIcon, LinkedinIcon, TwitterXIcon } from './SocialIcons'

const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com',   label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: TwitterXIcon, href: 'https://twitter.com',  label: 'Twitter' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--glass-border)] py-8 glass" role="contentinfo">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--tx-3)] font-mono">
          © {new Date().getFullYear()} Prince Parnada — crafted with React + Vite
        </p>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
               className="w-8 h-8 rounded-lg glass flex items-center justify-center
                          border border-[var(--glass-border)] text-[var(--tx-3)]
                          hover:text-[var(--ac)] hover:border-[var(--ac)]
                          transition-all duration-200">
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
