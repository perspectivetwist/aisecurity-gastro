// app/api/scan/route.ts — Quantum Scan API Endpoint
import { NextRequest, NextResponse } from 'next/server';
import { calculateQuantumScore } from '@/lib/scorer';
import { ScrapeError, validateUrl } from '@/lib/scraper';
import type { ScanRequest } from '@/types/quantum';
import { logScan } from '@/lib/notion';

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  let body: ScanRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 });
  }

  const { url } = body;

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'URL fehlt' }, { status: 400 });
  }

  // URL normalisieren
  const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;

  // URL validieren (SSRF-Schutz)
  try {
    validateUrl(normalizedUrl);
  } catch (err) {
    if (err instanceof ScrapeError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: 400 });
    }
  }

  // Scan mit Timeout-Schutz (Vercel Hobby: max 60 Sek.)
  try {
    const result = await Promise.race([
      calculateQuantumScore(normalizedUrl),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('GLOBAL_TIMEOUT')), 50000)
      ),
    ]);

    result.scanDurationMs = Date.now() - startTime;

    // Scan in Notion loggen
    await logScan(normalizedUrl, result.quantumScore);

    return NextResponse.json(result, { status: 200 });

  } catch (err) {
    const error = err as Error;

    if (error instanceof ScrapeError) {
      if (error.code === 'TIMEOUT') {
        return NextResponse.json(
          { error: 'Website hat zu lange gebraucht. Bitte nochmal versuchen.', code: 'TIMEOUT' },
          { status: 504 }
        );
      }
      return NextResponse.json({ error: error.message, code: error.code }, { status: 422 });
    }

    if (error.message === 'GLOBAL_TIMEOUT') {
      return NextResponse.json(
        { error: 'Analyse-Timeout. Bitte nochmal versuchen.', code: 'TIMEOUT' },
        { status: 504 }
      );
    }

    console.error('[/api/scan] Unbekannter Fehler:', error);
    return NextResponse.json(
      { error: 'Interner Fehler. Unser Team wurde informiert.', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
