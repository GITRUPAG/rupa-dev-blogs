'use client'

import { useState, useMemo } from 'react'
import { Search, X, ArrowRight, ChevronLeft } from 'lucide-react'
import { PostCard } from '@/components/blog/PostCard'
import { cn, getCategoryConfig, getTagColor } from '@/lib/utils'
import type { Post } from '@/types'

interface Props {
  posts: Post[]
  tags: string[]
  categories: string[]
}

// Official tech SVG icons as inline components
const CategoryIcons: Record<string, () => JSX.Element> = {
  react: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8" fill="none">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <ellipse cx="0" cy="0" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none"/>
      <ellipse cx="0" cy="0" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(60)"/>
      <ellipse cx="0" cy="0" rx="11" ry="4.2" stroke="#61DAFB" strokeWidth="1" fill="none" transform="rotate(120)"/>
    </svg>
  ),
  java: () => (
    <svg viewBox="0 0 128 128" className="w-8 h-8">
      <path fill="#f89820" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
      <path fill="#f89820" d="M76.491 61.51s6.091 3.096-3.301 3.912c-11.993 1.026-49.71 1.334-60.2.041-3.768-.506 3.79-1.918 6.331-2.15 2.652-.24 4.932-.197 4.932-.197-5.671-3.993-36.701 7.853-15.773 11.239 57.684 9.388 105.14-4.228 67.011-12.845zM49.304 70.67s-15.457 3.668-5.47 5.005c4.235.575 12.656.445 20.508-.228 6.42-.553 12.867-1.735 12.867-1.735s-2.264.97-3.9 2.088c-15.742 4.141-46.167 2.213-37.403-2.025 7.44-3.567 13.398-3.105 13.398-3.105zM113.43 83.468s3.525 2.905-3.88 5.152c-14.088 4.271-58.67 5.56-71.024.171-4.449-1.934 3.895-4.625 6.511-5.192 2.731-.593 4.293-.485 4.293-.485-4.944-3.482-31.991 6.847-13.726 9.81 50.274 8.148 91.498-3.668 77.826-9.456z"/>
      <path fill="#f89820" d="M80.032 49.806s6.948 6.95-6.595 8.823c-24.026 3.235-55.544 1.13-71.088-1.121-5.528-.84 3.03-3.17 6.59-3.6 3.7-.45 5.803-.37 5.803-.37-6.671-4.697-43.147 9.235-18.526 13.243 67.588 11.015 123.698-4.956 83.816-16.975z"/>
      <path fill="#ea2d2e" d="M90.682 1.45s16.637 16.637-15.783 42.228c-26.005 20.553-5.93 32.277-.007 45.657-15.193-13.708-26.347-25.79-18.876-37.03C67.093 35.49 97.3 27.635 90.682 1.45z"/>
      <path fill="#f89820" d="M52.743 126.89c-27.996 1.785-57.037-1.557-60.498-8.764 0 0 3.088 6.39 38.116 8.594 43.051 2.71 109.143-1.535 110.755-21.943.001.001-2.983 7.466-88.373 22.113z"/>
    </svg>
  ),
  'spring-boot': () => (
    <svg viewBox="0 0 50 50" className="w-8 h-8">
      <path fill="#77bc1f" d="M49,18.7C46.3,7.9,35.4,1.2,24.6,3.9C13.8,6.5,7.2,17.5,9.8,28.2c0.6,2.5,1.8,4.8,3.3,6.8L7,43.5l10-2.8c8.6,5,19.5,2.7,25.4-5.4C47.4,28.3,50.5,22.9,49,18.7z"/>
      <path fill="#fff" d="M16.9,20.2h-2.5v7.3h2.5c1,0,1.8-0.3,2.4-0.9c0.6-0.6,0.9-1.5,0.9-2.8C20.2,21.4,19.1,20.2,16.9,20.2z M18.5,25.9c-0.4,0.4-0.9,0.6-1.6,0.6h-0.7v-5.2h0.7c0.7,0,1.2,0.2,1.6,0.6s0.6,1.1,0.6,2C19.1,24.8,18.9,25.5,18.5,25.9z"/>
      <path fill="#fff" d="M22.4,20.2h-1.7v7.3h1.7V20.2z"/>
      <path fill="#fff" d="M27.5,22.6c-0.9-0.3-1.4-0.6-1.7-0.8c-0.2-0.2-0.3-0.4-0.3-0.7c0-0.3,0.1-0.5,0.4-0.7c0.2-0.2,0.6-0.3,1-0.3c0.8,0,1.5,0.3,2.2,0.8l0.8-1.3c-0.8-0.6-1.8-0.9-2.9-0.9c-0.9,0-1.7,0.3-2.3,0.8s-0.9,1.2-0.9,2c0,1.3,0.7,2.1,2.2,2.7c0.5,0.2,0.9,0.3,1.2,0.5c0.6,0.3,0.9,0.7,0.9,1.2c0,0.3-0.1,0.6-0.4,0.8c-0.3,0.2-0.6,0.3-1.1,0.3c-0.9,0-1.7-0.4-2.5-1.1l-0.9,1.3c0.9,0.8,2.1,1.3,3.4,1.3c1,0,1.8-0.3,2.4-0.8c0.6-0.5,0.9-1.2,0.9-2.1C29.9,23.9,29.1,23.1,27.5,22.6z"/>
      <path fill="#fff" d="M34.8,25.1l-2.7-4.9h-1.8v7.3h1.6v-4.9l2.8,4.9h1.7v-7.3h-1.6V25.1z"/>
    </svg>
  ),
  fullstack: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#00d4aa" opacity="0.9"/>
      <path d="M2 17l10 5 10-5" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 12l10 5 10-5" stroke="#00d4aa" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  ai: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" fill="#a855f7" opacity="0.2"/>
      <circle cx="9" cy="14" r="1.5" fill="#a855f7"/>
      <circle cx="15" cy="14" r="1.5" fill="#a855f7"/>
      <path d="M9 18s1 1 3 1 3-1 3-1" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  project: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="#f472b6" strokeWidth="1.5"/>
      <path d="M8 21h8M12 17v4" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 8h10M7 11h7" stroke="#f472b6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  series: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="#f59e0b" strokeWidth="1.5"/>
      <path d="M9 7h6M9 10h6M9 13h4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  devops: () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none">
      <path d="M22 12A10 10 0 1 1 12 2" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
      <path d="M12 6v6l4 2" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const CATEGORY_META: Record<string, { desc: string }> = {
  react:         { desc: 'Hooks, performance, patterns & real React apps' },
  java:          { desc: 'Core Java, OOP, data structures & algorithms' },
  'spring-boot': { desc: 'REST APIs, JWT, JPA, Security & production backends' },
  fullstack:     { desc: 'End-to-end builds with React + Spring Boot' },
  ai:            { desc: 'ML concepts, AI tools & practical integrations' },
  project:       { desc: 'Real project walkthroughs from idea to deploy' },
  series:        { desc: 'Multi-part deep dives on complex topics' },
  devops:        { desc: 'Docker, CI/CD, AWS & deployment strategies' },
}

