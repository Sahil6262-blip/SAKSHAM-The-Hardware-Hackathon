import { eventConfig } from './eventConfig'
export const timeline = [
  {
    title: 'Assemble your team',
    date: 'Registration',
    description: `Find your ${eventConfig.teamSize.toLowerCase()} and choose a domain.`,
  },
  {
    title: 'Make it official',
    date: eventConfig.registrationDeadline,
    description: 'The last date to register for Saksham.',
    milestone: true,
  },
  {
    title: 'Get set to build',
    date: eventConfig.onlinePitchDateLabel,
    description: 'Explore the domains. Detailed hardware guidelines will be announced.',
  },
  {
    title: 'The circuit comes alive',
    date: eventConfig.eventDateLabel,
    description: `${eventConfig.duration} to ideate, build, test and present your prototype.`,
    milestone: true,
  },
  {
    title: 'Show what you made',
    date: 'Final pitch & winners',
    description: 'Bring your working prototype to the finish line.',
  },
]
