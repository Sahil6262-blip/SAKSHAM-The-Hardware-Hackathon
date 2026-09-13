import test from 'node:test'
import assert from 'node:assert/strict'
import { getCountdown } from '../src/utils/countdown.js'
import { isRegistrationUrlValid } from '../src/utils/registration.js'
import { eventConfig } from '../src/data/eventConfig.js'
import { domains } from '../src/data/domains.js'

test('countdown uses the India calendar date and never returns negative values', () => {
  const start = eventConfig.eventDate
  const end = eventConfig.eventEndDate
  assert.deepEqual(getCountdown(Date.parse('2026-09-30T18:29:59Z'), start, end), {
    status: 'upcoming',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 1,
  })
  assert.equal(getCountdown(Date.parse('2026-09-30T18:30:00Z'), start, end).status, 'live')
  assert.equal(getCountdown(Date.parse('2026-10-01T18:29:59Z'), start, end).status, 'live')
  assert.deepEqual(getCountdown(Date.parse('2026-10-01T18:30:00Z'), start, end), {
    status: 'concluded',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
})
test('Google Form validation accepts form links and rejects placeholders and misleading hosts', () => {
  for (const value of [
    'https://forms.gle/test-form',
    'https://docs.google.com/forms/d/e/example/viewform',
  ])
    assert.equal(isRegistrationUrlValid(value), true)
  for (const value of [
    'PASTE_GOOGLE_FORM_URL_HERE',
    '',
    'javascript:alert(1)',
    'http://forms.gle/example',
    'https://forms.gle.evil.example/x',
    'https://docs.google.com/document/d/example',
    'https://user:password@forms.gle/x',
    'https://forms.gle/',
  ])
    assert.equal(isRegistrationUrlValid(value), false)
})
test('the five official domains and association identity match the event brief', () => {
  assert.deepEqual(eventConfig.association, ['IEEE-SB', 'IETE-SF'])
  assert.equal(eventConfig.prizePool, '₹30,000')
  assert.equal(eventConfig.teamSize, '3–4 Members')
  assert.equal(eventConfig.onlinePitchDateLabel, '24 September 2026')
  assert.equal(eventConfig.reportingTime, '8:00 AM')
  assert.deepEqual(
    eventConfig.contacts.map(({ name, phone }) => ({ name, phone })),
    [
      { name: 'Yash Nikam', phone: '+91 91374 44346' },
      { name: 'Ruchita Kurale', phone: '+91 77740 93453' },
    ],
  )
  assert.deepEqual(
    domains.map((domain) => domain.title),
    [
      'Smart Cities & Urban Innovation',
      'Sustainable & Green Technology',
      'Agriculture & Rural Innovation',
      'Robotics & Automation',
      'Healthcare & Safety Technology',
    ],
  )
  assert.equal(new Set(domains.map((domain) => domain.id)).size, 5)
})
