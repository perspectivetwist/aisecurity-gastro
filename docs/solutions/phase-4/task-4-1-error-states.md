# Task 4.1 — Error States + Loading UX

## Was wurde gebaut
- components/ErrorState.tsx: Universelle Fehler-Komponente mit Icon, Text, Retry-Button
- components/ErrorBanner.tsx: Liest ?error= Param auf Landing Page, zeigt ErrorState
- app/page.tsx: ErrorBanner eingebunden (zwischen Hero und Stats)

## Was hat funktioniert
- scanning/page.tsx redirectet bereits korrekt zu /?error=CODE
- ErrorState deckt alle API Error Codes ab: INVALID_URL, TIMEOUT, RATE_LIMITED, FETCH_ERROR, NETWORK_ERROR, UNKNOWN
- Loading UX (scanning page) war bereits in Task 3.2 implementiert (6 Steps, Doppel-Spinner)

## Was war unerwartet
- Landing Page ist Server Component — ErrorBanner brauchte Suspense-Wrapper für useSearchParams

## Was beim nächsten Mal anders machen
- Nichts.
