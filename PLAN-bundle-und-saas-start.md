# Umsetzungsplan: Template-Bundle → Reinvest in SaaS

Stand: 2026-09-25. Budget: 200 EUR gesamt. Ziel: mit minimalem Kapitaleinsatz erste zahlende Kunden gewinnen und den Erlös in ein wiederkehrendes SaaS-Produkt reinvestieren.

## Zielbild und Erfolgskriterien

- **Phase 1 (Woche 1–2):** Notion-Vorlagen-Bundle + Excel/Sheets-Finanzrechner-Set als ein Digital-Produkt-Bundle verkaufen. Erfolgskriterium: mindestens 1 zahlender Kunde außerhalb des eigenen Umfelds — das beweist, dass die Verkaufsmotion (Angebot, Preis, Kanal) funktioniert, bevor mehr Zeit investiert wird.
- **Phase 2 (ab Woche 2–3, sobald Phase 1 mind. Deckungsbeitrag > 0 zeigt):** QR-Code-Generator mit Branding+Tracking als kleines Abo-SaaS bauen und launchen. Erfolgskriterium: erste 5 zahlende Abonnenten innerhalb 60 Tagen nach Launch.

**Wichtiger Realitäts-Check vorab:** Die größte Unsicherheit ist nicht der Bau, sondern der Vertrieb. Ein Digitalprodukt ohne bestehende Reichweite verkauft sich laut Erfahrungswerten aus der Indie-Hacker-Szene selten von allein — realistisch sind ohne aktive Community-Arbeit 0–5 Verkäufe im ersten Monat. Die Prognosen unten sind deshalb bewusst konservativ gehalten.

---

## Phase 1: Template-Bundle (Tag 1–10)

### Genaues Vorgehen

**Tag 1–2: Content erstellen**
- Notion-Vorlagen-Bundle: 3–4 Vorlagen bauen (z. B. Freelancer-Finanzübersicht, Projekt-Tracker, Rechnungs-Log, Steuer-Checkliste). Notion selbst, kein Code nötig.
- Excel/Sheets-Finanzrechner-Set: 2–3 Rechner (z. B. Stundensatz-Kalkulator, Break-even-Rechner, Steuerrücklage-Rechner) in Google Sheets, sauber formatiert, mit Anleitungs-Tab.

**Tag 3: Verpackung**
- Ein gemeinsames Bundle-Cover/Vorschaubilder in Canva (kostenlos).
- Kurze Produktbeschreibung + 3 Screenshots je Vorlage.

**Tag 4: Vertriebsplattform aufsetzen**
- Gumroad-Account (kostenlos, keine Fixkosten, ~10 % Provision pro Verkauf) oder Lemon Squeezy (~5 % + 0,50 $, übernimmt Steuerabwicklung/VAT automatisch — für EU-Verkauf an Privatpersonen vorzuziehen).
- Produktseite mit Preis anlegen: Einzelprodukte 9–12 EUR, Bundle 19 EUR (Ankerpreis-Logik: Bundle wirkt günstiger als Einzelkauf).

**Tag 5–7: Launch-Kanäle (kein Ad-Budget, nur organisch)**
- Reddit: r/Notion, r/GermanPersonalFinance, r/selbststaendig — als echter Beitrag mit Mehrwert posten, nicht als reine Werbung (sonst gelöscht).
- IndieHackers.com: Launch-Post im "Show IH"-Format.
- Produkt-eigene Landingpage nicht zwingend nötig für Phase 1 — Gumroad-Seite reicht als MVP.
- Bestehendes Netzwerk (LinkedIn/Xing-Post, Freelancer-Communities) direkt ansprechen.

**Tag 8–10: Nachfassen und Feedback**
- Käufer aktiv nach Feedback fragen, Testimonials sammeln.
- Preis/Beschreibung nach ersten Reaktionen ggf. anpassen (A/B ist bei so kleinem Volumen nicht sinnvoll — auf qualitatives Feedback setzen).

### Kosten Phase 1

| Posten | Kosten |
|---|---|
| Canva, Notion, Google Sheets | 0 EUR (Free-Tier reicht) |
| Gumroad/Lemon Squeezy Setup | 0 EUR (nur Provision pro Verkauf) |
| Optional: eigene Domain für spätere Landingpage | 10–15 EUR/Jahr |
| **Summe Phase 1** | **~15 EUR** |

### Realistische Prognose Phase 1 (30 Tage)

| Szenario | Verkäufe | Umsatz (brutto) | Nach Provision (~10 %) |
|---|---|---|---|
| Konservativ (wahrscheinlichstes Szenario ohne Reichweite) | 2–5 | 40–95 EUR | ~35–85 EUR |
| Realistisch (mit aktiver Community-Arbeit lt. Plan oben) | 8–15 | 150–285 EUR | ~135–255 EUR |
| Optimistisch (ein Post geht in einer Community gut) | 30+ | 570+ EUR | ~510+ EUR |

Einordnung: Schon das konservative Szenario deckt die Kosten von Phase 1 und liefert das eigentlich Wichtige — den Beweis, dass verkauft werden kann. Das optimistische Szenario ist ein Bonus, keine Planungsgrundlage.

### Go/No-Go für Phase 2

