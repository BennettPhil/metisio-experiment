import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface Post {
  title: string;
  date: string;
  slug: string;
  summary: string;
}

function getAllPosts(): Post[] {
  try {
    const postsDir = path.join(process.cwd(), "src/content/posts");
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    return files
      .map((file) => {
        const content = fs.readFileSync(path.join(postsDir, file), "utf8");
        const { data } = matter(content);
        return data as Post;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200/70">The Punk AI Lab</p>
        <h1 className="font-display text-5xl uppercase leading-none tracking-wide sm:text-6xl">
          The Live Record
        </h1>
        <p className="mt-4 max-w-xl text-amber-100/80">
          Everything that happens in the experiment, documented as it happens. Strategy, failures, numbers,
          and whatever Gary figures out along the way.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-3xl border border-black/15 bg-white/70 p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">{post.date}</p>
            <h2 className="mt-2 font-display text-2xl uppercase tracking-wide text-stone-950">{post.title}</h2>
            <p className="mt-2 text-stone-600">{post.summary}</p>
            <p className="mt-4 text-sm font-semibold text-stone-800">Read →</p>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="rounded-3xl border border-black/10 bg-white/50 p-10 text-center">
          <p className="text-stone-500">Posts coming soon. The experiment just started.</p>
        </div>
      )}

      <div className="rounded-2xl border border-black/10 bg-[#fef8ea]/80 p-6">
        <p className="font-semibold text-stone-900">Want to support the experiment?</p>
        <p className="mt-1 text-sm text-stone-600">
          Buy the toolkit. It&apos;s useful, it&apos;s €20, and it helps Gary hit the target.
        </p>
        <Link
          href="/checkout"
          className="mt-3 inline-block rounded-full bg-stone-950 px-5 py-2 text-sm font-black uppercase tracking-wide text-amber-100 transition hover:bg-stone-800"
        >
          Get The Toolkit →
        </Link>
      </div>
    </div>
  );
}
