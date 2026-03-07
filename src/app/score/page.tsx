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
    if (value <= 1) return { label: "Not Agent-Ready", color: "text-accent", desc: "Your product is invisible to AI agents." };
    if (value <= 3) return { label: "Partially Ready", color: "text-accent", desc: "You have some foundations but critical gaps remain." };
    if (value <= 5) return { label: "Mostly Ready", color: "text-black", desc: "Solid foundations, but still missing key agent interfaces." };
    return { label: "Agent-Ready", color: "text-black", desc: "Strong score. Now market that fact clearly." };
  };

  const verdict = getVerdict(score);

  return (
    <div className="mx-auto max-w-4xl space-y-6 py-2 sm:py-4">
      <div className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden">
        <div className="swiss-titlebar">
          <span>Score widget</span>
          <Link href="/checkout" className="swiss-link">Buy audit</Link>
        </div>
        <div className="px-4 py-7 text-center sm:px-6">
          <div className="swiss-label mb-5 text-accent">Free agent readiness check</div>
          <h1 className="text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-6xl">
            Is your product ready
            <br />
            for the agent era?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/72">
            6 yes/no questions. About a minute. Clearer result, cleaner interface, same scoring logic.
          </p>
        </div>
      </div>

      {!submitted ? (
        <div>
          {questions.map((q, i) => {
            const selected = answers[q.id];
            const selectedClass =
              selected === "yes" ? "border-accent" : selected === "no" ? "border-black" : "border-black";

            return (
              <div key={q.id} className={`swiss-card mb-4 p-4 sm:p-6 ${selectedClass}`}>
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")} {q.dimension}
                </div>
                <p className="mb-5 text-base font-medium leading-7 sm:text-lg">{q.question}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: "yes" }))}
                    className={`swiss-button-secondary w-full ${selected === "yes" ? "!border-accent !bg-accent !text-white" : ""}`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: "no" }))}
                    className={`swiss-button-secondary w-full ${selected === "no" ? "!bg-black !text-white" : ""}`}
                  >
                    No
                  </button>
                </div>
                {selected && (
                  <p className={`mt-4 text-sm leading-7 ${selected === "yes" ? "text-black/78" : "text-accent"}`}>
                    {selected === "yes" ? q.yes : q.no}
                  </p>
                )}
              </div>
            );
          })}

          <div className="mt-3 text-center">
            <p className="mb-5 text-sm text-black/56">{answered}/6 questions answered</p>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="swiss-button-primary w-full disabled:cursor-not-allowed disabled:opacity-40 sm:max-w-sm"
            >
              See my score
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="swiss-card p-6 text-center sm:p-8">
            <div className={`text-7xl font-black leading-none sm:text-8xl ${verdict.color}`}>
              {score}
              <span className="text-3xl text-black/34">/6</span>
            </div>
            <div className={`mt-3 text-2xl font-black uppercase tracking-[-0.04em] sm:text-3xl ${verdict.color}`}>
              {verdict.label}
            </div>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-black/72">{verdict.desc}</p>
          </div>

          <div className="swiss-card overflow-hidden">
            <div className="swiss-titlebar">
              <span>Your answers</span>
              <span>{score}/6</span>
            </div>
            <div className="p-4 sm:p-6">
              {questions.map((q) => (
                <div key={q.id} className="flex items-start gap-3 border-b-2 border-black py-3 last:border-b-0">
                  <span className={`mt-0.5 text-xs font-black uppercase tracking-[0.18em] ${answers[q.id] === "yes" ? "text-black" : "text-accent"}`}>
                    {answers[q.id]}
                  </span>
                  <div>
                    <div className="text-sm font-bold uppercase tracking-[0.08em]">{q.dimension}</div>
                    {answers[q.id] === "no" && <div className="mt-1 text-sm leading-6 text-black/64">{q.no}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="swiss-card swiss-card-muted p-6 text-center sm:p-8">
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.06em]">
              Want to know exactly what to fix?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-black/72 sm:text-base">
              The free check tells you where you stand. The full Agent Readiness Audit tells you what to do about it.
            </p>
            <Link href="/checkout" className="swiss-button-primary mt-6 w-full sm:w-auto">
              Get the full audit - €20
            </Link>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-black/56">
              Guarantee: 3 specific actionable insights or full refund
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
              }}
              className="swiss-link bg-transparent text-sm"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
