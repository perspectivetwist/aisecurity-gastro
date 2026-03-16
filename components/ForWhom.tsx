import { User, Stethoscope, Briefcase, Building2 } from 'lucide-react'

const audiences = [
  {
    icon: User,
    title: 'Inhaber & Geschäftsführer',
    text: 'Deine Website verrät mehr über dich als du denkst. Quantum zeigt dir was Angreifer über dein Unternehmen herausfinden können — bevor sie aktiv werden.',
  },
  {
    icon: Stethoscope,
    title: 'Dienstleister & Praxen',
    text: 'Patientendaten, Mitarbeiterfotos, Kontaktformulare — Praxen und Dienstleister sind besonders exponiert. Quantum misst wie viel du preisgibst.',
  },
  {
    icon: Briefcase,
    title: 'Agenturen & Webentwickler',
    text: 'Biete deinen Kunden einen Sicherheits-Check als Zusatzleistung. Quantum-Reports als konkreter Mehrwert bei Website-Projekten.',
  },
  {
    icon: Building2,
    title: 'Mittelständische Unternehmen',
    text: 'Je mehr Mitarbeiter, desto größer die Angriffsfläche. Quantum scannt was öffentlich über euer Team, eure Strukturen und eure Systeme sichtbar ist.',
  },
]

export default function ForWhom() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-32">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
        F&uuml;r wen ist Quantum?
      </h2>
      <p className="text-base font-light text-gray-300 text-center mb-12">
        F&uuml;r jeden, dessen Website ein Ziel sein k&ouml;nnte.
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
