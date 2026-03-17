import { Search, Cpu, FileCheck } from 'lucide-react'

const steps = [
  {
    icon: Search,
    label: 'SCHRITT 1',
    title: 'URL eingeben',
    text: 'Gib deine Website-URL ein. Quantum scannt was öffentlich sichtbar ist, genau wie ein Angreifer.',
  },
  {
    icon: Cpu,
    label: 'SCHRITT 2',
    title: 'KI analysiert',
    text: 'Unsere KI prüft 25+ Signale in 5 Dimensionen: Datenprofil, Deepfake-Risiko, Einfalltore, Manipulationsfläche, Agentenoffenheit.',
  },
  {
    icon: FileCheck,
    label: 'SCHRITT 3',
    title: 'Score erhalten',
    text: 'Du siehst sofort wie groß deine Angriffsfläche ist und was du konkret ändern kannst.',
  },
]

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 sm:pt-32">
      <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
        So funktioniert&apos;s
      </h2>
      <p className="text-sm font-light text-gray-400 text-center mb-14">
        Drei Schritte zum Sicherheits-Check f&uuml;r dein Restaurant.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, label, title, text }) => (
          <div key={label} className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-[#FF2D55]/50"
              style={{ boxShadow: '0 0 12px rgba(255,45,85,0.15)' }}>
              <Icon size={24} className="text-[#FF2D55]" />
            </div>
            <span className="text-xs text-[#FF2D55] tracking-widest font-medium mb-2">
              {label}
            </span>
            <h3 className="text-base font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