- **Go:** mindestens 1 tatsächlicher Fremdverkauf (nicht Familie/Freunde) innerhalb 14 Tagen.
- **No-Go / Anpassen:** 0 Verkäufe trotz mind. 3 Community-Posts → Preis, Zielgruppe oder Angebot überarbeiten, bevor in Phase 2 investiert wird. Kein Kapital in SaaS stecken, solange die Verkaufsmotion nicht bewiesen ist.

---

## Phase 2: QR-Code-Generator als Abo-SaaS (Start ab Tag 10, sobald Go)

### Genaues Vorgehen

**Tag 10–13: Bau (MVP)**
- Tech-Stack: Next.js/simples Backend + PostgreSQL, QR-Generierung über reife Open-Source-Lib (z. B. `qrcode` npm-Paket), Klick-Tracking über einfachen Redirect-Zähler.
- Kernfunktionen MVP: dynamischer QR-Code (Ziel-URL nachträglich änderbar), Branding (Logo/Farbe), Scan-Zähler-Dashboard.
- Hosting: Railway oder Fly.io (Free-Tier oder ~5 EUR/Monat), Domain ~10–15 EUR/Jahr.
- Payment: Stripe oder Lemon Squeezy Checkout (kein Fixkostenanteil, nur Transaktionsgebühr).

**Tag 14: Preismodell**
- Free: 1 QR-Code, ohne Branding.
- Pro: 4,99 EUR/Monat — unbegrenzt QR-Codes, Branding, Tracking-Dashboard.
- Bewusst deutlich unter Bitly Premium (das oft ab 8–35 $/Monat beginnt) positioniert.

**Tag 15–17: Landingpage + Launch**
- Landingpage mit klarem Vergleich "günstiger als Bitly", Demo-QR-Code direkt einbindbar.
- Launch-Kanäle: ProductHunt (kostenlos), r/smallbusiness, r/marketing, IndieHackers, Twitter/X Build-in-Public-Posts.

**Tag 18–30: Iterieren**
- Erste Nutzer-Feedback einholen, Onboarding-Reibung beseitigen.
- SEO-Grundlage legen: Landingpage auf Keywords wie "QR Code Generator mit Tracking kostenlos" optimieren (organischer Traffic braucht 2–4 Monate Vorlauf — nicht als Kurzfrist-Kanal einplanen).

### Kosten Phase 2

| Posten | Kosten |
|---|---|
| Domain | 10–15 EUR/Jahr |
| Hosting (Railway/Fly.io, erste Monate) | ~5 EUR/Monat |
| Payment-Provider | 0 EUR Fixkosten (nur % pro Transaktion) |
| **Summe Phase 2 (erste 3 Monate)** | **~30–40 EUR** |

Gesamtbudget Phase 1 + Phase 2 (3 Monate): **~45–55 EUR von 200 EUR** — Puffer von ca. 145 EUR bleibt für Iteration, ungeplante Kosten oder ein zweites Experiment.

### Realistische Prognose Phase 2 (Meilensteine)

| Zeitpunkt | Konservativ | Realistisch | Optimistisch |
|---|---|---|---|
| Tag 30 (kurz nach Launch) | 0–1 zahlende Kunden | 2–5 zahlende Kunden | 10+ (ProductHunt-Erfolg) |
| Tag 60 | 1–3 Kunden, ~5–15 EUR MRR | 5–10 Kunden, ~25–50 EUR MRR | 20+ Kunden, ~100 EUR MRR |
| Tag 90 | 3–5 Kunden, ~15–25 EUR MRR | 10–20 Kunden, ~50–100 EUR MRR | 40+ Kunden, ~200 EUR MRR |

Einordnung: Laut Marktdaten bleiben ca. 70 % aller Micro-SaaS-Produkte dauerhaft unter 1.000 EUR MRR. Das realistische Szenario hier ist bewusst bescheiden — Ziel der ersten 90 Tage ist Validierung und ein stabiler, wenn auch kleiner, wiederkehrender Umsatz, nicht das große Ergebnis.

---

## Budget-Tracking (gesamt 200 EUR)

| Phase | Geplant | Puffer verbleibend |
|---|---|---|
| Start | – | 200 EUR |
| Nach Phase 1 | ~15 EUR | ~185 EUR |
| Nach Phase 2 Setup | ~30–40 EUR | ~145–155 EUR |
| Reserve für Iteration/2. Versuch | – | ~145 EUR verfügbar |

## Risiken

- **Größtes Risiko:** kein Vertriebskanal mit echter Reichweite vorhanden → beide Produkte bauen sich, verkaufen sich aber nicht. Gegenmaßnahme: Go/No-Go-Kriterium aus Phase 1 ernst nehmen, nicht vorzeitig in Phase 2 investieren.
- **SaaS-spezifisch:** QR-Code-Nische hat Wettbewerb (Bitly, QR-Code-Monkey etc.) — Differenzierung nur über Preis und Einfachheit, kein starker Moat. Bei ausbleibendem Wachstum nach Tag 60 Kurswechsel prüfen (z. B. Wechsel zu Link-Kürzer aus Rang 4 der Liste).

## Nächster konkreter Schritt (heute)

1. Gumroad- oder Lemon-Squeezy-Account anlegen.
2. Erste Notion-Vorlage (Freelancer-Finanzübersicht) bauen — heute fertigstellen.
3. Morgen: zweite Vorlage + Excel-Rechner Nr. 1.
