# Realistischer Zeitplan bis zum Vollbetrieb

Stand: 2026-09-26. Deckt alle offenen Punkte aus `CHECKLISTE-von-a-bis-z.md` ab. Zeiten enthalten reale Wartezeiten (Behörden, Kontoverifizierung, DNS) — nicht nur die eigentliche Arbeitszeit.

## Woche 1: Accounts & Fundament

- Gumroad- oder Lemon-Squeezy-Account anlegen
- Etsy-Shop eröffnen
- Stripe-Account anlegen (Verifizierung kann 1-3 Werktage dauern — früh starten)
- Railway- oder Fly.io-Account anlegen
- Domain kaufen
- Gewerbeanmeldung einreichen (Bearbeitungszeit je nach Stadt oft 1-2 Wochen — parallel zu allem anderen laufen lassen, nicht blockierend abwarten)
- Cover-/Vorschaubilder für alle 3 Digitalprodukte in Canva erstellen

## Woche 2: Rechtliches & Produktseiten

- Impressum, Datenschutzerklärung, AGB per Generator erstellen (sobald Gewerbe-Anmeldedaten vorliegen; Entwurf ohne Gewerbeschein schon möglich, final nachziehen)
- Produktseiten für Bundle, Prompt-Pack, Job-Tracker auf Gumroad/Lemon Squeezy anlegen (Listing-Texte liegen bereits vor)
- Gleiche 3 Produkte auf Etsy listen (Etsy-Text liegt vor in `bundle/etsy-listing.md`)
- Stripe-Produkte anlegen (Pro Monatlich/Jährlich), Price-IDs notieren

## Woche 3: QuickQR live schalten

- `.env` mit echten Stripe-Keys und Price-IDs befüllen
- Postgres-Datenbank auf Railway/Fly.io einrichten, App deployen
- Domain per DNS mit Hosting verbinden (Propagation kann bis zu 24h dauern — Puffer einplanen)
- Neuen `NEXTAUTH_SECRET` für Produktion setzen
- Stripe-Webhook-Endpoint eintragen, Testkauf im Testmodus durchführen
- Impressum/Datenschutz/AGB auf der QuickQR-Landingpage verlinken

## Woche 4: Launch-Woche

- Stripe auf Live-Modus umstellen
- Bundle + Prompt-Pack + Job-Tracker launchen: Reddit (r/Notion, r/jobs, r/selbststaendig), IndieHackers, eigenes Netzwerk
- QuickQR launchen: ProductHunt, r/smallbusiness, r/marketing
- Ab hier: alles läuft parallel, kein sequenzielles Abarbeiten mehr nötig

## Woche 5-6: Erste Auswertung

- Go/No-Go-Kriterium prüfen (mind. 1 Fremdverkauf, siehe Plan-Dokument)
- Bei 0 Verkäufen trotz Launch: Preis/Zielgruppe/Listing-Text überarbeiten, bevor weiter Zeit investiert wird
- Bei erfolgreichem Start: Kennzahlen-Tracking etablieren (Tabelle: Verkäufe pro Kanal/Produkt, MRR, Kündigungen)

## Monat 2-3 (Rest Q1)

- Etsy-SEO braucht Anlaufzeit (4-8 Wochen bis zu ersten organischen Funden) — in dieser Phase noch wenig Etsy-Traffic erwarten, nicht gegensteuern, sondern abwarten
- Community-Posts wiederholen (nicht spammen — max. alle paar Wochen mit echtem Mehrwert), Feedback aktiv einholen
- Kein neues Produkt bauen, bis die 3 aktuellen validiert sind (siehe geparkte Ideen in der Checkliste)

## Q2-Q4: laufender Betrieb

- Monatlicher Check gegen die Prognose aus `PLAN-bundle-und-saas-start.md`
- Bei deutlichem Abweichen nach unten: Ursache klären (Kanal, Preis, Produkt) statt einfach weiterzumachen
- Bei deutlichem Abweichen nach oben: erst dann geparkte Ideen (z. B. breiterer Digital-Planer) neu bewerten

## Zusammenfassung

| Zeitraum | Ergebnis |
|---|---|
| Woche 1-4 | Alle Accounts, Rechtstexte, Produktseiten live, beide Geschäfte gestartet |
| Woche 5-6 | Erste Verkaufsdaten, Go/No-Go entschieden |
| Monat 2-3 | Etsy-SEO greift langsam, Kennzahlen-Bild wird klarer |
| Q2-Q4 | Laufender Betrieb nach Prognose, Iteration statt Expansion |

4 Wochen bis Vollbetrieb ist der Rahmen bei zügiger, aber realistischer Bearbeitung — nicht bei Vollzeit-Fokus an einem Wochenende. Die eigentliche Wartezeit steckt in Behörden/Kontoverifizierung, nicht in der eigenen Arbeit.
