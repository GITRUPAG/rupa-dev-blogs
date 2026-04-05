'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import { PostCard } from '@/components/blog/PostCard'
import { cn, getCategoryConfig, getTagColor } from '@/lib/utils'
import type { Post } from '@/types'

interface Props {
  posts: Post[]
  tags: string[]
  categories: string[]
}

export function BlogListClient({ posts, tags, categories }: Props) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchesCategory = !activeCategory || post.category === activeCategory
      const matchesTag = !activeTag || post.tags.includes(activeTag)
      return matchesSearch && matchesCategory && matchesTag
    })
  }, [posts, search, activeCategory, activeTag])

  const clearFilters = () => {
    setSearch('')
    setActiveCategory(null)
    setActiveTag(null)
  }

  const hasFilters = search || activeCategory || activeTag

  return (
    <div>
      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          type="text"
          placeholder="Search posts by title, topic, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink-3 outline-none focus:border-accent/50 transition"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink transition"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            'px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition',
            !activeCategory
              ? 'bg-accent text-white border-accent'
              : 'bg-surface border-border text-ink-2 hover:border-border-2'
          )}
        >
          All
        </button>
        {categories.map((cat) => {
          const config = getCategoryConfig(cat)
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                'px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition',
                activeCategory === cat
                  ? `${config.bg} ${config.color} border-current/30`
                  : 'bg-surface border-border text-ink-2 hover:border-border-2'
              )}
            >
              {config.label}
            </button>
          )
        })}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {tags.slice(0, 12).map((tag) => (
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

      {/* Results header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-ink-2 font-mono">
          {filtered.length} post{filtered.length !== 1 ? 's' : ''}
          {hasFilters && ' found'}
        </p>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-accent hover:underline font-mono flex items-center gap-1"
          >
            <X size={12} /> Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-ink-2 text-lg">No posts found</p>
          <p className="text-ink-3 text-sm mt-1 font-mono">Try different keywords or filters</p>
          <button onClick={clearFilters} className="mt-4 text-accent text-sm hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
