import { eventConfig } from '../data/eventConfig'
export default function DurationSection() {
  return (
    <section className="duration-section section-pad" data-sequence>
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">02 // Build window</p>
          <span className="mono muted">LIMITED TIME. UNLIMITED POSSIBILITY.</span>
        </div>
        <div className="duration-composition">
          <div className="duration-display">
            <span className="duration-number">{eventConfig.durationHours}</span>
            <span className="duration-unit">HOURS</span>
            <span className="duration-ruler" aria-hidden="true" />
          </div>
          <div className="duration-copy">
            <span className="mono cyan">BUILD_MODE // ENABLED</span>
            <h2 className="section-heading" data-reveal>
              TO BUILD
              <br />
              SOMETHING
              <br />
              <span className="outline-text">REAL.</span>
            </h2>
            <p>
              From the first connection to the final demo.
              <br />
              Make every second count.
            </p>
          </div>
        </div>
        <div className="duration-phases">
          <span className="phase-line" data-track />
          {['Pitch', 'Build', 'Test', 'Debug', 'Demonstrate'].map((phase, i) => (
            <div key={phase} data-stage>
              <span className="mono">0{i + 1}</span>
              <span className="phase-dot" />
              <strong>{phase}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
