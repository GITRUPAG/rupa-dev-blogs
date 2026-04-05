import Link from 'next/link'
import { TrendingUp, Clock } from 'lucide-react'
import { cn, getCategoryConfig } from '@/lib/utils'
import type { Post } from '@/types'

interface Props {
  posts: Post[]
}

export function TrendingPosts({ posts }: Props) {
  return (
    <div className="glass-card p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={14} className="text-accent" />
        <p className="text-xs font-mono text-accent uppercase tracking-widest">Trending</p>
      </div>

      <div className="space-y-1">
        {posts.map((post, i) => {
          const config = getCategoryConfig(post.category)
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface transition"
            >
              {/* Rank number */}
              <span
                className={cn(
                  'text-xl font-heading font-extrabold leading-none mt-0.5 w-6 shrink-0 select-none',
                  i === 0
                    ? 'text-accent'
                    : i === 1
                    ? 'text-accent-2'
                    : i === 2
                    ? 'text-accent-3'
                    : 'text-border-2'
                )}
              >
                {i + 1}
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-ink-3 mb-0.5">
                  <span className={cn('font-medium', config.color)}>{config.label}</span>
                </p>
                <h4 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-accent transition">
                  {post.title}
                </h4>
                <span className="inline-flex items-center gap-1 mt-1 text-xs text-ink-3 font-mono">
                  <Clock size={10} />
                  {post.readingTime}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}