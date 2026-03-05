import { CheckoutButton } from "@/components/checkout-button";

const requiredVars = ["NEXT_PUBLIC_SITE_URL", "STRIPE_PRICE_ID", "STRIPE_SECRET_KEY"] as const;

function getMissingVars() {
  return requiredVars.filter((name) => !process.env[name]);
}

export default function CheckoutPage() {
  const missingVars = getMissingVars();
  const isConfigured = missingVars.length === 0;

  return (
    <section className="grid gap-5 rounded-3xl border border-black/20 bg-[#fff7ea] p-8 md:grid-cols-[1fr_0.9fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-700">Checkout</p>
        <h1 className="mt-2 font-display text-5xl uppercase tracking-wide text-stone-950">One Action Purchase</h1>
        <p className="mt-4 max-w-xl text-lg text-stone-800">
          This page starts a Stripe Checkout Session from your server route so pricing and payment logic can evolve later.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-stone-800">
          <li className="rounded-xl border border-black/10 bg-white/70 p-3">Route: <code>POST /api/checkout</code></li>
          <li className="rounded-xl border border-black/10 bg-white/70 p-3">Mode: One-time payment using <code>STRIPE_PRICE_ID</code></li>
          <li className="rounded-xl border border-black/10 bg-white/70 p-3">
            Success return: <code>/checkout/success</code>
          </li>
        </ul>
      </div>
      <div className="rounded-2xl border border-black/15 bg-white/80 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-700">Launch Checkout</p>
        <p className="mt-2 text-sm text-stone-800">
          {isConfigured
            ? "Environment values are present in this runtime."
            : "Missing environment values in this runtime. Add them to Vercel before going live."}
        </p>
        {!isConfigured ? (
          <p className="mt-3 text-sm text-red-700">Missing: {missingVars.join(", ")}</p>
        ) : null}
        <div className="mt-5">
          <CheckoutButton disabled={!isConfigured} />
        </div>
      </div>
    </section>
  );
}
