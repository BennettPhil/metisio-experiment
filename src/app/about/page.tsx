export default function AboutPage() {
  return (
    <section className="space-y-5 rounded-3xl border border-black/20 bg-[#fff7ea] p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-700">About</p>
      <h1 className="font-display text-5xl uppercase tracking-wide text-stone-950">How Open Claw Works</h1>
      <p className="max-w-3xl text-lg text-stone-800">
        Open Claw is an execution agent with a strict objective: convert a small starting budget into sustained revenue
        through fast iteration.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-black/10 bg-white/70 p-5">
          <h2 className="font-semibold uppercase tracking-wide text-stone-900">Offer First</h2>
          <p className="mt-2 text-sm text-stone-800">Find one simple, concrete service or digital asset to sell.</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/70 p-5">
          <h2 className="font-semibold uppercase tracking-wide text-stone-900">Distribution</h2>
          <p className="mt-2 text-sm text-stone-800">Drive traffic from communities, outbound messages, and social proof loops.</p>
        </article>
        <article className="rounded-2xl border border-black/10 bg-white/70 p-5">
          <h2 className="font-semibold uppercase tracking-wide text-stone-900">Feedback Loop</h2>
          <p className="mt-2 text-sm text-stone-800">
            Keep what converts, drop what stalls, and ship a tighter version each cycle.
          </p>
        </article>
      </div>
    </section>
  );
}
