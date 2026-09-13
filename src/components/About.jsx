import { Lightbulb, CircuitBoard, Bot, ArrowUpRight } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'
export default function About() {
  return (
    <section id="about" className="about-section section-pad" data-sequence>
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">01 // About Saksham</p>
          <span className="mono muted">IDEA INPUT →</span>
        </div>
        <div className="about-grid">
          <h2 className="section-heading" data-reveal>
            DON’T JUST
            <br />
            PITCH IT.
            <br />
            <span className="cyan">BUILD IT.</span>
            <ArrowUpRight className="about-arrow" strokeWidth={1} aria-hidden="true" />
          </h2>
          <div className="about-content">
            <p className="eyebrow">What is Saksham?</p>
            <p className="about-lead">
              The best ideas don’t stay
              <br />
              on a drawing board.
            </p>
            <p>
              {eventConfig.name} is a{' '}
              {eventConfig.duration.toLowerCase().replace(' hours', '-hour')} hardware hackathon
              where students transform ideas into working physical prototypes.
            </p>
            <p>
              Bring your curiosity. Find your team. Connect the dots between what you imagine and
              what you can build.
            </p>
            <a href="#domains" className="text-link">
              Find your field of possibility <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="idea-schematic">
          <div className="schematic-track" data-track />
          {[
            [Lightbulb, 'Idea', 'THE SPARK'],
            [CircuitBoard, 'Circuit', 'THE CONNECTION'],
            [Bot, 'Prototype', 'THE REAL THING'],
          ].map(([Icon, title, sub], index) => (
            <div className="idea-node" key={title} data-stage>
              <div className="idea-icon">
                <Icon size={32} strokeWidth={1.2} aria-hidden="true" />
              </div>
              <div>
                <span className="mono muted">
                  0{index + 1} / {sub}
                </span>
                <h3>{title}</h3>
              </div>
              <span className="node-led" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
