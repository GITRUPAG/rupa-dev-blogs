import Link from 'next/link'
import { TrendingUp, ArrowRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { getPostsBySeries } from '@/lib/posts'
import { formatDate, getCategoryConfig } from '@/lib/utils'
import type { Post } from '@/types'

// Related Posts sidebar
export function RelatedPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-4">
        Related Posts
      </h3>
      <div className="space-y-3">
        {posts.map((post) => {
          const config = getCategoryConfig(post.category)
          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <p className="text-sm font-medium text-ink-2 group-hover:text-accent transition line-clamp-2 leading-snug mb-1">
                {post.title}
              </p>
              <span className={`text-xs font-mono ${config.color}`}>{config.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

// Trending posts for homepage sidebar
export function TrendingPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={14} className="text-accent" />
        <h3 className="text-xs font-mono text-ink-3 uppercase tracking-widest">
          Trending This Week
        </h3>
      </div>
      <ol className="space-y-3">
        {posts.map((post, i) => (
          <li key={post.slug} className="flex items-start gap-3 group">
            <span className="font-heading font-bold text-xl text-border-2 shrink-0 w-6 leading-none mt-0.5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm text-ink-2 group-hover:text-ink transition line-clamp-2 leading-snug"
              >
                {post.title}
              </Link>
              <p className="text-xs text-ink-3 font-mono mt-0.5">{post.readingTime}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// Learning path preview for homepage
export function LearningPathPreview() {
  const paths = [
    { title: 'React Mastery', href: '/learn/react', weeks: 12, level: 'Beginner → Advanced', color: 'text-cyan-400' },
    { title: 'Spring Boot', href: '/learn/spring-boot', weeks: 8, level: 'Beginner → Pro', color: 'text-orange-400' },
    { title: 'Full Stack', href: '/learn/fullstack', weeks: 16, level: 'Complete Roadmap', color: 'text-accent' },
  ]

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={14} className="text-accent-3" />
        <h3 className="text-xs font-mono text-ink-3 uppercase tracking-widest">
          Learning Paths
        </h3>
      </div>
      <div className="space-y-3">
        {paths.map(({ title, href, weeks, level, color }) => (
          <Link
            key={title}
            href={href}
            className="flex items-center justify-between group p-2 -mx-2 rounded-lg hover:bg-surface-2 transition"
          >
            <div>
              <p className={`text-sm font-medium ${color} group-hover:opacity-80 transition`}>
                {title}
              </p>
              <p className="text-xs text-ink-3 font-mono">{weeks} weeks · {level}</p>
            </div>
            <ArrowRight size={14} className="text-ink-3 group-hover:text-ink-2 transition" />
          </Link>
        ))}
      </div>
    </div>
  )
}

// Series navigation within a post
export function SeriesNav({ currentPost, seriesName }: { currentPost: Post; seriesName: string }) {
  const seriesPosts = getPostsBySeries(seriesName)
  const currentIndex = seriesPosts.findIndex((p) => p.slug === currentPost.slug)
  const prev = seriesPosts[currentIndex - 1]
  const next = seriesPosts[currentIndex + 1]

  if (seriesPosts.length < 2) return null

  const progress = ((currentIndex + 1) / seriesPosts.length) * 100

  return (
    <div className="not-prose bg-surface border border-accent/20 rounded-xl p-5 my-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-mono text-accent uppercase tracking-wider mb-0.5">Series</p>
          <p className="font-heading font-semibold">{seriesName}</p>
        </div>
        <span className="text-xs font-mono text-ink-3">
          {currentIndex + 1} / {seriesPosts.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-border rounded-full mb-4 overflow-hidden">
        <div
          className="series-progress"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Prev / Next */}
      <div className="flex gap-3">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="flex-1 flex items-center gap-2 p-3 bg-bg-2 border border-border hover:border-border-2 rounded-lg text-sm transition group"
          >
            <ChevronLeft size={14} className="text-ink-3 group-hover:text-ink shrink-0" />
            <div className="min-w-0">
              <p className="text-xs text-ink-3 font-mono mb-0.5">Previous</p>
              <p className="text-ink-2 group-hover:text-ink transition truncate text-xs">{prev.title}</p>
            </div>
          </Link>
        ) : <div className="flex-1" />}

        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="flex-1 flex items-center justify-end gap-2 p-3 bg-bg-2 border border-border hover:border-border-2 rounded-lg text-sm transition group"
          >
            <div className="min-w-0 text-right">
              <p className="text-xs text-ink-3 font-mono mb-0.5">Next</p>
              <p className="text-ink-2 group-hover:text-ink transition truncate text-xs">{next.title}</p>
            </div>
            <ChevronRight size={14} className="text-ink-3 group-hover:text-ink shrink-0" />
          </Link>
        )}
      </div>
    </div>
  )
}
