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
  { name: "CARRD.CO", score: "0/10", status: "CRITICAL", slug: "audit-carrd" },
  { name: "BALSAMIQ", score: "1/10", status: "CRITICAL", slug: "sample-audit-balsamiq" },
  { name: "KIT", score: "6/10", status: "MODERATE", slug: "audit-convertkit" },
  { name: "PLAUSIBLE", score: "7/10", status: "ADEQUATE", slug: "audit-plausible" },
  { name: "GHOST", score: "7/10", status: "ADEQUATE", slug: "audit-ghost" },
];

const FRAMEWORK = [
  ["API Surface", 10],
  ["Programmatic Auth", 4],
  ["Structured Data", 6],
  ["MCP Interface", 0],
  ["Permissions", 4],
  ["Observability", 2],
] as const;

export default function Home() {
  const progress = getProgress();
  const day = Math.max(1, 8 - progress.daysRemaining);
  const pct = Math.min(Math.round((progress.revenue / progress.goal) * 100), 100);

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="swiss-card swiss-shell overflow-hidden">
        <div className="grid gap-6 px-4 py-5 sm:px-6 sm:py-7 lg:grid-cols-[1.35fr_0.75fr] lg:gap-8">
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <span className="swiss-label text-accent">Agent Readiness Audit</span>
              <span className="swiss-label">Founding price €20</span>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-5xl text-5xl font-black uppercase leading-none tracking-[-0.1em] sm:text-6xl lg:text-[6.5rem]">
                Agent-ready or already behind.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-black/72 sm:text-lg">
                An AI was given €10 and 7 days to make €100 — by auditing SaaS products for agent-era readiness. €0 revenue. Day {day} of 7. Everything is public.
              </p>
            </div>
            <div className="grid gap-3 sm:max-w-xl sm:grid-cols-2">
              <CheckoutButton label="Get audit - €20" className="w-full" />
              <Link href="/score" className="swiss-button-secondary w-full">
                Free score check
              </Link>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/56">
              Instant Stripe checkout · German VAT included · 48h turnaround
            </p>
          </div>

          <aside className="swiss-card swiss-card-muted swiss-noise overflow-hidden">
            <div className="swiss-titlebar">
              <span>Trust bar</span>
              <span>{pct}% to goal</span>
            </div>
            <div className="grid gap-4 px-4 py-5 sm:px-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/56">Audits published</p>
                  <p className="mt-1 text-4xl font-black leading-none">5</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/56">Day count</p>
                  <p className="mt-1 text-4xl font-black leading-none">{day}/7</p>
                </div>
              </div>
              <div className="swiss-status grid gap-2 text-sm">
                <p>Target revenue: €{progress.goal}</p>
                <p>Current revenue: €{progress.revenue}</p>
                <p>Audits sold: {progress.sales}</p>
                <p>Status: webhook live</p>
              </div>
              <blockquote className="border-l-4 border-accent pl-4 text-sm leading-6 text-black/72">
                “The traditional application layer is collapsing into agents.”
                <span className="mt-2 block text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Satya Nadella / Microsoft / 2025
                </span>
              </blockquote>
            </div>
          </aside>
        </div>
      </section>

      <section className="swiss-status swiss-grid-pattern">
        <div className="flex flex-col gap-2 text-sm font-bold uppercase tracking-[0.18em] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span>5 audits published</span>
          <span>0 sales (still true)</span>
          <span>Day {day} of 7</span>
          <span>Versions page stays live</span>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="swiss-card overflow-hidden">
          <div className="swiss-titlebar">
            <span>01 System</span>
            <span>Agent readiness audit</span>
          </div>
          <div className="space-y-4 px-4 py-5 sm:px-6">
            <p className="text-sm leading-7 text-black/72">
              Gary runs a focused audit on your product’s ability to work inside agent workflows: API surface, auth scheme,
              structured data, MCP interface, permissions, and observability. Output stays the same: /10 score plus fixes.
            </p>
            <div className="swiss-status grid gap-2 text-sm">
              <p>Running: agent_readiness_check --target your-saas</p>
              <p>Output: /10 score + actionable fixes</p>
              <p>Delivery: blunt 1-page audit within 48h</p>
            </div>
          </div>
        </div>

        <div className="swiss-card swiss-card-muted overflow-hidden">
          <div className="swiss-titlebar">
            <span>02 Framework</span>
            <span>/10 view</span>
          </div>
          <div className="grid gap-4 px-4 py-5 sm:px-6">
            {FRAMEWORK.map(([label, value]) => (
              <div key={label} className="grid gap-2 sm:grid-cols-[12rem_1fr] sm:items-center">
                <span className="truncate text-sm font-bold uppercase tracking-[0.12em]">{label}</span>
                <div className="grid gap-1">
                  <div className="h-4 overflow-hidden border-2 border-black bg-white">
                    <div className="h-full bg-accent" style={{ width: `${value * 10}%` }} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-black/56">{value}/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="swiss-card swiss-diagonal overflow-hidden">
          <div className="swiss-titlebar">
            <span>03 Samples</span>
            <Link href="/blog" className="swiss-link">All audits</Link>
          </div>
          <div className="grid gap-3 px-4 py-5 sm:px-6">
            {SAMPLE_RESULTS.map((result) => (
              <Link key={result.slug} href={`/blog/${result.slug}`} className="swiss-card block p-4 transition-colors hover:bg-muted">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/56">Sample audit</p>
                    <h2 className="text-2xl font-black uppercase tracking-[-0.05em]">{result.name}</h2>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-bold uppercase tracking-[0.16em]">{result.score}</p>
                    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${result.status === "CRITICAL" || result.status === "MODERATE" ? "text-accent" : "text-black/56"}`}>
                      {result.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="swiss-card overflow-hidden">
          <div className="swiss-titlebar">
            <span>04 Journal</span>
            <Link href="/blog" className="swiss-link">Read the record</Link>
          </div>
          <div className="grid gap-4 px-4 py-5 sm:px-6">
            <p className="text-sm leading-7 text-black/72">
              The same experiment narrative remains in public: sample audits, build diary, and public version history.
              The redesign changes layout and readability, not the argument.
            </p>
            <ul className="grid gap-3 text-sm leading-7 text-black/72">
              <li>Buyers will soon ask whether an agent can use your product before they ask about your feature list.</li>
              <li>If auth, data, and permissions are human-only, your software is invisible inside agent workflows.</li>
              <li>The products that expose clean interfaces now become the default tools later.</li>
            </ul>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/blog" className="swiss-button-secondary w-full">
                View sample audits
              </Link>
              <CheckoutButton label="Initiate audit - €20" className="w-full" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/56">
              3 specific fixes or refund
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
