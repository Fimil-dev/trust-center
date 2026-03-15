import { z } from 'astro/zod';

const companySchema = z.object({
  name: z.string(),
  legalName: z.string().optional(),
  logo: z.string().default('/logo.svg'),
  favicon: z.string().default('/favicon.svg'),
  website: z.string().url().optional(),
  securityEmail: z.string().email(),
  privacyEmail: z.string().email().optional(),
});

const colorsSchema = z.object({
  primary: z.string().default('#7C3AED'),
  surface: z.string().optional(),
  surfaceAlt: z.string().optional(),
  text: z.string().optional(),
  textMuted: z.string().optional(),
  border: z.string().optional(),
});

const fontsSchema = z.object({
  heading: z.string().default('IBM Plex Mono'),
  body: z.string().default('IBM Plex Sans'),
});

const themeSchema = z.object({
  mode: z.enum(['light', 'dark', 'system']).default('system'),
  colors: colorsSchema.default({}),
  fonts: fontsSchema.default({}),
  customCss: z.string().optional(),
});

const frameworkSchema = z.object({
  name: z.string(),
  status: z.enum(['certified', 'in-progress', 'planned']),
  description: z.string().optional(),
  certifiedDate: z.string().nullable().default(null),
  auditBody: z.string().nullable().default(null),
  reportAvailable: z.boolean().default(false),
});

const controlItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['implemented', 'partial', 'planned']),
});

const controlDomainSchema = z.object({
  domain: z.string(),
  icon: z.string().default('shield'),
  items: z.array(controlItemSchema),
});

const subprocessorSchema = z.object({
  name: z.string(),
  purpose: z.string(),
  location: z.string(),
  dpaUrl: z.string().url().nullable().default(null),
});

const documentsSchema = z.object({
  privacyPolicy: z.string().url().nullable().default(null),
  termsOfService: z.string().url().nullable().default(null),
  dataProcessingAgreement: z.string().url().nullable().default(null),
  serviceLevelAgreement: z.string().url().nullable().default(null),
  acceptableUsePolicy: z.string().url().nullable().default(null),
  cookiePolicy: z.string().url().nullable().default(null),
  securityPolicy: z.string().url().nullable().default(null),
});

const ctaSchema = z.object({
  label: z.string().default('Contact Security Team'),
  href: z.string(),
});

const contactSchema = z.object({
  heading: z.string().default('Have security questions?'),
  description: z.string().optional(),
  cta: ctaSchema,
  questionnaireUrl: z.string().url().nullable().default(null),
  prefilledQuestionnaireUrl: z.string().url().nullable().default(null),
});

const seoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
});

const questionnaireMetaSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  enabled: z.boolean().default(true),
  questionCount: z.number().int().nonnegative(),
  sectionCount: z.number().int().nonnegative(),
  version: z.string().optional(),
});

export const trustConfigSchema = z.object({
  company: companySchema,
  theme: themeSchema.default({}),
  frameworks: z.array(frameworkSchema).default([]),
  controls: z.array(controlDomainSchema).default([]),
  subprocessors: z.array(subprocessorSchema).default([]),
  documents: documentsSchema.default({}),
  contact: contactSchema,
  seo: seoSchema.default({}),
  lastReviewed: z.string().optional(),
  subprocessorsLastUpdated: z.string().optional(),
  questionnaires: z.array(questionnaireMetaSchema).default([]),
});

export type TrustConfig = z.infer<typeof trustConfigSchema>;

export function defineConfig(config: z.input<typeof trustConfigSchema>): TrustConfig {
  const result = trustConfigSchema.safeParse(config);
  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  → ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`\n❌ trust.config.ts validation failed:\n${errors}\n`);
  }
  return result.data;
}
