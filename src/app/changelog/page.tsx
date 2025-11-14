"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { collection, query, orderBy, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { GitCommit } from "lucide-react"

interface ChangelogEntry {
  id: string
  title: string
  content: string
  date: any
}

export default function ChangelogPage() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const q = query(collection(db, "changelog_entries"), orderBy("date", "desc"))
        const querySnapshot = await getDocs(q)
        const entriesData: ChangelogEntry[] = []
        querySnapshot.forEach((doc) => {
          entriesData.push({ id: doc.id, ...doc.data() } as ChangelogEntry)
        })
        setEntries(entriesData)
      } catch (error) {
        console.error("Error fetching changelog:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchChangelog()
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[var(--carbon)] to-[var(--slate)]">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            Proof of <span className="text-[var(--acid-lime)]">Shipping</span>.
          </h1>
          <p className="text-xl text-[var(--silver)]">
            A real-time, no-fluff log of every product update. We build in public.
          </p>
        </div>
      </section>

      {/* Changelog Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6 bg-[var(--slate)] border-[var(--border-color)] animate-pulse">
                  <div className="h-4 bg-[var(--carbon)] rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-[var(--carbon)] rounded w-full mb-2"></div>
                  <div className="h-3 bg-[var(--carbon)] rounded w-3/4"></div>
                </Card>
              ))}
            </div>
          ) : entries.length > 0 ? (
            <div className="space-y-8 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-[var(--border-color)]">
              {entries.map((entry) => (
                <div key={entry.id} className="relative pl-8">
                  <div className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--acid-lime)]"></div>
                  <Card className="p-6 bg-[var(--slate)] border-[var(--border-color)] hover:border-[var(--acid-lime)] transition-colors">
                    <div className="flex items-start gap-4">
                      <GitCommit className="h-5 w-5 text-[var(--acid-lime)] flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold">{entry.title}</h3>
                          <span className="text-sm text-[var(--silver)] mono">
                            {entry.date?.toDate?.()?.toLocaleDateString() || "Recent"}
                          </span>
                        </div>
                        <p className="text-[var(--silver)] whitespace-pre-line">{entry.content}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card className="p-12 bg-[var(--slate)] border-[var(--border-color)] text-center">
              <p className="text-[var(--silver)] text-lg">No changelog entries yet. Check back soon!</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
