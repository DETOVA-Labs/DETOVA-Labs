"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, UserCheck, Scale, ArrowRight, ExternalLink, Play } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: "tavarn-ai",
    title: "Tavarn.AI",
    subtitle: "Trust Layer for Web3 Gaming",
    description: "An autonomous market protocol for game economies built on Somnia blockchain. We're solving the systemic failures of trust and transparency in Web3 gaming through AI-powered market intelligence and on-chain verification systems.",
    status: "Active Development",
    tech: ["Solidity", "Somnia", "AI/ML", "IPFS", "Chainlink", "The Graph"],
    videoUrl: "https://youtu.be/OtA7TqxT9no?si=7K2BFemqf6_TJmjM",
    pillars: [
      {
        icon: Shield,
        title: '"Aegis" Score',
        subtitle: "Studio Trust",
        description: "A transparent, on-chain reputation system that evaluates game studios based on deployment history, economic stability, and community feedback."
      },
      {
        icon: Eye,
        title: '"Clarity" Engine',
        subtitle: "Economic Trust",
        description: "AI-powered autonomous market protocols that detect manipulation, prevent bot-driven inflation, and ensure fair price discovery."
      },
      {
        icon: UserCheck,
        title: '"Vanguard" Passport',
        subtitle: "Player Trust",
        description: "A universal identity layer that tracks player behavior across games. Verified humans, reputation scores, and anti-sybil mechanisms."
      },
      {
        icon: Scale,
        title: '"Jury" Protocol',
        subtitle: "Systemic Trust",
        description: "Decentralized dispute resolution powered by community validators. When conflicts arise, the ecosystem decides—not centralized authorities."
      }
    ]
  },
  {
    id: "web3-infrastructure",
    title: "Web3 Gaming Infrastructure",
    subtitle: "Building Trust Layers",
    description: "Comprehensive infrastructure solutions for Web3 gaming ecosystems, including autonomous market protocols, trust verification systems, and decentralized governance frameworks.",
    status: "In Development",
    tech: ["Solidity", "Web3.js", "IPFS", "The Graph", "Chainlink"],
    videoUrl: null
  },
  {
    id: "ai-tools",
    title: "AI-Powered Productivity Tools",
    subtitle: "Smart Automation for Builders",
    description: "Creating productivity tools powered by artificial intelligence, including pitch refinement tools, resume analyzers, content generation utilities, and automation frameworks for builders and entrepreneurs.",
    status: "Planning",
    tech: ["Next.js", "OpenAI", "Firebase", "Stripe"],
    videoUrl: null
  },
  {
    id: "decentralized-apps",
    title: "Decentralized Applications",
    subtitle: "Web3 User Experiences",
    description: "Developing smart contract systems, DeFi protocols, NFT platforms, and blockchain integrations that bring Web3 functionality to real-world use cases with a focus on user experience.",
    status: "Research",
    tech: ["Solidity", "React", "Web3.js", "Hardhat"],
    videoUrl: null
  }
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--carbon)] to-[var(--slate)]">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Our <span className="text-[var(--acid-lime)]">Projects</span>.
          </h1>
          <p className="text-xl text-[var(--silver)]">
            Building the future of Web2 and Web3 solutions. From autonomous market protocols to AI-powered tools, we're creating products that matter.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="bg-[var(--slate)] border-[var(--border-color)] hover:border-[var(--acid-lime)] transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl mb-2">{project.title}</CardTitle>
                      <CardDescription className="text-[var(--silver)] text-lg">{project.subtitle}</CardDescription>
                    </div>
                    <Badge className={`${
                      project.status === 'Active Development' ? 'bg-[var(--acid-lime)] text-[var(--carbon)]' :
                      project.status === 'In Development' ? 'bg-blue-500 text-white' :
                      project.status === 'Planning' ? 'bg-yellow-500 text-black' :
                      'bg-gray-500 text-white'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-[var(--silver)] mb-4">{project.description}</p>

                  {/* Video Link */}
                  {project.videoUrl && (
                    <div className="mb-4">
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[var(--acid-lime)] hover:text-[var(--acid-lime)]/80 transition-colors"
                      >
                        <Play className="h-4 w-4" />
                        Watch Demo Video
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[var(--carbon)] border border-[var(--border-color)] rounded-full text-[var(--silver)] text-sm mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardHeader>

                {/* Project-specific content for Tavarn.AI */}
                {project.id === 'tavarn-ai' && (
                  <CardContent>
                    <h3 className="text-xl font-bold mb-4 text-[var(--acid-lime)]">The 4-Pillar "Trust Stack"</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.pillars?.map((pillar, index) => (
                        <div key={index} className="p-4 bg-[var(--carbon)] border border-[var(--border-color)] rounded-lg">
                          <pillar.icon className="h-8 w-8 text-[var(--acid-lime)] mb-2" />
                          <h4 className="text-lg font-bold mb-1">{pillar.title}</h4>
                          <p className="text-[var(--silver)] text-sm mb-2 font-semibold">{pillar.subtitle}</p>
                          <p className="text-[var(--silver)] text-sm">{pillar.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 bg-[var(--slate)]">
        <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Want to <span className="text-[var(--acid-lime)]">Collaborate</span>?
          </h2>
          <p className="text-white drop-shadow-md text-lg mb-8">
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
    </div>
  )
}
