"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Articles", href: "/articles" },
    { name: "Changelog", href: "/changelog" },
    { name: "Internship", href: "/internship" },
    { name: "Utilities", href: "/utilities" },
    { name: "About", href: "/about" },
  ]

  // Scroll to section with smooth animation and highlight
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
      
      // Add highlight effect
      setTimeout(() => {
        section.classList.add('section-highlight-active')
        setTimeout(() => {
          section.classList.remove('section-highlight-active')
        }, 600)
      }, 300)
    }
  }

  // Handle navigation click from homepage
  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    
    // If on homepage and clicking on a section that exists on homepage
    if (pathname === "/") {
      const sectionMap: Record<string, string> = {
        "/projects": "projects",
        "/internship": "internship",
      }
      
      const sectionId = sectionMap[href]
      if (sectionId) {
        scrollToSection(sectionId)
      }
    }
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-black backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Detova Labs" width={190} height={190} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  handleNavClick(item.href)
                }}
                className="text-white hover:text-[var(--acid-lime)] transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button asChild className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold">
              <Link href="/internship">Build with the Lab</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-white hover:text-[var(--acid-lime)] transition-colors"
                onClick={() => handleNavClick(item.href)}
              >
                {item.name}
              </Link>
            ))}

            <Button asChild className="w-full bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold">
              <Link href="/internship" onClick={() => setIsMenuOpen(false)}>Build with the Lab</Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}