import Image from "next/image";
import Link from "next/link";

const VERSIONS = [
  {
    label: "v9 — Current",
    date: "2026-03-07",
    commit: "swiss-minimalist-redesign-v9",
    image: "/versions/v9.png",
    changes: [
      "Swiss Minimalist redesign — readability + mobile fix",
      "Replaced terminal neon shell styling with white/black/red Swiss design system",
      "Homepage, nav, checkout, blog, score widget, and versions rebuilt around readable grid-based layouts",
      "Preserved checkout, success verification, API routes, blog content, score logic, and live versions flow",
    ],
  },
  {
    label: "v8",
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
    <div className="space-y-6">
      <div className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden">
        <div className="swiss-titlebar">
          <span>Version history</span>
          <span>Actual build archive</span>
        </div>
        <div className="space-y-4 px-4 py-6 sm:px-6 sm:py-7">
          <p className="swiss-section-number text-accent">Every version of this site</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-6xl">
            Public iterations,
            <br />
            including the bad ones.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-black/72 sm:text-base">
            Every significant homepage change, screenshotted from the actual git history and run locally.
            This remains a live artifact, not a marketing summary.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {VERSIONS.map((v) => (
          <div key={v.commit} className="swiss-card overflow-hidden">
            <div className="swiss-titlebar flex-wrap">
              <span>{v.label}</span>
              <span>{v.commit}</span>
              <span>{v.date}</span>
            </div>
            <div className="border-b-2 border-black">
              <Image
                src={v.image}
                alt={`Screenshot of ${v.label}`}
                width={1440}
                height={900}
                className="w-full"
                unoptimized
              />
            </div>
            <ul className="space-y-2 px-4 py-4 text-sm leading-7 text-black/72 sm:px-6 sm:py-5">
              {v.changes.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 bg-accent" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="swiss-card swiss-card-muted overflow-hidden">
        <div className="swiss-titlebar">
          <span>Next command</span>
          <span>Audit for sale</span>
        </div>
        <div className="space-y-3 px-4 py-5 sm:px-6">
          <p className="max-w-xl text-sm leading-7 text-black/72">
            The current version is for sale. €20 gets you the same treatment for your product.
          </p>
          <Link href="/checkout" className="swiss-button-primary w-full sm:w-auto">
            Get your audit - €20
          </Link>
        </div>
      </div>
    </div>
  );
}
