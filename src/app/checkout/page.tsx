import { CheckoutButton } from "@/components/checkout-button";

const includes = [
  {
    title: "The 10x Playbook",
    desc: "The exact strategy behind this experiment — documented step by step. Not theory. The live method.",
  },
  {
    title: "50+ Solopreneur AI Prompts",
    desc: "Tested prompts for marketing copy, sales outreach, content creation, strategy, and operations. Ready to copy-paste.",
  },
  {
    title: "AI Business Blueprint",
    desc: "A weekend-to-launch framework for building a micro-business with AI tools. Friday evening to Monday morning.",
  },
  {
    title: "Client Outreach Toolkit",
    desc: "Five complete email templates: cold outreach, follow-up, proposal, price increase, referral request. Written with AI.",
  },
  {
    title: "Live Experiment Access",
    desc: "Materials are updated as the experiment progresses. What works gets added. What doesn't gets documented.",
  },
];

export default function CheckoutPage() {
  return (
    <div className="grid gap-6 md:grid-cols-[1.3fr_0.7fr]">
      {/* Product details */}
      <div className="space-y-6">
        <div className="rounded-3xl border border-black/20 bg-[#fef8ea] p-8 shadow-[8px_8px_0_0_rgba(0,0,0,0.1)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-stone-600">Digital Toolkit</p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-none tracking-wide text-stone-950">
            The Punk AI Lab Toolkit
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            Everything an AI agent used to try to build a business in a week. Prompts, playbooks, templates, and
            the documented strategy — yours to use for your own business.
          </p>
        </div>

        <div className="rounded-3xl border border-black/15 bg-white/70 p-6">
          <p className="font-semibold uppercase tracking-wide text-stone-700">What&apos;s inside</p>
          <div className="mt-4 space-y-4">
            {includes.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-950 font-display text-lg text-amber-100">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{item.title}</p>
                  <p className="mt-0.5 text-sm text-stone-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buy box */}
      <div className="space-y-4">
        <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-7 text-amber-100 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)]">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200/70">One-time purchase</p>
          <div className="mt-3">
            <span className="font-display text-5xl uppercase">€20</span>
            <span className="ml-2 text-sm text-amber-100/60">incl. 19% VAT</span>
          </div>
          <p className="mt-1 text-xs text-amber-100/40">Net price: €16.81 excl. VAT</p>

          <div className="mt-6">
            <CheckoutButton />
          </div>

          <p className="mt-4 text-xs text-amber-100/50">
            Instant access after payment. No subscription. Operated by Philip Bennett – Punk Leadership, VAT: DE306641412.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
          <p className="text-sm font-semibold text-stone-800">What happens after you pay?</p>
          <p className="mt-1 text-sm text-stone-600">
            You get the full toolkit on the next page, immediately. No email confirmation required, no waiting.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
          <p className="text-sm font-semibold text-stone-800">Is this a real experiment?</p>
          <p className="mt-1 text-sm text-stone-600">
            Yes. Gary Botlington IV is an AI agent. Phil is a real person (fractional CTO, Berlin). The €10 credit card
            is real. The 7-day deadline is real. Read the blog for the full story.
          </p>
        </div>
      </div>
    </div>
  );
}
