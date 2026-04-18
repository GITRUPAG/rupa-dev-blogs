import type { Metadata } from 'next'
import { Mail, Github, Linkedin, Twitter, Youtube, MessageSquare, Clock, MapPin, type LucideIcon } from 'lucide-react'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Have a question, collaboration idea, or just want to say hi? Let's talk.",
}

type SocialLink = {
  icon: LucideIcon
  label: string
  handle: string
  href: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    icon: Github,
    label: 'GitHub',
    handle: '@GITRUPAG',
    href: 'https://github.com/GITRUPAG',
    color: 'hover:border-white/30 hover:text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'g-rupa',
    href: 'https://www.linkedin.com/in/g-rupa-799a43240/',
    color: 'hover:border-blue-400/40 hover:text-blue-400',
  },
//   {
//     icon: Twitter,
//     label: 'Twitter / X',
//     handle: '@rupa_dev',
//     href: 'https://twitter.com/',
//     color: 'hover:border-sky-400/40 hover:text-sky-400',
//   },
//   {
//     icon: Youtube,
//     label: 'YouTube',
//     handle: '@SheCareOfficial',
//     href: 'https://youtube.com/@SheCareOfficial',
//     color: 'hover:border-red-400/40 hover:text-red-400',
//   },
  {
    icon: Mail,
    label: 'Email',
    handle: 'rupag12004@gmail.com',
    href: 'mailto:rupag12004@gmail.com',
    color: 'hover:border-violet-400/40 hover:text-violet-400',
  },
]

type Faq = { q: string; a: string }

const faqs: Faq[] = [
  {
    q: 'Can I use your code in my projects?',
    a: 'Yes! Everything on this blog is MIT licensed. Use it freely, just give a shout-out if you can.',
  },
  {
    q: 'Do you take freelance work?',
    a: "Occasionally, depending on the project. Send me a message with details and I'll let you know.",
  },
  {
    q: 'Can you review my code / project?',
    a: "I love doing this! Drop me a message with a GitHub link and I'll take a look when I can.",
  },
  {
    q: 'How do I report an error in a post?',
    a: 'Use the contact form below or open a GitHub Discussion on the post. I fix them fast.',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="mb-14 max-w-xl">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-3">
          Get in touch
        </p>
        <h1 className="font-heading font-extrabold text-5xl mb-4 leading-tight">
          {"Let's "}
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">
            Talk
          </span>
        </h1>
        <p className="text-ink-2 text-lg leading-relaxed">
          Whether it is a question about a post, a collaboration idea, or you just want to say
          hi - my inbox is open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

        <ContactForm />

        <aside className="space-y-6">

          <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-heading font-semibold text-base">Quick info</h2>
            <div className="flex items-start gap-3 text-sm">
              <Clock size={15} className="text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-ink font-medium">Response time</p>
                <p className="text-ink-2 text-xs mt-0.5">Usually within 24-48 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MapPin size={15} className="text-accent-2 mt-0.5 shrink-0" />
              <div>
                <p className="text-ink font-medium">Based in</p>
                <p className="text-ink-2 text-xs mt-0.5">India - available worldwide</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <MessageSquare size={15} className="text-accent-3 mt-0.5 shrink-0" />
              <div>
                <p className="text-ink font-medium">Best for</p>
                <p className="text-ink-2 text-xs mt-0.5">
                  Collaborations, questions, code reviews, guest posts
                </p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-base mb-4">Find me on</h2>
            <div className="space-y-2">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={['flex items-center gap-3 p-3 rounded-xl border border-border bg-bg-2 text-ink-2 transition-all group', item.color].join(' ')}
                  >
                    <Icon size={16} className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-ink-3 leading-none mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium truncate">{item.handle}</p>
                    </div>
                    <span className="text-xs text-ink-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      {'->'}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="bg-surface border border-border rounded-2xl p-6">
            <h2 className="font-heading font-semibold text-base mb-4">FAQs</h2>
            <div className="space-y-4">
              {faqs.map((item) => (
                <div key={item.q}>
                  <p className="text-sm font-medium text-ink mb-1">{item.q}</p>
                  <p className="text-xs text-ink-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}