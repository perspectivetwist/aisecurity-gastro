# Radial Glow — Diagnose & Fix (4 Iterationen)

## Was gebaut
Sichtbaren Radial Glow Effect im Hero-Bereich — analog Wake (Lila) / Slipstream (Gelb).

## Problem — Root Cause nach 3-Wege-Diagnose
**Doppel-Fade-Bug**: Quantum nutzte CSS `radial-gradient` das intern zu transparent fadet (0.25→0.08→transparent bei 70%). Darauf wurde `blur-3xl` angewandt, das nochmals verwischt. Ergebnis: doppelte Abschwächung → praktisch unsichtbar.

Wake/Slipstream nutzen eine **solide Füllung** (gesamte 600x400 Div-Fläche gleichmäßig gefärbt). NUR `blur-3xl` erzeugt die weichen Kanten. Eine Weichzeichner-Schicht, nicht zwei.

Iterationen die NICHT funktionierten:
1. `bg-gradient-to-br from-[#FF2D55]/30 to-[#FF2D55]/15` — Tailwind Gradient, zu subtil
2. `bg-[#FF2D55]/25` — Einzelfarbe, möglicherweise Tailwind-Arbitrary-Value-Problem
3. `radial-gradient(ellipse...) + blur-3xl` — Doppel-Fade-Bug

## Lösung (Iteration 4)
Wake-Block 1:1 kopiert, nur Farbe angepasst:
```jsx
<div className="w-[600px] h-[400px] rounded-full blur-3xl"
  style={{ backgroundColor: 'rgba(255, 45, 85, 0.2)' }} />
```
- Inline `backgroundColor` statt Tailwind-Klasse → kein Parsing-Risiko
- Solide Füllung rgba(255,45,85,0.2) → blur-3xl erzeugt Glow
- 600x400 wie Wake/Slipstream (nicht 800x600)
- overflow-hidden auf Parent clippt Mobile

## Was funktioniert hat
- 3-Wege-Diagnose (grep in Wake/Slipstream/Quantum) identifizierte Root Cause sofort
- Inline backgroundColor umgeht jedes Tailwind-Arbitrary-Value-Risiko
- 1:1 Wake-Struktur statt eigene Interpretationen

## Was vermeiden
- radial-gradient + blur-3xl kombinieren → Doppel-Fade
- Eigene CSS-Kreationen wenn bewährter Code aus Schwester-Repo existiert
- Tailwind arbitrary hex mit Opacity-Modifier für kritische visuelle Elemente

## Nächstes Mal
- Bei visuellen Bugs: IMMER erst Diagnose (Vergleich mit funktionierender Referenz)
- Bewährten Code 1:1 kopieren, nur Farbe ändern — keine "Verbesserungen"
- Inline style für Farben die exakt stimmen müssen
