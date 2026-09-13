import { useId } from 'react'

const paths = [
  'M0 160H130V90H330V210H510',
  'M0 410H230V330H380V270H530',
  'M1200 100H1050V200H830V260H700',
  'M1200 420H1000V350H860V300H720',
  'M340 0V45H480V155H550',
  'M790 600V490H670V370',
]
export default function CircuitBackground({ className = '', animate = false }) {
  const id = useId().replaceAll(':', '')
  return (
    <svg
      className={`circuit-background ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <pattern id={`${id}-grid`} width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" stroke="currentColor" strokeOpacity=".12" strokeWidth=".5" />
          <circle cx="0" cy="0" r="1" fill="currentColor" fillOpacity=".22" />
        </pattern>
      </defs>
      <rect width="1200" height="600" fill={`url(#${id}-grid)`} />
      <g stroke="currentColor" strokeWidth="1" opacity=".3">
        {paths.map((d) => (
          <path d={d} key={d} />
        ))}
        <path
          d="M0 180H150V110H310V230H500M1200 120H1070V220H850V280H730M0 430H250V350H400V290H510M1200 440H980V370H840V320H730"
          opacity=".4"
        />
      </g>
      {animate &&
        paths
          .slice(0, 3)
          .map((d, i) => (
            <path
              key={d}
              d={d}
              className="circuit-pulse"
              stroke="currentColor"
              pathLength="100"
              strokeDasharray="3 97"
              style={{ animationDelay: `${i * -2}s` }}
            />
          ))}
      <g stroke="currentColor" opacity=".5">
        {[
          [130, 160],
          [330, 90],
          [230, 410],
          [380, 330],
          [1050, 100],
          [830, 200],
          [1000, 420],
          [860, 350],
          [480, 45],
          [790, 490],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" />
        ))}
      </g>
    </svg>
  )
}
