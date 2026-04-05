import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, BookOpen, Zap } from 'lucide-react'
import { getAllPosts, getFeaturedPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { HeroSection } from '@/components/blog/HeroSection'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { TrendingPosts } from '@/components/blog/TrendingPosts'
import { LearningPathPreview } from '@/components/blog/LearningPathPreview'
import { formatDate, getCategoryConfig } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Rupa.dev — Full-Stack Developer Blog',
  description: 'Real projects. Real code. Full-stack tutorials on React, Spring Boot, and more.',
}

// SSG — generated at build time
export const dynamic = 'force-static'
export const revalidate = 3600 // ISR: revalidate every hour

export default async function HomePage() {
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts().slice(0, 3)
  const latestPosts = allPosts.slice(0, 6)
  const categories = ['react', 'java', 'fullstack', 'ai', 'project', 'series']

  const stats = {
    posts: allPosts.length,
    readers: '12k+',
    series: 6,
    projects: 3,
  }

  return (
    <div>
      {/* Hero */}
      <HeroSection stats={stats} />

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const config = getCategoryConfig(cat)
            return (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium border transition hover:scale-105 ${config.bg} ${config.color} border-current/20`}
              >
                {config.label}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-1">
                ✦ Featured
              </p>
              <h2 className="font-heading font-bold text-2xl">Featured Posts</h2>
            </div>
            <Link
              href="/blog"
              className="text-sm text-ink-2 hover:text-ink flex items-center gap-1 transition"
            >
              All posts <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Latest + Trending */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Posts */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-1">Latest</p>
                <h2 className="font-heading font-bold text-2xl">Recent Posts</h2>
              </div>
            </div>
            <div className="space-y-4">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} variant="compact" />
              ))}
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mt-6 text-sm text-accent hover:text-accent/80 font-medium transition"
            >
              Browse all {allPosts.length} posts <ArrowRight size={14} />
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrendingPosts posts={allPosts.slice(0, 5)} />
            <LearningPathPreview />
          </div>
        </div>
      </section>

      {/* Learning Paths CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: BookOpen, title: 'React Roadmap', desc: 'Beginner to job-ready in 12 weeks', href: '/learn/react', color: 'text-cyan-400' },
            { icon: Zap, title: 'Spring Boot', desc: 'REST APIs + Security + Deployment', href: '/learn/spring-boot', color: 'text-orange-400' },
            { icon: Star, title: 'Full Stack Path', desc: 'Build complete products end-to-end', href: '/learn/fullstack', color: 'text-accent' },
          ].map(({ icon: Icon, title, desc, href, color }) => (
            <Link
              key={title}
              href={href}
              className="glass-card p-6 hover:border-border-2 transition group hover:-translate-y-1"
            >
              <Icon className={`${color} mb-3`} size={22} />
              <h3 className="font-heading font-semibold text-base mb-1 group-hover:text-accent transition">{title}</h3>
              <p className="text-sm text-ink-2">{desc}</p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs text-accent font-mono">
                Start learning <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="gradient-border p-1 rounded-2xl">
          <div className="bg-bg-2 rounded-[11px] p-10 text-center">
            <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">Stay in the loop</p>
            <h2 className="font-heading font-extrabold text-3xl mb-3">
              Get new posts in your inbox
            </h2>
            <p className="text-ink-2 max-w-md mx-auto mb-8">
              No spam. Just real tutorials, project updates, and dev wisdom — when they&apos;re ready.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  )
}
