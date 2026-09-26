# Checkliste: Freelancer-Bundle + QuickQR SaaS

Stand: 2026-09-26. [x] = bereits erledigt in diesem Repo. [ ] = noch zu tun, meist weil eigener Account/eigene Identität nötig.

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
- [x] Preis auf Marktdaten-Basis angepasst (19→24 EUR Bundle, 12→14 EUR Einzelprodukte) — 0 EUR
- [x] Cover-Bild (1280×720) + Thumbnail (600×600) erstellt, Gumroad-Formatvorgaben eingehalten — `bundle/covers/` — 0 EUR (programmatisch erzeugt statt Canva, gleiches Ergebnis)
- [ ] Gumroad- oder Lemon-Squeezy-Account anlegen — 0 EUR Kontoeröffnung
- [ ] Produktseite anlegen, Dateien + Cover hochladen, Listing-Text einfügen, Preis 24 EUR setzen — 0 EUR, aber Gumroad zieht ~10 %, Lemon Squeezy ~5 % + 0,50 USD pro Verkauf
- [ ] Bundle launchen: Reddit (r/Notion, r/selbststaendig), IndieHackers, eigenes Netzwerk — 0 EUR, nur Zeit

## B2. Sortiment erweitern (Marktrecherche-Ergebnis: Gumroad/Etsy-Topseller-Kategorien)

- [x] AI-Prompt-Pack gebaut: 40 ChatGPT-Prompts für Freelancer, 5 Kategorien — `bundle/ai-prompt-pack/` — 0 EUR
- [x] Job-Search-Tracker gebaut: 3 Notion-Vorlagen (Bewerbungs-Tracker, Interview-Vorbereitung, Gehaltsverhandlung) — `bundle/job-search-tracker/` — 0 EUR
- [x] Etsy-Listing-Text Finanz-Bundle vorbereitet (Titel, 13 Tags, Kategorie, SEO-Beschreibung) — `bundle/etsy-listing.md` — 0 EUR
- [x] Etsy-Listing-Texte für Prompt-Pack + Job-Tracker vorbereitet (gleiche SEO-Regeln: Titel front-loaded, Tags ohne Titel-Wiederholung) — `bundle/ai-prompt-pack/etsy-listing.md`, `bundle/job-search-tracker/etsy-listing.md` — 0 EUR
- [x] Cover + Thumbnail für Prompt-Pack, Job-Tracker, Bundle-Paket erstellt — 0 EUR
- [x] Mega-Bundle "Freelancer-Erfolgspaket" gebaut (alle 3 Produkte, 29 EUR statt 45 EUR einzeln — Top-Seller-Taktik: Bündelung statt nur Einzelprodukte) — `bundle/freelancer-erfolgspaket/` — 0 EUR
- [ ] Etsy-Shop eröffnen (Identität/Zahlungsdaten nötig, wie bei Gumroad/Stripe) — 0 EUR Eröffnung
- [ ] Alle 5 Produkte (Bundle, Prompt-Pack, Job-Tracker, Erfolgspaket, Lebenslauf-Set) auf Etsy hochladen — 0,20 USD/Listing + 6,5 % Transaktionsgebühr + ca. 3-4 % Zahlungsgebühr
- [ ] Alle 5 Produkte auf Gumroad/Lemon Squeezy als eigene Produktseiten anlegen — gleiche Gebühren wie Bundle
- [x] Review-Anfrage-E-Mail-Vorlage vorbereitet (Lang-/Kurzversion) — `bundle/review-anfrage-vorlage.md` — 0 EUR
- [ ] Nach ersten 10-20 Verkäufen: Review-Anfrage-Mail tatsächlich verschicken — 0 EUR, Konversions-Hebel laut Recherche
- [x] Gratis-Lite-Version als Funnel gebaut (Top-1%-Taktik von Easlo, >500.000 USD Notion-Umsatz: kostenlose Version bringt Reichweite, die ins bezahlte Sortiment wechselt) — `bundle/job-search-tracker/00-GRATIS-Lite-Version.md` — 0 EUR
- [ ] Gratis-Lite-Version auf Gumroad als "Name your price" (Minimum 0 EUR) listen, NICHT auf Etsy (dort keine echten Gratis-Listings möglich) — 0 EUR
- [x] Lebenslauf + Anschreiben Set gebaut, nach Feedback auf hochwertiges Zweispalten-Design mit Foto-Platzhalter überarbeitet (12 EUR statt 10 EUR, Ergänzung zum Job-Search-Tracker) — `bundle/bewerbungsunterlagen/` — 0 EUR
- [x] Cover, Gumroad-Listing, Etsy-Listing, Pinterest-Eintrag für Lebenslauf-Set erstellt, Cross-Sell-Verlinkung mit Job-Search-Tracker eingebaut — 0 EUR
- [ ] Geparkt, bewusst nicht umgesetzt: breiterer "Digital Planner" (Wellness/Habit-Tracking) — andere Zielgruppe als Freelancer, erst nach Validierung der aktuellen Produkte erwägen

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
- [ ] Bundle + Prompt-Pack + Job-Tracker + Erfolgspaket + Lebenslauf-Set launchen: Reddit (r/Notion, r/jobs, r/selbststaendig), IndieHackers — 0 EUR, nur Zeit
- [ ] Go/No-Go nach 14 Tagen prüfen (siehe Plan-Dokument) — 0 EUR
- [ ] Kennzahlen laufend tracken (Verkäufe pro Kanal/Produkt, MRR, Kündigungen) — 0 EUR

