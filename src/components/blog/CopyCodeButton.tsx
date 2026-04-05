'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="code-copy-btn"
      aria-label="Copy code"
    >
      {copied ? (
        <span className="flex items-center gap-1 text-accent-3">
          <Check size={12} /> Copied!
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <Copy size={12} /> Copy
        </span>
      )}
    </button>
  )
}
