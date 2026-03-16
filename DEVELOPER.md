# Quantum Gastro Security Scanner – Developer Documentation

## Setup
```bash
npm install
cp .env.example .env.local  # ENV-Variablen eintragen
npm run dev                  # http://localhost:3000
```

## ENV-Variablen
| Variable | Beschreibung |
|----------|-------------|
| ANTHROPIC_API_KEY | Claude Haiku API Key |
| JINA_API_KEY | Jina.ai Reader API Key |
| NOTION_TOKEN | Notion Integration Token |
| NOTION_QUANTUM_LEADS_DB_ID | Notion Quantum Leads DB ID |

## Deployment
```bash
npx vercel --prod --yes
```
Vercel URL: https://aisecurity-gastro.vercel.app

## Architektur
- `/` — Landing Page mit URL-Input
- `/scanning` — Loading Screen
- `/results` — Score + Dimensions + Email-Gate + Findings Report
- `/api/scan` — POST: URL → Jina scrape → Claude Analyse → Quantum Score
- `/api/leads` — POST: Email → Notion Leads DB

## Wichtige Dateien
| Datei | Zweck |
|-------|-------|
| app/page.tsx | Landing Page |
| app/scanning/page.tsx | Loading Screen |
| app/results/page.tsx | Ergebnis-Seite |
| app/api/scan/route.ts | Scan-Endpoint |
| components/LandingFaq.tsx | FAQ-Accordion (10 Fragen) |
| components/Footer.tsx | Ökosystem-Footer |
| lib/scraper.ts | Jina.ai Wrapper |
| lib/scorer.ts | Quantum Score Berechnung |
| lib/reporter.ts | Claude Haiku Findings Report |
