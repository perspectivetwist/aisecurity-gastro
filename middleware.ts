// middleware.ts — Rate Limiting für /api/scan
import { NextRequest, NextResponse } from 'next/server';

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 999999;      // Rate Limit ausgesetzt
const WINDOW_MS = 3600000; // 1 Stunde in ms

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || '';

  // Wenn Request über *.vercel.app kommt: noindex Header setzen
  if (host.endsWith('.vercel.app')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }

  if (!req.nextUrl.pathname.startsWith('/api/scan')) {
    return NextResponse.next();
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return NextResponse.next();
  }

  if (entry.count >= LIMIT) {
    return NextResponse.json(
      { error: 'Zu viele Anfragen. Bitte warte eine Stunde.', code: 'RATE_LIMITED' },
      { status: 429 }
    );
  }

  entry.count++;
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
