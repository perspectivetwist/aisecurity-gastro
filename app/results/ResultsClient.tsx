'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ScanResult } from '@/types/quantum'
import QuantumScoreCircle from '@/components/QuantumScoreCircle'
import BranchenRanking from '@/components/BranchenRanking'
import DimensionsList from '@/components/DimensionsList'
import FindingsReport from '@/components/FindingsReport'
import EmailGate from '@/components/EmailGate'
import CrossSell from '@/components/CrossSell'
import { trackScanComplete, trackEmailGate } from '@/lib/gtag'

function ResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const urlParam = searchParams.get('url') || ''

  const [result, setResult] = useState<ScanResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const unlocked = localStorage.getItem('quantum_unlocked') === 'true'
    setIsUnlocked(unlocked)

    const raw = sessionStorage.getItem('quantum_scan_result')
    if (!raw) {
      router.push('/')
      return
    }

    try {
      const data: ScanResult = JSON.parse(raw)
      setResult(data)
      trackScanComplete(data.url, data.quantumScore)
    } catch {
      router.push('/')
      return
    }

    if (!unlocked) trackEmailGate('shown')
    setLoading(false)
  }, [router])

  if (loading || !result) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF2D55] mx-auto" />
      </main>
    )
  }

  function handleUnlock() {
    localStorage.setItem('quantum_unlocked', 'true')
    setIsUnlocked(true)
  }

  // Use URL from searchParams if available, otherwise fall back to result.url
  const displayUrl = urlParam ? decodeURIComponent(urlParam) : result.url

  return (
    <main className={`min-h-screen ${!isUnlocked ? 'pb-32' : ''}`}>
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Score Circle with Band */}
        <QuantumScoreCircle
          score={result.quantumScore}
          band={result.band}
          bandLabel={result.bandLabel}
          url={result.url}
        />

        {/* Branchen-Ranking */}
        <BranchenRanking
          score={result.quantumScore}
          industry={result.industry}
        />

        {/* 5 Dimensions */}
        <DimensionsList dimensions={result.dimensions} />

        {/* Findings Report — items 01+02 visible, 03+ blurred when locked */}
        <FindingsReport result={result} isUnlocked={isUnlocked} />

        <CrossSell />

        {/* Back link */}
        <div className="text-center pt-4">
          <a
            href="/"
            className="text-[#FF2D55] hover:text-[#FF2D55]/80 font-light text-sm"
          >
            &larr; Weitere URL analysieren
          </a>
        </div>

        {/* ASD Hotmail Footer */}
        <div className="text-center pt-8 pb-4 border-t border-white/10 mt-8">
          <a
            href="https://ai-gastro-hub.vercel.app?utm_source=quantum&utm_medium=report&utm_campaign=hotmail"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Erstellt mit AI Shift Drift | Kostenloser KI-Scan f&uuml;r Restaurants
          </a>
        </div>
        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <a href="https://ai-gastro-hub.vercel.app/newsroom" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-600 hover:text-gray-400 transition">
            🍳 KI-Gastro-Newsroom — Was KI f&uuml;r Restaurants bedeutet
          </a>
        </div>
      </div>

      {/* Email Gate — fixed bottom bar */}
      {!isUnlocked && (
        <EmailGate
          primaryColor="#FF2D55"
          scannerSource="Quantum"
          url={displayUrl}
          onUnlock={handleUnlock}
        />
      )}
    </main>
  )
}

export default function ResultsClient() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF2D55] mx-auto" />
      </main>
    }>
      <ResultsContent />
    </Suspense>
  )
}
