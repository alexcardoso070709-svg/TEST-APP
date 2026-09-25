# QuickQR — Dynamischer QR-Code-Generator (MVP)

Ein schlankes SaaS-MVP für dynamische QR-Codes: QR-Code einmal drucken, Ziel-URL
danach beliebig oft ändern. Positioniert als deutlich günstigere Alternative zu
Bitly (Free-Plan + 4,99 €/Monat bzw. 39 €/Jahr Pro-Plan).

## Funktionsumfang (MVP)

- Signup/Login mit E-Mail + Passwort (NextAuth.js Credentials-Provider, Passwörter
  gehasht mit bcrypt).
- Dashboard mit Liste eigener QR-Codes inkl. Scan-Zähler.
- QR-Code anlegen: Ziel-URL, optionaler Name, optionale Branding-Farbe (Pro).
  Erzeugt einen 6-stelligen Slug; der gedruckte QR-Code zeigt auf `/r/<slug>`,
  **nicht** direkt auf die Ziel-URL — deshalb ist die URL nachträglich änderbar,
  ohne den QR-Code neu drucken zu müssen.
- Redirect-Route `/r/[slug]`: loggt einen Scan-Timestamp und leitet per 302 auf
  die aktuell hinterlegte Ziel-URL weiter.
- QR-Code bearbeiten: Ziel-URL/Name/Farbe ändern, Slug bleibt stabil.
- Scan-Statistik pro QR-Code: Gesamtzahl + Liste der Scans der letzten 7 Tage.
- Statische Pricing-Seite (Free vs. Pro) mit vorbereitetem Stripe-Checkout
  (Testmodus-Grundgerüst, siehe Abschnitt Stripe unten).
- Landingpage mit Vergleich "günstiger als Bitly".

**Bewusst nicht enthalten** (MVP-Scope): E-Mail-Versand/-Verifizierung,
Passwort-Reset, Admin-Panel, Teams/Multi-User-Workspaces.

## Tech-Stack

- Next.js 16 (App Router, TypeScript, Turbopack)
- Prisma ORM — lokal SQLite, produktiv Postgres (siehe Deployment)
- NextAuth.js (Auth.js) v5 mit Credentials-Provider, Passwort-Hashing über `bcryptjs`
- QR-Code-Erzeugung über das npm-Paket `qrcode`
- Stripe (Testmodus-Grundgerüst, echte Keys fehlen bewusst)
- Tailwind CSS 4

## Lokal starten

Voraussetzung: Node.js 20+ (getestet mit Node 22).

```bash
cd saas/qr-generator
npm install
cp .env.example .env
# .env öffnen und NEXTAUTH_SECRET durch einen echten Zufallswert ersetzen:
#   openssl rand -base64 32
npx prisma migrate dev
npm run dev
```

App läuft danach unter http://localhost:3000. `npx prisma migrate dev` legt
automatisch eine lokale SQLite-Datei `prisma/dev.db` an und wendet das Schema an
(kein separater DB-Server nötig für die lokale Entwicklung).

Build-Check (wie in Produktion gebaut wird):

```bash
npm run build
npm run start
```

`npm install`, `npx prisma migrate dev` und `npm run build` wurden vor Abgabe
dieses MVPs erfolgreich durchgeführt.

## Benötigte Umgebungsvariablen

Siehe `.env.example` für alle Platzhalter. Kurzüberblick:

| Variable | Zweck | Lokal |
|---|---|---|
| `DATABASE_URL` | Datenbankverbindung | `file:./dev.db` (SQLite) |
| `NEXTAUTH_SECRET` | Signiert Sessions/JWTs | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Basis-URL der App für Auth.js | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | Basis-URL für die `/r/<slug>`-Links im QR-Code | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` | Stripe-API-Zugang | Testmodus-Key aus dem Stripe-Dashboard |
| `STRIPE_PRICE_ID_MONTHLY` / `STRIPE_PRICE_ID_YEARLY` | Price-IDs für den Pro-Plan | selbst in Stripe anlegen |
| `STRIPE_WEBHOOK_SECRET` | Signaturprüfung für Stripe-Webhooks | aus Stripe-Webhook-Endpoint oder Stripe CLI |

**Wichtig:** `.env` ist per `.gitignore` von Git ausgeschlossen und wird nie
committet. Es enthalten niemals echte Produktions-Secrets in diesem Repo —
nur `.env.example` mit Platzhaltern ist versioniert.

## Stripe (Testmodus-Grundgerüst)

Der MVP enthält das komplette Checkout/Webhook-Grundgerüst
(`app/api/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`), aber **keine
echten Stripe-Keys** — der Checkout-Button auf `/pricing` zeigt ohne
konfigurierte Keys einen Hinweistext statt einer echten Zahlung (Route
antwortet mit HTTP 501 und einer TODO-Fehlermeldung).

Um Zahlungen live zu schalten:

1. Stripe-Account anlegen, im **Testmodus** starten.
2. Zwei Produkte/Preise anlegen: "Pro Monthly" (4,99 €, monatlich wiederkehrend)
   und "Pro Yearly" (39 €, jährlich wiederkehrend).
3. `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_ID_MONTHLY`,
   `STRIPE_PRICE_ID_YEARLY` in `.env` (bzw. den Hosting-ENV-Variablen) setzen.
4. Webhook-Endpoint in Stripe auf `https://<deine-domain>/api/webhooks/stripe`
   anlegen (Events: `checkout.session.completed`,
   `customer.subscription.deleted`) und `STRIPE_WEBHOOK_SECRET` setzen.
