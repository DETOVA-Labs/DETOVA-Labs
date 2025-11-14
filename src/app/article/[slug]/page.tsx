"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Calendar, User, ArrowLeft } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  content: string
  author: string
  date: any
  status: string
}

export default function ArticlePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return

      try {
        const q = query(collection(db, "articles"), where("slug", "==", slug))
        const querySnapshot = await getDocs(q)
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const data = doc.data() as Article
          if (data.status === "published") {
            setArticle({ id: doc.id, ...data })
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 bg-[var(--slate)] border-[var(--border-color)] animate-pulse">
            <div className="h-8 bg-[var(--carbon)] rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-[var(--carbon)] rounded w-1/2 mb-8"></div>
            <div className="space-y-3">
              <div className="h-4 bg-[var(--carbon)] rounded w-full"></div>
              <div className="h-4 bg-[var(--carbon)] rounded w-full"></div>
              <div className="h-4 bg-[var(--carbon)] rounded w-2/3"></div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-[var(--silver)] mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Articles
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)]">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/articles"
            className="inline-flex items-center text-[var(--silver)] hover:text-[var(--acid-lime)] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Link>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-5xl font-bold mb-6">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-[var(--silver)]">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{article.date?.toDate?.()?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) || "Recent"}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{article.author}</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <Card className="p-8 bg-[var(--slate)] border-[var(--border-color)]">
              <div className="text-[var(--off-white)] leading-relaxed whitespace-pre-wrap">
                {article.content}
              </div>
            </Card>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-12 border-t border-[var(--border-color)]">
            <Card className="p-8 bg-[var(--slate)] border-[var(--acid-lime)] text-center">
              <h3 className="text-2xl font-bold mb-4">Want to Build with Us?</h3>
              <p className="text-[var(--silver)] mb-6">
                We're always looking for talented builders to join the lab.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold">
                  <Link href="/internship">Apply for Internship</Link>
                </Button>
                <Button asChild variant="outline" className="border-[var(--acid-lime)] text-[var(--acid-lime)] hover:bg-[var(--acid-lime)]/10">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </article>
    </div>
  )
}