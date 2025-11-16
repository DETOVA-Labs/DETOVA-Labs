"use client"

import React, { useEffect, useRef } from 'react'

type Props = {
  showRestart?: boolean
  baseDelay?: string
  crossSpeed?: string
  crossDelay?: string
  dotSpeed?: string
  dotDelay?: string
  accent?: string
}

export default function BuildingTagline({
  showRestart = false,
  baseDelay = '1s',
  crossSpeed = '2.8s',
  crossDelay = '0s',
  dotSpeed = '4.4s',
  dotDelay = '0.8s',
  accent,
}: Props) {
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const root = headerRef.current || document.documentElement

    root.style.setProperty('--bt-base-delay', baseDelay)
    root.style.setProperty('--bt-cross-speed', crossSpeed)
    root.style.setProperty('--bt-cross-delay', crossDelay)
    root.style.setProperty('--bt-dot-speed', dotSpeed)
    root.style.setProperty('--bt-dot-delay', dotDelay)

    if (accent) {
      root.style.setProperty('--bt-accent', accent)
    }

    const docEl = document.documentElement
    const observer = new MutationObserver(() => {
      if (!accent && headerRef.current) {
        // theme-aware colors
      }
    })

    observer.observe(docEl, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [baseDelay, crossSpeed, crossDelay, dotSpeed, dotDelay, accent])

  const reanimate = () => {
    const header = headerRef.current
    if (!header) return
    const current = header.innerHTML
    header.innerHTML = ''
    requestAnimationFrame(() => {
      header.innerHTML = current
    })
  }

  return (
    <header ref={headerRef} className="building-tagline">
      

      {showRestart && (
        <button type="button" onClick={reanimate} className="sr-only">
          Restart animation
        </button>
      )}
    </header>
  )
}