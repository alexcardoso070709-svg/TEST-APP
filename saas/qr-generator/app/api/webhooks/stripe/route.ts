import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Stripe webhook handler skeleton.
 *
 * TODO before going live:
 * 1. In the Stripe Dashboard, add a webhook endpoint pointing at
 *    https://yourdomain.com/api/webhooks/stripe (test mode first).
 * 2. Subscribe at least to: checkout.session.completed,
 *    customer.subscription.updated, customer.subscription.deleted.
 * 3. Copy the endpoint's signing secret into STRIPE_WEBHOOK_SECRET.
 * 4. For local testing, use the Stripe CLI:
 *    `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
 *
 * Without STRIPE_WEBHOOK_SECRET configured, this route responds 501 and
 * does nothing — it will not silently accept unverified requests.
 */
export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret.includes("replace_me")) {
    return NextResponse.json(
      { error: "Stripe-Webhook ist noch nicht konfiguriert." },
      { status: 501 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature ?? "", webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      if (userId) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            plan: "pro",
            stripeCustomerId:
              typeof session.customer === "string" ? session.customer : undefined,
            stripeSubscriptionId:
              typeof session.subscription === "string"
                ? session.subscription
                : undefined,
          },
        });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: "free" },
      });
      break;
    }
    default:
      // Other event types are ignored for the MVP.
      break;
  }

  return NextResponse.json({ received: true });
}
