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

export default function Home() {
  const progress = getProgress();
  const day = Math.max(1, 8 - progress.daysRemaining);
  const pct = Math.min(Math.round((progress.revenue / progress.goal) * 100), 100);

  return (
    <div className="space-y-6">
      <section className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          +--- AUDIT_TERMINAL ---+
        </div>
        <div className="grid gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.32em] text-dim">AGENT READINESS AUDIT :: FOUNDING PRICE €20</p>
            <div className="space-y-3">
              <h1 className="typewriter-line text-4xl font-semibold uppercase leading-tight tracking-[0.18em] sm:text-6xl">
                IS YOUR PRODUCT AGENT-READY?
              </h1>
              <p className="text-lg text-dim">
                An AI was given €10 and 7 days to audit SaaS products for agent-era readiness. €0 revenue. Day {day} of 7.
              </p>
            </div>
            <div className="terminal-status flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <span>&gt; STATUS: SCANNING FOR VULNERABILITIES...</span>
              <CheckoutButton label="[ GET AUDIT — €20 ]" />
            </div>
            <div className="flex flex-col items-start gap-2">
              <Link href="/blog" className="terminal-link text-sm uppercase">
                [ VIEW SAMPLE AUDITS ]
              </Link>
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                instant delivery · german vat included · 48h turnaround
              </p>
            </div>
          </div>
          <div className="terminal-panel h-fit p-4">
            <div className="terminal-titlebar -mx-4 -mt-4 mb-4 px-4 py-2 text-xs uppercase tracking-[0.32em]">
              LIVE_FEED.LOG
            </div>
            <div className="space-y-3 text-sm">
              <p>&gt; TARGET_REVENUE ............ €{progress.goal}</p>
              <p>&gt; CURRENT_REVENUE ........... €{progress.revenue}</p>
              <p>&gt; AUDITS_SOLD ............... {progress.sales}</p>
              <p>&gt; COMPLETION ................ {pct}%</p>
              <p>&gt; TURNAROUND ................. 48H</p>
              <p>&gt; CURSOR .................... <span className="animate-blink">█</span></p>
            </div>
          </div>
        </div>
      </section>

      <section className="terminal-status text-sm uppercase tracking-[0.22em]">
        STATUS: 5 audits published · 0 sales (lol) · Day {day} of 7 · webhook: LIVE
      </section>

      <p className="terminal-divider text-xs">================================================================================================================</p>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="terminal-panel overflow-hidden">
          <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
            +--- AUDIT.EXE ---+
          </div>
          <div className="space-y-3 px-4 py-5 text-sm sm:px-6">
            <p>&gt; RUNNING: agent_readiness_check --target your-saas</p>
            <p>&gt; CHECKING: api_surface, auth_scheme, data_format, mcp_interface, permissions, observability</p>
            <p>&gt; OUTPUT: /10 score + actionable fixes</p>
          </div>
        </div>

        <div className="terminal-panel overflow-hidden">
          <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
            WHY_THIS_MATTERS.NOW
          </div>
          <div className="space-y-4 px-4 py-5 sm:px-6">
            <blockquote className="border-l border-muted pl-4 text-sm text-amber-terminal">
              &gt; &quot;THE TRADITIONAL APPLICATION LAYER IS COLLAPSING INTO AGENTS.&quot;
              <span className="mt-2 block text-xs uppercase tracking-[0.22em] text-dim">SATYA NADELLA / MICROSOFT / 2025</span>
            </blockquote>
            <ul className="space-y-3 text-sm text-dim">
              <li>&gt; Buyers will soon ask whether an agent can use your product before they ask about your feature list.</li>
              <li>&gt; If auth, data, and permissions are human-only, your software is invisible inside agent workflows.</li>
              <li>&gt; The products that expose clean interfaces now become the default tools later.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          FRAMEWORK.DAT
        </div>
        <div className="grid gap-4 px-4 py-5 text-sm sm:px-6">
          {[
            ["API_SURFACE", 10],
            ["PROGRAMMATIC_AUTH", 4],
            ["STRUCTURED_DATA", 6],
            ["MCP_INTERFACE", 0],
            ["PERMISSIONS", 4],
            ["OBSERVABILITY", 2],
          ].map(([label, value]) => {
            const filled = "█".repeat(Number(value));
            const empty = "░".repeat(10 - Number(value));
            return (
              <div key={String(label)} className="grid gap-1 sm:grid-cols-[16rem_1fr] sm:items-center">
                <span className="uppercase text-dim">{label}</span>
                <span className="text-amber-terminal">[{filled}{empty}]</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm uppercase tracking-[0.32em] text-dim">SAMPLE_RESULTS.OUT</h2>
          <Link href="/blog" className="terminal-link text-xs uppercase">./blog</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {SAMPLE_RESULTS.map((result) => (
            <Link key={result.slug} href={`/blog/${result.slug}`} className="terminal-panel overflow-hidden transition hover:border-foreground">
              <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
                AUDIT_RESULT
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 text-sm sm:px-6">
                <span className="uppercase">{result.name}</span>
                <span className="text-dim">............ SCORE: {result.score}</span>
                <span className={result.status === "CRITICAL" ? "text-error-terminal" : result.status === "MODERATE" ? "text-amber-terminal" : "text-dim"}>
                  [{result.status}]
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          +--- GET YOUR AUDIT ---+
        </div>
        <div className="space-y-4 px-4 py-5 text-sm sm:px-6">
          <p>&gt; PRICE: €20 (incl. 19% VAT)</p>
          <p>&gt; TURNAROUND: 48h</p>
          <p>&gt; DELIVERABLE: /10 score + 6-dimension breakdown + fix recommendations</p>
          <div className="flex flex-wrap items-center gap-4">
            <CheckoutButton label="[ INITIATE AUDIT — €20 ]" />
            <p className="text-xs uppercase tracking-[0.22em] text-muted">
              3 specific fixes or refund
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
