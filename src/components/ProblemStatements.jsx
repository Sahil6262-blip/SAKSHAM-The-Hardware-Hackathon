import { ScanLine, ArrowUpRight } from 'lucide-react'
import { problemStatements } from '../data/problemStatements'
export default function ProblemStatements() {
  return (
    <section id="challenges" className="challenge-section section-pad">
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">08 // Challenges</p>
          <span className="mono muted">THE PROBLEM IS ONLY THE BEGINNING</span>
        </div>
        <div className="challenge-layout">
          <h2 className="section-heading" data-reveal>
            PROBLEM
            <br />
            <span className="outline-text">STATEMENTS.</span>
          </h2>
          {problemStatements.length === 0 ? (
            <div className="challenge-scanner">
              <div className="scanner-line" aria-hidden="true" />
              <div className="scanner-top mono">
                <ScanLine size={20} strokeWidth={1} aria-hidden="true" />
                <span>SCANNING DOMAINS...</span>
                <span>05 / 05</span>
              </div>
              <h3>
                COMING SOON<span className="cyan">_</span>
              </h3>
              <p>
                The next challenge is on its way.
                <br />
                Official problem statements will be released here.
              </p>
              <span className="mono challenge-status">
                <span className="status-dot" />
                STATUS // AWAITING RELEASE
              </span>
            </div>
          ) : (
            <div className="challenge-released">
              {problemStatements.map((item) => (
                <article key={item.id}>
                  <span className="eyebrow">{item.domainId}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.url && (
                    <a
                      className="text-link"
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View statement <ArrowUpRight size={16} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
