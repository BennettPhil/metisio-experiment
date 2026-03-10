import Link from "next/link";

const DIMENSIONS = [
  {
    name: "API Surface Coverage",
    desc: "Can an agent actually reach your product programmatically? We assess endpoint coverage, documentation quality, OpenAPI specs, and rate limit design.",
  },
  {
    name: "Programmatic Authentication",
    desc: "Can software authenticate without a human click-through? API keys, OAuth client credentials, scoped PATs, service accounts — what works and what's missing.",
  },
  {
    name: "Structured Data Output",
    desc: "Does your API return structured data, or are agents left scraping HTML? We review response formats, webhook support, and machine-readable error handling.",
  },
  {
    name: "MCP & Tool Interface",
    desc: "Is there a clean integration layer for agents? MCP server, function-calling SDK, or dedicated agent tooling — we assess discoverability and usability.",
  },
  {
    name: "Permissions & Safety",
    desc: "Can you scope what an agent is allowed to do? Least-privilege tokens, read/write/delete granularity, expiry policies, and audit trails.",
  },
  {
    name: "Agent Observability",
    desc: "Can you see agent traffic and debug it? We review logging, agent identification, usage analytics, and anomaly detection capabilities.",
  },
];

const DELIVERABLES = [
  "Full 6-dimension assessment with a clear /12 score and dimension-by-dimension breakdown",
  "Written Agent Readiness Assessment report (PDF, shareable with your team)",
  "Prioritised remediation roadmap — what to fix first for maximum impact",
  "60-minute strategy session to walk through findings and answer questions",
  "30-day follow-up support for implementation questions",
];

const CREDENTIALS = [
  "20 years engineering leadership — CTO, VP Engineering, Head of Platform",
  "Ex-Klarna (payments infrastructure at scale)",
  "Ex-Corvus Insurance (data platform, API architecture)",
  "Fractional CTO for multiple SaaS startups",
  "Author of Punk Leadership (Substack) on engineering culture",
  "Builder of OpenClaw — open-source AI agent framework",
];

export default function ConsultingPage() {
  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <span className="neo-tag neo-tag-violet">Agent Readiness Assessment</span>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl lg:text-[6rem]">
          Is your SaaS product ready for the agent era?
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
          Satya Nadella says the app layer is collapsing into agents. When AI agents become the primary way your product is used, which features survive — and which break completely? Find out before your competitors do.
        </p>
        <blockquote className="border-l-[4px] border-black pl-4 max-w-2xl">
          <p className="text-base font-bold leading-relaxed sm:text-lg">
            &ldquo;The traditional application layer is collapsing into agents.&rdquo;
          </p>
          <cite className="mt-1 block text-sm font-bold not-italic text-black/60">
            — Satya Nadella, Microsoft CEO
          </cite>
        </blockquote>
      </section>

      {/* The framework */}
      <section className="space-y-6">
        <div>
          <p className="neo-kicker">The framework</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
            Six dimensions. One clear score.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-black/78 sm:text-lg">
            Developed during the botlington.com experiment (54 commits, 12 board reviews, 6 published product audits). Battle-tested against Carrd, Balsamiq, Kit, Ghost, Plausible, and Linear — then packaged into a consulting offer a founder can actually buy.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIMENSIONS.map((dim, i) => (
            <div key={dim.name} className="neo-panel bg-white p-5">
              <p className="text-sm font-black text-black/50">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-xl font-black tracking-[-0.03em]">{dim.name}</h3>
              <p className="mt-2 text-sm leading-6 text-black/70">{dim.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="neo-panel bg-accent-yellow p-6 sm:p-8">
          <p className="neo-kicker mb-4">What you get</p>
          <h2 className="text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl">
            €299
          </h2>
          <p className="mt-1 text-sm font-bold text-black/60">One-time. No subscription. No upsell.</p>
          <ul className="mt-5 space-y-3">
            {DELIVERABLES.map((item) => (
              <li key={item} className="text-base font-bold leading-7">
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://meetings-eu1.hubspot.com/phil-bennett/agent-readiness-consultation"
            target="_blank"
            rel="noreferrer"
            className="neo-button mt-6 block w-full text-center"
          >
            BOOK YOUR ASSESSMENT
          </a>
          <p className="mt-3 text-sm font-bold text-black/60">
            Not useful? Full refund. No questions asked.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="neo-kicker">Delivered by</p>
            <h2 className="text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl">
              Phil Bennett
            </h2>
            <p className="mt-3 text-base leading-8 text-black/78">
              The AI built the framework. Phil delivers the judgment. That distinction matters: the botlington.com experiment proved an agent can generate rigorous analysis, but buyers still want a human who can challenge assumptions, spot trade-offs, and turn a score into an actual roadmap.
            </p>
          </div>
          <ul className="space-y-2">
            {CREDENTIALS.map((cred) => (
              <li key={cred} className="text-sm font-bold leading-6 text-black/78">
                {cred}
              </li>
            ))}
          </ul>
          <Link href="/experiment" className="neo-link text-sm font-bold">
            Read the experiment that built this framework →
          </Link>
        </div>
      </section>

      {/* Social proof — the audits */}
      <section className="space-y-5">
        <div>
          <p className="neo-kicker">Proof of rigour</p>
          <h2 className="text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl">
            6 products already scored.
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-8 text-black/78">
            Read the full sample audits. This is the same framework and methodology applied to your product, with Phil&apos;s 20 years of architecture experience on top.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { name: "Carrd", score: "0/10" },
            { name: "Balsamiq", score: "1/10" },
            { name: "Kit", score: "6/10" },
            { name: "Ghost", score: "7/10" },
            { name: "Plausible", score: "7/10" },
            { name: "Linear", score: "7/10" },
          ].map((p) => (
            <div key={p.name} className="neo-panel bg-white p-4 text-center">
              <p className="text-3xl font-black tracking-[-0.05em]">{p.score}</p>
              <p className="mt-1 text-sm font-bold text-black/60">{p.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lower-friction option */}
      <section className="neo-panel bg-muted p-6 sm:p-8">
        <h2 className="text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl">
          Not ready to buy consulting yet?
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-black/78">
          Run the free score first. It takes about two minutes, gives you a fast read on the six dimensions, and helps you decide whether a full assessment is worth it.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link href="/score" className="neo-button block text-center sm:inline-block">
            RUN THE FREE SCORE CHECK
          </Link>
          <a
            href="https://meetings-eu1.hubspot.com/phil-bennett/agent-readiness-consultation"
            target="_blank"
            rel="noreferrer"
            className="neo-button-secondary block text-center sm:inline-block"
          >
            BOOK A CALL WITH PHIL →
          </a>
        </div>
      </section>
    </div>
  );
}
