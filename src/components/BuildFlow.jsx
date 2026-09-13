import { Lightbulb, PencilRuler, Cable, Code2, ScanLine, Presentation } from 'lucide-react'
const stages = [
  [Lightbulb, 'Ideate', 'Find the problem.'],
  [PencilRuler, 'Design', 'Make a blueprint.'],
  [Cable, 'Wire', 'Connect the circuit.'],
  [Code2, 'Code', 'Give it instructions.'],
  [ScanLine, 'Debug', 'Test. Refine. Repeat.'],
  [Presentation, 'Demo', 'Show it working.'],
]
export default function BuildFlow() {
  return (
    <section className="build-section section-pad" data-sequence>
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">04 // Build pipeline</p>
          <span className="mono muted">INPUT → PROCESS → PROTOTYPE</span>
        </div>
        <div className="build-heading">
          <h2 className="section-heading" data-reveal>
            FROM IDEA
            <br />
            TO <span className="cyan">HARDWARE.</span>
          </h2>
          <p>
            Less talk. More tinkering.
            <br />
            This is how an idea becomes real.
          </p>
        </div>
        <div className="build-pipeline">
          <div className="pipeline-track" data-track />
          {stages.map(([Icon, title, desc], i) => (
            <div className="build-stage" key={title} data-stage>
              <span className="mono build-stage-index">0{i + 1}</span>
              <span className="build-stage-icon">
                <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
