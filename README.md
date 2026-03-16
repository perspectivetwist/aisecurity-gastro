# Quantum Scanner

KI-Sicherheits-Scanner für KMUs. Analysiert öffentlich sichtbare Website-Signale heuristisch auf 5 Sicherheitsdimensionen und gibt einen Quantum Score (0–100, hoch = sicher).

## Stack

- Next.js 14 (App Router) + TypeScript
- Vercel Hosting
- Jina.ai (Scraping) + Claude Haiku (AI-Analyse)
- Notion API (Leads)

## Lokale Entwicklung

```bash
npm install
npm run dev
```

## Deployment

```bash
vercel --prod
```

## Dokumentation

- [CLAUDE.md](CLAUDE.md) — Projektkontext für Claude Code
- [DEVELOPER.md](DEVELOPER.md) — Developer-Dokumentation
- [SECURITY.md](SECURITY.md) — Security-Regeln
