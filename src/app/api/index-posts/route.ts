import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'
import { indexPostsToAlgolia } from '@/lib/algolia'

// POST /api/index-posts - reindex all posts to Algolia
// Protected by CRON_SECRET env variable
export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const posts = getAllPosts()

    const algoliaRecords = posts.map((post) => ({
      objectID: post.slug,
      title: post.title,
      description: post.description,
      slug: post.slug,
      tags: post.tags,
      category: post.category,
      date: post.date,
      readingTime: post.readingTime,
      featured: post.featured || false,
    }))

    await indexPostsToAlgolia(algoliaRecords)

    return NextResponse.json({
      success: true,
      indexed: algoliaRecords.length,
    })
  } catch (error) {
    console.error('Indexing error:', error)
    return NextResponse.json({ error: 'Indexing failed' }, { status: 500 })
  }
}
