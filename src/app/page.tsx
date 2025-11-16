"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import AnimatedTagline from "@/components/AnimatedTagline"
import BuildingTagline from "@/components/BuildingTagline"
import DroppingTexts from "@/components/DroppingTexts"
import CubeBackground from "@/components/CubeBackground";

interface LabFeedItem {
  text: string
  createdAt: string
  link?: string
}

export default function Home() {
  const [labFeed, setLabFeed] = useState<LabFeedItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLabFeed = async () => {
      try {
        const response = await fetch("/api/lab-feed?limit=3")
        if (response.ok) {
          const data = await response.json()
          setLabFeed(data)
        }
      } catch (error) {
        console.error("Error fetching lab feed:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLabFeed()
  }, [])

  const handleSectionClick = (e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget
    section.classList.add('section-highlight-active')
    setTimeout(() => {
      section.classList.remove('section-highlight-active')
    }, 600)
  }

  return (
    <div className="flex flex-col">
       <CubeBackground />
      {/* Hero Section - Animated with Dynamic Background */}
      <section
        
        
        
        
      >
     

        {/* Dropping Texts Animation */}
      

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="mb-8 animate-fade-in-up">
            <BuildingTagline showRestart={false} />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Where <span className="text-[var(--acid-lime)]">Ideas</span> Meet Innovation.
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--deep-grey)] mb-4 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            <strong className="text-shimmer">Detova Labs</strong> is a global innovation studio that builds and ships product-ready solutions across <strong className="text-shimmer">Web2</strong> and <strong className="text-shimmer">Web3</strong>. <span className="animate-fade-in-up delay-300 inline-block">We transform ideas into production-ready applications through rapid prototyping, development, and deployment.</span>
          </p>
          <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-3xl mx-auto animate-fade-in-up delay-400">
            From blockchain gaming infrastructure and decentralized applications to AI-powered productivity tools, we specialize in <span className="text-shimmer">cutting-edge technology</span> that solves real-world problems. We train the next generation of builders by giving them hands-on experience shipping actual products, not doing busywork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-500">
            <Button asChild size="lg" className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
              <Link href="/projects">
                <Sparkles className="mr-2 h-5 w-5" />
                Explore our Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-2 border-[var(--deep-grey)] text-[var(--deep-grey)] hover:bg-[var(--acid-lime)]/10 hover:border-[var(--acid-lime)] transition-all shadow-md">
              <Link href="/internship">
                Build with the Lab
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What We Do Section - Enhanced with Animations */}
      <section 
  id="services"
  className="dynamic-background py-20 px-4 sm:px-6 lg:px-8 bg-white section-highlightable" 
  onClick={handleSectionClick}
  tabIndex={0}
  aria-label="What we do"
>
        <div className="tech-grid" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-center animate-fade-in-up">
            What We <span className="text-shimmer">Build</span>
          </h2>
          <p className="text-center text-[var(--muted-foreground)] mb-12 max-w-2xl mx-auto animate-fade-in-up delay-100">
            We specialize in building <span className="text-shimmer">innovative solutions</span> across multiple domains — from Web3 gaming infrastructure to AI-powered enterprise tools
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-100">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-200">Web3 Gaming Infrastructure</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-300">
                Building trust layers and autonomous market protocols for blockchain gaming economies. Our flagship product <strong className="text-shimmer">Tavarn.AI</strong> solves transparency issues in Web3 gaming ecosystems.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-200">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-300">AI-Powered Tools</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-400">
                Creating <span className="text-shimmer">productivity tools</span> powered by artificial intelligence, including pitch refinement tools, resume analyzers, content generation utilities, and automation frameworks for builders and entrepreneurs.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-300">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-400">Decentralized Applications</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-500">
                Developing smart contract systems, <span className="text-shimmer">DeFi protocols</span>, NFT platforms, and blockchain integrations that bring Web3 functionality to real-world use cases with a focus on user experience.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-400">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-500">Enterprise Software Solutions</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-600">
                Building custom software solutions for businesses including <span className="text-shimmer">CRM systems</span>, workflow automation platforms, data analytics dashboards, and integration middleware for legacy systems.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-500">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-600">Mobile Applications</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-700">
                Developing <span className="text-shimmer">cross-platform</span> mobile applications with React Native and Flutter, delivering native performance with unified codebases for iOS and Android platforms.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-600">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-700">API & Backend Services</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-800">
                Architecting <span className="text-shimmer">scalable backend systems</span>, RESTful and GraphQL APIs, microservices architectures, and serverless functions for modern web and mobile applications.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-700">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-100">DevOps & Cloud Infrastructure</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-200">
                Setting up <span className="text-shimmer">CI/CD pipelines</span>, containerized deployments with Docker and Kubernetes, cloud infrastructure on AWS, GCP, and Azure, and monitoring solutions.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-800">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-200">Data Science & Analytics</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-300">
                Building <span className="text-shimmer">machine learning models</span>, predictive analytics systems, data pipelines for ETL processes, and business intelligence dashboards for data-driven decision making.
              </p>
            </Card>
            <Card className="p-6 bg-[var(--off-white)] border-[var(--border-color)] card-hover animate-scale-in delay-100">
              <h3 className="text-xl font-bold mb-3 text-[var(--deep-grey)] animate-fade-in-up delay-300">E-Commerce Platforms</h3>
              <p className="text-[var(--deep-grey)] leading-relaxed animate-fade-in-up delay-400">
                Creating custom <span className="text-shimmer">e-commerce solutions</span> with secure payment gateways, inventory management systems, customer relationship tools, and multi-vendor marketplace platforms.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Lab Feed Section - Enhanced */}
      <section 
  id="updates"
  className="dynamic-background py-20 px-4 sm:px-6 lg:px-8 bg-[var(--off-white)] section-highlightable" 
  onClick={handleSectionClick}
  tabIndex={0}
  aria-label="Lab feed"
