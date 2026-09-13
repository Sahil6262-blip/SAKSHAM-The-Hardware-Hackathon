import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import useReducedMotion from '../hooks/useReducedMotion'

export default function IntroLoader() {
  const root = useRef(null)
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  useLayoutEffect(() => {
    if (reduced || done) return
    const context = gsap.context(() => {
      gsap
        .timeline({ onComplete: () => setDone(true) })
        .fromTo(
          '.boot-trace',
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
        )
        .to('.boot-node', { opacity: 1, stagger: 0.12, duration: 0.15 }, 0.3)
        .to('.boot-initial', { opacity: 0, duration: 0.1 }, 0.85)
        .fromTo('.boot-online', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.95)
        .fromTo(
          '.boot-wordmark',
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 0.45 },
          1.02,
        )
        .to(root.current, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, 1.5)
    }, root)
    return () => context.revert()
  }, [reduced, done])
  if (reduced || done) return null
  return (
    <div ref={root} className="intro-loader" aria-hidden="true">
      <div className="boot-inner">
        <div className="boot-meta mono">
          <span>VCET / EXTC</span>
          <span>PCB_26</span>
        </div>
        <div className="boot-status mono">
          <span className="boot-initial">SYSTEM // INITIALIZING</span>
          <span className="boot-online">SAKSHAM_CORE // ONLINE</span>
        </div>
        <svg viewBox="0 0 600 100" fill="none">
          <path
            className="boot-trace"
            d="M0 50H130V20H230V80H370V50H600"
            stroke="currentColor"
            strokeWidth="2"
            pathLength="1000"
            strokeDasharray="1000"
          />
          {[130, 230, 370, 550].map((x, i) => (
            <circle
              className="boot-node"
              key={x}
              cx={x}
              cy={[50, 80, 50, 50][i]}
              r="4"
              fill="currentColor"
            />
          ))}
        </svg>
        <div className="boot-wordmark">
          SAKSHAM<span>’26</span>
        </div>
      </div>
    </div>
  )
}