5. Lokal testen mit der Stripe CLI:
   `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
6. Erst nach echtem Testen im Testmodus auf Live-Keys umstellen.

Die genauen TODO-Stellen sind im Code als Kommentare markiert
(`app/api/checkout/route.ts`, `app/api/webhooks/stripe/route.ts`).

## Deployment (Railway oder Fly.io)

Lokal läuft die App mit SQLite. Für Produktion wird eine echte Postgres-
Datenbank empfohlen (mehrere gleichzeitige Verbindungen, kein Datenverlust bei
Redeploys, da SQLite-Dateien auf vielen PaaS-Plattformen nicht persistent sind).

### Schritt 1: Schema auf Postgres umstellen

In `prisma/schema.prisma` den Datasource-Block ändern:

```prisma
datasource db {
  provider = "postgresql"   // vorher: "sqlite"
  url      = env("DATABASE_URL")
}
```

Danach lokal einmal `npx prisma migrate dev` gegen eine Postgres-Testinstanz
laufen lassen (oder direkt in der Zielumgebung `npx prisma migrate deploy`
verwenden — das ist der für Produktion vorgesehene, nicht-interaktive Befehl).

### Schritt 2: Railway (empfohlen für den Einstieg)

1. Neues Railway-Projekt anlegen, "PostgreSQL"-Plugin hinzufügen — Railway
   erzeugt automatisch eine `DATABASE_URL`.
2. Dieses Repo (bzw. den Unterordner `saas/qr-generator`) als Service verbinden.
3. Build-Command: `npm run build` — Start-Command: `npm run start`.
4. Umgebungsvariablen aus der Tabelle oben in den Railway-Service-Settings
   setzen (`NEXTAUTH_URL` und `NEXT_PUBLIC_APP_URL` auf die echte Railway-
   Domain bzw. eigene Domain setzen, `NEXTAUTH_SECRET` neu generieren, echte
   Stripe-Keys nur wenn bereit für Live-Zahlungen).
5. Nach dem ersten Deploy einmalig `npx prisma migrate deploy` gegen die
   Produktionsdatenbank ausführen (z. B. über Railways "Run Command"-Funktion
   oder ein Deploy-Hook).

### Schritt 3: Fly.io (Alternative)

1. `fly launch` im Projektordner ausführen (erzeugt `fly.toml`).
2. Postgres-Instanz anlegen: `fly postgres create` und mit der App verbinden
   (`fly postgres attach`) — setzt `DATABASE_URL` automatisch als Secret.
3. Restliche Secrets setzen: `fly secrets set NEXTAUTH_SECRET=... STRIPE_SECRET_KEY=... ...`
4. `fly deploy` ausführen.
5. Nach dem Deploy `fly ssh console` und darin `npx prisma migrate deploy`
   ausführen (oder als Release-Command in `fly.toml` konfigurieren).

### Domain

Für einen professionellen Auftritt eine eigene Domain (~10–15 EUR/Jahr) auf den
Hosting-Anbieter zeigen lassen und `NEXTAUTH_URL` / `NEXT_PUBLIC_APP_URL` auf
diese Domain setzen — sonst zeigen neu erstellte QR-Codes auf die falsche Basis-
URL.

## Was noch fehlt / was du selbst ergänzen musst

- Echte Stripe-Keys und Price-IDs (Testmodus zuerst, dann live).
- Eine eigene Domain plus DNS-Konfiguration beim Hosting-Anbieter.
- Ein Railway- oder Fly.io-Account inkl. Postgres-Instanz für Produktion.
- Ein neu generierter, geheimer `NEXTAUTH_SECRET` für Produktion (nicht den
  lokalen Wert wiederverwenden).
- Rechtliches für den Live-Betrieb (Impressum, Datenschutzerklärung, AGB) —
  im MVP bewusst nicht enthalten.

## Projektstruktur (Kurzüberblick)

```
app/
  page.tsx                 Landingpage
  pricing/page.tsx          Statische Pricing-Seite + Checkout-Button
  login/, signup/           Auth-Formulare
  dashboard/                Geschützte Routen (QR-Code-Liste, Anlegen, Bearbeiten)
  r/[slug]/route.ts         Redirect + Scan-Logging
  api/                      Route Handler (Signup, QR-Codes CRUD, Stripe)
auth.ts, auth.config.ts     NextAuth-Konfiguration (Credentials-Provider)
proxy.ts                    Next.js 16 "Proxy" (früher middleware.ts) — schützt /dashboard
lib/                        Prisma-Client, QR-Rendering, Slug-Generator, Plan-Logik
prisma/schema.prisma        Datenmodell (User, QrCode, Scan)
```
