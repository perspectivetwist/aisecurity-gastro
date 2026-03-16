# Radial Glow Effect (Holy Light)

## Was gebaut
Radial Glow Effect auf der Quantum Landing Page — ein Neon-Rot Holy Light, das von oben herab hinter dem Hero-Text strahlt.

## Problem
Bisheriger Glow war ein blurred Circle (`blur-3xl` + `rounded-full`), zentriert im Hero-Bereich. Kein echtes radiales Licht von oben.

## Lösung
Ersetzt durch `radial-gradient(ellipse at top, rgba(255,45,85,0.2) 0%, transparent 70%)` — ein 800x500px großes, absolut positioniertes div mit `zIndex: 0`, zentriert am oberen Rand. Content-div hat `relative`, liegt also automatisch darüber.

## Was funktioniert hat
- Slipstream als Referenz für das Pattern (gleiche Struktur, nur Farbe und Gradient-Typ angepasst)
- `overflow-hidden` auf dem Parent clippt den Glow sauber auf Mobile
- Kein zusätzliches CSS nötig — reines Inline-Style

## Was vermeiden
- `blur-3xl` ist kein Holy Light — es erzeugt einen diffusen Blob statt gerichtetes Licht von oben
- Hardcoded Breite (800px) funktioniert auf Mobile nur dank `overflow-hidden` — bei zukünftigen Projekten responsive Sizing erwägen

## Nächstes Mal
- CSS-Variable `--color-quantum-glow` (0.4) vs. inline `rgba(0.2)` — bewusste Unterscheidung (Background-Glow subtiler als Text-Glow), aber dokumentieren
