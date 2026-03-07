"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: "api",
    dimension: "API Existence & Quality",
    question: "Does your product have a publicly documented REST or GraphQL API?",
    yes: "Agents can call your product programmatically.",
    no: "Agents can't interact with your product at all — it's human-only.",
  },
  {
    id: "auth",
    dimension: "Programmatic Authentication",
    question: "Can software authenticate without a human clicking through an OAuth browser flow? (e.g. API keys, service accounts)",
    yes: "An agent can authenticate and act without a human in the loop.",
    no: "Every authentication requires a human click — agents are locked out.",
  },
  {
    id: "data",
    dimension: "Structured Data Output",
    question: "Does your API return machine-readable structured data (JSON/XML) rather than rendered HTML?",
    yes: "Agents can parse and act on your outputs reliably.",
    no: "Outputs are built for humans to read, not for machines to process.",
  },
  {
    id: "mcp",
    dimension: "MCP / Tool Interface",
    question: "Do you have an MCP server, function-calling SDK, or dedicated agent integration layer?",
    yes: "You're discoverable and usable by agentic frameworks out of the box.",
    no: "Agents have to build custom wrappers just to use you — most won't bother.",
  },
  {
    id: "permissions",
    dimension: "Permissions & Safety",
    question: "Can you create scoped tokens that limit what an agent can read, write, or delete?",
    yes: "You can safely give agents limited access — enterprise-ready.",
    no: "Agent access is all-or-nothing — a security risk most buyers won't accept.",
  },
  {
    id: "observability",
    dimension: "Agent Observability",
    question: "Can you distinguish agent traffic from human traffic in your analytics or logs?",
    yes: "You can see what agents are doing and debug when things go wrong.",
    no: "Agent activity is invisible — you can't monitor, audit, or control it.",
  },
];

type Answer = "yes" | "no" | null;