>
        <div className="tech-grid" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-4xl font-bold mb-4 animate-slide-in-left">
            The <span className="text-shimmer">Lab Feed</span>. <span className="text-[var(--acid-lime)]">(Proof of Work.)</span>
          </h2>
          <p className="text-[var(--deep-grey)] mb-8 animate-slide-in-left delay-100">
            Real-time updates from our lab showing what we're <span className="text-shimmer">building and shipping</span>.
          </p>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 bg-white border-[var(--border-color)] animate-pulse">
                  <div className="h-4 bg-[var(--off-white)] rounded w-3/4"></div>
                </Card>
              ))}
            </div>
          ) : labFeed.length > 0 ? (
            <div className="space-y-4">
              {labFeed.map((item, index) => (
                <Card key={index} className="p-6 bg-white border-[var(--border-color)] card-hover animate-slide-in-left" style={{ animationDelay: `${(index + 2) * 100}ms` }}>
                  <div className="flex items-start justify-between">
                    <p className="text-[var(--deep-grey)] animate-fade-in-up" style={{ animationDelay: `${(index + 3) * 100}ms` }}>{item.text}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[var(--acid-lime)] hover:text-[var(--acid-lime)]/80 transition-colors animate-scale-in" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] mt-2 animate-fade-in-up" style={{ animationDelay: `${(index + 4) * 100}ms` }}>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 bg-white border-[var(--border-color)] text-center">
              <p className="text-[var(--deep-grey)] animate-fade-in-up">No recent updates. Check back soon!</p>
            </Card>
          )}
        </div>
      </section>

      {/* Featured Project - Enhanced */}
      <section 
  id="projects"
  className="dynamic-background py-20 px-4 sm:px-6 lg:px-8 bg-white section-highlightable" 
  onClick={handleSectionClick}
  tabIndex={0}
  aria-label="Featured project"
>
        <div className="tech-grid" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
                Featured Project: <span className="text-shimmer">Tavarn.AI</span>
              </h2>
              <p className="text-[var(--deep-grey)] text-lg mb-6 leading-relaxed animate-fade-in-up delay-100">
                An <span className="text-shimmer">autonomous market protocol</span> for game economies built on Somnia blockchain. We're solving the systemic failures of trust and transparency in <span className="text-shimmer">Web3 gaming</span> through AI-powered market intelligence and on-chain verification systems.
              </p>
              <div className="animate-fade-in-up delay-200">
                <Button asChild className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Link href="/projects">
                    View Case Study
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[var(--off-white)] to-white border-2 border-[var(--border-color)] rounded-lg p-12 aspect-video flex items-center justify-center card-hover animate-slide-in-right">
              <div className="text-center">
                <div className="mono text-6xl text-[var(--acid-lime)] mb-4 font-bold text-glow animate-fade-in-up">T.AI</div>
                <p className="text-[var(--deep-grey)] font-semibold animate-fade-in-up delay-100">Trust Layer for <span className="text-shimmer">Web3 Gaming</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internship CTA - Enhanced */}
      <section 
  id="internship"
  className="dynamic-background py-20 px-4 sm:px-6 lg:px-8 bg-[var(--off-white)] section-highlightable" 
  onClick={handleSectionClick}
  tabIndex={0}
  aria-label="Internship program"
>
        <div className="tech-grid" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
            We Don't Do <span className="text-shimmer">Coffee Runs</span>.
          </h2>
          <p className="text-[var(--deep-grey)] text-lg mb-4 leading-relaxed animate-fade-in-up delay-100">
            Our interns <span className="text-shimmer">ship real products</span>. We provide a platform for you to build a verifiable portfolio and get a share in the revenue you help create.
          </p>
          <p className="text-[var(--muted-foreground)] mb-8 animate-fade-in-up delay-200">
            Join our internship program and work on <span className="text-shimmer">actual production applications</span>, contribute to open-source projects, and learn from experienced developers in a fully remote environment. Build your portfolio while earning revenue share.
          </p>
          <div className="animate-fade-in-up delay-300">
            <Button asChild size="lg" className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
              <Link href="/internship">
                Apply to the Internship
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}