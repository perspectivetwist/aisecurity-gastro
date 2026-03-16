// lib/dimensions/datenprofil.ts — Dimension 1: Datenprofil (20% Gewichtung)
// Prüft wie viel OSINT-Rohmaterial die Website liefert

import { DimensionResult, CheckResult } from '@/types/quantum';

function hasFullNames(text: string): CheckResult {
  // Vor- + Nachname: 2+ Wörter großgeschrieben hintereinander
  const matches = text.match(/\b[A-ZÄÖÜ][a-zäöüß]+\s+[A-ZÄÖÜ][a-zäöüß]+\b/g) || [];
  // Filter common false positives (city names, company names at sentence start)
  const filtered = matches.filter(m =>
    !/(New York|Los Angeles|San Francisco|United States|North America|South America)/i.test(m)
  );
  const count = filtered.length;
  return {
    name: 'hasFullNames',
    found: count > 0,
    riskWeight: Math.min(count / 5, 1), // 5+ Namen = maximales Risiko
    detail: count > 0 ? `${count} mögliche Personennamen gefunden` : undefined,
  };
}

function hasJobTitles(text: string): CheckResult {
  const patterns = /\b(CEO|CTO|CFO|COO|CMO|Geschäftsführer|Geschäftsführerin|Leiter|Leiterin|Manager|Director|Head of|Vorstand|Partner|Gründer|Gründerin|Founder|Co-Founder|Inhaber|Inhaberin|Prokurist|Abteilungsleiter|Teamleiter|Vice President|VP)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasJobTitles',
    found: matches.length > 0,
    riskWeight: Math.min(matches.length / 3, 1),
    detail: matches.length > 0 ? `${matches.length} Jobtitel gefunden` : undefined,
  };
}

function hasEmailPattern(text: string): CheckResult {
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  return {
    name: 'hasEmailPattern',
    found: emails.length > 0,
    riskWeight: Math.min(emails.length / 3, 1),
    detail: emails.length > 0 ? `${emails.length} E-Mail-Adressen gefunden` : undefined,
  };
}

function hasPhoneNumbers(text: string): CheckResult {
  // DE/INT Telefonnummern
  const phones = text.match(/(\+?\d{1,4}[\s-]?\(?\d{1,5}\)?[\s-]?\d{2,10}[\s-]?\d{2,10})/g) || [];
  const filtered = phones.filter(p => p.replace(/\D/g, '').length >= 7);
  return {
    name: 'hasPhoneNumbers',
    found: filtered.length > 0,
    riskWeight: Math.min(filtered.length / 3, 1),
    detail: filtered.length > 0 ? `${filtered.length} Telefonnummern gefunden` : undefined,
  };
}

function hasOrgStructure(text: string): CheckResult {
  const orgPatterns = /\b(team|über uns|about us|unser team|mitarbeiter|organigramm|abteilung|unsere mitarbeiter|ansprechpartner|kontaktperson|our people|staff)\b/gi;
  const matches = text.match(orgPatterns) || [];
  return {
    name: 'hasOrgStructure',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.7 : 0,
    detail: matches.length > 0 ? 'Team-/Organisationsstruktur erkennbar' : undefined,
  };
}

function hasPricingInfo(text: string): CheckResult {
  const pricingPatterns = /\b(preis|pricing|€|EUR|USD|\$|tarif|paket|plan|kosten|preisliste|pro monat|monthly|annually|jährlich|ab \d+|starting at)\b/gi;
  const matches = text.match(pricingPatterns) || [];
  return {
    name: 'hasPricingInfo',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.5 : 0,
    detail: matches.length > 0 ? 'Preis-/Konditionsinformationen sichtbar' : undefined,
  };
}

function hasTechStack(text: string): CheckResult {
  const techPatterns = /\b(powered by|built with|made with|uses|running on|wordpress|shopify|wix|react|angular|vue|next\.js|aws|azure|google cloud|heroku|vercel|netlify|php|python|java|node\.js)\b/gi;
  const matches = text.match(techPatterns) || [];
  return {
    name: 'hasTechStack',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.4 : 0,
    detail: matches.length > 0 ? 'Technologie-Stack sichtbar' : undefined,
  };
}

function classifyRisk(score: number): DimensionResult['riskLevel'] {
  if (score >= 80) return 'none';
  if (score >= 60) return 'low';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'high';
  return 'critical';
}

export function analyzeDatenprofil(text: string): DimensionResult {
  const checks: CheckResult[] = [
    hasFullNames(text),
    hasJobTitles(text),
    hasEmailPattern(text),
    hasPhoneNumbers(text),
    hasOrgStructure(text),
    hasPricingInfo(text),
    hasTechStack(text),
  ];

  // Score: 100 = sicher (nichts gefunden), 0 = maximales Risiko (alles gefunden)
  const totalRiskWeight = checks.reduce((sum, c) => sum + (c.found ? c.riskWeight : 0), 0);
  const maxPossibleRisk = checks.length; // jeder Check kann max 1.0 beitragen
  const riskRatio = totalRiskWeight / maxPossibleRisk;
  const score = Math.round(100 * (1 - riskRatio));

  const findings = checks
    .filter(c => c.found && c.detail)
    .map(c => c.detail as string);

  if (findings.length === 0) {
    findings.push('Keine kritischen Datenprofil-Expositionen gefunden');
  }

  return {
    score,
    weight: 0.20,
    riskLevel: classifyRisk(score),
    checks,
    findings,
  };
}
