import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, ArrowUpRight } from 'lucide-react'
import { faqs } from '../data/faqs'
import useReducedMotion from '../hooks/useReducedMotion'
export default function FAQ() {
  const [open, setOpen] = useState(0)
  const reduced = useReducedMotion()
  return (
    <section id="faq" className="faq-section section-pad">
      <div className="container">
        <p className="eyebrow">09 // FAQ</p>
        <div className="faq-layout">
          <div className="faq-intro">
            <h2 className="section-heading" data-reveal>
              A FEW
              <br />
              CONNECTIONS,
              <br />
              <span className="cyan">CLEARED UP.</span>
            </h2>
            <p>
              Before you plug in,
              <br />
              here’s what you need to know.
            </p>
            <a href="#contact" className="text-link">
              Still have a question? <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div className={`faq-item ${open === i ? 'faq-open' : ''}`} key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={`faq-question-${i}`}
                    aria-expanded={open === i}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    <span className="faq-number mono">{String(i + 1).padStart(2, '0')}</span>
                    <span>{faq.question}</span>
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      aria-labelledby={`faq-question-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.25 }}
                      className="faq-answer"
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
