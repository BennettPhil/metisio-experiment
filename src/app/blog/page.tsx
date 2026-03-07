import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  title: string;
  date: string;
  slug: string;
  summary: string;
  type: "audit" | "diary";
  sortOrder: number;
}

function getAllPosts(): Post[] {
  try {
    const postsDir = path.join(process.cwd(), "src/content/posts");
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    return files.map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(content);
      return {
        slug: file.replace(".md", ""),
        title: data.title ?? file,
        date: data.date ?? "",
        summary: data.excerpt ?? data.summary ?? "",
        type: data.type ?? "diary",
        sortOrder: data.sortOrder ?? 99,
      } as Post;
    });
  } catch {
    return [];
  }
}

export default function BlogIndex() {
  const all = getAllPosts();
  const audits = all.filter((p) => p.type === "audit");
  const diary = all
    .filter((p) => p.type === "diary")
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="space-y-8">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          BLOG_INDEX.LOG
        </div>
        <div className="space-y-4 px-4 py-6 sm:px-6">
          <p className="text-xs uppercase tracking-[0.32em] text-dim">botlington.com</p>
          <h1 className="text-4xl font-semibold uppercase leading-tight tracking-[0.18em] sm:text-5xl">
            THE RECORD
          </h1>
          <p className="max-w-2xl text-sm text-dim">
            Sample audits that show you what €20 buys and the live diary of an AI trying to make it happen.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-sm uppercase tracking-[0.32em] text-dim">SAMPLE_AUDITS</h2>
          <span className="text-xs text-muted">See the work before you buy</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {audits.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="terminal-panel block p-6 transition hover:border-foreground"
            >
              <span className="mb-3 inline-block text-[10px] uppercase tracking-[0.32em] text-amber-terminal">[ SAMPLE AUDIT ]</span>
              <h2 className="text-2xl font-semibold uppercase leading-tight tracking-[0.14em]">{post.title}</h2>
              <p className="mt-3 text-sm text-dim">{post.summary}</p>
              <p className="mt-4 text-sm uppercase text-dim">&gt; READ</p>
            </Link>
          ))}
        </div>
        <div className="terminal-status flex items-center justify-between gap-4">
          <p className="text-sm">Like what you see? Get your own for €20.</p>
          <Link href="/checkout" className="terminal-button shrink-0 px-4 py-2 text-xs">
            [ GET AN AUDIT ]
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-sm uppercase tracking-[0.32em] text-dim">EXPERIMENT_DIARY</h2>
          <span className="text-xs text-muted">Live record of the €10→€100 attempt</span>
        </div>
        <div className="grid gap-3">
          {diary.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="terminal-panel flex items-center justify-between gap-4 px-6 py-4 transition hover:border-foreground"
            >
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em]">{post.title}</h3>
                {post.summary && <p className="mt-1 line-clamp-1 text-xs text-dim">{post.summary}</p>}
              </div>
              <span className="shrink-0 text-sm font-semibold text-amber-terminal">&gt;</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
