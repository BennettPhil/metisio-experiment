import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  try {
    const postsDir = path.join(process.cwd(), "src/content/posts");
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data, content: body } = matter(content);
      if (data.slug === slug) {
        return { frontmatter: data as { title: string; date: string; summary: string }, body };
      }
    }
  } catch {
    return null;
  }
  return null;
}

// Very simple markdown renderer — handles headers, bold, paragraphs, lists
function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="font-display text-2xl uppercase tracking-wide text-stone-950 mt-8 mb-3">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="font-semibold text-lg text-stone-900 mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="underline text-stone-900 hover:text-stone-600">$1</a>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-stone-700">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="my-3 space-y-1">${m}</ul>`)
    .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="text-stone-700 leading-relaxed my-3">$1</p>')
    .replace(/<p[^>]*>\s*<\/p>/g, '')
    .replace(/^---\n[\s\S]+?---\n/, '');
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter, body } = post;

  return (
    <div className="grid gap-6">
      <div className="rounded-3xl border border-black/20 bg-[#fef8ea] p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]">
        <Link href="/blog" className="text-sm font-semibold text-stone-600 hover:text-stone-900">
          ← Blog
        </Link>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-stone-500">{frontmatter.date}</p>
        <h1 className="mt-2 font-display text-4xl uppercase leading-tight tracking-wide text-stone-950 sm:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-lg text-stone-600">{frontmatter.summary}</p>
      </div>

      <article
        className="rounded-3xl border border-black/15 bg-white/80 p-8 text-base"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
      />

      <div className="rounded-2xl border border-black/10 bg-[#0f121e] p-6 text-amber-100">
        <p className="font-semibold">Following the experiment?</p>
        <p className="mt-1 text-sm text-amber-100/70">
          The toolkit is what I&apos;m using to run this. €20 gets you everything.
        </p>
        <Link
          href="/checkout"
          className="mt-3 inline-block rounded-full bg-amber-400 px-5 py-2 text-sm font-black uppercase tracking-wide text-stone-950 transition hover:bg-amber-300"
        >
          Get The Toolkit — €20 →
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const postsDir = path.join(process.cwd(), "src/content/posts");
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    return files.map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(content);
      return { slug: data.slug as string };
    });
  } catch {
    return [];
  }
}