export default function ScorePage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter((a) => a === "yes").length;
  const allAnswered = answered === questions.length;

  const getVerdict = (score: number) => {
    if (score <= 1) return { label: "Not Agent-Ready", color: "#ef4444", desc: "Your product is invisible to AI agents. Agents can't call it, authenticate to it, or parse its outputs. In the agent era, invisible means irrelevant." };
    if (score <= 3) return { label: "Partially Ready", color: "#f59e0b", desc: "You have some foundations — but critical gaps mean agents will struggle to use your product reliably. Fixing the gaps now is much cheaper than retrofitting later." };
    if (score <= 5) return { label: "Mostly Ready", color: "#3b82f6", desc: "Solid API foundations. You're ahead of most indie products. The missing pieces (usually MCP and observability) are what separate 'can be automated' from 'enterprise-grade agent platform'." };
    return { label: "Agent-Ready", color: "#10b981", desc: "Strong score. Your product can be integrated into agentic workflows today. The question now is whether you're marketing that fact — most buyers don't know to look for it." };
  };

  const verdict = getVerdict(score);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#e5e5e5", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid #1f1f1f", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ color: "#e5e5e5", textDecoration: "none", fontWeight: 600, fontSize: "18px" }}>
          botlington.com
        </Link>
        <Link href="/checkout" style={{ background: "#FF4500", color: "white", padding: "8px 16px", borderRadius: "6px", textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
          Get Full Audit — €20
        </Link>
      </nav>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-block", background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: "6px", padding: "6px 14px", fontSize: "13px", color: "#9ca3af", marginBottom: "20px" }}>
            Free Agent Readiness Check
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, lineHeight: 1.15, margin: "0 0 16px", color: "#ffffff" }}>
            Is Your Product<br />Ready for the Agent Era?
          </h1>
          <p style={{ fontSize: "17px", color: "#9ca3af", lineHeight: 1.6, margin: 0 }}>
            6 yes/no questions. 60 seconds. Know where you stand before your competitors do.
          </p>
        </div>

        {!submitted ? (
          <div>
            {/* Questions */}
            {questions.map((q, i) => (
              <div key={q.id} style={{ marginBottom: "32px", background: "#111", border: "1px solid #1f1f1f", borderRadius: "10px", padding: "24px", transition: "border-color 0.2s", borderColor: answers[q.id] ? (answers[q.id] === "yes" ? "#10b981" : "#ef4444") : "#1f1f1f" }}>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                  {i + 1}. {q.dimension}
                </div>
                <p style={{ fontSize: "16px", color: "#e5e5e5", lineHeight: 1.5, margin: "0 0 20px", fontWeight: 500 }}>
                  {q.question}
                </p>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: "yes" }))}
                    style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "2px solid", borderColor: answers[q.id] === "yes" ? "#10b981" : "#2a2a2a", background: answers[q.id] === "yes" ? "rgba(16, 185, 129, 0.1)" : "#1a1a1a", color: answers[q.id] === "yes" ? "#10b981" : "#9ca3af", fontWeight: 600, fontSize: "15px", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    ✓ Yes
                  </button>
                  <button
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: "no" }))}
                    style={{ flex: 1, padding: "12px", borderRadius: "8px", border: "2px solid", borderColor: answers[q.id] === "no" ? "#ef4444" : "#2a2a2a", background: answers[q.id] === "no" ? "rgba(239, 68, 68, 0.1)" : "#1a1a1a", color: answers[q.id] === "no" ? "#ef4444" : "#9ca3af", fontWeight: 600, fontSize: "15px", cursor: "pointer", transition: "all 0.15s" }}
                  >
                    ✗ No
                  </button>
                </div>
                {answers[q.id] && (
                  <p style={{ margin: "12px 0 0", fontSize: "13px", color: answers[q.id] === "yes" ? "#10b981" : "#ef4444", lineHeight: 1.5 }}>
                    {answers[q.id] === "yes" ? q.yes : q.no}
                  </p>
                )}
              </div>
            ))}

            {/* Progress + Submit */}
            <div style={{ textAlign: "center", marginTop: "8px" }}>
              <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "20px" }}>
                {answered}/6 questions answered
              </p>
              <button
                onClick={() => setSubmitted(true)}
                disabled={!allAnswered}
                style={{ background: allAnswered ? "#FF4500" : "#2a2a2a", color: allAnswered ? "white" : "#4a4a4a", padding: "16px 40px", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "17px", cursor: allAnswered ? "pointer" : "not-allowed", transition: "all 0.2s", width: "100%", maxWidth: "360px" }}
              >
                See My Score
              </button>
            </div>
          </div>
        ) : (
          /* Results */
          <div>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div style={{ fontSize: "80px", fontWeight: 900, color: verdict.color, lineHeight: 1, marginBottom: "8px" }}>
                {score}<span style={{ fontSize: "36px", color: "#4a4a4a" }}>/6</span>
              </div>
              <div style={{ fontSize: "24px", fontWeight: 700, color: verdict.color, marginBottom: "16px" }}>
                {verdict.label}
              </div>
              <p style={{ fontSize: "16px", color: "#9ca3af", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
                {verdict.desc}
              </p>
            </div>

            {/* Answer breakdown */}
            <div style={{ background: "#111", border: "1px solid #1f1f1f", borderRadius: "10px", padding: "24px", marginBottom: "40px" }}>
              <h3 style={{ color: "#e5e5e5", fontSize: "15px", fontWeight: 700, margin: "0 0 16px" }}>Your Answers</h3>
              {questions.map((q) => (
                <div key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "10px 0", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ color: answers[q.id] === "yes" ? "#10b981" : "#ef4444", fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>
                    {answers[q.id] === "yes" ? "✓" : "✗"}
                  </span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#e5e5e5" }}>{q.dimension}</div>
                    {answers[q.id] === "no" && (
                      <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{q.no}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background: "#111", border: "1px solid #2a2a2a", borderRadius: "10px", padding: "32px", textAlign: "center" }}>
              <h2 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 700, margin: "0 0 12px" }}>
                Want to know exactly what to fix?
              </h2>
              <p style={{ color: "#9ca3af", fontSize: "15px", lineHeight: 1.6, margin: "0 0 24px" }}>
                The free check tells you where you stand. The full Agent Readiness Audit tells you what to do about it — plus competitor positioning, conversion gaps, and SEO. €20, delivered in 24 hours.
              </p>
              <Link
                href="/checkout"
                style={{ display: "inline-block", background: "#FF4500", color: "white", padding: "16px 36px", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}
              >
                Get the Full Audit — €20 →
              </Link>
              <p style={{ margin: "12px 0 0", fontSize: "13px", color: "#6b7280" }}>
                Guarantee: 3 specific actionable insights or full refund.
              </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <button
                onClick={() => { setAnswers({}); setSubmitted(false); }}
                style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "14px", textDecoration: "underline" }}
              >
                Start over
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
