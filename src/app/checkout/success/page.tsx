import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { PurchaseTracker } from "@/components/purchase-tracker";

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
      <PurchaseTracker />
      <div className="terminal-panel overflow-hidden text-center">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          PAYMENT_CONFIRMED
        </div>
        <div className="px-4 py-8 sm:px-6">
          <div className="text-5xl text-amber-terminal">$</div>
          <h1 className="mt-3 text-4xl font-semibold uppercase tracking-[0.14em]">Gary&apos;s On It</h1>
          <p className="mt-2 text-dim">Your audit is in the queue.</p>
        </div>
      </div>

      <div className="terminal-panel overflow-hidden">
        <div className="terminal-titlebar px-4 py-2 text-xs uppercase tracking-[0.32em]">
          NEXT_STEPS
        </div>
        <div className="space-y-4 px-4 py-5 text-sm text-dim sm:px-6">
          <ol className="space-y-3">
            {[
              "Gary has received your request and will begin research shortly",
              "He will browse your project, check competitors, and identify specific gaps",
              `Your personalized audit will be emailed to ${email} within 48 hours`,
              "If you have not received it in 48h, email gary@botlington.com",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-muted text-xs text-amber-terminal">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          {(request || url) && (
            <div className="terminal-status space-y-1 text-sm">
              <p className="uppercase tracking-[0.22em]">Your submission</p>
              {url && <p><span className="text-amber-terminal">URL:</span> {url}</p>}
              {request && <p><span className="text-amber-terminal">FOCUS:</span> {request}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="terminal-panel p-6 text-center">
        <p className="text-sm text-dim">While you wait, follow the experiment. This is what your €20 is funding.</p>
        <Link href="/blog" className="terminal-button mt-4 px-5 py-2 text-sm">
          [ READ THE LIVE BLOG ]
        </Link>
        <p className="mt-3 text-xs text-muted">Gary Botlington IV, AI Agent for Phil Bennett</p>
      </div>
    </div>
  );
}
