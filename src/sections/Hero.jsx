import { ArrowUpRight, ArrowDown, FileText } from 'lucide-react'
import { Field, Stamp, Tick, Rosette } from '../components/Record'
import { projects } from '../data/projects'

const ISSUED = new Date().toLocaleDateString('en-PH', { day: '2-digit', month: 'short', year: 'numeric' })
const LIVE_COUNT = projects.filter(p => p.live).length
const MOTOTRACK = projects[0]

export default function Hero() {
  return (
    <section id="top" className="pt-[84px] pb-14 lg:pb-20" aria-label="Record header">
      <div className="wrap">
        <div className="sheet thud" style={{ '--delay': '700ms' }}>

          {/* Form header strip */}
          <div className="cells grid-cols-2 md:grid-cols-[1fr_auto_1fr]">
            <Field label="Form" className="order-1">PP-26 · Rev. 2026</Field>
            <div className="order-3 md:order-2 col-span-2 md:col-span-1 flex items-center justify-center px-5 py-3 bg-[var(--rule)] text-[var(--on-rule)]">
              <p className="text-center font-extrabold uppercase tracking-[0.08em] text-[0.95rem] sm:text-[1.05rem] leading-tight"
                 style={{ fontVariationSettings: "'wdth' 125" }}>
                Transcript of Shipped Work
              </p>
            </div>
            <Field label="Date issued" className="order-2 md:order-3 text-right">{ISSUED}</Field>
          </div>

          {/* Identity block */}
          <div className="cells grid-cols-[minmax(0,108px)_1fr] sm:grid-cols-[minmax(0,180px)_1fr] lg:grid-cols-[240px_1fr]">
            <div className="row-span-2 sm:row-span-3 p-3 sm:p-4 flex flex-col">
              <span className="field-label mb-2">Photo</span>
              <div className="id-photo">
                <img src="/images/prince-hero.jpg" alt="Portrait of Prince Christian Parnada"
                     width="1448" height="1086" fetchPriority="high"
                     className="w-full aspect-[7/9] object-cover object-[50%_35%]" />
              </div>
            </div>

            <div className="field relative overflow-hidden min-h-[7.5rem] sm:min-h-[10rem] [container-type:inline-size]">
              <Rosette className="absolute -right-24 -top-28 w-[26rem] max-w-none opacity-90 pointer-events-none hidden sm:block" />
              <span className="field-label relative">Surname</span>
              <h1 className="relative mt-2 sm:mt-3">
                <span className="display block text-[min(6rem,14.5cqi)]">Parnada</span>
                <span className="sr-only">, Prince Christian, full-stack web developer</span>
              </h1>
            </div>

            <div className="cells !border-0 grid-cols-1 sm:grid-cols-[1.1fr_1fr]">
              <Field label="Given name">
                <span className="text-[1.15rem] sm:text-[1.35rem] font-bold" style={{ fontFamily: 'Archivo', fontVariationSettings: "'wdth' 112" }}>PRINCE CHRISTIAN</span>
              </Field>
              <Field label="Discipline" className="hidden sm:block">Full-stack web developer</Field>
            </div>

            <div className="col-span-2 sm:col-span-1 cells !border-0 grid-cols-1 sm:grid-cols-3">
              <Field label="Discipline" className="sm:hidden">Full-stack web developer</Field>
              <Field label="Program">BS Information Technology, 3rd year</Field>
              <Field label="School">University of Cebu – Banilad</Field>
              <Field label="Based in">Cebu, Philippines</Field>
            </div>
          </div>

          {/* Remarks + actions */}
          <div className="cells grid-cols-1 lg:grid-cols-[1fr_340px]">
            <div className="field relative">
              <span className="field-label">Remarks</span>
              <p className="mt-3 max-w-[30ch] text-[clamp(1.45rem,3.1vw,2.35rem)] font-semibold leading-[1.12] tracking-[-0.015em]"
                 style={{ fontVariationSettings: "'wdth' 96" }}>
                Builds web apps that real businesses run on. Entry No.&nbsp;001 keeps the stock of a motor parts shop in Cebu.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a href={MOTOTRACK.live} target="_blank" rel="noopener noreferrer" className="act">
                  Open MotoTrack <ArrowUpRight size={16} strokeWidth={2.4} />
                </a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="act-line">
                  <FileText size={15} /> Request a copy (résumé)
                </a>
                <a href="#projects" className="act-line"
                   onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
                  All entries <ArrowDown size={15} />
                </a>
              </div>
            </div>

            <div className="cells !border-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
              <div className="field">
                <span className="field-label">Seeking</span>
                <div className="mt-2 flex flex-col gap-1.5">
                  <Tick>Internship, 2026</Tick>
                  <Tick>Entry-level role</Tick>
                  <Tick>Freelance work</Tick>
                </div>
              </div>
              <div className="field">
                <span className="field-label">Verification</span>
                <p className="typed">{LIVE_COUNT} of {projects.length} entries deployed and live</p>
                <div className="mt-4 mb-1 flex justify-end pr-1">
                  <Stamp sub="1 real client · Cebu" tilt={-8} size="clamp(1.1rem,2.2vw,1.45rem)" delay={350}>
                    Live in production
                  </Stamp>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
