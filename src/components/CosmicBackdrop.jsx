import { useLayoutEffect, useRef } from 'react'
import useReducedMotion from '../hooks/useReducedMotion'

const stars = Array.from({ length: 65 }, (_, i) => ({
  left: `${((i * 73.37 + 13) % 100).toFixed(2)}%`,
  top: `${((i * 37.81 + 7) % 100).toFixed(2)}%`,
  opacity: 0.15 + (i % 5) * 0.12,
  width: i % 9 === 0 ? 2 : 1,
  height: i % 9 === 0 ? 2 : 1,
}))

export default function CosmicBackdrop({ variant = 'hero', active = true }) {
  const root = useRef(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    const element = root.current
    const parent = element.parentElement
    let inView = false
    const update = () => {
      const running = active && !reduced && inView && !document.hidden
      element.dataset.ambient = running ? 'running' : 'paused'
      parent.dataset.ambient = running ? 'running' : 'paused'
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    update()
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      delete parent.dataset.ambient
    }
  }, [active, reduced])

  return (
    <div ref={root} className={`cosmic-backdrop cosmic-backdrop-${variant}`} aria-hidden="true">
      <div className="cosmic-depth">
        <div className="cosmic-environment" />
        <div className="cosmic-nebula" />
        <div className="cosmic-stars cosmic-stars-far">
          {stars.map((style, index) => (
            <i key={index} style={style} />
          ))}
        </div>
        <div className="cosmic-stars cosmic-stars-near">
          {stars
            .filter((_, index) => index % 4 === 0)
            .map((style, index) => (
              <i
                key={index}
                style={{ ...style, left: `${(index * 47.3 + 8) % 100}%`, width: 2, height: 2 }}
              />
            ))}
        </div>
        <div className="cosmic-streak" />
        <div className="cosmic-parallax">
          <div className="cosmic-planet" />
          <div className="cosmic-orbit cosmic-orbit-one" />
          <div className="cosmic-orbit cosmic-orbit-two" />
          <div className="cosmic-moon" />
          <svg className="cosmic-satellite" viewBox="0 0 240 150" fill="none">
            <path d="M102 77L53 45M129 88L175 117" stroke="#9b92b3" strokeWidth="3" />
            <path d="M27 11L89 48L61 91L0 54Z" fill="#17172f" stroke="#8883a2" />
            <path
              d="M32 27L77 53M23 41L68 67M14 54L59 81M47 24L20 67M68 37L40 80"
              stroke="#776599"
              strokeOpacity=".6"
            />
            <path d="M180 76L240 113L213 150L154 115Z" fill="#17172f" stroke="#8883a2" />
            <path
              d="M180 90L228 117M171 103L220 130M200 89L174 126M218 100L192 139"
              stroke="#776599"
              strokeOpacity=".6"
            />
            <path d="M112 54L143 72L120 111L89 92Z" fill="#302e43" stroke="#c4bacf" />
            <path
              d="M112 54L123 47L154 65L143 72M154 65V83L120 111"
              fill="#716779"
              stroke="#c4bacf"
            />
            <path
              d="M106 66L132 80M101 75L126 89M97 85L121 98"
              stroke="#a492b0"
              strokeOpacity=".4"
            />
            <path
              d="M122 49L128 27M117 24Q131 13 144 30Q129 40 117 24Z"
              fill="#494057"
              stroke="#d7c9dc"
            />
            <circle cx="128" cy="27" r="2" fill="#ffd4b3" />
          </svg>
        </div>
        <div className="cosmic-horizon" />
      </div>
      <div className="cosmic-shade" />
    </div>
  )
}
