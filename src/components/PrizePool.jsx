import { ArrowUpRight, Trophy } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'

export default function PrizePool() {
  return (
    <section id="prizes" className="prize-section section-pad">
      <div className="container">

        <div className="section-topline">
          <p className="eyebrow">05 // Reward output</p>

          <span className="mono">
            <Trophy size={14} aria-hidden="true" />
            BUILT FOR THE BREAKTHROUGH
          </span>
        </div>

        <div className="prize-layout">

          <div className="prize-main">

            <span className="mono muted">
              BIG IDEAS. REAL REWARDS.
            </span>

            <h2
              className="prize-value"
              aria-label={`${eventConfig.prizePool} prize pool`}
            >
              <span
                data-count={eventConfig.prizeAmount}
                data-prefix="₹"
              >
                {eventConfig.prizePool}
              </span>
            </h2>

            <span className="prize-label">
              PRIZE POOL
            </span>

            <div
              className="prize-meter"
              aria-hidden="true"
            />

            <p>
              A little ingenuity can go a long way.
            </p>

          </div>

          <div className="prize-side">

            <div>

              <span className="mono">
                REGISTRATION FEE
              </span>

              <strong>
                {eventConfig.registrationFee}

                <ArrowUpRight
                  size={30}
                  strokeWidth={1}
                  aria-hidden="true"
                />
              </strong>

              <span
                className="mono muted"
                style={{
                  display: 'block',
                  marginTop: '8px',
                  fontSize: '0.72rem',
                  lineHeight: '1.4',
                }}
              >
                {eventConfig.registrationFee} for Online Pitching Round only
              </span>

            </div>

            <div className="prize-detail">
              <span>Team size</span>
              <strong>{eventConfig.teamSize}</strong>
            </div>

            <div className="prize-detail">
              <span>Build window</span>
              <strong>{eventConfig.duration}</strong>
            </div>

            <a
              href="#register"
              className="text-link"
            >
              Your next move starts here
              <ArrowUpRight size={17} />
            </a>

          </div>

        </div>

      </div>
    </section>
  )
}