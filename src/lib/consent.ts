// Cookie-consent state machine for the trust center (GO-LIVE WS-D4).
//
// Framework-free port of the product app's consent logic. Persists the choice
// with a version + timestamp (the consent audit trail the questionnaires
// describe), auto-rejects under Do-Not-Track, and gates PostHog accordingly.
import { disableAnalytics, enableAnalytics, isDNTEnabled } from './analytics';

export const CONSENT_VERSION = 1;
const STORAGE_KEY = 'fimil_cookie_consent';

export interface ConsentState {
  functional: boolean;
  analytics: boolean;
  timestamp: string;
  consent_version: number;
}

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.consent_version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* localStorage unavailable — fail open to no-tracking */
  }
}

export function applyConsent(state: ConsentState): void {
  if (state.analytics) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
}

export function saveConsent(functional: boolean, analytics: boolean): ConsentState {
  const state: ConsentState = {
    functional,
    analytics,
    timestamp: new Date().toISOString(),
    consent_version: CONSENT_VERSION,
  };
  writeConsent(state);
  applyConsent(state);
  return state;
}

/**
 * Apply any stored consent on page load. Returns whether the banner still needs
 * to be shown (no prior choice and not auto-rejected by DNT).
 */
export function initConsent(): { needsBanner: boolean } {
  const existing = readConsent();
  if (existing) {
    applyConsent(existing);
    return { needsBanner: false };
  }
  if (isDNTEnabled()) {
    saveConsent(false, false);
    return { needsBanner: false };
  }
  return { needsBanner: true };
}
