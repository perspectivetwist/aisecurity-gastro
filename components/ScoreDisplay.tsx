interface Props {
  score: number
  url: string
}

export default function ScoreDisplay({ score, url }: Props) {
  const label = score >= 70 ? 'Gut' : score >= 40 ? 'Ausbaufähig' : 'Kritisch'
  const labelColor = score >= 70 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm text-center">
      <p className="text-sm font-light text-gray-500 mb-1 truncate">{url}</p>
      <div className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent my-3">
        {score}
      </div>
      <p className="text-base font-light text-gray-300">
        AEO-Score · <span className={`font-medium ${labelColor}`}>{label}</span>
      </p>
      <p className="text-xs font-light text-gray-500 mt-1">0 = unsichtbar für KI · 100 = optimal</p>
    </div>
  )
}
