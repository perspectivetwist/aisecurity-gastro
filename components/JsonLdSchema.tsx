export default function JsonLdSchema() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AI Shift Drift",
    "url": "https://www.ki-gastronomie.com",
    "sameAs": ["https://github.com/perspectivetwist"]
  }

  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quantum Gastro Security Scanner",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
  }

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was macht Quantum und ist das ein Angriff auf mein Restaurant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quantum scannt nur was ohnehin öffentlich sichtbar ist, genau das, was auch ein Angreifer sehen würde, bevor er aktiv wird. Kein Hacking, kein Penetrationstest, keine Installation. Du gibst deine URL ein, Quantum liest deine Restaurant-Website wie ein normaler Besucher und zeigt dir was dabei sichtbar wird."
        }
      },
      {
        "@type": "Question",
        "name": "Warum gibt es Quantum?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gastronomiebetriebe haben keine Vorstellung davon, wie viel Angriffsmaterial ihre eigene Website öffentlich preisgibt. Fotos vom Team, Namen, Rollen, Chatbots, Reservierungsformulare: alles ist Rohmaterial für KI-gestützte Angriffe. 71% aller Ransomware-Angriffe treffen KMUs (FZI / Transferstelle Cybersicherheit, Lagebild 2025). +89% KI-gestützte Angriffe gegenüber Vorjahr (CrowdStrike Global Threat Report 2026). 29 Minuten: durchschnittliche Zeit bis ein Angreifer ein System übernimmt (CrowdStrike 2026). 83% aller Phishing-Mails sind KI-generiert (KnowBe4 Phishing Trends Report 2025). Deepfake-Vorfälle stiegen Q1 2025 um 19% gegenüber ganzem Jahr 2024 (Keepnet 2026). Kein Tool macht diese Exposition in unter 60 Sekunden sichtbar, auf Restaurant-Niveau verständlich."
        }
      },
      {
        "@type": "Question",
        "name": "Ich bin ein kleines Restaurant. Bin ich wirklich ein Ziel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Restaurants sind heute ein bevorzugtes Ziel, nicht weil sie viel haben, sondern weil sie weniger schützen. Laut VikingCloud 2026 sind Cyberangriffe erstmals das größte Geschäftsrisiko für kleine Unternehmen. KI macht Angriffe billiger und präziser: Eine Phishing-Mail die früher Stunden dauerte, wird heute in Sekunden personalisiert, aus den Infos auf deiner Restaurant-Website."
        }
      },
      {
        "@type": "Question",
        "name": "Was passiert mit meinen Daten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quantum speichert nur deine Email-Adresse (wenn du den Report anforderst) und die URL die du eingibst. Keine Website-Inhalte werden gespeichert. Kein Tracking, kein Weiterverkauf. Der Scan läuft einmalig, das Ergebnis gehört dir."
        }
      },
      {
        "@type": "Question",
        "name": "Ich bin kein IT-Profi. Verstehe ich das Ergebnis?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Das ist der Punkt. Quantum ist für Restaurantbesitzer gebaut, nicht für IT-Abteilungen. Du siehst einen Score von 0-100 und fünf verständliche Kategorien: Wie viel verrät deine Website über dein Team? Wie viel Deepfake-Material ist öffentlich? Wo können Angreifer Formulare missbrauchen? Kein Fachjargon, keine Abkürzungen, nur konkrete Befunde in normaler Sprache."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet das und was wollt ihr von mir?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Quantum Score und alle 5 Dimensionen sind vollständig kostenlos. Für den detaillierten Findings-Report gibst du nur deine Email-Adresse ein. Kein Abo, kein Verkaufsgespräch, keine versteckten Kosten. Wir wollen wissen ob Quantum für Gastronomiebetriebe nützlich ist. Das ist alles."
        }
      },
      {
        "@type": "Question",
        "name": "Was ist der Unterschied zu einem Antivirus oder einer Firewall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Antivirus und Firewall schützen was bereits bei dir ist: deinen Computer, dein Netzwerk. Quantum zeigt was von außen sichtbar ist, bevor ein Angriff überhaupt beginnt. Es geht nicht darum was du intern hast, sondern was ein Angreifer über dein Restaurant herausfinden kann ohne jemals bei dir einzubrechen: Team-Fotos für Deepfakes, Reservierungsformulare für automatisierte Angriffe, Chatbots als Einstiegspunkt."
        }
      },
      {
        "@type": "Question",
        "name": "Was mache ich nach dem Scan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Du siehst sofort wo dein größtes Risiko liegt. Der Findings-Report erklärt für jede Dimension konkret was gefunden wurde und was du oder dein Webentwickler diese Woche ändern kannst. Kein Studium nötig, keine Agentur beauftragen. Die meisten Fixes dauern unter einer Stunde."
        }
      },
      {
        "@type": "Question",
        "name": "Wie entsteht der Quantum Score und warum sollte ich ihm vertrauen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Der Score ist kein Bauchgefühl. Quantum prüft über 25 konkrete Signale auf deiner Restaurant-Website, aufgeteilt in 5 Kategorien mit fester Gewichtung: Datenprofil (20%), Identität/Deepfake-Risiko (25%), KI-Einfallstore (20%), Manipulationsfläche (20%), Agent-Zugang (15%). Identität bekommt das höchste Gewicht weil Deepfake-Angriffe auf Restaurantbesitzer das am schnellsten wachsende Risiko 2026 sind. Score 100 = minimale Exposition."
        }
      },
      {
        "@type": "Question",
        "name": "Andere Tools sind schneller. Warum dauert Quantum 30-45 Sekunden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Weil Quantum tiefer schaut. Die meisten schnellen Scanner prüfen ob deine Website erreichbar ist oder ob ein SSL-Zertifikat vorhanden ist. Das ist kein Sicherheits-Check, das ist ein Ping. Quantum liest deinen gesamten öffentlich sichtbaren Content, analysiert ihn auf 25+ Signale und bewertet das Deepfake-Risiko zusätzlich mit einer KI, genau wie ein echter Angreifer es tun würde, nur automatisiert. 30-45 Sekunden für eine echte Exposition-Analyse ist nicht langsam. Es ist das Minimum um etwas Sinnvolles zu sagen."
        }
      }
    ]
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  )
}
