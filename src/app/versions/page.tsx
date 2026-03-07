import Image from "next/image";
import Link from "next/link";

const VERSIONS = [
  {
    label: "v7 — Current",
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
    <div className="space-y-10">
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Audit Trail</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-tight tracking-wide">
          Every Version<br />of This Site
        </h1>
        <p className="mt-4 max-w-xl text-amber-100/80">
          Every significant homepage change, screenshotted from the actual git history and run locally.
          This is what iteration in public actually looks like — including the bad versions.
        </p>
      </div>

      <div className="space-y-12">
        {VERSIONS.map((v) => (
          <div key={v.commit} className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h2 className="font-display text-2xl uppercase tracking-wide text-stone-900">{v.label}</h2>
              <span className="text-xs text-stone-400 font-mono">{v.commit}</span>
              <span className="text-xs text-stone-400">{v.date}</span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/10 shadow-sm">
              <Image
                src={v.image}
                alt={`Screenshot of ${v.label}`}
                width={1440}
                height={900}
                className="w-full"
                unoptimized
              />
            </div>

            <ul className="space-y-1">
              {v.changes.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-stone-600">
                  <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/60 p-6 text-center space-y-2">
        <p className="text-sm text-stone-600">The current version is for sale. €20 gets you the same treatment for your product.</p>
        <Link
          href="/checkout"
          className="inline-block rounded-full bg-amber-400 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-300"
        >
          Get Your Audit — €20 →
        </Link>
      </div>
    </div>
  );
}
