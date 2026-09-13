import { eventConfig } from '../data/eventConfig'
import { domains } from '../data/domains'
export default function EventMarquee() {
  const items = [
    eventConfig.name,
    eventConfig.duration,
    `${domains.length} domains`,
    eventConfig.teamSize,
    `${eventConfig.prizePool} prize pool`,
    `${eventConfig.registrationFee} registration`,
    eventConfig.eventDateLabel,
    eventConfig.type,
    eventConfig.tagline,
  ]
  return (
    <div className="event-marquee" aria-label="Event highlights">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => (
              <span key={item}>
                <i aria-hidden="true">✳</i>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
