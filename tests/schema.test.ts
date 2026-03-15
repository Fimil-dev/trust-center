import { describe, it, expect } from 'vitest';
import { defineConfig, trustConfigSchema } from '../src/config/schema';

// Minimal valid config for testing
const minimalConfig = {
  company: {
    name: 'Acme Corp',
    securityEmail: 'security@acme.com',
  },
  contact: {
    cta: {
      href: 'mailto:security@acme.com',
    },
  },
};

describe('trustConfigSchema', () => {
  it('parses a minimal valid config', () => {
    const result = trustConfigSchema.safeParse(minimalConfig);
    expect(result.success).toBe(true);
  });

  it('applies default values', () => {
    const config = trustConfigSchema.parse(minimalConfig);
    expect(config.theme.mode).toBe('system');
    expect(config.theme.colors.primary).toBe('#7C3AED');
    expect(config.theme.fonts.heading).toBe('IBM Plex Mono');
    expect(config.theme.fonts.body).toBe('IBM Plex Sans');
    expect(config.company.logo).toBe('/logo.svg');
    expect(config.company.favicon).toBe('/favicon.svg');
    expect(config.frameworks).toEqual([]);
    expect(config.controls).toEqual([]);
    expect(config.subprocessors).toEqual([]);
  });

  it('rejects missing company name', () => {
    const result = trustConfigSchema.safeParse({
      company: { securityEmail: 'sec@test.com' },
      contact: { cta: { href: 'mailto:sec@test.com' } },
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing securityEmail', () => {
    const result = trustConfigSchema.safeParse({
      company: { name: 'Test' },
      contact: { cta: { href: 'mailto:test@test.com' } },
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing contact section', () => {
    const result = trustConfigSchema.safeParse({
      company: { name: 'Test', securityEmail: 'sec@test.com' },
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid framework status', () => {
    const result = trustConfigSchema.safeParse({
      ...minimalConfig,
      frameworks: [{ name: 'SOC 2', status: 'expired' }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid framework statuses', () => {
    const statuses = ['certified', 'in-progress', 'planned'] as const;
    for (const status of statuses) {
      const result = trustConfigSchema.safeParse({
        ...minimalConfig,
        frameworks: [{ name: 'Test Framework', status }],
      });
      expect(result.success).toBe(true);
    }
  });

  it('rejects invalid control status', () => {
    const result = trustConfigSchema.safeParse({
      ...minimalConfig,
      controls: [
        {
          domain: 'Data Protection',
          items: [
            {
              title: 'Encryption',
              description: 'AES-256',
              status: 'deprecated',
            },
          ],
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('accepts valid control statuses', () => {
    const statuses = ['implemented', 'partial', 'planned'] as const;
    for (const status of statuses) {
      const result = trustConfigSchema.safeParse({
        ...minimalConfig,
        controls: [
          {
            domain: 'Test',
            items: [{ title: 'Control', description: 'Description', status }],
          },
        ],
      });
      expect(result.success).toBe(true);
    }
  });

  it('rejects invalid email format', () => {
    const result = trustConfigSchema.safeParse({
      company: { name: 'Test', securityEmail: 'not-an-email' },
      contact: { cta: { href: 'mailto:test@test.com' } },
    });
    expect(result.success).toBe(false);
  });

  it('rejects invalid theme mode', () => {
    const result = trustConfigSchema.safeParse({
      ...minimalConfig,
      theme: { mode: 'auto' },
    });
    expect(result.success).toBe(false);
  });

  it('accepts all valid theme modes', () => {
    for (const mode of ['light', 'dark', 'system'] as const) {
      const result = trustConfigSchema.safeParse({
        ...minimalConfig,
        theme: { mode },
      });
      expect(result.success).toBe(true);
    }
  });

  it('parses subprocessors with nullable dpaUrl', () => {
    const config = trustConfigSchema.parse({
      ...minimalConfig,
      subprocessors: [
        {
          name: 'AWS',
          purpose: 'Cloud',
          location: 'US',
          dpaUrl: null,
        },
        {
          name: 'Stripe',
          purpose: 'Payments',
          location: 'US',
          dpaUrl: 'https://stripe.com/dpa',
        },
      ],
    });
    expect(config.subprocessors).toHaveLength(2);
    expect(config.subprocessors[0].dpaUrl).toBeNull();
    expect(config.subprocessors[1].dpaUrl).toBe('https://stripe.com/dpa');
  });

  it('rejects invalid dpaUrl format', () => {
    const result = trustConfigSchema.safeParse({
      ...minimalConfig,
      subprocessors: [
        {
          name: 'AWS',
          purpose: 'Cloud',
          location: 'US',
          dpaUrl: 'not-a-url',
        },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('parses documents with all null values', () => {
    const config = trustConfigSchema.parse(minimalConfig);
    expect(config.documents.privacyPolicy).toBeNull();
    expect(config.documents.termsOfService).toBeNull();
    expect(config.documents.securityPolicy).toBeNull();
  });

  it('parses documents with valid URLs', () => {
    const config = trustConfigSchema.parse({
      ...minimalConfig,
      documents: {
        privacyPolicy: 'https://example.com/privacy',
        termsOfService: 'https://example.com/terms',
      },
    });
    expect(config.documents.privacyPolicy).toBe('https://example.com/privacy');
    expect(config.documents.termsOfService).toBe('https://example.com/terms');
  });

  it('sets default icon for control domains', () => {
    const config = trustConfigSchema.parse({
      ...minimalConfig,
      controls: [
        {
          domain: 'Test',
          items: [
            {
              title: 'Control',
              description: 'Desc',
              status: 'implemented',
            },
          ],
        },
      ],
    });
    expect(config.controls[0].icon).toBe('shield');
  });

  it('sets framework defaults for reportAvailable and certifiedDate', () => {
    const config = trustConfigSchema.parse({
      ...minimalConfig,
      frameworks: [{ name: 'SOC 2', status: 'in-progress' }],
    });
    expect(config.frameworks[0].reportAvailable).toBe(false);
    expect(config.frameworks[0].certifiedDate).toBeNull();
    expect(config.frameworks[0].auditBody).toBeNull();
  });
});

describe('defineConfig', () => {
  it('returns parsed config for valid input', () => {
    const config = defineConfig(minimalConfig);
    expect(config.company.name).toBe('Acme Corp');
    expect(config.theme.mode).toBe('system');
  });

  it('throws with readable error for invalid input', () => {
    expect(() => {
      defineConfig({
        company: { name: 'Test' },
        contact: { cta: { href: 'mailto:t@t.com' } },
      } as never);
    }).toThrow('trust.config.ts validation failed');
  });
});
