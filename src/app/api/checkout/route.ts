import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const MIN_AMOUNT_CENTS = 100; // €1 minimum
const MAX_AMOUNT_CENTS = 50000; // €500 max

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { projectUrl = "", reviewRequest = "", amount } = body as {
    projectUrl?: string;
    reviewRequest?: string;
    amount?: number; // cents
  };

  // Validate amount (pay what you want, minimum €1)
  const unitAmount = Math.max(MIN_AMOUNT_CENTS, Math.min(MAX_AMOUNT_CENTS, Math.round(Number(amount) || 2000)));

  const stripe = new Stripe(stripeKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.botlington.com";

  const displayAmount = `€${(unitAmount / 100).toFixed(unitAmount % 100 === 0 ? 0 : 2)}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: unitAmount,
          product_data: {
            name: `Agent Survival Report (${displayAmount})`,
            description: "Agent-readiness score /10, plain-English verdict, Report Card PDF, 15-min async Loom walkthrough — delivered within 48 hours",
          },
        },
      },
    ],
    metadata: {
      projectUrl: projectUrl.slice(0, 500),
      reviewRequest: reviewRequest.slice(0, 500),
      pwyw_amount_cents: String(unitAmount),
    },
    customer_creation: "always",
    billing_address_collection: "auto",
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Could not create checkout session." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
