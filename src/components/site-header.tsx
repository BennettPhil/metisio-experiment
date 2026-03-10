"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Product" },
  { href: "/checkout", label: "Get Audited" },
  { href: "/consulting", label: "Consulting" },
  { href: "/score", label: "Free Score" },
  { href: "/blog", label: "Journal" },
];

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="border-b-[3px] border-black pb-4">
        <div className="flex items-center justify-between gap-4 py-2">
          <Link href="/" className="text-xl font-black tracking-[-0.05em] sm:text-2xl">
            botlington.com
          </Link>

          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] sm:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`block h-[3px] w-7 bg-black transition-all ${open ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`block h-[3px] w-7 bg-black transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[3px] w-7 bg-black transition-all ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>

          <nav className="hidden items-center gap-5 text-sm font-bold sm:flex">
            {links.map((link) => {
              const active = isActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "bg-accent-yellow px-3 py-1" : "underline-offset-4 hover:underline"}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {pathname === "/" && (
          <div className="pt-4">
            <p className="max-w-2xl text-sm leading-6 text-black/70 sm:text-base">
              Honest audits for products that want to survive the shift from human workflows to agent workflows.
            </p>
          </div>
        )}
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-background sm:hidden">
          <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4">
            <div className="flex items-center justify-between border-b-[3px] border-black pb-4">
              <Link href="/" className="text-xl font-black tracking-[-0.05em]">
                botlington.com
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
                aria-label="Close menu"
              >
                <span className="block h-[3px] w-7 translate-y-[8px] rotate-45 bg-black" />
                <span className="block h-[3px] w-7 opacity-0 bg-black" />
                <span className="block h-[3px] w-7 -translate-y-[8px] -rotate-45 bg-black" />
              </button>
            </div>

            <nav className="mt-8 grid gap-4">
              {links.map((link) => {
                const active = isActive(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`border-[3px] border-black px-5 py-4 text-2xl font-black tracking-[-0.04em] shadow-[6px_6px_0_#000] ${active ? "bg-accent-yellow" : "bg-white"}`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-8 text-sm font-bold text-black/70">
              Agent Survival Report — botlington.com
            </div>
          </div>
        </div>
      )}
    </>
  );
}
