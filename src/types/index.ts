export interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  readingTime: string
  featured?: boolean
  series?: string
  seriesOrder?: number
  coverImage?: string
  githubRepo?: string
  author: Author
  content?: string
}

export interface Author {
  name: string
  avatar?: string
  github?: string
  linkedin?: string
  twitter?: string
}

export interface Series {
  name: string
  slug: string
  description: string
  posts: Post[]
}

export interface LearningPath {
  id: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  weeks: number
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  slug?: string
  exercises?: number
}

export interface SearchResult {
  objectID: string
  title: string
  description: string
  slug: string
  tags: string[]
  category: string
  date: string
}
