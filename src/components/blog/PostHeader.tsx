import Link from 'next/link'
import { Clock, Calendar, Github, ArrowLeft } from 'lucide-react'
import { formatDate, getCategoryConfig } from '@/lib/utils'
import type { Post } from '@/types'

export function PostHeader({ post }: { post: Post }) {
  const config = getCategoryConfig(post.category)

  return (
    <header className="mb-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-ink-2 hover:text-ink transition mb-8 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition" />
        All Posts
      </Link>

      {/* Category + series badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold border ${config.bg} ${config.color} border-current/20`}
        >
          {config.label}
        </span>
        {post.series && (
          <span className="text-xs font-mono text-accent-4 bg-accent-4/10 border border-accent-4/20 rounded-full px-2.5 py-1">
            Part {post.seriesOrder} of {post.series}
          </span>
        )}
        {post.featured && (
          <span className="text-xs font-mono text-accent-3 bg-accent-3/10 border border-accent-3/20 rounded-full px-2.5 py-1">
            ✦ Featured
          </span>
        )}
      </div>

      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-4">
        {post.title}
      </h1>

      <p className="text-ink-2 text-xl leading-relaxed mb-6">{post.description}</p>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-5 text-sm text-ink-3 font-mono border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center text-xs font-bold text-white">
            R
          </div>
          <span className="text-ink-2 font-sans">by {post.author.name}</span>
        </div>
        <span className="flex items-center gap-1">
          <Calendar size={13} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={13} />
          {post.readingTime}
        </span>

        {post.githubRepo && (
          <a
            href={post.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-ink-2 hover:text-ink transition"
          >
            <Github size={14} />
            Source Code
          </a>
        )}
      </div>
    </header>
  )
}
