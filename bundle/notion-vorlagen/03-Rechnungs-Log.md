# Rechnungs-Log

| Rechnungsnr. | Kunde | Datum | Betrag netto | USt | Betrag brutto | Fällig am | Bezahlt | Mahnstufe |
|---|---|---|---|---|---|---|---|---|
| Beispiel: 2026-001 | Muster GmbH | 2026-10-01 | 2000 | 380 | 2380 | 2026-10-15 | Nein | 0 |

## Mahnstufen

- 0 = keine Mahnung nötig
- 1 = Zahlungserinnerung
- 2 = 1. Mahnung
- 3 = 2. Mahnung / Inkasso prüfen

## Nutzung

Eine Zeile pro Rechnung. Nach Import: Spalte "Bezahlt" als Checkbox, Spalte "Mahnstufe" als Select mit den vier Werten oben. Filter-Ansicht "Offene Rechnungen" anlegen (Bezahlt = Nein), sortiert nach Fälligkeitsdatum.
