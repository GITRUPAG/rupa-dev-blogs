import { NextRequest, NextResponse } from 'next/server'
import algoliasearch from 'algoliasearch'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  if (!query.trim()) {
    return NextResponse.json({ hits: [] })
  }

  const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
  const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'rupa_dev_posts'

  if (!appId || !searchKey) {
    // Fallback: return empty if Algolia not configured
    return NextResponse.json({ hits: [], error: 'Algolia not configured' })
  }

  try {
    const client = algoliasearch(appId, searchKey)
    const index = client.initIndex(indexName)

    const { hits } = await index.search(query, {
      hitsPerPage: 8,
      attributesToRetrieve: ['objectID', 'title', 'description', 'slug', 'category', 'tags', 'date'],
      attributesToHighlight: ['title', 'description'],
    })

    return NextResponse.json({ hits })
  } catch (error) {
    console.error('Algolia search error:', error)
    return NextResponse.json({ hits: [], error: 'Search failed' }, { status: 500 })
  }
}
