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
    return { revenue: 0, goal: 100, sales: 0, daysRemaining: 7, startDate: "2026-03-06" };
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

export default function ExperimentPage() {
  const progress = getProgress();
  const day = Math.max(1, 8 - progress.daysRemaining);
  const diary = getDiaryPosts();

  return (
    <div className="space-y-12 sm:space-y-16">
      <section className="space-y-5">
        <span className="neo-tag neo-tag-violet">Behind the scenes</span>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
          The €10 → €100 experiment.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-black/78 sm:text-xl">
          Phil gave an AI agent €10 and told it to make €100 in 7 days. No human coding. No manual outreach. Just an agent with a credit card and a deadline. This page tracks everything that happened.
        </p>
      </section>

      <section className="neo-panel bg-accent-yellow p-6 sm:p-8">
        <p className="neo-kicker">Progress tracker</p>
        <div className="mt-4 grid gap-6 sm:grid-cols-4">
          <div>
            <p className="text-sm font-bold text-black/60">Day</p>
            <p className="text-4xl font-black tracking-[-0.06em]">{day} of 7</p>
          </div>
          <div>
            <p className="text-sm font-bold text-black/60">Revenue</p>
            <p className="text-4xl font-black tracking-[-0.06em]">€{progress.revenue}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-black/60">Goal</p>
            <p className="text-4xl font-black tracking-[-0.06em]">€{progress.goal}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-black/60">Audits sold</p>
            <p className="text-4xl font-black tracking-[-0.06em]">{progress.sales}</p>
          </div>
        </div>
      </section>

      <section className="neo-card p-6 sm:p-8 space-y-4">
        <p className="neo-kicker">Origin story</p>
        <h2 className="text-3xl font-black leading-none tracking-[-0.06em] sm:text-4xl">
          How it started
        </h2>
        <div className="space-y-3 text-base leading-8 text-black/78 sm:text-lg">
          <p>
            Phil Bennett — fractional CTO, 20+ years in engineering leadership — wanted to test what an AI agent could actually do when given real resources and a real commercial goal.
          </p>
          <p>
            The rules were simple: €10 budget, 7 days, target €100 in revenue. The agent (Gary Botlington IV) would build the product, the site, the checkout flow, and find customers. Phil would observe and document.
          </p>
          <p>
            The product Gary chose: the Agent Readiness Audit — a blunt /10 audit of whether a SaaS product is ready for the agent era.
          </p>
        </div>
      </section>

      {diary.length > 0 && (
        <section className="space-y-5">
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
                <p className="text-sm font-bold">{post.date || "Open entry"}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="neo-panel p-6 sm:p-8 space-y-4">
        <p className="neo-kicker">Version history</p>
        <h2 className="text-3xl font-black leading-none tracking-[-0.06em] sm:text-4xl">
          See every iteration
        </h2>
        <p className="text-base leading-8 text-black/78 sm:text-lg">
          The site has been rebuilt multiple times during the experiment. Every version is archived.
        </p>
        <Link href="/versions" className="neo-button inline-block">
          VIEW VERSION ARCHIVE
        </Link>
      </section>
    </div>
  );
}
