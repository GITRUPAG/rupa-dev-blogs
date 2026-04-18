'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'loading' | 'success' | 'error'

const SUBJECTS = [
  'General question',
  'Blog post feedback',
  'Code review request',
  'Collaboration / project',
  'Guest post idea',
  'Report a bug in a post',
  'Other',
]

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const errors = {
    name: touched.name && !form.name.trim() ? 'Name is required' : '',
    email:
      touched.email && (!form.email.trim() || !form.email.includes('@'))
        ? 'Valid email is required'
        : '',
    message:
      touched.message && form.message.trim().length < 10
        ? 'Message must be at least 10 characters'
        : '',
  }

  const isValid =
    form.name.trim() && form.email.includes('@') && form.message.trim().length >= 10

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setTouched((prev) => ({ ...prev, [e.target.name]: true }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTouched({})
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Network error — please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-accent-3/25 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[480px]">
        <div className="w-16 h-16 rounded-full bg-accent-3/10 border border-accent-3/25 flex items-center justify-center mb-5">
          <CheckCircle2 size={30} className="text-accent-3" />
        </div>
        <h2 className="font-heading font-bold text-2xl mb-2">Message sent!</h2>
        <p className="text-ink-2 max-w-sm mb-6 leading-relaxed">
          Thanks for reaching out. I typically reply within 24–48 hours — keep an eye on your inbox.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-5 py-2.5 bg-surface-2 border border-border hover:border-border-2 text-ink-2 hover:text-ink rounded-xl text-sm font-medium transition"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-surface border border-border rounded-2xl p-8 space-y-5">
      <h2 className="font-heading font-semibold text-lg mb-1">Send a message</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Your name" required error={errors.name}>
          <input
            type="text"
            name="name"
            placeholder="Rupa"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="name"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Email address" required error={errors.email}>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <Field label="Subject">
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(inputClass(false), 'cursor-pointer')}
        >
          <option value="">Select a topic…</option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field label="Message" required error={errors.message} hint={`${form.message.length} / 2000`}>
        <textarea
          name="message"
          rows={7}
          placeholder="Hi Rupa, I was reading your post on JWT auth and had a question about..."
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={2000}
          className={cn(inputClass(!!errors.message), 'resize-none leading-relaxed')}
        />
      </Field>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3">
          <AlertCircle size={15} className="shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 active:translate-y-0"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Sending…</>
        ) : (
          <><Send size={15} /> Send Message</>
        )}
      </button>

      <p className="text-xs text-ink-3 text-center font-mono">
        No spam, no newsletters. Just a reply from me.
      </p>
    </form>
  )
}

function inputClass(hasError: boolean) {
  return cn(
    'w-full bg-bg-2 border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-3 outline-none transition-all',
    hasError
      ? 'border-red-500/40 focus:border-red-500/60'
      : 'border-border focus:border-accent/50 focus:shadow-sm focus:shadow-accent/10'
  )
}

function Field({
  label, required, error, hint, children,
}: {
  label: string
  required?: boolean
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-ink-2">
          {label}
          {required && <span className="text-accent-2 ml-0.5">*</span>}
        </label>
        {hint && <span className="text-xs font-mono text-ink-3">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <AlertCircle size={11} />{error}
        </p>
      )}
    </div>
  )
}