import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'
import { Field } from '../components/Record'

const REFERENCES = [
  { icon: Mail,         label: 'Email',    value: 'princechristianparnada@gmail.com', href: 'mailto:princechristianparnada@gmail.com' },
  { icon: GithubIcon,   label: 'GitHub',   value: 'Prinss-git',                       href: 'https://github.com/Prinss-git' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'prince-christian-parnada',         href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/' },
  { icon: FacebookIcon, label: 'Facebook', value: 'princechristian.parnada.9',        href: 'https://www.facebook.com/princechristian.parnada.9' },
]

function Paperclip() {
  return (
    <svg className="absolute -top-5 left-8 w-6 h-16 z-10" viewBox="0 0 24 64" fill="none" aria-hidden="true">
      <path d="M8 20 V50 a6 6 0 0 0 12 0 V12 a8 8 0 0 0 -16 0 V46" stroke="var(--rule)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export default function About() {
  return (
    <section id="about" className="pb-16 lg:pb-24" aria-labelledby="about-title">
      <div className="wrap">
        <div className="bar">
          <h2 id="about-title">Personal statement</h2>
          <p>In the applicant’s own words</p>
        </div>

        <div className="sheet mt-6">
          <div className="cells grid-cols-1 md:grid-cols-[260px_1fr]">
            <div className="field !p-6 flex flex-col items-start">
              <span className="field-label mb-6">Attachment 1 · photograph</span>
              <div className="relative w-full max-w-[220px] mx-auto md:mx-0 rotate-[-2deg]">
                <Paperclip />
                <div className="bg-[var(--paper)] p-2.5 pb-8" style={{ boxShadow: 'var(--photo-shadow)' }}>
                  <img src="/images/prince.jpg" alt="Prince Christian Parnada in a grey suit and sunglasses"
                       width="1365" height="768" loading="lazy"
                       className="w-full aspect-[4/5] object-cover object-[50%_20%]" />
                  <p className="typed text-center text-[0.8rem] !mt-2 text-[var(--ink-2)]">P. C. Parnada, Cebu</p>
                </div>
              </div>
            </div>

            <div className="cells !border-0 grid-cols-1 content-start">
              <div className="field !py-6 sm:!px-7">
                <span className="field-label">Statement</span>
                <div className="prose-record mt-3 text-[1.06rem] leading-[1.7]">
                  <p className="text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.3] font-semibold tracking-[-0.01em] !max-w-[34ch]"
                     style={{ fontVariationSettings: "'wdth' 96" }}>
                    I build full-stack web apps, the kind that actually get used by real people, not just demoed in class.
                  </p>
                  <p>
                    I’m Prince Christian, 20, studying BSIT at the University of Cebu – Banilad. My main stack is React on the
                    frontend and Node.js + MySQL on the backend. I’ve also worked with PHP, Firebase, and plain CSS when the
                    project calls for it.
                  </p>
                  <p>
                    MotoTrack, an inventory and sales system for a real motor parts shop here in Cebu, is probably my most
                    complete project so far. I’m looking for an internship or entry-level role where I can work on real
                    problems and keep getting better.
                  </p>
                </div>
              </div>

              <Field label="Currently">3rd year BSIT at UC Banilad · building side projects · open to internships in 2026</Field>

              <div className="field">
                <span className="field-label">References · reach me at</span>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6" role="list">
                  {REFERENCES.map(({ icon: Icon, label, value, href }) => (
                    <li key={label} className="border-b border-[var(--rule-soft)] last:border-0 sm:[&:nth-last-child(2)]:border-0">
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                         className="group flex items-center gap-3 py-2.5 no-underline">
                        <Icon size={15} className="text-[var(--rule)] shrink-0" />
                        <span className="field-label w-16 shrink-0">{label}</span>
                        <span className="typed !mt-0 min-w-0 text-[0.92rem] truncate group-hover:text-[var(--stamp)] group-hover:underline">{value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
