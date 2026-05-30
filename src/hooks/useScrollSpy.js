import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0, ...options }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds.join(',')])

  return activeId
}
