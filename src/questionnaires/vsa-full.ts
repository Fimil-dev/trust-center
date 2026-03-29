import type { Questionnaire } from './types';

export const vsaFull: Questionnaire = {
  name: 'VSA Full',
  slug: 'vsa-full',
  version: '2021',
  description:
    'Vendor Security Alliance Full questionnaire — comprehensive security assessment covering data protection, policies, proactive and reactive security, software supply chain, and compliance.',
  url: 'https://www.vendorsecurityalliance.org',
  enabled: true,
  sections: [
    {
      name: 'Service Overview',
      questions: [
        {
          id: 'SO-1',
          question: 'Company name.',
          answer: 'yes',
          explanation: 'Fimil, Inc. — a Delaware C Corporation.',
        },
        {
          id: 'SO-2',
          question: 'Describe the service being provided.',
          answer: 'yes',
          explanation:
            'Fimil is a unified application security platform that orchestrates open-source security scanners (SAST, SCA, Secrets, IaC, Container) behind a single dashboard with finding deduplication, priority scoring, and policy enforcement.',
        },
        {
          id: 'SO-3',
          question: 'What technology stack is used to provide the service?',
          answer: 'yes',
          explanation:
            'Python/FastAPI backend, React/TypeScript frontend, PostgreSQL database, Redis for caching and job queuing, Celery workers, Docker containers for scanner isolation, Kubernetes on DigitalOcean for orchestration.',
        },
        {
          id: 'SO-4',
          question:
            "Is the service hosted in your own datacenter, in the cloud, or deployed on-premise at the customer's location?",
          answer: 'yes',
          explanation:
            'Cloud-hosted on DigitalOcean Kubernetes (SaaS). An Enterprise self-hosted deployment model is also available for on-premise installation.',
        },
        {
          id: 'SO-4a',
          question: 'If hosted in a data center, list all data center locations.',
          answer: 'yes',
          explanation:
            'DigitalOcean managed Kubernetes cluster; primary region is a US-based DigitalOcean data center. Single-region deployment currently.',
        },
        {
          id: 'SO-4b',
          question: 'What cloud providers do you rely on?',
          answer: 'yes',
          explanation:
            'DigitalOcean (infrastructure, managed PostgreSQL, container registry), Cloudflare (CDN/DDoS protection), Stripe (payment processing), Resend (transactional email), PostHog (analytics).',
        },
        {
          id: 'SO-4c',
          question: 'Have you researched the security best practices of your cloud provider(s)?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy (FIMIL-VRM-001) classifies all vendors into three tiers with documented security assessments. DigitalOcean is Tier 1 with SOC 2 report collection tracked.',
        },
        {
          id: 'SO-5a',
          question: 'Do you have the most recent penetration test report available?',
          answer: 'no',
          explanation:
            'No external penetration test has been conducted. This is the primary remaining gap identified in our ISO 27001 assessment (A.5.35 FAIL).',
        },
        {
          id: 'SO-5b',
          question:
            'Does the penetration test follow an industry approved methodology (e.g., OWASP, PTES)?',
          answer: 'no',
          explanation:
            'No penetration test has been performed yet. When conducted, it will follow OWASP methodology.',
        },
        {
          id: 'SO-5c',
          question:
            'Do you have Information Security Policies and Procedures available for review?',
          answer: 'yes',
          explanation:
            'Comprehensive policy suite available: ISMS Policy (FIMIL-ISMS-001), Access Control Policy, Data Governance Policy, Change Management Policy, Incident Response Plan, People Security Policy, and Vendor Risk Management Policy.',
        },
        {
          id: 'SO-5d',
          question: 'Do you have a Data Flow Diagram available for review?',
          answer: 'yes',
          explanation:
            'Visual data flow diagram published on the trust center showing data ingestion, scanner pipeline (ephemeral, network-isolated), encrypted storage layers, subprocessor data flows, and security boundaries. Architecture also documented in internal technical documentation.',
        },
        {
          id: 'SO-5e',
          question:
            'Do you have PCI, SOC 2 Type II, or ISO 27001 certification reports available for review?',
          answer: 'no',
          explanation:
            'ISO 27001 and SOC 2 controls are implemented with a comprehensive policy suite, but certification audits have not yet been completed. Certification is planned.',
        },
      ],
    },
    {
      name: 'Data Protection & Access Controls',
      questions: [
        {
          id: 'DPAC-1',
          question:
            'What customer data is required to provide the service (personal, financial, confidential, sensitive, government)?',
          answer: 'yes',
          explanation:
            'Fimil collects user email and name (personal), OAuth tokens for Git provider integration (confidential), and temporarily processes source code for scanning (ephemeral, never persisted). No financial, sensitive, or government data is collected.',
        },
        {
          id: 'DPAC-2',
          question: 'Do you have a data classification matrix available?',
          answer: 'yes',
          explanation:
            'Data Governance Policy (FIMIL-DGP-001) establishes a four-level classification: Public, Internal, Confidential (user PII, scan results), and Restricted (encryption keys, OAuth tokens, API credentials).',
        },
        {
          id: 'DPAC-3',
          question: 'How is customer data encrypted?',
          answer: 'yes',
          explanation:
            'TLS 1.2+ for data in transit. MultiFernet encryption (AES-128-CBC + HMAC-SHA256) with versioned key rotation for sensitive fields at rest. Database encryption via DigitalOcean managed PostgreSQL. Backups encrypted in S3.',
        },
        {
          id: 'DPAC-4',
          question: 'How does your organization decide who has access to sensitive data?',
          answer: 'yes',
          explanation:
            'Five-level RBAC hierarchy (Operator > Admin > Security > Developer > Viewer) enforced at every API endpoint via FastAPI dependencies. Tenant isolation ensures customers only access their own data.',
        },
        {
          id: 'DPAC-5',
          question: 'Do you have capabilities to anonymize data?',
          answer: 'yes',
          explanation:
            'Source code is ephemeral (clone-scan-delete, never persisted). Scan findings are normalized through the scanner pipeline, stripping source context. Secret redaction removes sensitive values before storage.',
        },
        {
          id: 'DPAC-6',
          question: 'How is anonymized data used?',
          answer: 'yes',
          explanation:
            "Anonymized scan findings are used solely for vulnerability reporting and trend analysis within the customer's own tenant. No cross-tenant data sharing or aggregation.",
        },
        {
          id: 'DPAC-7',
          question:
            'What are the general rules for role provisioning, deprovisioning, and recertification?',
          answer: 'yes',
          explanation:
            'Access Control Policy governs provisioning. Email verification required for registration. Admin approval required for role elevation. People Security Policy includes offboarding checklists with access revocation. User deactivation immediately blocks all authentication.',
        },
        {
          id: 'DPAC-8',
          question: 'Which staff groups have access to personal or sensitive data?',
          answer: 'yes',
          explanation:
            'Currently sole founder with full system access. RBAC enforces that only Admin and Operator roles can access user management. Security role can access findings. Developer and Viewer roles have limited access.',
        },
        {
          id: 'DPAC-9',
          question: 'Is any sensitive data kept in hard copy?',
          answer: 'no',
          explanation:
            'Fimil is a fully cloud-based platform. No hard copy sensitive data exists. All data is stored digitally with encryption.',
        },
        {
          id: 'DPAC-10',
          question:
            'Is there a procedure in place for securely destroying hard copy sensitive data?',
          answer: 'na',
          explanation:
            'No hard copy sensitive data exists. Fimil is entirely cloud-hosted with no physical data storage.',
        },
        {
          id: 'DPAC-11',
          question:
            'Do you support secure deletion (degaussing/cryptographic wiping) of archived or backed-up data?',
          answer: 'yes',
          explanation:
            'Data Governance Policy documents data disposal procedures by classification level. Source code is ephemeral. Report retention configurable at 30 days. API tokens revocable. Session data expires automatically.',
        },
        {
          id: 'DPAC-12',
          question:
            'Under what circumstances is customer data allowed to leave production systems?',
          answer: 'yes',
          explanation:
            'Customer data may leave production only via encrypted backups to S3, authenticated API exports by authorized users, and DSAR fulfillment. Source code never persists beyond the scan lifecycle.',
        },
        {
          id: 'DPAC-13',
          question: 'Do you have an internal password policy?',
          answer: 'yes',
          explanation:
            'Password policy enforces minimum 12 characters with complexity requirements (mixed case, digit, special character). Account lockout after 5 failed attempts with 30-minute cooldown.',
        },
        {
          id: 'DPAC-14',
          question: 'Are there complexity or length requirements for passwords?',
          answer: 'yes',
          explanation:
            'Passwords must be at least 12 characters with mixed case, at least one digit, and at least one special character. Maximum length allows 64+ characters.',
        },
        {
          id: 'DPAC-15',
          question: 'How are passwords hashed?',
          answer: 'yes',
          explanation:
            'Passwords are hashed using Argon2id (memory-hard) with per-password salt. Migrated from bcrypt to Argon2id for stronger resistance against GPU and ASIC attacks.',
        },
        {
          id: 'DPAC-16',
          question: 'Is a remote connection to the production systems (VPN) required?',
          answer: 'yes',
          explanation:
            'Production systems run on DigitalOcean Kubernetes with access restricted via Kubernetes RBAC and kubectl authentication. No direct SSH access; all management through authenticated Kubernetes API.',
        },
        {
          id: 'DPAC-17',
          question: 'Is MFA required for employees/contractors to log in to production systems?',
          answer: 'yes',
          explanation:
            'TOTP-based MFA with recovery codes implemented in the application with two-step login flow and encrypted secret storage. Production Kubernetes access controlled via DigitalOcean authentication and Kubernetes RBAC.',
        },
        {
          id: 'DPAC-18',
          question: 'Do your internal applications leverage SSO?',
          answer: 'yes',
          explanation:
            'OAuth2/OIDC federation supported with GitHub and generic OIDC providers for user authentication. SSO available on all plans.',
        },
        {
          id: 'DPAC-19',
          question: 'Which processors (vendors) have access to customer information?',
          answer: 'yes',
          explanation:
            'Sub-processor list published in trust center: DigitalOcean (infrastructure), Stripe (payments), Resend (email), PostHog (analytics). DPAs executed with all vendors.',
        },
        {
          id: 'DPAC-20',
          question: 'Do your processors comply with your security standards?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy (FIMIL-VRM-001) defines three-tier classification with security requirements. All Tier 1 vendors (DigitalOcean, GitHub, Stripe) maintain SOC 2 certification.',
        },
        {
          id: 'DPAC-21',
          question: 'How do you regularly audit your critical vendors?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy defines annual review for Tier 1 vendors and biannual for Tier 2. SOC 2 report collection tracked. Exit strategies documented for critical vendors.',
        },
        {
          id: 'DPAC-22',
          question: "Do you process EU citizens' personal data?",
          answer: 'yes',
          explanation:
            "Yes, Fimil is available globally and may process EU citizens' data. GDPR compliance requirements are tracked in the Compliance Register, and a Data Processing Agreement is published at /legal/dpa.",
        },
        {
          id: 'DPAC-23',
          question: 'Have you appointed a Data Protection Officer?',
          answer: 'partial',
          explanation:
            'ISMS Policy designates the CEO (sole founder) with data protection responsibilities. A formal DPO appointment will be formalized as the organization scales.',
        },
      ],
    },
    {
      name: 'Policies & Standards',
      questions: [
        {
          id: 'PS-1',
          question: 'Do you have a formal Information Security Program in place?',
          answer: 'yes',
          explanation:
            'ISMS Policy (FIMIL-ISMS-001) establishes the formal Information Security Management System aligned with ISO 27001:2022, supported by a comprehensive policy suite.',
        },
        {
          id: 'PS-2',
          question: 'Do you review your InfoSec policies at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines annual policy review cadence. Statement of Applicability (FIMIL-SOA-001) tracks control implementation status. Policies are version-controlled in Git.',
        },
        {
          id: 'PS-3',
          question: 'Do you have an information security risk management program?',
          answer: 'yes',
          explanation:
            'Risk Assessment (FIMIL-RISK-001) uses a 5x5 likelihood-impact matrix identifying 15 risks with documented treatment plans and timelines (Q2-Q4 2026).',
        },
        {
          id: 'PS-4',
          question: 'Is there management support and/or a security management forum?',
          answer: 'partial',
          explanation:
            'ISMS Policy establishes management commitment to information security. Currently sole founder serving all governance roles; security steering committee to be established as team scales.',
        },
        {
          id: 'PS-5',
          question: 'Do you have a dedicated information security team?',
          answer: 'partial',
          explanation:
            'Currently sole founder with deep security domain expertise (building an application security platform). Dedicated security team to be established as the organization grows.',
        },
        {
          id: 'PS-6',
          question:
            'Do your InfoSec and privacy policies align with industry standards (e.g., ISO 27001, NIST, SOC 2)?',
          answer: 'yes',
          explanation:
            'Policies are aligned with ISO 27001:2022 and SOC 2 Type II Trust Services Criteria. Compliance Register tracks regulatory obligations including GDPR and CCPA.',
        },
        {
          id: 'PS-7',
          question: 'Do you have a policy exception process?',
          answer: 'yes',
          explanation:
            'Change Management Policy (FIMIL-CHG-001) includes exception handling for emergency changes. ISMS Policy provides a framework for policy exceptions with documented risk acceptance.',
        },
        {
          id: 'PS-8',
          question: 'Do you have a formal disciplinary policy for security policy violations?',
          answer: 'yes',
          explanation:
            'People Security Policy (FIMIL-PPL-001) defines a disciplinary process for security policy violations. Currently sole founder; enforcement framework ready for team scaling.',
        },
        {
          id: 'PS-9',
          question: 'Do you perform background verification for all employment candidates?',
          answer: 'partial',
          explanation:
            'People Security Policy documents background verification requirements for all roles including security competence criteria. Not yet exercised as currently sole founder.',
        },
        {
          id: 'PS-10',
          question: 'Are all personnel required to sign Confidentiality Agreements?',
          answer: 'partial',
          explanation:
            'People Security Policy mandates confidentiality agreements for all personnel. Policy documented and ready for execution; not yet exercised as currently sole founder.',
        },
        {
          id: 'PS-11',
          question: 'Are all personnel required to sign an Acceptable Use Policy?',
          answer: 'yes',
          explanation:
            'Acceptable Use Policy published at /legal/acceptable-use. People Security Policy requires all personnel to acknowledge and sign the AUP.',
        },
        {
          id: 'PS-12',
          question:
            'Are there procedures for change in employment or termination, including access revocation?',
          answer: 'yes',
          explanation:
            'People Security Policy includes offboarding checklists with access revocation procedures. Technical controls support immediate user deactivation, session invalidation, and API token revocation.',
        },
      ],
    },
    {
      name: 'Proactive Security',
      questions: [
        {
          id: 'PRO-1',
          question: 'How is network security testing performed (internal, third party, cadence)?',
          answer: 'partial',
          explanation:
            'Network security relies on Kubernetes network policies and scanner container isolation (--network=none). No independent network penetration testing has been performed yet.',
        },
        {
          id: 'PRO-2',
          question: 'How is application security testing performed?',
          answer: 'yes',
          explanation:
            'CI pipeline runs SAST (Semgrep, Bandit), container scanning (Trivy), linting, and automated tests on every push/PR. Fimil scans its own repositories through the platform. Security-specific tests in api/tests/security/.',
        },
        {
          id: 'PRO-3',
          question: 'What are your network vulnerability management processes?',
          answer: 'partial',
          explanation:
            'Container image scanning with Trivy in the deployment pipeline. Kubernetes network policies restrict traffic. No dedicated network vulnerability scanning tool deployed yet.',
        },
        {
          id: 'PRO-4',
          question: 'What is the timeframe for patching critical vulnerabilities?',
          answer: 'yes',
          explanation:
            'Formal patch management SLA: Critical 24h, High 7d, Medium 30d. Trivy blocks deployment of containers with critical vulnerabilities. EPSS enrichment prioritizes actively exploited CVEs. Dependabot provides automated dependency update PRs.',
        },
        {
          id: 'PRO-5',
          question: 'What tools do you use for vulnerability management?',
          answer: 'yes',
          explanation:
            "Fimil's own platform orchestrates Semgrep, Bandit, Trivy, Grype, OSV-Scanner, Gitleaks, TruffleHog, Checkov, Hadolint, and Syft for comprehensive vulnerability detection.",
        },
        {
          id: 'PRO-6',
          question: 'What are your application vulnerability management processes?',
          answer: 'yes',
          explanation:
            'Automated scanning in CI/CD with priority scoring (0-100) combining severity, age, reachability, and EPSS. Auto-triage rules classify findings. Finding deduplication groups equivalent findings across tools.',
        },
        {
          id: 'PRO-7',
          question: 'What tools do you use for application vulnerability management?',
          answer: 'yes',
          explanation:
            'Fimil platform with 12 integrated scanners covering SAST, SCA, Secrets, IaC, Container, and SBOM. EPSS enrichment and reachability analysis for prioritization.',
        },
        {
          id: 'PRO-8',
          question: 'How regularly do you evaluate patches and updates?',
          answer: 'yes',
          explanation:
            'Dependabot configured across all repos for automated dependency updates. Container image scanning on every build detects known CVEs. Patch management SLA: Critical 24h, High 7d, Medium 30d.',
        },
        {
          id: 'PRO-9',
          question: 'Do you have a responsible disclosure path published?',
          answer: 'yes',
          explanation:
            'SECURITY.md published with responsible disclosure policy, testing scope, safe harbor provisions, and security@fimil.dev contact with 48-hour acknowledgment SLA.',
        },
        {
          id: 'PRO-10',
          question: 'Do you have an established bug bounty program?',
          answer: 'no',
          explanation:
            'No formal bug bounty program. Responsible disclosure policy is published via SECURITY.md but does not include financial incentives.',
        },
        {
          id: 'PRO-11',
          question: 'Are endpoint laptops centrally managed?',
          answer: 'partial',
          explanation:
            'Currently sole founder; no formal MDM solution deployed. Endpoint security policies are documented in the People Security Policy for future team scaling.',
        },
        {
          id: 'PRO-12',
          question: 'Do you have a standard device security configuration?',
          answer: 'partial',
          explanation:
            'People Security Policy documents device security requirements including full-disk encryption and screen lock. Formal standard configuration to be enforced via MDM as team grows.',
        },
        {
          id: 'PRO-13',
          question: 'Is sensitive or private data stored on endpoint devices?',
          answer: 'no',
          explanation:
            'Customer data resides in cloud infrastructure (DigitalOcean managed PostgreSQL). Source code is ephemeral. No sensitive data is stored on endpoint devices.',
        },
        {
          id: 'PRO-14',
          question: 'How do you limit data exfiltration from production endpoints?',
          answer: 'yes',
          explanation:
            'Production access is via Kubernetes RBAC only; no direct SSH. Scanner containers run with --network=none. Application-level intrusion detection includes bulk export detection and API anomaly detection.',
        },
        {
          id: 'PRO-15',
          question:
            'Do you have systems to mitigate web application vulnerabilities (WAF, proxies)?',
          answer: 'yes',
          explanation:
            'Cloudflare WAF deployed with managed rulesets for web application protection. Cloudflare provides DDoS protection. Application-level protections include rate limiting, CSRF protection, input validation, and Content-Security-Policy headers.',
        },
        {
          id: 'PRO-16',
          question: 'Do you have breach detection or anomaly detection with alerting?',
          answer: 'yes',
          explanation:
            'Security alert system provides automated threat detection: brute force detection, credential stuffing detection, API anomaly detection, and suspicious scan pattern detection. Falco provides runtime container integrity monitoring.',
        },
        {
          id: 'PRO-17',
          question: 'Are hosts uniformly configured?',
          answer: 'yes',
          explanation:
            'All production workloads run as immutable Docker containers on Kubernetes with standardized configurations: non-root, read-only filesystem, cap_drop ALL, no-new-privileges, defined resource limits.',
        },
        {
          id: 'PRO-18',
          question: 'Are production changes reviewed by at least two engineers?',
          answer: 'partial',
          explanation:
            'Branch protection enforced: GPG-signed commits required, CI status checks required, enforce admins enabled. CODEOWNERS file established. CI pipeline gates on linting, tests, and container scanning. Currently sole founder; multi-reviewer approval to be implemented as team grows.',
        },
        {
          id: 'PRO-19',
          question: 'What is your secrets management strategy?',
          answer: 'yes',
          explanation:
            'Kubernetes Sealed Secrets encrypt production credentials. MultiFernet encryption with versioned key rotation for sensitive database fields. Secret redaction in logs. Gitleaks and TruffleHog scan for leaked secrets in CI.',
        },
        {
          id: 'PRO-20',
          question: 'Are all security events in production logged?',
          answer: 'yes',
          explanation:
            'Audit logging tracks 40+ action types with user_id, IP, timestamp, action, resource_type, and resource_id. Structlog JSON output with request correlation IDs. Impersonation tracked with both admin and impersonated user IDs.',
        },
        {
          id: 'PRO-21',
          question: 'Is the production network segmented?',
          answer: 'yes',
          explanation:
            'Kubernetes network policies segment the production network. Scanner containers run with --network=none for complete isolation. Ingress-only access with TLS termination.',
        },
        {
          id: 'PRO-22',
          question: 'Is there a process for network configuration changes?',
          answer: 'yes',
          explanation:
            'Change Management Policy (FIMIL-CHG-001) governs all infrastructure changes including network configuration. Helm-based deployments with atomic rollback ensure safe changes.',
        },
        {
          id: 'PRO-23',
          question: 'Is network traffic over public networks encrypted?',
          answer: 'yes',
          explanation:
            "TLS 1.2+ enforced for all public-facing traffic via cert-manager with Let's Encrypt. HSTS headers enabled. HTTP redirected to HTTPS.",
        },
        {
          id: 'PRO-24',
          question: 'What cryptographic frameworks are used for data in transit?',
          answer: 'yes',
          explanation:
            "TLS 1.2+ managed by cert-manager with Let's Encrypt certificates. HSTS enforced. Auth cookies set with Secure flag.",
        },
        {
          id: 'PRO-25',
          question: 'What cryptographic frameworks are used for data at rest?',
          answer: 'yes',
          explanation:
            'MultiFernet encryption (AES-128-CBC + HMAC-SHA256) with versioned key rotation for sensitive fields (OAuth tokens, API credentials). Database encryption via DigitalOcean managed PostgreSQL. S3 backups encrypted.',
        },
        {
          id: 'PRO-26',
          question: 'What cryptographic frameworks are used for passwords?',
          answer: 'yes',
          explanation:
            'Argon2id (memory-hard) with per-password salt for user passwords. SHA-256 hashing for API tokens and email verification tokens. Constant-time comparison for all secret operations.',
        },
        {
          id: 'PRO-27',
          question: 'Are any custom cryptographic frameworks used?',
          answer: 'no',
          explanation:
            'No custom cryptography. All implementations use standard, well-maintained libraries: argon2-cffi (Argon2id), cryptography (MultiFernet), hashlib (SHA-256), and secrets module for token generation.',
        },
        {
          id: 'PRO-28',
          question: 'What is your key management approach?',
          answer: 'partial',
          explanation:
            'Encryption keys stored as environment variables via Kubernetes Sealed Secrets. MultiFernet versioned key rotation implemented for seamless encryption key transitions without data loss. KMS integration not yet in place.',
        },
        {
          id: 'PRO-29',
          question: 'Do you have a security awareness program?',
          answer: 'partial',
          explanation:
            'People Security Policy documents role-specific security training requirements. Currently sole founder with deep security domain expertise; formal security awareness program framework ready for team scaling.',
        },
      ],
    },
    {
      name: 'Reactive Security',
      questions: [
        {
          id: 'RS-1',
          question: 'How do you keep aware of potential security vulnerabilities and threats?',
          answer: 'yes',
          explanation:
            'Automated scanning with 12 integrated security scanners, EPSS enrichment from FIRST.org API, container image scanning in CI/CD, Falco runtime monitoring, and security alert system with automated threat detection.',
        },
        {
          id: 'RS-2',
          question: 'How do you log and alert on security events?',
          answer: 'yes',
          explanation:
            'Structlog JSON logging with 40+ audit event types. Security alert system detects brute force, credential stuffing, API anomalies, and suspicious patterns. Email and Slack notifications for critical findings.',
        },
        {
          id: 'RS-3',
          question: 'Do you have a Security Incident Response Program?',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) defines four severity levels, incident commander role, response phases (triage, containment, eradication, recovery, communication), and regulatory notification procedures.',
        },
        {
          id: 'RS-4',
          question: 'How is the Incident Response Program tested?',
          answer: 'partial',
          explanation:
            'IRP is documented and technical capabilities are implemented (Incident model, SecurityAlert, auto-blocking, account lockout). DR test completed March 2026 validated recovery procedures. Tabletop exercises and simulated incident drills planned but not yet conducted.',
        },
        {
          id: 'RS-5',
          question: 'Do you have a formal SLA for incident response?',
          answer: 'yes',
          explanation:
            'IRP defines response timelines by severity: Critical incidents require immediate response, Major within 1 hour, Minor within 4 hours. SECURITY.md provides 48-hour acknowledgment SLA for vulnerability reports.',
        },
        {
          id: 'RS-6',
          question:
            'Do you have formally defined criteria for notifying clients during an incident?',
          answer: 'yes',
          explanation:
            'IRP includes customer notification procedures with breach notification aligned to GDPR 72-hour and CCPA timelines. Notification criteria defined by incident severity and data impact.',
        },
      ],
    },
    {
      name: 'Software Supply Chain',
      questions: [
        {
          id: 'SSC-1',
          question: 'Do you perform static code analysis?',
          answer: 'yes',
          explanation:
            'Semgrep and Bandit run in CI/CD on every push and pull request. Ruff linter enforces Python code quality rules. ESLint with strict TypeScript rules (--max-warnings 0).',
        },
        {
          id: 'SSC-2',
          question: 'How do you ensure code is developed securely?',
          answer: 'yes',
          explanation:
            'OWASP-aware implementation with Pydantic validation, SQLAlchemy ORM, CSRF protection, and RBAC. Pre-commit hooks enforce code style and secret scanning. CI gates on linting, tests, type checking, and SAST.',
        },
        {
          id: 'SSC-3',
          question: 'Do you perform threat modeling during the design phase?',
          answer: 'yes',
          explanation:
            'Formal threat model using STRIDE methodology covering 3 areas with 16 identified threats and mitigations. Risk Assessment (FIMIL-RISK-001) identifies 15 risks with treatment plans. Defense-in-depth architecture reflects threat awareness.',
        },
        {
          id: 'SSC-4',
          question: 'Do you provide developer training in secure coding?',
          answer: 'partial',
          explanation:
            'People Security Policy documents role-specific training requirements including secure coding practices. Currently sole founder with deep security expertise; formal training program ready for team scaling.',
        },
        {
          id: 'SSC-5',
          question: 'What percentage of production code is covered by automated tests?',
          answer: 'yes',
          explanation:
            'Frontend enforces 80% coverage thresholds for lines, functions, branches, and statements. Backend has comprehensive test suites including security-specific tests. Exact backend coverage percentage tracked in CI.',
        },
        {
          id: 'SSC-6',
          question: 'Do you have a staging or pre-production system for validating builds?',
          answer: 'yes',
          explanation:
            'Clear environment separation: Docker Compose for development, SQLite in-memory for testing, and feature flags for staged rollout. Helm atomic deployments with automatic rollback on failure in production.',
        },
        {
          id: 'SSC-7',
          question: 'Do you maintain a bill of materials for third-party libraries?',
          answer: 'yes',
          explanation:
            'Syft SBOM scanner integrated into the platform generates software bill of materials. Poetry (Python) and npm (TypeScript) lockfiles track all dependency versions.',
        },
        {
          id: 'SSC-8',
          question: 'How do you monitor vulnerabilities in third-party dependencies?',
          answer: 'yes',
          explanation:
            'Trivy, Grype, and OSV-Scanner provide SCA scanning. EPSS enrichment scores exploit probability. Reachability analysis distinguishes direct from transitive dependency vulnerabilities.',
        },
        {
          id: 'SSC-9',
          question: 'Do you outsource any development?',
          answer: 'no',
          explanation:
            'All development is performed internally by the founder. Vendor Risk Management Policy covers third-party security requirements if outsourcing occurs in the future.',
        },
        {
          id: 'SSC-10',
          question: 'Do you perform security reviews on custom-built software?',
          answer: 'yes',
          explanation:
            'Fimil scans its own repositories through the platform. SAST (Semgrep, Bandit) runs in CI. Security-specific tests cover OAuth, token security, webhook signature verification, and rate limiting.',
        },
      ],
    },
    {
      name: 'Customer Facing Application Security',
      questions: [
        {
          id: 'CFAS-1',
          question:
            'How do you authenticate users? What password complexity and SSO options are available?',
          answer: 'yes',
          explanation:
            'JWT tokens for API, Redis sessions for web UI. Password policy: 12+ chars, mixed case, digit, special char. Argon2id hashing. TOTP-based MFA available. OAuth2/OIDC SSO with GitHub and generic OIDC providers available on all plans.',
        },
        {
          id: 'CFAS-2',
          question: 'Does the application allow user MFA enforcement by admins?',
          answer: 'yes',
          explanation:
            'TOTP-based MFA implemented with recovery codes, two-step login flow, and encrypted secret storage. Users can enable MFA on their accounts.',
        },
        {
          id: 'CFAS-3',
          question: 'Is IP whitelisting available for authentication?',
          answer: 'yes',
          explanation:
            'IP blocklist/allowlist functionality with auto-blocking (20+ failed attempts trigger 24-hour block). Admin endpoints for IP management via Security Ops dashboard.',
        },
        {
          id: 'CFAS-4',
          question: 'Are there standardized roles and permissions?',
          answer: 'yes',
          explanation:
            'Five standardized roles: Operator (full system), Admin (full tenant access), Security (manage findings/triage), Developer (view findings, limited triage), and Viewer (read-only).',
        },
        {
          id: 'CFAS-5',
          question: 'Are custom granular permissions and roles available?',
          answer: 'no',
          explanation:
            'The platform uses a fixed five-level role hierarchy. Custom granular permissions beyond the predefined roles are not currently supported.',
        },
        {
          id: 'CFAS-6',
          question: 'Are there audit trails and logs for systems with customer data access?',
          answer: 'yes',
          explanation:
            'Comprehensive audit logging with 40+ event types tracking actor, tenant, IP, user agent, request ID, and impersonation context. CSV export available for offline analysis.',
        },
        {
          id: 'CFAS-7',
          question: 'Does the application provide admin access to verbose audit logs?',
          answer: 'yes',
          explanation:
            'Admin dashboard provides access to audit logs with filtering by user, action type, and date range. CSV export enabled for detailed analysis. API token usage tracked.',
        },
        {
          id: 'CFAS-8',
          question: 'Is a custom data retention policy available for customer data?',
          answer: 'yes',
          explanation:
            'Data retention configurable at 30 days for scan reports. Data Governance Policy defines retention schedules for all data categories. Account closure and data deletion procedures documented.',
        },
        {
          id: 'CFAS-9',
          question: 'Does the application provide a change log?',
          answer: 'yes',
          explanation:
            'Audit logging captures all CRUD operations and configuration changes with timestamps. Finding status transitions tracked with full history. Version-controlled codebase with Git history.',
        },
        {
          id: 'CFAS-10',
          question: 'Is a sandbox environment available for customer testing?',
          answer: 'partial',
          explanation:
            'Docker Compose development environment available. Enterprise self-hosted model allows customers to run in isolated environments. No dedicated multi-tenant sandbox for SaaS customers yet.',
        },
        {
          id: 'CFAS-11',
          question: 'Is API rate limiting implemented?',
          answer: 'yes',
          explanation:
            'Redis-backed sliding window rate limiting: authentication endpoints at 10 requests/minute, general API at 100 requests/minute. Configurable thresholds.',
        },
        {
          id: 'CFAS-12',
          question: 'How do you store API keys?',
          answer: 'yes',
          explanation:
            'API tokens are SHA-256 hashed before storage; the plaintext token is shown only once at creation. Tokens are scoped and revocable with audit trail.',
        },
        {
          id: 'CFAS-13',
          question: 'Is IP whitelisting available for API access?',
          answer: 'yes',
          explanation:
            'IP blocklist/allowlist functionality available for API access. Admin-managed via Security Ops dashboard with auto-blocking for suspicious activity.',
        },
      ],
    },
    {
      name: 'Compliance',
      questions: [
        {
          id: 'COMP-1',
          question: 'How do you conduct internal audits?',
          answer: 'yes',
          explanation:
            'Comprehensive internal compliance assessment performed against ISO 27001:2022 and SOC 2 Type II criteria with documented findings, gap analysis, and remediation plans. Statement of Applicability tracks control status.',
        },
        {
          id: 'COMP-2',
          question: 'How do you conduct external audits?',
          answer: 'no',
          explanation:
            'No external audit or independent security assessment has been conducted. External penetration testing and certification audits are planned.',
        },
        {
          id: 'COMP-3',
          question: 'Which IT operational, security, or privacy standards do you comply with?',
          answer: 'yes',
          explanation:
            'Controls aligned with ISO 27001:2022 and SOC 2 Type II. GDPR and CCPA compliance tracked in Compliance Register. Formal certification not yet obtained.',
        },
        {
          id: 'COMP-4',
          question:
            'Do your confidential data access controls align with your classification matrix?',
          answer: 'yes',
          explanation:
            'RBAC enforces access by data classification level: Restricted data (encryption keys, tokens) requires Admin/Operator role; Confidential data (PII, scan results) is tenant-isolated with role-based access.',
        },
        {
          id: 'COMP-5',
          question: 'Do you share customer data with any third parties?',
          answer: 'partial',
          explanation:
            'Sub-processors (DigitalOcean, Stripe, Resend, PostHog) may process limited customer data as documented in the sub-processor list. DPAs executed with all vendors. No customer data is sold.',
        },
        {
          id: 'COMP-6',
          question: 'Do you seek the right to use or own customer derived data?',
          answer: 'no',
          explanation:
            'Fimil does not claim ownership of customer data or derived data. Customer data remains the property of the customer as defined in the Terms of Service and DPA.',
        },
        {
          id: 'COMP-7',
          question: 'Is your Privacy Notice externally available?',
          answer: 'yes',
          explanation:
            'Privacy Policy published at /privacy. Cookie Policy at /legal/cookies. Data Processing Agreement at /legal/dpa. Acceptable Use Policy at /legal/acceptable-use. All publicly accessible.',
        },
      ],
    },
  ],
};
