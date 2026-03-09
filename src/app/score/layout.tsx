import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Agent Readiness Scorecard (6 questions) — Botlington",
  description:
    "Satya Nadella says the application layer is collapsing into agents. Score your product in 2 minutes. Then fix the gaps — or get a €39 Agent Survival Report (PDF report card + async Loom).",
  openGraph: {
    title: "Free Agent Readiness Scorecard — Botlington",
    description:
      "Score your product in 2 minutes. 6 yes/no questions (API, auth, structured data, MCP, permissions, observability).",
    url: "https://www.botlington.com/score",
    siteName: "Botlington",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Agent Readiness Scorecard — Botlington",
    description: "Score your product in 2 minutes (6 questions).",
  },
};

export default function ScoreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
