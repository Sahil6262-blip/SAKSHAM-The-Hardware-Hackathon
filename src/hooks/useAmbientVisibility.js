import { useEffect } from 'react'

// Stop decorative CSS loops when their section or browser tab is not visible.
export default function useAmbientVisibility(root, enabled) {
  useEffect(() => {
    if (!enabled) return
    const sections = [...root.current.querySelectorAll(':scope > section, :scope > .event-marquee')]
    const visibility = new Map(sections.map((section) => [section, false]))
    const update = () => {
      visibility.forEach((inView, section) => {
        section.dataset.motion = inView && !document.hidden ? 'running' : 'paused'
      })
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting))
      update()
    })
    sections.forEach((section) => observer.observe(section))
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      sections.forEach((section) => delete section.dataset.motion)
    }
  }, [enabled, root])
}
