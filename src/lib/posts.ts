import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post } from '@/types'

const POSTS_PATH = path.join(process.cwd(), 'content/posts')

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_PATH)) return []
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ''))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(POSTS_PATH, `${slug}.mdx`)
    const altPath = path.join(POSTS_PATH, `${slug}.md`)
    const filePath = fs.existsSync(fullPath) ? fullPath : altPath

    if (!fs.existsSync(filePath)) return null

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: typeof data.title === 'string' ? data.title : '',
description: typeof data.description === 'string' ? data.description : '',
      date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
      tags: Array.isArray(data.tags) ? data.tags.filter(Boolean) : [],
      category: typeof data.category === 'string' ? data.category : 'general',
      readingTime: stats.text,
      featured: data.featured || false,
      series: data.series,
      seriesOrder: data.seriesOrder,
      coverImage: data.coverImage,
      githubRepo: data.githubRepo,
      author: data.author || {
        name: 'Rupa',
        github: 'https://github.com/GITRUPAG',
        linkedin: 'https://www.linkedin.com/in/g-rupa-799a43240/',
      },
      content,
    }
  } catch {
    return null
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  )
}

export function getPostsBySeries(series: string): Post[] {
  return getAllPosts()
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)))
  return Array.from(tags).sort()
}

export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set<string>()
  posts.forEach((post) => categories.add(post.category))
  return Array.from(categories).sort()
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const all = getAllPosts()
  return all
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => currentPost.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post }) => post)
}
