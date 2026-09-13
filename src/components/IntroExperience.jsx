import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import CosmicBackdrop from './CosmicBackdrop'
import useReducedMotion from '../hooks/useReducedMotion'

const letters = 'SAKSHAM'.split('')

export default function IntroExperience({ onEnterStart, onComplete }) {
  const root = useRef(null)
  const reduced = useReducedMotion()
  const [exiting, setExiting] = useState(false)

  useLayoutEffect(() => {
    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    window.scrollTo(0, 0)

    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => {
        document.body.style.overflow = previousBodyOverflow
        document.documentElement.style.overflow = previousHtmlOverflow
      }
    }

    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.cosmic-parallax', { opacity: 0, scale: 0.97, duration: 1.5 }, 0)
        .from(
          '.entry-letter',
          {
            clipPath: 'inset(100% 0 0 0)',
            yPercent: 72,
            opacity: 0,
            duration: 0.68,
            stagger: 0.065,
          },
          0.4,
        )
        .from(
          '.entry-year',
          {
            opacity: 0,
            scale: 0.78,
            duration: 0.38,
            ease: 'back.out(1.8)',
          },
          1.12,
        )
        .from('.entry-subtitle', { opacity: 0, y: 12, duration: 0.42 }, 1.38)
        .from('.entry-tagline', { opacity: 0, y: 10, duration: 0.38 }, 1.58)
        .from('.entry-button', { opacity: 0, y: 10, duration: 0.4 }, 1.76)
    }, root)

    return () => {
      context.revert()
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [reduced])

  const enter = () => {
    if (exiting) return
    setExiting(true)
    onEnterStart()
    gsap.killTweensOf(root.current.querySelectorAll('*'))

    if (reduced || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(root.current, { opacity: 0 })
      onComplete()
      return
    }

    gsap.context(() => {
      gsap
        .timeline({ onComplete })
        .to('.entry-button', {
          backgroundColor: '#b68bff',
          boxShadow: '0 0 46px #985dff66',
          duration: 0.16,
        })
        .to('.cosmic-parallax', { scale: 1.035, duration: 0.8, ease: 'power2.inOut' }, 0)
        .to('.entry-signal-ring', { opacity: 1, scale: 2.8, duration: 0.55 }, 0)
        .to('.entry-content', { scale: 1.025, opacity: 0, duration: 0.52, ease: 'power2.in' }, 0.18)
        .to(
          root.current,
          { clipPath: 'inset(0 0 100% 0)', duration: 0.82, ease: 'power3.inOut' },
          0.26,
        )
    }, root)
  }

  return (
    <section
      ref={root}
      className="intro-experience"
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-title"
    >
      <CosmicBackdrop variant="entry" />
      <div className="entry-content">
        <h1 id="entry-title" className="entry-title" aria-label="SAKSHAM’26">
          <span className="entry-title-word" aria-hidden="true">
            {letters.map((letter, index) => (
              <span
                className={`entry-letter${index >= 4 ? ' entry-letter-accent' : ''}`}
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </span>
          <span className="entry-year" aria-hidden="true">
            ’26
          </span>
        </h1>
        <p className="entry-subtitle mono">VCET HARDWARE HACKATHON</p>
        <p className="entry-tagline">
          TURNING POTENTIAL INTO <span>POSSIBILITY</span>
        </p>
        <button className="entry-button mono" type="button" onClick={enter} disabled={exiting}>
          <span>ENTER LOBBY</span>
          <ArrowRight size={16} aria-hidden="true" />
          <i className="entry-signal-ring" aria-hidden="true" />
        </button>
      </div>
      <span className="entry-status mono" aria-hidden="true">
        SAKSHAM_CORE // AWAITING INPUT
      </span>
    </section>
  )
}
