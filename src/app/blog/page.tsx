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
    <div className="space-y-6">
      <div className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden">
        <div className="swiss-titlebar">
          <span>Journal</span>
          <span>The record</span>
        </div>
        <div className="space-y-4 px-4 py-6 sm:px-6 sm:py-7">
          <p className="swiss-section-number text-accent">Sample audits + experiment diary</p>
          <h1 className="max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-6xl">
            The work, the diary, the proof.
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-black/72 sm:text-base">
            Sample audits show what €20 buys. The diary keeps the experiment visible while the product iterates in public.
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="swiss-section-number text-accent">01 Audits</p>
            <h2 className="text-3xl font-black uppercase tracking-[-0.06em]">Sample audits</h2>
          </div>
          <p className="text-sm text-black/56">See the work before you buy</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {audits.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="swiss-card swiss-shell block p-5 transition-colors hover:bg-muted sm:p-6"
            >
              <span className="swiss-label text-accent">Sample audit</span>
              <h2 className="mt-4 text-2xl font-black uppercase leading-none tracking-[-0.05em] sm:text-3xl">{post.title}</h2>
              <p className="mt-3 text-sm leading-7 text-black/72">{post.summary}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em]">Read audit</p>
            </Link>
          ))}
        </div>
        <div className="swiss-status flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6">Like what you see? Get your own agent readiness audit for €20.</p>
          <Link href="/checkout" className="swiss-button-primary w-full sm:w-auto">
            Get an audit
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="swiss-section-number text-accent">02 Diary</p>
            <h2 className="text-3xl font-black uppercase tracking-[-0.06em]">Experiment journal</h2>
          </div>
          <p className="text-sm text-black/56">Live record of the €10 to €100 attempt</p>
        </div>
        <div className="grid gap-3">
          {diary.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="swiss-card flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div>
                <h3 className="text-base font-bold uppercase tracking-[0.06em]">{post.title}</h3>
                {post.summary && <p className="mt-1 text-sm leading-6 text-black/64">{post.summary}</p>}
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Open</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
