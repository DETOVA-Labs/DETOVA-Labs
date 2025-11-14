"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Linkedin, Youtube } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

// X (Twitter) Logo SVG Component
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    try {
      const { db, isFirebaseConfigured } = await import("@/lib/firebase")
      
      if (!isFirebaseConfigured || !db) {
        toast.error("Newsletter signup is temporarily unavailable.")
        setIsSubmitting(false)
        return
      }

      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore")
      await addDoc(collection(db, "waitlist"), {
        email,
        source: "newsletter",
        date: serverTimestamp(),
      })
      toast.success("Thanks for subscribing!")
      setEmail("")
    } catch (error) {
      console.error("Error subscribing:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { name: "X (Twitter)", icon: XLogo, href: "https://x.com/detovalabs" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/detovalabs" },
    { name: "GitHub", icon: Github, href: "https://github.com/detovalabs" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@DetovalabsHQ" },
  ]

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Contributor Agreement", href: "/contributor" },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image src="/logo.svg" alt="Detova Labs" width={120} height={36} />
            </Link>
            <p className="text-[var(--deep-grey)] text-sm">
              A global innovation studio that builds and ships product-ready solutions across Web2 and Web3.
            </p>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[var(--deep-grey)] font-bold mb-4">Stay in the Lab</h3>
            <p className="text-[var(--muted-foreground)] text-sm mb-4">Get our newsletter.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-[var(--border-color)] text-[var(--deep-grey)]"
                required
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 whitespace-nowrap"
              >
                {isSubmitting ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-[var(--deep-grey)] font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--deep-grey)] hover:text-[var(--acid-lime)] transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--muted-foreground)] text-sm">
            © {currentYear} Detova Labs. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[var(--muted-foreground)] hover:text-[var(--acid-lime)] text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}