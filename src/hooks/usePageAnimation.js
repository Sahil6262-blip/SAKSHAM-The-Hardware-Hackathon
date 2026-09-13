import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from './useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
export default function usePageAnimation(page, enabled = true) {
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced || !enabled) return
    const originals = []
    const context = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          },
        )
      })
      gsap.utils.toArray('[data-sequence]').forEach((section) => {
        const stages = section.querySelectorAll('[data-stage]')
        const tracks = section.querySelectorAll('[data-track]')
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: section, start: 'top 82%', once: true },
        })
        if (tracks.length)
          timeline.fromTo(
            tracks,
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.4, ease: 'power2.inOut' },
          )
        if (stages.length)
          timeline.fromTo(
            stages,
            { opacity: 0.25 },
            { opacity: 1, duration: 0.5, stagger: 0.18 },
            0.2,
          )
      })
      gsap.utils.toArray('[data-count]').forEach((element) => {
        const value = Number(element.dataset.count)
        const counter = { value: 0 }
        const original = element.textContent
        originals.push([element, original])
        gsap.to(counter, {
          value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
          onUpdate: () => {
            element.textContent = `${element.dataset.prefix || ''}${Math.round(counter.value).toLocaleString('en-IN')}${element.dataset.suffix || ''}`
          },
          onComplete: () => {
            element.textContent = original
          },
        })
      })
      gsap.fromTo(
        '.duration-number',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: '.duration-section', start: 'top 75%', once: true },
        },
      )
      gsap.fromTo(
        '.registration-circuit',
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 1.8,
          scrollTrigger: { trigger: '#register', start: 'top 75%', once: true },
        },
      )
    }, page)
    return () => {
      context.revert()
      originals.forEach(([el, value]) => {
        el.textContent = value
      })
    }
  }, [enabled, page, reduced])
}
