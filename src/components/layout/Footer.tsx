import Link from 'next/link'
import { Github, Linkedin, Twitter, Youtube, Rss } from 'lucide-react'

const footerLinks = {
  Blog: [
    { label: 'All Posts', href: '/blog' },
    { label: 'React', href: '/blog?category=react' },
    { label: 'Spring Boot', href: '/blog?category=java' },
    { label: 'Projects', href: '/blog?category=project' },
    { label: 'Series', href: '/blog?category=series' },
  ],
  Learn: [
    { label: 'React Roadmap', href: '/learn/react' },
    { label: 'Spring Boot', href: '/learn/spring-boot' },
    { label: 'Full Stack Path', href: '/learn/fullstack' },
    { label: 'DevOps', href: '/learn/devops' },
  ],
  More: [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'RSS Feed', href: '/feed.xml' },
  ],
}

const socialLinks = [
  { icon: Github, href: 'https://github.com/GITRUPAG', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/g-rupa-799a43240/', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@SheCareOfficial', label: 'YouTube' }
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-heading font-extrabold text-xl">
              Rupa<span className="text-accent">.dev</span>
            </Link>
            <p className="mt-3 text-ink-2 text-sm leading-relaxed">
              Real projects. Real code. Documenting the full-stack journey so you don&apos;t have to Google as much.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface border border-border text-ink-2 hover:text-ink hover:border-border-2 transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-ink">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-ink-2 hover:text-ink text-sm transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-3 text-sm font-mono">
            © {new Date().getFullYear()} Rupa.dev · Built with Next.js + Vercel
          </p>
          <div className="flex items-center gap-4 text-sm text-ink-3">
            <Link href="/privacy" className="hover:text-ink-2 transition">Privacy</Link>
            <Link href="/sitemap.xml" className="hover:text-ink-2 transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
