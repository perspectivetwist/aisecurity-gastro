'use client'
import { useState } from 'react'

export default function ShareButton({ score }: { score: number }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    const shareUrl = `${window.location.origin}/results?score=${score}`
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full h-11 border border-white/10 text-gray-400 font-light rounded-xl hover:bg-white/5 transition-colors text-sm"
    >
      {copied ? 'Link kopiert \u2713' : 'Score teilen \u2192'}
    </button>
  )
}
