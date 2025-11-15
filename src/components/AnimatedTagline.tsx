'use client'

import { useEffect } from 'react'

export default function AnimatedTagline() {
  useEffect(() => {
    // Import Tweakpane dynamically to avoid SSR issues
    import('tweakpane').then((Tweakpane) => {
      const Pane = Tweakpane.Pane

      const config = {
        theme: 'system',
        delay: 1,
        cross: 2.8,
        crossd: 0,
        dot: 4.4,
        dotd: 0.8,
      }

      const ctrl = new Pane({
        title: 'Animation Config',
        expanded: false,
      })

      const update = () => {
        const root = document.documentElement
        root.dataset.theme = config.theme
        root.style.setProperty('--base-delay', config.delay)
        root.style.setProperty('--cross-delay', config.crossd)
        root.style.setProperty('--cross-speed', config.cross)
        root.style.setProperty('--dot-delay', config.dotd)
        root.style.setProperty('--dot-speed', config.dot)
      }

      const sync = (event: any) => {
        if (
          !document.startViewTransition ||
          event.target.controller.view.labelElement.innerText !== 'Theme'
        )
          return update()
        document.startViewTransition(() => update())
      }

      const timings = ctrl.addFolder({ title: 'timings', expanded: false })
      timings.addBinding(config, 'delay', {
        min: 0,
        max: 5,
        step: 0.01,
        label: 'delay (s)',
      })
      const cross = timings.addFolder({ title: 'cross', expanded: false })
      cross.addBinding(config, 'cross', {
        min: 0.2,
        max: 5,
        step: 0.01,
        label: 'speed (s)',
      })
      cross.addBinding(config, 'crossd', {
        min: 0,
        max: 5,
        step: 0.01,
        label: 'delay (s)',
      })
      const dot = timings.addFolder({ title: 'dot', expanded: false })
      dot.addBinding(config, 'dot', {
        min: 0.2,
        max: 5,
        step: 0.01,
        label: 'speed (s)',
      })
      dot.addBinding(config, 'dotd', {
        min: 0,
        max: 5,
        step: 0.01,
        label: 'delay (s)',
      })
      ctrl.addBinding(config, 'theme', {
        label: 'Theme',
        options: {
          System: 'system',
          Light: 'light',
          Dark: 'dark',
        },
      })

      const tagline = document.querySelector('.tagline')
      const reanimate = () => {
        if (!tagline) return
        const current = tagline.innerHTML
        tagline.innerHTML = ''
        setTimeout(() => {
          tagline.innerHTML = current
        }, 10)
      }

      ctrl.addButton({ title: 'Restart' }).on('click', reanimate)
      ctrl.on('change', sync)
      update()
    })
  }, [])

  return (
    <svg
      className="tagline fluid"
      viewBox="0 0 800 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="textMask">
          <rect width="100%" height="100%" fill="green" />
          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            fontSize="32"
            fontFamily="Chakra Petch, sans-serif"
            fontWeight="700"
            fill="black"
          >
            Detova Labs, Innovation Studio
          </text>
        </mask>
      </defs>

      {/* Background text */}
      <text
        x="50%"
        y="60%"
        textAnchor="middle"
        fontSize="32"
        fontFamily="Chakra Petch, sans-serif"
        fontWeight="700"
        fill="currentColor"
        mask="url(#textMask)"
      >
        Detova Labs, Innovation Studio
      </text>

      {/* Horizontal construct */}
      <g className="construct construct--horizontal">
        <rect
          className="cross"
          x="50"
          y="35"
          width="20"
          height="20"
          fill="currentColor"
        />
        <g className="claw claw--horizontal">
          <path
            d="M30 45L10 35L20 55"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M30 45L10 55L20 35"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="15" cy="45" r="6" fill="#D9D9D9" stroke="currentColor" strokeWidth="3" />
          <line x1="15" y1="35" x2="15" y2="0" stroke="currentColor" strokeWidth="3" />
        </g>
      </g>

      {/* Vertical construct */}
      <g className="construct construct--vertical">
        <rect
          className="dot"
          x="750"
          y="35"
          width="20"
          height="20"
          fill="currentColor"
        />
        <g className="claw claw--vertical">
          <path
            d="M765 25L775 5L755 15"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M765 55L775 75L755 65"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="765" cy="40" r="6" fill="#D9D9D9" stroke="currentColor" strokeWidth="3" />
          <line x1="765" y1="80" x2="765" y2="100" stroke="currentColor" strokeWidth="3" />
        </g>
      </g>
    </svg>
  )
}
