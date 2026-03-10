import Link from "next/link";

const SAMPLE_RESULTS = [
  { name: "CARRD", score: "0/10", verdict: "Invisible to agents", background: "#FF6B6B", slug: "audit-carrd" },
  { name: "BALSAMIQ", score: "1/10", verdict: "Severe friction", background: "#FF8E8E", slug: "sample-audit-balsamiq" },
  { name: "KIT", score: "6/10", verdict: "Usable with caveats", background: "#FFD93D", slug: "audit-convertkit" },
  { name: "GHOST", score: "7/10", verdict: "Ready enough to build on", background: "#86EFAC", slug: "audit-ghost" },
  { name: "PLAUSIBLE", score: "7/10", verdict: "Solid foundations", background: "#4ADE80", slug: "audit-plausible" },
  { name: "LINEAR", score: "7/10", verdict: "API-first, MCP gap", background: "#60D2A0", slug: "audit-linear" },
];

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero — product first */}
      <section className="px-0 py-6 sm:py-10">
        <div className="max-w-5xl space-y-8">
          <div className="space-y-5">
            <blockquote className="max-w-3xl border-l-4 border-black pl-4 text-lg italic text-black/60 sm:text-xl">
              &ldquo;The traditional application layer is collapsing into agents.&rdquo;
              <span className="mt-1 block text-sm font-bold not-italic text-black/40">— Satya Nadella, CEO Microsoft</span>
            </blockquote>
            <h1 className="max-w-6xl text-[3.2rem] font-black leading-[0.9] tracking-[-0.09em] sm:text-[5rem] lg:text-[7.5rem]">
              Agent-ready or already behind?
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
              When the app layer collapses, which SaaS products survive? Our 6-point Agent Readiness framework scores them &mdash; and shows you exactly what to fix.
            </p>
          </div>
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <Link href="/score" className="neo-button w-full text-center">
              RUN THE FREE SCORE CHECK
            </Link>
            <Link href="/blog" className="neo-button-secondary w-full text-center">
              SEE PUBLISHED AUDITS
            </Link>
          </div>
        </div>
      </section>

      {/* The framework */}
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-4">
          <p className="neo-kicker">The framework</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
            6 dimensions. Blunt scores.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-black/78 sm:text-lg">
          <p>
            We audit your SaaS product across six dimensions that determine whether AI agents can actually use it: <strong>API surface, authentication, structured data, MCP readiness, permissions model, and observability</strong>.
          </p>
          <p>
            Each dimension gets a score. You get a blunt /10 overall rating, a Report Card PDF, and a 15-minute Loom walkthrough showing exactly where the gaps are &mdash; and what to fix first.
          </p>
          <p>
            No hand-waving. No &ldquo;it depends.&rdquo; Real scores based on what agents can actually see and do with your product today.
          </p>
        </div>
      </section>

      {/* Published audits */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neo-kicker">Published audits</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
              6 products scored. Real numbers.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-black/78">
              These are real audits. Same framework, same methodology your report will use.
            </p>
          </div>
          <Link href="/blog" className="neo-link text-sm font-bold">
            See all published audits
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SAMPLE_RESULTS.map((result) => (
            <Link
              key={result.slug}
              href={`/blog/${result.slug}`}
              className="neo-card flex min-h-56 flex-col justify-between p-5"
              style={{ backgroundColor: result.background }}
            >
              <div className="space-y-3">
                <p className="text-sm font-bold">{result.name}</p>
                <p className="text-5xl font-black leading-none tracking-[-0.08em]">{result.score}</p>
              </div>
              <p className="max-w-[14rem] text-sm font-bold">{result.verdict}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="neo-panel bg-white p-6 sm:p-8 space-y-4">
          <span className="neo-tag neo-tag-yellow">Self-serve</span>
          <h3 className="text-3xl font-black tracking-[-0.05em]">Agent Readiness Audit</h3>
          <p className="text-base leading-7 text-black/78">
            &euro;39. Gary audits your product across all 6 dimensions. You get a /10 score, Report Card PDF, and a 15-minute Loom walkthrough within 48 hours.
          </p>
          <Link href="/checkout" className="neo-button block w-full text-center">
            BUY THE REPORT &mdash; &euro;39
          </Link>
        </div>
        <div className="neo-panel bg-accent-yellow p-6 sm:p-8 space-y-4">
          <span className="neo-tag neo-tag-violet">Consulting</span>
          <h3 className="text-3xl font-black tracking-[-0.05em]">Full assessment with Phil</h3>
          <p className="text-base leading-7 text-black/78">
            &euro;299. Same framework, delivered by Phil Bennett &mdash; 20 years engineering leadership, ex-Klarna. Includes a 60-minute strategy session and remediation roadmap.
          </p>
          <Link href="/consulting" className="neo-button block w-full text-center">
            BOOK CONSULTING &mdash; &euro;299
          </Link>
        </div>
      </section>
    </div>
  );
}
