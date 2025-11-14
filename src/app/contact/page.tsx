"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, MessageSquare } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    if (!formData.type) newErrors.type = "Please select a type"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit")
      }

      toast.success("Message sent successfully! We'll be in touch soon.")
      setFormData({ name: "", email: "", type: "", message: "" })
      setErrors({})
    } catch (error: any) {
      console.error("Error submitting contact form:", error)
      toast.error(error.message || "Failed to send message. Please try again.")
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
            Let's Build <span className="text-[var(--acid-lime)]">Together</span>.
          </h1>
          <p className="text-xl text-[var(--deep-grey)]">
            We're actively seeking partners, VCs, and collaborators. If you want to build products that last, let's talk.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section 
        className="py-20 px-4 sm:px-6 lg:px-8 section-highlightable"
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="container mx-auto max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 bg-white border-[var(--border-color)] flex items-center gap-4">
              <Mail className="h-8 w-8 text-[var(--acid-lime)]" />
              <div>
                <h3 className="font-bold mb-1 text-[var(--deep-grey)]">Email Us</h3>
                <a href="mailto:hello@detovalabs.xyz" className="text-[var(--muted-foreground)] hover:text-[var(--acid-lime)]">
                  hello@detovalabs.xyz
                </a>
              </div>
            </Card>
            <Card className="p-6 bg-white border-[var(--border-color)] flex items-center gap-4">
              <MessageSquare className="h-8 w-8 text-[var(--acid-lime)]" />
              <div>
                <h3 className="font-bold mb-1 text-[var(--deep-grey)]">Quick Response</h3>
                <p className="text-[var(--muted-foreground)]">Usually within 24 hours</p>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-white border-[var(--border-color)]">
            <h2 className="text-3xl font-bold mb-6 text-[var(--deep-grey)]">What's your focus?</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Name *
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
                <label htmlFor="type" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  I'm a... *
                </label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]">
                    <SelectValue placeholder="Select one" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[var(--border-color)] text-[var(--deep-grey)]">
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="partner">Partner / Collaborator</SelectItem>
                    <SelectItem value="talent">Potential Hire</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">
                  Message *
                </label>
                <Textarea
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                  aria-required="true"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold text-lg disabled:opacity-50"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  )
}