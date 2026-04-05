'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage("You're in! Welcome to the community.")
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to subscribe. Try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={cn('text-center', compact && 'text-left')}>
        <p className="text-accent-3 font-mono text-sm">
          ✓ {message}
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex gap-3',
        compact ? 'flex-col sm:flex-row max-w-sm' : 'flex-col sm:flex-row max-w-md mx-auto'
      )}
    >
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={cn(
          'flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-3 outline-none focus:border-accent/50 transition',
          compact && 'py-2.5'
        )}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cn(
          'px-6 py-3 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-xl transition whitespace-nowrap disabled:opacity-60',
          compact && 'py-2.5'
        )}
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe →'}
      </button>
      {status === 'error' && (
        <p className="text-red-400 text-xs font-mono">{message}</p>
      )}
    </form>
  )
}
