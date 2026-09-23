import { useId } from 'react'
import '../styles/hardware.css'

const routes = [
  'M195 130V40H350V5',
  'M265 175H355V80H400',
  'M230 260V315H370V350',
  'M115 195H55V290H0',
  'M110 135H30V45H0',
  'M155 255V340H60V375',
]
export default function HardwareScene({ className = '' }) {
  const id = useId().replaceAll(':', '')
  const url = (name) => `url(#${id}-${name})`
  return (
    <div className={`hardware-scene ${className}`} aria-hidden="true">
      <svg viewBox="0 0 760 475" fill="none">
        <defs>
          <linearGradient
            id={`${id}-board`}
            x1="0"
            y1="0"
            x2="400"
            y2="380"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#29202a" />
            <stop offset=".5" stopColor="#161117" />
            <stop offset="1" stopColor="#201921" />
          </linearGradient>
          <linearGradient
            id={`${id}-chip`}
            x1="80"
            y1="80"
            x2="260"
            y2="245"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#514a53" />
            <stop offset=".18" stopColor="#2e272f" />
            <stop offset=".65" stopColor="#151015" />
            <stop offset="1" stopColor="#2f2731" />
          </linearGradient>
          <linearGradient id={`${id}-metal`}>
            <stop stopColor="#6a616a" />
            <stop offset=".4" stopColor="#c6c0c8" />
            <stop offset=".7" stopColor="#615a62" />
            <stop offset="1" stopColor="#2c252c" />
          </linearGradient>
          <radialGradient id={`${id}-aura`}>
            <stop stopColor="#bf9ac1" stopOpacity=".2" />
            <stop offset="1" stopColor="#bf9ac1" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" stroke="#6e6175" strokeOpacity=".12" strokeWidth=".6" />
          </pattern>
        </defs>
        <ellipse cx="382" cy="263" rx="310" ry="193" fill={url('aura')} />
        <g className="hardware-board">
          <g transform="matrix(.88 .43 -.88 .43 375 52)">
            <path
              d="M0 0H410V380H0Z"
              transform="translate(11 11)"
              fill="#0e0a0e"
              stroke="#483f4c"
            />
            <path d="M0 380H410L421 391H11Z" fill="#261f28" stroke="#483d4d" />
            <path d="M410 0V380L421 391V11Z" fill="#1a141b" stroke="#463d49" />
            <path d="M0 0H410V380H0Z" fill={url('board')} stroke="#6f6275" strokeWidth="1.5" />
            <path d="M10 10H400V370H10Z" stroke="#504457" strokeWidth=".8" />
            <rect width="410" height="380" fill={url('grid')} />
            <g stroke="#5d5164" strokeWidth="1.5">
              {routes.map((d) => (
                <path key={d} d={d} />
              ))}
              <path d="M205 130V50H340V0M275 185H365V90H410M240 270V305H380V380M105 185H45V280H0M100 125H40V55H0M145 265V350H50V380" />
              <path
                d="M285 225H385V190H410M275 235H375V200H410M95 245H75V355H0M180 100V25H90V0"
                strokeOpacity=".55"
              />
            </g>
            <g stroke="#b89cc1" strokeWidth="1.5" opacity=".7">
              {routes
                .filter((_, i) => i % 2 === 0)
                .map((d) => (
                  <path key={d} d={d} />
                ))}
            </g>
            <g stroke="#e2d2e3" strokeWidth="2.5">
              {routes.slice(0, 4).map((d, i) => (
                <g key={d}>
                  <path
                    className="hardware-pulse hardware-pulse-glow"
                    d={d}
                    pathLength="100"
                    strokeDasharray="12 88"
                    style={{ animationDelay: `${-i * 1.25}s` }}
                  />
                  <path
                    className="hardware-pulse hardware-pulse-core"
                    d={d}
                    pathLength="100"
                    strokeDasharray="12 88"
                    style={{ animationDelay: `${-i * 1.25}s` }}
                  />
                </g>
              ))}
            </g>
            {[
              [20, 20],
              [390, 20],
              [20, 360],
              [390, 360],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="8" fill="#110d11" stroke="#726a78" strokeWidth="3" />
                <circle cx={x} cy={y} r="3" fill="#080507" />
              </g>
            ))}
            {[
              [55, 290],
              [355, 80],
              [350, 40],
              [230, 315],
              [30, 45],
              [155, 340],
              [385, 190],
            ].map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="4" fill="#0f0a0f" stroke="#ae9ebd" />
                <circle cx={x} cy={y} r="1.5" fill="#e0cfe2" />
              </g>
            ))}
            <g className="hardware-small-details" fill={url('metal')}>
              {Array.from({ length: 8 }, (_, i) => (
                <g key={i}>
                  <rect x={305 + i * 9} y="330" width="4" height="17" />
                  <rect x="24" y={105 + i * 9} width="17" height="4" />
                </g>
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <g key={i}>
                  <rect x={305 + i * 18} y="122" width="9" height="22" rx="1" />
                  <rect x={305 + i * 18} y="127" width="9" height="12" fill="#262025" />
                </g>
              ))}
            </g>
            <g transform="translate(35 235)">
              <path d="M0 0H60V48H0Z" fill="#150f14" stroke="#6f6275" />
              <path d="M5 5H55V43H5Z" fill="#231a23" stroke="#423847" />
              <path d="M8 26H17L21 19L27 34L35 10L40 26H52" stroke="#ccb0cf" strokeWidth="1.5" />
              <text x="6" y="60" fill="#968a9f" fontSize="7">
                SIGNAL_MONITOR
              </text>
            </g>
            <g transform="translate(292 37)">
              <rect width="60" height="42" fill="#140f14" stroke="#685e6b" />
              {Array.from({ length: 5 }, (_, i) => (
                <g key={i}>
                  <path
                    d={`M${8 + i * 10} -8V0M${8 + i * 10} 42V50`}
                    stroke={url('metal')}
                    strokeWidth="4"
                  />
                </g>
              ))}
              <text x="12" y="25" fill="#b1a7b4" fontSize="11">
                IO_26
              </text>
            </g>
            <g transform="translate(302 264)">
              <rect width="53" height="35" fill="#181218" stroke="#695d6e" />
              <circle cx="15" cy="17" r="8" stroke="#908598" />
              <circle cx="37" cy="17" r="8" stroke="#908598" />
              <circle cx="15" cy="17" r="4" fill="#403544" />
              <circle cx="37" cy="17" r="4" fill="#403544" />
            </g>
            <rect
              x="105"
              y="100"
              width="180"
              height="180"
              fill="#c8aacb"
              opacity=".14"
              filter={url('glow')}
            />
            <rect
              x="105"
              y="100"
              width="180"
              height="180"
              fill="#130f14"
              stroke="#b298bf"
              strokeWidth="2"
            />
            <g stroke={url('metal')} strokeWidth="5">
              {Array.from({ length: 13 }, (_, i) => (
                <path
                  key={i}
                  d={`M${120 + i * 12} 82V104M${120 + i * 12} 278V298M85 ${116 + i * 12}H107M283 ${116 + i * 12}H305`}
                />
              ))}
            </g>
            <path d="M80 72H260V252L285 280H105V100Z" fill="#201920" stroke="#655a6b" />
            <path d="M260 72V252L285 280V100Z" fill="#2d2630" stroke="#605664" />
            <path d="M80 252H260L285 280H105Z" fill="#140f14" stroke="#594e5e" />
            <path d="M80 72H260V252H80Z" fill={url('chip')} stroke="#b1a7b6" strokeWidth="1.3" />
            <path d="M89 81H251V243H89Z" stroke="#675c6d" />
            <path d="M98 90H242V234H98Z" fill="#140f15" stroke="#c4a2c6" strokeWidth="1" />
            <path
              d="M98 110V90H118M222 90H242V110M98 214V234H118M222 234H242V214"
              stroke="#e3d3e4"
              strokeWidth="3"
            />
            <text
              x="117"
              y="164"
              fill="#f6f2f7"
              fontSize="48"
              fontWeight="700"
              className="chip-title"
            >
              S’26
            </text>
            <path d="M119 183H221" stroke="#71607b" />
            <text x="124" y="200" fill="#c3aecc" fontSize="8" letterSpacing="2">
              SAKSHAM CORE
            </text>
            <circle cx="112" cy="105" r="4" fill="#f8dcff" className="hardware-led" />
            <text x="48" y="335" fill="#877b8f" fontSize="8" letterSpacing="2">
              SAKSHAM / MAINBOARD REV.26
            </text>
            <text x="290" y="220" fill="#877b8f" fontSize="7">
              EXTC_VCET
            </text>
          </g>
        </g>
        <g
          className="hardware-annotations"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="1"
        >
          <path d="M399 122L475 58H627" stroke="#544959" />
          <circle cx="399" cy="122" r="3" fill="#c4a2c6" />
          <text x="501" y="47" fill="#a096a3">
            CORE_26 / INITIALIZED
          </text>
          <text x="501" y="71" fill="#6a5f70">
            12HR COMPUTE WINDOW
          </text>
          <path d="M223 288H118L86 319H28" stroke="#544959" />
          <circle cx="223" cy="288" r="3" fill="#c4a2c6" />
          <text x="29" y="339" fill="#a096a3">
            SIGNAL // STABLE
          </text>
          <path d="M502 312H636V345" stroke="#544959" />
          <text x="555" y="365" fill="#a096a3">
            6 MODULES CONNECTED
          </text>
          <path d="M220 413H515M220 408V418M515 408V418" stroke="#423a46" />
          <text x="306" y="434" fill="#7f7583">
            ENGINEERED TO CREATE.
          </text>
        </g>
      </svg>
    </div>
  )
}
