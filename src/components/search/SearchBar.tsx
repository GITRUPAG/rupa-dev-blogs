'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchHit[]>([])
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>()

  interface SearchHit {
    objectID: string
    slug: string
    title: string
    description: string
    category: string
    tags: string[]
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    clearTimeout(debounceRef.current)
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.hits || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(debounceRef.current)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query) {
      router.push(`/blog?search=${encodeURIComponent(query)}`)
      setOpen(false)
      inputRef.current?.blur()
    }
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <div className="flex items-center gap-2 bg-surface border border-border hover:border-border-2 rounded-lg px-3 py-2 w-56 transition focus-within:border-accent/50 focus-within:shadow-sm focus-within:shadow-accent/10">
        <Search size={14} className="text-ink-3 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="bg-transparent text-sm text-ink placeholder:text-ink-3 outline-none w-full"
          aria-label="Search posts"
          aria-expanded={open}
          role="combobox"
          aria-autocomplete="list"
        />
        <kbd className="hidden sm:inline-flex items-center text-ink-3 text-xs font-mono bg-bg border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      {/* Dropdown */}
      {open && query.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 min-w-80 bg-surface border border-border rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
          {loading ? (
            <div className="px-4 py-3 text-sm text-ink-2 font-mono">Searching...</div>
          ) : results.length > 0 ? (
            <>
              <div className="px-3 py-2 border-b border-border">
                <span className="text-xs text-ink-3 font-mono uppercase tracking-wider">
                  {results.length} results
                </span>
              </div>
              <ul>
                {results.slice(0, 6).map((hit) => (
                  <li key={hit.objectID}>
                    <button
                      onClick={() => {
                        router.push(`/blog/${hit.slug}`)
                        setOpen(false)
                        setQuery('')
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-surface-2 transition flex flex-col gap-1 group"
                    >
                      <span className="text-sm text-ink font-medium group-hover:text-accent transition line-clamp-1">
                        {hit.title}
                      </span>
                      <span className="text-xs text-ink-2 line-clamp-1">{hit.description}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-ink-3 font-mono capitalize">{hit.category}</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2.5 border-t border-border">
                <button
                  onClick={() => {
                    router.push(`/blog?search=${encodeURIComponent(query)}`)
                    setOpen(false)
                  }}
                  className="text-xs text-accent hover:underline font-mono"
                >
                  See all results for &quot;{query}&quot; →
                </button>
              </div>
            </>
          ) : (
            <div className="px-4 py-4">
              <p className="text-sm text-ink-2">No results for &quot;{query}&quot;</p>
              <p className="text-xs text-ink-3 mt-1 font-mono">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
