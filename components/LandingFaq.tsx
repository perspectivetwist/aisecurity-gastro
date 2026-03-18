'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'Was sind KI-Angriffe auf Restaurants?',
    a: 'KI-Angriffe sind automatisierte Betrugsversuche: gefälschte Bewertungen, Prompt-Injection in Chatbots, Phishing mit personalisierten KI-Texten. Restaurants sind besonders gefährdet.',
    trust: true,
  },
  {
    q: 'Wie funktioniert der Quantum Scanner?',
    a: 'Du gibst deine Restaurant-URL ein. Quantum prüft in 30 Sekunden deine Angriffsfläche: Datenschutz, öffentliche Daten, Bewertungsmanipulation.',
  },
  {
    q: 'Kostet der Quantum Scanner etwas?',
    a: 'Der Scan ist kostenlos, ohne Anmeldung.',
  },
  {
    q: 'Brauche ich als kleines Restaurant wirklich KI-Sicherheit?',
    a: 'Ja. KI-Tools ermöglichen auch kleinen Betrügern professionelle Angriffe auf Bewertungen und Kundendaten.',
  },
  {
    q: 'Was ist der häufigste KI-Angriff auf Restaurants?',
    a: 'Gefälschte KI-generierte Bewertungen und personalisiertes Phishing. Beides ist mit KI heute in Minuten skalierbar.',
  },
  {
    q: 'Was passiert nach dem Quantum Scan?',
    a: 'Du siehst deinen Sicherheits-Score und die Top-3-Schwachstellen für dein Restaurant. Der Aktionsplan zeigt konkrete Schritte.',
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
