import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export default function PricingPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-16">
      <div className="mx-auto w-full max-w-4xl text-center">
        <h1 className="text-3xl font-bold text-slate-900">Einfache, faire Preise</h1>
        <p className="mt-2 text-slate-600">
          Bewusst 40–70% günstiger als etablierte Anbieter. Kein verstecktes Kleingedrucktes.
        </p>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-4xl gap-8 sm:grid-cols-2">
        {/* Free plan */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-8">
          <h2 className="text-lg font-semibold text-slate-900">Free</h2>
          <p className="mt-1 text-sm text-slate-500">Zum Ausprobieren</p>
          <p className="mt-6 text-4xl font-bold text-slate-900">
            0 €<span className="text-base font-normal text-slate-500">/Monat</span>
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
            <li>✓ 1 dynamischer QR-Code</li>
            <li>✓ Scan-Zähler &amp; Statistik</li>
            <li className="text-slate-400">✗ Kein Branding (nur Schwarz)</li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 rounded-md border border-slate-300 px-4 py-2.5 text-center font-medium text-slate-700 hover:bg-slate-50"
          >
            Kostenlos starten
          </Link>
        </div>

        {/* Pro plan */}
        <div className="flex flex-col rounded-xl border-2 border-slate-900 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Pro</h2>
            <span className="rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-medium text-white">
              Beliebt
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">Für Unternehmen &amp; Agenturen</p>
          <p className="mt-6 text-4xl font-bold text-slate-900">
            4,99 €<span className="text-base font-normal text-slate-500">/Monat</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            oder 39 €/Jahr (spart ca. 35%)
          </p>
          <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
            <li>✓ Unbegrenzt viele dynamische QR-Codes</li>
            <li>✓ Eigene Branding-Farbe je QR-Code</li>
            <li>✓ Scan-Zähler &amp; Statistik (7-Tage-Übersicht)</li>
            <li>✓ Self-Service-Support per FAQ/Doku</li>
          </ul>
          <div className="mt-8 flex flex-col gap-2">
            <CheckoutButton interval="monthly" label="Pro monatlich (4,99 €)" />
            <CheckoutButton interval="yearly" label="Pro jährlich (39 €)" />
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-slate-500">
        Hinweis (MVP): Die Zahlungsabwicklung läuft über Stripe im Testmodus. Bis echte
        Stripe-Keys hinterlegt sind, zeigt der Checkout-Button einen Hinweis statt
        einer echten Zahlung.
      </p>
    </main>
  );
}
