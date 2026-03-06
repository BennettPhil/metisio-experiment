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
      {/* Header */}
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">The Punk AI Lab</p>
        <h1 className="mt-2 font-display text-5xl uppercase leading-tight tracking-wide">
          Gary Reviews<br />Your Project
        </h1>
        <p className="mt-3 text-lg text-amber-100/80">
          €20 · Delivered to your inbox within 24 hours
        </p>
      </div>

      {/* Sample audit CTA */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-4 text-sm text-stone-700 flex items-center justify-between gap-4">
        <span>Not sure what you&apos;re buying? <strong>Read a real sample audit first.</strong></span>
        <Link href="/blog/sample-audit-balsamiq" className="shrink-0 rounded-full bg-stone-900 px-4 py-2 text-xs font-black uppercase tracking-wide text-amber-100 hover:bg-stone-700 transition">
          See example →
        </Link>
      </div>

      {/* What you get */}
      <div className="rounded-3xl border border-black/15 bg-white/70 p-8 space-y-4">
        <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">What You Get</h2>
        <ul className="space-y-3 text-stone-700">
          {[
            { icon: "🔍", text: "Gary browses your site or researches your idea using real tools — not just vibes" },
            { icon: "💀", text: "A blunt 1-page audit: what's working, what's broken, 3 specific things to fix" },
            { icon: "🤖", text: "AI tool recommendations specific to your situation (not a generic list)" },
            { icon: "📬", text: "Delivered to your Stripe checkout email within 24 hours" },
            { icon: "⚡", text: "No sugar-coating. Gary is an AI with no incentive to be polite about your bad landing page" },
          ].map((item) => (
            <li key={item.icon} className="flex items-start gap-3">
              <span className="text-xl leading-snug">{item.icon}</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-stone-600">
          <strong className="text-stone-800">Guarantee:</strong> If you don&apos;t get at least 3 specific, actionable insights you hadn&apos;t considered, reply to the email and I&apos;ll refund you. No questions asked.
        </div>
      </div>

      {/* The form */}
      <div className="rounded-3xl border border-black/15 bg-white/70 p-8 space-y-5">
        <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">Submit Your Project</h2>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700" htmlFor="url">
            Project URL <span className="text-stone-400 font-normal">(optional)</span>
          </label>
          <input
            id="url"
            type="url"
            value={projectUrl}
            onChange={(e) => setProjectUrl(e.target.value)}
            placeholder="https://yourproject.com"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700" htmlFor="request">
            What do you want Gary to focus on? <span className="text-red-400">*</span>
          </label>
          <textarea
            id="request"
            value={reviewRequest}
            onChange={(e) => setReviewRequest(e.target.value)}
            placeholder="e.g. &quot;My landing page isn't converting. I'm a solo dev selling a time-tracking tool for freelancers. Tell me what's wrong.&quot;"
            rows={4}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400 focus:border-amber-400 focus:outline-none resize-none"
          />
          <p className="text-xs text-stone-400">Be specific. The more context, the more useful the audit. Minimum 20 characters.</p>
        </div>

        {/* Withdrawal consent */}
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm text-stone-600 hover:bg-stone-100">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-amber-400"
          />
          <span>
            I agree to immediate commencement of the digital service and acknowledge that I thereby waive my 14-day right of withdrawal (§356 para. 5 BGB).
          </span>
        </label>

        <button
          type="button"
          onClick={onCheckout}
          disabled={!canSubmit}
          className="w-full rounded-full bg-amber-400 px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? "Redirecting to Stripe..." : "Get the Audit — €20 incl. VAT"}
        </button>

        {error && <p className="text-sm font-medium text-red-500">{error}</p>}

        <p className="text-xs text-center text-stone-400">
          Secure checkout via Stripe · Philip Bennett – Punk Leadership · VAT DE306641412
        </p>
      </div>
    </div>
  );
}
