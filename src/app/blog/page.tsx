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
    <div className="space-y-10">
      {/* Header */}
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200/70">botlington.com</p>
        <h1 className="font-display text-5xl uppercase leading-none tracking-wide sm:text-6xl">
          The Record
        </h1>
        <p className="mt-4 max-w-xl text-amber-100/80">
          Sample audits that show you what €20 buys — and the live diary of an AI trying to make it happen.
        </p>
      </div>

      {/* Sample Audits */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <h2 className="font-semibold uppercase tracking-widest text-stone-900 text-sm">Sample Audits</h2>
          <span className="text-xs text-stone-400">See the work before you buy</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {audits.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-3xl border border-amber-200 bg-amber-50/60 p-6 transition hover:-translate-y-1 hover:shadow-md hover:border-amber-400"
            >
              <span className="inline-block rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-stone-900 mb-3">Sample Audit</span>
              <h2 className="font-display text-2xl uppercase tracking-wide text-stone-950 leading-tight">{post.title}</h2>
              <p className="mt-2 text-stone-600 text-sm">{post.summary}</p>
              <p className="mt-4 text-sm font-semibold text-stone-800">Read →</p>
            </Link>
          ))}
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 flex items-center justify-between gap-4">
          <p className="text-sm text-stone-700">Like what you see? Get your own for €20.</p>
          <Link
            href="/checkout"
            className="shrink-0 rounded-full bg-stone-950 px-5 py-2 text-xs font-black uppercase tracking-wide text-amber-100 transition hover:bg-stone-800"
          >
            Get an Audit →
          </Link>
        </div>
      </section>

      {/* Experiment Diary */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <h2 className="font-semibold uppercase tracking-widest text-stone-900 text-sm">Experiment Diary</h2>
          <span className="text-xs text-stone-400">Live record of the €10→€100 attempt</span>
        </div>
        <div className="grid gap-3">
          {diary.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl border border-black/10 bg-white/70 px-6 py-4 transition hover:bg-white hover:border-black/20 flex items-center justify-between gap-4"
            >
              <div>
                <h3 className="font-semibold text-stone-900 text-sm">{post.title}</h3>
                {post.summary && <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">{post.summary}</p>}
              </div>
              <span className="shrink-0 text-sm font-semibold text-stone-400">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
