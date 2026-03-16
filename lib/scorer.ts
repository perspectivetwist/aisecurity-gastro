// lib/scorer.ts — Quantum Score Aggregation
// Ruft alle 5 Dimensionen auf und berechnet den gewichteten Gesamt-Score

import { ScanResult, classifyBand, getBandLabel } from '@/types/quantum';
import { scrapeUrl, fetchRobotsTxt, fetchLlmsTxt } from '@/lib/scraper';
import { analyzeDatenprofil } from '@/lib/dimensions/datenprofil';
import { analyzeIdentitaet } from '@/lib/dimensions/identitaet';
import { analyzeKiEinfallstore } from '@/lib/dimensions/ki-einfallstore';
import { analyzeManipulationsflaeche } from '@/lib/dimensions/manipulationsflaeche';
import { analyzeAgentZugang } from '@/lib/dimensions/agent-zugang';

export async function calculateQuantumScore(url: string): Promise<ScanResult> {
  const startTime = Date.now();

  // Schritt 1: Scraping (parallel: Website + robots.txt + llms.txt)
  const [text, robotsTxt, llmsTxt] = await Promise.all([
    scrapeUrl(url),
    fetchRobotsTxt(url),
    fetchLlmsTxt(url),
  ]);

  // Schritt 2: Dimensionen analysieren (Dim 2 ist async wegen Claude)
  const [datenprofil, identitaetResult, kiEinfallstore, manipulationsflaeche, agentZugang] =
    await Promise.all([
      Promise.resolve(analyzeDatenprofil(text)),
      analyzeIdentitaet(text),
      Promise.resolve(analyzeKiEinfallstore(text)),
      Promise.resolve(analyzeManipulationsflaeche(text)),
      Promise.resolve(analyzeAgentZugang(text, robotsTxt, llmsTxt)),
    ]);

  const identitaet = identitaetResult.dimension;
  const industry = identitaetResult.industry;

  // Schritt 3: Gewichteter Score (KRITISCH — Gewichtung nie ändern)
  const quantumScore = Math.round(
    datenprofil.score * 0.20 +
    identitaet.score * 0.25 +
    kiEinfallstore.score * 0.20 +
    manipulationsflaeche.score * 0.20 +
    agentZugang.score * 0.15
  );

  const band = classifyBand(quantumScore);
  const bandLabel = getBandLabel(band);
  const scanDurationMs = Date.now() - startTime;

  return {
    url,
    quantumScore,
    band,
    bandLabel,
    industry,
    dimensions: {
      datenprofil,
      identitaet,
      kiEinfallstore,
      manipulationsflaeche,
      agentZugang,
    },
    scannedAt: new Date().toISOString(),
    scanDurationMs,
  };
}
