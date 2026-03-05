"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  disabled?: boolean;
};

export function CheckoutButton({ disabled = false }: CheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onCheckout() {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

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
    <div className="space-y-3">
      <button
        type="button"
        onClick={onCheckout}
        disabled={disabled || isLoading}
        className="w-full rounded-full bg-accent px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#fff8e3] transition hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Redirecting..." : "Pay With Stripe Checkout"}
      </button>
      {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}
    </div>
  );
}
