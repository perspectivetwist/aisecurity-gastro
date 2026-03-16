# Task 4.2 — Meta Tags + SEO + OG Image

## Was wurde gebaut
- app/opengraph-image.tsx: 1200x630 OG Image via next/og (edge runtime), Neon-Rot Glow, Hook-Text, Brand-Logo
- app/icon.tsx: "Q" auf #FF2D55 Hintergrund (war "A" auf lila — Wake-Überbleibsel)
- app/layout.tsx: metadataBase gesetzt (quantum-scanner.vercel.app), twitter card auf summary_large_image

## Was hat funktioniert
- next/og ImageResponse für OG Image: kein statisches Bild nötig, generiert on-demand
- metadataBase behebt Warning für soziale OG/Twitter-Image-URLs auf Vercel

## Was war unerwartet
- Ohne metadataBase zeigt Next.js Warning bei Build und löst OG-Image-URL auf localhost auf

## Was beim nächsten Mal anders machen
- metadataBase direkt beim ersten Layout-Setup setzen, nicht nachträglich
