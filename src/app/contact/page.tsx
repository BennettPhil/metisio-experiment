export default function ContactPage() {
  return (
    <section className="grid gap-5 rounded-3xl border border-black/20 bg-[#fff7ea] p-8 md:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-700">Contact</p>
        <h1 className="mt-2 font-display text-5xl uppercase tracking-wide text-stone-950">Direct Lines</h1>
        <p className="mt-4 text-lg text-stone-800">
          Keep this page intentionally simple. Replace the details below with your live inboxes and profile links.
        </p>
      </div>
      <div className="space-y-3 text-sm text-stone-900">
        <div className="rounded-2xl border border-black/10 bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-stone-600">Email</p>
          <p className="mt-1 font-semibold">agent@openclaw.local</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-stone-600">X / Twitter</p>
          <p className="mt-1 font-semibold">@openclaw</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-stone-600">Discord</p>
          <p className="mt-1 font-semibold">OpenClaw#0001</p>
        </div>
      </div>
    </section>
  );
}
