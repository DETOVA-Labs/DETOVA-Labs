"use client"

import { Card } from "@/components/ui/card"

export default function AboutPage() {
  const team = [
    { name: "Demi", role: "CEO & Founder", initial: "D" },
    { name: "Ayomide", role: "COO", initial: "A" },
    { name: "Salam", role: "CTO", initial: "S" },
    { name: "Oree", role: "CPO", initial: "O" },
    { name: "Specter", role: "Head of Strategy", initial: "S" },
    { name: "Victor", role: "Head of Social", initial: "V" },
    { name: "Ayanfe", role: "Lead Design", initial: "A" },
    { name: "Akpan", role: "CFO", initial: "A" },
    { name: "BeLivIt", role: "Internship Lead", initial: "B" }
  ]

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
        id="about-hero"
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--off-white)] to-white section-highlightable" 
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            We Are a Global <span className="text-[var(--acid-lime)]">Innovation Studio</span>.
          </h1>
          <p className="text-xl text-white drop-shadow-md leading-relaxed">
            Detova Labs is an innovative, focused, and global team. We're a collective of engineers, designers, and strategists obsessed with turning ideas into impact. We build solutions across <strong>Web2 and Web3</strong>, bridging traditional and decentralized technologies to create products that matter.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section 
        id="about-mission"
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 section-highlightable" 
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Our Mission</h2>
          <p className="text-lg text-white drop-shadow-md leading-relaxed mb-4">
            We don't theorize. We build. Every product we ship is designed to solve real problems with real impact. From modern web applications to blockchain infrastructure, we operate at the intersection of <strong>Web2 and Web3</strong>.
          </p>
          <p className="text-lg text-white drop-shadow-md leading-relaxed">
            From Web3 gaming infrastructure to AI-powered tools, we're building the future one launch at a time. We train the next generation by building alongside them, not above them—giving them hands-on experience with production systems, smart contracts, and cutting-edge technologies.
          </p>
        </div>
      </section>

      {/* Team */}
      {/* <section
        id="about-team"
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-white section-highlightable"
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl font-bold mb-12 text-center text-white drop-shadow-lg">
            The <span className="text-[var(--acid-lime)]">Core Team</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-[var(--acid-lime)] flex items-center justify-center mb-4">
                  <span className="mono text-5xl text-[var(--acid-lime)] font-bold">
                    {member.initial}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-center text-[var(--deep-grey)]">{member.name}</h3>
                <p className="text-[var(--muted-foreground)] text-sm text-center">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Values */}
      <section 
        id="about-values"
        className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 section-highlightable" 
        onClick={handleSectionClick}
        tabIndex={0}
      >
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <h2 className="text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border-[var(--border-color)] text-center hover:border-[var(--acid-lime)] transition-all">
              <h3 className="text-2xl font-bold mb-2 text-[var(--acid-lime)]">Ship Fast</h3>
              <p className="text-[var(--deep-grey)]">Speed is a feature. We iterate in weeks, not quarters.</p>
            </Card>
            <Card className="p-6 bg-white border-[var(--border-color)] text-center hover:border-[var(--acid-lime)] transition-all">
              <h3 className="text-2xl font-bold mb-2 text-[var(--acid-lime)]">Build in Public</h3>
              <p className="text-[var(--deep-grey)]">Transparency builds trust. We document everything.</p>
            </Card>
            <Card className="p-6 bg-white border-[var(--border-color)] text-center hover:border-[var(--acid-lime)] transition-all">
              <h3 className="text-2xl font-bold mb-2 text-[var(--acid-lime)]">Train by Doing</h3>
              <p className="text-[var(--deep-grey)]">No busywork. Every intern ships real products.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}