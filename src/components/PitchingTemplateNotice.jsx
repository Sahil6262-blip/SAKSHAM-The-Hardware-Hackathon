import { useState } from 'react'
import { Download, X } from 'lucide-react'

const templatePath = '/assets/SAKSHAM26_Pitching_Round_PPT_Template.pptx'
const templateFileName = 'SAKSHAM26_Pitching_Round_PPT_Template.pptx'

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
            aria-label="Dismiss pitching round template notification"
            onClick={() => setVisible(false)}
          >
            <X size={18} aria-hidden="true" />
          </button>
          <div className="pitching-template-copy">
            <p className="eyebrow">
              <span className="status-dot" />
              PARTICIPANT UPDATE
            </p>
            <h2 id="pitching-template-title">PITCHING ROUND — PPT TEMPLATE RELEASED</h2>
            <p>
              The official PPT template for the SAKSHAM’26 Pitching Round is now available.
              Participants are requested to use this template while preparing their presentation.
            </p>
          </div>
          <a
            className="button button-filled pitching-template-download"
            href={templatePath}
            download={templateFileName}
          >
            DOWNLOAD PPT TEMPLATE
            <Download size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  )
}
