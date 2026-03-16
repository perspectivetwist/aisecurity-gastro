'use client'

const ERROR_MESSAGES: Record<string, { title: string; message: string }> = {
  INVALID_URL: {
    title: 'Ungültige URL',
    message: 'Diese URL können wir nicht scannen. Bitte eine öffentliche Website eingeben.',
  },
  TIMEOUT: {
    title: 'Timeout',
    message: 'Die Website hat zu lange gebraucht. Bitte nochmal versuchen.',
  },
  RATE_LIMITED: {
    title: 'Limit erreicht',
    message: 'Du hast heute schon 10 Scans durchgeführt. Morgen wieder.',
  },
  FETCH_ERROR: {
    title: 'Website nicht erreichbar',
    message: 'Die Website konnte nicht geladen werden. Ist die URL korrekt und die Seite online?',
  },
  NETWORK_ERROR: {
    title: 'Verbindungsfehler',
    message: 'Keine Verbindung zum Server. Bitte prüfe deine Internetverbindung und versuche es erneut.',
  },
  UNKNOWN: {
    title: 'Fehler',
    message: 'Etwas hat nicht geklappt. Unser Team wurde informiert.',
  },
}

export default function ErrorState({
  code,
  onRetry,
}: {
  code: string
  onRetry?: () => void
}) {
  const error = ERROR_MESSAGES[code] || ERROR_MESSAGES['UNKNOWN']

  return (
    <div
      className="rounded-xl p-6 text-center max-w-md mx-auto"
      style={{
        border: '1px solid rgba(255,45,85,0.2)',
        background: 'rgba(255,45,85,0.05)',
      }}
    >
      <div className="text-3xl mb-3">&#x26a0;&#xfe0f;</div>
      <h3 className="text-white font-semibold text-lg mb-2">{error.title}</h3>
      <p className="text-gray-400 text-sm mb-5 leading-relaxed">{error.message}</p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="h-10 px-6 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: '#FF2D55',
            boxShadow: '0 0 12px rgba(255,45,85,0.3)',
          }}
        >
          Nochmal versuchen
        </button>
      ) : (
        <a
          href="/"
          className="inline-block h-10 leading-10 px-6 rounded-xl text-sm font-medium text-white transition-all"
          style={{
            background: '#FF2D55',
            boxShadow: '0 0 12px rgba(255,45,85,0.3)',
          }}
        >
          Zur&uuml;ck zur Startseite
        </a>
      )}
    </div>
  )
}
