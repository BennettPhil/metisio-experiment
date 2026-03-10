import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const FIXED_AMOUNT_CENTS = 3900; // €39 fixed price

export async function POST(req: NextRequest) {
  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      console.error("[checkout] STRIPE_SECRET_KEY not set");
      return NextResponse.json({ error: "Stripe not configured." }, { status: 500 });
    }

    const body = await req.json().catch(() => ({}));
    const { projectUrl = "", reviewRequest = "" } = body as {
      projectUrl?: string;
      reviewRequest?: string;
    };

    const unitAmount = FIXED_AMOUNT_CENTS;

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
              name: `Agent Readiness Audit (${displayAmount})`,
              description:
                "Agent survival assessment, plain-English verdict, Report Card PDF, 15-min async Loom walkthrough — delivered within 48 hours",
            },
          },
        },
      ],
      metadata: {
        projectUrl: projectUrl.slice(0, 500),
        reviewRequest: reviewRequest.slice(0, 500),
        fixed_amount_cents: String(unitAmount),
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[checkout] Error creating session:", message);
    return NextResponse.json({ error: `Checkout failed: ${message}` }, { status: 500 });
  }
}
