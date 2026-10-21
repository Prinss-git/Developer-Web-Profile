import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, AlertCircle, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'
import { Stamp } from '../components/Record'

const LINES = [
  { icon: Mail,         label: 'Email',    value: 'princechristianparnada@gmail.com',     href: 'mailto:princechristianparnada@gmail.com' },
  { icon: Phone,        label: 'Phone',    value: '+63 948 717 7945',                     href: 'tel:+639487177945' },
  { icon: GithubIcon,   label: 'GitHub',   value: 'github.com/Prinss-git',                href: 'https://github.com/Prinss-git' },
  { icon: LinkedinIcon, label: 'LinkedIn', value: 'in/prince-christian-parnada',          href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/' },
  { icon: FacebookIcon, label: 'Facebook', value: 'princechristian.parnada.9',            href: 'https://www.facebook.com/princechristian.parnada.9' },
]

const INITIAL = { name: '', email: '', subject: '', message: '', _trap: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Write your name so I know who to reply to.'
  if (!f.email.trim()) e.email = 'Add an email address for the reply.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email looks incomplete. Check for a typo.'
  if (!f.message.trim()) e.message = 'Write a short message.'
  else if (f.message.trim().length < 10) e.message = 'A little more detail, please (10 characters or more).'
  return e
}

export default function Contact() {
  const formRef = useRef(null)
  const lastSubmit = useRef(0)
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const change = e => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) setErrors(p => ({ ...p, [name]: validate({ ...fields, [name]: value })[name] }))
  }
  const blur = e => {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(p => ({ ...p, [name]: validate(fields)[name] }))
  }
  const submit = async e => {
    e.preventDefault()
    if (fields._trap) return
    setTouched({ name: true, email: true, message: true })
    const errs = validate(fields); setErrors(errs)
    if (Object.keys(errs).length) return
    const now = Date.now()
    if (now - lastSubmit.current < 60000) {
      setErrorMsg('You just sent one. Wait a minute before sending another, or email me directly.')
      setStatus('error'); return
    }
    lastSubmit.current = now
    setStatus('sending')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success'); setFields(INITIAL); setTouched({})
    } catch {
      setErrorMsg('The message didn’t go through. Try again, or email princechristianparnada@gmail.com directly.')
      setStatus('error')
    }
  }

  const invalid = n => !!(errors[n] && touched[n])

  const input = (id, label, props = {}) => (
    <div className="field">
      <label htmlFor={id} className="field-label">{label}{props.required !== false && <span className="text-[var(--stamp)]"> *</span>}</label>
      {props.multiline ? (
        <textarea id={id} name={id} rows={5} value={fields[id]} onChange={change} onBlur={blur}
                  aria-required="true" aria-invalid={invalid(id)} aria-describedby={invalid(id) ? `${id}-err` : undefined}
                  placeholder={props.ph} className="input resize-none leading-[1.9]"
                  style={{ backgroundImage: 'repeating-linear-gradient(transparent 0 1.85rem, var(--rule-soft) 1.85rem 1.9rem)', borderBottom: 0 }} />
      ) : (
        <input id={id} name={id} type={props.type || 'text'} autoComplete={props.ac || id}
               value={fields[id]} onChange={change} onBlur={blur}
               aria-required={props.required !== false} aria-invalid={invalid(id)}
               aria-describedby={invalid(id) ? `${id}-err` : undefined}
               placeholder={props.ph} className="input" />
      )}
      {invalid(id) && (
        <p id={`${id}-err`} className="field-error"><AlertCircle size={13} /> {errors[id]}</p>
      )}
    </div>
  )

  return (
    <section id="contact" className="pb-16 lg:pb-24" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="bar">
          <h2 id="contact-title">Request form</h2>
          <p>Internships, roles, freelance builds</p>
        </div>

        <div className="sheet mt-6">
          <div className="cells grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">

            <div className="relative">
              {status === 'success' ? (
                <div className="field min-h-[26rem] flex flex-col items-center justify-center gap-6 text-center" role="status" aria-live="polite">
                  <Stamp sub="reply within 24 hours" tilt={-9} size="2.4rem" instant>Received</Stamp>
                  <p className="text-[var(--ink-2)] max-w-[36ch]">Thanks, your request is filed. I’ll get back to you within a day.</p>
                  <button onClick={() => setStatus('idle')} className="act-line">File another request</button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={submit} noValidate className="cells !border-0 grid-cols-1 sm:grid-cols-2">
                  {/* Honeypot: hidden from people, filled by bots */}
                  <input name="_trap" value={fields._trap} onChange={change}
                         style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {input('name', 'Your name', { ph: 'Jane Santos' })}
                  {input('email', 'Reply-to email', { type: 'email', ph: 'jane@company.com' })}
                  <div className="sm:col-span-2">{input('subject', 'Subject', { required: false, ph: 'Internship opportunity', ac: 'off' })}</div>
                  <div className="sm:col-span-2">{input('message', 'Message', { multiline: true, ph: 'What are you hiring for, or what would you like built?' })}</div>
                  <div className="field sm:col-span-2 flex flex-wrap items-center justify-between gap-4 !py-4">
                    <p className="typed !mt-0 text-[0.85rem] text-[var(--ink-2)]">I usually reply within a day.</p>
                    <button type="submit" disabled={status === 'sending'} className="act">
                      {status === 'sending'
                        ? <>Filing… <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" /></>
                        : <>File request <Send size={15} /></>}
                    </button>
                    {status === 'error' && (
                      <p role="alert" className="field-error w-full !mt-0">
                        <AlertCircle size={14} /> {errorMsg}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>

            <div className="field !p-0">
              <div className="px-[0.85rem] pt-[0.55rem]"><span className="field-label">Direct lines</span></div>
              <ul role="list" className="mt-1">
                {LINES.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="border-t border-[var(--rule-soft)] first:border-0">
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                       className="group flex items-center gap-3 px-[0.85rem] py-3.5 no-underline hover:bg-[var(--paper-2)] transition-colors">
                      <Icon size={16} className="text-[var(--rule)] shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="field-label">{label}</span>
                        <span className="typed block !mt-0 text-[0.92rem] truncate group-hover:text-[var(--stamp)]">{value}</span>
                      </span>
                      <ArrowUpRight size={15} className="text-[var(--ink-3)] group-hover:text-[var(--stamp)] shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
