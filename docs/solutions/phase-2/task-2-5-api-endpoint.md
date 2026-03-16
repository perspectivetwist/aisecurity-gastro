# Task 2.5 — app/api/scan/route.ts – API Endpoint

## Was wurde gebaut
- POST /api/scan: nimmt {url}, gibt ScanResult zurück
- middleware.ts: Rate Limiting (10/IP/h, in-memory Map)
- URL-Normalisierung (auto-prefix https://)
- SSRF-Schutz via validateUrl()
- 50s Global-Timeout (Vercel Hobby: max 60s)
- Error Handling: 400/422/429/504/500

## Was hat funktioniert
- example.com: Score 93 in 1090ms
- SSRF-Block: http://localhost → 400 INVALID_URL
- Fehlender Body: → 400 "URL fehlt"
- Middleware wird korrekt erkannt (Build zeigt "Proxy (Middleware)")

## Was war unerwartet
- Nichts. Alles nach Plan.

## Was beim nächsten Mal anders machen
- Nichts.
