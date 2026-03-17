import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Quantum - KI-Sicherheits-Scanner für KMUs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0A0A0A',
        position: 'relative',
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,85,0.25) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
        }}
      />

      {/* Logo / Brand */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 40,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: '#FF2D55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            fontWeight: 700,
            color: 'white',
          }}
        >
          Q
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: 'white',
            display: 'flex',
          }}
        >
          Quantum
        </div>
      </div>

      {/* Headline */}
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: 'white',
          textAlign: 'center',
          lineHeight: 1.2,
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span>Ist deine Website eine</span>
        <span>
          Einladung für{' '}
          <span style={{ color: '#FF2D55' }}>KI-Angriffe</span>?
        </span>
      </div>

      {/* Subline */}
      <div
        style={{
          fontSize: 22,
          color: '#999999',
          marginTop: 28,
          display: 'flex',
        }}
      >
        Kostenloser KI-Sicherheits-Scan in 30 Sekunden
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          gap: 32,
          fontSize: 16,
          color: '#666666',
        }}
      >
        <span style={{ display: 'flex' }}>25+ Sicherheits-Checks</span>
        <span style={{ display: 'flex', color: '#444444' }}>|</span>
        <span style={{ display: 'flex' }}>5 Dimensionen</span>
        <span style={{ display: 'flex', color: '#444444' }}>|</span>
        <span style={{ display: 'flex' }}>Kein Account nötig</span>
      </div>
    </div>,
    { ...size }
  )
}
