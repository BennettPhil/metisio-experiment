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
      <label className="terminal-panel flex cursor-pointer items-start gap-3 p-3 text-sm text-dim">
        <input
          type="checkbox"
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#33ff00]"
        />
        <span>
          I agree to immediate delivery of digital content and acknowledge that I thereby waive my 14-day right of withdrawal (§356 para. 5 BGB).
        </span>
      </label>

      <button
        type="button"
        onClick={onCheckout}
        disabled={!consented || isLoading}
        className="terminal-button w-full justify-center px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "[ REDIRECTING TO STRIPE... ]" : "[ GET THE TOOLKIT - €20 ]"}
      </button>

      {error && <p className="text-sm font-medium text-error-terminal">{error}</p>}
    </div>
  );
}
