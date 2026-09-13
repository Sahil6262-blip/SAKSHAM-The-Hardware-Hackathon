import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from './useReducedMotion'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)
export default function useLenis(enabled = true) {
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced || !enabled) return
    // Lenis reads the document's scroll-padding-top; do not apply that offset twice.
    const lenis = new Lenis({ duration: 0.85, smoothWheel: true, syncTouch: false, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (seconds) => lenis.raf(seconds * 1000)
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
    }
  }, [enabled, reduced])
}
