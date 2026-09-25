import { eventConfig } from '../data/eventConfig'
import { domains } from '../data/domains'
import { isRegistrationUrlValid } from '../utils/registration'
import CircuitBackground from './CircuitBackground'
import RegisterButton from './RegisterButton'
export default function RegisterCTA() {
  return (
    <section id="register" className="register-section section-pad">
      <CircuitBackground className="registration-circuit" />
      <div className="container register-content">
        <p className="eyebrow">
          <span className="status-dot" />
          SYSTEM STATUS // READY
        </p>
        <p className="register-intro">Your circuit starts here.</p>
        <h2 data-reveal>
          READY
          <br />
          TO <span className="cyan">BUILD?</span>
        </h2>
        <p className="register-manifesto">
          {eventConfig.duration}. {domains.length} domains. One prototype.
        </p>
        <RegisterButton className="button-filled register-final" />
        <div className="register-details mono">
          <span>{eventConfig.registrationFee} registration</span>
          <span>Closed {eventConfig.registrationDeadline}</span>
        </div>
        <p className="register-status mono">
          {eventConfig.name} /{' '}
          {!eventConfig.registrationOpen
            ? 'REGISTRATION // CLOSED'
            : isRegistrationUrlValid(eventConfig.registrationUrl)
            ? 'REGISTRATION // ONLINE'
            : 'REGISTRATION LINK // COMING SOON'}
        </p>
      </div>
    </section>
  )
}
