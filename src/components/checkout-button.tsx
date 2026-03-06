"use client";

import { useState } from "react";

export function CheckoutButton() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [consented, setConsented] = useState(false);

  async function onCheckout() {
    if (!consented) return;
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const payload: { error?: string; url?: string } = await response.json();

      if (!response.ok || !payload.url) {
        throw new Error(payload.error ?? "Unable to start checkout.");
      }

      window.location.assign(payload.url);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Withdrawal consent — required for German digital goods */}
      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-amber-100/20 bg-white/5 p-3 text-sm text-amber-100/80 hover:bg-white/10">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-amber-400"
        />
        <span>
          I agree to immediate delivery of digital content and acknowledge that I thereby waive my 14-day right of
          withdrawal (§356 para. 5 BGB). This does not affect my statutory rights.
        </span>
      </label>

      <button
        type="button"
        onClick={onCheckout}
        disabled={!consented || isLoading}
        className="w-full rounded-full bg-amber-400 px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-stone-950 transition hover:-translate-y-0.5 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "Redirecting to Stripe..." : "Get The Toolkit — €20"}
      </button>

      {error && <p className="text-sm font-medium text-red-400">{error}</p>}
    </div>
  );
}
