/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** PostHog project API key. Empty/undefined disables analytics entirely. */
  readonly PUBLIC_POSTHOG_KEY?: string;
  /** PostHog ingestion host (defaults to https://us.i.posthog.com). */
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
