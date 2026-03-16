# Task 2.1 — lib/dimensions/datenprofil.ts – Dimension 1

## Was wurde gebaut
- 7 Checks: hasFullNames, hasJobTitles, hasEmailPattern, hasPhoneNumbers, hasOrgStructure, hasPricingInfo, hasTechStack
- Score 0-100 (100 = sicher, 0 = maximales Risiko)
- riskWeight pro Check (0-1) gewichtet den Beitrag zum Gesamtrisiko

## Was hat funktioniert
- Regex-Patterns erkennen DE+EN Jobtitel, Telefonnummern, Emails zuverlässig
- Score-Berechnung: Risky Text → 50, leerer Text → 100

## Was war unerwartet
- Nichts. Alles nach Plan.

## Was beim nächsten Mal anders machen
- Nichts zu ändern.
