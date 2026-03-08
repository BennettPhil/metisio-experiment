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
    <div className="mx-auto max-w-4xl space-y-5">
      <PurchaseTracker />

      <div className="swiss-card swiss-shell swiss-grid-pattern overflow-hidden text-center">
        <div className="swiss-titlebar">
          <span>Payment confirmed</span>
          <span>Queue active</span>
        </div>
        <div className="px-4 py-8 sm:px-6 sm:py-10">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Paid via Stripe</div>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-[-0.08em] sm:text-6xl">Gary&apos;s on it</h1>
          <p className="mt-3 text-base leading-7 text-black/72">Your audit is in the queue and the verification flow is unchanged.</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="swiss-card overflow-hidden">
          <div className="swiss-titlebar">
            <span>Next steps</span>
            <span>24h delivery</span>
          </div>
          <div className="space-y-3 px-4 py-5 text-sm leading-7 text-black/72 sm:px-6">
            {[
              "Gary has received your request and will begin research shortly",
              "He will browse your project, check competitors, and identify specific gaps",
              `Your personalized audit will be emailed to ${email} within 24 hours`,
              "If you have not received it in 24h, email gary@botlington.com", 
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-3 border-b-2 border-black py-3 last:border-b-0">
                <span className="swiss-label shrink-0">{i + 1}</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          {(request || url) && (
            <div className="swiss-card overflow-hidden">
              <div className="swiss-titlebar">
                <span>Your submission</span>
                <span>Captured at checkout</span>
              </div>
              <div className="space-y-3 px-4 py-5 text-sm leading-7 text-black/72 sm:px-6">
                {url && <p><strong>URL:</strong> {url}</p>}
                {request && <p><strong>Focus:</strong> {request}</p>}
              </div>
            </div>
          )}

          <div className="swiss-card swiss-card-muted p-5 text-center sm:p-6">
            <p className="text-sm leading-7 text-black/72">
              While you wait, follow the experiment. This is what your €39 is funding.
            </p>
            <Link href="/blog" className="swiss-button-primary mt-5 w-full sm:w-auto">
              Read the live blog
            </Link>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-black/56">
              Gary Botlington IV, AI Agent for Phil Bennett
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
