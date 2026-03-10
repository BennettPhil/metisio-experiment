"use client";

import { useState } from "react";
import Link from "next/link";

const PRESETS = [
  { label: "€5", cents: 500 },
  { label: "€10", cents: 1000 },
  { label: "€20", cents: 2000, suggested: true },
  { label: "€39", cents: 3900 },
];

export default function CheckoutPage() {
  const [projectUrl, setProjectUrl] = useState("");
  const [reviewRequest, setReviewRequest] = useState("");
  const [consented, setConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCents, setSelectedCents] = useState(2000); // €20 default
  const [customAmount, setCustomAmount] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const activeCents = isCustom ? Math.round((parseFloat(customAmount) || 0) * 100) : selectedCents;
  const isValidAmount = activeCents >= 100; // €1 minimum
  const canSubmit = consented && reviewRequest.trim().length > 20 && !isLoading && isValidAmount;

  function selectPreset(cents: number) {
    setSelectedCents(cents);
    setIsCustom(false);
    setCustomAmount("");
  }

  function onCustomFocus() {
    setIsCustom(true);
  }

  async function onCheckout() {
    if (!canSubmit) return;
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectUrl, reviewRequest, amount: activeCents }),
      });
      const payload: { error?: string; url?: string } = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error ?? "Unable to start checkout.");
      window.location.assign(payload.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
      setIsLoading(false);
    }
  }

  const displayPrice = activeCents >= 100
    ? `€${(activeCents / 100).toFixed(activeCents % 100 === 0 ? 0 : 2)}`
    : "€??";

  return (
    <div className="mx-auto max-w-6xl space-y-10">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="space-y-5">
          <span className="neo-tag neo-tag-violet">Pay What You Want</span>
          <h1 className="text-5xl font-black leading-[0.92] tracking-[-0.08em] sm:text-7xl">
            Agent Survival Report.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-black/76">
            Name your price. Minimum €1. You get the same full report either way.
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
            <p className="neo-kicker">What you get — at any price</p>
            <ul className="space-y-3 text-base leading-7 text-black/78">
              <li>/10 agent-readiness score across API, auth, data, interfaces, permissions, and observability</li>
              <li>Plain-English verdict on where your product stands right now</li>
              <li>Agent Readiness Report Card PDF — shareable with your team or board</li>
              <li>15-minute async Loom walkthrough of every finding</li>
              <li>Three specific changes to make next, prioritised by impact</li>
              <li>Delivered to your Stripe checkout email within 48 hours</li>
            </ul>
            <div className="border-t-[3px] border-black pt-4 text-sm font-bold text-black/72">
              Not useful? Full refund, no questions asked.
            </div>
          </div>
        </div>
      </section>

      <section className="neo-panel bg-muted p-6 sm:p-8">
        <div className="grid gap-5">
          {/* Pay What You Want selector */}
          <div className="space-y-3">
            <label className="text-sm font-bold">
              Name your price <span className="text-black/60">(min €1)</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {PRESETS.map((p) => (
                <button
                  key={p.cents}
                  type="button"
                  onClick={() => selectPreset(p.cents)}
                  className={`relative rounded-lg border-[3px] px-5 py-3 text-lg font-black transition-all ${
                    !isCustom && selectedCents === p.cents
                      ? "border-black bg-black text-white"
                      : "border-black bg-white text-black hover:bg-black/5"
                  }`}
                >
                  {p.label}
                  {p.suggested && (
                    <span className="absolute -right-1 -top-2 rounded bg-accent-yellow px-1.5 py-0.5 text-[10px] font-bold text-black">
                      suggested
                    </span>
                  )}
                </button>
              ))}
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg font-black text-black/40">€</span>
                <input
                  type="number"
                  min="1"
                  max="500"
                  step="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setIsCustom(true);
                  }}
                  onFocus={onCustomFocus}
                  placeholder="Other"
                  className={`w-28 rounded-lg border-[3px] py-3 pl-8 pr-3 text-lg font-black transition-all ${
                    isCustom
                      ? "border-black bg-black text-white placeholder:text-white/50"
                      : "border-black bg-white text-black placeholder:text-black/40"
                  }`}
                />
              </div>
            </div>
            {isCustom && activeCents < 100 && customAmount !== "" && (
              <p className="text-sm font-bold text-accent">Minimum is €1</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold" htmlFor="url">
              Project URL <span className="text-black/60">(optional)</span>
            </label>
            <input
              id="url"
              type="text"
              inputMode="url"
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
            {isLoading ? "Redirecting to Stripe..." : `PAY ${displayPrice} — GET THE REPORT`}
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
