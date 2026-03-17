// lib/dimensions/manipulationsflaeche.ts — Dimension 4: Manipulationsfläche (20% Gewichtung)
// Prüft Input-Felder und Formulare die für Prompt Injection anfällig sein können

import { DimensionResult, CheckResult } from '@/types/quantum';

function hasContactForms(text: string): CheckResult {
  const patterns = /(<form\b|kontaktformular|contact form|kontakt-formular|formular|anfrage senden|nachricht senden|send message|get in touch)/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasContactForms',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.6 : 0,
    detail: matches.length > 0 ? `${matches.length} Kontaktformulare/Formulare gefunden` : undefined,
  };
}

function hasSearchField(text: string): CheckResult {
  const patterns = /(<input[^>]*type=["']search|search-input|search-field|suchfeld|suche|search-bar|site-search)/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasSearchField',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.5 : 0,
    detail: matches.length > 0 ? 'Suchfeld gefunden, potenzieller Injection-Punkt' : undefined,
  };
}

function hasCaptcha(text: string): CheckResult {
  const patterns = /\b(hcaptcha|recaptcha|captcha|turnstile|cloudflare.*challenge|bot-protection|spam-schutz)\b/gi;
  const matches = text.match(patterns) || [];
  // CAPTCHA vorhanden = GUT (reduziert Risiko)
  return {
    name: 'hasCaptcha',
    found: matches.length > 0,
    riskWeight: 0, // Captcha ist positiv — kein Risiko
    detail: matches.length > 0 ? 'CAPTCHA-Schutz vorhanden' : undefined,
  };
}

function hasCommentSection(text: string): CheckResult {
  const patterns = /\b(kommentar|comment|disqus|wordpress.*comment|respond|leave.*reply|antwort.*schreiben|kommentieren)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasCommentSection',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.7 : 0,
    detail: matches.length > 0 ? 'Kommentar-Bereich gefunden, offener Input-Kanal' : undefined,
  };
}

function hasNewsletterInput(text: string): CheckResult {
  const patterns = /\b(newsletter|subscribe|abonnieren|e-mail.*eintragen|signup|anmelden|mailing.*list|mailchimp|sendinblue|convertkit)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasNewsletterInput',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.4 : 0,
    detail: matches.length > 0 ? 'Newsletter-Formular gefunden' : undefined,
  };
}

function classifyRisk(score: number): DimensionResult['riskLevel'] {
  if (score >= 80) return 'none';
  if (score >= 60) return 'low';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'high';
  return 'critical';
}

export function analyzeManipulationsflaeche(text: string): DimensionResult {
  const checks: CheckResult[] = [
    hasContactForms(text),
    hasSearchField(text),
    hasCaptcha(text),
    hasCommentSection(text),
    hasNewsletterInput(text),
  ];

  // CAPTCHA ist positiv — zählt nicht zum Risiko, aber Formulare ohne CAPTCHA = höheres Risiko
  const hasCaptchaProtection = checks.find(c => c.name === 'hasCaptcha')?.found ?? false;
  const formChecks = checks.filter(c => c.name !== 'hasCaptcha');

  let totalRiskWeight = formChecks.reduce((sum, c) => sum + (c.found ? c.riskWeight : 0), 0);

  // Wenn CAPTCHA vorhanden, reduziere Risiko um 30%
  if (hasCaptchaProtection) {
    totalRiskWeight *= 0.7;
  }

  const maxPossibleRisk = formChecks.length;
  const riskRatio = maxPossibleRisk > 0 ? totalRiskWeight / maxPossibleRisk : 0;
  const score = Math.round(100 * (1 - riskRatio));

  const findings = checks
    .filter(c => c.found && c.detail)
    .map(c => c.detail as string);

  if (findings.length === 0) {
    findings.push('Keine offenen Manipulationsflächen gefunden');
  }

  return {
    score,
    weight: 0.20,
    riskLevel: classifyRisk(score),
    checks,
    findings,
  };
}
