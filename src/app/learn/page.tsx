import type { Metadata } from 'next'
import { BookOpen, Zap, Star, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Learning Paths',
  description: 'Structured roadmaps from beginner to job-ready. Coming soon.',
}

const upcomingPaths = [
  {
    icon: '⚛',
    title: 'React Mastery',
    desc: 'From zero to job-ready in 12 weeks',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    weeks: 12,
  },
  {
    icon: '🍃',
    title: 'Spring Boot',
    desc: 'REST APIs, Security & Deployment',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    weeks: 8,
  },
  {
    icon: '🚀',
    title: 'Full Stack Path',
    desc: 'React + Spring Boot + AWS end-to-end',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    weeks: 16,
  },
]

export default function LearnPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        Under Construction
      </div>

      {/* Heading */}
      <h1 className="font-heading font-extrabold text-4xl sm:text-5xl mb-4">
        Free Courses &{' '}
        <span className="gradient-text">Classes</span>
        <br />are on the way
      </h1>

      <p className="text-ink-2 text-lg max-w-xl mx-auto mb-14">
        Structured learning paths with hands-on exercises, progress tracking, and zero paywalls.
        We&apos;re putting the finishing touches on them now.
      </p>

      {/* Upcoming path cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
        {upcomingPaths.map(({ icon, title, desc, color, bg, border, weeks }) => (
          <div
            key={title}
            className={`glass-card p-6 text-left opacity-70 relative overflow-hidden`}
          >
            {/* Coming soon ribbon */}
            <span className="absolute top-3 right-3 text-[10px] font-mono text-ink-3 bg-surface-2 border border-border px-2 py-0.5 rounded-full">
              Soon
            </span>

            <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center text-xl mb-4`}>
              {icon}
            </div>
            <h3 className={`font-heading font-bold text-base mb-1 ${color}`}>{title}</h3>
            <p className="text-sm text-ink-2 mb-3">{desc}</p>
            <p className="text-xs font-mono text-ink-3">{weeks} weeks · Free forever</p>
          </div>
        ))}
      </div>

      {/* What to expect */}
      <div className="glass-card p-8 text-left mb-10">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-4">What to expect</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, label: 'Structured lessons', desc: 'Step-by-step modules with clear goals at every stage.' },
            { icon: Zap, label: 'Hands-on exercises', desc: 'Code challenges after each lesson — no passive reading.' },
            { icon: Star, label: 'Progress tracking', desc: 'Your progress saved locally in the browser. No sign-up needed.' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex gap-3">
              <Icon size={16} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold mb-0.5">{label}</p>
                <p className="text-xs text-ink-2">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <p className="text-sm text-ink-3 font-mono">
        <Bell size={13} className="inline mr-1.5 text-accent" />
        Subscribe to the{' '}
        <a href="/newsletter" className="text-accent underline underline-offset-4 hover:text-accent/80 transition">
          newsletter
        </a>{' '}
        to get notified when courses drop.
      </p>

    </div>
  )
}