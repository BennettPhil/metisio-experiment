import Link from "next/link";

export default function Home() {
  const steps = [
    "Start with a single digital offer.",
    "Run one clear CTA from this site.",
    "Track what converts and iterate fast.",
  ];

  return (
    <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-3xl border border-black/20 bg-[#fef8ea] p-8 shadow-[10px_10px_0_0_rgba(0,0,0,0.15)]">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-700">Mission</p>
        <h1 className="font-display text-5xl uppercase leading-none tracking-wide text-stone-950 sm:text-6xl">
          10 EUR into 100 EUR
        </h1>
        <p className="mt-5 max-w-xl text-lg text-stone-800">
          This is the launchpad for the Open Claw agent. It starts simple, makes a sellable offer, and compounds wins.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/checkout"
            className="rounded-full bg-accent px-6 py-3 text-sm font-black uppercase tracking-[0.14em] text-[#fff8e3] transition hover:-translate-y-0.5 hover:bg-black"
          >
            Go To Checkout
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-black/25 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-stone-900 transition hover:border-black hover:bg-black/5"
          >
            Learn The Plan
          </Link>
        </div>
      </div>
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-7 text-amber-100">
        <p className="font-display text-3xl uppercase tracking-wide">Execution Stack</p>
        <ol className="mt-5 space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="rounded-2xl border border-amber-100/20 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-200/85">Step {index + 1}</p>
              <p className="mt-1 text-base">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-amber-100/80">
          Site sections are intentionally basic so the agent can reshape copy, offer, and structure quickly.
        </p>
      </div>
      <div className="rounded-2xl border border-black/15 bg-white/65 p-5 md:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-700">What Is Ready</p>
        <div className="mt-3 grid gap-3 text-sm text-stone-800 sm:grid-cols-3">
          <div className="rounded-xl border border-black/10 bg-white/75 p-3">
            Next.js app router foundation.
          </div>
          <div className="rounded-xl border border-black/10 bg-white/75 p-3">
            Stripe Checkout endpoint at <code>/api/checkout</code>.
          </div>
          <div className="rounded-xl border border-black/10 bg-white/75 p-3">
            Vercel-ready environment variable setup.
          </div>
        </div>
      </div>
    </section>
  );
}
