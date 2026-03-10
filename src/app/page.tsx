import Link from "next/link";
import { CheckoutButton } from "@/components/checkout-button";
import { ExperimentTicker } from "@/components/experiment-ticker";

const SAMPLE_RESULTS = [
  { name: "CARRD", score: "0/10", verdict: "Invisible to agents", background: "#FF6B6B", slug: "audit-carrd" },
  { name: "BALSAMIQ", score: "1/10", verdict: "Severe friction", background: "#FF8E8E", slug: "sample-audit-balsamiq" },
  { name: "KIT", score: "6/10", verdict: "Usable with caveats", background: "#FFD93D", slug: "audit-convertkit" },
  { name: "GHOST", score: "7/10", verdict: "Ready enough to build on", background: "#86EFAC", slug: "audit-ghost" },
  { name: "PLAUSIBLE", score: "7/10", verdict: "Solid foundations", background: "#4ADE80", slug: "audit-plausible" },
  { name: "LINEAR", score: "7/10", verdict: "API-first, MCP gap", background: "#60D2A0", slug: "audit-linear" },
];

const FRAMEWORK = [
  "API surface: can an agent actually reach the product?",
  "Programmatic auth: can software log in without a human click path?",
  "Structured data: does the output come back in a form machines can use?",
  "MCP and tool interface: is there a clean integration layer?",
  "Permissions: can you scope what an agent is allowed to do?",
  "Observability: can you see agent traffic and debug it?",
];

export default function Home() {
  return (
    <div className="space-y-12 sm:space-y-16">
      <ExperimentTicker />
      <section className="px-0 py-6 sm:py-10">
        <div className="max-w-5xl space-y-8">
          <div className="space-y-5">
            <blockquote className="border-l-[4px] border-black pl-4 max-w-2xl">
              <p className="text-base font-bold leading-relaxed sm:text-lg">
                &ldquo;The traditional application layer is collapsing into agents.&rdquo;
              </p>
              <cite className="mt-1 block text-sm font-bold not-italic text-black/60">
                — Satya Nadella, Microsoft CEO
              </cite>
            </blockquote>
            <h1 className="max-w-6xl text-[4.2rem] font-black leading-[0.9] tracking-[-0.09em] sm:text-[6.2rem] lg:text-[9rem]">
              Agent-ready or already behind.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
              When the app layer collapses, which SaaS products survive? Our 6-point Agent Readiness framework scores them — and shows you exactly what to fix.
            </p>
          </div>
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <CheckoutButton label="GET THE AUDIT — PAY WHAT YOU WANT" className="w-full" />
            <Link href="/score" className="neo-button-secondary w-full">
              FREE SCORE CHECK
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-4">
          <p className="neo-kicker">The Agent Survival Report</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
            A blunt /10 on whether software works for agents.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-black/78 sm:text-lg">
          <p>
            The audit scores the parts of your product that matter when buyers stop asking whether humans can click through a workflow and start asking whether an agent can complete it.
          </p>
          <p>
            It is not a vague "AI strategy" document. It is a working review of interfaces, auth, data shape, permissions, and the points where an agent will fail.
          </p>
          <p>
            You get a score, a verdict, and the first fixes that would make the biggest difference fastest.
          </p>
          <ul className="space-y-2 font-bold">
            {FRAMEWORK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neo-kicker">Sample scorecard</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
              Real products, real numbers.
            </h2>
          </div>
          <Link href="/blog" className="neo-link text-sm font-bold">
            See all published audits
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {SAMPLE_RESULTS.map((result) => (
            <Link
              key={result.slug}
              href={`/blog/${result.slug}`}
              className="neo-card flex min-h-72 flex-col justify-between p-5"
              style={{ backgroundColor: result.background }}
            >
              <div className="space-y-4">
                <p className="text-sm font-bold">{result.name}</p>
                <p className="text-6xl font-black leading-none tracking-[-0.08em]">{result.score}</p>
              </div>
              <p className="max-w-[14rem] text-sm font-bold">{result.verdict}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Two-tier pricing */}
      <section className="space-y-6">
        <div>
          <p className="neo-kicker">Get assessed</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
            Two ways in.
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="neo-panel bg-white p-6 sm:p-8 space-y-4">
            <span className="neo-tag neo-tag-yellow">Quick start</span>
            <h3 className="text-3xl font-black tracking-[-0.05em]">Agent Survival Report</h3>
            <p className="text-base leading-7 text-black/78">
              Pay what you want — from €1. Gary audits your product across all 6 dimensions. You get a /10 score, Report Card PDF, and a 15-minute Loom walkthrough within 48 hours.
            </p>
            <ul className="space-y-1 text-sm font-bold text-black/70">
              <li>→ /10 score + plain-English verdict</li>
              <li>→ Report Card PDF (shareable)</li>
              <li>→ 15-min async Loom walkthrough</li>
              <li>→ Three prioritised fixes</li>
            </ul>
            <p className="text-sm font-bold text-black/60">Not useful? Full refund. No questions.</p>
            <CheckoutButton label="PAY WHAT YOU WANT" className="w-full" />
          </div>
          <div className="neo-panel bg-accent-yellow p-6 sm:p-8 space-y-4">
            <span className="neo-tag neo-tag-violet">Full engagement</span>
            <h3 className="text-3xl font-black tracking-[-0.05em]">Consulting with Phil</h3>
            <p className="text-base leading-7 text-black/78">
              €299. Same framework, delivered by Phil Bennett — 20 years engineering leadership, ex-Klarna, ex-Corvus Insurance. Includes a 60-minute strategy session and a remediation roadmap your team can execute on.
            </p>
            <ul className="space-y-1 text-sm font-bold text-black/70">
              <li>→ Everything in the Report, plus:</li>
              <li>→ 60-min live strategy session</li>
              <li>→ Prioritised remediation roadmap</li>
              <li>→ 30-day email follow-up</li>
            </ul>
            <Link href="/consulting" className="neo-button block w-full text-center">
              BOOK CONSULTING — €299
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
