'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: number
}

function extractHeadings(content: string | undefined): Heading[] {
  if (!content) return []

  const regex = /^#{1,3}\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = regex.exec(content)) !== null) {
    const level = match[0].match(/^#+/)?.[0].length || 1
    const rawText = match[1] || ''
const text = rawText.replace(/[*_`]/g, '')
    const id = (text || '')
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .trim()
    headings.push({ id, text, level })
  }

  return headings
}

export function TableOfContents({ content }: { content: string | undefined }) {
  const headings = extractHeadings(content ?? '')
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <h3 className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-4">
        On this page
      </h3>
      <nav>
        <ul className="space-y-1 border-l border-border">
          {headings.map(({ id, text, level }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={cn(
                  'block text-xs leading-relaxed py-0.5 transition-all',
                  level === 1 ? 'pl-4 font-medium' : level === 2 ? 'pl-4' : 'pl-8',
                  activeId === id
                    ? 'toc-active text-accent font-medium'
                    : 'text-ink-2 hover:text-ink pl-4 border-l border-transparent hover:border-border-2 -ml-px'
                )}
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}