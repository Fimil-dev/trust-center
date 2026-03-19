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
    {
      name: 'NIST CSF 2.0',
      status: 'in-progress',
      description:
        'Comprehensive mapping to the six CSF functions (Govern, Identify, Protect, Detect, Respond, Recover). ~75% coverage implemented; pending external validation.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'CIS Controls v8',
      status: 'in-progress',
      description:
        'Implementation-focused security controls aligned across all 18 control groups. ~70% coverage implemented; formal gap assessment and external validation pending.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'OWASP ASVS Level 2',
      status: 'in-progress',
      description:
        'Application Security Verification Standard covering authentication, session management, access control, input validation, and API security. Core to our identity as an AppSec platform.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'GDPR',
      status: 'in-progress',
      description:
        'EU General Data Protection Regulation. Privacy policy, DPAs, cookie consent with audit trail, and breach notification implemented. DSAR automation and DPIAs in progress.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'CCPA/CPRA',
      status: 'in-progress',
      description:
        'California Consumer Privacy Act and California Privacy Rights Act. Privacy disclosures and cookie consent implemented. Consumer request workflows in progress.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'CSA STAR Level 1',
      status: 'in-progress',
      description:
        'Cloud Security Alliance STAR Level 1 self-assessment completed via CAIQ v4 (261 questions across 17 security domains). Self-assessment published on trust center. Formal registry submission planned.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'FedRAMP Li-SaaS',
      status: 'in-progress',
      description:
        'Low-Impact SaaS authorization prerequisites in progress: System Security Plan, Continuous Monitoring Plan, network boundary documentation, and federal incident reporting procedures completed. FIPS 140-2 KMS integration and 3PAO engagement pending.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'FedRAMP',
      status: 'planned',
      description:
        'Full Federal Risk and Authorization Management Program authorization at Moderate baseline. Requires 3PAO assessment and JAB or Agency authorization.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'Cyber Essentials',
      status: 'in-progress',
      description:
        'UK government-backed cybersecurity certification. All five technical controls implemented: firewalls (Cloudflare WAF), secure configuration (container hardening), user access control (RBAC with MFA), malware protection (scanner isolation, Falco monitoring), and security update management (Dependabot, Trivy). Formal self-assessment certification pending.',
      certifiedDate: null,
      auditBody: null,
      reportAvailable: false,
    },
    {
      name: 'SLSA Framework',
      status: 'in-progress',
      description:
        'Build provenance attestation via GitHub Actions, SPDX SBOMs generated for all container images, and Cosign keyless image signing implemented. Formal SLSA L2 assessment and registry pending.',
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
            'Database encryption at rest via managed provider (AES-256). Application-layer encryption using Fernet (AES-128-CBC with HMAC-SHA256 authentication) for sensitive fields including OAuth tokens and API credentials.',
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
            'Documented retention schedules per data category. Source code is ephemeral — cloned, scanned, and deleted (never persisted). Configurable report retention. Automated DSAR export and erasure endpoints with anonymization.',
          status: 'implemented',
        },
        {
          title: 'Key Lifecycle Management',
          description:
            'Versioned encryption key rotation via MultiFernet — new data encrypted with latest key, old data decryptable with any known key. Re-encryption tooling for key migration. KMS integration planned for FIPS 140-2 requirements.',
          status: 'partial',
        },
      ],
    },
    {
      domain: 'Privacy & Data Rights',
      icon: 'eye',
      items: [
        {
          title: 'Cookie Consent & Tracking',
          description:
            'Granular cookie consent with Accept/Reject/Customize options. Three categories (Necessary, Functional, Analytics). Full audit trail with IP, user agent, timestamp, and consent version. DNT signal respected.',
          status: 'implemented',
        },
        {
          title: 'Privacy Notices & Transparency',
          description:
            'Privacy Policy, Cookie Policy, and Data Processing Agreement published. Data collection practices disclosed per GDPR Articles 13-14 and CCPA requirements.',
          status: 'implemented',
        },
        {
          title: 'Data Subject Request Handling',
          description:
            'Admin API endpoints for data export (GDPR Article 15) and erasure (GDPR Article 17) with full user data portability. Anonymization preserves audit trail while removing PII. Session invalidation on erasure.',
          status: 'implemented',
        },
        {
          title: 'Data Protection Impact Assessments',
          description:
            'Formal DPIA process (FIMIL-DPIA-001) per GDPR Article 35 with six defined trigger criteria, step-by-step assessment methodology, fillable template with risk matrix, DPO review and sign-off workflow, and maintained DPIA register.',
          status: 'implemented',
        },
        {
          title: 'International Data Transfers',
          description:
            'DPAs executed with all subprocessors. Standard Contractual Clauses (SCCs) for EU-to-US transfers planned for annexation to DPA.',
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
            'Strong password policy (12+ chars, Argon2id hashing), TOTP-based MFA with recovery codes, account lockout after failed attempts, automated brute force and credential stuffing detection. OAuth2/OIDC federation supported for customer SSO.',
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
            'Automated access review reports via operator portal: stale user detection (90+ days inactive), unused API token auditing, privileged user inventory across tenants. Automated deprovisioning on account deactivation with bulk token revocation.',
          status: 'implemented',
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
        {
          title: 'Asset Inventory',
          description:
            'Formal asset register (FIMIL-AM-001) with 25+ assets classified across infrastructure, software, data, external services, and code repositories. Quarterly review cycle with ownership tracking and lifecycle management.',
          status: 'implemented',
        },
        {
          title: 'Web Application Firewall',
          description:
            'Cloudflare WAF deployed with managed rulesets for OWASP Top 10 protection, bot management, and rate limiting at the edge.',
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
        {
          title: 'Threat Modeling',
          description:
            'Formal threat model (FIMIL-TM-001) using STRIDE methodology covering the three highest-risk areas: scanner execution pipeline, authentication & session management, and multi-tenant data isolation. 16 threats identified with likelihood/impact scoring and prioritized remediation. Reviewed annually or upon significant architecture change.',
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
          description:
            'DR test completed successfully (March 2026). Backup restore validated with documented RTO/RPO. Semi-annual testing schedule established.',
          status: 'implemented',
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
        {
          title: 'Continuous Compliance Monitoring',
          description:
            'Continuous monitoring program with automated controls (Dependabot, Trivy, Falco, Cosign) and scheduled manual reviews (quarterly access reviews, semi-annual DR testing, annual risk assessment). Monthly vulnerability reporting and quarterly ConMon status reports.',
          status: 'implemented',
        },
      ],
    },
    {
      domain: 'Supply Chain Security',
      icon: 'package',
      items: [
        {
          title: 'Software Bill of Materials (SBOM)',
          description:
            'Syft integrated as a scanner for customer repositories. SPDX SBOMs generated for all container images in CI/CD pipeline via anchore/sbom-action and retained as build artifacts.',
          status: 'implemented',
        },
        {
          title: 'Build Provenance & Attestation',
          description:
            'Cryptographic build provenance attestation generated via actions/attest-build-provenance for all container images. GitHub Actions CI/CD provides hosted build platform with OIDC-based identity.',
          status: 'implemented',
        },
        {
          title: 'Container Image Signing',
          description:
            'All container images signed with Cosign (keyless via Sigstore/Fulcio) after vulnerability scanning passes. Signatures stored alongside images in the container registry.',
          status: 'implemented',
        },
        {
          title: 'Dependency Integrity',
          description:
            'Lockfiles (package-lock.json, poetry.lock) pin dependency versions. Reachability analysis classifies direct vs. transitive dependencies. Dependabot configured for automated dependency updates across all repositories.',
          status: 'implemented',
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
      purpose: 'CDN, DNS, DDoS protection, WAF',
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
