import type { DimensionResult } from '@/types/quantum';

const DIMENSION_META: Record<string, { name: string; subtitle: string }> = {
  datenprofil: { name: 'Datenprofil', subtitle: 'Datenhunger-Exposition' },
  identitaet: { name: 'Identität', subtitle: 'Deepfake-Exposition' },
  kiEinfallstore: { name: 'KI-Einfallstore', subtitle: 'AI-Tool-Exposition' },
  manipulationsflaeche: { name: 'Manipulationsfläche', subtitle: 'Prompt Injection Risiko' },
  agentZugang: { name: 'Agent-Zugang', subtitle: 'Agent-Angriffsfläche' },
};

function getBarColor(score: number): string {
  if (score <= 30) return '#FF2D55';
  if (score <= 60) return '#FF6B35';
  if (score <= 85) return '#FFD700';
  return '#00FF87';
}

export default function DimensionBar({
  dimensionKey,
  dimension,
}: {
  dimensionKey: string;
  dimension: DimensionResult;
}) {
  const meta = DIMENSION_META[dimensionKey] || { name: dimensionKey, subtitle: '' };
  const color = getBarColor(dimension.score);
  const weightPercent = Math.round(dimension.weight * 100);

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="text-white font-medium text-sm">{meta.name}</span>
          <span className="text-gray-500 text-xs ml-2">{meta.subtitle}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-white font-bold text-lg" style={{ color }}>
            {dimension.score}
          </span>
          <span className="text-gray-500 text-xs">({weightPercent}%)</span>
        </div>
      </div>
      <div className="w-full h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{
            width: `${dimension.score}%`,
            background: color,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </div>
  );
}
