// lib/dimensions/ki-einfallstore.ts — Dimension 3: KI-Einfallstore (20% Gewichtung)
// Prüft ob die Website KI-Tools exponiert die als Angriffsvektoren dienen können

import { DimensionResult, CheckResult } from '@/types/quantum';

function hasVisibleChatbot(text: string): CheckResult {
  const patterns = /\b(intercom|drift|tidio|crisp|zendesk|freshchat|livechat|hubspot|tawk\.to|chatbot|live-chat|chat-widget|messenger-widget)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasVisibleChatbot',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.8 : 0,
    detail: matches.length > 0 ? `${matches.length} Chatbot-/LiveChat-Signale gefunden` : undefined,
  };
}

function hasOpenAISignals(text: string): CheckResult {
  const patterns = /\b(openai\.com|chatgpt|gpt-4|gpt-3|dall-e|whisper|openai|claude\.ai|anthropic|gemini|bard)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasOpenAISignals',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.6 : 0,
    detail: matches.length > 0 ? `${matches.length} KI-Plattform-Referenzen gefunden` : undefined,
  };
}

function hasAIWidgets(text: string): CheckResult {
  const patterns = /\b(ai-widget|ai-assistant|ai-chat|copilot|virtual-assistant|smart-assistant|ai-powered|machine-learning|neural|ml-model)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasAIWidgets',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.7 : 0,
    detail: matches.length > 0 ? `${matches.length} KI-Widget-Signaturen gefunden` : undefined,
  };
}

function hasShadowAI(text: string): CheckResult {
  // Nicht-deklarierte KI-Tools: versteckte Script-Tags, API-Calls
  const patterns = /\b(api\.openai|api\.anthropic|api\.cohere|huggingface\.co|replicate\.com|stability\.ai)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasShadowAI',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.9 : 0,
    detail: matches.length > 0 ? `${matches.length} nicht-deklarierte KI-API-Referenzen gefunden` : undefined,
  };
}

function hasThirdPartyAI(text: string): CheckResult {
  const patterns = /\b(ai\.[a-z]+\.[a-z]+|bot\.[a-z]+\.[a-z]+|agent\.[a-z]+\.[a-z]+|\.ai\/)\b/gi;
  const matches = text.match(patterns) || [];
  return {
    name: 'hasThirdPartyAI',
    found: matches.length > 0,
    riskWeight: matches.length > 0 ? 0.5 : 0,
    detail: matches.length > 0 ? `${matches.length} Drittanbieter-KI-Subdomains verlinkt` : undefined,
  };
}

function classifyRisk(score: number): DimensionResult['riskLevel'] {
  if (score >= 80) return 'none';
  if (score >= 60) return 'low';
  if (score >= 40) return 'medium';
  if (score >= 20) return 'high';
  return 'critical';
}

export function analyzeKiEinfallstore(text: string): DimensionResult {
  const checks: CheckResult[] = [
    hasVisibleChatbot(text),
    hasOpenAISignals(text),
    hasAIWidgets(text),
    hasShadowAI(text),
    hasThirdPartyAI(text),
  ];

  const totalRiskWeight = checks.reduce((sum, c) => sum + (c.found ? c.riskWeight : 0), 0);
  const maxPossibleRisk = checks.length;
  const riskRatio = totalRiskWeight / maxPossibleRisk;
  const score = Math.round(100 * (1 - riskRatio));

  const findings = checks
    .filter(c => c.found && c.detail)
    .map(c => c.detail as string);

  if (findings.length === 0) {
    findings.push('Keine KI-Einfallstore gefunden');
  }

  return {
    score,
    weight: 0.20,
    riskLevel: classifyRisk(score),
    checks,
    findings,
  };
}
