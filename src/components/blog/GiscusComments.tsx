'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Configure these with your GitHub repo details
// See: https://giscus.app for setup
const GISCUS_CONFIG = {
  repo: process.env.NEXT_PUBLIC_GISCUS_REPO || 'your-username/your-repo',
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || 'YOUR_REPO_ID',
  category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY || 'Comments',
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || 'YOUR_CATEGORY_ID',
}

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', GISCUS_CONFIG.repo)
    script.setAttribute('data-repo-id', GISCUS_CONFIG.repoId)
    script.setAttribute('data-category', GISCUS_CONFIG.category)
    script.setAttribute('data-category-id', GISCUS_CONFIG.categoryId)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', 'dark')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [])

  // Update giscus theme if user navigates (in case page content changes)
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
    if (!iframe) return

    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: 'dark' } } },
      'https://giscus.app'
    )
  }, [pathname])

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-heading font-bold text-xl">Discussion</h2>
        <span className="text-xs font-mono text-ink-3 bg-surface border border-border rounded-full px-2.5 py-1">
          Powered by GitHub
        </span>
      </div>
      <div
        className="rounded-xl overflow-hidden border border-border bg-surface/50 p-4"
        ref={ref}
      />
      <p className="mt-3 text-xs text-ink-3 font-mono text-center">
        Comments use GitHub Discussions — no separate account needed if you have GitHub.
      </p>
    </section>
  )
}
