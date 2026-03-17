import { User, UtensilsCrossed, Briefcase, Building2 } from 'lucide-react'

const audiences = [
  {
    icon: User,
    title: 'Restaurant-Inhaber',
    text: 'Fake-Bewertungen können deinen Ruf über Nacht zerstören. Quantum zeigt dir ob dein Restaurant Ziel von koordinierten KI-Angriffen ist.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Gastronomen & Cafés',
    text: 'Google-Bewertungen, Lieferando-Profil, Social Media: dein digitaler Footprint hat Schwachstellen. Quantum findet sie bevor Angreifer es tun.',
  },
  {
    icon: Briefcase,
    title: 'Franchise & Ketten',
    text: 'Mehrere Standorte = mehrere Angriffsflächen. Quantum prüft ob eure digitale Präsenz konsistent geschützt ist.',
  },
  {
    icon: Building2,
    title: 'Hotels & Catering',
    text: 'Reservierungssysteme, Gästebewertungen, Mitarbeiterprofile: je digitaler dein Betrieb, desto wichtiger der Sicherheits-Check.',
  },
]

export default function ForWhom() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-32">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
        F&uuml;r wen ist Quantum?
      </h2>
      <p className="text-base font-light text-gray-300 text-center mb-12">
        F&uuml;r jeden in der Gastronomie, dessen digitale Pr&auml;senz ein Ziel sein k&ouml;nnte.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {audiences.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="rounded-xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
          >
            <Icon size={24} className="text-[#FF2D55] mb-4" />
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