export function BlogListClient({ posts, tags, categories }: Props) {
  const [search, setSearch]                 = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag]           = useState<string | null>(null)

  const isFiltering = search || activeTag

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = !activeCategory || post.category === activeCategory
      const matchesTag      = !activeTag || post.tags.includes(activeTag)
      return matchesSearch && matchesCategory && matchesTag
    })
  }, [posts, search, activeCategory, activeTag])

  const grouped = useMemo(() => {
    return categories
      .map((cat) => ({ cat, posts: posts.filter((p) => p.category === cat) }))
      .filter((g) => g.posts.length > 0)
  }, [posts, categories])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory(null)
    setActiveTag(null)
  }

  // ── SEARCH MODE ──────────────────────────────────────────────────────────
  if (isFiltering) {
    return (
      <div>
        <SearchBar search={search} setSearch={setSearch} />
        <TagStrip tags={tags} activeTag={activeTag} setActiveTag={setActiveTag} />
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ink-2 font-mono">
            {filtered.length} post{filtered.length !== 1 ? 's' : ''} found
          </p>
          <button onClick={clearFilters} className="text-xs text-accent hover:underline font-mono flex items-center gap-1">
            <X size={12} /> Clear
          </button>
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </div>
    )
  }

  // ── CATEGORY DRILL-DOWN ──────────────────────────────────────────────────
  if (activeCategory) {
    const config   = getCategoryConfig(activeCategory)
    const meta     = CATEGORY_META[activeCategory]
    const catPosts = posts.filter((p) => p.category === activeCategory)
    const Icon     = CategoryIcons[activeCategory]

    return (
      <div>
        <SearchBar search={search} setSearch={setSearch} />
        <button
          onClick={() => setActiveCategory(null)}
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink transition mb-6 font-mono"
        >
          <ChevronLeft size={14} /> All categories
        </button>
        <div className="flex items-center gap-4 mb-8">
          {Icon && <Icon />}
          <div>
            <h2 className={`font-heading font-bold text-2xl ${config.color}`}>{config.label}</h2>
            <p className="text-sm text-ink-2 mt-0.5">{meta?.desc}</p>
          </div>
          <span className="ml-auto text-xs font-mono text-ink-3 bg-surface border border-border px-3 py-1 rounded-full">
            {catPosts.length} post{catPosts.length !== 1 ? 's' : ''}
          </span>
        </div>
        <TagStrip
          tags={[...new Set(catPosts.flatMap((p) => p.tags))].sort()}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <EmptyState onClear={clearFilters} />
        )}
      </div>
    )
  }

  // ── HUB VIEW ─────────────────────────────────────────────────────────────
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
        {grouped.map(({ cat, posts: catPosts }) => {
          const config = getCategoryConfig(cat)
          const meta   = CATEGORY_META[cat]
          const latest = catPosts[0]
          const Icon   = CategoryIcons[cat]

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="group text-left bg-surface border border-border rounded-2xl overflow-hidden hover:border-border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
            >
              <div className={cn('h-0.5 w-full', config.bg)} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center',
                    config.bg, 'border', 'border-current/10'
                  )}>
                    {Icon ? <Icon /> : (
                      <span className="text-xl">{cat.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <span className={cn(
                    'text-xs font-mono px-2 py-0.5 rounded-full border',
                    config.bg, config.color, 'border-current/20'
                  )}>
                    {catPosts.length}
                  </span>
                </div>

                <h3 className={cn('font-heading font-bold text-base mb-1 group-hover:opacity-90 transition', config.color)}>
                  {config.label}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed mb-4 line-clamp-2">{meta?.desc}</p>

                {latest && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-[10px] font-mono text-ink-3 uppercase tracking-widest mb-1">Latest</p>
                    <p className="text-xs text-ink-2 line-clamp-2 leading-snug group-hover:text-ink transition">
                      {latest.title}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-1 mt-4 text-xs font-mono text-ink-3 group-hover:text-accent transition">
                  Browse <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Recent posts */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-1">Latest</p>
            <h2 className="font-heading font-bold text-xl">Recent Posts</h2>
          </div>
          <span className="text-xs text-ink-3 font-mono">{posts.length} total</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length > 6 && (
          <p className="text-center mt-8 text-sm text-ink-3 font-mono">
            Click a category above to browse all {posts.length} posts
          </p>
        )}
      </div>
    </div>
  )
}

function SearchBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  return (
    <div className="relative mb-8">
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
      <input
        type="text"
        placeholder="Search all posts by title, topic, or tag..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-3 outline-none focus:border-accent/50 transition"
      />
      {search && (
        <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition">
          <X size={16} />
        </button>
      )}
    </div>
  )
}

function TagStrip({ tags, activeTag, setActiveTag }: {
  tags: string[]
  activeTag: string | null
  setActiveTag: (t: string | null) => void
}) {
  if (tags.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5 mb-8">
      {tags.slice(0, 16).map((tag) => (
        <button
          key={tag}
          onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          className={cn(
            'px-3 py-1 rounded-full text-xs border transition',
            activeTag === tag
              ? getTagColor(tag)
              : 'bg-surface border-border text-ink-3 hover:text-ink-2 hover:border-border-2'
          )}
        >
          #{tag}
        </button>
      ))}
    </div>
  )
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-20">
      <p className="text-ink-2 text-lg">No posts found</p>
      <p className="text-ink-3 text-sm mt-1 font-mono">Try different keywords or filters</p>
      <button onClick={onClear} className="mt-4 text-accent text-sm hover:underline">Clear all filters</button>
    </div>
  )
}