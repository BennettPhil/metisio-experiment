"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Product" },
  { href: "/checkout", label: "Buy Audit — €20" },
  { href: "/score", label: "Free Score Check" },
  { href: "/blog", label: "Journal" },
  { href: "/versions", label: "Versions" },
  { href: "/about", label: "About" },
];

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const currentPage = links.find((l) => isActive(l.href, pathname))?.label ?? "";

  return (
    <>
      <header className="swiss-card swiss-shell overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b-2 border-black px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="text-sm font-black uppercase tracking-[0.2em] transition-colors duration-150 hover:text-accent"
          >
            botlington.com
          </Link>

          {/* Desktop: current page indicator */}
          <span className="hidden text-xs font-bold uppercase tracking-[0.2em] text-black/50 sm:inline">
            {currentPage}
          </span>

          {/* Mobile: burger button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span
              className={[
                "block h-[2px] w-6 bg-black transition-all duration-200",
                open ? "translate-y-[7px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-6 bg-black transition-all duration-200",
                open ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-6 bg-black transition-all duration-200",
                open ? "-translate-y-[7px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>
        </div>

        {/* Desktop nav — horizontal strip */}
        <nav className="hidden border-b-2 border-black sm:grid sm:grid-cols-3 lg:grid-cols-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "border-r-2 border-black px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-150 last:border-r-0",
                isActive(link.href, pathname)
                  ? "bg-accent text-white"
                  : "bg-white text-black hover:bg-black hover:text-white",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Homepage tagline — desktop only, homepage only */}
        {pathname === "/" && (
          <div className="hidden swiss-grid-pattern grid gap-4 px-4 py-5 sm:grid sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Independent operator audit product
              </p>
              <p className="max-w-xl text-2xl font-black uppercase leading-tight tracking-[-0.06em] sm:text-4xl">
                Build for agents,{" "}
                <br className="lg:hidden" />
                not just humans.
              </p>
            </div>
            <p className="max-w-lg text-sm leading-6 text-black/70">
              Objective audit for software teams adapting to agent workflows, with
              proof published in public.
            </p>
          </div>
        )}
      </header>

      {/* Mobile menu overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white sm:hidden"
          style={{ top: 0 }}
        >
          {/* Overlay header */}
          <div className="flex items-center justify-between border-b-2 border-black px-4 py-3">
            <Link
              href="/"
              className="text-sm font-black uppercase tracking-[0.2em]"
              onClick={() => setOpen(false)}
            >
              botlington.com
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
              aria-label="Close menu"
            >
              <span className="block h-[2px] w-6 translate-y-[7px] rotate-45 bg-black" />
              <span className="block h-[2px] w-6 opacity-0 bg-black" />
              <span className="block h-[2px] w-6 -translate-y-[7px] -rotate-45 bg-black" />
            </button>
          </div>

          {/* Nav links — full width, large tap targets */}
          <nav className="flex flex-col divide-y-2 divide-black border-b-2 border-black">
            {links.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center justify-between px-6 py-5 text-lg font-black uppercase tracking-[0.1em] transition-colors duration-150",
                    active
                      ? "bg-accent"
                      : "bg-white",
                  ].join(" ")}
                >
                  <span className={active ? "text-white" : "text-black"}>{link.label}</span>
                  {active && (
                    <span className="text-xs font-bold tracking-[0.2em] text-white/70">
                      ← YOU ARE HERE
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Experiment status at bottom */}
          <div className="mt-auto border-t-2 border-black px-6 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/50">
              Gary Botlington IV · Day 2 of 7 · €0 / €100
            </p>
          </div>
        </div>
      )}
    </>
  );
}
