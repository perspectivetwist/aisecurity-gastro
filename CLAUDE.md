# CLAUDE.md — Quantum Scanner

## Was ist dieses Projekt?
Quantum — KI-Sicherheits-Scanner für KMUs. Analysiert öffentlich sichtbare Website-Signale
heuristisch auf 5 Sicherheitsdimensionen und gibt einen Quantum Score (0–100, hoch = sicher).
Dritter Scanner im ASD-Stack (nach Wake AEO + Slipstream). Branding: Neon-Rot (#FF2D55).
Landing Page Hook: "Ist deine Website eine Einladung für KI-Angriffe?"

## Stack
- Framework: Next.js 14 (App Router)
- Sprache: TypeScript (strict: true — keine any-Types)
- Hosting: Vercel (Hobby Plan — max. 60 Sek. Function Runtime, KRITISCH)
- Scraping: Jina.ai Reader API — https://r.jina.ai/{URL}
- AI-Analyse: Anthropic Claude Haiku (claude-haiku-4-5-20251001)
- Leads: Notion API
- Vercel Projektname: quantum-scanner → quantum-scanner.vercel.app

## Farbschema (KRITISCH — nie ändern ohne Rückfrage)
- Primary: #FF2D55 (Neon-Rot)
- Primary Glow: rgba(255, 45, 85, 0.4)
- Background: #0A0A0A (identisch Wake/Slipstream)
- Text: #FFFFFF
- Muted: #888888
- CSS Variable: --quantum-red: #FF2D55

## Routing-Architektur
/ (Landing) → /scanning (Loading) → /results (Score + Gate)
- Datenweitergabe zwischen Pages: sessionStorage
- Key: 'quantum_scan_result' (JSON stringified ScanResult)

## Freemium-Logik (KRITISCH — nie ändern ohne Rückfrage)
KOSTENLOS (immer sichtbar):
  - Quantum Score (0–100) als SVG Circle
  - 5 Dimensions-Scores mit Gewichtung
  - Band-Label (Kritisch / Gefährdet / Teilgeschützt / Gut aufgestellt)
  - Share-Button

EMAIL-GATE (nach Findings-Report-Click):
  - EmailGateModal erscheint
  - Email → POST /api/leads → Notion Quantum Leads DB
  - Nach Submit: FindingsReport freigeschaltet

PAID (V1 — noch nicht implementieren):
  - Aktionsplan mit konkreten Fixes + Priorisierung

Scan-Limit: localStorage['quantum_scans'] — 1 freier Scan pro Browser.
Nach 1 Scan: Hinweis "Upgrade für weitere Scans" (V1).

## Score-Dimensionen (KRITISCH — Gewichtung nie ändern)
| Dimension           | Gewicht | Typ           |
|---------------------|---------|---------------|
| Datenprofil         | 20%     | Regex/Heuristik |
| Identität           | 25%     | Claude-Analyse  |
| KI-Einfallstore     | 20%     | Regex/Heuristik |
| Manipulationsfläche | 20%     | Regex/Heuristik |
| Agent-Zugang        | 15%     | Fetch + Regex   |

Score-Formel: quantumScore = datenprofil*0.20 + identitaet*0.25 + kiEinfallstore*0.20 + manipulationsflaeche*0.20 + agentZugang*0.15
Score-Bänder: 0–30 Kritisch | 31–60 Gefährdet | 61–85 Teilgeschützt | 86–100 Gut

## Projektstruktur
```
quantum-scanner/
├── app/
│   ├── page.tsx              # Landing: URL-Input, Hook, Neon-Rot
│   ├── scanning/page.tsx     # Loading: Progress-Texte, Scan-Dauer-Kommunikation
│   ├── results/page.tsx      # Score + Dimensions + EmailGate + FindingsReport
│   ├── api/
│   │   ├── scan/route.ts     # POST: URL → ScanResult (Haupt-Endpoint)
│   │   └── leads/route.ts    # POST: Email + Score → Notion
│   └── layout.tsx            # Root Layout, Metadata, Neon-Rot Theme
├── components/
│   ├── UrlInput.tsx           # URL-Eingabe + Validierung
│   ├── ScanButton.tsx         # Neon-Rot Glow Button + Loading State
│   ├── QuantumScoreCircle.tsx # SVG Score-Anzeige (0–100)
│   ├── BandBadge.tsx          # Band-Label
│   ├── DimensionBar.tsx       # Score-Bar pro Dimension
│   ├── DimensionsList.tsx     # 5x DimensionBar
│   ├── ShareButton.tsx        # Clipboard-Share
│   ├── EmailGateModal.tsx     # Modal: Email → Freischaltung
│   └── FindingsReport.tsx     # Findings pro Dimension (nach Gate)
├── lib/
│   ├── scraper.ts             # Jina.ai Wrapper + URL-Validator + robots.txt/llms.txt
│   ├── scorer.ts              # calculateQuantumScore() — orchestriert alle Dimensionen
│   ├── reporter.ts            # generateFindings() — Claude Haiku für Report-Texte
│   └── dimensions/
│       ├── datenprofil.ts     # Dim 1: Namen, Rollen, Emails, Organigramm
│       ├── identitaet.ts      # Dim 2: Fotos, Videos, Social (Claude-Analyse)
│       ├── ki-einfallstore.ts # Dim 3: Chatbots, AI-Widgets, Script-Tags
│       ├── manipulationsflaeche.ts # Dim 4: Formulare, Inputs, CAPTCHA
│       └── agent-zugang.ts    # Dim 5: robots.txt, llms.txt, JSON-LD
├── types/
│   └── quantum.ts             # ScanResult, DimensionResult, FindingsReport Interfaces
├── CLAUDE.md                  # Diese Datei
├── DEVELOPER.md               # Developer-Doku
├── SECURITY.md                # Security-Dokument
└── docs/solutions/            # Lessons Learned pro Task
```

## ENV-Variablen (exakt diese Namen — nie abweichen)
- ANTHROPIC_API_KEY — Claude Haiku API Key (server-side only)
- JINA_API_KEY — Jina.ai Reader API Key (server-side only)
- NOTION_TOKEN — Notion Integration Token (server-side only)
- NOTION_QUANTUM_LEADS_DB_ID — Notion DB ID für Quantum Leads

## Security-Regeln (siehe SECURITY.md)
- URL-Validator: nur https://, keine 192.168.x, keine 127.x, keine localhost
- Rate Limiting: 10 Scans/IP/Stunde (Vercel Middleware)
- Alle API Keys: nur server-side (never in client components)
- Content-Limit: max 15.000 Zeichen aus Jina.ai (Token-Budget)
- Claude-Prompt: System-Prompt trennt klar User-Input (KRITISCH: Indirect Prompt Injection)
- Für vollständiges Threat Model: siehe SECURITY.md

## AUTONOMIE-REGELN (nie nach Erlaubnis fragen)
- Alle Bash-Befehle ausführen ohne Rückfrage
- Alle URLs fetchen ohne Rückfrage
- Alle Dateien lesen, erstellen, überschreiben ohne Rückfrage
- npm/npx/pip Befehle ohne Rückfrage
- Deployments ohne Rückfrage (vercel --prod)
- API Calls ohne Rückfrage
- Bei Fehlern: selbst debuggen, 3 Versuche, dann erst User informieren

## KRITISCHE REGELN
1. Notion Projektplan = Single Source of Truth. Tasks 1:1 umsetzen.
2. Nie eigenmächtig Architektur ändern (z.B. Routing, Score-Gewichtung, Freemium-Logik).
3. Jede ENV-Variable aus .env.local lesen — nie hardcoden.
4. TypeScript strict — keine any-Types.
5. Vercel Hobby: max. 60 Sek. Function Runtime. Scan-Ziel: 30–45 Sek.
6. Nach jedem Task PFLICHT (alle 3 Felder in Notion):
   - Status → "Done"
   - Lessons Learned → Was war unerwartet? (oder "Alles nach Plan. Keine Abweichungen.")
   - Notizen → Dateinamen, konkrete Findings, Abweichungen

## DOKU-PFLICHT nach jedem Task (in dieser Reihenfolge)
1. Notion: Status → Done + Lessons Learned + Notizen ausfüllen
2. DEVELOPER.md updaten (neue Files, Parameter, Architekturänderungen)
3. docs/solutions/phase-X/task-X-X-[name].md anlegen
4. git add . && git commit -m "docs: lessons learned Task X.X [Name]"
5. git push
GitHub Actions prüft automatisch. Roter Haken = Task gilt NICHT als fertig.
