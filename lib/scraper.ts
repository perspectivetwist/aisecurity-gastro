// lib/scraper.ts

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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const headers: Record<string, string> = { 'Accept': 'text/plain' };
    if (process.env.JINA_API_KEY) {
      headers['Authorization'] = `Bearer ${process.env.JINA_API_KEY}`;
    }

    let res = await fetch(`https://r.jina.ai/${url}`, {
      headers,
      signal: controller.signal,
    });

    // Auth-Fallback: Wenn 401 (ungültiger Key), ohne Auth-Header versuchen
    if (!res.ok && res.status === 401 && process.env.JINA_API_KEY) {
      res = await fetch(`https://r.jina.ai/${url}`, {
        headers: { 'Accept': 'text/plain' },
        signal: controller.signal,
      });
    }

    // HTTPS→HTTP Fallback: Wenn Jina 422 gibt (SSL-Fehler), mit http:// versuchen
    if (!res.ok && res.status === 422 && url.startsWith('https://')) {
      const httpUrl = url.replace('https://', 'http://');
      res = await fetch(`https://r.jina.ai/${httpUrl}`, {
        headers: { 'Accept': 'text/plain' },
        signal: controller.signal,
      });
    }

    if (!res.ok) {
      throw new ScrapeError(`Jina.ai Fehler: ${res.status}`, 'FETCH_ERROR');
    }

    const text = await res.text();
    return text.substring(0, 15000);

  } catch (err) {
    if (err instanceof ScrapeError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new ScrapeError('Timeout nach 20 Sekunden', 'TIMEOUT');
    }
    throw new ScrapeError('Scraping fehlgeschlagen', 'FETCH_ERROR');
  } finally {
    clearTimeout(timeout);
  }
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
