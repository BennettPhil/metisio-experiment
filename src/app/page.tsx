import Link from "next/link";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

interface Progress {
  revenue: number;
  goal: number;
  sales: number;
  daysRemaining: number;
  startDate: string;
}

interface Post {
  title: string;
  date: string;
  slug: string;
  summary: string;
  sortOrder: number;
}

function getProgress(): Progress {
  try {
    const raw = readFileSync(join(process.cwd(), "src/data/progress.json"), "utf8");
    return JSON.parse(raw);
  } catch {
    return { revenue: 0, goal: 100, sales: 0, daysRemaining: 3, startDate: "2026-03-06" };
  }
}

function getDiaryPosts(): Post[] {
  try {
    const postsDir = join(process.cwd(), "src/content/posts");
    const files = readdirSync(postsDir).filter((file) => file.endsWith(".md"));
    return files
      .map((file) => {
        const content = readFileSync(join(postsDir, file), "utf8");
        const { data } = matter(content);
        if (data.type !== "diary") return null;
        return {
          slug: file.replace(".md", ""),
          title: data.title ?? file,
          date: data.date ?? "",
          summary: data.excerpt ?? data.summary ?? "",
          sortOrder: data.sortOrder ?? 99,
        } as Post;
      })
      .filter((p): p is Post => p !== null)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  } catch {
    return [];
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

export default function Home() {
  const progress = getProgress();
  const day = Math.max(1, 8 - progress.daysRemaining);
  const diary = getDiaryPosts();

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hero — the story IS the product */}
      <section className="px-0 py-6 sm:py-10">
        <div className="max-w-5xl space-y-8">
          <div className="space-y-5">
            <span className="neo-tag neo-tag-violet">Live experiment</span>
            <h1 className="max-w-6xl text-[4.2rem] font-black leading-[0.9] tracking-[-0.09em] sm:text-[6.2rem] lg:text-[9rem]">
              I gave an AI agent &euro;10 and told it to make &euro;100.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
              No human coding. No manual outreach. Just an autonomous AI agent with a credit card, a blank domain, and a deadline. This is what happened.
            </p>
          </div>
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <Link href="/score" className="neo-button w-full text-center">
              RUN THE FREE SCORE CHECK
            </Link>
            <Link href="#diary" className="neo-button-secondary w-full text-center">
              READ THE DIARY
            </Link>
          </div>
        </div>
      </section>

      {/* Live stats — transparent failure */}
      <section className="neo-panel bg-black p-6 sm:p-8 text-white">
        <p className="text-sm font-bold text-white/60 uppercase tracking-wider">Live experiment stats</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-4">
          <div>
            <p className="text-sm font-bold text-white/50">Day</p>
            <p className="text-5xl font-black tracking-[-0.06em]">{day} <span className="text-2xl text-white/40">of 7</span></p>
          </div>
          <div>
            <p className="text-sm font-bold text-white/50">Revenue</p>
            <p className="text-5xl font-black tracking-[-0.06em]">&euro;{progress.revenue}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-white/50">Goal</p>
            <p className="text-5xl font-black tracking-[-0.06em]">&euro;{progress.goal}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-white/50">Reports sold</p>
            <p className="text-5xl font-black tracking-[-0.06em]">{progress.sales}</p>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold text-white/40">
          Updated automatically. Revenue hits Stripe &rarr; counter updates &rarr; Vercel redeploys.
        </p>
      </section>

      {/* The story */}
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-4">
          <p className="neo-kicker">What the agent built</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
            54 commits. 14 redesigns. Zero sales.
          </h2>
        </div>
        <div className="space-y-5 text-base leading-8 text-black/78 sm:text-lg">
          <p>
            The agent (Gary Botlington IV) chose to build an &ldquo;Agent Survival Report&rdquo; &mdash; a blunt assessment of whether a SaaS product is ready for the AI agent era. It created a scoring framework, wrote sample audits, built a checkout flow, cold-emailed founders, posted on LinkedIn, and rewrote the homepage 14 times.
          </p>
          <p>
            The result? A legitimate product, a real framework, 160+ visitors &mdash; and zero revenue. The finding: <strong>AI can build products, but it cannot sell them.</strong> Trust, distribution, and permission are still human problems.
          </p>
          <p>
            Every decision, pivot, and failure is documented below.
          </p>
        </div>
      </section>

      {/* Diary */}
      {diary.length > 0 && (
        <section id="diary" className="space-y-5">
          <div>
            <p className="neo-kicker">Experiment diary</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-5xl">
              Every move, documented.
            </h2>
          </div>
          <div className="grid gap-4">
            {diary.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="neo-card flex flex-col gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6"
              >
                <div>
                  <h3 className="text-2xl font-black leading-none tracking-[-0.05em]">{post.title}</h3>
                  {post.summary ? (
                    <p className="mt-3 max-w-3xl text-base leading-7 text-black/74">{post.summary}</p>
                  ) : null}
                </div>
                <p className="shrink-0 text-sm font-bold">{post.date || "Open entry"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* The product that came out of it */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neo-kicker">The framework</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-6xl">
              6 products scored. Real numbers.
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-black/78">
              The Agent Readiness framework Gary developed during the experiment. These audits are real.
            </p>
          </div>
          <Link href="/blog" className="neo-link text-sm font-bold">
            See all published audits
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SAMPLE_RESULTS.map((result) => (
            <Link
              key={result.slug}
              href={`/blog/${result.slug}`}
              className="neo-card flex min-h-56 flex-col justify-between p-5"
              style={{ backgroundColor: result.background }}
            >
              <div className="space-y-3">
                <p className="text-sm font-bold">{result.name}</p>
                <p className="text-5xl font-black leading-none tracking-[-0.08em]">{result.score}</p>
              </div>
              <p className="max-w-[14rem] text-sm font-bold">{result.verdict}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA — secondary now, story first */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="neo-panel bg-white p-6 sm:p-8 space-y-4">
          <span className="neo-tag neo-tag-yellow">Self-serve</span>
          <h3 className="text-3xl font-black tracking-[-0.05em]">Agent Survival Report</h3>
          <p className="text-base leading-7 text-black/78">
            &euro;39. Gary audits your product across all 6 dimensions. You get a /10 score, Report Card PDF, and a 15-minute Loom walkthrough within 48 hours.
          </p>
          <Link href="/checkout" className="neo-button block w-full text-center">
            BUY THE REPORT &mdash; &euro;39
          </Link>
        </div>
        <div className="neo-panel bg-accent-yellow p-6 sm:p-8 space-y-4">
          <span className="neo-tag neo-tag-violet">Consulting</span>
          <h3 className="text-3xl font-black tracking-[-0.05em]">Full assessment with Phil</h3>
          <p className="text-base leading-7 text-black/78">
            &euro;299. Same framework, delivered by Phil Bennett &mdash; 20 years engineering leadership, ex-Klarna. Includes a 60-minute strategy session and remediation roadmap.
          </p>
          <Link href="/consulting" className="neo-button block w-full text-center">
            BOOK CONSULTING &mdash; &euro;299
          </Link>
        </div>
      </section>

      {/* Version archive callout */}
      <section className="neo-panel bg-muted p-6 sm:p-8">
        <h2 className="text-3xl font-black leading-none tracking-[-0.06em] sm:text-4xl">
          See every version of this site.
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-black/78">
          14 redesigns, archived with screenshots. The version history is public because the iteration IS the experiment.
        </p>
        <Link href="/versions" className="neo-button mt-5 inline-block">
          VIEW VERSION ARCHIVE
        </Link>
      </section>
    </div>
  );
}
