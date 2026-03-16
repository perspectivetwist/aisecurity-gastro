# Task 1.2 — Vercel Deployment aufsetzen

## Was wurde gebaut
- Vercel Projekt mit GitHub Repo verbunden (auto-deploy auf git push)
- 4 ENV-Variablen in Vercel Dashboard gesetzt (ANTHROPIC_API_KEY, JINA_API_KEY, NOTION_TOKEN, NOTION_QUANTUM_LEADS_DB_ID)
- Production URL: quantum-scanner.vercel.app
- .env.local lokal mit API Keys befüllt (aus Wake wiederverwendet)

## Was hat funktioniert
- vercel link + GitHub-Connection aus Task 0.1 bereits vorhanden
- ENV-Variablen via CLI (`vercel env add`) schnell gesetzt

## Was war unerwartet
- Git-Committer-Email (maxgeissinger@MacBook-Pro-von-Max.local) war nicht mit Vercel-Team verknüpft → alle git push-triggered Deployments schlugen fehl mit "Git author must have access to the team"
- Lösung: git config user.email auf maxgeissinger@gmail.com gesetzt, dann empty commit + push → funktioniert
- Erste CLI-Deploy (Task 0.1) hatte funktioniert weil Vercel CLI separat authentifiziert war

## Was beim nächsten Mal anders machen
- Git user.email SOFORT nach Clone konfigurieren, nicht erst wenn Vercel-Fehler auftreten
