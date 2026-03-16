# Quantum Scanner — Developer Documentation

## Was ist das?
Next.js 14 App Router Scanner. Analysiert KI-Sicherheitsrisiken von Websites heuristisch.
Kein aktiver Angriff — nur öffentlich sichtbare Signale.

## Lokale Entwicklung
npm install && npm run dev → http://localhost:3000

## Routing
/ (Landing) → /scanning (Loading) → /results (Score + Gate)
Datenweitergabe:
- Landing → Scanning: sessionStorage['quantum_scan_url']
- Scanning → Results: sessionStorage['quantum_scan_result']

## Deployment
git push main → Vercel baut automatisch
vercel --prod → manuelles Deployment

## ENV-Variablen
| Name                        | Wozu                    | Wo setzen             |
|-----------------------------|-------------------------|-----------------------|
| ANTHROPIC_API_KEY           | Claude Haiku Analyse    | .env.local + Vercel   |
| JINA_API_KEY                | Jina.ai Scraping        | .env.local + Vercel   |
| NOTION_TOKEN                | Leads DB schreiben      | .env.local + Vercel   |
| NOTION_QUANTUM_LEADS_DB_ID  | Notion DB ID            | .env.local + Vercel   |

## Frontend-Komponenten (Phase 3)
| Datei                              | Zweck                                        |
|------------------------------------|----------------------------------------------|
| components/ShieldScanAnimation.tsx | Schild-SVG mit Fill-Up-Animation + Social Proof |
| components/UrlInputForm.tsx        | URL-Eingabe + ShieldScan + Neon-Rot Glow Button |
| components/LandingFaq.tsx          | 9 Quantum-FAQs, Accordion, Frage 1 always open  |
| components/QuantumScoreCircle.tsx | SVG Score Circle mit Neon-Rot Glow               |
| components/BandBadge.tsx          | Farbcodiertes Band-Label + Erklärungstext         |
| components/DimensionBar.tsx       | Einzelne Dimension-Bar (Score + Farbe + Gewicht)  |
| components/DimensionsList.tsx     | 5 Dimension-Bars Container                        |
| components/BranchenRanking.tsx    | Deterministic Industry-Ranking Card               |
| components/ShareButton.tsx        | Quantum Share-Link Button                         |

## Architektur
URL → /api/scan → Jina.ai (scraper.ts) → lib/dimensions/* → lib/scorer.ts → ScanResult
ScanResult → sessionStorage['quantum_scan_result'] → /results → EmailGateModal → /api/leads → Notion

## Bekannte Limitierungen V0
- Scan-Dauer: 30–45 Sek. (Vercel Hobby max. 60 Sek.)
- Jina.ai: max 15.000 Zeichen Output (Token-Budget)
- Rate Limiting: in-memory (reset bei Vercel Cold Start) — V1: Redis
- Deepfake-Check: nur Bild-Kontext-Text via Claude, kein echtes Bild-Scraping

## Nach jedem Task aktualisieren
Neue Dateien, Parameter, Architekturänderungen → diese Datei updaten.
Lessons Learned → docs/solutions/phase-X/task-X-X-[name].md
