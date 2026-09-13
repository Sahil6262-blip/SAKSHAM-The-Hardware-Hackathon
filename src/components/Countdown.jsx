import { useEffect, useState } from 'react'
import { eventConfig } from '../data/eventConfig'
import { getCountdown } from '../utils/countdown'

export default function Countdown() {
  const [clock, setClock] = useState(() =>
    getCountdown(Date.now(), eventConfig.eventDate, eventConfig.eventEndDate),
  )
  useEffect(() => {
    const interval = window.setInterval(
      () => setClock(getCountdown(Date.now(), eventConfig.eventDate, eventConfig.eventEndDate)),
      1000,
    )
    return () => window.clearInterval(interval)
  }, [])
  return (
    <section className="countdown-section" aria-label="Countdown to the hackathon">
      <div className="container countdown-layout">
        <div>
          <p className="eyebrow">The countdown is on</p>
          <h2>
            THE NEXT BIG THING
            <br />
            STARTS IN<span className="cyan">.</span>
          </h2>
          <p className="mono muted">{eventConfig.eventDateLabel} / INDIA STANDARD TIME</p>
        </div>
        {clock.status === 'upcoming' ? (
          <div
            className="countdown-display"
            role="timer"
            aria-label={`${clock.days} days, ${clock.hours} hours, ${clock.minutes} minutes until the event date`}
          >
            {[
              [clock.days, 'Days'],
              [clock.hours, 'Hours'],
              [clock.minutes, 'Min'],
              [clock.seconds, 'Sec'],
            ].map(([value, label]) => (
              <div className="countdown-cell" key={label}>
                <strong>{String(value).padStart(2, '0')}</strong>
                <span className="mono">{label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="countdown-event-state" role="status">
            <span className="status-dot" />
            <h3>
              {eventConfig.name}
              <br />
              <span className="cyan">{clock.status === 'live' ? 'IS LIVE' : 'HAS CONCLUDED'}</span>
            </h3>
          </div>
        )}
      </div>
      <p className="container countdown-note">
        Countdown to the event date. The detailed daily schedule will be announced.
      </p>
    </section>
  )
}
