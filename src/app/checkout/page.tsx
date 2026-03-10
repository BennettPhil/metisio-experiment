"use client";

import { useState } from "react";
import Link from "next/link";

const FIXED_PRICE_CENTS = 3900;

function isValidUrl(s: string): boolean {
  if (!s.trim()) return false;
  try {
    const url = new URL(s.startsWith("http") ? s : `https://${s}`);
    return !!url.hostname.includes(".");
  } catch {
    return false;
  }
}

export default function CheckoutPage() {
  const [projectUrl, setProjectUrl] = useState("");
  const [reviewRequest, setReviewRequest] = useState("");
  const [consented, setConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);

  const urlValid = isValidUrl(projectUrl);
  const requestValid = reviewRequest.trim().length > 20;
  const canSubmit = consented && urlValid && requestValid && !isLoading;

  const issues: string[] = [];
  if (attempted) {
    if (!urlValid) issues.push("Enter the URL of the product you want audited");
    if (!requestValid) issues.push("Tell us what to focus on (at least 20 characters)");
    if (!consented) issues.push("Tick the withdrawal consent checkbox");
  }

  async function onCheckout() {
    setAttempted(true);
    if (!canSubmit) return;
    setError(null);
    setIsLoading(true);

    const normalised = projectUrl.startsWith("http") ? projectUrl : `https://${projectUrl}`;

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectUrl: normalised, reviewRequest }),
      });
      const text = await response.text();
      let payload: { error?: string; url?: string };
      try {
        payload = JSON.parse(text);
      } catch {
        throw new Error(`Server returned invalid response (${response.status}). Please try again.`);
      }
      if (!response.ok || !payload.url) throw new Error(payload.error ?? "Unable to start checkout.");
      window.location.assign(payload.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setIsLoading(false);
    }
  }

  const displayPrice = `€${(FIXED_PRICE_CENTS / 100).toFixed(0)}`;

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-5">
          <span className="neo-tag neo-tag-violet">Fixed price</span>
          <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
            Agent Survival Report.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-black/76">
            Clear scope. Clear price. {displayPrice} for the full report.
          </p>
          <div className="space-y-2 text-base leading-8 text-black/78">
            <p>A blunt /10 review of whether your product works for AI agents — with a shareable PDF your team can act on.</p>
            <p>No workshop. No discovery call. No consultancy theatre.</p>
          </div>
          <Link href="/blog/sample-audit-balsamiq" className="neo-link inline-block text-sm font-bold">
            Read a real sample audit first
          </Link>
        </div>

        <div className="neo-panel bg-white p-6 sm:p-8">
          <div className="space-y-5">
            <p className="neo-kicker">What you get</p>
            <ul className="space-y-3 text-base leading-7 text-black/78">
              <li>/10 agent-readiness score across API, auth, data, interfaces, permissions, and observability</li>
              <li>Plain-English verdict on where your product stands right now</li>
              <li>Agent Survival Report PDF — shareable with your team or board</li>
              <li>15-minute async Loom walkthrough of every finding</li>
              <li>Three specific changes to make next, prioritised by impact</li>
              <li>Delivered to your Stripe checkout email within 48 hours</li>
            </ul>
            <div className="border-t-[3px] border-black pt-4 text-sm font-bold text-black/72">
              {displayPrice}. Not useful? Full refund, no questions asked.
            </div>
          </div>
        </div>
      </section>

      <section className="neo-panel bg-muted p-6 sm:p-8">
        <div className="grid gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold" htmlFor="url">
              Product URL <span className="text-accent">*</span>
            </label>
            <input
              id="url"
              type="text"
              inputMode="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://yourproduct.com"
              className={`neo-input text-sm ${attempted && !urlValid ? "border-accent" : ""}`}
            />
            {attempted && !urlValid && (
              <p className="text-sm font-bold text-accent">We need the URL of the product to audit</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold" htmlFor="request">
              What should Gary focus on? <span className="text-accent">*</span>
            </label>
            <textarea
              id="request"
              value={reviewRequest}
              onChange={(e) => setReviewRequest(e.target.value)}
              placeholder="e.g. We have a decent API but I suspect auth, onboarding, and positioning are blocking adoption."
              rows={6}
              className={`neo-input resize-none text-sm ${attempted && !requestValid ? "border-accent" : ""}`}
            />
            {attempted && !requestValid ? (
              <p className="text-sm font-bold text-accent">
                Tell us what to focus on ({reviewRequest.trim().length}/20 characters)
              </p>
            ) : (
              <p className="text-sm text-black/60">Minimum 20 characters.</p>
            )}
          </div>

          <label className={`neo-panel flex cursor-pointer items-start gap-3 p-4 text-sm leading-7 text-black/76 ${attempted && !consented ? "border-accent bg-red-50" : "bg-white"}`}>
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-[#FF6B6B]"
            />
            <span>
              I agree to immediate commencement of the digital service and acknowledge that I thereby waive my 14-day right of withdrawal (§356 para. 5 BGB).
            </span>
          </label>

          <button type="button" onClick={onCheckout} disabled={isLoading} className="neo-button w-full">
            {isLoading ? "Redirecting to Stripe..." : `PAY ${displayPrice} — GET THE REPORT`}
          </button>

          {attempted && issues.length > 0 && (
            <div className="rounded-lg border-[3px] border-accent bg-red-50 p-4">
              <p className="mb-2 text-sm font-black text-accent">Almost there — fix these first:</p>
              <ul className="space-y-1">
                {issues.map((issue) => (
                  <li key={issue} className="text-sm font-bold text-accent">→ {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {error ? <p className="text-sm font-bold text-accent">{error}</p> : null}

          <p className="text-center text-xs leading-6 text-black/62">
            Secure checkout via Stripe · Philip Bennett – Punk Leadership · VAT DE306641412
          </p>
        </div>
      </section>

      <section className="neo-panel bg-accent-yellow p-6 sm:p-8">
        <div className="space-y-4">
          <p className="neo-kicker">Want more depth?</p>
          <h2 className="text-3xl font-black tracking-[-0.05em] sm:text-4xl">
            Full consulting — €299
          </h2>
          <p className="max-w-2xl text-base leading-8 text-black/78">
            Same framework, delivered by Phil Bennett (ex-Klarna, 20yr CTO). Includes a 60-minute strategy session, full remediation roadmap, and 30 days of follow-up.
          </p>
          <Link href="/consulting" className="neo-button block w-full text-center sm:inline-block sm:w-auto">
            LEARN MORE →
          </Link>
        </div>
      </section>
    </div>
  );
}
