"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LogOut, Plus, Trash2, Eye, Check, X } from "lucide-react"
import toast from "react-hot-toast"

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("articles")

  // Data states
  const [articles, setArticles] = useState<any[]>([])
  const [changelog, setChangelog] = useState<any[]>([])
  const [labFeed, setLabFeed] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])
  const [waitlist, setWaitlist] = useState<any[]>([])

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("admin_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchAllData()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple password protection (replace with env variable in production)
    if (password === "detova2024admin") {
      sessionStorage.setItem("admin_auth", "true")
      setIsAuthenticated(true)
      toast.success("Logged in successfully!")
      fetchAllData()
    } else {
      toast.error("Invalid password")
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth")
    setIsAuthenticated(false)
    toast.success("Logged out")
  }

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [articlesRes, changelogRes, labFeedRes, appsRes, contactsRes, waitlistRes] = await Promise.all([
        fetch("/api/articles?limit=100"),
        fetch("/api/changelog?limit=100"),
        fetch("/api/lab-feed?limit=100"),
        fetch("/api/internship?limit=100"),
        fetch("/api/contact?limit=100"),
        fetch("/api/waitlist?limit=100")
      ])

      if (articlesRes.ok) setArticles(await articlesRes.json())
      if (changelogRes.ok) setChangelog(await changelogRes.json())
      if (labFeedRes.ok) setLabFeed(await labFeedRes.json())
      if (appsRes.ok) setApplications(await appsRes.json())
      if (contactsRes.ok) setContacts(await contactsRes.json())
      if (waitlistRes.ok) setWaitlist(await waitlistRes.json())
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (endpoint: string, id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    try {
      const res = await fetch(`/api/${endpoint}/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Deleted successfully")
        await fetchAllData()
      } else {
        toast.error("Failed to delete")
      }
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  const handleUpdateStatus = async (endpoint: string, id: string, status: string) => {
    try {
      const res = await fetch(`/api/${endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        toast.success("Status updated")
        await fetchAllData()
      } else {
        toast.error("Failed to update status")
      }
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--off-white)] px-4">
        <Card className="w-full max-w-md p-8 bg-white border-[var(--border-color)]">
          <h1 className="text-3xl font-bold mb-6 text-center text-[var(--deep-grey)]">Admin <span className="text-[var(--acid-lime)]">Login</span></h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[var(--acid-lime)] text-[var(--carbon)] hover:bg-[var(--acid-lime)]/90 font-semibold">
              Login
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[var(--off-white)]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-[var(--deep-grey)]">Admin <span className="text-[var(--acid-lime)]">Dashboard</span></h1>
          <Button onClick={handleLogout} variant="outline" className="border-[var(--border-color)] text-[var(--deep-grey)]">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="p-4 bg-white border-[var(--border-color)] text-center">
            <div className="text-2xl font-bold text-[var(--acid-lime)]">{articles.length}</div>
            <div className="text-sm text-[var(--muted-foreground)]">Articles</div>
          </Card>
          <Card className="p-4 bg-white border-[var(--border-color)] text-center">
            <div className="text-2xl font-bold text-[var(--acid-lime)]">{changelog.length}</div>
            <div className="text-sm text-[var(--muted-foreground)]">Changelog</div>
          </Card>
          <Card className="p-4 bg-white border-[var(--border-color)] text-center">
            <div className="text-2xl font-bold text-[var(--acid-lime)]">{labFeed.length}</div>
            <div className="text-sm text-[var(--muted-foreground)]">Lab Feed</div>
          </Card>
          <Card className="p-4 bg-white border-[var(--border-color)] text-center">
            <div className="text-2xl font-bold text-[var(--acid-lime)]">{applications.length}</div>
            <div className="text-sm text-[var(--muted-foreground)]">Applications</div>
          </Card>
          <Card className="p-4 bg-white border-[var(--border-color)] text-center">
            <div className="text-2xl font-bold text-[var(--acid-lime)]">{contacts.length}</div>
            <div className="text-sm text-[var(--muted-foreground)]">Contacts</div>
          </Card>
          <Card className="p-4 bg-white border-[var(--border-color)] text-center">
            <div className="text-2xl font-bold text-[var(--acid-lime)]">{waitlist.length}</div>
            <div className="text-sm text-[var(--muted-foreground)]">Waitlist</div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-[var(--border-color)]">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="changelog">Changelog</TabsTrigger>
            <TabsTrigger value="lab-feed">Lab Feed</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="waitlist">Waitlist</TabsTrigger>
          </TabsList>

          {/* Articles */}
          <TabsContent value="articles" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--deep-grey)]">Articles</h2>
              <CreateArticleDialog onSuccess={fetchAllData} />
            </div>
            {articles.map((article) => (
              <Card key={article.id} className="p-6 bg-white border-[var(--border-color)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[var(--deep-grey)]">{article.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">By {article.author} • {new Date(article.createdAt).toLocaleDateString()}</p>
                    <p className="text-[var(--deep-grey)] mb-2">{article.summary}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${article.status === "published" ? "bg-[var(--acid-lime)] text-[var(--carbon)]" : "bg-[var(--off-white)] text-[var(--deep-grey)]"}`}>
                      {article.status}
                    </span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleDelete("articles", article.id)} className="border-[var(--border-color)]">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Changelog */}
          <TabsContent value="changelog" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--deep-grey)]">Changelog Entries</h2>
              <CreateChangelogDialog onSuccess={fetchAllData} />
            </div>
            {changelog.map((entry) => (
              <Card key={entry.id} className="p-6 bg-white border-[var(--border-color)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[var(--deep-grey)]">{entry.title}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">{new Date(entry.createdAt).toLocaleDateString()}</p>
                    <p className="text-[var(--deep-grey)]">{entry.content.substring(0, 150)}...</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleDelete("changelog", entry.id)} className="border-[var(--border-color)]">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Lab Feed */}
          <TabsContent value="lab-feed" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[var(--deep-grey)]">Lab Feed</h2>
              <CreateLabFeedDialog onSuccess={fetchAllData} />
            </div>
            {labFeed.map((item) => (
              <Card key={item.id} className="p-6 bg-white border-[var(--border-color)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-[var(--deep-grey)] mb-2">{item.text}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{new Date(item.createdAt).toLocaleDateString()}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--acid-lime)] hover:underline">
                        {item.link}
                      </a>
                    )}
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleDelete("lab-feed", item.id)} className="border-[var(--border-color)]">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Applications */}
          <TabsContent value="applications" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-grey)]">Internship Applications</h2>
            {applications.map((app) => (
              <Card key={app.id} className="p-6 bg-white border-[var(--border-color)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[var(--deep-grey)]">{app.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">{app.email}</p>
                    {app.location && <p className="text-sm text-[var(--muted-foreground)] mb-2">Location: {app.location}</p>}
                    {app.skills && <p className="text-sm text-[var(--muted-foreground)] mb-2">Skills: {app.skills}</p>}
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">Portfolio: <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="text-[var(--acid-lime)] hover:underline">{app.portfolio}</a></p>
                    <p className="text-[var(--deep-grey)] mb-4">{app.why}</p>
                    {app.availability && <p className="text-sm text-[var(--muted-foreground)] mb-4">Availability: {app.availability}</p>}
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleUpdateStatus("internship", app.id, "reviewed")} className="bg-[var(--acid-lime)] text-[var(--carbon)]">
                        <Check className="h-4 w-4 mr-2" /> Mark Reviewed
                      </Button>
                      <Button size="sm" onClick={() => handleUpdateStatus("internship", app.id, "rejected")} variant="outline" className="border-[var(--border-color)]">
                        <X className="h-4 w-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.status === "reviewed" ? "bg-[var(--acid-lime)] text-[var(--carbon)]" : "bg-[var(--off-white)] text-[var(--deep-grey)]"}`}>
                    {app.status || "pending"}
                  </span>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Contacts */}
          <TabsContent value="contacts" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-grey)]">Contact Submissions</h2>
            {contacts.map((contact) => (
              <Card key={contact.id} className="p-6 bg-white border-[var(--border-color)]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-[var(--deep-grey)]">{contact.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mb-2">{contact.email} • {contact.type}</p>
                    <p className="text-[var(--deep-grey)]">{contact.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleUpdateStatus("contact", contact.id, "read")} className="bg-[var(--acid-lime)] text-[var(--carbon)]">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Waitlist */}
          <TabsContent value="waitlist" className="space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-grey)]">Waitlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {waitlist.map((item) => (
                <Card key={item.id} className="p-4 bg-white border-[var(--border-color)]">
                  <p className="text-[var(--deep-grey)] font-semibold mb-1">{item.email}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{item.source} • {new Date(item.createdAt).toLocaleDateString()}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Create Article Dialog Component
function CreateArticleDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    author: "",
    status: "draft"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        toast.success("Article created!")
        setOpen(false)
        setForm({ title: "", slug: "", summary: "", content: "", author: "", status: "draft" })
        onSuccess()
      } else {
        const data = await res.json()
        toast.error(data.error || "Failed to create article")
      }
    } catch (error) {
      toast.error("Failed to create article")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--acid-lime)] text-[var(--carbon)]">
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-[var(--border-color)] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[var(--deep-grey)]">Create New Article</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Title</label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Slug (optional - auto-generated)</label>
            <Input value={form.slug} onChange={(e) => setForm({...form, slug: e.target.value})} className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" placeholder="article-slug" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Summary</label>
            <Textarea value={form.summary} onChange={(e) => setForm({...form, summary: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Content</label>
            <Textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" rows={10} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Author</label>
            <Input value={form.author} onChange={(e) => setForm({...form, author: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Status</label>
            <Select value={form.status} onValueChange={(value) => setForm({...form, status: value})}>
              <SelectTrigger className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-[var(--border-color)] text-[var(--deep-grey)]">
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-[var(--acid-lime)] text-[var(--carbon)]">Create Article</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Create Changelog Dialog Component
function CreateChangelogDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: "", content: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/changelog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (res.ok) {
        toast.success("Changelog entry created!")
        setOpen(false)
        setForm({ title: "", content: "" })
        onSuccess()
      } else {
        toast.error("Failed to create entry")
      }
    } catch (error) {
      toast.error("Failed to create entry")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--acid-lime)] text-[var(--carbon)]">
          <Plus className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-[var(--border-color)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--deep-grey)]">Create Changelog Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Title</label>
            <Input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Content</label>
            <Textarea value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" rows={6} />
          </div>
          <Button type="submit" className="w-full bg-[var(--acid-lime)] text-[var(--carbon)]">Create Entry</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Create Lab Feed Dialog Component
function CreateLabFeedDialog({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ text: "", link: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/lab-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: form.text,
          link: form.link || null
        })
      })

      if (res.ok) {
        toast.success("Lab feed item created!")
        setOpen(false)
        setForm({ text: "", link: "" })
        onSuccess()
      } else {
        toast.error("Failed to create item")
      }
    } catch (error) {
      toast.error("Failed to create item")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[var(--acid-lime)] text-[var(--carbon)]">
          <Plus className="mr-2 h-4 w-4" /> New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-[var(--border-color)]">
        <DialogHeader>
          <DialogTitle className="text-[var(--deep-grey)]">Create Lab Feed Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Text</label>
            <Textarea value={form.text} onChange={(e) => setForm({...form, text: e.target.value})} required className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" rows={4} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--deep-grey)]">Link (optional)</label>
            <Input type="url" value={form.link} onChange={(e) => setForm({...form, link: e.target.value})} className="bg-[var(--off-white)] border-[var(--border-color)] text-[var(--deep-grey)]" placeholder="https://" />
          </div>
          <Button type="submit" className="w-full bg-[var(--acid-lime)] text-[var(--carbon)]">Create Item</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
