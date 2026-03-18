import { Shield, Layers, Eye, FileText, Zap, Share2 } from 'lucide-react'
import UrlInputForm from '@/components/UrlInputForm'
import LandingFaq from '@/components/LandingFaq'
import ErrorBanner from '@/components/ErrorBanner'
import HowItWorks from '@/components/HowItWorks'
import ForWhom from '@/components/ForWhom'

const features = [
  { icon: Shield, title: 'Quantum Score 0-100', desc: 'Klare Zahl: wie exponiert deine Website ist' },
  { icon: Layers, title: '5 Sicherheits-Dimensionen', desc: 'Datenprofil, Identität, KI-Einfallstore, Manipulation, Agent-Zugang' },
  { icon: Eye, title: 'Deepfake-Risiko-Bewertung', desc: 'KI-Analyse deiner öffentlichen Fotos und Videos' },
  { icon: FileText, title: 'Findings-Report', desc: 'Konkrete Befunde pro Dimension, kein Fachjargon' },
  { icon: Zap, title: 'Keine Installation nötig', desc: 'URL eingeben, 30 Sek. warten, Ergebnis lesen' },
  { icon: Share2, title: 'Score teilen', desc: 'Link zum Vergleichen mit anderen Websites' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <div className="relative overflow-hidden">
        {/* Gradient background glow — 1:1 Wake/Slipstream Struktur */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(255, 45, 85, 0.2)' }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center">
          {/* Trust bar */}
          <p className="text-[10px] sm:text-sm font-light text-gray-300 mb-6 tracking-wide uppercase whitespace-nowrap">
            Kostenlos &middot; Kein Account n&ouml;tig &middot; Ergebnis in ~20&nbsp;Sek.
          </p>

          {/* Social Proof Bubble */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 mb-12 sm:mb-20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D55]" />
            <span className="text-base font-light text-gray-300">&Uuml;ber 5.000 Restaurants auf KI-Sicherheit gepr&uuml;ft</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            KI-Sicherheits-Scan{' '}
            <span className="text-[#FF2D55]" style={{ textShadow: '0 0 30px rgba(255,45,85,0.4)' }}>
              f&uuml;r dein Restaurant
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-light text-gray-300 mb-10 sm:mb-16 leading-relaxed">
            Fake-Bewertungen, KI-Phishing, digitale Schwachstellen: Finde die Risiken deines Restaurants bevor Angreifer sie ausnutzen.
          </p>

          <UrlInputForm />
        </div>
      </div>

      {/* DEFINITION */}
      <section className="max-w-2xl mx-auto px-4 pt-2 pb-6 text-center">
        <p className="text-sm text-gray-400 leading-relaxed">
          Quantum pr&uuml;ft kostenlos wie verwundbar dein Restaurant gegen&uuml;ber KI-Angriffen ist. Gef&auml;lschte Bewertungen, Phishing, Datenmissbrauch. F&uuml;r KMUs ohne IT-Sicherheit.
        </p>
      </section>

      {/* Error Banner (shown when redirected from /scanning with error) */}
      <ErrorBanner />

      {/* STATS */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-center">
          {[
            { num: '71%', label: 'aller KI-Angriffe treffen kleine und mittelst\u00e4ndische Unternehmen', source: 'FZI 2025', url: 'https://www.fzi.de/2025/10/08/cybersicher-lagebild-2025-cyberbedrohung-fuer-kmu-auf-rekordhoch/' },
            { num: '+89%', label: 'KI-gest\u00fctzte Angriffe gegen\u00fcber Vorjahr', source: 'CrowdStrike 2026', url: 'https://www.all-about-security.de/crowdstrike-global-threat-report-2026-ki-beschleunigt-cyberangriffe-und-weitet-angriffsflaechen-aus/' },
            { num: '29 Min.', label: 'bis ein Angreifer deine Website \u00fcbernimmt', source: 'CrowdStrike 2026', url: 'https://www.all-about-security.de/crowdstrike-global-threat-report-2026-ki-beschleunigt-cyberangriffe-und-weitet-angriffsflaechen-aus/' },
          ].map(({ num, label, source, url }) => (
            <div
              key={label}
              className="rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm block"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#FF2D55]">
                {num}
              </div>
              <div className="text-xs font-light text-gray-300 mt-1">{label}</div>
              <div className="text-[10px] text-gray-600 mt-2">
                Quelle: <a href={url} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">{source}</a> &#x2197;
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURE GRID */}
      <div className="max-w-4xl mx-auto px-4 pt-16 sm:pt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
          Was du bekommst
        </h2>
        <p className="text-base font-light text-gray-300 text-center mb-12">
          Deine KI-Sicherheitslage in 30 Sekunden. Verst&auml;ndlich aufbereitet.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-4 bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <Icon size={20} className="text-[#FF2D55] mb-3" />
              <div className="font-medium text-white text-sm">{title}</div>
              <div className="text-gray-300 text-xs font-light mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* FOR WHOM */}
      <ForWhom />

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 pt-24 sm:pt-44 pb-16 sm:pb-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          H&auml;ufig gestellte Fragen
        </h2>
        <LandingFaq />
      </div>

      {/* FOOTER CTA */}
      <div className="border-t border-white/10 py-16 sm:py-32 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          Ist dein Restaurant vor KI-Angriffen sicher?
        </h2>
        <UrlInputForm />
      </div>

    </main>
  )
}
