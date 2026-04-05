import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'

interface Stats {
  posts: number
  readers: string
  series: number
  projects: number
}

export function HeroSection({ stats }: { stats: Stats }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 text-xs font-mono text-accent mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-3 animate-pulse-slow" />
            Full-Stack Dev & Builder
          </div>

          <h1 className="font-heading font-extrabold text-5xl sm:text-6xl leading-tight tracking-tight mb-6">
            I Build.{' '}
            <span className="text-accent">I Write.</span>{' '}
            <span className="bg-gradient-to-r from-accent-2 to-accent-4 bg-clip-text text-transparent">
              You Learn.
            </span>
          </h1>

          <p className="text-ink-2 text-lg leading-relaxed max-w-lg mb-8">
            Real projects. Real code. Real stories. From React apps to Spring Boot APIs —
            documented the way you actually need to read them.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              Read Latest Posts <ArrowRight size={16} />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border hover:border-border-2 text-ink-2 hover:text-ink font-medium rounded-xl transition"
            >
              Explore Learning Paths
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { label: 'Posts', value: stats.posts },
              { label: 'Readers', value: stats.readers },
              { label: 'Series', value: stats.series },
              { label: 'Projects', value: stats.projects },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="font-heading font-bold text-2xl">{value}</div>
                <div className="text-xs text-ink-3 font-mono uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Code card */}
        <div className="relative hidden lg:block">
          {/* Floating labels */}
          <div className="absolute -top-4 right-0 bg-surface border border-border rounded-lg px-3 py-1.5 font-mono text-xs text-accent-3 z-10 shadow-lg">
            ✓ SheCare — live in prod
          </div>
          <div className="absolute -bottom-2 -left-6 bg-surface border border-border rounded-lg px-3 py-1.5 font-mono text-xs text-accent-2 z-10 shadow-lg">
            ⚡ Interactive code blocks
          </div>

          {/* Code window */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="bg-surface-2 px-4 py-3 flex items-center gap-2 border-b border-border">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs font-mono text-ink-3">SheCareController.java</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
              <div className="text-pink-400">@RestController</div>
              <div><span className="text-pink-400">@RequestMapping</span><span className="text-ink-2">(</span><span className="text-yellow-300">&quot;/api/health&quot;</span><span className="text-ink-2">)</span></div>
              <div><span className="text-pink-400">public class</span> <span className="text-emerald-400">SheCareController</span> <span className="text-ink-2">{'{'}</span></div>
              <div className="ml-4 mt-1"><span className="text-pink-400">@Autowired</span></div>
              <div className="ml-4"><span className="text-pink-400">private</span> <span className="text-cyan-400">HealthService</span> service<span className="text-ink-2">;</span></div>
              <div className="ml-4 mt-2"><span className="text-pink-400">@GetMapping</span><span className="text-ink-2">(</span><span className="text-yellow-300">&quot;/dashboard&quot;</span><span className="text-ink-2">)</span></div>
              <div className="ml-4"><span className="text-pink-400">public</span> <span className="text-cyan-400">ResponseEntity</span><span className="text-ink-2">&lt;</span><span className="text-cyan-400">Dashboard</span><span className="text-ink-2">&gt;</span></div>
              <div className="ml-4 text-emerald-400">getDashboard<span className="text-ink-2">() {'{'}</span></div>
              <div className="ml-8 text-ink-3">// Real code from SheCare</div>
              <div className="ml-8"><span className="text-pink-400">return</span> service<span className="text-ink-2">.</span><span className="text-emerald-400">buildDashboard</span><span className="text-ink-2">();</span></div>
              <div className="ml-4 text-ink-2">{'}'}</div>
              <div className="text-ink-2">{'}'}</div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 bg-accent/5 rounded-2xl blur-3xl" />
        </div>
      </div>
    </section>
  )
}
