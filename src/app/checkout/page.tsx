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
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-5">
          <span className="neo-tag neo-tag-violet">Checkout</span>
          <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
            Buy the audit.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-black/76">
            €20. Delivered within 48 hours. Same working checkout, now with the right visual hierarchy.
          </p>
          <div className="space-y-2 text-base leading-8 text-black/78">
            <p>You get a score, a verdict, and the first fixes worth shipping.</p>
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
              <li>Agent-readiness score across API, auth, data, interfaces, permissions, and observability</li>
              <li>Positioning and conversion notes where the site is helping or hurting you</li>
              <li>Three specific changes to make next</li>
              <li>Delivered to your Stripe checkout email within 48 hours</li>
            </ul>
            <div className="border-t-[3px] border-black pt-4 text-sm font-bold text-black/72">
              Guarantee: if the audit does not produce at least 3 useful next actions, reply and get refunded.
            </div>
          </div>
        </div>
      </section>

      <section className="neo-panel bg-muted p-6 sm:p-8">
        <div className="grid gap-5">
          <div className="space-y-2">
            <label className="text-sm font-bold" htmlFor="url">
              Project URL <span className="text-black/60">(optional)</span>
            </label>
            <input
              id="url"
              type="url"
              value={projectUrl}
              onChange={(e) => setProjectUrl(e.target.value)}
              placeholder="https://yourproject.com"
              className="neo-input text-sm"
            />
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
              className="neo-input resize-none text-sm"
            />
            <p className="text-sm text-black/60">Minimum 20 characters.</p>
          </div>

          <label className="neo-panel flex cursor-pointer items-start gap-3 bg-white p-4 text-sm leading-7 text-black/76">
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

          <button type="button" onClick={onCheckout} disabled={!canSubmit} className="neo-button w-full">
            {isLoading ? "Redirecting to Stripe..." : "GET THE AUDIT - €20"}
          </button>

          {error ? <p className="text-sm font-bold text-accent">{error}</p> : null}

          <p className="text-center text-xs leading-6 text-black/62">
            Secure checkout via Stripe · Philip Bennett – Punk Leadership · VAT DE306641412
          </p>
        </div>
      </section>
    </div>
  );
}
