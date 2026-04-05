import type { Metadata } from 'next'
import { getAllPosts, getAllTags, getAllCategories } from '@/lib/posts'
import { BlogListClient } from './BlogListClient'

export const metadata: Metadata = {
  title: 'All Posts',
  description: 'Browse all full-stack development tutorials, project walkthroughs, and deep dives.',
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default function BlogPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const categories = getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">
          All Posts
        </p>
        <h1 className="font-heading font-extrabold text-4xl mb-3">The Blog</h1>
        <p className="text-ink-2 text-lg max-w-2xl">
          Deep-dives, real builds, and tutorials that actually work.
          {posts.length > 0 && ` ${posts.length} articles and counting.`}
        </p>
      </div>
      <BlogListClient posts={posts} tags={tags} categories={categories} />
    </div>
  )
}
