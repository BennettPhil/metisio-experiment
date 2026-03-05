import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/85">Payment Complete</p>
      <h1 className="mt-2 font-display text-5xl uppercase tracking-wide">Order Received</h1>
      <p className="mt-4 max-w-2xl text-lg text-amber-100/90">
        Stripe confirmed the checkout session. Customize this page with your delivery instructions or onboarding steps.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-full border border-amber-100/30 px-5 py-2 text-sm font-semibold uppercase tracking-[0.14em] transition hover:bg-amber-100 hover:text-[#0f121e]"
      >
        Back To Home
      </Link>
    </section>
  );
}
