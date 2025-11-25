"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Calendar, ArrowRight } from "lucide-react"

interface Article {
  id: string
  title: string
  slug: string
  summary: string
  author: string
  date: any
  status: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, "articles"), orderBy("date", "desc"))
        const querySnapshot = await getDocs(q)
        const articlesData: Article[] = []
        querySnapshot.forEach((doc) => {
          articlesData.push({ id: doc.id, ...doc.data() } as Article)
        })
        setArticles(articlesData.filter(a => a.status === "published"))
      } catch (error) {
        console.error("Error fetching articles:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--carbon)] to-[var(--slate)]">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            The Lab <span className="text-[var(--acid-lime)]">Notebook</span>.
          </h1>
          <p className="text-xl text-[var(--silver)]">
            Long-form thought leadership, technical deep-dives, and essays on where the industry is going.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="bg-[var(--slate)] border-[var(--border-color)] animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-[var(--carbon)] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[var(--carbon)] rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-3 bg-[var(--carbon)] rounded w-full mb-2"></div>
                    <div className="h-3 bg-[var(--carbon)] rounded w-5/6"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <Card className="bg-[var(--slate)] border-[var(--border-color)] hover:border-[var(--acid-lime)] transition-colors h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 text-[var(--silver)]">
                        <Calendar className="h-4 w-4" />
                        {article.date?.toDate?.()?.toLocaleDateString() || "Recent"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[var(--silver)] mb-4">{article.summary}</p>
                      <div className="flex items-center justify-between">
                        <Badge className="bg-[var(--acid-lime)] text-[var(--carbon)]">{article.author}</Badge>
                        <ArrowRight className="h-4 w-4 text-[var(--acid-lime)]" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="p-12 bg-[var(--slate)] border-[var(--border-color)] text-center">
              <p className="text-[var(--silver)] text-lg">No articles yet. Check back soon!</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
