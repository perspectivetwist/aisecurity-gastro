# Task 3.3 — Email-Gate Modal + Notion Lead-Speicherung

## Was wurde gebaut
- components/EmailGateModal.tsx: Modal mit Email-Input, Client-Side Validierung, Quantum-spezifische Texte
- app/api/leads/route.ts: POST Endpoint speichert Email + URL + Score + Band + Dimensions in Notion
- app/results/page.tsx: Modal-Trigger auf CTA Button, isUnlocked State via localStorage['quantum_email']

## Was hat funktioniert
- Notion API direkt via fetch (kein @notionhq/client nötig — Wake hat das bereits so gelöst)
- Quantum Leads DB Properties: Email (title), URL (text), Score (number), Band (text), Dimensions (text)
- NIEMALS created_time manuell setzen — Notion befüllt automatisch

## Was war unerwartet
- Notion Leads DB nutzt "URL" als rich_text (nicht url-Typ) — muss rich_text API verwenden
- Bestehendes lib/notion.ts nutzt NOTION_LEADS_DB_ID (Wake), wir nutzen NOTION_QUANTUM_LEADS_DB_ID

## Was beim nächsten Mal anders machen
- Notion DB Schema VOR dem Code-Schreiben prüfen (Feldnamen + Typen)
