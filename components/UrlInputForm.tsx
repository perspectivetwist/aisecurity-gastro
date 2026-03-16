'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function ShieldIcon({ fillLevel }: { fillLevel: number }) {
  return (
    <svg
      width="28"
      height="32"
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 6px rgba(255,45,85,0.9)) drop-shadow(0 0 14px rgba(255,45,85,0.4))' }}
    >
      <defs>
        <clipPath id="shield-input-clip">
          <path d="M24 3 L43 11 L43 27 C43 40 24 53 24 53 C24 53 5 40 5 27 L5 11 Z" />
        </clipPath>
        <linearGradient id="shield-input-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset={`${fillLevel}%`} stopColor="#FF2D55" stopOpacity="0" />
          <stop offset={`${fillLevel}%`} stopColor="#FF2D55" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#FF1040" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect
        x="0" y="0" width="48" height="56"
        fill="url(#shield-input-grad)"
        clipPath="url(#shield-input-clip)"
      />
      <path
        d="M24 3 L43 11 L43 27 C43 40 24 53 24 53 C24 53 5 40 5 27 L5 11 Z"
        stroke="#FF2D55" strokeWidth="1.8" fill="none"
      />
      <path
        d="M17 28 L22 33 L31 22"
        stroke="#FF2D55" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        opacity="0.6"
      />
    </svg>
  )
}

export default function UrlInputForm() {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [scanCount, setScanCount] = useState(() =>
    Math.floor(Math.random() * 10) + 5
  )
  const [fillLevel, setFillLevel] = useState(100)
  const router = useRouter()

  useEffect(() => {
    const counter = setInterval(() => {
      setScanCount(prev => {
        const delta = Math.floor(Math.random() * 3) - 1
        return Math.max(5, Math.min(15, prev + delta))
      })
    }, 60000)

    let fill = 100
    const fillInterval = setInterval(() => {
      fill -= 2.5
      if (fill <= 0) fill = 100
      setFillLevel(fill)
    }, 70)

    return () => {
      clearInterval(counter)
      clearInterval(fillInterval)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const trimmed = url.trim()
    if (!trimmed) {
      setError('Bitte URL eingeben')
      return
    }

    if (trimmed.length > 500) {
      setError('URL zu lang (max 500 Zeichen)')
      return
    }

    sessionStorage.setItem('quantum_scan_url', trimmed)
    router.push('/scanning')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://deine-website.de"
              className="w-full h-11 px-4 pr-12 rounded-lg border border-white/15 bg-white/5 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF2D55]/50 focus:border-[#FF2D55]/50 backdrop-blur-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ShieldIcon fillLevel={fillLevel} />
            </div>
            <p className="hidden sm:block absolute -bottom-5 right-0 text-[#FF2D55] text-xs font-light">
              Gerade aktiv: {scanCount} Scans
            </p>
          </div>
          <div className="shrink-0">
            <button
              type="submit"
              className="h-11 px-4 sm:px-8 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm border border-[#FF2D55]/30 bg-[#FF2D55]/10 hover:bg-[#FF2D55]/20 text-[#FF2D55] whitespace-nowrap"
            >
              Jetzt scannen
            </button>
          </div>
        </div>
        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
      </form>
    </div>
  )
}
