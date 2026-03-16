'use client'

import type { ScanResult, DimensionResult } from '@/types/quantum'
import BlurWrapper from './BlurWrapper'

const DIMENSION_META: Record<string, { name: string; subtitle: string }> = {
  datenprofil: { name: 'Datenprofil', subtitle: 'Datenhunger-Exposition' },
  identitaet: { name: 'Identität', subtitle: 'Deepfake-Exposition' },
  kiEinfallstore: { name: 'KI-Einfallstore', subtitle: 'AI-Tool-Exposition' },
  manipulationsflaeche: { name: 'Manipulationsfläche', subtitle: 'Prompt Injection Risiko' },
  agentZugang: { name: 'Agent-Zugang', subtitle: 'Agent-Angriffsfläche' },
}

const DIMENSION_EXPLANATIONS: Record<string, string> = {
  datenprofil: 'Namen, Rollen und Kontaktinfos auf deiner Website sind Rohmaterial für hyper-personalisierte KI-Phishing-Angriffe. Je mehr sichtbar ist, desto präziser kann ein Angreifer zielen.',
  identitaet: 'Fotos und Videos sind Rohmaterial für Voice- und Gesichts-Kloning. Deepfake-as-a-Service ist heute ein Massenprodukt — und KMUs sind bevorzugtes Ziel.',
  kiEinfallstore: 'Jeder sichtbare KI-Kanal — Chatbot, AI-Widget, Support-Tool — ist ein potenzieller Einstiegspunkt für Prompt Injection Angriffe.',
  manipulationsflaeche: 'Formulare und Input-Felder ohne erkennbaren Schutz können von KI-Agenten für automatisierte Angriffe missbraucht werden.',
  agentZugang: 'Fehlende robots.txt oder llms.txt erlaubt KI-Agenten freien Zugriff auf deine Website. Das erleichtert automatisiertes OSINT gegen dein Unternehmen.',
}

function getRiskBadge(score: number): { label: string; color: string } {
  if (score <= 30) return { label: 'KRITISCH', color: '#ef4444' }
  if (score <= 60) return { label: 'WICHTIG', color: '#f97316' }
  return { label: 'EMPFOHLEN', color: '#eab308' }
}

function getEffortEstimate(score: number): string {
  if (score <= 30) return '1 Tag'
  if (score <= 60) return '1-2 Std'
  return '30 Min'
}

function DimensionFindingsBlock({
  dimensionKey,
  dimension,
}: {
  dimensionKey: string
  dimension: DimensionResult
}) {
  const meta = DIMENSION_META[dimensionKey] || { name: dimensionKey, subtitle: '' }
  const explanation = DIMENSION_EXPLANATIONS[dimensionKey] || ''
  const badge = getRiskBadge(dimension.score)
  const effort = getEffortEstimate(dimension.score)

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full"
          style={{
            color: badge.color,
            border: `1px solid ${badge.color}40`,
            background: `${badge.color}15`,
          }}
        >
          {badge.label}
        </span>
        <span className="text-white font-semibold text-sm">{meta.name}</span>
        <span className="text-gray-500 text-xs">{meta.subtitle}</span>
        <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">{effort}</span>
        <span className="text-white font-bold text-sm" style={{ color: badge.color }}>
          {dimension.score}
        </span>
      </div>

      {/* Findings */}
      <ul className="space-y-1.5 mb-3">
        {dimension.findings.map((finding, i) => (
          <li key={i} className="text-gray-300 text-sm flex gap-2">
            <span className="text-gray-500 shrink-0">&bull;</span>
            <span>{finding}</span>
          </li>
        ))}
      </ul>

      {/* Explanation */}
      <p className="text-gray-500 text-xs leading-relaxed border-t border-white/5 pt-3">
        {explanation}
      </p>
    </div>
  )
}

const DIMENSION_ORDER = [
  'datenprofil',
  'identitaet',
  'kiEinfallstore',
  'manipulationsflaeche',
  'agentZugang',
] as const

interface Props {
  result: ScanResult
  isUnlocked?: boolean
}

export default function FindingsReport({ result, isUnlocked = true }: Props) {
  const allDimensions = DIMENSION_ORDER.map((key) => ({ key, dimension: result.dimensions[key] }))
  const visibleDimensions = allDimensions.slice(0, 2)
  const gatedDimensions = allDimensions.slice(2)

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <div>
        <h3 className="text-white font-semibold text-lg mb-1">
          Dein Quantum Findings-Report
        </h3>
        <p className="text-gray-500 text-xs">
          {new URL(result.url).hostname} &middot; Score: {result.quantumScore}/100 &middot; Analysiert am {new Date(result.scannedAt).toLocaleDateString('de-DE')}
        </p>
      </div>

      {/* Visible Dimensions (always shown) */}
      {visibleDimensions.map(({ key, dimension }) => (
        <DimensionFindingsBlock
          key={key}
          dimensionKey={key}
          dimension={dimension}
        />
      ))}

      {/* Gated Dimensions */}
      {gatedDimensions.length > 0 && !isUnlocked && (
        <BlurWrapper bgColor="#0A0A0A">
          <div className="space-y-6">
            {gatedDimensions.map(({ key, dimension }) => (
              <DimensionFindingsBlock
                key={key}
                dimensionKey={key}
                dimension={dimension}
              />
            ))}
          </div>
        </BlurWrapper>
      )}

      {gatedDimensions.length > 0 && isUnlocked &&
        gatedDimensions.map(({ key, dimension }) => (
          <DimensionFindingsBlock
            key={key}
            dimensionKey={key}
            dimension={dimension}
          />
        ))
      }

      {/* Report Footer */}
      <div className="border-t border-white/10 pt-4">
        <p className="text-gray-600 text-xs text-center leading-relaxed">
          Quantum ist ein heuristischer Scanner — er analysiert öffentlich sichtbare Signale.
          Kein aktiver Angriff, kein Penetrationstest. Reine Exposition-Analyse.
        </p>
      </div>
    </div>
  )
}
