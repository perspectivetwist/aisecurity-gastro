import type { ScanResult } from '@/types/quantum';

const BAND_COLORS: Record<ScanResult['band'], string> = {
  critical: '#FF2D55',
  gefaehrdet: '#FF6B35',
  teilgeschuetzt: '#FFD700',
  gut: '#00FF87',
};

const BAND_TEXTS: Record<ScanResult['band'], string> = {
  critical: 'Deine Website bietet erhebliche Angriffsfläche für KI-gestützte Attacken. Sofortiger Handlungsbedarf.',
  gefaehrdet: 'Mehrere offene Einfallstore gefunden. Angreifer haben es leichter als nötig.',
  teilgeschuetzt: 'Grundschutz vorhanden, aber konkrete Lücken identifiziert.',
  gut: 'Minimale Exposition. Deine Website ist gut aufgestellt gegen KI-Angriffe.',
};

export default function BandBadge({ band, bandLabel }: { band: ScanResult['band']; bandLabel: string }) {
  const color = BAND_COLORS[band];

  return (
    <div className="text-center">
      <span
        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wider"
        style={{
          color,
          border: `1px solid ${color}40`,
          background: `${color}15`,
        }}
      >
        {bandLabel}
      </span>
      <p className="text-gray-400 text-sm mt-3 max-w-md mx-auto leading-relaxed">
        {BAND_TEXTS[band]}
      </p>
    </div>
  );
}
