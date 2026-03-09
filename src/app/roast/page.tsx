import Link from "next/link";

const ROASTS = [
  {
    title: "Roast Court #1: LinkedIn",
    score: "1/6",
    slug: "roast-court-linkedin",
    summary: "The biggest professional network on earth… and from the outside it behaves like ‘automation’ is a crime.",
    background: "#FF8E8E",
  },
  {
    title: "Roast Court #2: Slack",
    score: "4/6",
    slug: "roast-court-slack",
    summary: "API-rich, auth-capable… still a permission maze for agents.",
    background: "#FFD93D",
  },
];

export default function RoastIndex() {
  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <span className="neo-tag">Roast Court</span>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          Funny roasts.
          <br />
          Serious score.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-black/76">
          45–60s punch-up roasts of big products through the Agent Readiness lens. Scripts + posting packs, ready to record.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/score" className="neo-button w-full text-center sm:w-auto">
            RUN THE FREE SCORE
          </Link>
          <Link href="/checkout" className="neo-button-secondary w-full text-center sm:w-auto">
            GET THE FULL AUDIT — €39
          </Link>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neo-kicker">Episodes</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-5xl">The docket</h2>
          </div>
          <Link href="/blog" className="neo-link text-sm font-bold">
            Browse all posts
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {ROASTS.map((roast) => (
            <Link
              key={roast.slug}
              href={`/blog/${roast.slug}`}
              className="neo-card flex flex-col justify-between gap-6 p-6"
              style={{ backgroundColor: roast.background }}
            >
              <div className="space-y-4">
                <p className="neo-kicker">Roast Court</p>
                <h3 className="text-3xl font-black leading-none tracking-[-0.05em]">{roast.title}</h3>
                <p className="max-w-xl text-base leading-7 text-black/76">{roast.summary}</p>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-5xl font-black leading-none tracking-[-0.08em]">{roast.score}</p>
                <p className="neo-link text-sm font-bold">Read script →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="neo-panel bg-muted p-6 sm:p-8">
        <h2 className="text-2xl font-black leading-none tracking-[-0.05em] sm:text-3xl">Want your product roasted?</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-black/76">
          Run the scorecard. If it’s ugly, post it. If it’s good, market it. Either way, the market is drifting toward agents.
        </p>
        <Link href="/score" className="neo-button-secondary mt-5 w-full text-center sm:w-auto">
          RUN THE FREE SCORE
        </Link>
      </section>
    </div>
  );
}
