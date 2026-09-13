import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Cpu } from 'lucide-react'
import RegisterButton from './RegisterButton'
import { eventConfig } from '../data/eventConfig'

const links = ['Home', 'About', 'Domains', 'Timeline', 'Prizes', 'Rules', 'FAQ', 'Contact']
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const menuButton = useRef(null)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-15% 0px -55% 0px' },
    )
    links.forEach((label) => {
      const section = document.getElementById(label.toLowerCase())
      if (section) observer.observe(section)
    })
    return () => {
      window.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])
  useEffect(() => {
    const close = (event) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const resize = () => {
      if (window.innerWidth > 1100) setOpen(false)
    }
    window.addEventListener('keydown', close)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('keydown', close)
      window.removeEventListener('resize', resize)
    }
  }, [open])
  return (
    <header className={`navbar ${scrolled || open ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a
          href="#home"
          className="brand"
          aria-label={`${eventConfig.name} home`}
          onClick={() => setOpen(false)}
        >
          <Cpu size={25} strokeWidth={1.4} aria-hidden="true" />
          <span>
            SAKSHAM<span className="cyan">’26</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className={active === label.toLowerCase() ? 'active' : ''}
              aria-current={active === label.toLowerCase() ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <RegisterButton className="nav-register" />
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
          >
            {links.map((label, i) => (
              <a key={label} href={`#${label.toLowerCase()}`} onClick={() => setOpen(false)}>
                <span className="mono">0{i + 1}</span>
                {label}
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
