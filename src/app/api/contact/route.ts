import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// 🛡️ Simple in-memory rate limiter (per IP)
const rateLimitMap = new Map<string, { count: number; time: number }>()
const LIMIT = 5 // max 5 requests
const WINDOW = 60 * 1000 // 1 minute

function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, time: now })
    return false
  }

  if (now - entry.time > WINDOW) {
    rateLimitMap.set(ip, { count: 1, time: now })
    return false
  }

  if (entry.count >= LIMIT) return true

  entry.count++
  return false
}

// 🔐 Escape HTML (prevent XSS)
function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'

    // 🚫 Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, subject, message } = await request.json()

    // 🧪 Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // 🔐 Sanitize input
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeSubject = escapeHtml(subject || '—')
    const safeMessage = escapeHtml(message)

    // 📩 Send to YOU (admin email)
    const { error } = await resend.emails.send({
      from: 'DevDairy <support@devdairy.online>', // ✅ FIXED DOMAIN
      to: process.env.CONTACT_EMAIL || 'hello@rupa.dev',
      replyTo: email,
      subject: `[devDairy] ${safeSubject} — from ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0d0d0f; color: #e8e8f0; border-radius: 12px;">
          <h2 style="color: #7c6fff;">New Contact Message</h2>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subject:</strong> ${safeSubject}</p>

          <div style="background: #1e1e24; padding: 16px; border-radius: 8px; margin-top: 16px;">
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>

          <p style="font-size: 12px; color: #777; margin-top: 20px;">
            Sent via devDairy contact form
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      )
    }

    // 📬 Auto-reply to user
    await resend.emails.send({
      from: 'DevDairy <support@devdairy.online>',
      to: [email],
      subject: 'We received your message 👋',
      html: `
        <div style="font-family: sans-serif;">
          <h2>Hi ${safeName},</h2>
          <p>Thanks for contacting DevDairy. We’ve received your message and will get back to you soon.</p>
          <p style="margin-top:20px;">— Team DevDairy</p>
        </div>
      `,
    })

    // 📊 Logging (optional)
    console.log({
      name,
      email,
      subject,
      time: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}