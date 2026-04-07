import type { Metadata } from 'next'
import Link from 'next/link'
import { Github, ExternalLink, Shield, Cpu, Smartphone, Globe, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Real-world projects — SheCare, Doctor Dashboard, Blockchain systems, and more.",
}

const projects = [
  {
    name: 'SheCare',
    tagline: 'AI-Powered Women\'s Healthcare App',
    emoji: '🌸',
    description:
      'A full-stack AI-driven healthcare platform focused on women\'s wellness. Combines period & fertility tracking, mental health support, medication management, doctor consultations, and community into one ecosystem.',
    tech: [
  'React Native',
  'Expo',
  'Spring Boot',
  'PostgreSQL',
  'JWT',
  'Cloudinary',
  'Context API',
  'Machine Learning (AI Insights)',
],
    //githubUrl: 'https://github.com/GITRUPAG/shecare',
    liveUrl: 'https://www.shecare.fit/',
    blogSeries: '/blog?series=shecare',
    status: 'live',
    type: 'Mobile App',
    typeIcon: Smartphone,
    highlights: [
  'AI Health Risk Assessment (PCOS, diabetes, etc.)',
  'Cara AI Companion — personalized health guidance & chat support',
  'Period & Fertility Tracker with smart insights',
  'Mental Health Support — mood tracking & meditation',
  'Doctor Consultation System with role-based access(upcoming)',
  'Community with posts, follow requests & interactions',
  'Smart Notifications & scheduled health reminders',
  'HIPAA & GDPR concepts applied throughout',
],
    color: 'text-pink-400',
    bg: 'bg-pink-500/5',
    border: 'border-pink-500/20',
    accent: 'bg-pink-500/10',
  },
  {
    name: 'SheCare Doctor Dashboard',
    tagline: 'Web-Based Admin & Doctor Panel',
    emoji: '👩‍⚕️',
    description:
      'A companion web app to SheCare — a role-based dashboard for admins and doctors to manage users, approve health tips, handle appointments, and monitor platform analytics.',
    tech: ['React.js', 'Axios', 'Tailwind CSS', 'Spring Boot', 'JWT', 'PostgreSQL'],
    //githubUrl: 'https://github.com/GITRUPAG/shecare-dashboard',
    liveUrl: null,
    blogSeries: '/blog?series=shecare',
    status: 'wip',
    type: 'Web App',
    typeIcon: Globe,
    highlights: [
      'Role-based access — Admin vs Doctor views',
      'Appointment management with status tracking',
      'Tip approval & content moderation system',
      'Doctor profile management',
      'Advanced search, filter & sort across all entities',
      'Real-time data operations on shared backend',
    ],
    color: 'text-violet-400',
    bg: 'bg-violet-500/5',
    border: 'border-violet-500/20',
    accent: 'bg-violet-500/10',
  },
  {
    name: 'File Integrity Verification',
    tagline: 'Blockchain-Based Tamper Detection',
    emoji: '🔐',
    description:
      'A system that ensures files haven\'t been tampered with by storing their SHA-256 hash on the Ethereum blockchain. Any modification to the file changes the hash — detected instantly on re-upload.',
    tech: ['Ethereum', 'Solidity', 'Spring Boot', 'React.js', 'Ganache', 'MetaMask', 'Truffle'],
    githubUrl: 'https://github.com/GITRUPAG/certificate-verification-blockchain',
    liveUrl: null,
    blogSeries: null,
    status: 'live',
    type: 'Blockchain',
    typeIcon: Shield,
    highlights: [
      'SHA-256 hash stored on-chain via smart contract',
      'Tamper detection on file re-upload & comparison',
      'Use cases: legal docs, certificates, medical records',
      'Decentralized trust — no central authority needed',
      'MetaMask wallet integration for transactions',
      'Smart contracts in Solidity, tested with Ganache',
    ],
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/5',
    border: 'border-emerald-500/20',
    accent: 'bg-emerald-500/10',
  },
  {
    name: 'E-Voting System',
    tagline: 'Secure Blockchain Voting Platform',
    emoji: '🗳️',
    description:
      'A tamper-proof digital voting system where every vote is an immutable transaction on the Ethereum blockchain. Ensures one-person-one-vote, full transparency, and fraud prevention without a central authority.',
    tech: ['Ethereum', 'Solidity', 'React.js', 'Web3.js', 'Ethers.js', 'Spring Boot', 'MetaMask'],
    githubUrl: 'https://github.com/GITRUPAG/evoting',
    liveUrl: null,
    blogSeries: null,
    status: 'live',
    type: 'Blockchain',
    typeIcon: Shield,
    highlights: [
      'One person → one vote enforced by smart contract',
      'Immutable vote records on Ethereum blockchain',
      'Real-time vote counting with full transparency',
      'Wallet-based authentication via MetaMask',
      'Admin election creation & voter registration flow',
      'Vote anonymity with fraud prevention built-in',
    ],
    color: 'text-sky-400',
    bg: 'bg-sky-500/5',
    border: 'border-sky-500/20',
    accent: 'bg-sky-500/10',
  },
  {
    name: 'DevDairy Blog',
    tagline: 'Personal Developer Blogging Platform',
    emoji: '✍️',
    description:
      'This very site — a high-performance developer blog built with Next.js and MDX. Features Algolia-powered search, Giscus comments, structured learning paths, ISR, and full SEO optimization.',
    tech: ['Next.js 14', 'MDX', 'TypeScript', 'Tailwind CSS', 'Algolia', 'Giscus', 'Vercel'],
    //githubUrl: 'https://github.com/GITRUPAG/blogs',
    liveUrl: 'https://www.devdairy.online/',
    blogSeries: null,
    status: 'live',
    type: 'Web App',
    typeIcon: BookOpen,
    highlights: [
      'MDX-powered blog with syntax highlighting',
      'Algolia full-text search with instant results',
      'ISR — pages rebuild every hour automatically',
      'Giscus comments via GitHub Discussions',
      'Newsletter via Resend with audience management',
      'Structured learning paths with progress tracking',
    ],
    color: 'text-accent',
    bg: 'bg-accent/5',
    border: 'border-accent/20',
    accent: 'bg-accent/10',
  },
]

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-14">
        <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">Real Builds</p>
        <h1 className="font-heading font-extrabold text-4xl mb-3">Projects</h1>
        <p className="text-ink-2 text-lg max-w-2xl">
          Every project here is fully documented — architecture decisions, code snippets, deployment steps, and lessons learned.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {[
          { label: 'Projects', value: '5' },
          { label: 'Live / In Progress', value: '3 / 2' },
          { label: 'Tech Stacks', value: '15+' },
          { label: 'Blockchain Projects', value: '2' },
        ].map(({ label, value }) => (
          <div key={label} className="glass-card p-4 text-center">
            <p className="font-heading font-extrabold text-2xl text-accent">{value}</p>
            <p className="text-xs font-mono text-ink-3 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Project cards */}
      <div className="space-y-8">
        {projects.map((project) => {
          const TypeIcon = project.typeIcon
          return (
            <div
              key={project.name}
              className={`bg-surface border rounded-2xl overflow-hidden ${project.border}`}
            >
              {/* Header band */}
              <div className={`p-6 ${project.bg} border-b border-border`}>
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{project.emoji}</span>
                    <div>
                      <h2 className={`font-heading font-bold text-xl ${project.color}`}>
                        {project.name}
                      </h2>
                      <p className="text-ink-2 text-sm mt-0.5">{project.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${project.accent} ${project.color} ${project.border}`}>
                      <TypeIcon size={11} />
                      {project.type}
                    </span>
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                        project.status === 'live'
                          ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                      }`}
                    >
                      {project.status === 'live' ? '● Live' : '◐ In Progress'}
                    </span>
                  </div>
                </div>
                <p className="text-ink-2 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Highlights */}
                <div>
                  <p className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-3">Key Features</p>
                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-ink-2">
                        <span className={`mt-0.5 shrink-0 ${project.color}`}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech + Actions */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-xs font-mono text-ink-3 uppercase tracking-widest mb-3">Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 bg-bg-2 border border-border rounded text-xs font-mono text-ink-2"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border hover:border-border-2 rounded-lg text-sm text-ink-2 hover:text-ink transition"
                    >
                      <Github size={14} /> GitHub
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition ${project.accent} ${project.color} border ${project.border} hover:opacity-80`}
                      >
                        <ExternalLink size={14} /> Live Demo
                      </a>
                    )}
                    {project.blogSeries && (
                      <Link
                        href={project.blogSeries}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-surface-2 border border-border hover:border-border-2 rounded-lg text-sm text-ink-2 hover:text-ink transition"
                      >
                        📖 Read the Series
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}