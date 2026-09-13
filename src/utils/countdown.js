export function getCountdown(now, start, end) {
  const remaining = Math.max(0, new Date(start).getTime() - now)
  return {
    status: now >= new Date(end).getTime() ? 'concluded' : remaining === 0 ? 'live' : 'upcoming',
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  }
}
