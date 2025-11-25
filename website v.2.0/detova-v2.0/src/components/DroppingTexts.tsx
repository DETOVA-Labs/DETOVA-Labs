'use client'

import { useEffect, useRef } from 'react'

export default function DroppingTexts() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Get CSS custom properties
    const getCSSVar = (name: string) => {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
    }

    const acidLime = getCSSVar('--acid-lime') || '#BEF264'
    const carbon = getCSSVar('--carbon') || '#111111'
    const offWhite = getCSSVar('--off-white') || '#F5F5F5'

    // Text configuration
    const texts = [
      'Innovation',
      'Web3',
      'AI',
      'Blockchain',
      'Development',
      'Design',
      'Technology',
      'Future'
    ]

    class DroppingText {
      x: number
      y: number
      text: string
      speed: number
      opacity: number
      size: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = -50
        this.text = texts[Math.floor(Math.random() * texts.length)]
        this.speed = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.3
        this.size = Math.random() * 20 + 14
        this.color = Math.random() > 0.5 ? acidLime : carbon
      }

      update() {
        this.y += this.speed
        if (this.y > canvas.height + 50) {
          this.reset()
        }
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = -50
        this.speed = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.3
        this.size = Math.random() * 20 + 14
        this.color = Math.random() > 0.5 ? acidLime : carbon
      }

      draw() {
        if (!ctx) return

        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.font = `${this.size}px 'Inter', sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(this.text, this.x, this.y)
        ctx.restore()
      }
    }

    // Create text instances
    const droppingTexts: DroppingText[] = []
    const textCount = 15

    for (let i = 0; i < textCount; i++) {
      droppingTexts.push(new DroppingText())
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Clear canvas with slight trail effect
      ctx.fillStyle = `rgba(245, 245, 245, 0.1)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw texts
      droppingTexts.forEach(text => {
        text.update()
        text.draw()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  )
}
