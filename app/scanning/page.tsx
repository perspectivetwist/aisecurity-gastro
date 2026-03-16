'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

const COLOR = '#FF2D55'

const loadingSteps = [
  'Analysiere Datenprofil…',
  'Prüfe Identitäts-Risiken…',
  'Analysiere KI-Einfallstore…',
  'Prüfe Manipulationsfläche…',
  'Berechne Security-Score…',
]

const MIN_STEP_BEFORE_NAV = 3

function LoadingState({ step }: { step: number }) {
  return (
    <div className="flex flex-col items-center gap-6">
      <video
        src="/loading-anim.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-64 h-64 object-cover pointer-events-none"
        style={{ mixBlendMode: 'screen', WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 70%)', maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 70%)' }}
        ref={(el) => { if (el) el.playbackRate = 0.7 }}
      />

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm font-medium" style={{ color: COLOR }}>
          {loadingSteps[step]}
        </span>
        <div className="flex gap-1.5">
          {loadingSteps.map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: i <= step ? COLOR : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ScanningPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const scanDone = useRef(false)
  const resultReady = useRef(false)

  useEffect(() => {
    const url = sessionStorage.getItem('quantum_scan_url')
    if (!url) {
      router.push('/')
      return
    }

    // Run scan in background
    const runScan = async () => {
      try {
        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })

        if (!res.ok) {
          const err = await res.json()
          router.push(`/?error=${encodeURIComponent(err.code ?? 'UNKNOWN')}`)
          return
        }

        const result = await res.json()
        sessionStorage.setItem('quantum_scan_result', JSON.stringify(result))
        scanDone.current = true
      } catch {
        router.push('/?error=NETWORK_ERROR')
      }
    }

    runScan()

    // Cycle through steps every 3 seconds
    const interval = setInterval(() => {
      setStep((prev) => {
        const next = prev + 1

        // If scan is done and we've shown enough steps, navigate
        if (scanDone.current && next >= MIN_STEP_BEFORE_NAV) {
          if (!resultReady.current) {
            resultReady.current = true
            setTimeout(() => router.push('/results'), 800)
          }
        }

        // If we're at the last step and scan is done, navigate
        if (next >= loadingSteps.length - 1 && scanDone.current) {
          if (!resultReady.current) {
            resultReady.current = true
            setTimeout(() => router.push('/results'), 800)
          }
          return loadingSteps.length - 1
        }

        // Stay on last step if we've cycled through all
        if (next >= loadingSteps.length - 1) {
          return loadingSteps.length - 1
        }

        return next
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [router])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <LoadingState step={step} />
    </main>
  )
}
