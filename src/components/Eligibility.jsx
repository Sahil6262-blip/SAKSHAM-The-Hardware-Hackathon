import { GraduationCap, Users, Ticket } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'
export default function Eligibility() {
  return (
    <section className="eligibility-section section-pad">
      <div className="container">
        <p className="eyebrow">07 // Access</p>
        <div className="eligibility-heading">
          <h2 className="section-heading" data-reveal>
            GOT THE CURIOSITY?
            <br />
            <span className="cyan">YOU’RE IN.</span>
          </h2>
          <p>
            Who can participate?
            <br />
            An open invitation to the builders.
          </p>
        </div>
        <div className="eligibility-panels">
          {[
            [GraduationCap, 'Eligibility', eventConfig.eligibility],
            [Users, 'Team size', eventConfig.teamSize],
            [Ticket, 'Registration fee', eventConfig.registrationFee],
          ].map(([Icon, label, value]) => (
            <div className="eligibility-panel" key={label}>
              <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
              <span className="mono">{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
