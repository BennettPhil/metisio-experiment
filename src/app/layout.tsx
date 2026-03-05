import type { Metadata } from "next";
import { Bricolage_Grotesque, Staatliches } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const bodyFont = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Staatliches({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Claw",
  description: "A lightweight launchpad for the Open Claw agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/checkout", label: "Checkout" },
  ];

  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-10 pt-5 sm:px-8">
          <header className="rounded-2xl border border-black/15 bg-black/5 p-4 backdrop-blur-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Link href="/" className="font-display text-3xl uppercase tracking-wider text-stone-900">
                Open Claw
              </Link>
              <nav className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold tracking-wide text-stone-900 transition hover:-translate-y-0.5 hover:bg-black hover:text-amber-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="flex-1 pt-8">{children}</main>
          <footer className="mt-10 border-t border-black/10 pt-4 text-sm text-stone-700">
            Built with Next.js, ready for Vercel and Stripe.
          </footer>
        </div>
      </body>
    </html>
  );
}
