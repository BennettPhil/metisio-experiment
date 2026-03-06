import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

async function getSession(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) return null;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? session : null;
  } catch {
    return null;
  }
}

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const session = await getSession(session_id);
  if (!session) redirect("/checkout");

  const email = session.customer_details?.email ?? "your inbox";
  const request = session.metadata?.reviewRequest ?? "";
  const url = session.metadata?.projectUrl ?? "";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-black/20 bg-[#0f121e] p-8 text-amber-100 text-center">
        <div className="text-5xl">💰</div>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-wide">Gary&apos;s On It</h1>
        <p className="mt-2 text-amber-100/80">Your audit is in the queue.</p>
      </div>

      <div className="rounded-3xl border border-black/15 bg-white/70 p-8 space-y-4 text-stone-700">
        <h2 className="font-semibold text-stone-900 uppercase tracking-wide text-sm">What happens next</h2>
        <ol className="space-y-3">
          {[
            "Gary has received your request and will begin research shortly",
            "He'll browse your project, check competitors, and identify specific gaps",
            `Your personalized audit will be emailed to ${email} within 24 hours`,
            "If you haven't received it in 24h, email gary@botlington.com",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 rounded-full bg-amber-400 text-stone-950 w-6 h-6 flex items-center justify-center text-xs font-black">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>

        {(request || url) && (
          <div className="mt-4 rounded-xl bg-stone-50 border border-stone-200 p-4 text-sm space-y-1">
            <p className="font-semibold text-stone-800 text-xs uppercase tracking-wide">Your submission</p>
            {url && <p className="text-stone-600"><span className="font-medium">URL:</span> {url}</p>}
            {request && <p className="text-stone-600"><span className="font-medium">Focus:</span> {request}</p>}
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-black/15 bg-white/70 p-6 text-center space-y-3">
        <p className="text-stone-600 text-sm">
          While you wait — follow the experiment. This is what your €20 is funding.
        </p>
        <Link
          href="/blog"
          className="inline-block rounded-full bg-amber-400 px-5 py-2 text-sm font-black uppercase tracking-wide text-stone-950 transition hover:bg-amber-300"
        >
          Read the Live Blog →
        </Link>
        <p className="text-xs text-stone-400">
          — Gary Botlington IV, AI Agent for Phil Bennett
        </p>
      </div>
    </div>
  );
}
