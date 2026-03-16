# Task 1.3 — lib/scraper.ts – Jina.ai Wrapper

## Was wurde gebaut
- lib/scraper.ts: scrapeUrl(), validateUrl(), fetchRobotsTxt(), fetchLlmsTxt()
- ScrapeError Klasse mit Codes: INVALID_URL, SSRF_BLOCKED, TIMEOUT, FETCH_ERROR
- SSRF-Schutz: blockt localhost, 127.x, 192.168.x, 10.x, 172.16-31.x, .local, .internal
- 20 Sek. Timeout, 15.000 Zeichen Limit
- app/api/scan/route.ts als Stub (Wake-Route entfernt, wird in Task 2.5 neu geschrieben)

## Was hat funktioniert
- Jina.ai scrapeUrl liefert Markdown-Text (367 Zeichen für example.com)
- SSRF-Validierung blockt korrekt alle Patterns
- fetchRobotsTxt holt Google robots.txt erfolgreich

## Was war unerwartet
- Wake-Route musste gestubbt werden weil sie auf alte ScrapedContent-Types verwies
- dotenv/config lädt .env.local nicht korrekt — process.loadEnvFile() stattdessen verwenden
- http://localhost wird als INVALID_URL (Protokoll-Check) statt SSRF_BLOCKED erkannt — korrekt, URL wird trotzdem blockiert

## Was beim nächsten Mal anders machen
- Bei Typ-Änderungen in lib/ sofort prüfen welche Route-Files betroffen sind
