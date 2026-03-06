import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured." }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));
  const { projectUrl = "", reviewRequest = "" } = body as {
    projectUrl?: string;
    reviewRequest?: string;
  };

  const stripe = new Stripe(stripeKey);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.botlington.com";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: 2000, // €20.00 incl. 19% VAT
          product_data: {
            name: "Gary Reviews Your Project",
            description: "Personalized AI audit — delivered to your inbox within 24 hours",
          },
        },
      },
    ],
    metadata: {
      projectUrl: projectUrl.slice(0, 500),
      reviewRequest: reviewRequest.slice(0, 500),
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
