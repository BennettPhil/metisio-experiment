import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";

interface Progress {
  revenue: number;
  goal: number;
  sales: number;
  daysRemaining: number;
  startDate: string;
}

function getProgress(): Progress {
  try {
    const raw = readFileSync(join(process.cwd(), "src/data/progress.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return { revenue: 0, goal: 100, sales: 0, daysRemaining: 7, startDate: "2026-03-06" };
  }
}

const TIMELINE = [
  { day: "Day 1", event: "Launched 'The Punk AI Lab' — generic AI toolkit at €20. Pivoted within hours to SaaS-specific audits." },
  { day: "Day 2", event: "Cold-emailed 7 SaaS founders. Response rate: 0%. Built an interactive scoring widget and wrote 5 sample audits." },
  { day: "Day 3", event: "Nadella said 'the app layer is collapsing into agents.' Gary pivoted to Agent Readiness Audits. Built a 6-point framework. Raised price to €39." },
  { day: "Day 4", event: "12 design iterations. Terminal green → Swiss minimalist → neo-brutalist. Board of directors reached consensus: the product is right, the channel is wrong." },
  { day: "Day 5", event: "54 commits. 12 board reviews. €0 revenue. The experiment answered its question." },
];

const STATS = [
  { number: "54", label: "Git commits" },
  { number: "12", label: "Board reviews" },
  { number: "12", label: "Redesigns" },
  { number: "6", label: "Sample audits" },
  { number: "162", label: "Unique visitors" },
  { number: "€0", label: "Revenue" },
];

const SAMPLE_RESULTS = [
  { name: "CARRD", score: "0/10", verdict: "Invisible to agents", background: "#FF6B6B", slug: "audit-carrd" },
  { name: "BALSAMIQ", score: "1/10", verdict: "Severe friction", background: "#FF8E8E", slug: "sample-audit-balsamiq" },
  { name: "KIT", score: "6/10", verdict: "Usable with caveats", background: "#FFD93D", slug: "audit-convertkit" },
  { name: "GHOST", score: "7/10", verdict: "Ready enough to build on", background: "#86EFAC", slug: "audit-ghost" },
  { name: "PLAUSIBLE", score: "7/10", verdict: "Solid foundations", background: "#4ADE80", slug: "audit-plausible" },
  { name: "LINEAR", score: "7/10", verdict: "API-first, MCP gap", background: "#60D2A0", slug: "audit-linear" },
];

export default function Home() {
  const progress = getProgress();

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero — the experiment story */}
      <section className="px-0 py-6 sm:py-10">
        <div className="max-w-5xl space-y-8">
          <span className="neo-tag neo-tag-yellow">Experiment complete · €0 revenue · 54 commits · 12 redesigns</span>
          <div className="space-y-5">
            <h1 className="max-w-6xl text-[3.8rem] font-black leading-[0.9] tracking-[-0.09em] sm:text-[5.5rem] lg:text-[8rem]">
              I gave my AI agent €10 and told it to make €100.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
              It built 12 versions of the site, wrote 6 sample audits, cold-emailed 20 founders, held 12 board meetings with fictional advisors, and made exactly nothing. Here&apos;s the full story — and what it actually proved about AI autonomy.
            </p>
          </div>
          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            <Link href="/checkout" className="neo-button w-full text-center">
              GET AN AUDIT — PAY WHAT YOU WANT
            </Link>
            <Link href="/consulting" className="neo-button-secondary w-full text-center">
              FULL CONSULTING — €299
            </Link>
            <Link href="/blog" className="neo-button-secondary w-full text-center">
              READ THE STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y-[3px] border-black bg-accent-yellow px-4 py-5 sm:px-6">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">{stat.number}</p>
              <p className="text-xs font-bold text-black/70 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What happened — timeline */}
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="space-y-4">
          <p className="neo-kicker">What happened</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
            5 days of autonomous chaos.
          </h2>
          <p className="max-w-xl text-base leading-8 text-black/78 sm:text-lg">
            Gary had full access to code, email, Stripe, and GitHub. He made every product, pricing, and marketing decision himself. I only stepped in for things that needed my personal accounts.
          </p>
        </div>
        <div className="space-y-4">
          {TIMELINE.map((item) => (
            <div key={item.day} className="neo-panel bg-white p-4 sm:p-5">
              <p className="text-sm font-black">{item.day}</p>
              <p className="mt-1 text-base leading-7 text-black/78">{item.event}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample audits — the real IP */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neo-kicker">The output</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
              Real products, real scores.
            </h2>
          </div>
          <Link href="/blog" className="neo-link text-sm font-bold">
            Read all published audits
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

      {/* The lesson */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="neo-panel bg-white p-6 sm:p-8">
          <p className="neo-kicker mb-4">What the AI built</p>
          <h3 className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">A legitimate framework.</h3>
          <p className="mt-3 text-base leading-7 text-black/78">
            The 6-dimension Agent Readiness scoring — API surface, programmatic auth, structured data, MCP interfaces, permissions, observability — is genuinely useful IP. It predicts which products survive when agents become the primary interaction layer.
          </p>
        </div>
        <div className="neo-panel bg-white p-6 sm:p-8">
          <p className="neo-kicker mb-4">What the AI couldn&apos;t do</p>
          <h3 className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">Sell it.</h3>
          <p className="mt-3 text-base leading-7 text-black/78">
            Zero revenue. Not because the product was bad, but because trust, distribution, and timing are human problems. An AI agent cold-emailing founders about a product assessment from a 5-day-old website has exactly the conversion rate you&apos;d expect.
          </p>
        </div>
      </section>

      {/* CTA — two tiers */}
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
            <Link href="/checkout" className="neo-button block w-full text-center">
              PAY WHAT YOU WANT
            </Link>
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
        <div className="text-center">
          <Link href="/score" className="neo-link text-sm font-bold">
            Not sure yet? Take the free score check first →
          </Link>
        </div>
      </section>

      {/* Versions */}
      <section className="text-center">
        <Link href="/versions" className="neo-link text-sm font-bold">
          See all 12 versions of this site →
        </Link>
      </section>
    </div>
  );
}
