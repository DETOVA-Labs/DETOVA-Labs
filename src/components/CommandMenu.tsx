"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Command, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

export default function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  const pages = [
    { name: "Home", path: "/", keywords: ["home", "start", "landing"] },
    { name: "Projects", path: "/projects", keywords: ["projects", "tavarn", "case study", "work"] },
    { name: "Articles", path: "/articles", keywords: ["articles", "blog", "writing", "notebook"] },
    { name: "Changelog", path: "/changelog", keywords: ["changelog", "updates", "releases", "shipping"] },
    { name: "Internship", path: "/internship", keywords: ["internship", "apply", "join", "cohort"] },
    { name: "Utilities", path: "/utilities", keywords: ["utilities", "tools", "pitch", "resume"] },
    { name: "About", path: "/about", keywords: ["about", "team", "who"] },
    { name: "Contact", path: "/contact", keywords: ["contact", "reach out", "partner"] },
    { name: "Admin", path: "/admin", keywords: ["admin", "dashboard", "login"] },
  ]

  const filteredPages = pages.filter(
    (page) =>
      page.name.toLowerCase().includes(search.toLowerCase()) ||
      page.keywords.some((keyword) => keyword.includes(search.toLowerCase()))
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (path: string) => {
    setOpen(false)
    setSearch("")
    router.push(path)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-[var(--slate)] border-[var(--border-color)]">
        <div className="flex items-center border-b border-[var(--border-color)] px-3">
          <Search className="h-4 w-4 text-[var(--silver)] mr-2" />
          <input
            type="text"
            placeholder="Search pages..."
            className="flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-[var(--silver)] text-[var(--off-white)]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-[var(--border-color)] bg-[var(--carbon)] px-1.5 font-mono text-[10px] font-medium text-[var(--silver)] opacity-100 sm:flex">
            ESC
          </kbd>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredPages.length === 0 ? (
            <div className="py-6 text-center text-sm text-[var(--silver)]">No results found.</div>
          ) : (
            <div className="space-y-1">
              {filteredPages.map((page) => (
                <button
                  key={page.path}
                  onClick={() => handleSelect(page.path)}
                  className="w-full text-left px-3 py-2 text-sm rounded hover:bg-[var(--carbon)] text-[var(--off-white)] transition-colors"
                >
                  {page.name}
                  <span className="text-[var(--silver)] text-xs ml-2">{page.path}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-[var(--border-color)] px-3 py-2 text-xs text-[var(--silver)] flex items-center">
          <Command className="h-3 w-3 mr-1" />
          <span>Pro tip: Press</span>
          <kbd className="mx-1 inline-flex h-5 items-center gap-1 rounded border border-[var(--border-color)] bg-[var(--carbon)] px-1.5 font-mono text-[10px]">
            ⌘K
          </kbd>
          <span>or</span>
          <kbd className="mx-1 inline-flex h-5 items-center gap-1 rounded border border-[var(--border-color)] bg-[var(--carbon)] px-1.5 font-mono text-[10px]">
            Ctrl+K
          </kbd>
          <span>to open anytime</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
