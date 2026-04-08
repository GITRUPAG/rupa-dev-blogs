import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string): string {
  if (!dateString) return ''

  try {
    const date = parseISO(dateString)
    if (isNaN(date.getTime())) return ''
    return format(date, 'MMM d, yyyy')
  } catch {
    return ''
  }
}

export function formatDateShort(dateString?: string): string {
  if (!dateString) return ''

  try {
    const date = parseISO(dateString)
    if (isNaN(date.getTime())) return ''
    return format(date, 'MMM yyyy')
  } catch {
    return ''
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const TAG_COLORS: Record<string, string> = {
  react: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'spring-boot': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  java: 'bg-orange-600/10 text-orange-500 border-orange-600/20',
  typescript: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  nextjs: 'bg-white/10 text-white border-white/20',
  postgresql: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  docker: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  aws: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  ai: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  fullstack: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  default: 'bg-surface-2 text-ink-2 border-border',
}

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag.toLowerCase()] || TAG_COLORS.default
}

export const CATEGORY_CONFIG = {
  react: { label: 'React', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  java:        { label: 'Java',         color: 'text-red-400',     bg: 'bg-red-500/10' },       // ← changed
  'spring-boot': { label: 'Spring Boot', color: 'text-orange-400', bg: 'bg-orange-500/10' },    // ← new
  fullstack: { label: 'Full Stack', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ai: { label: 'AI / ML', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  project: { label: 'Projects', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  series: { label: 'Series', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  devops: { label: 'DevOps', color: 'text-sky-400', bg: 'bg-sky-500/10' },
}

export function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category as keyof typeof CATEGORY_CONFIG] || {
    label: category,
    color: 'text-ink-2',
    bg: 'bg-surface-2',
  }
}
