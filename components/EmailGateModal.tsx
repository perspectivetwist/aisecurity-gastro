'use client'

import { useState } from 'react'
import type { ScanResult } from '@/types/quantum'

export default function EmailGateModal({
  result,
  onSuccess,
  onClose,
}: {
  result: ScanResult;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const totalFindings = Object.values(result.dimensions)
    .reduce((sum, dim) => sum + dim.findings.length, 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmed = email.trim()
    if (!trimmed) {
      setError('Bitte gib deine Email-Adresse ein.')
      return
    }
    if (!trimmed.includes('@') || !trimmed.includes('.')) {
      setError('Bitte gib eine gültige Email-Adresse ein.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          url: result.url,
          score: result.quantumScore,
          dimensions: Object.fromEntries(
            Object.entries(result.dimensions).map(([k, v]) => [k, v.score])
          ),
        }),
      })

      if (!res.ok) {
        setError('Etwas hat nicht geklappt. Bitte nochmal versuchen.')
        setLoading(false)
        return
      }

      localStorage.setItem('quantum_email', trimmed)
      onSuccess()
    } catch {
      setError('Etwas hat nicht geklappt. Bitte nochmal versuchen.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl p-6"
        style={{
          background: 'rgba(20,20,20,0.95)',
          border: '1px solid rgba(255,45,85,0.2)',
          boxShadow: '0 0 40px rgba(255,45,85,0.1)',
        }}
      >
        <h2 className="text-white text-lg font-semibold mb-3">
          Dein vollst&auml;ndiger Findings-Report
        </h2>

        <p className="text-gray-400 text-sm mb-5 leading-relaxed">
          Quantum hat <strong className="text-white">{totalFindings}</strong> spezifische Risiken auf{' '}
          <strong className="text-white">{new URL(result.url).hostname}</strong> identifiziert.
          Der Report zeigt dir genau was gefunden wurde und was du dagegen tun kannst.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.de"
            className="w-full h-11 px-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF2D55]/50 mb-3"
            disabled={loading}
          />

          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-50"
            style={{
              background: '#FF2D55',
              boxShadow: '0 0 20px rgba(255,45,85,0.3)',
            }}
          >
            {loading ? 'Report wird geladen...' : 'Report kostenlos erhalten \u2192'}
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-3">
          Kein Spam. Nur dein Report. Jederzeit abmeldbar.
        </p>
        <p className="text-gray-700 text-xs text-center mt-1">
          Wir speichern nur deine Email und die gescannte URL. Keine Website-Inhalte werden gespeichert.
        </p>
      </div>
    </div>
  )
}
