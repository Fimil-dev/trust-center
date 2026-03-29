import type { Questionnaire } from './types';

export const vsaCore: Questionnaire = {
  name: 'VSA Core',
  slug: 'vsa-core',
  version: '2022',
  description:
    'Vendor Security Alliance Core questionnaire — focused security and privacy assessment covering key controls, CCPA/CPRA, and GDPR requirements.',
  url: 'https://www.vendorsecurityalliance.org',
  enabled: true,
  sections: [
    {
      name: 'Service Introduction',
      questions: [
        {
          id: 'SI-1a',
          question: 'Company name.',
          answer: 'yes',
          explanation: 'Fimil, Inc. — a Delaware C Corporation.',
        },
        {
          id: 'SI-1b',
          question: 'Company website.',
          answer: 'yes',
          explanation: 'https://fimil.dev',
        },
        {
          id: 'SI-1c',
          question: 'Primary contact for security inquiries.',
          answer: 'yes',
          explanation: 'security@fimil.dev — 48-hour acknowledgment SLA per SECURITY.md.',
        },
        {
          id: 'SI-2a',
          question: 'Describe the service being evaluated.',
          answer: 'yes',
          explanation:
            'Fimil is a unified application security platform that orchestrates open-source security scanners (SAST, SCA, Secrets, IaC, Container) behind a single dashboard with finding deduplication, priority scoring, and policy enforcement.',
        },
        {
          id: 'SI-2b',
          question: 'What data does the service process on behalf of customers?',
          answer: 'yes',
          explanation:
            'User email and name, OAuth tokens for Git provider integration, and temporarily processed source code (ephemeral, never persisted). Scan findings stored in tenant-isolated PostgreSQL.',
        },
        {
          id: 'SI-3a',
          question: 'Is the service hosted in the cloud, on-premise, or hybrid?',
          answer: 'yes',
          explanation:
            'Cloud-hosted on DigitalOcean Kubernetes (SaaS). An Enterprise self-hosted deployment model is also available for on-premise installation.',
        },
        {
          id: 'SI-3b',
          question: 'Which cloud providers are used?',
          answer: 'yes',
          explanation:
            'DigitalOcean (infrastructure, managed PostgreSQL, container registry), Cloudflare (CDN/DDoS), Stripe (payments), Resend (email), PostHog (analytics).',
        },
        {
          id: 'SI-3c',
          question: 'Data center locations.',
          answer: 'yes',
          explanation:
            'US-based DigitalOcean data center region. Single-region deployment currently.',
        },
        {
          id: 'SI-4a',
          question: 'Technology stack used.',
          answer: 'yes',
          explanation:
            'Python/FastAPI backend, React/TypeScript frontend, PostgreSQL, Redis, Celery, Docker containers for scanner isolation, Kubernetes on DigitalOcean.',
        },
        {
          id: 'SI-5a',
          question: 'Most recent penetration test report available?',
          answer: 'no',
          explanation:
            'No external penetration test has been conducted. This is the primary remaining gap (ISO A.5.35 FAIL).',
        },
        {
          id: 'SI-5b',
          question: 'Information Security Policies available for review?',
          answer: 'yes',
          explanation:
            'Comprehensive policy suite: ISMS Policy, Access Control Policy, Data Governance Policy, Change Management Policy, Incident Response Plan, People Security Policy, and Vendor Risk Management Policy.',
        },
        {
          id: 'SI-5c',
          question: 'Data Flow Diagram available?',
          answer: 'yes',
          explanation:
            'Visual data flow diagram published on the trust center showing data ingestion, scanner pipeline (ephemeral, network-isolated), encrypted storage, subprocessor flows, and security boundaries at every layer.',
        },
        {
          id: 'SI-5d',
          question: 'SOC 2 Type II or ISO 27001 certification available?',
          answer: 'no',
          explanation:
            'ISO 27001 and SOC 2 controls implemented with comprehensive policy suite. Certification audits planned but not yet completed.',
        },
        {
          id: 'SI-5e',
          question: 'Privacy Policy available?',
          answer: 'yes',
          explanation:
            'Privacy Policy at /privacy, Cookie Policy at /legal/cookies, DPA at /legal/dpa, Acceptable Use Policy at /legal/acceptable-use.',
        },
        {
          id: 'SI-5f',
          question: 'Sub-processor list available?',
          answer: 'yes',
          explanation:
            'Sub-processor list published in trust center with DPAs executed for all vendors: DigitalOcean, Stripe, Resend, PostHog.',
        },
      ],
    },
    {
      name: 'Data Inventory',
      questions: [
        {
          id: 'DI-1',
          question: "Do you process driver's license or State ID numbers?",
          answer: 'no',
          explanation:
            "Fimil does not collect or process driver's license or State ID numbers. The platform handles application security scanning data only.",
        },
        {
          id: 'DI-2',
          question: 'Do you process financial data?',
          answer: 'no',
          explanation:
            'No financial data is processed directly. Payment processing is handled entirely by Stripe; Fimil does not store credit card numbers or bank details.',
        },
        {
          id: 'DI-3',
          question: 'Do you process Social Security Numbers?',
          answer: 'no',
          explanation: 'Fimil does not collect or process Social Security Numbers.',
        },
        {
          id: 'DI-4',
          question: 'Do you process passport numbers?',
          answer: 'no',
          explanation: 'Fimil does not collect or process passport numbers.',
        },
        {
          id: 'DI-5',
          question: 'Do you process biometric data?',
          answer: 'no',
          explanation: 'Fimil does not collect or process biometric data.',
        },
        {
          id: 'DI-6',
          question: 'Do you process health, insurance, or medical data?',
          answer: 'no',
          explanation: 'Fimil does not collect or process health, insurance, or medical data.',
        },
        {
          id: 'DI-7',
          question: 'Do you process precise location or GPS data?',
          answer: 'no',
          explanation:
            'Fimil does not collect precise location or GPS data. IP addresses are logged for security monitoring only.',
        },
        {
          id: 'DI-8',
          question: 'Do you process voice recordings?',
          answer: 'no',
          explanation: 'Fimil does not collect or process voice recordings.',
        },
        {
          id: 'DI-9',
          question: 'Do you process audio or video data?',
          answer: 'no',
          explanation: 'Fimil does not collect or process audio or video data.',
        },
        {
          id: 'DI-10',
          question: 'Do you process email addresses?',
          answer: 'yes',
          explanation:
            'Email addresses are collected for user authentication, account management, and transactional notifications (scan results, critical findings alerts).',
        },
        {
          id: 'DI-11',
          question: 'Do you process names?',
          answer: 'yes',
          explanation:
            'User full names are collected during registration for account identification and display within the platform.',
        },
        {
          id: 'DI-12',
          question: 'Do you process log data (IP address, time, browser)?',
          answer: 'yes',
          explanation:
            'IP addresses, timestamps, and user agents are logged for security monitoring, audit trails, and threat detection (brute force, credential stuffing).',
        },
        {
          id: 'DI-13',
          question: 'Do you process telephone numbers?',
          answer: 'no',
          explanation: 'Fimil does not collect or process telephone numbers.',
        },
        {
          id: 'DI-14',
          question: 'Do you process tracking data (cookies, pixels)?',
          answer: 'yes',
          explanation:
            'Cookie consent mechanism with Accept All / Reject Non-Essential / Customize options. Analytics (PostHog) requires explicit consent. DNT browser signal respected. Full consent audit trail maintained.',
        },
      ],
    },
    {
      name: 'Security CORE Controls',
      questions: [
        {
          id: 'CORE-1',
          question: 'Do you maintain a data classification policy?',
          answer: 'yes',
          explanation:
            'Data Governance Policy (FIMIL-DGP-001) establishes four-level classification: Public, Internal, Confidential (user PII, scan results), and Restricted (encryption keys, OAuth tokens).',
        },
        {
          id: 'CORE-2',
          question: 'Is customer data encrypted in transit?',
          answer: 'yes',
          explanation:
            "TLS 1.2+ enforced for all public-facing traffic via cert-manager with Let's Encrypt. HSTS enabled. HTTP redirected to HTTPS.",
        },
        {
          id: 'CORE-3',
          question: 'Is customer data encrypted at rest?',
          answer: 'yes',
          explanation:
            'MultiFernet encryption (AES-128-CBC + HMAC-SHA256) with versioned key rotation for sensitive fields. Database encryption via DigitalOcean managed PostgreSQL. S3 backups encrypted.',
        },
        {
          id: 'CORE-4',
          question: 'Do you have a process for managing encryption keys?',
          answer: 'partial',
          explanation:
            'Encryption keys stored as environment variables via Kubernetes Sealed Secrets. MultiFernet versioned key rotation implemented for seamless encryption key transitions. KMS integration not yet in place.',
        },
        {
          id: 'CORE-5',
          question: 'How do you control access to customer data?',
          answer: 'yes',
          explanation:
            'Five-level RBAC (Operator > Admin > Security > Developer > Viewer) enforced at every API endpoint. Row-level tenant isolation via TenantScopedModel with ContextVar enforcement.',
        },
        {
          id: 'CORE-6',
          question: 'Do you require MFA for internal access to production systems?',
          answer: 'yes',
          explanation:
            'TOTP-based MFA with recovery codes implemented in the application with two-step login flow and encrypted secret storage. Production Kubernetes access controlled via DigitalOcean authentication and Kubernetes RBAC.',
        },
        {
          id: 'CORE-7',
          question: 'Do you support SSO for internal authentication?',
          answer: 'yes',
          explanation:
            'OAuth2/OIDC federation supported with GitHub and generic OIDC providers for user authentication, available on all plans.',
        },
        {
          id: 'CORE-8',
          question: 'What is your internal password policy?',
          answer: 'yes',
          explanation:
            'Minimum 12 characters with mixed case, digit, and special character requirements. Argon2id (memory-hard) hashing with salt. Account lockout after 5 failed attempts (30-minute cooldown).',
        },
        {
          id: 'CORE-9',
          question: 'Do you support SSO for customer authentication?',
          answer: 'yes',
          explanation:
            'OAuth2/OIDC with GitHub and generic OIDC providers. SSO available on all plans at no additional cost.',
        },
        {
          id: 'CORE-10',
          question: 'Does the application support customer-enforced MFA?',
          answer: 'yes',
          explanation:
            'TOTP-based MFA implemented with recovery codes, two-step login flow, and encrypted secret storage. Users can enable MFA on their accounts.',
        },
        {
          id: 'CORE-11',
          question: 'Do you have a formal Information Security Program?',
          answer: 'yes',
          explanation:
            'ISMS Policy (FIMIL-ISMS-001) establishes the formal ISMS aligned with ISO 27001:2022, supported by a comprehensive policy suite covering access control, data governance, change management, and incident response.',
        },
        {
          id: 'CORE-12',
          question: 'Are InfoSec policies reviewed at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines annual policy review cadence. Policies are version-controlled in Git. Statement of Applicability tracks control implementation status.',
        },
        {
          id: 'CORE-13',
          question: 'Do you have an information security risk management program?',
          answer: 'yes',
          explanation:
            'Risk Assessment (FIMIL-RISK-001) uses a 5x5 likelihood-impact matrix identifying 15 risks with documented treatment plans and remediation timelines.',
        },
        {
          id: 'CORE-14',
          question: 'Do you perform background checks on employees?',
          answer: 'partial',
          explanation:
            'People Security Policy documents background verification requirements for all roles. Not yet exercised as currently sole founder.',
        },
        {
          id: 'CORE-15',
          question: 'Are personnel required to sign confidentiality agreements?',
          answer: 'partial',
          explanation:
            'People Security Policy mandates confidentiality agreements for all personnel. Policy documented and ready; not yet exercised as currently sole founder.',
        },
        {
          id: 'CORE-16',
          question: 'Do you have procedures for termination including access revocation?',
          answer: 'yes',
          explanation:
            'People Security Policy includes offboarding checklists with access revocation. Technical controls support immediate user deactivation, session invalidation, and API token revocation.',
        },
        {
          id: 'CORE-17',
          question: 'Do you perform regular vulnerability scanning?',
          answer: 'yes',
          explanation:
            "Fimil's own platform orchestrates 12 scanners (Semgrep, Bandit, Trivy, Grype, OSV-Scanner, Gitleaks, TruffleHog, Checkov, Hadolint, Syft) in CI/CD on every push and PR.",
        },
        {
          id: 'CORE-18',
          question: 'What is your timeframe for patching critical vulnerabilities?',
          answer: 'yes',
          explanation:
            'Formal patch management SLA: Critical 24h, High 7d, Medium 30d. Trivy blocks deployment of containers with critical vulnerabilities. EPSS enrichment prioritizes actively exploited CVEs. Dependabot provides automated dependency update PRs.',
        },
        {
          id: 'CORE-19',
          question: 'Do you perform penetration testing?',
          answer: 'no',
          explanation:
            'No external penetration test or independent security audit has been conducted. This is the primary remaining gap (ISO A.5.35 FAIL).',
        },
        {
          id: 'CORE-20',
          question: 'Are endpoint devices centrally managed with standard security configurations?',
          answer: 'partial',
          explanation:
            'People Security Policy documents device security requirements (full-disk encryption, screen lock). Currently sole founder; formal MDM to be deployed as team grows.',
        },
        {
          id: 'CORE-21',
          question: 'Is the production network segmented?',
          answer: 'yes',
          explanation:
            'Kubernetes network policies segment the production network. Scanner containers run with --network=none for complete isolation. Ingress-only access with TLS.',
        },
        {
          id: 'CORE-22',
          question: 'Are production systems uniformly configured and hardened?',
          answer: 'yes',
          explanation:
            'All production workloads run as immutable Docker containers with standardized configurations: non-root, read-only filesystem, cap_drop ALL, no-new-privileges, resource limits.',
        },
        {
          id: 'CORE-23',
          question: 'Is network traffic encrypted over public networks?',
          answer: 'yes',
          explanation:
            'TLS 1.2+ enforced for all public traffic via cert-manager. HSTS headers enabled. Auth cookies set with Secure flag.',
        },
        {
          id: 'CORE-24',
          question: 'Do you use standard cryptographic frameworks (no custom cryptography)?',
          answer: 'yes',
          explanation:
            'All implementations use standard libraries: Argon2id for passwords, MultiFernet (AES-128-CBC + HMAC-SHA256) for field encryption with key rotation, SHA-256 for token hashing, secrets module for random generation.',
        },
        {
          id: 'CORE-25',
          question: 'Do you have a security awareness and training program?',
          answer: 'partial',
          explanation:
            'People Security Policy documents role-specific training requirements. Currently sole founder with deep security domain expertise; formal training program framework ready for team scaling.',
        },
        {
          id: 'CORE-26',
          question: 'Do you have breach detection and anomaly monitoring with alerting?',
          answer: 'yes',
          explanation:
            'Security alert system with brute force detection, credential stuffing detection, API anomaly detection, and suspicious scan pattern detection. Falco provides runtime container integrity monitoring.',
        },
        {
          id: 'CORE-27',
          question: 'Are all security events logged in production?',
          answer: 'yes',
          explanation:
            'Audit logging tracks 40+ action types with user_id, IP, timestamp, action, resource_type, and resource_id. Structlog JSON output with request correlation IDs.',
        },
        {
          id: 'CORE-28',
          question: 'Do you have a Security Incident Response Program?',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) with four severity levels, incident commander role, response phases, and breach notification procedures aligned to GDPR and CCPA timelines.',
        },
        {
          id: 'CORE-29',
          question: 'How is the IRP tested?',
          answer: 'partial',
          explanation:
            'IRP documented with technical capabilities implemented (Incident model, SecurityAlert, auto-blocking). DR test completed March 2026 validated recovery procedures. Tabletop exercises and simulated drills planned but not yet conducted.',
        },
        {
          id: 'CORE-30',
          question: 'Do you have a formal SLA for incident response and client notification?',
          answer: 'yes',
          explanation:
            'IRP defines response timelines by severity. SECURITY.md provides 48-hour acknowledgment SLA. Breach notification aligned to GDPR 72-hour and CCPA requirements.',
        },
        {
          id: 'CORE-31',
          question: 'Do you perform static code analysis?',
          answer: 'yes',
          explanation:
            'Semgrep and Bandit run in CI/CD on every push and PR. Ruff linter and ESLint with strict TypeScript rules enforce code quality.',
        },
        {
          id: 'CORE-32',
          question: 'Do you have secure development lifecycle practices?',
          answer: 'yes',
          explanation:
            'Change Management Policy documents SDLC security integration. CI pipeline runs linting, tests, SAST, and container scanning. Pre-commit hooks enforce code style and secret scanning.',
        },
        {
          id: 'CORE-33',
          question: 'Do you monitor vulnerabilities in third-party dependencies?',
          answer: 'yes',
          explanation:
            'Trivy, Grype, and OSV-Scanner provide SCA scanning. EPSS enrichment for exploit probability. Reachability analysis distinguishes direct from transitive dependency vulnerabilities.',
        },
        {
          id: 'CORE-34',
          question: 'Do you maintain a bill of materials for third-party libraries?',
          answer: 'yes',
          explanation:
            'Syft SBOM scanner generates software bill of materials. Poetry and npm lockfiles track all dependency versions.',
        },
        {
          id: 'CORE-35',
          question: 'Does the customer-facing application have standardized roles and permissions?',
          answer: 'yes',
          explanation:
            'Five standardized roles: Operator, Admin, Security, Developer, and Viewer with enforced permissions at every endpoint.',
        },
        {
          id: 'CORE-36',
          question: 'Are audit trails available for customer data access?',
          answer: 'yes',
          explanation:
            'Comprehensive audit logging with 40+ event types. Admin dashboard access to verbose logs with filtering. CSV export for offline analysis.',
        },
        {
          id: 'CORE-37',
          question: 'Does the application support custom data retention policies?',
          answer: 'yes',
          explanation:
            'Report retention configurable at 30 days. Data Governance Policy defines retention schedules for all data categories. Account closure and deletion procedures documented.',
        },
        {
          id: 'CORE-38',
          question: 'Is API rate limiting implemented?',
          answer: 'yes',
          explanation:
            'Redis-backed sliding window rate limiting: auth endpoints at 10 req/min, general API at 100 req/min. Configurable thresholds.',
        },
        {
          id: 'CORE-39',
          question: 'How are API keys stored and managed?',
          answer: 'yes',
          explanation:
            'API tokens are SHA-256 hashed before storage; plaintext shown only once at creation. Tokens are scoped, revocable, and tracked with audit trails.',
        },
        {
          id: 'CORE-40',
          question: 'How do you conduct internal audits?',
          answer: 'yes',
          explanation:
            'Comprehensive internal compliance assessment against ISO 27001 and SOC 2. Statement of Applicability tracks control status. Compliance Register monitors regulatory obligations.',
        },
        {
          id: 'CORE-41',
          question: 'Have you completed any external audits or certifications?',
          answer: 'no',
          explanation:
            'No external audit or independent security assessment has been conducted. External penetration testing and certification audits are planned.',
        },
        {
          id: 'CORE-42',
          question: 'Which security and privacy standards do you comply with?',
          answer: 'yes',
          explanation:
            'Controls aligned with ISO 27001:2022 and SOC 2 Type II. GDPR and CCPA compliance tracked in Compliance Register. Formal certification not yet obtained.',
        },
        {
          id: 'CORE-43',
          question: 'Do you share customer data with third parties?',
          answer: 'partial',
          explanation:
            'Sub-processors (DigitalOcean, Stripe, Resend, PostHog) process limited customer data as documented. DPAs executed with all vendors. No data is sold.',
        },
        {
          id: 'CORE-44',
          question: 'Is your Privacy Notice externally available?',
          answer: 'yes',
          explanation:
            'Privacy Policy at /privacy, Cookie Policy at /legal/cookies, DPA at /legal/dpa, AUP at /legal/acceptable-use. All publicly accessible.',
        },
        {
          id: 'CORE-45',
          question: 'Do you have a responsible disclosure and vulnerability reporting policy?',
          answer: 'yes',
          explanation:
            'SECURITY.md published with responsible disclosure policy, testing scope, safe harbor provisions, and security@fimil.dev contact with 48-hour acknowledgment SLA.',
        },
      ],
    },
    {
      name: 'Privacy Introduction',
      questions: [],
    },
    {
      name: 'USA Privacy (CCPA/CPRA)',
      questions: [
        {
          id: 'USP-1',
          question:
            'Can you provide data breach notification to the state Attorney General within required timeframes?',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) includes breach notification procedures with timelines aligned to CCPA requirements and state AG notification.',
        },
        {
          id: 'USP-2',
          question:
            'Do you inform consumers of the categories of data collected and the purposes before or at the time of collection?',
          answer: 'yes',
          explanation:
            'Privacy Policy at /privacy discloses categories collected (email, name, log data, cookies), purposes, and legal bases before data collection occurs.',
        },
        {
          id: 'USP-3',
          question:
            'Do you have a mechanism to provide a copy of collected personal information to a consumer within 45 days of a verifiable request?',
          answer: 'yes',
          explanation:
            'Admin API endpoints implemented for GDPR data export (DSAR fulfillment). Data subject rights procedures documented in Data Governance Policy with automated export capability.',
        },
        {
          id: 'USP-4',
          question:
            "Do you have a mechanism to delete a consumer's personal information upon verifiable request?",
          answer: 'yes',
          explanation:
            'Admin API endpoints implemented for GDPR data erasure. Account deletion with cascading data disposal including user deactivation, session invalidation, and token revocation.',
        },
        {
          id: 'USP-5',
          question: 'Is the deletion request cascaded to your service providers?',
          answer: 'yes',
          explanation:
            'DSAR erasure API handles internal data deletion. DPAs with sub-processors include data deletion requirements and are triggered as part of the erasure workflow.',
        },
        {
          id: 'USP-6',
          question:
            'Does your website disclose the categories of information collected, sources, purposes, and third parties with whom data is shared?',
          answer: 'yes',
          explanation:
            'Privacy Policy at /privacy provides comprehensive disclosure of data categories, collection sources, processing purposes, and sub-processor list with sharing details.',
        },
        {
          id: 'USP-7',
          question:
            'If you sell personal data, do you disclose the categories sold and categories disclosed for business purposes?',
          answer: 'na',
          explanation:
            'Fimil does not sell personal data. No categories of data are sold to third parties.',
        },
        {
          id: 'USP-8',
          question:
            'If you resell personal information received from another business, do you provide explicit notice and opt-out to consumers?',
          answer: 'na',
          explanation:
            'Fimil does not resell personal information. This scenario is not applicable.',
        },
        {
          id: 'USP-9',
          question:
            'If you sell personal data, do you inform customers and provide an opt-out mechanism?',
          answer: 'na',
          explanation: 'Fimil does not sell personal data. No opt-out mechanism is needed.',
        },
        {
          id: 'USP-10',
          question:
            'Do you provide the same level of service regardless of whether consumers exercise their CCPA rights?',
          answer: 'yes',
          explanation:
            'Fimil does not discriminate against users who exercise privacy rights. Service level and pricing are identical regardless of CCPA rights exercised.',
        },
        {
          id: 'USP-11',
          question:
            'Do you provide a minimum of two contact methods for consumer privacy requests?',
          answer: 'yes',
          explanation:
            'Privacy requests can be submitted via security@fimil.dev email and through the contact form on the website at /contact.',
        },
        {
          id: 'USP-12',
          question: 'Is a publicly available CCPA rights notice available on your website?',
          answer: 'yes',
          explanation:
            'Privacy Policy at /privacy includes CCPA rights disclosure covering the right to know, delete, and opt-out, with instructions for exercising these rights.',
        },
        {
          id: 'USP-13',
          question:
            "Do you provide a 'Do Not Sell My Personal Information' link or equivalent mechanism?",
          answer: 'na',
          explanation:
            'Fimil does not sell personal data. Cookie consent mechanism allows users to reject non-essential cookies. DNT browser signal is respected as automatic opt-out.',
        },
        {
          id: 'USP-14',
          question:
            'Do you provide privacy training for personnel handling personal information at least annually?',
          answer: 'partial',
          explanation:
            'People Security Policy documents privacy training requirements. Currently sole founder with privacy policy expertise; formal annual training program to be implemented as team grows.',
        },
      ],
    },
    {
      name: 'GDPR Privacy',
      questions: [
        {
          id: 'GDPR-1',
          question: 'Does the data remain the property of the Controller (customer)?',
          answer: 'yes',
          explanation:
            'Terms of Service and DPA confirm customer data remains the property of the customer. Fimil acts as a data processor only.',
        },
        {
          id: 'GDPR-2',
          question: "Do you follow the Controller's instructions for data processing?",
          answer: 'yes',
          explanation:
            'DPA at /legal/dpa defines data processing scope and instructions. Fimil processes customer data only as necessary to provide the security scanning service.',
        },
        {
          id: 'GDPR-3',
          question:
            'Do you refrain from using sub-processors without advance notification or consent from the Controller?',
          answer: 'yes',
          explanation:
            'Sub-processor list published in trust center. DPA requires notification of sub-processor changes. All current sub-processors are disclosed with DPAs executed.',
        },
        {
          id: 'GDPR-4',
          question: 'Do your sub-processors have equivalent security and privacy controls?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy requires security assessment for all vendors. Tier 1 vendors (DigitalOcean, GitHub, Stripe) maintain SOC 2 certification. DPAs executed with all sub-processors.',
        },
        {
          id: 'GDPR-5',
          question: 'Do you cooperate with Regulators?',
          answer: 'yes',
          explanation:
            'ISMS Policy and Incident Response Plan include regulatory cooperation procedures. Compliance Register tracks regulatory obligations including GDPR supervisory authority requirements.',
        },
        {
          id: 'GDPR-6',
          question: 'Do you keep all received information confidential?',
          answer: 'yes',
          explanation:
            'Data classified as Confidential or Restricted per Data Governance Policy. MultiFernet encryption with key rotation for sensitive fields, tenant isolation, RBAC, and secret redaction in logs protect all received information.',
        },
        {
          id: 'GDPR-7',
          question: 'Do you report data breaches within 72 hours?',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) defines breach notification procedures with explicit GDPR 72-hour timeline for supervisory authority notification.',
        },
        {
          id: 'GDPR-8',
          question: 'Do you assist the Controller in managing breach consequences?',
          answer: 'yes',
          explanation:
            'IRP includes customer notification procedures and cooperation during incident response. Post-incident review and root cause analysis shared with affected customers.',
        },
        {
          id: 'GDPR-9',
          question: 'Do you keep records of all processing activities?',
          answer: 'yes',
          explanation:
            'Audit logging tracks 40+ action types with full attribution. Data Governance Policy documents processing activities. Compliance Register maintains records of processing by legal basis.',
        },
        {
          id: 'GDPR-10',
          question: 'Do you assist the Controller in responding to data subject rights requests?',
          answer: 'yes',
          explanation:
            'Data Governance Policy documents data subject rights procedures (access, rectification, erasure, portability). DPA commits to assisting controllers with DSAR fulfillment.',
        },
        {
          id: 'GDPR-11',
          question: 'Do you delete or return all personal data at end of contract?',
          answer: 'yes',
          explanation:
            'Data Governance Policy documents data disposal procedures for account closure. DPA includes data return/deletion obligations. Source code is ephemeral by design.',
        },
        {
          id: 'GDPR-12',
          question: 'Do you have adequate measures to protect personal data?',
          answer: 'yes',
          explanation:
            'Multi-layered protection: TLS in transit, MultiFernet encryption at rest with key rotation, Argon2id for passwords, TOTP-based MFA, RBAC, tenant isolation, audit logging, security monitoring, and container hardening.',
        },
        {
          id: 'GDPR-13',
          question:
            'If not established in the EU, have you appointed an Article 27 representative?',
          answer: 'no',
          explanation:
            'No Article 27 representative appointed yet. As a US-based company processing EU data, this appointment is planned as the EU customer base grows.',
        },
        {
          id: 'GDPR-14',
          question: 'Are DPO contact details available on your website privacy notice?',
          answer: 'partial',
          explanation:
            'Privacy Policy lists security@fimil.dev as the contact for privacy inquiries. Formal DPO appointment with dedicated contact details to be established as organization scales.',
        },
        {
          id: 'GDPR-15',
          question: 'Is data processed only as long as needed for the stated purpose?',
          answer: 'yes',
          explanation:
            'Data Governance Policy defines retention schedules for all data categories. Source code is ephemeral (clone-scan-delete). Report retention configurable at 30 days. Session data expires in 24 hours.',
        },
        {
          id: 'GDPR-16',
          question: 'Are all parties committed to confidentiality?',
          answer: 'yes',
          explanation:
            'People Security Policy mandates confidentiality agreements. Sub-processor DPAs include confidentiality obligations. Data classified and handled per Data Governance Policy.',
        },
        {
          id: 'GDPR-17',
          question: 'Do you assist the Controller in responding to data subject requests?',
          answer: 'yes',
          explanation:
            'DPA commits to assisting controllers with DSAR fulfillment. Data Governance Policy documents procedures for access, rectification, erasure, and portability requests.',
        },
        {
          id: 'GDPR-18',
          question:
            'Do you cooperate with the Controller on Data Protection Impact Assessments (DPIA)?',
          answer: 'yes',
          explanation:
            'DPA includes DPIA cooperation commitment. Formal DPIA process implemented with template and register. Risk Assessment methodology and Data Governance Policy provide the framework for privacy impact assessments.',
        },
        {
          id: 'GDPR-19',
          question:
            'Do you refrain from onward transfers of personal data outside the EEA without Controller permission?',
          answer: 'partial',
          explanation:
            'Infrastructure is US-based (DigitalOcean). DPA addresses international data transfers. Standard Contractual Clauses (SCCs) to be incorporated as the EU customer base grows.',
        },
        {
          id: 'GDPR-20',
          question:
            'Are personnel handling personal information trained in privacy obligations at least annually?',
          answer: 'partial',
          explanation:
            'People Security Policy documents privacy training requirements. Currently sole founder with privacy expertise; formal annual privacy training to be implemented as team grows.',
        },
        {
          id: 'GDPR-21',
          question:
            'If handling sensitive personal data, are personnel subject to background checks?',
          answer: 'partial',
          explanation:
            'People Security Policy documents background verification requirements. Fimil handles minimal personal data (email, name). Not yet exercised as currently sole founder.',
        },
      ],
    },
  ],
};
