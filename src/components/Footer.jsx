import { ArrowUpRight, Phone, MapPin, Radio, ArrowUp } from 'lucide-react'
import { eventConfig } from '../data/eventConfig'
import InstitutionalLogo from './InstitutionalLogo'
import CircuitBackground from './CircuitBackground'
import RegisterButton from './RegisterButton'
import '../styles/details.css'

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <CircuitBackground />
      <div className="container">
        <div className="contact-heading">
          <div>
            <p className="eyebrow">10 // Stay connected</p>
            <h2>
              GOOD BUILDS START
              <br />
              WITH A <span className="cyan">CONVERSATION.</span>
            </h2>
          </div>
          <a href="#home" className="back-to-top" aria-label="Back to top">
            <ArrowUp size={23} strokeWidth={1.3} />
          </a>
        </div>
        <div className="footer-contact-grid">
          <div>
            <span className="mono footer-label">
              <Phone size={14} />
              THE ORGANIZING TEAM
            </span>
            {eventConfig.contacts.map((contact) => (
              <a className="contact-person" key={contact.name} href={`tel:${contact.tel}`}>
                <span>
                  {contact.name}
                  <span>{contact.phone}</span>
                </span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ))}
          </div>
          <div>
            <span className="mono footer-label">
              <MapPin size={14} />
              FIND THE CIRCUIT
            </span>
            <p className="footer-college">{eventConfig.college}</p>
            <p className="footer-address">{eventConfig.address}</p>
          </div>
          <div>
            <span className="mono footer-label">
              <Radio size={14} />
              FOLLOW THE SIGNAL
            </span>
            {eventConfig.socials.map((social) =>
              social.url ? (
                <a
                  key={social.handle}
                  className="footer-social"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.handle}
                  <ArrowUpRight size={16} />
                </a>
              ) : (
                <p className="footer-social" key={social.handle}>
                  {social.handle}
                </p>
              ),
            )}
          </div>
        </div>
        <div className="footer-main">
          <div>
            <a className="footer-brand" href="#home">
              SAKSHAM<span className="cyan">’26</span>
            </a>
            <p className="mono footer-tagline">{eventConfig.tagline}</p>
            <p className="footer-department">{eventConfig.department}</p>
            <div className="footer-logos">
              <InstitutionalLogo name="VCET" file="vcet-logo.png" />
              <InstitutionalLogo name={eventConfig.association[0]} file="ieee-logo.png" />
              <span className="muted">×</span>
              <InstitutionalLogo name={eventConfig.association[1]} file="iete-logo.png" />
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            {['Home', 'About', 'Domains', 'Timeline', 'Prizes', 'Rules', 'FAQ'].map((label) => (
              <a href={`#${label.toLowerCase()}`} key={label}>
                {label}
              </a>
            ))}
            <RegisterButton className="footer-register">Register</RegisterButton>
          </nav>
        </div>
        <div className="footer-bottom mono">
          <span>
            {eventConfig.name} / {eventConfig.association.join(' × ')}
          </span>
          <span>
            <span className="status-dot" />
            SAKSHAM_CORE // SYSTEM ONLINE
          </span>
          <span>MADE FOR THE MAKERS.</span>
        </div>
      </div>
    </footer>
  )
}
