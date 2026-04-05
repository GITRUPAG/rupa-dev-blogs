import Link from 'next/link'
import { BookOpen, ArrowRight, Zap, Star } from 'lucide-react'

const PATHS = [
  {
    icon: BookOpen,
    title: 'React Roadmap',
    href: '/learn/react',
    weeks: 12,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    progress: 0,
  },
  {
    icon: Zap,
    title: 'Spring Boot',
    href: '/learn/spring-boot',
    weeks: 8,
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    progress: 0,
  },
  {
    icon: Star,
    title: 'Full Stack Path',
    href: '/learn/fullstack',
    weeks: 16,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    progress: 0,
  },
]

export function LearningPathPreview() {
  return (
    <div className="glass-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-accent-3" />
          <p className="text-xs font-mono text-accent-3 uppercase tracking-widest">Learn</p>
        </div>
        <Link
          href="/learn"
          className="text-xs text-ink-3 hover:text-ink flex items-center gap-1 font-mono transition"
        >
          All paths <ArrowRight size={10} />
        </Link>
      </div>

      <div className="space-y-2">
        {PATHS.map(({ icon: Icon, title, href, weeks, color, bg, border }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface transition"
          >
            <div className={`p-1.5 rounded-lg ${bg} border ${border} shrink-0`}>
              <Icon size={13} className={color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-none mb-0.5 group-hover:text-accent transition">
                {title}
              </p>
              <p className="text-xs text-ink-3 font-mono">{weeks} weeks</p>
            </div>
            <ArrowRight
              size={13}
              className="text-ink-3 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
            />
          </Link>
        ))}
      </div>

      <Link
        href="/learn"
        className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-xs font-mono text-accent hover:bg-accent/20 transition"
      >
        Start a learning path <ArrowRight size={11} />
      </Link>
    </div>
  )
}