import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from '../components/SocialIcons'

const SOCIALS = [
  { icon: GithubIcon,   href: 'https://github.com/Prinss-git',                                   label: 'GitHub',   handle: 'github.com/Prinss-git' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/prince-christian-parnada-3b8a3b400/', label: 'LinkedIn', handle: 'linkedin.com/in/prince-christian-parnada' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/princechristian.parnada.9',              label: 'Facebook', handle: 'facebook.com/princechristian.parnada.9' },
]

const INITIAL = { name: '', email: '', message: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim()) e.name = 'Name is required.'
  if (!f.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Enter a valid email.'
  if (!f.message.trim()) e.message = 'Message is required.'
  else if (f.message.trim().length < 10) e.message = 'At least 10 characters.'
  return e
}

function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('[data-r]').forEach((el, i) =>
          setTimeout(() => el.classList.add('in'), i * 100))
      }),
      { threshold: 0.08 }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
}

export default function Contact() {
  const ref = useRef(null)
  const formRef = useRef(null)
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  useReveal(ref)

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
    setTouched({ name: true, email: true, message: true })
    const errs = validate(fields); setErrors(errs)
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success'); setFields(INITIAL); setTouched({})
    } catch { setStatus('error') }
  }

  const ic = n => `input${errors[n] && touched[n] ? ' input-error' : ''}`

  return (
    <section id="contact" className="py-28" ref={ref} aria-label="Contact">
      <div className="wrap">
        <div data-r className="reveal mb-12">
          <div className="eyebrow">Get in touch</div>
          <h2 className="section-title mt-3">Contact</h2>
          <p className="text-[var(--tx-2)] mt-3 max-w-md leading-relaxed">
            Have a project or opportunity? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div data-r className="reveal d1">
            {status === 'success' ? (
              <div className="card flex flex-col items-center gap-5 py-20 text-center"
                   role="alert" aria-live="polite">
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[var(--ac-dim)]">
                  <CheckCircle size={28} style={{ color: 'var(--ac)' }} />
                </div>
                <div>
                  <p className="font-bold text-[var(--tx)] text-lg">Message sent!</p>
                  <p className="text-[var(--tx-2)] text-sm mt-1">I'll get back to you within 24 hours.</p>
                </div>
                <button onClick={() => setStatus('idle')} className="btn btn-secondary text-sm">
                  Send another
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate className="card p-7 space-y-5">
                {[
                  { id: 'name',  label: 'Name',  type: 'text',  ph: 'Jane Smith' },
                  { id: 'email', label: 'Email', type: 'email', ph: 'jane@example.com' },
                ].map(({ id, label, type, ph }) => (
                  <div key={id}>
                    <label htmlFor={id}
                           className="block text-xs font-semibold text-[var(--tx-3)] uppercase tracking-widest mb-2">
                      {label} <span style={{ color: 'var(--ac)' }}>*</span>
                    </label>
                    <input
                      id={id} name={id} type={type} autoComplete={id}
                      value={fields[id]} onChange={change} onBlur={blur}
                      aria-required="true" aria-invalid={!!(errors[id] && touched[id])}
                      placeholder={ph} className={ic(id)} />
                    {errors[id] && touched[id] && (
                      <p role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                        <AlertCircle size={11} /> {errors[id]}
                      </p>
                    )}
                  </div>
                ))}
                <div>
                  <label htmlFor="message"
                         className="block text-xs font-semibold text-[var(--tx-3)] uppercase tracking-widest mb-2">
                    Message <span style={{ color: 'var(--ac)' }}>*</span>
                  </label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={fields.message} onChange={change} onBlur={blur}
                    aria-required="true" aria-invalid={!!(errors.message && touched.message)}
                    placeholder="Tell me about your project or idea..."
                    className={`${ic('message')} resize-none`} />
                  {errors.message && touched.message && (
                    <p role="alert" className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                      <AlertCircle size={11} /> {errors.message}
                    </p>
                  )}
                </div>
                {status === 'error' && (
                  <div role="alert"
                       className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle size={15} /> Something went wrong. Please try again.
                  </div>
                )}
                <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full justify-center">
                  {status === 'sending' ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending…</>
                  ) : (
                    <>Send Message <Send size={14} /></>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div data-r className="reveal d2 flex flex-col gap-5">
            <p className="text-[var(--tx-2)] leading-loose text-sm">
              Whether it's a project, an opportunity, or just a hello — I'm always happy to connect.
              I aim to respond within one business day.
            </p>
            <div className="space-y-3">
              {[
                { icon: Phone, label: 'Phone', value: '+63 948 717 7945',                     href: null },
                { icon: Mail,  label: 'Email', value: 'princechristianparnada@gmail.com',     href: 'mailto:princechristianparnada@gmail.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="card p-4 flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[var(--ac-dim)]"
                       style={{ color: 'var(--ac)' }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--tx-3)] uppercase tracking-widest font-mono">{label}</p>
                    {href
                      ? <a href={href} className="text-sm text-[var(--tx)] hover:text-[var(--ac)] transition-colors">{value}</a>
                      : <p className="text-sm text-[var(--tx)]">{value}</p>}
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2.5">
              {SOCIALS.map(({ icon: Icon, href, label, handle }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                   aria-label={`Visit my ${label} profile`}
                   className="card p-4 flex items-center gap-4 group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-[var(--border)]
                                  bg-[var(--bg-3)] text-[var(--tx-3)] group-hover:text-[var(--ac)]
                                  group-hover:border-[var(--ac)] transition-all duration-200">
                    <Icon size={15} />
                  </div>
                  <span className="text-sm text-[var(--tx-2)] group-hover:text-[var(--ac)] transition-colors">
                    {handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
