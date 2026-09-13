import { BookOpen, ShieldCheck } from 'lucide-react'
import { ruleBook } from '../data/rules'
import { eventConfig } from '../data/eventConfig'

export default function RuleBook() {
  return (
    <section id="rules" className="rulebook-section section-pad">
      <div className="rulebook-atmosphere" aria-hidden="true">
        <span className="rulebook-orbit" />
        <span className="rulebook-moon" />
      </div>
      <div className="container rulebook-layout">
        <header className="rulebook-intro">
          <span className="rulebook-icon" aria-hidden="true">
            <BookOpen size={26} strokeWidth={1.35} />
          </span>
          <h2 className="section-heading" data-reveal>
            SAKSHAM:
            <br />
            <span className="cyan">MISSION CONTROL</span>
          </h2>
          <p>Official Flight Manual</p>
          <span className="mono">(Rule Book)</span>
          <ShieldCheck className="rulebook-seal" size={44} strokeWidth={1} aria-hidden="true" />
          <dl className="rulebook-mission-data">
            <div>
              <dt>Online idea pitching</dt>
              <dd>{eventConfig.onlinePitchDateLabel}</dd>
            </div>
            <div>
              <dt>Offline hackathon</dt>
              <dd>{eventConfig.eventDateLabel}</dd>
            </div>
            <div>
              <dt>Reporting</dt>
              <dd>{eventConfig.reportingTime}</dd>
            </div>
          </dl>
        </header>

        <ol className="rulebook-chapters">
          {ruleBook.map((chapter) => (
            <li className="rulebook-chapter" key={chapter.number}>
              <header>
                <span className="rulebook-number">{chapter.number}</span>
                <h3>{chapter.title}</h3>
              </header>
              <ul>
                {chapter.rules.map((rule) => (
                  <li key={rule.label}>
                    <strong>{rule.label}:</strong> {rule.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
