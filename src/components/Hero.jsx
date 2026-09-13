import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowDown, CalendarDays, MapPin, Plus } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'
import { domains } from '../data/domains'
import RegisterButton from './RegisterButton'
import CircuitBackground from './CircuitBackground'
import HardwareScene from './HardwareScene'
import CosmicBackdrop from './CosmicBackdrop'
import InstitutionalLogo from './InstitutionalLogo'
import useReducedMotion from '../hooks/useReducedMotion'

export default function Hero({ active = true }) {
  const root = useRef(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced || !active) return
    const context = gsap.context(() => {
      gsap
        .timeline({ delay: 0.12 })
        .from('.hero-organizers', { opacity: 0, y: -8, duration: 0.5 })
        .from('.hero-kicker', { opacity: 0, y: 10, duration: 0.45 }, '-=0.2')
        .from('.hero-wordmark', { opacity: 0, y: 22, duration: 1.1, ease: 'power3.out' }, '-=0.15')
        .from('.hero-wordmark-rule', { opacity: 0, scaleX: 0.9, duration: 0.45 }, '-=0.25')
        .from('.hero-bottom-copy > *', { opacity: 0, y: 10, duration: 0.45, stagger: 0.1 }, '-=0.3')
        .from('.hero-art', { opacity: 0, y: 20, duration: 0.75, ease: 'power3.out' }, '-=0.8')
    }, root)
    return () => context.revert()
  }, [active, reduced])
  return (
    <section id="home" className="hero-section" ref={root}>
      <CosmicBackdrop active={active} />
      <CircuitBackground className="hero-circuit" />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-organizers">
          <div className="college-lockup">
            <InstitutionalLogo name="Vidyavardhini" file="vcet-logo.png" />
            <div>
              <p>{eventConfig.college}</p>
              <span>{eventConfig.department}</span>
            </div>
          </div>
          <div className="association-lockup">
            <div className="association-logos">
              <InstitutionalLogo
                name={eventConfig.association[0]}
                file="ieee-logo.png"
                className="association-logo association-logo-ieee"
              />
              <InstitutionalLogo
                name={eventConfig.association[1]}
                file="iete-logo.png"
                className="association-logo association-logo-iete"
              />
            </div>
            <span className="association-name">{eventConfig.association.join(' × ')}</span>
            <span className="mono">PRESENTS</span>
          </div>
        </div>
        <div className="hero-kicker">
          <span className="mono">HARDWARE HACKATHON</span>
          <span className="mono">THE HARDWARE REVOLUTION / 2026</span>
        </div>
        <h1 className="hero-wordmark" aria-label={eventConfig.name}>
          SAKSHAM<span>’26</span>
        </h1>
        <div className="hero-wordmark-rule">
          <span className="mono">IDEAS IN. INNOVATION OUT.</span>
          <Plus size={13} aria-hidden="true" />
          <span className="mono">PCB_26 / REV.01</span>
        </div>
        <div className="hero-bottom">
          <div className="hero-bottom-copy">
            <div className="hero-tagline">
              <span>TURNING POTENTIAL</span>
              <span>
                INTO <em>POSSIBILITY.</em>
              </span>
            </div>
            <p className="hero-description">
              A spark of an idea. A tangle of wires.
              <br />
              Twelve hours to make something real.
            </p>
            <div className="hero-facts mono">
              <span>{eventConfig.duration}</span>
              <i />
              <span>{domains.length} domains</span>
              <i />
              <span>Real hardware</span>
            </div>
            <div className="hero-buttons">
              <RegisterButton className="button-filled" />
              <a className="explore-link" href="#about">
                Explore Saksham <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="hero-date mono">
              <span>
                <CalendarDays size={14} aria-hidden="true" />
                {eventConfig.onlinePitchDateLabel} / ONLINE PITCHING
              </span>
              <span>
                <CalendarDays size={14} aria-hidden="true" />
                {eventConfig.eventDateLabel} / OFFLINE HACKATHON
              </span>
              <span>
                <MapPin size={14} aria-hidden="true" />
                {eventConfig.venue}
              </span>
            </div>
          </div>
          <div className="hero-art">
            <HardwareScene />
          </div>
        </div>
        <div className="hero-footer mono">
          <a href="#about">
            <span className="scroll-track" />
            Scroll to initialize <ArrowDown size={12} aria-hidden="true" />
          </a>
          <span>
            <span className="status-dot" />
            SAKSHAM_CORE // SYSTEM ONLINE
          </span>
          <span className="hero-footer-index">001 — 026</span>
        </div>
      </div>
    </section>
  )
}
