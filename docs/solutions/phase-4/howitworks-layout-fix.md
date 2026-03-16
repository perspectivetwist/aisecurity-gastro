# HowItWorks Layout Fix — 3-Spalten Grid

## Was gebaut
HowItWorks-Sektion von sm:grid-cols-3 auf md:grid-cols-3 umgestellt, Card-Styling an Slipstream angeglichen.

## Problem
Task beschrieb Layout als "vertikal" — tatsächlich war bereits sm:grid-cols-3 (640px Breakpoint).
Task verlangte md:grid-cols-3 (768px Breakpoint) und explizites text-center + mx-auto auf Icon.

## Lösung
- Container: `sm:grid-cols-3` → `md:grid-cols-3`
- Card: `flex flex-col items-center text-center` → `text-center`
- Icon-Container: `mx-auto` ergänzt (wie Slipstream)

## Was funktioniert hat
- Slipstream-Referenz zeigt: einfaches text-center + mx-auto reicht, kein flex nötig
- md-Breakpoint (768px) ist besser für 3-Spalten da Cards bei 640-768px zu schmal werden

## Was vermeiden
- sm:grid-cols-3 bei Cards mit Textinhalten — zu eng auf kleinen Tablets

## Nächstes Mal
- Bei Grid-Layouts immer prüfen ob sm oder md der bessere Breakpoint ist (Kartenbreite!)
