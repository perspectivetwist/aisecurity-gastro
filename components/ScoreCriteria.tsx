import { ScoreCriterion } from '@/types/aeo'

interface Props { criteria: ScoreCriterion[] }

export default function ScoreCriteria({ criteria }: Props) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-4">Kriterien-Analyse</h2>
      <div className="space-y-3">
        {criteria.map((c) => (
          <div key={c.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-light text-gray-300">{c.name}</span>
              <span className="font-light text-gray-500">{c.score}/{c.maxScore}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${c.passed ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-white/20'}`}
                style={{ width: `${(c.score / c.maxScore) * 100}%` }}
              />
            </div>
            {!c.passed && <p className="text-xs font-light text-gray-500 mt-1">{c.hint}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
