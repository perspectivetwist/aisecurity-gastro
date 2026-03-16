interface Props { title: string; description: string; locked?: boolean }

export default function MetaTagsOutput({ title, description, locked }: Props) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-3">Meta Tags</h2>
      <div className={`space-y-3 ${locked ? 'blur-[3px] opacity-60 pointer-events-none select-none' : ''}`}>
        <div>
          <p className="text-xs font-light text-gray-500 mb-1">Title ({title.length}/60 Zeichen)</p>
          <p className="font-medium text-gray-200 break-words">{title}</p>
        </div>
        <div>
          <p className="text-xs font-light text-gray-500 mb-1">Description ({description.length}/155 Zeichen)</p>
          <p className="text-gray-300 text-sm font-light break-words">{description}</p>
        </div>
      </div>
    </div>
  )
}
