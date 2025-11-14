"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function UtilitiesPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "utilities"
        })
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.code === "DUPLICATE_EMAIL") {
          toast.error("You're already on the waitlist!")
        } else {
          throw new Error(data.error || "Failed to join waitlist")
        }
        return
      }

      toast.success("You're on the list! We'll notify you when our first utility drops.")
      setEmail("")
    } catch (error: any) {
      console.error("Error joining waitlist:", error)
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget
    section.classList.add('section-highlight-active')
    setTimeout(() => {
      section.classList.remove('section-highlight-active')
    }, 600)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section 
        id="utilities-hero"
        className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[var(--off-white)] section-highlightable flex-1 flex items-center justify-center"
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="container mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <Sparkles className="h-16 w-16 text-[var(--acid-lime)] mx-auto mb-6" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Utilities <span className="text-[var(--acid-lime)]">Coming Soon</span>.
          </h1>
          <p className="text-xl text-[var(--deep-grey)] mb-12 leading-relaxed">
            We're building powerful tools for builders. Our team is finalizing which utilities will launch first. Drop your email below and be the first to know when they're ready.
          </p>

          {/* Waitlist Card */}
          <Card className="p-8 bg-white border-2 border-[var(--acid-lime)] max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-grey)]">Join the Waitlist</h2>
            <p className="text-[var(--muted-foreground)] mb-6">
              Get notified the moment our first utility drops.
            </p>
            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)] text-lg h-12"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold text-lg h-12"
              >
                {isSubmitting ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
          </Card>

          <p className="text-[var(--muted-foreground)] text-sm mt-8">
            No spam. Just updates when we ship.
          </p>
        </div>
      </section>
    </div>
  )
}