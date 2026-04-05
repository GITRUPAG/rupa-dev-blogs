/**
 * scripts/index-algolia.mjs
 *
 * Run this after build to index all posts to Algolia:
 *   node scripts/index-algolia.mjs
 *
 * Requires ALGOLIA_ADMIN_KEY and related env vars to be set.
 */

import { createRequire } from 'module'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

// Load env from .env.local manually for scripts
function loadEnv() {
  const envPath = join(__dirname, '..', '.env.local')
  if (!existsSync(envPath)) return

  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (key && rest.length) {
      process.env[key.trim()] = rest.join('=').trim().replace(/^["']|["']$/g, '')
    }
  }
}

loadEnv()

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const adminKey = process.env.ALGOLIA_ADMIN_KEY
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'rupa_dev_posts'

if (!appId || !adminKey) {
  console.error('❌ Missing NEXT_PUBLIC_ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY')
  process.exit(1)
}

// Dynamically import algoliasearch
const algoliasearch = (await import('algoliasearch')).default
const matter = (await import('gray-matter')).default

const client = algoliasearch(appId, adminKey)
const index = client.initIndex(indexName)

const POSTS_PATH = join(__dirname, '..', 'content', 'posts')
const files = readdirSync(POSTS_PATH).filter((f) => /\.mdx?$/.test(f))

const records = files.map((file) => {
  const slug = file.replace(/\.mdx?$/, '')
  const content = readFileSync(join(POSTS_PATH, file), 'utf8')
  const { data } = matter(content)

  return {
    objectID: slug,
    slug,
    title: data.title || slug,
    description: data.description || '',
    tags: data.tags || [],
    category: data.category || 'general',
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    featured: data.featured || false,
  }
})

await index.setSettings({
  searchableAttributes: ['title', 'description', 'tags', 'category'],
  attributesForFaceting: ['tags', 'category'],
  customRanking: ['desc(date)', 'desc(featured)'],
})

await index.saveObjects(records)
console.log(`✅ Indexed ${records.length} posts to Algolia index "${indexName}"`)
