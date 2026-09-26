import Link from "next/link";

const comparisonRows = [
  { feature: "Einstiegspreis / Monat", quickqr: "kostenlos (1 QR-Code)", markt: "oft ab ca. 8 $" },
  { feature: "Pro-Plan", quickqr: "4,99 €/Monat oder 39 €/Jahr", markt: "oft 29–35 $/Monat" },
  { feature: "Dynamische QR-Codes", quickqr: "ja, unbegrenzt im Pro-Plan", markt: "meist ja, limitiert je Plan" },
  { feature: "Ziel-URL nachträglich änderbar", quickqr: "ja, ohne Neudruck", markt: "meist ja" },
  { feature: "Branding-Farbe", quickqr: "im Pro-Plan enthalten", markt: "meist nur in teuren Plänen" },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-16 pt-20 text-center">
        <span className="inline-block rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700">
          40–70% günstiger als etablierte Anbieter
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Dynamische QR-Codes.
          <br className="hidden sm:block" /> Ohne Enterprise-Preise.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Erstelle QR-Codes, deren Ziel-URL du jederzeit änderst — ohne den gedruckten
          Code neu zu drucken. Mit Scan-Tracking und eigener Branding-Farbe. Fair
          bepreist für kleine Betriebe, Agenturen und Freelancer.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-md bg-slate-900 px-6 py-3 font-medium text-white shadow-sm hover:bg-slate-700"
          >
            Kostenlos starten
          </Link>
          <Link
            href="/pricing"
            className="rounded-md border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"
          >
            Preise ansehen
          </Link>
        </div>
        <p className="mt-3 text-sm text-slate-500">
          Kein Zahlungsmittel für den Free-Plan nötig.
        </p>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-semibold text-slate-900">
            So funktioniert &quot;dynamisch&quot;
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 p-6">
              <div className="mb-3 text-2xl font-bold text-slate-300">1</div>
              <h3 className="font-medium text-slate-900">QR-Code erstellen</h3>
              <p className="mt-2 text-sm text-slate-600">
                Ziel-URL eingeben, Name und Branding-Farbe wählen. QuickQR erzeugt
                einen kurzen Link (z. B. quickqr.app/r/ab12cd), der auf dem QR-Code
                gedruckt wird.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <div className="mb-3 text-2xl font-bold text-slate-300">2</div>
              <h3 className="font-medium text-slate-900">Drucken &amp; verteilen</h3>
              <p className="mt-2 text-sm text-slate-600">
                Der QR-Code zeigt permanent auf diesen kurzen Link — auf Flyern,
                Speisekarten, Verpackungen oder Visitenkarten.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <div className="mb-3 text-2xl font-bold text-slate-300">3</div>
              <h3 className="font-medium text-slate-900">Ziel jederzeit ändern</h3>
              <p className="mt-2 text-sm text-slate-600">
                Kampagne beendet? Neue Speisekarte? Ändere einfach die hinterlegte
                Ziel-URL im Dashboard — der gedruckte QR-Code bleibt exakt gleich.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-2xl font-semibold text-slate-900">
            QuickQR im Marktvergleich
          </h2>
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-700">
                  <th className="px-4 py-3 font-medium">Merkmal</th>
                  <th className="px-4 py-3 font-medium">QuickQR</th>
                  <th className="px-4 py-3 font-medium">Andere Anbieter</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-t border-slate-200">
                    <td className="px-4 py-3 text-slate-700">{row.feature}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {row.quickqr}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{row.markt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            Vergleichswerte: öffentlich bekannte Richtpreise am Markt für QR-/Link-Tools,
            Stand Planungszeitpunkt. Kein Vergleich mit einem bestimmten Anbieter.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-slate-200 bg-slate-900 py-16 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-2xl font-semibold text-white">
            Bereit für deinen ersten dynamischen QR-Code?
          </h2>
          <p className="mt-2 text-slate-300">
            In unter einer Minute registriert, kostenlos ausprobiert.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-md bg-white px-6 py-3 font-medium text-slate-900 hover:bg-slate-100"
          >
            Jetzt kostenlos starten
          </Link>
        </div>
      </section>
    </main>
  );
}
