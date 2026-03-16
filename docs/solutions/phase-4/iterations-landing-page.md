# Iterations: Landing Page Polish

## Subheadline korrigieren
- Neue Subheadline: "Jede Website hat Angriffsflächen. / Weißt du wie groß deine sind?"
- Eingefügt zwischen h1 und UrlInputForm
- Kein Slipstream-Text mehr vorhanden

## Schild-Animation in URL-Input-Box
- ShieldScanAnimation.tsx gelöscht (standalone Komponente)
- ShieldIcon inline in UrlInputForm.tsx: absolute right-3 top-1/2 -translate-y-1/2
- Input pr-12 für Platz
- "Gerade aktiv: X Scans" unter der Box (simuliert 5-15, wechselt alle 60s)
- CSS-Animationen (shield-fill, shield-glowline) bleiben aus globals.css

## 'So funktioniert's' Sektion
- Neue Komponente: components/HowItWorks.tsx
- 3 Schritte: URL eingeben (Search), KI analysiert (Cpu), Score erhalten (FileCheck)
- Icons aus lucide-react, Neon-Rot (#FF2D55)
- Platzierung: nach Feature Grid, vor ForWhom

## 'Für wen ist Quantum?' Sektion
- Neue Komponente: components/ForWhom.tsx
- 4 Zielgruppen-Cards: Inhaber, Dienstleister, Agenturen, Mittelstand
- Icons: User, Stethoscope, Briefcase, Building2 (lucide-react)
- 2x2 Grid auf Desktop, gestapelt auf Mobile
- Platzierung: nach HowItWorks, vor FAQ

## Was war unerwartet
- Nichts.
