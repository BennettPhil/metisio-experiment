"use client";

import { useMemo, useState } from "react";
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

type CopyTarget = null | "link" | "text" | "checklist";

type ChecklistItem = {
  id: string;
  dimension: string;
  status: Answer;
  fix: string;
};

function fixFor(id: string): string {
  switch (id) {
    case "api":
      return "Ship a documented REST/GraphQL API (start read-only if needed). Publish an OpenAPI schema + 3 copy/paste examples.";
    case "auth":
      return "Add programmatic auth (API keys, OAuth client credentials, scoped PATs). Avoid browser-only login as the only path.";
    case "data":
      return "Return structured JSON for core objects. Add webhooks / events. Don’t make agents scrape HTML as the primary integration.";
    case "mcp":
      return "Publish an MCP server or tool layer with 5–10 core actions (create/read/update). Give agents a first-class interface.";
    case "permissions":
      return "Introduce least-privilege scopes (read vs write vs delete), expiries, and per-agent tokens. Safety is the feature.";
    case "observability":
      return "Add audit logs + agent identifiers (user-agent / token metadata). Make agent activity debuggable and measurable.";
    default:
      return "Fix the gap.";
  }
}

export default function ScorePage() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [copied, setCopied] = useState<CopyTarget>(null);

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

  const checklist = useMemo<ChecklistItem[]>(() => {
    return questions.map((q) => ({
      id: q.id,
      dimension: q.dimension,
      status: answers[q.id] ?? null,
      fix: fixFor(q.id),
    }));
  }, [answers]);

  const missing = checklist.filter((item) => item.status === "no");

  const checklistText = useMemo(() => {
    const headline = `Agent Readiness Checklist (score: ${score}/6 — ${verdict.label})`;
    const lines = [headline, "", "Fix these first:"];

    if (missing.length === 0) {
      lines.push("- You didn’t answer ‘no’ to anything. Nice. Next: ship MCP + market your readiness (docs + examples). ");
    } else {
      for (const item of missing) {
        lines.push(`- ${item.dimension}: ${item.fix}`);
      }
    }

    lines.push("", "Run the score again → https://www.botlington.com/score");
    return lines.join("\n");
  }, [missing, score, verdict.label]);

  const handleEmailCapture = async () => {
    if (!email || !email.includes("@")) return;
    setEmailSending(true);
    try {
      await fetch("/api/score-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, score, verdict: verdict.label, missing: missing.map((m) => m.id) }),
      });
      setEmailSent(true);
    } catch {
      setEmailSent(true); // fail silently
    }
    setEmailSending(false);
  };

  const shareUrl = "https://www.botlington.com/score";
  const sharePostText = `Satya Nadella: “The traditional application layer is collapsing into agents.”\n\nI just scored ${score}/6 on agent readiness (${verdict.label}).\n\nRun the free 2-minute scorecard → ${shareUrl}`;
  const shareXUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(sharePostText)}`;
  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const copyToClipboard = async (value: string, which: Exclude<CopyTarget, null>) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // ignore
    }
  };

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

          {!emailSent ? (
            <div className="neo-panel bg-muted p-6 sm:p-8">
              <p className="neo-kicker mb-4">Save your results</p>
              <h2 className="text-2xl font-black leading-none tracking-[-0.05em] sm:text-3xl">Email me my checklist</h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-black/76">
                Leave your email and I&apos;ll personally follow up with a tighter one-page version of your checklist + 2–3 practical suggestions.
                This is manual (not an automated drip). No spam.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="neo-panel flex-1 border-[3px] border-black bg-white p-3 text-base font-medium focus:outline-none"
                  onKeyDown={(e) => e.key === "Enter" && handleEmailCapture()}
                />
                <button
                  onClick={handleEmailCapture}
                  disabled={emailSending || !email.includes("@")} 
                  className="neo-button-secondary whitespace-nowrap disabled:opacity-50"
                >
                  {emailSending ? "SAVING..." : "LEAVE MY EMAIL"}
                </button>
              </div>
            </div>
          ) : (
            <div className="neo-panel bg-accent-green p-6 sm:p-8">
              <p className="text-xl font-black">✓ Got it.</p>
              <p className="mt-2 text-base text-black/76">
                If I see something interesting in your answers, I&apos;ll reply with a tighter checklist / next steps.
              </p>
            </div>
          )}

          <div className="neo-panel bg-white p-6 sm:p-8">
            <p className="neo-kicker mb-4">Your checklist</p>
            <h2 className="text-2xl font-black leading-none tracking-[-0.05em] sm:text-3xl">Fix these gaps first.</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-black/76">
              This is the practical version. Copy/paste it into a ticket, a doc, or a founder panic spiral.
            </p>

            <div className="mt-5 grid gap-4">
              {missing.length === 0 ? (
                <div className="border-b-[3px] border-black pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-bold">No obvious red flags</p>
                  <p className="mt-1 text-base leading-7 text-black/76">
                    You didn&apos;t answer &ldquo;no&rdquo; to anything. Next: ship an MCP server + publish examples so agents can actually use you.
                  </p>
                </div>
              ) : (
                missing.map((item) => (
                  <div key={item.id} className="border-b-[3px] border-black pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm font-bold">{item.dimension}</p>
                    <p className="mt-1 text-base leading-7 text-black/76">{item.fix}</p>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button onClick={() => copyToClipboard(checklistText, "checklist")} className="neo-button-secondary w-full">
                {copied === "checklist" ? "COPIED" : "COPY CHECKLIST"}
              </button>
              <Link href="/checkout" className="neo-button-secondary w-full text-center">
                GET THE FULL AUDIT — €39
              </Link>
            </div>
          </div>

          <div className="neo-panel bg-white p-6 sm:p-8">
            <p className="neo-kicker mb-4">Share it</p>
            <h2 className="text-2xl font-black leading-none tracking-[-0.05em] sm:text-3xl">Make the fear contagious.</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-black/76">
              Got a low score? Good. Post it. If Nadella is right, the products that stay human-only get quietly deleted by the market.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button onClick={() => copyToClipboard(shareUrl, "link")} className="neo-button-secondary w-full">
                {copied === "link" ? "COPIED" : "COPY LINK"}
              </button>
              <button onClick={() => copyToClipboard(sharePostText, "text")} className="neo-button-secondary w-full">
                {copied === "text" ? "COPIED" : "COPY POST TEXT"}
              </button>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <a href={shareLinkedInUrl} target="_blank" rel="noreferrer" className="neo-button-secondary w-full text-center">
                OPEN LINKEDIN SHARE
              </a>
              <a href={shareXUrl} target="_blank" rel="noreferrer" className="neo-button-secondary w-full text-center">
                OPEN X / TWITTER
              </a>
            </div>
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
