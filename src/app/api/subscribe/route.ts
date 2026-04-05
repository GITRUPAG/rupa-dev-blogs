import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Integration point: add to your email provider
  // Options: Resend, Mailchimp, ConvertKit, Buttondown
  // Example with Resend:
  //
  // const { Resend } = await import('resend')
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.contacts.create({
  //   email,
  //   audienceId: process.env.RESEND_AUDIENCE_ID!,
  // })

  // For now, log and return success
  console.log('New subscriber:', email)

  return NextResponse.json({ success: true, message: 'Subscribed!' })
}
