import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Rocket, X } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'

export default function ResultsAnnouncement() {
  const dialog = useRef(null)
  const scrollToResultsAfterClose = useRef(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!visible || !dialog.current) return undefined

    if (!dialog.current.open) dialog.current.showModal()
  }, [visible])

  const close = () => {
    if (dialog.current?.open) dialog.current.close()
    else setVisible(false)
  }

  const viewResults = () => {
    scrollToResultsAfterClose.current = true
    close()
  }

  const handleClosed = () => {
    setVisible(false)
    if (!scrollToResultsAfterClose.current) return

    scrollToResultsAfterClose.current = false
    requestAnimationFrame(() => {
      document.querySelector('#results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  if (!visible) return null

  return (
    <dialog
      ref={dialog}
      className="results-announcement-dialog"
      aria-labelledby="results-announcement-title"
      aria-describedby="results-announcement-copy"
      onCancel={(event) => {
        event.preventDefault()
        close()
      }}
      onClose={handleClosed}
      onMouseDown={(event) => {
        if (event.target === dialog.current) close()
      }}
    >
      <div className="results-announcement-card">
        <button
          className="results-announcement-close"
          type="button"
          aria-label="Close results announcement"
          onClick={close}
          autoFocus
        >
          <X size={19} aria-hidden="true" />
        </button>
        <span className="results-announcement-icon" aria-hidden="true">
          <Rocket size={25} strokeWidth={1.5} />
        </span>
        <p className="eyebrow">MISSION UPDATE</p>
        <h2 id="results-announcement-title">PITCHING ROUND RESULTS ARE OUT 🚀</h2>
        <p id="results-announcement-copy">
          20 shortlisted teams have successfully completed the Pre-Launch Briefing — our Online
          Pitching Round — and are now cleared for the Launch Pad, where the Offline Hardware
          Hackathon begins.
        </p>
        <div className="results-announcement-actions">
          <button className="button button-filled" type="button" onClick={viewResults}>
            VIEW RESULTS <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <a
            className="button"
            href={eventConfig.finalRoundRegistrationUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            FINAL ROUND REGISTRATION <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </dialog>
  )
}
