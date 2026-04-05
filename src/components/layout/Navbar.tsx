'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, BookOpen, Code2, Layers, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchBar } from '@/components/search/SearchBar'

const navLinks = [
  { href: '/blog', label: 'Blogs', icon: BookOpen },
  { href: '/learn', label: 'Learn', icon: Layers },
  { href: '/projects', label: 'Projects', icon: Code2 },
  { href: '/about', label: 'About', icon: User },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-bg/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-heading font-extrabold text-xl tracking-tight">
              Rupa<span className="text-accent">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname.startsWith(href)
                    ? 'text-ink bg-surface-2'
                    : 'text-ink-2 hover:text-ink hover:bg-surface'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Search + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <SearchBar />
            <Link
              href="/newsletter"
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-ink-2 hover:text-ink hover:bg-surface transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border space-y-1">
            <div className="mb-3">
              <SearchBar />
            </div>
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition',
                  pathname.startsWith(href)
                    ? 'text-ink bg-surface-2'
                    : 'text-ink-2 hover:text-ink hover:bg-surface'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/newsletter"
                className="block text-center px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-lg"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
