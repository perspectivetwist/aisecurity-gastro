import type { Metadata } from 'next'
import ResultsClient from './ResultsClient'

type Props = { searchParams: { url?: string } }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const rawUrl = searchParams.url || ''
  let domain = ''
  try { domain = new URL(decodeURIComponent(rawUrl)).hostname } catch {}

  const title = domain
    ? `KI-Sicherheitsanalyse: ${domain} | Quantum Gastro Scanner`
    : 'Quantum Gastro Scanner für Gastronomie'
  const description = domain
    ? `Sicherheits-Ergebnis für ${domain}: Wie verwundbar ist dein Restaurant gegenüber KI-Angriffen?`
    : 'Kostenloser KI-Sicherheits-Scan für die Gastronomie'

  return {
    title,
    description,
    openGraph: { title, description },
  }
}

export default function ResultsPage() {
  return <ResultsClient />
}
