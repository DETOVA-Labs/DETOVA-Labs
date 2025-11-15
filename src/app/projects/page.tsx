"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Eye, UserCheck, Scale, ArrowRight } from "lucide-react"
import Link from "next/link"
import AnimatedTavarnTitle from "@/components/AnimatedTavarnTitle"

export default function ProjectsPage() {
  const pillars = [
    {
      icon: Shield,
      title: '"Aegis" Score',
      subtitle: "Studio Trust",
      description: "A transparent, on-chain reputation system that evaluates game studios based on deployment history, economic stability, and community feedback. No more anonymous rug pulls."
    },
    {
      icon: Eye,
      title: '"Clarity" Engine',
      subtitle: "Economic Trust",
      description: "AI-powered autonomous market protocols that detect manipulation, prevent bot-driven inflation, and ensure fair price discovery. Real-time economic transparency for every participant."
    },
    {
      icon: UserCheck,
      title: '"Vanguard" Passport',
      subtitle: "Player Trust",
      description: "A universal identity layer that tracks player behavior across games. Verified humans, reputation scores, and anti-sybil mechanisms that reward genuine participation."
    },
    {
      icon: Scale,
      title: '"Jury" Protocol',
      subtitle: "Systemic Trust",
      description: "Decentralized dispute resolution powered by community validators. When conflicts arise, the ecosystem decides—not centralized authorities."
    }
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="hero-generative relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <AnimatedTavarnTitle />
          <p className="text-2xl text-[var(--silver)] mb-8">
            The Trust Layer for Web3 Gaming.
          </p>
        </div>
      </section>

      {/* Video Embed Placeholder */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--slate)]">
        <div className="container mx-auto max-w-5xl">
          <div className="aspect-video bg-[var(--carbon)] border-2 border-[var(--border-color)] rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="mono text-6xl text-[var(--acid-lime)] mb-4">▶</div>
              <p className="text-[var(--silver)]">Video Placeholder</p>
              <p className="text-sm text-[var(--silver)] mt-2">https://youtu.be/OtA7TqxT9no?si=7K2BFemqf6_TJmjM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">The Industry is Failing on <span className="text-[var(--acid-lime)]">Trust</span>.</h2>
          <p className="text-lg text-[var(--silver)] leading-relaxed">
            The Web3 gaming market is crippled by developer rugs, bot-driven economies, and anonymous bad actors. Players can't trust studios, and studios can't trust players. The current infrastructure incentivizes short-term extraction over long-term ecosystem health. This isn't just a technical problem—it's a systemic failure of trust architecture.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--slate)]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-6">A 4-Pillar <span className="text-[var(--acid-lime)]">"Trust Stack"</span>.</h2>
            <p className="text-lg text-[var(--silver)] max-w-3xl mx-auto">
              We're building a holistic protocol that addresses trust at every layer of the Web3 gaming ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <Card key={index} className="p-8 bg-[var(--carbon)] border-[var(--border-color)] hover:border-[var(--acid-lime)] transition-colors">
                <pillar.icon className="h-12 w-12 text-[var(--acid-lime)] mb-4" />
                <h3 className="text-2xl font-bold mb-2">The {pillar.title}</h3>
                <p className="text-[var(--silver)] text-sm mb-4 font-semibold">{pillar.subtitle}</p>
                <p className="text-[var(--silver)]">{pillar.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Built on <span className="text-[var(--acid-lime)]">Somnia</span>.</h2>
          <p className="text-lg text-[var(--silver)] leading-relaxed mb-6">
            Tavarn.AI is deployed on Somnia, a high-performance blockchain purpose-built for real-time gaming applications. With sub-second finality and massive throughput, we can process complex economic calculations and trust computations at the speed games demand.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Solidity", "Somnia", "AI/ML", "IPFS", "Chainlink", "The Graph"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[var(--slate)] border border-[var(--border-color)] rounded-full text-[var(--silver)] text-sm mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--slate)]">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            Want to Learn <span className="text-[var(--acid-lime)]">More</span>?
          </h2>
          <p className="text-[var(--silver)] text-lg mb-8">
            We're actively seeking partners and collaborators in the Web3 gaming space.
          </p>
          <Button asChild size="lg" className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold text-lg">
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Connect with Us */}
      <section className="social-links-section">
        <div className="text">
          <h1>CONNECT</h1>
        </div>
        <div className="about">
          <div className="bg_links"></div>
          <div className="logo"></div>
          <div className="social portfolio">
            <div className="icon"></div>
          </div>
          <div className="social dribbble">
            <div className="icon"></div>
          </div>
          <div className="social linkedin">
            <div className="icon"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
