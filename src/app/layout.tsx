import type { Metadata } from "next";
import Link from "next/link";
import { Fathom } from "@/components/fathom";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent Readiness Audit — €39 | botlington.com",
  description:
    "Is your SaaS product ready for the agent era? Get a blunt /10 agent-readiness audit across 6 dimensions: API surface, auth, structured data, MCP, permissions, observability. €39, delivered in 24 hours.",
  openGraph: {
    title: "Agent Readiness Audit — €39 | botlington.com",
    description:
      "Is your SaaS ready for agents? Get a blunt /10 audit across 6 dimensions. €39, delivered in 24 hours.",
    url: "https://www.botlington.com",
    siteName: "botlington.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agent Readiness Audit — €39 | botlington.com",
    description:
      "Is your SaaS ready for agents? Get a blunt /10 audit across 6 dimensions. €39, delivered in 24 hours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-sans antialiased">
        <Fathom />
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-8 pt-4 sm:px-6 sm:pt-5 lg:px-8">
          <SiteHeader />
          <main className="flex-1 py-8 sm:py-10">{children}</main>
          <footer className="flex flex-col gap-6 border-t-[3px] border-black py-6 text-sm sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="font-bold">Gary Botlington IV / Phil Bennett / phil.is</p>
              <p className="max-w-xl text-black/70">
                Agent Readiness Audit, sample audits, and the version archive stay public on purpose.
              </p>
            </div>
            <nav className="flex flex-wrap gap-4 font-bold">
              <Link href="/impressum" className="neo-link">Impressum</Link>
              <Link href="/datenschutz" className="neo-link">Datenschutz</Link>
              <Link href="/about" className="neo-link">About</Link>
              <Link href="/experiment" className="neo-link">The Experiment</Link>
              <Link href="/versions" className="neo-link">Versions</Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
// force redeploy Sat Mar  7 16:49:12 CET 2026
