import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

// Source of truth for marking a purchase paid in production. In this dev
// environment (no stable public URL for Stripe to call), /success also
// confirms the same session directly as a fallback — see that route.
export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET || !signature) {
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 400 },
    );
  }

  let event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${error}` },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id ?? session.metadata?.user_id;

    if (userId) {
      const admin = createAdminClient();
      await admin
        .from("purchases")
        .upsert(
          {
            user_id: userId,
            stripe_session_id: session.id,
            amount_cents: session.amount_total ?? 3500,
            status: "paid",
          },
          { onConflict: "stripe_session_id" },
        );
      await admin.from("profiles").update({ has_paid: true }).eq("id", userId);
    }
  }

  return NextResponse.json({ received: true });
}
