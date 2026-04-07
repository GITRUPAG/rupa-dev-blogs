import type { Metadata } from 'next'
import { Shield, Cookie, BarChart2, Mail, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Rupa.dev — how we collect, use, and protect your data.',
}

const lastUpdated = 'April 6, 2026'

const sections = [
  {
    id: 'overview',
    icon: Shield,
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    title: 'Overview',
    content: `This Privacy Policy explains how Rupa.dev ("we", "us", or "our") collects, uses, and protects information when you visit our website at rupa.dev. By using this site, you agree to the practices described below. We are committed to being transparent about our data practices.`,
  },
  {
    id: 'information-collected',
    icon: BarChart2,
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
    title: 'Information We Collect',
    items: [
      {
        label: 'Usage Data (via Google Analytics)',
        desc: 'We use Google Analytics to understand how visitors interact with our site. This includes pages visited, time spent, browser type, device type, and approximate geographic location (country/city level). This data is anonymized and aggregated — we cannot identify you personally from it.',
      },
      {
        label: 'Newsletter Subscriptions',
        desc: 'If you subscribe to our newsletter, we collect your email address. This is stored securely via Resend and used only to send you new post notifications and occasional updates. You can unsubscribe at any time.',
      },
      {
        label: 'Comments (via Giscus)',
        desc: 'Our blog uses Giscus for comments, powered by GitHub Discussions. If you leave a comment, your GitHub profile information is used. Giscus is governed by GitHub\'s Privacy Policy.',
      },
      {
        label: 'Local Storage',
        desc: 'We store your learning path progress in your browser\'s local storage. This data never leaves your device and is not transmitted to our servers.',
      },
    ],
  },
  {
    id: 'cookies',
    icon: Cookie,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    title: 'Cookies',
    content: `We use cookies to improve your experience on this site. Here's a breakdown of the cookies we use:`,
    cookies: [
      {
        name: 'Google Analytics (_ga, _gid, _gat)',
        purpose: 'Analytics & Performance',
        duration: 'Up to 2 years',
        type: 'Third-party',
        desc: 'Used to distinguish users and track site usage patterns. Google may use this data in accordance with their own privacy policy.',
      },
      {
        name: 'Google AdSense',
        purpose: 'Advertising',
        duration: 'Up to 13 months',
        type: 'Third-party',
        desc: 'We use Google AdSense to display relevant advertisements. Google uses cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google\'s Ads Settings.',
      },
      {
        name: 'Theme Preference',
        purpose: 'Functionality',
        duration: 'Persistent',
        type: 'First-party',
        desc: 'Stores your preferred color theme (dark/light mode) so it persists across visits.',
      },
    ],
  },
  {
    id: 'adsense',
    icon: ExternalLink,
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    title: 'Google AdSense & Advertising',
    content: `Rupa.dev uses Google AdSense to display advertisements. Google, as a third-party vendor, uses cookies to serve ads on our site based on your visits to this and other websites on the internet.`,
    adPoints: [
      'Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.',
      'You may opt out of personalized advertising by visiting Google\'s Ads Settings at adssettings.google.com.',
      'You can also opt out of a third-party vendor\'s use of cookies by visiting the Network Advertising Initiative opt-out page at networkadvertising.org.',
      'We do not control the content of ads served by Google AdSense. Ad content is determined by Google based on site content and visitor interest signals.',
      'We comply with Google\'s publisher policies and do not place ads on pages with content that violates those policies.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-widest mb-4">
          <Shield size={11} />
          Legal
        </div>
        <h1 className="font-heading font-extrabold text-4xl mb-3">Privacy Policy</h1>
        <p className="text-ink-2">
          Last updated: <span className="font-mono text-ink">{lastUpdated}</span>
        </p>
        <p className="text-ink-2 mt-3 max-w-2xl">
          We keep things simple and transparent. This page explains exactly what data we collect,
          why we collect it, and how you can control it.
        </p>
      </div>

      {/* Table of contents */}
      <div className="glass-card p-5 mb-10">
        <p className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-3">On this page</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm text-ink-2 hover:text-accent transition font-mono"
            >
              → {s.title}
            </a>
          ))}
          <a href="#contact" className="text-sm text-ink-2 hover:text-accent transition font-mono">
            → Contact
          </a>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2 rounded-lg ${section.bg} border ${section.border}`}>
                  <Icon size={16} className={section.color} />
                </div>
                <h2 className="font-heading font-bold text-xl">{section.title}</h2>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 space-y-5">

                {/* Plain content */}
                {section.content && (
                  <p className="text-ink-2 text-sm leading-relaxed">{section.content}</p>
                )}

                {/* Bullet items */}
                {'items' in section && section.items && (
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div key={item.label} className="flex gap-3">
                        <span className={`mt-1 shrink-0 text-xs ${section.color}`}>✓</span>
                        <div>
                          <p className="text-sm font-semibold text-ink mb-1">{item.label}</p>
                          <p className="text-sm text-ink-2 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Cookie table */}
                {'cookies' in section && section.cookies && (
                  <div className="space-y-4 mt-2">
                    {section.cookies.map((cookie) => (
                      <div key={cookie.name} className="bg-bg-2 border border-border rounded-lg p-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <p className="text-sm font-semibold font-mono text-ink">{cookie.name}</p>
                          <div className="flex gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface border border-border text-ink-3">
                              {cookie.type}
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface border border-border text-ink-3">
                              {cookie.duration}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs font-mono text-accent mb-1">{cookie.purpose}</p>
                        <p className="text-sm text-ink-2 leading-relaxed">{cookie.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* AdSense bullet points */}
                {'adPoints' in section && section.adPoints && (
                  <ul className="space-y-3 mt-2">
                    {section.adPoints.map((point, i) => (
                      <li key={i} className="flex gap-3 text-sm text-ink-2">
                        <span className={`shrink-0 mt-0.5 ${section.color}`}>•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}

        {/* Data rights */}
        <div id="your-rights" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Shield size={16} className="text-emerald-400" />
            </div>
            <h2 className="font-heading font-bold text-xl">Your Rights</h2>
          </div>
          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-ink-2 text-sm leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal data:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { right: 'Right to Access', desc: 'Request a copy of data we hold about you' },
                { right: 'Right to Deletion', desc: 'Request deletion of your personal data' },
                { right: 'Right to Opt-Out', desc: 'Opt out of analytics and personalized ads' },
                { right: 'Right to Portability', desc: 'Receive your data in a portable format' },
              ].map(({ right, desc }) => (
                <div key={right} className="flex gap-2 bg-bg-2 border border-border rounded-lg p-3">
                  <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{right}</p>
                    <p className="text-xs text-ink-2 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third party links */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-heading font-semibold text-base mb-3">Third-Party Links</h3>
          <p className="text-sm text-ink-2 leading-relaxed">
            Our site may contain links to external websites. We are not responsible for the privacy
            practices or content of those sites. We encourage you to review their privacy policies
            before providing any personal information.
          </p>
        </div>

        {/* Changes */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="font-heading font-semibold text-base mb-3">Changes to This Policy</h3>
          <p className="text-sm text-ink-2 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be reflected by
            updating the "Last updated" date at the top of this page. Continued use of the site
            after changes constitutes acceptance of the updated policy.
          </p>
        </div>

        {/* Contact */}
        <div id="contact" className="scroll-mt-24">
          <div className="gradient-border p-px rounded-xl">
            <div className="bg-bg-2 rounded-[11px] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Mail size={14} className="text-accent" />
                  <p className="text-xs font-mono text-accent uppercase tracking-widest">Questions?</p>
                </div>
                <h3 className="font-heading font-bold text-lg mb-1">Contact Us</h3>
                <p className="text-sm text-ink-2">
                  For privacy-related questions or to exercise your data rights, reach out directly.
                </p>
              </div>
              <a
                href="mailto:privacy@rupa.dev"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-medium rounded-lg transition hover:-translate-y-0.5"
              >
                <Mail size={14} />
                rupag12004@gmail.com
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}