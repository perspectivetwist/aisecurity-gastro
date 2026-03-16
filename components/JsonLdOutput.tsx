'use client'
import { useState } from 'react'

interface Props { jsonLd: string; locked?: boolean }

export default function JsonLdOutput({ jsonLd, locked }: Props) {
  const [copied, setCopied] = useState(false)

  const formatted = (() => {
    try { return JSON.stringify(JSON.parse(jsonLd), null, 2) }
    catch { return jsonLd }
  })()

  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-white">JSON-LD Schema</h2>
        {!locked && (
          <button
            onClick={() => { navigator.clipboard.writeText(formatted); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
            className="text-xs text-purple-400 hover:text-purple-300"
          >
            {copied ? '\u2713 Kopiert' : 'Kopieren'}
          </button>
        )}
      </div>
      <pre className={`bg-black/30 rounded-lg p-4 text-xs overflow-auto max-h-48 text-gray-300 ${locked ? 'blur-[3px] opacity-60 pointer-events-none select-none' : ''}`}>
        {formatted}
      </pre>
    </div>
  )
}
