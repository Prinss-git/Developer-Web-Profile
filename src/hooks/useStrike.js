import { useEffect } from 'react'

// Stamps and callouts strike once, the first time their entry enters view.
export function useStrike() {
  useEffect(() => {
    const els = document.querySelectorAll('.stamp, .thud, .callout')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('struck'))
      return
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('struck')
          obs.unobserve(e.target)
        }
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.4 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}
