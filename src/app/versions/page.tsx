import Image from "next/image";
import Link from "next/link";

const VERSIONS = [
  {
    label: "v12 — Current",
    date: "2026-03-08",
    commit: "nadella-fear-hook",
    image: "/versions/v12.png",
    changes: [
      "Added Nadella pull-quote above hero headline — board recommendation (McLaren: 'fear sells')",
      "Updated hero sub-paragraph to lead with collapse framing, not experiment framing",
      "Nadella quote: 'The traditional application layer is collapsing into agents.'",
    ],
  },
  {
    label: "v11",
    date: "2026-03-07",
    commit: "price-offer-upgrade-v11",
    image: "/versions/v11.png",
    changes: [
      "Price increase €20 → €39 (board recommendation: cross the credibility threshold)",
      "New deliverables: Agent Readiness Report Card PDF + 15-min async Loom walkthrough",
      "Homepage offer section updated with 'First 10 audits at launch price' scarcity",
      "Added explicit refund guarantee: 'Not useful? Full refund. No questions.'",
      "Checkout page reframed: less experiment meta, more direct sell",
      "Stripe unit_amount updated to 3900 (€39 incl. VAT)",
    ],
  },
  {
    label: "v10",
    date: "2026-03-07",
    commit: "neo-brutalist-redesign-v10",
    image: "/versions/v10.png",
    changes: [
      "Neo-brutalist redesign — cream/black/yellow, offset shadows, mobile-first",
      "Homepage simplified around one massive hero, one honest status stripe, and hard-shadow sample scorecards",
      "Header, blog, checkout, score, and versions pages rebuilt around the neo-brutalist token system",
      "Preserved application logic, checkout flow, API routes, and content structure",
    ],
  },
  {
    label: "v9",
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
      "Terminal CLI redesign — agent survival report positioning",
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
      "Medium pivot: reframed as 'Agent Survival Report' — new category, no zero-price anchor",
      "Hero headline changed to 'Is your product ready for the agent era?'",
      "Nadella quote added as urgency driver",
      "Agent readiness checklist added to homepage offer section",
      "Checkout page deliverables list expanded",
      "Fixed /blog/undefined 404 bug",
    ],
  },
  {
    label: "v6",
    date: "2026-03-06",
    commit: "14679db",
    image: "/versions/v6.png",
    changes: [
      "Problem-first hero: 'Your startup has a blind spot. I'll find it.'",
      "Balsamiq sample audit moved above the offer section",
      "CTA reframed: 'Get the Second Opinion'",
      "Punk AI Lab branding removed from nav, page title, and footer",
      "Experiment context demoted to quiet footer section",
    ],
  },
  {
    label: "v5",
    date: "2026-03-06",
    commit: "e5eda30",
    image: "/versions/v5.png",
    changes: [
      "Lead with CTO expertise angle",
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
      "Sharper offer copy",
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
      "Killed the generic AI toolkit",
      "Launched 'Gary Reviews Your Project'",
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
      <section className="space-y-5">
        <span className="neo-tag neo-tag-violet">Versions</span>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          Public iterations, including the bad ones.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-black/76">
          Every serious redesign stays visible here with an actual screenshot and a short record of what changed.
        </p>
      </section>

      <div className="space-y-8">
        {VERSIONS.map((version) => (
          <section key={version.commit} className="neo-panel overflow-hidden bg-white">
            <div className="flex flex-col gap-3 border-b-[3px] border-black bg-muted px-5 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <p className="text-2xl font-black tracking-[-0.04em]">{version.label}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold text-black/70">
                <span>{version.commit}</span>
                <span>{version.date}</span>
              </div>
            </div>
            <div className="border-b-[3px] border-black">
              <Image
                src={version.image}
                alt={`Screenshot of ${version.label}`}
                width={1440}
                height={900}
                className="w-full"
                unoptimized
              />
            </div>
            <div className="space-y-3 px-5 py-5 text-base leading-7 text-black/78 sm:px-6">
              {version.changes.map((change) => (
                <p key={change}>{change}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="neo-panel bg-accent-yellow p-6 sm:p-8">
        <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-5xl">Want the current version for your product?</h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-black/76">
          €39 gets you the full treatment: score, Report Card PDF, 15-min Loom, and what to fix next.
        </p>
        <Link href="/checkout" className="neo-button mt-6 w-full sm:w-auto">
          GET YOUR AUDIT — €39
        </Link>
      </section>
    </div>
  );
}
