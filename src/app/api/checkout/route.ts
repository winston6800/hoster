import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getStripe, PRICE_USD_CENTS } from "@/lib/stripe";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  const origin = new URL(request.url).origin;

  let stripe;
  try {
    stripe = getStripe();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Stripe is not configured." },
      { status: 500 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: PRICE_USD_CENTS,
          product_data: {
            name: "MealTrail — lifetime access",
            description: "One-time purchase: post meal preps, get AI food ideas.",
          },
        },
        quantity: 1,
      },
    ],
    client_reference_id: user.id,
    metadata: { user_id: user.id },
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/join`,
  });

  return NextResponse.json({ url: session.url });
}
