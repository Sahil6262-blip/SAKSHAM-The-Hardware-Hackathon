import { useRef, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import IntroExperience from './components/IntroExperience'
import Hero from './components/Hero'
import EventMarquee from './components/EventMarquee'
import About from './components/About'
import DurationSection from './components/DurationSection'
import Domains from './components/Domains'
import EventStats from './components/EventStats'
import BuildFlow from './components/BuildFlow'
import PrizePool from './components/PrizePool'
import Countdown from './components/Countdown'
import Timeline from './components/Timeline'
import Eligibility from './components/Eligibility'
import RuleBook from './components/RuleBook'
import FAQ from './components/FAQ'
import RegisterCTA from './components/RegisterCTA'
import Footer from './components/Footer'
import useLenis from './hooks/useLenis'
import usePageAnimation from './hooks/usePageAnimation'
import useAmbientVisibility from './hooks/useAmbientVisibility'

export default function App() {
  const page = useRef(null)
  const [entering, setEntering] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  useLenis(!introVisible)
  usePageAnimation(page, entering)
  useAmbientVisibility(page, !introVisible)

  return (
    <MotionConfig reducedMotion="user">
      {introVisible && (
        <IntroExperience
          onEnterStart={() => setEntering(true)}
          onComplete={() => setIntroVisible(false)}
        />
      )}
      <div className="site-shell" aria-hidden={introVisible} inert={introVisible}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navbar />
        <main id="main" ref={page}>
          <Hero active={entering} />
          <Countdown />
          <EventMarquee />
          <About />
          <DurationSection />
          <Domains />
          <EventStats />
          <BuildFlow />
          <PrizePool />
          <Timeline />
          <Eligibility />
          <RuleBook />
          <FAQ />
          <RegisterCTA />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