## G. Marketing (Kosten-Kalkulation)

Recherche-Ergebnis: kein Werbebudget nötig, um zu starten. Bezahlte Werbung erst NACH organischem Nachweis sinnvoll — vorher zahlt man nur für ungetestete Listings.

- [x] Pinterest-Pin-Texte + Hashtags für alle 5 Produkte vorbereitet (Titel, Beschreibung, 8-10 Hashtags je Produkt) — `bundle/pinterest-hashtags.md` — 0 EUR (wichtigster kostenloser Kanal für Etsy/Gumroad-Digitalprodukte laut Recherche, braucht aber 3-6 Monate Anlauf, 5-10 Pins/Woche konsequent statt viele auf einmal)
- [ ] Pinterest-Business-Account anlegen, ab Launch wöchentlich 5-10 Pins posten — 0 EUR, nur Zeit
- [ ] Etsy Ads: NICHT sofort aktivieren. Erst wenn ein Listing organisch bei 4-5%+ Konversion läuft, dann 1-3 USD/Tag testen (Etsy-Empfehlung: 3-5 USD/Tag für aussagekräftige Daten). Nur weiterlaufen lassen, wenn ROAS > 3x — sonst abschalten
- [ ] Kein Budget für Gumroad reservieren — dort gibt es kein Ads-System, Distribution läuft über eigene Kanäle (Reddit/Pinterest/Twitter) und Gumroad-interne Discover-Platzierung (kostenlos, algorithmisch)

**Ergebnis der Kalkulation:** 0 EUR Pflicht-Marketingbudget. Optionaler Puffer für einen späteren Etsy-Ads-Test: 30-50 EUR (10-15 Tage à 3 EUR), aus dem bestehenden 200-EUR-Budget möglich, aber nicht vor den ersten organischen Verkäufen einplanen.

## Kostenüberblick (nur Pflichtausgaben, ohne Prozent-Gebühren)

| Posten | Kosten |
|---|---|
| Domain | 10–15 EUR/Jahr |
| Hosting (App + Postgres) | ca. 5 EUR/Monat |
| Gewerbeanmeldung (einmalig) | 20–60 EUR |
| Rechtstexte (per Generator) | 0 EUR |
| **Summe bis zum Live-Gang** | **ca. 40–75 EUR von 200 EUR Budget** |

Laufende Gebühren (keine Fixkosten, nur bei tatsächlichem Umsatz): Gumroad/Lemon Squeezy ~5–10 % pro Verkauf (alle 5 Produkte, kein Aufpreis für mehr Produkte), Etsy ~10-11 % gesamt (Transaktion+Zahlung) + 0,20 USD/Listing, Stripe ~1,5 % + 0,25 EUR pro Zahlung.

Marketing: 0 EUR Pflichtbudget (siehe Abschnitt G). Optionaler Etsy-Ads-Test später: 30-50 EUR aus dem bestehenden Budget, erst nach organischem Verkaufsnachweis.
