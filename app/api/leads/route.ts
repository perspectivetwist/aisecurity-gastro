// app/api/leads/route.ts — Quantum Lead-Speicherung in Notion
import { NextRequest, NextResponse } from 'next/server';
import type { LeadRequest } from '@/types/quantum';

export async function POST(req: NextRequest) {
  let body: LeadRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiger Body' }, { status: 400 });
  }

  const { email, url, score, dimensions } = body;

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Ungültige Email' }, { status: 400 });
  }

  try {
    // KRITISCH: NIEMALS created_time manuell setzen → 500 Error (Notion API Gotcha)
    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: process.env.NOTION_QUANTUM_LEADS_DB_ID },
        properties: {
          'Email': { title: [{ text: { content: email } }] },
          'URL': { rich_text: [{ text: { content: url } }] },
          'Score': { number: score },
          'Band': { rich_text: [{ text: { content: score <= 30 ? 'Kritisch' : score <= 60 ? 'Gefährdet' : score <= 85 ? 'Teilgeschützt' : 'Gut aufgestellt' } }] },
          'Dimensions': { rich_text: [{ text: { content: JSON.stringify(dimensions) } }] },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[/api/leads] Notion Error:', response.status, error);
      return NextResponse.json({ error: 'Lead konnte nicht gespeichert werden' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('[/api/leads] Error:', err);
    return NextResponse.json({ error: 'Lead konnte nicht gespeichert werden' }, { status: 500 });
  }
}
