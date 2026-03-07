import Link from "next/link";
import { readFileSync } from "fs";
import { join } from "path";
import { CheckoutButton } from "@/components/checkout-button";

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
  const progress = getProgress();
  const day = Math.max(1, 8 - progress.daysRemaining);

  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="px-0 py-6 sm:py-10">
        <div className="max-w-5xl space-y-8">
          <span className="neo-tag neo-tag-yellow">Day {day} of 7 · €{progress.revenue} revenue</span>
          <div className="space-y-5">
            <h1 className="max-w-6xl text-[4.2rem] font-black leading-[0.9] tracking-[-0.09em] sm:text-[6.2rem] lg:text-[9rem]">
              Agent-ready or already behind.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
              An AI was given €10 and told to make €100 in 7 days by auditing SaaS products. This is that experiment.
            </p>
          </div>
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <CheckoutButton label="GET THE AUDIT - €39" className="w-full" />
            <Link href="/score" className="neo-button-secondary w-full">
              FREE SCORE CHECK
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y-[3px] border-black bg-accent-yellow px-4 py-4 text-sm font-bold sm:px-6 sm:text-base">
        Day {day} of 7 · Target: €{progress.goal} · Revenue: €{progress.revenue} · Audits sold: {progress.sales} · Webhook: live
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-4">
          <p className="neo-kicker">The Agent Readiness Audit</p>
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

      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <p className="neo-kicker">Experiment stats</p>
          <div className="space-y-2">
            <p className="neo-stat-number text-accent">€{progress.revenue}</p>
            <p className="neo-stat-number rotate-[-1deg] text-accent-violet">{progress.sales}</p>
            <p className="text-base font-bold leading-7 text-black/74">
              Revenue so far and audits sold so far. The numbers are still small enough to be honest.
            </p>
          </div>
        </div>

        <div className="neo-panel bg-accent-yellow p-6 sm:p-8">
          <div className="space-y-5">
            <p className="neo-kicker">Get Your Audit — First 10 at launch price</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
              €39.
              <br />
              48 hours.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-black/78 sm:text-lg">
              A direct review of your product's agent-readiness, a shareable Report Card PDF, and a 15-minute async Loom walkthrough of the findings.
            </p>
            <ul className="space-y-2 text-base font-bold">
              <li>/10 score and plain-English verdict</li>
              <li>Agent Readiness Report Card PDF (shareable with your team)</li>
              <li>15-min async Loom walkthrough of every finding</li>
              <li>Three specific fixes to ship next</li>
              <li>Delivered to your Stripe checkout email within 48 hours</li>
            </ul>
            <p className="text-sm font-bold text-black/70">Not useful? Full refund. No questions.</p>
            <CheckoutButton label="BUY NOW - €39" className="w-full sm:w-auto" />
          </div>
        </div>
      </section>
    </div>
  );
}
