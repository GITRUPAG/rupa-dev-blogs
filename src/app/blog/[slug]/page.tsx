import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { PostHeader } from '@/components/blog/PostHeader'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { GiscusComments } from '@/components/blog/GiscusComments'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { CopyCodeButton } from '@/components/blog/CopyCodeButton'
import { MDXComponents } from '@/components/blog/MDXComponents'
import { SeriesNav } from '@/components/blog/SeriesNav'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

interface Props {
  params: { slug: string }
}

// SSG — generate all blog post pages at build time
export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeHighlight,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ] as Parameters<typeof MDXRemote>[0]['options']['mdxOptions']['rehypePlugins'],
  },
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post)

  // Structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://rupa.dev/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rupa.dev',
      url: 'https://rupa.dev',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
          {/* Main content */}
          <article>
            <PostHeader post={post} />

            {/* Series navigation */}
            {post.series && (
              <SeriesNav currentPost={post} seriesName={post.series} />
            )}

            {/* MDX content */}
            <div className="prose prose-lg max-w-none mt-10">
              <MDXRemote
                source={post.content || ''}
                components={MDXComponents}
                options={mdxOptions}
              />
            </div>

            {/* Post footer */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-mono text-ink-2"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {post.githubRepo && (
                <a
                  href={post.githubRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface border border-border hover:border-border-2 rounded-lg text-sm text-ink-2 hover:text-ink transition mb-8"
                >
                  ⬡ View source code on GitHub →
                </a>
              )}
            </div>

            {/* Newsletter CTA in post */}
            <div className="bg-surface border border-border rounded-2xl p-8 mb-12">
              <p className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
                ✦ Enjoyed this post?
              </p>
              <h3 className="font-heading font-bold text-xl mb-2">
                Get posts like this in your inbox
              </h3>
              <p className="text-ink-2 text-sm mb-5">
                No spam, just real tutorials when they&apos;re ready.
              </p>
              <NewsletterForm compact />
            </div>

            {/* Giscus Comments */}
            <GiscusComments />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents content={post.content || ''} />

              {relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} />
              )}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
