'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Was macht Quantum und ist das ein Angriff auf mein Restaurant?',
    a: 'Quantum scannt nur was ohnehin öffentlich sichtbar ist, genau das, was auch ein Angreifer sehen würde, bevor er aktiv wird. Kein Hacking, kein Penetrationstest, keine Installation. Du gibst deine URL ein, Quantum liest deine Restaurant-Website wie ein normaler Besucher und zeigt dir was dabei sichtbar wird.',
    trust: true,
  },
  {
    q: 'Warum gibt es Quantum?',
    a: 'Gastronomiebetriebe haben keine Vorstellung davon, wie viel Angriffsmaterial ihre eigene Website öffentlich preisgibt. Fotos vom Team, Namen, Rollen, Chatbots, Reservierungsformulare: alles ist Rohmaterial für KI-gestützte Angriffe.\n\nDas Kernproblem in Zahlen:\n\n• 71% aller Ransomware-Angriffe treffen KMUs (FZI / Transferstelle Cybersicherheit, Lagebild 2025)\n• +89% KI-gestützte Angriffe gegenüber Vorjahr (CrowdStrike Global Threat Report 2026)\n• 29 Minuten: durchschnittliche Zeit bis ein Angreifer ein System übernimmt (CrowdStrike 2026)\n• 83% aller Phishing-Mails sind KI-generiert (KnowBe4 Phishing Trends Report 2025)\n• Deepfake-Vorfälle stiegen Q1 2025 um 19% gegenüber ganzem Jahr 2024 (Keepnet 2026)\n\nKein Tool macht diese Exposition in unter 60 Sekunden sichtbar, auf Restaurant-Niveau verständlich.',
  },
  {
    q: 'Ich bin ein kleines Restaurant. Bin ich wirklich ein Ziel?',
    a: 'Ja. Restaurants sind heute ein bevorzugtes Ziel, nicht weil sie viel haben, sondern weil sie weniger schützen. Laut VikingCloud 2026 sind Cyberangriffe erstmals das größte Geschäftsrisiko für kleine Unternehmen. KI macht Angriffe billiger und präziser: Eine Phishing-Mail die früher Stunden dauerte, wird heute in Sekunden personalisiert, aus den Infos auf deiner Restaurant-Website.',
  },
  {
    q: 'Was passiert mit meinen Daten?',
    a: 'Quantum speichert nur deine Email-Adresse (wenn du den Report anforderst) und die URL die du eingibst. Keine Website-Inhalte werden gespeichert. Kein Tracking, kein Weiterverkauf. Der Scan läuft einmalig, das Ergebnis gehört dir.',
  },
  {
    q: 'Ich bin kein IT-Profi. Verstehe ich das Ergebnis?',
    a: 'Das ist der Punkt. Quantum ist für Restaurantbesitzer gebaut, nicht für IT-Abteilungen. Du siehst einen Score von 0-100 und fünf verständliche Kategorien: Wie viel verrät deine Website über dein Team? Wie viel Deepfake-Material ist öffentlich? Wo können Angreifer Formulare missbrauchen? Kein Fachjargon, keine Abkürzungen, nur konkrete Befunde in normaler Sprache.',
  },
  {
    q: 'Was kostet das und was wollt ihr von mir?',
    a: 'Der Quantum Score und alle 5 Dimensionen sind vollständig kostenlos. Für den detaillierten Findings-Report gibst du nur deine Email-Adresse ein. Kein Abo, kein Verkaufsgespräch, keine versteckten Kosten. Wir wollen wissen ob Quantum für Gastronomiebetriebe nützlich ist. Das ist alles.',
  },
  {
    q: 'Was ist der Unterschied zu einem Antivirus oder einer Firewall?',
    a: 'Antivirus und Firewall schützen was bereits bei dir ist: deinen Computer, dein Netzwerk. Quantum zeigt was von außen sichtbar ist, bevor ein Angriff überhaupt beginnt. Es geht nicht darum was du intern hast, sondern was ein Angreifer über dein Restaurant herausfinden kann ohne jemals bei dir einzubrechen: Team-Fotos für Deepfakes, Reservierungsformulare für automatisierte Angriffe, Chatbots als Einstiegspunkt.',
  },
  {
    q: 'Was mache ich nach dem Scan?',
    a: 'Du siehst sofort wo dein größtes Risiko liegt. Der Findings-Report erklärt für jede Dimension konkret was gefunden wurde und was du oder dein Webentwickler diese Woche ändern kannst. Kein Studium nötig, keine Agentur beauftragen. Die meisten Fixes dauern unter einer Stunde.',
  },
  {
    q: 'Wie entsteht der Quantum Score und warum sollte ich ihm vertrauen?',
    a: 'Der Score ist kein Bauchgefühl. Quantum prüft über 25 konkrete Signale auf deiner Restaurant-Website, aufgeteilt in 5 Kategorien mit fester Gewichtung:\n\n• Datenprofil (20%): Namen, Rollen, Emails: Rohmaterial für Phishing\n• Identität / Deepfake-Risiko (25%): Fotos, Videos: Kloning-Material\n• KI-Einfallstore (20%): Chatbots, AI-Widgets: Angriffspunkte\n• Manipulationsfläche (20%): Formulare, Inputs: Injection-Risiko\n• Agent-Zugang (15%): robots.txt, llms.txt: Wie offen für KI-Bots?\n\nIdentität bekommt das höchste Gewicht weil Deepfake-Angriffe auf Restaurantbesitzer das am schnellsten wachsende Risiko 2026 sind. Score 100 = minimale Exposition. Kein Score bedeutet Perfektion, er zeigt wo du stehst.',
  },
  {
    q: 'Andere Tools sind schneller. Warum dauert Quantum 30-45 Sekunden?',
    a: 'Weil Quantum tiefer schaut. Die meisten schnellen Scanner prüfen ob deine Website erreichbar ist oder ob ein SSL-Zertifikat vorhanden ist. Das ist kein Sicherheits-Check, das ist ein Ping.\n\nQuantum liest deinen gesamten öffentlich sichtbaren Content, analysiert ihn auf 25+ Signale und bewertet das Deepfake-Risiko zusätzlich mit einer KI, genau wie ein echter Angreifer es tun würde, nur automatisiert.\n\n30-45 Sekunden für eine echte Exposition-Analyse ist nicht langsam. Es ist das Minimum um etwas Sinnvolles zu sagen.',
  },
]

export default function LandingFaq() {
  const [open, setOpen] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {FAQS.map((faq, i) => (
        <div
          key={i}
          className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
        >
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left"
          >
            <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
            <ChevronDown
              size={16}
              className="text-[#FF2D55] flex-shrink-0 transition-transform"
              style={{ transform: open === i ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {open === i && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-5 -mt-1">
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">{faq.a}</p>
              {faq.trust && (
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 text-xs text-gray-500">
                  <span>🔒 DSGVO-konform</span>
                  <span>🚫 Keine Datenspeicherung</span>
                  <span>🇩🇪 Made in Germany</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
