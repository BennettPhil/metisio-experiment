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
    question: "Can software authenticate without a human clicking through an OAuth browser flow?",
    yes: "An agent can authenticate and act without a human in the loop.",
    no: "Every authentication requires a human click — agents are locked out.",
  },
  {
    id: "data",
    dimension: "Structured Data Output",
    question: "Does your API return structured data rather than rendered HTML?",
    yes: "Agents can parse and act on your outputs reliably.",
    no: "Outputs are built for humans to read, not machines to process.",
  },
  {
    id: "mcp",
    dimension: "MCP / Tool Interface",
    question: "Do you have an MCP server, function-calling SDK, or dedicated agent integration layer?",
    yes: "You're discoverable and usable by agentic frameworks out of the box.",
    no: "Agents have to build custom wrappers just to use you.",
  },
  {
    id: "permissions",
    dimension: "Permissions & Safety",
    question: "Can you create scoped tokens that limit what an agent can read, write, or delete?",
    yes: "You can safely give agents limited access.",
    no: "Agent access is all-or-nothing.",
  },
  {
    id: "observability",
    dimension: "Agent Observability",
    question: "Can you distinguish agent traffic from human traffic in your analytics or logs?",
    yes: "You can see what agents are doing and debug issues.",
    no: "Agent activity is invisible.",
  },
];

type Answer = "yes" | "no" | null;

export default function ScorePage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);

  const answered = Object.keys(answers).length;
  const score = Object.values(answers).filter((a) => a === "yes").length;
  const allAnswered = answered === questions.length;

  const getVerdict = (value: number) => {
    if (value <= 1) return { label: "Not Agent-Ready", color: "#ff3333", desc: "Your product is invisible to AI agents." };
    if (value <= 3) return { label: "Partially Ready", color: "#ffb000", desc: "You have some foundations but critical gaps remain." };
    if (value <= 5) return { label: "Mostly Ready", color: "#33ff00", desc: "Solid foundations, but still missing key agent interfaces." };
    return { label: "Agent-Ready", color: "#33ff00", desc: "Strong score. Now market that fact clearly." };
  };

  const verdict = getVerdict(score);

  return (
    <div className="mx-auto max-w-3xl space-y-8 py-8">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar flex items-center justify-between gap-3 px-4 py-2 text-xs uppercase tracking-[0.32em]">
          <span>SCORE_CHECK</span>
          <Link href="/checkout" className="terminal-link">./buy-audit</Link>
        </div>
        <div className="px-4 py-8 text-center sm:px-6">
          <div className="terminal-status mb-5 inline-block text-xs uppercase tracking-[0.22em]">
            Free Agent Readiness Check
          </div>
          <h1 className="text-3xl font-semibold uppercase leading-tight tracking-[0.14em] sm:text-5xl">
            Is Your Product
            <br />
            Ready for the Agent Era?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dim">
            6 yes/no questions. 60 seconds. Know where you stand before your competitors do.
          </p>
        </div>
      </div>

      {!submitted ? (
        <div>
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="terminal-panel mb-6 p-6 transition-colors"
              style={{ borderColor: answers[q.id] ? (answers[q.id] === "yes" ? "#33ff00" : "#ff3333") : "#1f521f" }}
            >
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-dim">
                {i + 1}. {q.dimension}
              </div>
              <p className="mb-5 text-base font-medium leading-6">{q.question}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: "yes" }))}
                  className="terminal-button flex-1 px-4 py-3"
                  style={{
                    borderColor: answers[q.id] === "yes" ? "#33ff00" : "#1f521f",
                    background: answers[q.id] === "yes" ? "#33ff00" : "transparent",
                    color: answers[q.id] === "yes" ? "#0a0a0a" : "#33ff00",
                    textShadow: answers[q.id] === "yes" ? "none" : undefined,
                  }}
                >
                  [ YES ]
                </button>
                <button
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: "no" }))}
                  className="terminal-button flex-1 px-4 py-3"
                  style={{
                    borderColor: answers[q.id] === "no" ? "#ff3333" : "#1f521f",
                    background: answers[q.id] === "no" ? "#ff3333" : "transparent",
                    color: answers[q.id] === "no" ? "#0a0a0a" : "#33ff00",
                    textShadow: answers[q.id] === "no" ? "none" : undefined,
                  }}
                >
                  [ NO ]
                </button>
              </div>
              {answers[q.id] && (
                <p className="mt-3 text-sm leading-6" style={{ color: answers[q.id] === "yes" ? "#33ff00" : "#ff3333" }}>
                  {answers[q.id] === "yes" ? q.yes : q.no}
                </p>
              )}
            </div>
          ))}

          <div className="mt-2 text-center">
            <p className="mb-5 text-sm text-muted">{answered}/6 questions answered</p>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="terminal-button w-full max-w-sm justify-center px-10 py-4 text-base disabled:cursor-not-allowed disabled:opacity-40"
            >
              [ SEE MY SCORE ]
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-12 text-center">
            <div className="mb-2 text-7xl font-bold leading-none" style={{ color: verdict.color }}>
              {score}<span className="text-3xl text-muted">/6</span>
            </div>
            <div className="mb-4 text-2xl font-semibold uppercase tracking-[0.1em]" style={{ color: verdict.color }}>
              {verdict.label}
            </div>
            <p className="mx-auto max-w-xl text-base leading-7 text-dim">{verdict.desc}</p>
          </div>

          <div className="terminal-panel mb-10 p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em]">YOUR ANSWERS</h3>
            {questions.map((q) => (
              <div key={q.id} className="flex items-start gap-3 border-b border-muted py-3">
                <span className="shrink-0 text-lg" style={{ color: answers[q.id] === "yes" ? "#33ff00" : "#ff3333" }}>
                  {answers[q.id] === "yes" ? ">" : "!"}
                </span>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.08em]">{q.dimension}</div>
                  {answers[q.id] === "no" && <div className="mt-1 text-xs text-muted">{q.no}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="terminal-panel p-8 text-center">
            <h2 className="mb-3 text-2xl font-semibold uppercase tracking-[0.12em]">Want to know exactly what to fix?</h2>
            <p className="mb-6 text-sm leading-7 text-dim">
              The free check tells you where you stand. The full Agent Readiness Audit tells you what to do about it.
            </p>
            <Link href="/checkout" className="terminal-button px-6 py-4">
              [ GET THE FULL AUDIT - €20 ]
            </Link>
            <p className="mt-3 text-xs text-muted">Guarantee: 3 specific actionable insights or full refund.</p>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="terminal-link bg-transparent text-sm underline"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
