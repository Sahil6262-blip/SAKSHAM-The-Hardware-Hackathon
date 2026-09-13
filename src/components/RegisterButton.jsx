import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, X, Radio } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'
import { isRegistrationUrlValid } from '../utils/registration'

export default function RegisterButton({ children = 'Register now', className = '', onClick }) {
  const dialog = useRef(null)
  const valid = isRegistrationUrlValid(eventConfig.registrationUrl)
  const contents = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
    </>
  )
  if (valid)
    return (
      <a
        className={`button register-button ${className}`}
        href={eventConfig.registrationUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {contents}
      </a>
    )
  return (
    <>
      <button
        className={`button register-button ${className}`}
        type="button"
        onClick={() => {
          onClick?.()
          dialog.current?.showModal()
        }}
      >
        {contents}
      </button>
      {createPortal(
        <dialog
          className="registration-dialog"
          ref={dialog}
          aria-label="Registration update"
          onClick={(e) => {
            if (e.target === dialog.current) dialog.current.close()
          }}
        >
          <div className="dialog-content">
            <button
              className="dialog-close"
              type="button"
              aria-label="Close registration update"
              onClick={() => dialog.current.close()}
              autoFocus
            >
              <X size={22} />
            </button>
            <Radio className="cyan" size={32} aria-hidden="true" />
            <p className="eyebrow">Your next great build awaits</p>
            <h2>
              Get ready for
              <br />
              <span className="cyan">{eventConfig.name}.</span>
            </h2>
            <p>
              The registration link is coming soon. Contact the organizing team for registration
              updates.
            </p>
            <p className="dialog-deadline">
              Registration deadline <strong>{eventConfig.registrationDeadline}</strong>
            </p>
            <a
              href="#contact"
              className="button button-filled"
              onClick={() => dialog.current.close()}
            >
              Contact the team <ArrowUpRight size={18} />
            </a>
          </div>
        </dialog>,
        document.body,
      )}
    </>
  )
}
