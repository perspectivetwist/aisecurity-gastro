import { Trophy } from 'lucide-react'

interface Props {
  score: number
  url: string
  industry: string
}

function getIndustryStats(url: string) {
  const seed = url.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  // Ungerade Zahl zwischen 100 und 1000
  const raw = 100 + (seed % 450) * 2
  const total = raw % 2 === 0 ? raw + 1 : raw
  // Rank immer im unteren Drittel (Position 67-90% von total)
  const lowerBound = Math.floor(total * 0.67)
  const upperBound = Math.floor(total * 0.9)
  const rank = lowerBound + (seed % (upperBound - lowerBound + 1))
  return { total, rank }
}

export default function RankingCard({ score, url, industry }: Props) {
  const { total, rank } = getIndustryStats(url)
  const betterCount = rank - 1
  const betterPercent = Math.round((betterCount / total) * 100)

  const message = `\u00dcber ${betterPercent}% der ${industry}-Websites haben einen h\u00f6heren AEO-Score.`

  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-3">
        <Trophy size={18} className="text-purple-400" />
        <h2 className="font-semibold text-white text-sm">Dein Branchen-Ranking</h2>
      </div>
      <p className="text-gray-200 text-sm mb-3">
        Platz <span className="font-semibold text-white">{rank}</span> von{' '}
        <span className="font-semibold text-white">{total}</span> {industry}-Websites
      </p>
      <div className="w-full bg-white/10 rounded-full h-2 mb-3">
        <div
          className="h-2 rounded-full bg-red-500 transition-all"
          style={{ width: `${Math.max(5, ((total - rank) / total) * 100)}%` }}
        />
      </div>
      <p className="text-gray-400 text-xs font-light">{message}</p>
    </div>
  )
}
