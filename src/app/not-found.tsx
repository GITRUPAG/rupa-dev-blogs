import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="font-mono text-accent text-sm uppercase tracking-widest mb-4">404</p>
      <h1 className="font-heading font-extrabold text-5xl mb-3">Page not found</h1>
      <p className="text-ink-2 text-lg max-w-md mb-8">
        This page doesn&apos;t exist — or maybe it was deleted. Either way, let&apos;s get you back on track.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="px-6 py-3 bg-accent text-white rounded-xl text-sm font-medium hover:bg-accent/90 transition"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 bg-surface border border-border text-ink-2 hover:text-ink rounded-xl text-sm font-medium transition"
        >
          Browse Blog
        </Link>
      </div>
    </div>
  )
}
