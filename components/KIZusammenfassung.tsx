'use client'

import { KiSummary } from '@/lib/ki-summary'
import BlurWrapper from './BlurWrapper'

interface Props {
  kiSummary: KiSummary | null
  isUnlocked: boolean
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SummaryCard({ kiSummary }: { kiSummary: KiSummary }) {
  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <ShieldIcon />
        <h2 className="font-semibold text-white">So sieht KI dein Restaurant heute</h2>
      </div>
      <p className="text-sm font-light text-gray-300 leading-relaxed">
        {kiSummary.zusammenfassung}
      </p>
    </div>
  )
}

export default function KIZusammenfassung({ kiSummary, isUnlocked }: Props) {
  if (!kiSummary) return null

  if (!isUnlocked) {
    return (
      <BlurWrapper bgColor="#0a0a0f">
        <SummaryCard kiSummary={kiSummary} />
      </BlurWrapper>
    )
  }

  return <SummaryCard kiSummary={kiSummary} />
}
