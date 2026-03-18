// lib/scraper.ts

function cleanEnvKey(key: string | undefined): string | undefined {
  if (!key) return undefined
  return key.replace(/^["']+|["']+$/g, '').replace(/\\n/g, '').trim()
}

export class ScrapeError extends Error {
  constructor(
    message: string,
    public code: 'INVALID_URL' | 'SSRF_BLOCKED' | 'TIMEOUT' | 'FETCH_ERROR'
  ) {
    super(message);
    this.name = 'ScrapeError';
  }
}

// URL-Validator — SSRF-Schutz (KRITISCH laut SECURITY.md)
export function validateUrl(url: string): void {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new ScrapeError('Ungültige URL', 'INVALID_URL');
  }

  if (parsed.protocol !== 'https:') {
    throw new ScrapeError('Nur https:// erlaubt', 'INVALID_URL');
  }

  const hostname = parsed.hostname.toLowerCase();
  const BLOCKED_PATTERNS = [
    /^localhost$/,
    /^127\./,
    /^192\.168\./,
    /^10\./,
    /^172\.(1[6-9]|2\d|3[01])\./,
    /^::1$/,
    /\.local$/,
    /\.internal$/,
  ];

  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(hostname)) {
      throw new ScrapeError('Interne URL blockiert', 'SSRF_BLOCKED');
    }
  }
}

// Hauptfunktion: Website scrapen via Jina.ai
export async function scrapeUrl(url: string): Promise<string> {
  validateUrl(url);

  const hasKey = !!cleanEnvKey(process.env.JINA_API_KEY);
  const urls = [url];
  if (url.startsWith('https://')) {
    urls.push(url.replace('https://', 'http://'));
  }

  // Versuch 1: Mit Auth-Key (kurzer Timeout falls Key ungültig)
  if (hasKey) {
    for (const targetUrl of urls) {
      try {
        const res = await fetch(`https://r.jina.ai/${targetUrl}`, {
          headers: {
            'Accept': 'text/plain',
            'Authorization': `Bearer ${cleanEnvKey(process.env.JINA_API_KEY)!}`,
          },
          signal: AbortSignal.timeout(8000),
        });
        if (res.ok) {
          const text = await res.text();
          return text.substring(0, 15000);
        }
        if (res.status === 401) break;
        if (res.status === 422) continue;
        throw new ScrapeError(`Jina.ai Fehler: ${res.status}`, 'FETCH_ERROR');
      } catch (err) {
        if (err instanceof ScrapeError) throw err;
        break; // Timeout/Netzwerk → ohne Key versuchen
      }
    }
  }

  // Versuch 2: Ohne Auth-Key (Free Tier, voller Timeout)
  for (const targetUrl of urls) {
    try {
      const res = await fetch(`https://r.jina.ai/${targetUrl}`, {
        headers: { 'Accept': 'text/plain' },
        signal: AbortSignal.timeout(20000),
      });
      if (res.ok) {
        const text = await res.text();
        return text.substring(0, 15000);
      }
      if (res.status === 422) continue;
      throw new ScrapeError(`Jina.ai Fehler: ${res.status}`, 'FETCH_ERROR');
    } catch (err) {
      if (err instanceof ScrapeError) throw err;
      if (targetUrl === urls[urls.length - 1]) {
        if ((err as Error).name === 'AbortError' || (err as Error).name === 'TimeoutError') {
          throw new ScrapeError('Timeout nach 20 Sekunden', 'TIMEOUT');
        }
        throw new ScrapeError('Scraping fehlgeschlagen', 'FETCH_ERROR');
      }
      continue;
    }
  }

  throw new ScrapeError('Scraping fehlgeschlagen', 'FETCH_ERROR');
}

// robots.txt separat fetchen (für Dimension 5: Agent-Zugang)
export async function fetchRobotsTxt(url: string): Promise<string> {
  validateUrl(url);
  const domain = new URL(url).origin;
  try {
    const res = await fetch(`${domain}/robots.txt`, { signal: AbortSignal.timeout(5000) });
    return res.ok ? await res.text() : '';
  } catch {
    return '';
  }
}

// llms.txt separat fetchen (für Dimension 5: Agent-Zugang)
export async function fetchLlmsTxt(url: string): Promise<string> {
  validateUrl(url);
  const domain = new URL(url).origin;
  try {
    const res = await fetch(`${domain}/llms.txt`, { signal: AbortSignal.timeout(5000) });
    return res.ok ? await res.text() : '';
  } catch {
    return '';
  }
}
