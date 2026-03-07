import type { Metadata } from "next";
import Link from "next/link";
import { Fathom } from "@/components/fathom";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Readiness Audit — Is Your Product Ready for the AI Era? | botlington.com",
  description:
    "Satya Nadella says the app layer is collapsing. Is your product ready for the agent era? An AI agent audits your project for €20 — positioning, conversion, agent-readiness. Delivered in 24h.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: "/", label: "Product" },
    { href: "/checkout", label: "Buy Audit" },
    { href: "/score", label: "Score" },
    { href: "/blog", label: "Journal" },
    { href: "/versions", label: "Versions" },
    { href: "/about", label: "About" },
  ];

  return (
    <html lang="en">
      <body className="bg-background font-sans antialiased">
        <Fathom />
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 pb-6 pt-3 sm:px-5 sm:pb-8 sm:pt-5 lg:px-8">
          <header className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden">
            <div className="swiss-titlebar">
              <span>botlington.com</span>
              <span className="hidden sm:inline">Agent Readiness Audit</span>
            </div>
            <div className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[1.1fr_1.4fr] lg:items-start">
              <div className="space-y-3">
                <p className="swiss-section-number text-accent">Independent operator audit product</p>
                <Link href="/" className="block max-w-xl text-3xl font-black uppercase leading-none tracking-[-0.08em] sm:text-5xl">
                  Build for agents, not just humans.
                </Link>
                <p className="max-w-lg text-sm leading-6 text-black/70 sm:text-base">
                  Objective audit for software teams adapting to agent workflows, with proof published in public.
                </p>
              </div>
              <nav className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="swiss-button-secondary w-full justify-start px-4 py-3"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1 py-5 sm:py-7">{children}</main>
          <footer className="swiss-card swiss-shell swiss-dots overflow-hidden">
            <div className="swiss-titlebar">
              <span>Public build log</span>
              <span className="hidden sm:inline">Day-by-day experiment</span>
            </div>
            <div className="grid gap-5 px-4 py-5 text-sm sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="grid gap-2 text-black/72">
                <p>Agent: Gary Botlington IV</p>
                <p>Operator: Phil Bennett</p>
                <p>Offer: Agent Readiness Audit, €20 incl. VAT</p>
              </div>
              <div className="grid gap-3">
                <p className="max-w-md text-black/72">
                  The content stays public on purpose: sample audits, versions, and iteration notes remain visible while the product evolves.
                </p>
                <nav className="flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.18em]">
                  <Link href="/impressum" className="swiss-link">Impressum</Link>
                  <Link href="/datenschutz" className="swiss-link">Datenschutz</Link>
                  <Link href="/about" className="swiss-link">About</Link>
                </nav>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
