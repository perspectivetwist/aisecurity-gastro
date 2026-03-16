// types/quantum.ts

// Einzelner Check-Befund pro Dimension
export interface CheckResult {
  name: string;           // z.B. "hasPersonPhotos"
  found: boolean;         // true = Risiko gefunden
  riskWeight: number;     // 0-1, wie viel dieser Check zum Risiko beiträgt
  detail?: string;        // optionale Erläuterung
}

// Ergebnis einer Dimension
export interface DimensionResult {
  score: number;           // 0-100 (100 = sicher, 0 = maximales Risiko)
  weight: number;          // Gewichtung: 0.20, 0.25 etc.
  riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
  checks: CheckResult[];   // Alle ausgeführten Checks
  findings: string[];      // KMU-verständliche Befunde (z.B. "3 Mitarbeiterfotos gefunden")
}

// Gesamt-Scan-Ergebnis
export interface ScanResult {
  url: string;
  quantumScore: number;    // 0-100, gewichteter Gesamt-Score
  band: 'critical' | 'gefaehrdet' | 'teilgeschuetzt' | 'gut';
  bandLabel: string;       // Anzeige: "Kritisch" | "Gefährdet" | "Teilgeschützt" | "Gut aufgestellt"
  industry: string;        // z.B. "Zahnarztpraxis", "Handwerksbetrieb" — erkannt via Claude
  dimensions: {
    datenprofil: DimensionResult;       // 20%
    identitaet: DimensionResult;        // 25%
    kiEinfallstore: DimensionResult;    // 20%
    manipulationsflaeche: DimensionResult; // 20%
    agentZugang: DimensionResult;       // 15%
  };
  scannedAt: string;       // ISO 8601
  scanDurationMs?: number; // Performance-Tracking
}

// Findings-Report pro Dimension (nach Email-Gate)
export interface DimensionFindings {
  dimensionName: string;   // z.B. "Identität"
  subtitle: string;        // z.B. "Deepfake-Exposition"
  score: number;
  riskLevel: DimensionResult['riskLevel'];
  findings: string[];      // KMU-Sprache, keine Techno-Jargon
  explanation: string;     // Warum das ein Risiko ist (1-2 Sätze)
}

export interface FindingsReport {
  url: string;
  quantumScore: number;
  dimensions: DimensionFindings[];
  generatedAt: string;
}

// API Request/Response Types
export interface ScanRequest {
  url: string;
}

export interface LeadRequest {
  email: string;
  url: string;
  score: number;
  dimensions: Record<string, number>; // { datenprofil: 65, identitaet: 30, ... }
}

// Band-Klassifikation Helper
export function classifyBand(score: number): ScanResult['band'] {
  if (score <= 30) return 'critical';
  if (score <= 60) return 'gefaehrdet';
  if (score <= 85) return 'teilgeschuetzt';
  return 'gut';
}

export function getBandLabel(band: ScanResult['band']): string {
  const labels: Record<ScanResult['band'], string> = {
    critical: 'Kritisch',
    gefaehrdet: 'Gefährdet',
    teilgeschuetzt: 'Teilgeschützt',
    gut: 'Gut aufgestellt',
  };
  return labels[band];
}
