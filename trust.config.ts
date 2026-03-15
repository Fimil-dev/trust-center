import { defineConfig } from './src/config/schema';
import { questionnaireMeta } from './src/questionnaires';

export default defineConfig({
  company: {
    name: 'Fimil',
    legalName: 'Fimil Inc.',
    logo: '/logo.svg',
    favicon: '/favicon.svg',
    website: 'https://fimil.dev',
    securityEmail: 'security@fimil.dev',
    privacyEmail: 'privacy@fimil.dev',
  },

  theme: {
    mode: 'system',
    colors: {
      primary: '#7C3AED',
    },
    fonts: {
      heading: 'IBM Plex Mono',
      body: 'IBM Plex Sans',
    },
  },

  frameworks: [
    {
      name: 'SOC 2 Type II',
      status: 'in-progress',
      description: 'Controls aligned with Trust Services Criteria. Formal audit planned post-seed.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'ISO 27001:2022',
      status: 'in-progress',
      description:
        'ISMS framework established with comprehensive policy suite and controls implemented. Certification planned for 2027.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
  ],

  controls: [
    {
      domain: 'Data Protection',
      icon: 'shield',
      items: [
        {
          title: 'Encryption at Rest',
          description:
            'All customer data encrypted using AES-256. Database encryption via managed provider. Application-layer encryption (Fernet) for sensitive fields including OAuth tokens and API credentials.',
          status: 'implemented',
        },
        {
          title: 'Encryption in Transit',
          description:
            "TLS 1.2+ enforced on all connections. HSTS enabled. Certificate management via Let's Encrypt with automated renewal.",
          status: 'implemented',
        },
        {
          title: 'Data Classification',
          description:
            'Four-level classification scheme (Public, Internal, Confidential, Restricted) with defined handling requirements per level.',
          status: 'implemented',
        },
        {
          title: 'Data Retention & Deletion',
          description:
            'Documented retention schedules per data category. Source code is ephemeral — cloned, scanned, and deleted (never persisted). Configurable report retention. Data subject access request workflow automation in progress.',
          status: 'partial',
        },
      ],
    },
    {
      domain: 'Access Control',
      icon: 'lock',
      items: [
        {
          title: 'Role-Based Access Control',
          description:
            'Five-level RBAC hierarchy enforced at every API endpoint. Tenant-level isolation with row-level data separation.',
          status: 'implemented',
        },
        {
          title: 'Authentication Security',
          description:
            'Strong password policy (12+ chars, complexity requirements), account lockout after failed attempts, automated brute force and credential stuffing detection. OAuth2/OIDC federation supported for customer SSO.',
          status: 'implemented',
        },
        {
          title: 'Privileged Access Management',
          description:
            'Privileged operations logged with full attribution. Impersonation restricted with 1-hour session caps and complete audit trail.',
          status: 'implemented',
        },
        {
          title: 'Access Reviews',
          description:
            'Automated deprovisioning on account deactivation. Bulk token revocation and session invalidation capabilities. Periodic access review process documented.',
          status: 'partial',
        },
      ],
    },
    {
      domain: 'Infrastructure Security',
      icon: 'server',
      items: [
        {
          title: 'Container Hardening',
          description:
            'All containers run as non-root with read-only filesystems, dropped capabilities, and no-new-privileges flag. Scanner containers are fully network-isolated.',
          status: 'implemented',
        },
        {
          title: 'Network Segmentation',
          description:
            'Kubernetes network policies enforce strict pod-to-pod communication rules. Scanner workloads run with no network access.',
          status: 'implemented',
        },
        {
          title: 'Runtime Monitoring',
          description:
            'Falco-based runtime security monitoring with custom detection rules for process anomalies, file integrity changes, and container drift.',
          status: 'implemented',
        },
        {
          title: 'Vulnerability Management',
          description:
            'Container image scanning (Trivy) in CI/CD blocks deployment on critical vulnerabilities. SAST scanning (Semgrep, Bandit) runs on own codebase via GitHub Actions. Fimil scans its own repositories through the platform.',
          status: 'implemented',
        },
      ],
    },
    {
      domain: 'Application Security',
      icon: 'code',
      items: [
        {
          title: 'Secure Development Lifecycle',
          description:
            'CI pipeline enforces linting, testing, type checking, SAST (Semgrep, Bandit), and container scanning. Pre-commit hooks catch issues before code reaches the repository. Fimil scans its own repositories through the platform.',
          status: 'implemented',
        },
        {
          title: 'Input Validation & Injection Prevention',
          description:
            'Pydantic schema validation on all API inputs. ORM-based parameterized queries prevent SQL injection. CSRF protection via double-submit cookie pattern.',
          status: 'implemented',
        },
        {
          title: 'Secret Management',
          description:
            'Sealed secrets for production credentials. API tokens stored as SHA256 hashes. Secret scanning in pre-commit hooks and CI pipeline.',
          status: 'implemented',
        },
        {
          title: 'Rate Limiting & Abuse Prevention',
          description:
            'Distributed rate limiting per endpoint category. Automated brute force detection and IP blocking. Credential stuffing detection with alerting.',
          status: 'implemented',
        },
      ],
    },
    {
      domain: 'Incident Response',
      icon: 'alert-triangle',
      items: [
        {
          title: 'Incident Response Plan',
          description:
            'Documented IR plan with four severity levels, defined response phases, escalation procedures, and communication templates.',
          status: 'implemented',
        },
        {
          title: 'Breach Notification',
          description:
            'Customer notification procedures documented with defined timelines aligned to GDPR (72-hour) and CCPA requirements.',
          status: 'implemented',
        },
        {
          title: 'Audit Logging',
          description:
            '40+ security-relevant event types logged with full attribution: actor, tenant, IP, user agent, and request correlation ID.',
          status: 'implemented',
        },
      ],
    },
    {
      domain: 'Business Continuity',
      icon: 'refresh-cw',
      items: [
        {
          title: 'Backup & Recovery',
          description:
            'Nightly encrypted backups to offsite storage (S3). Documented restore procedures with RTO of 4 hours and RPO of 24 hours.',
          status: 'implemented',
        },
        {
          title: 'High Availability',
          description:
            'Horizontal pod autoscaling with pod disruption budgets. Rolling deployments with zero-downtime guarantee and automatic rollback. Single-region deployment; multi-region failover and Redis HA planned.',
          status: 'partial',
        },
        {
          title: 'Disaster Recovery Testing',
          description: 'Semi-annual DR testing planned. Backup restore validation on roadmap.',
          status: 'planned',
        },
      ],
    },
    {
      domain: 'Vendor Management',
      icon: 'link',
      items: [
        {
          title: 'Vendor Risk Assessment',
          description:
            'Three-tier vendor classification with documented risk assessments for all critical and significant vendors.',
          status: 'implemented',
        },
        {
          title: 'Data Processing Agreements',
          description:
            'DPAs executed with all vendors who process customer data. Exit strategies documented for critical vendors.',
          status: 'implemented',
        },
      ],
    },
    {
      domain: 'Governance',
      icon: 'file-text',
      items: [
        {
          title: 'Policy Framework',
          description:
            'Comprehensive policy suite: ISMS, Access Control, Data Governance, Incident Response, Change Management, People Security, Vendor Risk Management.',
          status: 'implemented',
        },
        {
          title: 'Risk Management',
          description:
            'Formal risk assessment methodology with risk register, treatment plans, and annual review cycle.',
          status: 'implemented',
        },
        {
          title: 'Independent Security Review',
          description: 'External penetration test and independent security audit planned.',
          status: 'planned',
        },
      ],
    },
  ],

  subprocessors: [
    {
      name: 'DigitalOcean',
      purpose: 'Cloud infrastructure (compute, Kubernetes, managed database)',
      location: 'United States',
      dpaUrl: 'https://www.digitalocean.com/legal/data-processing-agreement',
    },
    {
      name: 'GitHub',
      purpose: 'Source code hosting, CI/CD, repository integrations',
      location: 'United States',
      dpaUrl: 'https://github.com/customer-terms/github-data-protection-agreement',
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing and billing',
      location: 'United States',
      dpaUrl: 'https://stripe.com/legal/dpa',
    },
    {
      name: 'Cloudflare',
      purpose: 'CDN, DNS, DDoS protection',
      location: 'Global (anycast)',
      dpaUrl: 'https://www.cloudflare.com/cloudflare-customer-dpa/',
    },
    {
      name: 'Resend',
      purpose: 'Transactional email delivery',
      location: 'United States',
      dpaUrl: 'https://resend.com/legal/dpa',
    },
    {
      name: 'PostHog',
      purpose: 'Product analytics (consent-gated)',
      location: 'United States',
      dpaUrl: 'https://posthog.com/dpa',
    },
  ],

  documents: {
    privacyPolicy: 'https://fimil.dev/privacy',
    termsOfService: 'https://fimil.dev/terms',
    dataProcessingAgreement: 'https://fimil.dev/legal/dpa',
    serviceLevelAgreement: 'https://fimil.dev/legal/sla',
    acceptableUsePolicy: 'https://fimil.dev/legal/acceptable-use',
    cookiePolicy: 'https://fimil.dev/legal/cookies',
    securityPolicy: 'https://fimil.dev/security',
  },

  contact: {
    heading: 'Have security questions?',
    description:
      "We're happy to answer security questionnaires, provide additional documentation, or schedule a call to discuss our security posture.",
    cta: {
      label: 'Contact Security Team',
      href: 'mailto:security@fimil.dev',
    },
    questionnaireUrl: null,
    prefilledQuestionnaireUrl: null,
  },

  seo: {
    title: 'Fimil Trust Center',
    description:
      "Learn about Fimil's security controls, compliance posture, and data protection practices.",
    ogImage: '/og-trust-center.png',
  },

  lastReviewed: 'March 2026',
  subprocessorsLastUpdated: 'March 2026',
  questionnaires: questionnaireMeta,
});
