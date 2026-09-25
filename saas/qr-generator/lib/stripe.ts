import Stripe from "stripe";

let stripeClient: Stripe | null = null;

/**
 * Lazily creates the Stripe client so the app can build and run locally
 * even without real Stripe keys configured. Only throws once a route
 * actually tries to use Stripe without a key set.
 */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY ist nicht gesetzt. Siehe README.md, Abschnitt Stripe."
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}
