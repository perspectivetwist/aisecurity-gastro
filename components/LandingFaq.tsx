'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Was sind KI-Angriffe auf Restaurants?',
    a: 'KI-Systeme werden zunehmend für koordinierte Fake-Bewertungskampagnen eingesetzt. Wettbewerber können automatisiert hunderte negative Bewertungen generieren. Gleichzeitig werden Restaurantbesitzer mit KI-generierten Phishing-Emails angegriffen die aussehen wie Google- oder Lieferando-Nachrichten.',
    trust: true,
  },
  {
    q: 'Was prüft der Quantum Scanner für mein Restaurant?',
    a: 'Wir analysieren: Bewertungsmuster auf Fake-Anzeichen, Sicherheit deiner digitalen Konten, Phishing-Anfälligkeit, Datenschutz-Compliance (DSGVO), und ob dein digitaler Footprint Schwachstellen aufweist die von KI-Systemen ausgenutzt werden können.',
  },
  {
    q: 'Ich bin ein kleines Restaurant — bin ich wirklich ein Ziel?',
    a: 'Ja. Automatisierte KI-Angriffe kosten nichts und treffen wahllos. Kleine Restaurants mit wenig Bewertungen sind besonders anfällig weil 10 Fake-Bewertungen ihren Schnitt massiv verändern können.',
  },
  {
    q: 'Was kostet der Scan?',
    a: 'Kostenlos. Aktionsplan mit Sicherheits-Empfehlungen gibt es nach Email-Eingabe.',
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
