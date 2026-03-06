import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

// Dynamic pricing — no STRIPE_PRICE_ID needed.
// Price is defined here in code and can be changed without touching Stripe dashboard.
const PRODUCT = {
  name: "The Punk AI Lab Toolkit",
  description: "50+ AI prompts, the 10x Playbook, Business Blueprint & Client Outreach Templates",
  // Price in cents, inclusive of 19% German VAT
  amountCents: 2000, // €20.00
  currency: "eur",
};

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
  }
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return NextResponse.json({ error: "Missing NEXT_PUBLIC_SITE_URL" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: PRODUCT.currency,
            unit_amount: PRODUCT.amountCents,
            product_data: {
              name: PRODUCT.name,
              description: PRODUCT.description,
            },
          },
          quantity: 1,
        },
      ],
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      // Collect billing address for VAT compliance
      billing_address_collection: "auto",
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
