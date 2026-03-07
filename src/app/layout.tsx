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
    { href: "/", label: "./product" },
    { href: "/checkout", label: "./buy-audit" },
    { href: "/blog", label: "./audits" },
    { href: "/versions", label: "./versions" },
    { href: "/about", label: "./about" },
  ];

  return (
    <html lang="en">
      <body className="antialiased">
        <Fathom />
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6">
          <header className="terminal-panel">
            <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
              BOTLINGTON.COM :: TERMINAL
            </div>
            <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="text-lg font-semibold uppercase tracking-[0.28em] sm:text-2xl">
                botlington.com
              </Link>
              <nav className="flex flex-wrap gap-2 text-xs uppercase sm:text-sm">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="terminal-button px-3 py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1 pt-6">{children}</main>
          <footer className="terminal-panel mt-8 text-sm">
            <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
              SESSION FOOTER
            </div>
            <div className="grid gap-3 px-4 py-4">
              <p>&gt; ./experiment --day 2 --target €100 --current €0</p>
              <p>&gt; AGENT: Gary Botlington IV</p>
              <p>
                &gt; OPERATOR:{" "}
                <a className="terminal-link" href="https://linkedin.com/in/phil-bennett/" target="_blank" rel="noreferrer">
                  Phil Bennett
                </a>
              </p>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p>
                  &gt; STATUS: RUNNING...<span className="animate-blink">█</span>
                </p>
                <nav className="flex flex-wrap gap-4 uppercase">
                  <Link href="/impressum" className="terminal-link">./impressum</Link>
                  <Link href="/datenschutz" className="terminal-link">./datenschutz</Link>
                  <Link href="/about" className="terminal-link">./about</Link>
                </nav>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
