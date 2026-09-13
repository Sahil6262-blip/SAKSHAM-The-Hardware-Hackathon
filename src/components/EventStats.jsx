import { eventConfig } from '../data/eventConfig'
import { domains } from '../data/domains'
export default function EventStats() {
  const stats = [
    {
      value: eventConfig.durationHours,
      label: 'Hours to build',
      code: 'BUILD WINDOW',
      count: eventConfig.durationHours,
    },
    {
      value: String(domains.length).padStart(2, '0'),
      label: 'Official domains',
      code: 'MODULES',
      count: domains.length,
    },
    { value: eventConfig.teamSize.split(' ')[0], label: 'Team members', code: 'CREW SIZE' },
    {
      value: `₹${eventConfig.prizeAmount / 1000}K`,
      label: 'Prize pool',
      code: 'REWARD',
      count: eventConfig.prizeAmount / 1000,
      prefix: '₹',
      suffix: 'K',
    },
  ]
  return (
    <section className="stats-section" aria-label="Saksham in numbers">
      <div className="container stats-grid">
        {stats.map((stat, i) => (
          <div className="stat-instrument" key={stat.code}>
            <span className="mono stat-code">
              CH.0{i + 1} / {stat.code}
              <i />
            </span>
            <strong data-count={stat.count} data-prefix={stat.prefix} data-suffix={stat.suffix}>
              {stat.value}
            </strong>
            <span>{stat.label}</span>
            <div className="stat-ruler" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  )
}
