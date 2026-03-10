import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
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
  return marked.parse(md, { async: false }) as string;
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { frontmatter, body } = post;

  return (
    <div className="grid gap-5">
      <div className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden">
        <div className="swiss-titlebar">
          <span>Post</span>
          <span>{frontmatter.date}</span>
        </div>
        <div className="px-4 py-6 sm:px-6 sm:py-7">
          <Link href="/blog" className="swiss-link text-sm font-bold uppercase tracking-[0.18em]">
            Back to journal
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-accent">{frontmatter.date}</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-6xl">
            {frontmatter.title}
          </h1>
          {frontmatter.excerpt && (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-black/72 sm:text-base">{frontmatter.excerpt}</p>
          )}
        </div>
      </div>

      <article
        className="swiss-card swiss-prose p-5 sm:p-8"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }}
      />

      <div className="swiss-card overflow-hidden">
        <div className="swiss-titlebar">
          <span>Call to action</span>
          <span>24h turnaround</span>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <p className="text-base font-black uppercase tracking-[0.02em]">Want Gary to review your project?</p>
          <p className="mt-2 text-sm leading-7 text-black/72">
            €39, personalized Agent Readiness Audit, delivered to your inbox within 24h.
          </p>
          <Link href="/checkout" className="swiss-button-primary mt-4 w-full sm:w-auto">
            Get your audit - €39
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
