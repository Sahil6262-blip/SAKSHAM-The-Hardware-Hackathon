import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { timeline } from '../data/timeline'
import useReducedMotion from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)
export default function Timeline() {
  const root = useRef(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced) return
    const context = gsap.context(() => {
      gsap.fromTo(
        '.timeline-power',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-list',
            start: 'top 65%',
            end: 'bottom 70%',
            scrub: 0.4,
          },
        },
      )
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.fromTo(
          item.querySelector('.timeline-node'),
          { backgroundColor: '#1b1328', boxShadow: '0 0 0px #cba6ed00' },
          {
            backgroundColor: '#dfb9e5',
            boxShadow: '0 0 16px #cba6ed55',
            duration: 0.3,
            scrollTrigger: {
              trigger: item,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })
    }, root)
    return () => context.revert()
  }, [reduced])
  return (
    <section id="timeline" className="timeline-section section-pad" ref={root}>
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">06 // Event sequence</p>
          <span className="mono muted">EVERY CONNECTION COUNTS</span>
        </div>
        <div className="timeline-layout">
          <div className="timeline-intro">
            <h2 className="section-heading" data-reveal>
              THE ROAD
              <br />
              TO <span className="cyan">SAKSHAM.</span>
            </h2>
            <p>
              Assemble. Prepare. Create.
              <br />
              Your journey from the first spark
              <br />
              to the final prototype.
            </p>
            <span className="mono timeline-schedule-note">
              DETAILED DAILY SCHEDULE / TO BE ANNOUNCED
            </span>
          </div>
          <ol className="timeline-list">
            <div className="timeline-power" aria-hidden="true" />
            {timeline.map((item, i) => (
              <li
                key={item.title}
                className={`timeline-item ${item.milestone ? 'timeline-milestone' : ''}`}
              >
                <span className="timeline-node" aria-hidden="true" />
                <span className="timeline-index mono">0{i + 1}</span>
                <div>
                  <span className="timeline-date mono">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
