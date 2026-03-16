# Iterations: Polish Round 2

## Schild-Füll-Animation fix
- translateY + clipPath = kastenförmiger Overflow → ersetzt durch linearGradient
- fillLevel via React State (0-100), 70ms Intervall → ~2.8s Zyklus
- opacity von 0.22 auf 0.75-0.9 erhöht (sattes Rot)
- CSS Keyframes shield-fill-up + shield-glowline aus globals.css entfernt

## Trust-Badge Text
- ALT: "70,5% aller Data Breaches treffen KMUs"
- NEU: "20.000+ Sicherheitsscans durchgeführt"

## KPI-Cards mit Quellen
- Card 1: 71% — FZI Lagebild 2025
- Card 2: +89% — CrowdStrike Global Threat Report 2026
- Card 3: 29 Min. — CrowdStrike Global Threat Report 2026
- Alle Cards klickbar (target=_blank), Quellen-Zeile mit ↗

## Footer-CTA Headline
- ALT: "Wie exponiert ist deine Website?"
- NEU: "Wie anfällig ist deine Website für KI-Angriffe?"

## Bug: Aktionsplan Mobile
- Kein hidden md:block gefunden — alle Komponenten bereits auf Mobile sichtbar
- Möglicherweise bereits durch frühere Implementierung gelöst oder bezieht sich auf noch nicht existierende Aktionsplan-Komponente
