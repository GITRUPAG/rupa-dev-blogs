import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, Linkedin, Twitter, Youtube, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'I\'m Rupa — a full-stack developer, builder, and the person writing all these posts.',
}

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Spring Boot', 'Java', 'REST APIs', 'PostgreSQL'] },
  { category: 'DevOps', items: ['Docker', 'AWS', 'GitHub Actions', 'Vercel'] },
  { category: 'Tools', items: ['Git', 'Postman', 'IntelliJ', 'VS Code'] },
]

const timeline = [
  { year: '2024', title: 'Built & Launched SheCare', desc: 'Full-stack women\'s health app — React + Spring Boot + AWS' },
  { year: '2024', title: 'Started Rupa.dev', desc: 'Began documenting every project so others can learn from real builds' },
  { year: '2023', title: 'First Spring Boot API in Production', desc: 'REST API serving 5k+ daily requests. Learned the hard way about connection pooling.' },
  { year: '2022', title: 'Switched to Full-Stack', desc: 'Was doing only frontend. Added Java + Spring Boot to the stack.' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-16">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center font-heading font-extrabold text-4xl text-white shrink-0">
          R
        </div>
        <div>
          <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">The Human Behind the Code</p>
          <h1 className="font-heading font-extrabold text-4xl mb-2">Hey, I&apos;m Rupa</h1>
          <p className="text-accent font-mono text-sm mb-4">Full-Stack Developer · Builder · Blogger</p>
          <p className="text-ink-2 text-lg leading-relaxed max-w-xl">
            I build real products and write about every step so you don&apos;t have to spend three hours on StackOverflow figuring out the same thing I already figured out.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { icon: Github, href: 'https://github.com/GITRUPAG', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/g-rupa-799a43240/', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com/rupa_dev', label: 'Twitter' },
              { icon: Youtube, href: 'https://youtube.com/@shecare.fit', label: 'YouTube' },
              { icon: Mail, href: 'mailto:rupag12004@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border hover:border-border-2 rounded-lg text-sm text-ink-2 hover:text-ink transition"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="mb-16">
        <h2 className="font-heading font-bold text-2xl mb-5">My Story</h2>
        <div className="space-y-4 text-ink-2 leading-relaxed">
          <p>
            I started as a frontend developer who was scared of backends. Then I needed to build something real — a health app for my community — and I couldn&apos;t outsource the backend. So I learned Spring Boot the hard way.
          </p>
          <p>
            That project became <strong className="text-ink">SheCare</strong> — a women&apos;s health tracking platform. Building it taught me more than any course. And writing about it helped others who were stuck on the same problems.
          </p>
          <p>
            This blog is everything I wish existed when I was learning. Not just &quot;here&apos;s the theory&quot; — but here&apos;s the real code, here&apos;s why I made this decision, here&apos;s what broke and how I fixed it.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-16">
        <h2 className="font-heading font-bold text-2xl mb-5">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map(({ category, items }) => (
            <div key={category} className="bg-surface border border-border rounded-xl p-4">
              <h3 className="text-xs font-mono text-ink-3 uppercase tracking-wider mb-3">{category}</h3>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li key={item} className="text-sm text-ink-2 font-mono">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="font-heading font-bold text-2xl mb-5">Timeline</h2>
        <div className="space-y-0 border-l border-border ml-3">
          {timeline.map(({ year, title, desc }) => (
            <div key={title} className="relative pl-8 pb-8 last:pb-0">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg" />
              <span className="text-xs font-mono text-accent mb-1 block">{year}</span>
              <h3 className="font-medium text-base mb-1">{title}</h3>
              <p className="text-sm text-ink-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface border border-border rounded-2xl p-8 text-center">
        <h2 className="font-heading font-bold text-xl mb-2">Want to follow along?</h2>
        <p className="text-ink-2 text-sm mb-5">Subscribe to get new posts, project updates, and the occasional rant about Java generics.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/newsletter" className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition">
            Subscribe to Newsletter
          </Link>
          <Link href="/blog" className="px-5 py-2.5 bg-surface-2 border border-border text-ink-2 hover:text-ink rounded-xl text-sm font-medium transition flex items-center gap-1.5">
            Browse the Blog <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
