interface Props { content: string; locked?: boolean }

export default function AnswerBlock({ content, locked }: Props) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-1">Answer Block</h2>
      <p className="text-xs font-light text-gray-500 mb-3">KI-zitierbarer Antwort-Absatz</p>
      <div className={`bg-purple-500/10 border border-purple-400/20 rounded-lg p-4 text-gray-200 font-light leading-relaxed break-words ${locked ? 'blur-[3px] opacity-60 pointer-events-none select-none' : ''}`}>
        {content}
      </div>
    </div>
  )
}
