import { describe, it, expect } from 'vitest';
import { trustConfigSchema } from '../src/config/schema';
import config from '../trust.config';

describe('trust.config.ts (Fimil reference config)', () => {
  it('is valid against the schema', () => {
    const result = trustConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('has the correct company name', () => {
    expect(config.company.name).toBe('Fimil');
  });

  it('includes all expected control domains', () => {
    const domains = config.controls.map((c) => c.domain);
    expect(domains).toContain('Data Protection');
    expect(domains).toContain('Access Control');
    expect(domains).toContain('Infrastructure Security');
    expect(domains).toContain('Application Security');
    expect(domains).toContain('Incident Response');
    expect(domains).toContain('Business Continuity');
    expect(domains).toContain('Vendor Management');
    expect(domains).toContain('Governance');
  });

  it('has at least one framework', () => {
    expect(config.frameworks.length).toBeGreaterThan(0);
  });

  it('has at least one subprocessor', () => {
    expect(config.subprocessors.length).toBeGreaterThan(0);
  });

  it('has a valid contact CTA', () => {
    expect(config.contact.cta.href).toMatch(/^mailto:/);
  });

  it('has SEO fields populated', () => {
    expect(config.seo.title).toBeTruthy();
    expect(config.seo.description).toBeTruthy();
  });

  it('has no control domains with empty items', () => {
    for (const domain of config.controls) {
      expect(domain.items.length).toBeGreaterThan(0);
    }
  });

  it('every subprocessor has a name, purpose, and location', () => {
    for (const sp of config.subprocessors) {
      expect(sp.name).toBeTruthy();
      expect(sp.purpose).toBeTruthy();
      expect(sp.location).toBeTruthy();
    }
  });
});
