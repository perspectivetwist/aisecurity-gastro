# Task 4.3 — End-to-End Test + Produktions-Deployment

## Was wurde getestet
3 echte URLs auf quantum-scanner.vercel.app gescannt, Leads in Notion gespeichert.

| URL | Score | Band | Dauer |
|-----|-------|------|-------|
| mueller.de | 83 | Teilgeschützt | 5.1s |
| rossmann.de | 95 | Gut aufgestellt | 12.3s |
| dm.de | 84 | Teilgeschützt | 9.2s |

Notion Leads DB: 7 Einträge (3 prod, 3 direkt API, 1 lokal).

## Was hat funktioniert
- Scan API: alle 3 URLs erfolgreich, Scores korrekt, unter 50 Sek.
- Leads API: funktioniert nach ENV-Fix auf Production
- OG Image, Favicon, Meta Tags: korrekt deployed

## Was war unerwartet
- NOTION_TOKEN und NOTION_QUANTUM_LEADS_DB_ID auf Vercel hatten trailing `\n` (Newline)
  - Ursache: `echo "value" | vercel env add` fügt Newline am Ende hinzu
  - Fix: `printf "value"` statt `echo` verwenden (kein trailing Newline)
- Lokaler Token war 50 Zeichen, Production 52 — unterschiedliche Tokens, beide mit `\n`-Problem

## Was beim nächsten Mal anders machen
- Vercel env vars IMMER mit `printf` setzen, nie mit `echo` (trailing newline)
- Nach env var Änderung: immer ein redeploy + Test des betroffenen Endpoints
- Debug-Info temporär in API Response zurückgeben um Vercel-Produktionsfehler schneller zu finden
