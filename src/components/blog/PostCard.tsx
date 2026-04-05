import Link from 'next/link'
import { Clock, Calendar, Bookmark } from 'lucide-react'
import { cn, formatDate, getCategoryConfig, getTagColor } from '@/lib/utils'
import type { Post } from '@/types'

interface Props {
  post: Post
  featured?: boolean
  variant?: 'default' | 'compact'
}

export function PostCard({ post, featured, variant = 'default' }: Props) {
  const config = getCategoryConfig(post.category)

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${post.slug}`} className="group flex items-start gap-4 p-4 rounded-xl hover:bg-surface transition">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-xs font-mono font-medium', config.color)}>
              {config.label}
            </span>
            <span className="text-ink-3 text-xs font-mono">{formatDate(post.date)}</span>
          </div>
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-accent transition leading-snug">
            {post.title}
          </h3>
        </div>
        <span className="text-xs text-ink-3 font-mono whitespace-nowrap mt-0.5">
          {post.readingTime}
        </span>
      </Link>
    )
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'group block bg-surface border border-border rounded-xl overflow-hidden hover:border-border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20',
        featured && 'md:col-span-2'
      )}
    >
      {/* Category stripe */}
      <div className={cn('h-0.5 w-full', config.bg)} />

      <div className="p-5">
        {/* Meta row */}
        <div className="flex items-center justify-between mb-3">
          <span
            className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold border',
              config.bg, config.color, 'border-current/20'
            )}
          >
            {config.label}
          </span>
          {post.series && (
            <span className="text-xs font-mono text-accent-4 bg-accent-4/10 border border-accent-4/20 rounded-full px-2 py-0.5">
              Series
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={cn(
            'font-heading font-semibold leading-snug mb-2 group-hover:text-accent transition',
            featured ? 'text-xl' : 'text-base line-clamp-2'
          )}
        >
          {post.title}
        </h3>

        {/* Description */}
        <p className="text-ink-2 text-sm leading-relaxed line-clamp-2 mb-4">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                'px-2 py-0.5 rounded text-xs font-mono border',
                getTagColor(tag)
              )}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3 text-xs text-ink-3 font-mono">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime}
            </span>
          </div>
          {post.githubRepo && (
            <span className="text-xs text-accent-3 font-mono">↓ Code</span>
          )}
        </div>
      </div>
    </Link>
  )
}
