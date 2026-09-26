import { motion } from 'framer-motion'
import { ArrowUpRight, CalendarDays, Check, Clock3, IndianRupee } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'
import { shortlistedTeams } from '../data/shortlistedTeams'
import '../styles/results.css'

const resultStatement =
  '20 shortlisted teams have successfully completed the Pre-Launch Briefing — our Online Pitching Round — and are now cleared for the Launch Pad, where the Offline Hardware Hackathon begins.'

export default function Results() {
  return (
    <section id="results" className="results-section section-pad">
      <div className="results-orbit" aria-hidden="true" />
      <div className="container">
        <div className="section-topline">
          <p className="eyebrow">PITCHING ROUND RESULTS</p>
          <span className="mono muted">PHASE 1 COMPLETE</span>
        </div>

        <div className="results-hero">
          <h2 className="section-heading" data-reveal>
            TOP 20
            <br />
            <span className="cyan">SHORTLISTED TEAMS</span>
          </h2>
          <p>{resultStatement} 🚀</p>
        </div>

        <div className="results-phase-one">
          <div>
            <p className="mono">PHASE 1 — PRE-LAUNCH BRIEFING</p>
            <h3>Online Idea Pitching has been successfully conducted.</h3>
            <p>{resultStatement}</p>
          </div>
          <span className="results-complete-status">
            COMPLETED <Check size={18} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </div>

        <div className="shortlisted-team-grid" aria-label="Top 20 shortlisted teams">
          {shortlistedTeams.map((team, index) => (
            <motion.article
              className="shortlisted-team-card"
              key={team.rank}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: (index % 4) * 0.055 }}
            >
              <span>{String(team.rank).padStart(2, '0')}</span>
              <h3>{team.name}</h3>
            </motion.article>
          ))}
        </div>

        <div className="final-round-panel">
          <div className="final-round-heading">
            <div>
              <p className="eyebrow">PHASE 2 — CLEARANCE FOR ASSEMBLY</p>
              <span className="mono final-round-status">PAYMENT &amp; CONFIRMATION</span>
            </div>
            <h2>
              SECURE YOUR SPOT
              <br />
              <span>IN THE FINAL ROUND!</span>
            </h2>
          </div>

          <div className="final-round-details">
            <article>
              <CalendarDays size={22} aria-hidden="true" />
              <span>FINAL ROUND</span>
              <strong>1 October 2026</strong>
            </article>
            <article className="final-round-fee">
              <IndianRupee size={22} aria-hidden="true" />
              <span>FINAL ROUND FEE</span>
              <strong>₹500 per team</strong>
            </article>
            <article className="final-round-deadline">
              <Clock3 size={22} aria-hidden="true" />
              <span>PAYMENT DEADLINE</span>
              <strong>28 September 2026</strong>
              <b>11:59 PM</b>
            </article>
          </div>

          <p className="final-round-instruction">
            All shortlisted teams are required to complete the Final Round Registration Form before
            the deadline.
          </p>

          <div className="final-round-requirements">
            <div>
              <p className="mono">THE FINAL ROUND FORM WILL REQUIRE:</p>
              <ul>
                <li>Team details</li>
                <li>
                  Microcontroller required for the final round
                  <span>Arduino / ESP32</span>
                </li>
                <li>Payment screenshot of the ₹500 registration fee</li>
              </ul>
            </div>
            <p className="final-round-warning">
              Please make sure to complete the form and upload the payment screenshot before the
              deadline to confirm your participation in the Final Round.
            </p>
          </div>

          <a
            className="button button-filled final-round-register"
            href={eventConfig.finalRoundRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            COMPLETE FINAL ROUND REGISTRATION
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
