import { experience } from '../data/experience'
import { skills } from '../data/skills'
import Timeline from '../components/Timeline'

export default function ExperienceSkills() {
  return (
    <>
      <section id="experience" className="pb-16 lg:pb-24" aria-labelledby="experience-title">
        <div className="wrap">
          <div className="bar">
            <h2 id="experience-title">Schools attended</h2>
            <p>2021 to present</p>
          </div>

          <div className="sheet mt-6">
            <div className="cells grid-cols-1">
              <Timeline />

              {experience.map(e => (
                <article key={e.id} className="cells !border-0 grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
                  <div className="cells !border-0 grid-cols-[1fr_auto] grid-rows-[1fr_auto]">
                    <div className="field col-span-2">
                      <span className="field-label">School</span>
                      <h3 className="mt-1 text-[1.3rem] sm:text-[1.5rem] font-extrabold leading-tight" style={{ fontVariationSettings: "'wdth' 112" }}>
                        {e.company}
                      </h3>
                    </div>
                    <div className="field">
                      <span className="field-label">Program</span>
                      <p className="typed">{e.role}</p>
                    </div>
                    <div className="field whitespace-nowrap">
                      <span className="field-label">Period</span>
                      <p className="typed tabular-nums">{e.period}</p>
                    </div>
                  </div>
                  <div className="field">
                    <span className="field-label">Remarks</span>
                    <ul className="mt-2 space-y-2" role="list">
                      {e.bullets.map((b, j) => (
                        <li key={j} className="flex gap-3 text-[0.97rem] leading-relaxed text-[var(--ink-2)] max-w-[64ch]">
                          <span className="typed !mt-0 text-[0.85rem] text-[var(--rule)] shrink-0 pt-[0.1rem]" aria-hidden="true">{String.fromCharCode(97 + j)}.</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="pb-16 lg:pb-24" aria-labelledby="skills-title">
        <div className="wrap">
          <div className="bar">
            <h2 id="skills-title">Subjects · tools and languages</h2>
            <p>With where each one was used</p>
          </div>

          <div className="sheet mt-6">
            <div className="cells grid-cols-1 lg:grid-cols-2">
              {skills.map((group, gi) => {
                const offset = skills.slice(0, gi).reduce((n, g) => n + g.items.length, 0)
                return (
                  <table key={group.category} className="ledger">
                    <caption className="text-left px-[0.85rem] pt-3 pb-2.5 border-b border-[var(--rule)] bg-[var(--paper-2)]">
                      <span className="block font-extrabold uppercase tracking-[0.05em] text-[0.95rem]" style={{ fontVariationSettings: "'wdth' 112" }}>
                        {group.category}
                      </span>
                      {group.note && <span className="typed block !mt-0.5 text-[0.85rem] text-[var(--ink-2)]">{group.note}</span>}
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col" className="w-[3.25rem]">No.</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Where it was used</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.items.map((item, i) => (
                        <tr key={item.name}>
                          <td className="typed !mt-0 text-[0.85rem] text-[var(--ink-3)]">{String(offset + i + 1).padStart(2, '0')}</td>
                          <th scope="row" className="!text-[0.98rem] !normal-case !tracking-normal !font-bold !text-[var(--ink)] !border-b !border-b-[var(--rule-soft)] !whitespace-normal !align-top"
                              style={{ fontVariationSettings: "'wdth' 105" }}>
                            {item.name}
                          </th>
                          <td className="typed !mt-0 text-[0.88rem] text-[var(--ink-2)]">{item.context.replace(/^Used in (.)/, (_, c) => c.toUpperCase())}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
