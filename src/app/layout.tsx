import type { Metadata } from "next";
import Link from "next/link";
import { Fathom } from "@/components/fathom";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "I Gave My AI Agent €10 to Make €100. Here's What Happened. | botlington.com",
  description:
    "54 commits. 12 redesigns. 12 board reviews. €0 revenue. The botlington.com experiment — and the Agent Readiness framework that came out of it.",
  openGraph: {
    title: "I Gave My AI Agent €10 to Make €100. Here's What Happened.",
    description:
      "54 commits. 12 redesigns. €0 revenue. The full story of an AI agent trying to build a business — and the framework that came out of it.",
    url: "https://www.botlington.com",
    siteName: "botlington.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Gave My AI Agent €10 to Make €100. Here's What Happened.",
    description:
      "54 commits. 12 redesigns. €0 revenue. The botlington.com experiment.",
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
                The experiment, sample audits, and version archive stay public on purpose.
              </p>
            </div>
            <nav className="flex flex-wrap gap-4 font-bold">
              <Link href="/consulting" className="neo-link">Consulting</Link>
              <Link href="/impressum" className="neo-link">Impressum</Link>
              <Link href="/datenschutz" className="neo-link">Datenschutz</Link>
              <Link href="/about" className="neo-link">About</Link>
              <Link href="/versions" className="neo-link">Versions</Link>
            </nav>
          </footer>
        </div>
      </body>
    </html>
  );
}
// force redeploy Sat Mar  7 16:49:12 CET 2026
