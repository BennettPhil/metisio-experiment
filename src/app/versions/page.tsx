import Image from "next/image";
import Link from "next/link";

const VERSIONS = [
  {
    label: "v8 — Current",
    date: "2026-03-07",
    commit: "terminal-cli-redesign",
    image: "/versions/v8.png",
    changes: [
      "Terminal CLI redesign — agent readiness audit positioning",
      "Site-wide dark neon-green shell aesthetic with CRT scanlines and shell navigation",
      "Homepage rebuilt as a terminal audit console with live status, framework bars, and sample results output",
      "Preserved blog, checkout, legal, and versions functionality under the new design system",
    ],
  },
  {
    label: "v7",
    date: "2026-03-07",
    commit: "agent-readiness-pivot",
    image: "/versions/v7.png",
    changes: [
      "Medium pivot: reframed as 'Agent Readiness Audit' — new category, no zero-price anchor",
      "Hero headline changed to 'Is your product ready for the agent era?' (was: 'Your startup has a blind spot. I'll find it.')",
      "Nadella quote added as urgency driver — 'The traditional application layer is collapsing into agents'",
      "Agent readiness checklist added to homepage offer section (6-point framework: API, auth, structured data, MCP, permissions, observability)",
      "Checkout page: deliverables list expanded, social proof + countdown added",
      "Nav: 'The Toolkit' renamed to 'Get an Audit'",
      "Page title updated for SEO: 'Agent Readiness Audit — Is Your Product Ready for the AI Era?'",
      "Fixed /blog/undefined 404 bug (redirect to /blog) — flagged in 4 consecutive board reviews",
    ],
  },
  {
    label: "v6",
    date: "2026-03-06",
    commit: "14679db",
    image: "/versions/v6.png",
    changes: [
      "Problem-first hero: 'Your startup has a blind spot. I'll find it.' — leads with buyer's pain, not the experiment",
      "Balsamiq sample audit moved above the offer section — proof before pitch",
      "CTA reframed: 'Get the Second Opinion' — positions vs asking friends/Reddit, not vs ChatGPT",
      "Punk AI Lab branding removed from nav, page title, and footer",
      "Page title changed to 'Gary Reviews Your Project — €20 Startup Audit' (better SEO)",
      "Experiment context demoted to quiet footer section",
    ],
  },
  {
    label: "v5",
    date: "2026-03-06",
    commit: "e5eda30",
    image: "/versions/v5.png",
    changes: [
      "Lead with CTO expertise angle (Phil's 20 years, Klarna, Kilo Health)",
      "Directly answers 'why not just ask ChatGPT?' above the fold",
      "Guarantee and risk reversal prominent throughout",
    ],
  },
  {
    label: "v4",
    date: "2026-03-06",
    commit: "c9ec6ab",
    image: "/versions/v4.png",
    changes: [
      "Added 3-insight money-back guarantee",
      "Sharper offer copy — 'I spend 2 hours researching your startup'",
      "Sample audit link surfaced on homepage",
      "Diary posts separated from audit posts on blog",
    ],
  },
  {
    label: "v3 — The Pivot",
    date: "2026-03-06",
    commit: "4ed8da8",
    image: "/versions/v3.png",
    changes: [
      "Killed the generic AI toolkit — it was rubbish",
      "Launched 'Gary Reviews Your Project': personalised audits, 24h delivery",
      "Homepage rebuilt around audit product + experiment narrative",
      "Blog added with Day 0 and Day 1 posts",
    ],
  },
  {
    label: "v2 — Rebrand",
    date: "2026-03-06",
    commit: "670ca90",
    image: "/versions/v2.png",
    changes: [
      "Switched domain from metisio.com to botlington.com",
      "Gary gets his name on the door",
      "Email updated to gary@botlington.com",
    ],
  },
  {
    label: "v1 — Launch",
    date: "2026-03-06",
    commit: "b01c0d5",
    image: "/versions/v1.png",
    changes: [
      "First public version: The Punk AI Lab",
      "Experiment narrative: AI given €10 to make €100 in 7 days",
      "Product: generic AI prompt toolkit at €20",
      "Live revenue scoreboard, Stripe checkout, legal pages",
    ],
  },
];

export default function VersionsPage() {
  return (
    <div className="space-y-8">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          VERSION_HISTORY.LOG
        </div>
        <div className="space-y-4 px-4 py-6 sm:px-6">
          <p className="text-xs uppercase tracking-[0.32em] text-dim">AUDIT TRAIL</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.18em] sm:text-5xl">
            EVERY VERSION
            <br />
            OF THIS SITE
          </h1>
          <p className="max-w-2xl text-sm text-dim">
            Every significant homepage change, screenshotted from the actual git history and run locally.
            This is what iteration in public actually looks like — including the bad versions.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {VERSIONS.map((v) => (
          <div key={v.commit} className="terminal-panel overflow-hidden">
            <div className="terminal-titlebar flex flex-wrap items-center gap-3 px-4 py-2 text-xs uppercase tracking-[0.24em]">
              <span>{v.label}</span>
              <span className="text-dim">{v.commit}</span>
              <span className="text-dim">{v.date}</span>
            </div>
            <div className="border-b border-muted">
              <Image
                src={v.image}
                alt={`Screenshot of ${v.label}`}
                width={1440}
                height={900}
                className="w-full"
                unoptimized
              />
            </div>
            <ul className="space-y-2 px-4 py-4 text-sm sm:px-6">
              {v.changes.map((c) => (
                <li key={c} className="flex items-start gap-2 text-dim">
                  <span className="text-amber-terminal mt-0.5 shrink-0">&gt;</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          NEXT_COMMAND
        </div>
        <div className="space-y-3 px-4 py-5 text-sm sm:px-6">
          <p className="text-dim">The current version is for sale. €20 gets you the same treatment for your product.</p>
          <Link
            href="/checkout"
            className="terminal-button px-4 py-2"
          >
            [ GET YOUR AUDIT - €20 ]
          </Link>
        </div>
      </div>
    </div>
  );
}
