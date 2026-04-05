'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Lesson {
  id: string
  title: string
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  exercises?: number
  slug?: string
}

interface Path {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  color: string
  bg: string
  border: string
  weeks: number
  lessons: Lesson[]
}

const LEVEL_STYLES = {
  beginner: 'text-accent-3 bg-accent-3/10 border-accent-3/20',
  intermediate: 'text-accent-4 bg-accent-4/10 border-accent-4/20',
  advanced: 'text-accent-2 bg-accent-2/10 border-accent-2/20',
}

export function LearningPathTracker({ path }: { path: Path }) {
  const storageKey = `rupa_progress_${path.id}`
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setCompleted(new Set(JSON.parse(saved)))
    } catch {}
  }, [storageKey])

  const toggleLesson = (lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(lessonId)) {
        next.delete(lessonId)
      } else {
        next.add(lessonId)
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)))
      } catch {}
      return next
    })
  }

  const progress = Math.round((completed.size / path.lessons.length) * 100)
  const allDone = completed.size === path.lessons.length

  return (
    <div className={cn('bg-surface border rounded-2xl overflow-hidden', path.border)}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={cn('text-2xl w-12 h-12 flex items-center justify-center rounded-xl', path.bg)}>
              {path.icon}
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl">{path.title}</h2>
              <p className="text-ink-2 text-sm mt-0.5">{path.description}</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 text-ink-3 hover:text-ink transition rounded-lg hover:bg-surface-2 shrink-0"
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-mono text-ink-3 mb-1.5">
              <span>{completed.size}/{path.lessons.length} lessons</span>
              <span className={cn(progress > 0 ? path.color : 'text-ink-3')}>{progress}%</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-500', path.bg, 'opacity-80')}
                style={{ width: `${progress}%`, background: progress > 0 ? 'currentColor' : undefined }}
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-ink-3 font-mono shrink-0">
            <Clock size={12} />
            {path.weeks} weeks
          </div>
          {allDone && (
            <span className="text-xs font-mono text-accent-3 bg-accent-3/10 border border-accent-3/20 rounded-full px-2.5 py-1">
              ✓ Complete!
            </span>
          )}
        </div>
      </div>

      {/* Lessons list */}
      {expanded && (
        <div className="divide-y divide-border">
          {path.lessons.map((lesson, index) => {
            const isDone = completed.has(lesson.id)
            const isLocked = false // Could lock based on progress

            return (
              <div
                key={lesson.id}
                className={cn(
                  'flex items-center gap-4 px-6 py-4 transition hover:bg-surface-2 group',
                  isDone && 'bg-accent-3/5'
                )}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleLesson(lesson.id)}
                  className="shrink-0 text-ink-3 hover:text-accent-3 transition"
                  aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
                >
                  {isDone ? (
                    <CheckCircle2 size={20} className="text-accent-3" />
                  ) : (
                    <Circle size={20} />
                  )}
                </button>

                {/* Step number */}
                <span className={cn('font-mono text-sm font-bold w-6', isDone ? 'text-accent-3' : 'text-border-2')}>
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('text-sm font-medium transition', isDone ? 'line-through text-ink-3' : 'text-ink group-hover:text-accent')}>
                      {lesson.title}
                    </span>
                    <span className={cn('text-xs font-mono px-2 py-0.5 rounded border', LEVEL_STYLES[lesson.level])}>
                      {lesson.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5 text-xs text-ink-3 font-mono">
                    <span className="flex items-center gap-1"><Clock size={10} />{lesson.duration}</span>
                    {lesson.exercises && <span>{lesson.exercises} exercises</span>}
                  </div>
                </div>

                {/* Read post link */}
                {lesson.slug && (
                  <Link
                    href={`/blog/${lesson.slug}`}
                    className="shrink-0 text-xs text-accent hover:underline font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    Read <ArrowRight size={10} />
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Footer CTA */}
      {expanded && (
        <div className="px-6 py-4 border-t border-border bg-surface-2">
          <Link
            href={`/learn/${path.slug}`}
            className={cn('text-sm font-medium flex items-center gap-1.5 transition', path.color, 'hover:opacity-80')}
          >
            View full {path.title} path <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  )
}
