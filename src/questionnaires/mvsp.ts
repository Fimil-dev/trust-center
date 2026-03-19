import type { Questionnaire } from './types';

export const mvsp: Questionnaire = {
  name: 'MVSP',
  slug: 'mvsp',
  version: '2.0',
  description:
    'Minimum Viable Secure Product checklist — 25 baseline security controls for B2B software.',
  url: 'https://mvsp.dev',
  enabled: true,
  sections: [
    {
      name: 'Business Controls',
      questions: [
        {
          id: '1.1',
          question:
            'Vulnerability disclosure policy — Publish a vulnerability disclosure policy with testing scope, legal safe harbor, and contact details. Respond to reports within reasonable timeframes.',
          answer: 'yes',
          explanation:
            'SECURITY.md published with responsible disclosure policy, testing scope, safe harbor provisions, and security@fimil.dev contact. 48-hour acknowledgment SLA.',
        },
        {
          id: '1.2',
          question:
            'Customer testing — Enable customers to test the security of your application on request.',
          answer: 'partial',
          explanation:
            'No formal customer penetration testing process, but customers are not contractually blocked from testing. Security whitepaper published at /security.',
        },
        {
          id: '1.3',
          question:
            'Self-assessment — Perform security self-assessments using the latest MVSP release, at least annually.',
          answer: 'yes',
          explanation:
            'Comprehensive internal compliance assessment performed (ISO 27001 + SOC 2 mapping) with documented findings, gap analysis, and remediation plans.',
        },
        {
          id: '1.4',
          question:
            'External testing — Contract a security vendor to perform comprehensive penetration tests at least annually.',
          answer: 'no',
          explanation:
            'No external penetration test or independent security audit has been conducted. This is the primary remaining gap (ISO A.5.35 FAIL).',
        },
        {
          id: '1.5',
          question:
            'Training — Implement role-specific security training for all personnel involved in product development and management.',
          answer: 'partial',
          explanation:
            'People Security Policy documents role-specific training requirements. Currently sole founder with deep security domain expertise; formal training program framework ready for team scaling.',
        },
        {
          id: '1.6',
          question:
            'Compliance — Comply with applicable industry security standards (e.g., PCI DSS, HITRUST, ISO 27001, SSAE 18) and laws (e.g., GDPR).',
          answer: 'partial',
          explanation:
            'ISO 27001 and SOC 2 controls implemented with comprehensive policy suite. Certification audits planned but not yet completed. GDPR and CCPA requirements tracked in Compliance Register.',
        },
        {
          id: '1.7',
          question:
            'Incident handling — Notify relevant parties about security breaches involving sensitive information within 72 hours.',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) defines four severity levels, response phases, and breach notification procedures aligned to GDPR 72-hour and CCPA timelines.',
        },
        {
          id: '1.8',
          question:
            'Data handling — Ensure media sanitization processes based on NIST SP 800-88 for storage media holding unencrypted production data.',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean managed infrastructure. No physical storage media under Fimil's control. Media sanitization is the cloud provider's responsibility under the shared responsibility model.",
        },
      ],
    },
    {
      name: 'Application Design Controls',
      questions: [
        {
          id: '2.1',
          question:
            'Single Sign-On — Implement SSO using modern, maintained, industry-standard protocols for all customers at no additional cost.',
          answer: 'yes',
          explanation:
            'OAuth2/OIDC federation supported with GitHub and generic OIDC providers. SSO available on all plans at no additional cost.',
        },
        {
          id: '2.2',
          question:
            'HTTPS-only — Redirect HTTP to HTTPS. Scan and address TLS issues. Include HSTS header. Set auth cookies as Secure.',
          answer: 'yes',
          explanation:
            "TLS enforced in production (REQUIRE_TLS=True). HSTS enabled. Auth cookies set with Secure, HttpOnly, and SameSite=lax flags. TLS managed via cert-manager with Let's Encrypt.",
        },
        {
          id: '2.3',
          question:
            'Security headers — Apply relevant security headers (CSP, X-Frame-Options). Disable caching for sensitive API responses.',
          answer: 'yes',
          explanation:
            'Nginx configuration includes Content-Security-Policy, X-Frame-Options, and X-Content-Type-Options headers. CORS configuration restricts cross-origin requests. Cloudflare WAF with managed rulesets provides additional protection.',
        },
        {
          id: '2.4',
          question:
            'Password policy — No character limits, allow 64+ characters, no secret questions as sole reset mechanism, email verification of changes, store hashed and salted with memory-hard function, enforce lockout.',
          answer: 'yes',
          explanation:
            'Password policy enforces 12+ characters with complexity requirements. Argon2id (memory-hard) hashing with salt. Account lockout after 5 failed attempts (30-minute cooldown). Email verification for SaaS registration. No secret questions used.',
        },
        {
          id: '2.5',
          question:
            'Security libraries — Use modern, maintained security frameworks and template languages that escape outputs and sanitize inputs.',
          answer: 'yes',
          explanation:
            'FastAPI with Pydantic validation for all API inputs. SQLAlchemy ORM prevents SQL injection. React JSX auto-escapes output. CSRF double-submit cookie pattern with constant-time comparison.',
        },
        {
          id: '2.6',
          question:
            'Dependency patching — Keep third-party dependencies up to date. Apply medium+ severity patches. Prioritize KEV.',
          answer: 'yes',
          explanation:
            'Dependabot configured across all repos for automated dependency updates. Trivy image scanning in CI/CD blocks critical container vulnerabilities. EPSS enrichment for exploit prioritization. Patch management SLA: Critical 24h, High 7d, Medium 30d.',
        },
        {
          id: '2.7',
          question:
            'Logging — Log authentication events, CRUD operations, security config changes, and data access. Include user ID, IP, timestamp, action, and object. Retain 30+ days. No sensitive data in logs.',
          answer: 'yes',
          explanation:
            'Audit logging tracks 40+ action types with user_id, IP, timestamp, action, resource_type, and resource_id. Structlog JSON output with request correlation IDs. Secret redaction prevents sensitive data in logs.',
        },
        {
          id: '2.8',
          question:
            'Encryption — Use modern encryption for data in transit and at rest, including backups.',
          answer: 'yes',
          explanation:
            'TLS 1.2+ for data in transit. MultiFernet (AES-128-CBC + HMAC-SHA256) with versioned key rotation for sensitive fields at rest. Database encryption via DigitalOcean managed provider. Backups compressed and stored in S3 with encryption.',
        },
      ],
    },
    {
      name: 'Application Implementation Controls',
      questions: [
        {
          id: '3.1',
          question:
            'List of data — Maintain a list of sensitive data types the application processes.',
          answer: 'yes',
          explanation:
            'Data Governance Policy (FIMIL-DGP-001) classifies data into four levels: Public, Internal, Confidential (user PII, scan results), and Restricted (encryption keys, OAuth tokens, API credentials).',
        },
        {
          id: '3.2',
          question:
            'Data flow diagram — Maintain an up-to-date diagram of how sensitive data reaches your systems and where it ends up being stored.',
          answer: 'partial',
          explanation:
            'Architecture documented in CLAUDE.md with data flow through scanner pipeline and storage layers. Data Governance Policy covers data handling requirements. No standalone visual data flow diagram maintained.',
        },
        {
          id: '3.3',
          question:
            'Vulnerability prevention — Train developers and implement guidelines to prevent auth bypass, insecure sessions, injections, XSS, CSRF, and untrusted data handling.',
          answer: 'yes',
          explanation:
            'OWASP-aware implementation: CSRF double-submit cookies, SQLAlchemy parameterized queries, Pydantic input validation, React auto-escaping, rate limiting, and RBAC. SAST scanning (Semgrep, Bandit) enforces secure coding in CI.',
        },
        {
          id: '3.4',
          question:
            'Time to fix vulnerabilities — Patch application vulnerabilities impacting security within 90 days. Prioritize actively exploited. Publish security bulletins.',
          answer: 'yes',
          explanation:
            'Formal patch management SLA: Critical 24h, High 7d, Medium 30d. Trivy blocks critical vulnerabilities in CI/CD. EPSS enrichment prioritizes actively exploited CVEs. Dependabot provides automated dependency update PRs.',
        },
        {
          id: '3.5',
          question:
            'Build and release process — Use version control and a consistent build process with provenance (SLSA Build Level 1). Store credentials separately from source code.',
          answer: 'yes',
          explanation:
            'Git version control with CI/CD pipeline, Helm-based deployments, and sealed secrets for credential separation. SPDX SBOMs generated for all container images. Cosign keyless signing via Sigstore. SLSA provenance attestations via actions/attest-build-provenance.',
        },
      ],
    },
    {
      name: 'Operational Controls',
      questions: [
        {
          id: '4.1',
          question:
            'Physical access — Validate physical security of facilities with layered perimeter controls. Manage key access with logs.',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. No physical facilities under Fimil's control. Physical security is the cloud provider's responsibility under the shared responsibility model.",
        },
        {
          id: '4.2',
          question:
            'Logical access — Limit sensitive data access to users with legitimate need. Deactivate redundant accounts. Regular access reviews. Require MFA for remote access to customer data and production.',
          answer: 'yes',
          explanation:
            'Five-level RBAC with tenant isolation enforces least-privilege access. Account deactivation and bulk token revocation supported. TOTP-based MFA with recovery codes implemented. Automated access reviews via Fimil-Ops (stale users, tokens, privileged users).',
        },
        {
          id: '4.3',
          question:
            'Sub-processors — Maintain a list of third-party companies with access to customer data, available to clients. Assess third parties annually.',
          answer: 'yes',
          explanation:
            'Sub-processor list published in trust center with DPAs executed for all vendors. Vendor Risk Management Policy defines three-tier classification with annual/biannual review cadence.',
        },
        {
          id: '4.4',
          question:
            'Backup and disaster recovery — Securely back up data to a different location. Maintain and test disaster recovery plans annually.',
          answer: 'yes',
          explanation:
            'Nightly PostgreSQL and Redis backups to S3 offsite storage with documented restore procedures (RTO 4h, RPO 24h). DR test completed March 2026 with successful recovery validation.',
        },
      ],
    },
  ],
};
