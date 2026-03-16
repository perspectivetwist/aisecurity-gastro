'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { ScanResult, DimensionResult } from '@/types/quantum'

const DIMENSION_ORDER = [
  'datenprofil',
  'identitaet',
  'kiEinfallstore',
  'manipulationsflaeche',
  'agentZugang',
] as const

const DIMENSION_META: Record<string, { name: string; subtitle: string }> = {
  datenprofil: { name: 'Datenschutz', subtitle: 'Sind deine Nutzerdaten geschützt?' },
  identitaet: { name: 'Identitätsschutz', subtitle: 'Kann deine Website-Identität missbraucht werden?' },
  kiEinfallstore: { name: 'Angriffspunkte', subtitle: 'Wo können KI-Angriffe bei dir eindringen?' },
  manipulationsflaeche: { name: 'Manipulationsschutz', subtitle: 'Ist deine Website gegen KI-Manipulation geschützt?' },
  agentZugang: { name: 'KI-Zugang', subtitle: 'Welche KI-Agenten haben Zugriff auf deine Website?' },
}

function getBarColor(score: number): string {
  if (score <= 30) return '#ef4444'
  if (score <= 60) return '#f97316'
  if (score <= 85) return '#eab308'
  return '#22c55e'
}

function getScoreBadge(score: number): { text: string; color: string } | null {
  if (score === 0) return { text: 'Kritisch', color: '#ef4444' }
  if (score <= 30) return { text: 'Schwach', color: '#f97316' }
  return null
}

export default function DimensionsList({
  dimensions,
}: {
  dimensions: ScanResult['dimensions']
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Worst-first: sort ascending by score
  const sortedKeys = [...DIMENSION_ORDER].sort(
    (a, b) => dimensions[a].score - dimensions[b].score
  )

  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-5 text-sm sm:text-base">
        5 Sicherheits-Dimensionen
      </h2>
      <div className="space-y-4">
        {sortedKeys.map((key, i) => {
          const dim: DimensionResult = dimensions[key]
          const meta = DIMENSION_META[key]
          const isExpanded = expandedId === key
          const hasFindings = dim.findings.length > 0
          const badge = getScoreBadge(dim.score)
          const isWorst = i === 0

          return (
            <div key={key}>
              {isWorst && (
                <p className="text-xs font-semibold mb-1" style={{ color: '#FF2D55' }}>
                  Dein gr&ouml;&szlig;tes Risiko
                </p>
              )}
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : key)}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white text-sm">{meta.name}</span>
                    {badge && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: badge.color + '20', color: badge.color }}
                      >
                        {badge.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{dim.score}</span>
                    {hasFindings ? (
                      isExpanded
                        ? <ChevronUp size={14} className="text-gray-500" />
                        : <ChevronDown size={14} className="text-gray-500" />
                    ) : (
                      <span className="text-xs text-green-400">{'\u2713'}</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1.5">{meta.subtitle}</p>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(3, dim.score)}%`, backgroundColor: getBarColor(dim.score) }}
                  />
                </div>
              </button>

              {isExpanded && hasFindings && (
                <div className="mt-3 ml-6 space-y-2">
                  {dim.findings.map((finding, idx) => (
                    <div key={idx} className="text-xs">
                      <p className="text-gray-300 font-light">{finding}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
