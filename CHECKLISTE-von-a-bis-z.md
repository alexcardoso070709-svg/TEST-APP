# Checkliste: Freelancer-Bundle + QuickQR SaaS

Stand: 2026-09-25. [x] = bereits erledigt in diesem Repo. [ ] = noch zu tun, meist weil eigener Account/eigene Identität nötig.

## A. Recherche & Planung

- [x] Marktrecherche: wofür zahlen Leute (Einmalkauf/Abo) — `RESEARCH-guenstigere-alternativen.md` — 0 EUR
- [x] 100 Ideen gesammelt, intern bewertet (ROI/Aufwand/Markt) — 0 EUR
- [x] Top-10-Auswahl getroffen, Bundle + QR-SaaS ausgewählt — 0 EUR
- [x] Launch-Plan mit Kosten/Prognosen — `PLAN-bundle-und-saas-start.md` — 0 EUR
- [x] Positionierung, Zielkunden, 12-Monats-Prognose ergänzt — 0 EUR

## B. Bundle bauen (Notion-Vorlagen + Excel-Rechner)

- [x] Excel-Rechner-Set gebaut, Formeln geprüft (0 Fehler) — `bundle/excel-rechner/` — 0 EUR
- [x] 4 Notion-Vorlagen + Import-Anleitung gebaut — `bundle/notion-vorlagen/` — 0 EUR
- [x] Verkaufstext für Produktseite geschrieben — `bundle/LISTING.md` — 0 EUR
- [ ] Cover-/Vorschaubilder in Canva erstellen — 0 EUR (Free-Tier reicht)
- [ ] Gumroad- oder Lemon-Squeezy-Account anlegen — 0 EUR Kontoeröffnung
- [ ] Produktseite anlegen, Dateien hochladen, Listing-Text einfügen, Preis 19 EUR setzen — 0 EUR, aber Gumroad zieht ~10 %, Lemon Squeezy ~5 % + 0,50 USD pro Verkauf
- [ ] Bundle launchen: Reddit (r/Notion, r/selbststaendig), IndieHackers, eigenes Netzwerk — 0 EUR, nur Zeit

## C. QuickQR SaaS bauen

- [x] Next.js-App gebaut: Login, Dashboard, dynamische QR-Codes, Scan-Tracking, Pricing-Seite — `saas/qr-generator/` — 0 EUR
- [x] Build, Lint, End-to-End-Test (Signup→QR-Code→Scan) verifiziert grün — 0 EUR

## D. QuickQR live schalten

- [ ] Domain kaufen (z. B. quickqr.de) — ca. 10–15 EUR/Jahr
- [ ] Stripe-Account erstellen (Ausweis + Bankkonto nötig) — 0 EUR Kontoeröffnung, danach ca. 1,5 % + 0,25 EUR pro Zahlung (EU-Karte)
- [ ] Stripe-Produkte anlegen: Pro Monatlich 4,99 EUR, Jährlich 39 EUR — 0 EUR
- [ ] Stripe-Keys + Price-IDs in `.env` eintragen (siehe README im Ordner) — 0 EUR
- [ ] Railway- oder Fly.io-Account anlegen — 0 EUR Kontoeröffnung
- [ ] Postgres-Datenbank einrichten (ersetzt lokales SQLite) — im Hosting-Preis enthalten
- [ ] App deployen, Umgebungsvariablen setzen (DATABASE_URL, NEXTAUTH_SECRET, STRIPE_*) — Hosting insgesamt ca. 5 EUR/Monat
- [ ] Neuen `NEXTAUTH_SECRET` für Produktion generieren (nicht den aus der Entwicklung wiederverwenden) — 0 EUR
- [ ] Domain mit Hosting verbinden (DNS-Eintrag) — 0 EUR, im Domainpreis enthalten
- [ ] Stripe-Webhook-Endpoint eintragen (`/api/webhooks/stripe`) — 0 EUR
- [ ] Testkauf im Stripe-Testmodus durchführen — 0 EUR
- [ ] Stripe auf Live-Modus umstellen — 0 EUR

## E. Rechtliches (vor echtem Verkauf Pflicht)

- [ ] Gewerbe anmelden, falls noch nicht selbstständig gemeldet — ca. 20–60 EUR je nach Stadt
- [ ] Kleinunternehmerregelung (§19 UStG) prüfen: lohnt sich meist am Anfang — 0 EUR
- [ ] Impressum erstellen (Pflicht) — 0 EUR per Generator (z. B. e-recht24), sonst Anwalt ca. 50–150 EUR
- [ ] Datenschutzerklärung erstellen (DSGVO-Pflicht) — 0 EUR per Generator, sonst Anwalt
- [ ] AGB für das Abo-Modell erstellen (dringend empfohlen) — 0 EUR per Generator, sonst Anwalt ca. 100–300 EUR

## F. Launch & Auswertung

- [ ] QuickQR launchen: ProductHunt, r/smallbusiness, r/marketing, IndieHackers — 0 EUR, nur Zeit
- [ ] Go/No-Go nach 14 Tagen prüfen (siehe Plan-Dokument) — 0 EUR
- [ ] Kennzahlen laufend tracken (Verkäufe, MRR, Kündigungen) — 0 EUR

## Kostenüberblick (nur Pflichtausgaben, ohne Prozent-Gebühren)

| Posten | Kosten |
|---|---|
| Domain | 10–15 EUR/Jahr |
| Hosting (App + Postgres) | ca. 5 EUR/Monat |
| Gewerbeanmeldung (einmalig) | 20–60 EUR |
| Rechtstexte (per Generator) | 0 EUR |
| **Summe bis zum Live-Gang** | **ca. 40–75 EUR von 200 EUR Budget** |

Laufende Gebühren (keine Fixkosten, nur bei tatsächlichem Umsatz): Gumroad/Lemon Squeezy ~5–10 % pro Bundle-Verkauf, Stripe ~1,5 % + 0,25 EUR pro Zahlung.
