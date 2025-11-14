"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Award, DollarSign, Zap, Users } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function InternshipPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    skills: "",
    portfolio: "",
    why: "",
    availability: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const benefits = [
    {
      icon: Award,
      title: "On-Chain Proof",
      subtitle: "Contributor NFT",
      description: "Verifiable proof of your work minted on-chain. Your portfolio, but permanent."
    },
    {
      icon: DollarSign,
      title: "Real Revenue",
      subtitle: "Deferred Rev-Share",
      description: "Earn a share of the revenue from products you help build. Not promises—contracts."
    },
    {
      icon: Zap,
      title: "Full Access",
      subtitle: "Internal AI Tools",
      description: "Use the same cutting-edge tools our core team uses to ship faster."
    },
    {
      icon: Users,
      title: "Direct Mentorship",
      subtitle: "C-Suite Access",
      description: "Work directly with founders. No middle managers. Just building."
    }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.skills.trim()) newErrors.skills = "Skills are required"
    if (!formData.portfolio.trim()) {
      newErrors.portfolio = "Portfolio URL is required"
    } else {
      try {
        new URL(formData.portfolio)
      } catch {
        newErrors.portfolio = "Invalid URL format"
      }
    }
    if (!formData.why.trim()) newErrors.why = "This field is required"
    if (!formData.availability.trim()) newErrors.availability = "Availability is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the form errors")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/internship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit")
      }

      toast.success("Application submitted successfully! We'll review and get back to you soon.")
      setFormData({ 
        name: "", 
        email: "", 
        location: "", 
        skills: "", 
        portfolio: "", 
        why: "", 
        availability: "" 
      })
      setErrors({})
    } catch (error: any) {
      console.error("Error submitting application:", error)
      toast.error(error.message || "Failed to submit application. Please try again.")
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
    <div className="flex flex-col">
      {/* Hero */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[var(--off-white)] section-highlightable"
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Build Your Future. <span className="text-[var(--acid-lime)]">Ship Our Products</span>.
          </h1>
          <p className="text-xl text-[var(--deep-grey)]">
            The Detova Labs Internship is a 4-month, remote program where you don't learn about work—you do the work.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 section-highlightable"
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">
            The <span className="text-[var(--acid-lime)]">"Golden"</span> Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-8 bg-white border-[var(--border-color)] hover:border-[var(--acid-lime)] transition-colors">
                <benefit.icon className="h-12 w-12 text-[var(--acid-lime)] mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-[var(--deep-grey)]">{benefit.title}</h3>
                <p className="text-[var(--acid-lime)] text-sm mb-4 mono">{benefit.subtitle}</p>
                <p className="text-[var(--deep-grey)]">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--off-white)] section-highlightable"
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Applications for Cohort <span className="text-[var(--acid-lime)]">[005]</span> are Open.
          </h2>
          <p className="text-[var(--deep-grey)] text-center mb-8">
            We're looking for builders who ship, not theorists who talk.
          </p>

          <Card className="p-8 bg-white border-[var(--border-color)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Full Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Location (City, Country) *
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder=""
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.location}
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Key Skills (comma separated) *
                </label>
                <Input
                  id="skills"
                  type="text"
                  placeholder="e.g., React, TypeScript, Solidity"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.skills}
                />
                {errors.skills && <p className="text-red-500 text-sm mt-1">{errors.skills}</p>}
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Portfolio / GitHub *
                </label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.portfolio}
                />
                {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio}</p>}
              </div>

              <div>
                <label htmlFor="why" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Why you? (Be honest. Be specific.) *
                </label>
                <Textarea
                  id="why"
                  rows={6}
                  value={formData.why}
                  onChange={(e) => setFormData({...formData, why: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.why}
                />
                {errors.why && <p className="text-red-500 text-sm mt-1">{errors.why}</p>}
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Availability (hours/week) *
                </label>
                <Input
                  id="availability"
                  type="text"
                  placeholder="e.g., 20-30 hours/week"
                  value={formData.availability}
                  onChange={(e) => setFormData({...formData, availability: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.availability}
                />
                {errors.availability && <p className="text-red-500 text-sm mt-1">{errors.availability}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold text-lg disabled:opacity-50"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}