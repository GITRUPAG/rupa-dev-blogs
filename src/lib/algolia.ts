import algoliasearch from 'algoliasearch'

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
const adminKey = process.env.ALGOLIA_ADMIN_KEY!
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'rupa_dev_posts'

// Client-side search client (uses search-only key)
export const searchClient = algoliasearch(appId, searchKey)

// Server-side admin client (uses admin key - never expose to client)
export const adminClient = algoliasearch(appId, adminKey)

export { indexName }

// Types for Algolia records
export interface AlgoliaPost {
  objectID: string
  title: string
  description: string
  slug: string
  tags: string[]
  category: string
  date: string
  readingTime: string
  featured: boolean
}

// Index posts to Algolia (run during build or via admin API route)
export async function indexPostsToAlgolia(posts: AlgoliaPost[]) {
  const index = adminClient.initIndex(indexName)

  await index.setSettings({
    searchableAttributes: ['title', 'description', 'tags', 'category'],
    attributesForFaceting: ['tags', 'category'],
    customRanking: ['desc(date)', 'desc(featured)'],
    highlightPreTag: '<mark class="algolia-highlight">',
    highlightPostTag: '</mark>',
  })

  await index.saveObjects(posts)
  console.log(`Indexed ${posts.length} posts to Algolia`)
}
