import { useState } from 'react'
import { BookOpen, Clock3, Download, X } from 'lucide-react'

const templatePath = '/assets/SAKSHAM26_Pitching_Round_PPT_Template.pptx'
const templateFileName = 'SAKSHAM26_Pitching_Round_PPT_Template.pptx'
const rulebookPath = '/assets/SAKSHAM_RULEBOOK.pdf'
const rulebookFileName = 'SAKSHAM_RULEBOOK.pdf'

export default function PitchingTemplateNotice() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <aside
      className="pitching-template-notice"
      aria-labelledby="pitching-template-title"
      aria-live="polite"
    >
      <div className="container">
        <div className="pitching-template-card">
          <button
            className="pitching-template-close"
            type="button"
            aria-label="Dismiss participant resources notification"
            onClick={() => setVisible(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="pitching-template-copy">
            <div className="registration-deadline">
              <Clock3 size={17} aria-hidden="true" />
              <span>REGISTRATION CLOSES TODAY</span>
              <strong>12:00 PM</strong>
            </div>
            <p className="eyebrow">
              <span className="status-dot" />
              PARTICIPANT UPDATE
            </p>
            <h2 id="pitching-template-title">PITCHING ROUND — PPT TEMPLATE RELEASED</h2>
            <p>
              The official PPT template for the SAKSHAM’26 Pitching Round is now available.
              Participants are requested to use this template while preparing their presentation.
            </p>
            <p className="pitching-rulebook-copy">
              The official SAKSHAM’26 Rule Book is also available for participants.
            </p>
          </div>
          <div className="pitching-template-actions">
            <a
              className="button button-filled pitching-template-download"
              href={templatePath}
              download={templateFileName}
            >
              DOWNLOAD PPT TEMPLATE
              <Download size={17} aria-hidden="true" />
            </a>
            <a
              className="button pitching-template-download pitching-rulebook-download"
              href={rulebookPath}
              download={rulebookFileName}
            >
              DOWNLOAD RULE BOOK
              <BookOpen size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
