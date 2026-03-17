// lib/dimensions/agent-zugang.ts — Dimension 5: Agent-Zugang (15% Gewichtung)
// Prüft wie zugänglich die Website für KI-Agenten ist (robots.txt, llms.txt, JSON-LD)

import { DimensionResult, CheckResult } from '@/types/quantum';

function hasRestrictiveRobotsTxt(robotsTxt: string): CheckResult {
  if (!robotsTxt || robotsTxt.trim().length === 0) {
    return {
      name: 'hasRestrictiveRobotsTxt',
      found: false,
      riskWeight: 0.8, // Keine robots.txt = hohes Risiko
      detail: 'Keine robots.txt gefunden. Website komplett offen für Crawler',
    };
  }

  const hasDisallow = /Disallow:\s*\//m.test(robotsTxt);
  const blocksAI = /\b(GPTBot|ChatGPT|CCBot|anthropic|Claude|Google-Extended|Bard|PerplexityBot)\b/i.test(robotsTxt);

  if (blocksAI) {
    return {
      name: 'hasRestrictiveRobotsTxt',
      found: true,
      riskWeight: 0, // Blockt KI-Crawler = gut
      detail: 'robots.txt blockt KI-Crawler aktiv',
    };
  }

  if (hasDisallow) {
    return {
      name: 'hasRestrictiveRobotsTxt',
      found: true,
      riskWeight: 0.3,
      detail: 'robots.txt vorhanden aber blockt keine KI-Crawler',
    };
  }

  return {
    name: 'hasRestrictiveRobotsTxt',
    found: true,
    riskWeight: 0.6,
    detail: 'robots.txt vorhanden aber ohne restriktive Regeln',
  };
}

function hasLlmsTxt(llmsTxt: string): CheckResult {
  if (!llmsTxt || llmsTxt.trim().length === 0) {
    return {
      name: 'hasLlmsTxt',
      found: false,
      riskWeight: 0.3, // Keine llms.txt = leicht erhöhtes Risiko (noch nicht Standard)
      detail: 'Keine llms.txt gefunden. Kein LLM-spezifischer Zugangsschutz',
    };
  }

  return {
    name: 'hasLlmsTxt',
    found: true,
    riskWeight: 0, // llms.txt vorhanden = bewusste Kontrolle
    detail: 'llms.txt vorhanden, bewusste LLM-Zugangssteuerung',
  };
}

function hasStructuredData(text: string): CheckResult {
  const jsonLdPatterns = /@context.*schema\.org|"@type"|application\/ld\+json/gi;
  const matches = text.match(jsonLdPatterns) || [];

  if (matches.length === 0) {
    return {
      name: 'hasStructuredData',
      found: false,
      riskWeight: 0.2,
      detail: 'Kein JSON-LD Schema gefunden',
    };
  }

  // Structured Data vorhanden — macht Website maschinenlesbarer, aber kontrolliert
  return {
    name: 'hasStructuredData',
    found: true,
    riskWeight: 0.4, // Mehr Daten exponiert, aber kontrolliert
    detail: `${matches.length} Schema.org/JSON-LD Strukturen gefunden`,
  };
}

function hasVisibleApiEndpoints(text: string): CheckResult {
  const patterns = /\b(\/api\/|\/v1\/|\/v2\/|\/graphql|\/rest\/|\/webhook|swagger|api-docs|openapi)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasVisibleApiEndpoints',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.9 : 0,
    detail: matches.length > 0 ? `${matches.length} API-Endpoints sichtbar, potenzielle Angriffsfläche` : undefined,
  };
}

function classifyRisk(score: number): DimensionResult['riskLevel'] {
  if (score >= 80) return 'none';
  if (score >= 60) return 'low';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'high';
  return 'critical';
}

export function analyzeAgentZugang(
  text: string,
  robotsTxt: string,
  llmsTxt: string
): DimensionResult {
  const checks: CheckResult[] = [
    hasRestrictiveRobotsTxt(robotsTxt),
    hasLlmsTxt(llmsTxt),
    hasStructuredData(text),
    hasVisibleApiEndpoints(text),
  ];

  const totalRiskWeight = checks.reduce((sum, c) => {
    // Für nicht-gefundene items (robots.txt fehlt), nutze riskWeight direkt
    if (!c.found && c.riskWeight > 0) return sum + c.riskWeight;
    if (c.found) return sum + c.riskWeight;
    return sum;
  }, 0);
  const maxPossibleRisk = checks.length;
  const riskRatio = totalRiskWeight / maxPossibleRisk;
  const score = Math.round(100 * (1 - riskRatio));

  const findings = checks
    .filter(c => c.detail)
    .map(c => c.detail as string);

  if (findings.length === 0) {
    findings.push('Keine Agent-Zugangs-Risiken gefunden');
  }

  return {
    score,
    weight: 0.15,
    riskLevel: classifyRisk(score),
    checks,
    findings,
  };
}
