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
    const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));
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
  const audits = all.filter((post) => post.type === "audit");

  return (
    <div className="space-y-12">
      <section className="space-y-5">
        <span className="neo-tag">Published audits</span>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          Real products, scored honestly.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-black/76">
          Sample audits showing exactly what an Agent Readiness Audit looks like. Read before buying.
        </p>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="neo-kicker">Sample audits</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-5xl">Read before buying.</h2>
          </div>
          <Link href="/checkout" className="neo-link text-sm font-bold">
            Get your own audit
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {audits.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`neo-card p-5 sm:p-6 ${index === 0 ? "bg-accent-yellow" : "bg-white"}`}
            >
              <p className="neo-kicker mb-4">Sample audit</p>
              <h3 className="text-3xl font-black leading-none tracking-[-0.05em]">{post.title}</h3>
              <p className="mt-4 text-base leading-7 text-black/76">{post.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
