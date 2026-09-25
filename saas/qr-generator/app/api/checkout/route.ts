import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

/**
 * Creates a Stripe Checkout Session for the Pro plan.
 *
 * TODO before going live:
 * 1. Create real "Pro Monthly" (4,99 EUR) and "Pro Yearly" (39 EUR)
 *    Products/Prices in the Stripe Dashboard (test mode first, then live).
 * 2. Set STRIPE_PRICE_ID_MONTHLY / STRIPE_PRICE_ID_YEARLY in .env to those
 *    Price IDs (they look like "price_1AbC...").
 * 3. Set STRIPE_SECRET_KEY / STRIPE_PUBLISHABLE_KEY to real (test or live) keys.
 * 4. Set up a webhook endpoint pointing at /api/webhooks/stripe and put its
 *    signing secret into STRIPE_WEBHOOK_SECRET (see that route for details).
 *
 * Until then, this route responds with 501 so the rest of the app keeps
 * working without real Stripe credentials.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const interval = body?.interval === "yearly" ? "yearly" : "monthly";

  const priceId =
    interval === "yearly"
      ? process.env.STRIPE_PRICE_ID_YEARLY
      : process.env.STRIPE_PRICE_ID_MONTHLY;

  if (!process.env.STRIPE_SECRET_KEY || !priceId || priceId.includes("replace_me")) {
    return NextResponse.json(
      {
        error:
          "Stripe ist noch nicht konfiguriert (fehlende STRIPE_SECRET_KEY / Price-ID). " +
          "Siehe README.md und die TODO-Kommentare in app/api/checkout/route.ts.",
      },
      { status: 501 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "Nutzer nicht gefunden." }, { status: 404 });
  }

  const stripe = getStripe();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.stripeCustomerId ? undefined : user.email,
    customer: user.stripeCustomerId ?? undefined,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/dashboard?checkout=success`,
    cancel_url: `${appUrl}/pricing?checkout=cancelled`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
