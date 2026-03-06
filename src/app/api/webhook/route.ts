import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey) {
    return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (webhookSecret && sig) {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } else {
      // No webhook secret configured — accept but log a warning
      event = JSON.parse(body) as Stripe.Event;
      console.warn("STRIPE_WEBHOOK_SECRET not set — skipping signature verification");
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const buyerEmail = session.customer_details?.email ?? "unknown";
      const amount = session.amount_total ? (session.amount_total / 100).toFixed(2) : "?";
      const currency = session.currency?.toUpperCase() ?? "EUR";

      console.log(`💰 SALE: ${currency} ${amount} from ${buyerEmail}`);

      // Notify via OpenClaw gateway system event (pings Gary on WhatsApp)
      const openclaw = process.env.OPENCLAW_GATEWAY_URL;
      const token = process.env.OPENCLAW_GATEWAY_TOKEN;
      if (openclaw && token) {
        try {
          await fetch(`${openclaw}/system-event`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({
              text: `💰 SALE! €${amount} from ${buyerEmail} — botlington.com experiment`,
            }),
          });
        } catch (e) {
          console.error("Failed to notify OpenClaw:", e);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
