import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Leaf, Sprout, Bot, HeartPulse, ArrowUpRight } from 'lucide-react'
import { domains } from '../data/domains'
import { eventConfig } from '../data/eventConfig'
import useReducedMotion from '../hooks/useReducedMotion'
import '../styles/domains.css'

gsap.registerPlugin(ScrollTrigger)
const icons = { city: Building2, leaf: Leaf, plant: Sprout, robot: Bot, health: HeartPulse }
const routes = [
  'M600 290C500 300 470 100 360 120',
  'M600 290C705 305 720 102 840 120',
  'M600 290C500 260 440 420 360 390',
  'M600 290C700 260 750 420 840 390',
  'M600 290C670 355 670 460 600 505',
]
export default function Domains() {
  const [active, setActive] = useState('smart-cities')
  const root = useRef(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced) return
    const context = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: '.domain-network', start: 'top 80%', once: true } })
        .from('.domain-core', { opacity: 0.2, duration: 0.6 })
        .fromTo(
          '.domain-route',
          { strokeDashoffset: 100 },
          { strokeDashoffset: 0, duration: 0.8, stagger: 0.12 },
          0.3,
        )
        .from('.domain-module', { opacity: 0.15, duration: 0.5, stagger: 0.14 }, 0.5)
    }, root)
    return () => context.revert()
  }, [reduced])
  return (
    <section id="domains" ref={root} className="domains-section section-pad">
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">03 // Domain matrix</p>
          <span className="mono muted">FIND YOUR FREQUENCY</span>
        </div>
        <div className="domains-heading">
          <h2 className="section-heading" data-reveal>
            CHOOSE
            <br />
            YOUR <span className="cyan">DOMAIN.</span>
          </h2>
          <p>
            {domains.length} domains. {eventConfig.duration.toLowerCase()}.<br />
            One working prototype.<span className="mono">SELECT A MODULE TO POWER IT ON ↙</span>
          </p>
        </div>
        <div className="domain-network">
          <svg
            className="domain-routes"
            viewBox="0 0 1200 740"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <ellipse
              cx="600"
              cy="305"
              rx="330"
              ry="245"
              stroke="#b7a2d4"
              strokeOpacity=".15"
              transform="rotate(-17 600 305)"
            />
            <ellipse
              cx="600"
              cy="305"
              rx="285"
              ry="265"
              stroke="#b7a2d4"
              strokeOpacity=".07"
              transform="rotate(24 600 305)"
            />
            {routes.map((d, i) => (
              <g key={d}>
                <path d={d} stroke="#173d4d" strokeWidth="2" />
                <path
                  className={`domain-route ${active === domains[i].id ? 'route-selected' : ''}`}
                  d={d}
                  stroke={domains[i].accent}
                  strokeWidth="1.5"
                  pathLength="100"
                  strokeDasharray="100"
                />
                <circle
                  cx={[360, 840, 360, 840, 600][i]}
                  cy={[120, 120, 390, 390, 505][i]}
                  r="4"
                  fill={domains[i].accent}
                />
              </g>
            ))}
          </svg>
          <div className="domain-core" aria-hidden="true">
            <div className="domain-core-pins" />
            <div className="domain-core-face">
              <span className="mono">CENTRAL PROCESSOR</span>
              <strong>S’26</strong>
              <span className="mono">SAKSHAM CORE</span>
              <span className="core-online">
                <i />
                ONLINE
              </span>
            </div>
            <span className="domain-core-footer mono">05 / MODULES CONNECTED</span>
          </div>
          {domains.map((domain) => {
            const Icon = icons[domain.icon]
            const selected = active === domain.id
            return (
              <motion.button
                type="button"
                key={domain.id}
                className={`domain-module domain-module-${domain.number} ${selected ? 'module-selected' : ''}`}
                style={{ '--domain-accent': domain.accent }}
                aria-pressed={selected}
                aria-label={`${domain.title}, ${selected ? 'active' : 'select domain'}`}
                onClick={() => setActive(domain.id)}
                whileTap={{ scale: 0.995 }}
              >
                <span className="domain-module-top mono">
                  <span>MODULE_{domain.number}</span>
                  <span>
                    <i />
                    {selected ? 'ACTIVE' : 'STANDBY'}
                  </span>
                </span>
                <span className="domain-module-body">
                  <Icon className="domain-icon" size={33} strokeWidth={1.2} aria-hidden="true" />
                  <span className="domain-module-title">
                    {domain.shortTitle}
                    <span>{domain.subtitle}</span>
                  </span>
                  <ArrowUpRight size={17} className="domain-arrow" aria-hidden="true" />
                </span>
                <span className="domain-description">{domain.description}</span>
                <span className="domain-module-bottom" aria-hidden="true">
                  <span /> <span>0{domain.number} / SAKSHAM_26</span>
                </span>
              </motion.button>
            )
          })}
        </div>
        <div className="domain-network-caption mono">
          <span>
            <i className="status-dot" />
            CONNECTED BY HARDWARE. DRIVEN BY POSSIBILITY.
          </span>
          <span>YOUR IDEA BELONGS HERE.</span>
        </div>
      </div>
    </section>
  )
}
