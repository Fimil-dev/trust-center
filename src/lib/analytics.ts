// PostHog analytics for the trust center (GO-LIVE WS-D4).
//
// The trust center's published CAIQ/VSA questionnaires assert that analytics
// (PostHog) are consent-gated, Do-Not-Track is respected, and a consent banner
// with Accept/Reject/Customize is offered. This module + the CookieConsent
// banner make those statements true: opt-out by default until the visitor
// accepts, DNT respected, autocapture + session recording OFF, content masked.
import posthog from 'posthog-js';

const KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const HOST = import.meta.env.PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
const APP = 'trust';

let initialized = false;

export function isDNTEnabled(): boolean {
  return typeof navigator !== 'undefined' && navigator.doNotTrack === '1';
}

export function isConfigured(): boolean {
  return Boolean(KEY);
}

export function enableAnalytics(): void {
  if (!KEY || isDNTEnabled()) return;
  if (!initialized) {
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
      mask_all_text: true,
      mask_all_element_attributes: true,
      opt_out_capturing_by_default: true,
      respect_dnt: true,
    });
    posthog.register({ app: APP });
    initialized = true;
  }
  posthog.opt_in_capturing();
}

export function disableAnalytics(): void {
  if (initialized) posthog.opt_out_capturing();
}
