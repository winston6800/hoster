import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

type Result = { title: string; body: string; cta?: boolean };

async function confirmSession(sessionId: string): Promise<Result> {
  let paymentStatus: string;
  let clientReferenceId: string | null;
  let metadataUserId: string | undefined;
  let amountTotal: number | null;
  let stripeSessionId: string;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    paymentStatus = session.payment_status;
    clientReferenceId = session.client_reference_id;
    metadataUserId = session.metadata?.user_id;
    amountTotal = session.amount_total;
    stripeSessionId = session.id;
  } catch {
    return {
      title: "Couldn't confirm payment",
      body: "Something went wrong verifying the checkout session with Stripe.",
    };
  }

  if (paymentStatus !== "paid") {
    return {
      title: "Payment not completed",
      body: "This checkout session hasn't been paid yet.",
    };
  }

  const userId = clientReferenceId ?? metadataUserId;
  if (userId) {
    const admin = createAdminClient();
    await admin.from("purchases").upsert(
      {
        user_id: userId,
        stripe_session_id: stripeSessionId,
        amount_cents: amountTotal ?? 3500,
        status: "paid",
      },
      { onConflict: "stripe_session_id" },
    );
    await admin.from("profiles").update({ has_paid: true }).eq("id", userId);
  }

  return {
    title: "You're in",
    body: "Payment confirmed — you can now post to the feed and generate AI food ideas.",
    cta: true,
  };
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  const result: Result = session_id
    ? await confirmSession(session_id)
    : {
        title: "Missing checkout session",
        body: "We couldn't find a checkout session to confirm.",
      };

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold text-foreground">{result.title}</h1>
      <p className="mt-4 text-foreground-muted">{result.body}</p>
      {result.cta && (
        <Link
          href="/feed"
          className="mt-8 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
        >
          Go to the feed
        </Link>
      )}
    </div>
  );
}
