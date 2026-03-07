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
    const filePath = path.join(postsDir, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, "utf8");
    const { data, content: body } = matter(content);
    return { frontmatter: data as { title: string; date: string; excerpt?: string }, body };
  } catch {
    return null;
  }
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="mt-8 mb-3 text-2xl font-semibold uppercase tracking-[0.14em] text-[#ffb000]">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="mt-6 mb-2 text-lg font-semibold uppercase tracking-[0.08em] text-[#ffb000]">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="terminal-link underline">$1</a>')
    .replace(/^(?:\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal text-[#33ff00]">$1</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-4 list-disc text-[#33ff00]">$1</li>')
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (m) => `<ul class="my-3 space-y-1">${m}</ul>`)
    .replace(/^(?!<[hulo])(.+)$/gm, '<p class="my-3 leading-relaxed text-[#33ff00]">$1</p>')
    .replace(/<p[^>]*>\s*<\/p>/g, "")
    .replace(/^---$/gm, '<hr class="my-6 border-[#1f521f]" />');
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter, body } = post;

  return (
    <div className="grid gap-6">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          POST_HEADER
        </div>
        <div className="px-4 py-6 sm:px-6">
          <Link href="/blog" className="terminal-link text-sm uppercase">
            &lt; ./blog
          </Link>
          <p className="mt-4 text-sm uppercase tracking-[0.24em] text-dim">{frontmatter.date}</p>
          <h1 className="mt-2 text-4xl font-semibold uppercase leading-tight tracking-[0.14em] sm:text-5xl">
            {frontmatter.title}
          </h1>
          {frontmatter.excerpt && (
            <p className="mt-3 max-w-3xl text-sm text-dim">{frontmatter.excerpt}</p>
          )}
        </div>
      </div>

      <article
        className="terminal-panel terminal-prose p-8 text-base"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
      />

      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          CALL_TO_ACTION
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="font-semibold uppercase tracking-[0.08em]">Want Gary to review your project?</p>
          <p className="mt-1 text-sm text-dim">
            €20 · Personalized audit · Delivered to your inbox within 48h
          </p>
          <Link href="/checkout" className="terminal-button mt-4 px-4 py-2">
            [ GET YOUR AUDIT - €20 ]
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const postsDir = path.join(process.cwd(), "src/content/posts");
    return fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({ slug: f.replace(".md", "") }));
  } catch {
    return [];
  }
}
