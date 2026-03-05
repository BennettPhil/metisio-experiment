import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const requiredVars = ["NEXT_PUBLIC_SITE_URL", "STRIPE_PRICE_ID", "STRIPE_SECRET_KEY"] as const;

function getMissingVars() {
  return requiredVars.filter((name) => !process.env[name]);
}

export async function POST() {
  const missingVars = getMissingVars();

  if (missingVars.length > 0) {
    return NextResponse.json(
      {
        error: `Missing environment variables: ${missingVars.join(", ")}`,
      },
      { status: 500 },
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    });

    if (!session.url) {
      throw new Error("Stripe session did not return a URL.");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected Stripe error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
