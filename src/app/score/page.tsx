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
  const score = Object.values(answers).filter((value) => value === "yes").length;
  const allAnswered = answered === questions.length;

  const getVerdict = (value: number) => {
    if (value <= 1) return { label: "Not Agent-Ready", color: "text-accent", desc: "Your product is invisible to AI agents." };
    if (value <= 3) return { label: "Partially Ready", color: "text-accent", desc: "You have some foundations but critical gaps remain." };
    if (value <= 5) return { label: "Mostly Ready", color: "text-black", desc: "Solid foundations, but still missing key agent interfaces." };
    return { label: "Agent-Ready", color: "text-black", desc: "Strong score. Now market that fact clearly." };
  };

  const verdict = getVerdict(score);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <section className="space-y-5">
        <span className="neo-tag">Free score check</span>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
          Is your product ready for the agent era?
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-black/76">
          Six yes-or-no questions. About a minute. Same scoring logic, sharper presentation.
        </p>
      </section>

      {!submitted ? (
        <div className="space-y-5">
          {questions.map((question, index) => {
            const selected = answers[question.id];
            const activeBackground = selected === "yes" ? "bg-accent-green" : selected === "no" ? "bg-accent-red" : "bg-white";

            return (
              <div key={question.id} className={`neo-panel p-5 sm:p-6 ${activeBackground}`}>
                <p className="neo-kicker mb-3">
                  {String(index + 1).padStart(2, "0")} · {question.dimension}
                </p>
                <p className="text-xl font-bold leading-8 sm:text-2xl">{question.question}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: "yes" }))}
                    className={`neo-button-secondary w-full ${selected === "yes" ? "!bg-accent-green" : ""}`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: "no" }))}
                    className={`neo-button-secondary w-full ${selected === "no" ? "!bg-accent-red" : ""}`}
                  >
                    No
                  </button>
                </div>
                {selected ? <p className="mt-4 max-w-3xl text-base leading-7">{selected === "yes" ? question.yes : question.no}</p> : null}
              </div>
            );
          })}

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base font-bold">{answered}/6 questions answered</p>
            <button onClick={() => setSubmitted(true)} disabled={!allAnswered} className="neo-button w-full sm:w-auto">
              SEE MY SCORE
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="neo-panel bg-white p-6 text-center sm:p-8">
            <p className={`text-[6rem] font-black leading-none tracking-[-0.08em] sm:text-[8rem] ${verdict.color}`}>
              {score}
              <span className="text-4xl text-black/40">/6</span>
            </p>
            <h2 className={`mt-3 text-3xl font-black tracking-[-0.05em] sm:text-5xl ${verdict.color}`}>{verdict.label}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-black/76">{verdict.desc}</p>
          </div>

          <div className="neo-panel bg-muted p-6 sm:p-8">
            <p className="neo-kicker mb-4">Your answers</p>
            <div className="grid gap-4">
              {questions.map((question) => (
                <div key={question.id} className="border-b-[3px] border-black pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-bold">{question.dimension}</p>
                  <p className="mt-1 text-base leading-7 text-black/76">
                    {answers[question.id] === "yes" ? question.yes : question.no}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="neo-panel bg-accent-yellow p-6 sm:p-8">
            <h2 className="text-4xl font-black leading-none tracking-[-0.07em] sm:text-5xl">Want the full audit?</h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-black/78">
              The free score tells you where you stand. The paid audit tells you what to change next.
            </p>
            <Link href="/checkout" className="neo-button mt-6 w-full sm:w-auto">
              GET THE FULL AUDIT — €39
            </Link>
          </div>

          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
            }}
            className="neo-link text-sm font-bold"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
