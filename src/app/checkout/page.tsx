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
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden">
        <div className="swiss-titlebar">
          <span>Checkout</span>
          <span>Stripe stays intact</span>
        </div>
        <div className="grid gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="swiss-section-number text-accent">Agent Readiness Audit · Founding client pricing</p>
            <h1 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-0.08em] sm:text-6xl">
              Is your product
              <br />
              agent-ready?
            </h1>
            <p className="mt-4 text-base leading-7 text-black/72 sm:text-lg">
              €20. Delivered to your inbox within 48 hours. Same offer, better readability, no mobile breakage.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.16em] text-black/56">
              <span className="swiss-label">5 sample audits</span>
              <span className="swiss-label">Experiment live</span>
              <span className="swiss-label">Secure Stripe</span>
            </div>
          </div>
          <div className="swiss-card swiss-card-muted p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Why not just ask ChatGPT?</p>
            <p className="mt-3 text-sm leading-7 text-black/72">
              You could. But ChatGPT needs you to ask the right questions, and you&apos;re too close to your own product to know what those are.
              Gary shows up with the diagnostic framework already loaded: competitor positioning, conversion gaps, pricing signals, SEO blind spots.
            </p>
            <p className="mt-3 text-sm leading-7 text-black/72">
              Built from Phil Bennett&apos;s 20 years as a fractional CTO. Also: Claude is diplomatically useless. Gary has no relationship to protect.
            </p>
          </div>
        </div>
      </div>

      <div className="swiss-status flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm leading-6">Not sure what you&apos;re buying? Read a real sample audit first.</span>
        <Link href="/blog/sample-audit-balsamiq" className="swiss-button-secondary w-full sm:w-auto">
          See example
        </Link>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="swiss-card overflow-hidden">
          <div className="swiss-titlebar">
            <span>Deliverables</span>
            <span>Exactly what you receive</span>
          </div>
          <div className="space-y-4 px-4 py-5 sm:px-6">
            <ul className="space-y-3 text-sm leading-7 text-black/72">
              {[
                "Agent readiness score /6 — API, auth, structured data, MCP interfaces, permissions model, observability",
                "Gary browses your site and researches your competitors",
                "Positioning analysis and messaging gaps",
                "Conversion audit with highest-impact fixes first",
                "A blunt 1-page audit with 3 specific next actions",
                "Delivered to your Stripe checkout email within 48 hours",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="swiss-status text-sm leading-6">
              <strong>Guarantee:</strong> If you don&apos;t get at least 3 specific, actionable insights you hadn&apos;t considered, reply and get refunded.
            </div>
          </div>
        </div>

        <div className="swiss-card overflow-hidden">
          <div className="swiss-titlebar">
            <span>Submit target</span>
            <span>Required for checkout</span>
          </div>
          <div className="space-y-5 px-4 py-5 sm:px-6">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-[0.08em]" htmlFor="url">
                Project URL <span className="text-black/56">(optional)</span>
              </label>
              <input
                id="url"
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://yourproject.com"
                className="swiss-input text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-[0.08em]" htmlFor="request">
                What do you want Gary to focus on? <span className="text-accent">*</span>
              </label>
              <textarea
                id="request"
                value={reviewRequest}
                onChange={(e) => setReviewRequest(e.target.value)}
                placeholder="e.g. My landing page is not converting. Tell me what is broken."
                rows={5}
                className="swiss-input resize-none text-sm"
              />
              <p className="text-xs text-black/56">Be specific. Minimum 20 characters.</p>
            </div>

            <label className="swiss-card flex cursor-pointer items-start gap-3 p-4 text-sm leading-6 text-black/72">
              <input
                type="checkbox"
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-[#FF3000]"
              />
              <span>
                I agree to immediate commencement of the digital service and acknowledge that I thereby waive my 14-day right of withdrawal (§356 para. 5 BGB).
              </span>
            </label>

            <button
              type="button"
              onClick={onCheckout}
              disabled={!canSubmit}
              className="swiss-button-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? "Redirecting to Stripe..." : "Get the audit - €20 incl. VAT"}
            </button>

            {error && <p className="text-sm font-medium text-accent">{error}</p>}

            <p className="text-center text-xs leading-6 text-black/56">
              Secure checkout via Stripe · Philip Bennett – Punk Leadership · VAT DE306641412
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
