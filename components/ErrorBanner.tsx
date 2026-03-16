'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import ErrorState from '@/components/ErrorState'

function ErrorBannerContent() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get('error')

  if (!errorCode) return null

  return (
    <div className="max-w-3xl mx-auto px-4 mb-8">
      <ErrorState code={errorCode} />
    </div>
  )
}

export default function ErrorBanner() {
  return (
    <Suspense fallback={null}>
      <ErrorBannerContent />
    </Suspense>
  )
}
