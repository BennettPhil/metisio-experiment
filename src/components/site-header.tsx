"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Product" },
  { href: "/checkout", label: "Buy Audit" },
  { href: "/score", label: "Score" },
  { href: "/blog", label: "Journal" },
  { href: "/versions", label: "Versions" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="swiss-card swiss-shell overflow-hidden">
      {/* Top bar — always visible, compact */}
      <div className="flex items-center justify-between border-b-2 border-black px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-sm font-black uppercase tracking-[0.2em] hover:text-accent transition-colors duration-150"
        >
          botlington.com
        </Link>
        <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-black/50 sm:inline">
          Agent Readiness Audit
        </span>
      </div>

      {/* Nav — horizontal scrollable strip on mobile, grid on desktop */}
      <nav className="flex overflow-x-auto border-b-2 border-black sm:grid sm:grid-cols-3 lg:grid-cols-6">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "flex-shrink-0 border-r-2 border-black px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-150 last:border-r-0",
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-accent hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Marketing tagline — only show on homepage, hidden on inner pages */}
      {pathname === "/" && (
        <div className="swiss-grid-pattern grid gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Independent operator audit product
            </p>
            <p className="max-w-xl text-2xl font-black uppercase leading-tight tracking-[-0.06em] sm:text-4xl">
              Build for agents,<br className="sm:hidden" /> not just humans.
            </p>
          </div>
          <p className="max-w-lg text-sm leading-6 text-black/70">
            Objective audit for software teams adapting to agent workflows, with proof published in public.
          </p>
        </div>
      )}
    </header>
  );
}
