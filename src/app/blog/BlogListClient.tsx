'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, X, ArrowRight, BookOpen, Layers, ChevronLeft } from 'lucide-react'
import { PostCard } from '@/components/blog/PostCard'
import { cn, getCategoryConfig, getTagColor } from '@/lib/utils'
import type { Post } from '@/types'

interface Props {
  posts: Post[]
  tags: string[]
  categories: string[]
}

const CATEGORY_META: Record<string, { emoji: string; desc: string }> = {
  react:      { emoji: '⚛️', desc: 'Hooks, performance, patterns & real React apps' },
  java:       { emoji: '🍃', desc: 'Spring Boot, JWT, JPA & production APIs' },
  fullstack:  { emoji: '🚀', desc: 'End-to-end builds with React + Spring Boot' },
  ai:         { emoji: '🤖', desc: 'ML concepts, AI tools & practical integrations' },
  project:    { emoji: '📦', desc: 'Real project walkthroughs from idea to deploy' },
  series:     { emoji: '📚', desc: 'Multi-part deep dives on complex topics' },
  devops:     { emoji: '🛠️', desc: 'Docker, CI/CD, AWS & deployment strategies' },
}

export function BlogListClient({ posts, tags, categories }: Props) {
  const [search, setSearch]               = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag]         = useState<string | null>(null)

  const isFiltering = search || activeTag

  // Posts filtered by search/tag (used in drill-down and search mode)
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

  // Group posts by category for the hub view
  const grouped = useMemo(() => {
    return categories.map((cat) => ({
      cat,
      posts: posts.filter((p) => p.category === cat),
    })).filter((g) => g.posts.length > 0)
  }, [posts, categories])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory(null)
    setActiveTag(null)
  }

  // ── SEARCH MODE: show flat filtered results ──────────────────────────────
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
    const config  = getCategoryConfig(activeCategory)
    const meta    = CATEGORY_META[activeCategory]
    const catPosts = posts.filter((p) => p.category === activeCategory)

    return (
      <div>
        <SearchBar search={search} setSearch={setSearch} />

        {/* Back + header */}
        <button
          onClick={() => setActiveCategory(null)}
          className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink transition mb-6 font-mono"
        >
          <ChevronLeft size={14} /> All categories
        </button>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">{meta?.emoji ?? '📁'}</span>
          <div>
            <h2 className={`font-heading font-bold text-2xl ${config.color}`}>{config.label}</h2>
            <p className="text-sm text-ink-2 mt-0.5">{meta?.desc}</p>
          </div>
          <span className="ml-auto text-xs font-mono text-ink-3 bg-surface border border-border px-3 py-1 rounded-full">
            {catPosts.length} post{catPosts.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Tag filter within this category */}
        <TagStrip
          tags={Array.from(new Set(catPosts.flatMap((p) => p.tags))).sort()}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>

        {filtered.length === 0 && <EmptyState onClear={clearFilters} />}
      </div>
    )
  }

  // ── HUB VIEW: category cards ─────────────────────────────────────────────
  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />

      {/* Category grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {grouped.map(({ cat, posts: catPosts }) => {
          const config = getCategoryConfig(cat)
          const meta   = CATEGORY_META[cat]
          const latest = catPosts[0]

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'group text-left bg-surface border rounded-2xl overflow-hidden hover:border-border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20',
                `border-border`
              )}
            >
              {/* Top stripe */}
              <div className={cn('h-1 w-full', config.bg)} />

              <div className="p-5">
                {/* Emoji + count */}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{meta?.emoji ?? '📁'}</span>
                  <span className={cn(
                    'text-xs font-mono px-2.5 py-0.5 rounded-full border',
                    config.bg, config.color, 'border-current/20'
                  )}>
                    {catPosts.length} post{catPosts.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <h3 className={cn('font-heading font-bold text-lg mb-1 group-hover:opacity-90 transition', config.color)}>
                  {config.label}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed mb-4">{meta?.desc}</p>

                {/* Latest post preview */}
                {latest && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-[10px] font-mono text-ink-3 uppercase tracking-widest mb-1">Latest</p>
                    <p className="text-xs text-ink-2 line-clamp-2 leading-snug group-hover:text-ink transition">
                      {latest.title}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-1 mt-4 text-xs font-mono text-ink-3 group-hover:text-accent transition">
                  Browse {config.label} <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Recent across all */}
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
          <div className="text-center mt-8">
            <p className="text-sm text-ink-2 font-mono mb-1">
              Showing 6 of {posts.length} posts
            </p>
            <p className="text-xs text-ink-3">Click a category above to browse all posts in it</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────

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

function TagStrip({
  tags, activeTag, setActiveTag,
}: {
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
      <button onClick={onClear} className="mt-4 text-accent text-sm hover:underline">
        Clear all filters
      </button>
    </div>
  )
}