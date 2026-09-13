import { eventConfig as event } from './eventConfig'
import { domains } from './domains'
export const faqs = [
  {
    question: `What is ${event.name}?`,
    answer: `${event.name} is a ${event.duration.toLowerCase().replace(' hours', '-hour')} hardware hackathon where students transform ideas into working physical prototypes.`,
  },
  { question: 'Who can participate?', answer: event.eligibility + '.' },
  {
    question: 'What is the team size?',
    answer: `Teams can consist of ${event.teamSize.toLowerCase()}.`,
  },
  {
    question: 'What is the registration fee?',
    answer:
      'The registration fee for the pitching round is ₹200. Shortlisted teams must pay an additional ₹500 registration fee for the offline round.',
  },
  { question: 'What is the prize pool?', answer: `The total prize pool is ${event.prizePool}.` },
  {
    question: 'What are the official domains?',
    answer: domains.map((domain) => domain.title).join('; ') + '.',
  },
  {
    question: `When is ${event.name}?`,
    answer: `${event.eventDateLabel} at ${event.venue}. The detailed daily schedule will be announced.`,
  },
  {
    question: 'When is the registration deadline?',
    answer: `The last date to register is ${event.registrationDeadline}.`,
  },
  {
    question: 'What hardware should we bring?',
    answer: 'Detailed hardware guidelines will be announced by the organizing team.',
  },
]
