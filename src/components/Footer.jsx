import { Scissors } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from './SocialIcons'

const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com/Prinss-git',                                   label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/', label: 'LinkedIn' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/princechristian.parnada.9',              label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer role="contentinfo" className="pb-10">
      <div className="wrap">
        <p className="typed text-center tracking-[0.2em] text-[var(--ink-2)] text-[0.9rem]">*** NOTHING FOLLOWS ***</p>

        <div className="relative mt-10 tear">
          <Scissors size={16} className="absolute -top-[9px] left-4 bg-[var(--paper)] px-0.5 box-content text-[var(--rule)] -rotate-90" aria-hidden="true" />
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] items-end">
          <div className="max-w-md">
            <span className="field-label">Certified true and correct</span>
            <p className="mt-6 text-[1.6rem] font-extrabold uppercase leading-none" style={{ fontVariationSettings: "'wdth' 125" }}>
              Prince Christian Parnada
            </p>
            <div className="mt-2 border-t border-[var(--rule)] pt-1.5 flex justify-between gap-4">
              <span className="field-label">Signature over printed name</span>
              <span className="field-label">© {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex gap-2">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="icon-btn">
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <p className="hidden md:block typed !mt-0 text-[0.8rem] text-[var(--ink-3)]">Press ? for keyboard shortcuts</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
