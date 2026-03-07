"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [projectUrl, setProjectUrl] = useState("");
  const [reviewRequest, setReviewRequest] = useState("");
  const [consented, setConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = consented && reviewRequest.trim().length > 20 && !isLoading;

  async function onCheckout() {
    if (!canSubmit) return;
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectUrl, reviewRequest }),
      });
      const payload: { error?: string; url?: string } = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error ?? "Unable to start checkout.");
      window.location.assign(payload.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          CHECKOUT_INIT
        </div>
        <div className="px-4 py-6 sm:px-6">
          <p className="text-xs uppercase tracking-[0.32em] text-dim">Agent Readiness Audit · Founding Client Pricing</p>
          <h1 className="mt-2 text-4xl font-semibold uppercase leading-tight tracking-[0.14em] sm:text-5xl">
            Is Your Product
            <br />
            Agent-Ready?
          </h1>
          <p className="mt-3 text-lg text-dim">€20 · Delivered to your inbox within 48 hours</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span>&gt; 5 sample audits published</span>
            <span>·</span>
            <span>&gt; experiment live</span>
            <span>·</span>
            <span>&gt; stripe checkout</span>
          </div>
        </div>
      </div>

      <div className="terminal-status flex items-center justify-between gap-4 text-sm">
        <span>Not sure what you&apos;re buying? Read a real sample audit first.</span>
        <Link href="/blog/sample-audit-balsamiq" className="terminal-button shrink-0 px-4 py-2 text-xs">
          [ SEE EXAMPLE ]
        </Link>
      </div>

      <div className="terminal-panel p-6 text-sm text-dim">
        <p><strong className="text-amber-terminal">WHY NOT JUST ASK CHATGPT?</strong></p>
        <p className="mt-2">
          You could. But ChatGPT needs you to ask the right questions, and you&apos;re too close to your own product to know what those are.
          Gary shows up with the diagnostic framework already loaded: competitor positioning, conversion gaps, pricing signals, SEO blind spots.
        </p>
        <p className="mt-2">
          Built from Phil Bennett&apos;s 20 years as a fractional CTO. Also: Claude is diplomatically useless. Gary has no relationship to protect.
        </p>
      </div>

      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          DELIVERABLES
        </div>
        <div className="space-y-4 px-4 py-5 text-sm text-dim sm:px-6">
          <h2 className="text-sm uppercase tracking-[0.32em]">Exactly What You Receive</h2>
          <ul className="space-y-3">
            {[
              "Agent readiness score /6 — API, auth, structured data, MCP interfaces, permissions model, observability",
              "Gary browses your site and researches your competitors",
              "Positioning analysis and messaging gaps",
              "Conversion audit with highest-impact fixes first",
              "A blunt 1-page audit with 3 specific next actions",
              "Delivered to your Stripe checkout email within 48 hours",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-amber-terminal">&gt;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="terminal-status text-sm">
            <strong>GUARANTEE:</strong> If you don&apos;t get at least 3 specific, actionable insights you hadn&apos;t considered, reply and get refunded.
          </div>
        </div>
      </div>

      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          SUBMIT_TARGET
        </div>
        <div className="space-y-5 px-4 py-5 sm:px-6">
          <h2 className="text-sm uppercase tracking-[0.32em]">Submit Your Project</h2>

          <div className="space-y-2">
            <label className="text-sm uppercase text-dim" htmlFor="url">
              Project URL <span className="text-muted">(optional)</span>
            </label>
            <input
              id="url"
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://yourproject.com"
              className="terminal-input text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm uppercase text-dim" htmlFor="request">
              What do you want Gary to focus on? <span className="text-error-terminal">*</span>
            </label>
            <textarea
              id="request"
              value={reviewRequest}
              onChange={(e) => setReviewRequest(e.target.value)}
              placeholder="e.g. My landing page is not converting. Tell me what is broken."
              rows={4}
              className="terminal-input resize-none text-sm"
            />
            <p className="text-xs text-muted">Be specific. Minimum 20 characters.</p>
          </div>

          <label className="terminal-panel flex cursor-pointer items-start gap-3 p-3 text-sm text-dim">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#33ff00]"
            />
            <span>
              I agree to immediate commencement of the digital service and acknowledge that I thereby waive my 14-day right of withdrawal (§356 para. 5 BGB).
            </span>
          </label>

          <button
            type="button"
            onClick={onCheckout}
            disabled={!canSubmit}
            className="terminal-button w-full justify-center px-6 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isLoading ? "[ REDIRECTING TO STRIPE... ]" : "[ GET THE AUDIT - €20 INCL. VAT ]"}
          </button>

          {error && <p className="text-sm font-medium text-error-terminal">{error}</p>}

          <p className="text-center text-xs text-muted">
            Secure checkout via Stripe · Philip Bennett – Punk Leadership · VAT DE306641412
          </p>
        </div>
      </div>
    </div>
  );
}
