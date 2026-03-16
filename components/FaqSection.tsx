import { FaqItem } from '@/types/aeo'

interface Props { faqItems: FaqItem[]; locked?: boolean }

export default function FaqSection({ faqItems, locked }: Props) {
  return (
    <div className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-3">FAQ-Struktur</h2>
      <div className={`space-y-4 ${locked ? 'blur-[3px] opacity-60 pointer-events-none select-none' : ''}`}>
        {faqItems.map((item, i) => (
          <div key={i} className="border-b border-white/10 pb-3 last:border-0">
            <p className="font-normal text-sm text-gray-200 break-words">{item.question}</p>
            <p className="text-gray-400 text-sm font-light mt-1 break-words">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
