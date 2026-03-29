import type { Questionnaire } from './types';

export const caiq: Questionnaire = {
  name: 'CAIQ v4',
  slug: 'caiq',
  version: '4.0',
  description:
    'Cloud Security Alliance Consensus Assessments Initiative Questionnaire — 261 questions across 17 security domains aligned with the Cloud Controls Matrix.',
  url: 'https://cloudsecurityalliance.org/artifacts/consensus-assessments-initiative-questionnaire-v4',
  enabled: true,
  sections: [
    // =========================================================================
    // A&A — Audit & Assurance (8 questions)
    // =========================================================================
    {
      name: 'A&A — Audit & Assurance',
      questions: [
        {
          id: 'A&A-01.1',
          question:
            'Are audit and assurance policies, procedures, and standards established, documented, approved, communicated, applied, evaluated, and maintained?',
          answer: 'yes',
          explanation:
            'ISMS Policy (FIMIL-ISMS-001) and the compliance documentation suite establish audit and assurance policies. Statement of Applicability (FIMIL-SOA-001) tracks control implementation status, and the Compliance Register monitors regulatory compliance.',
        },
        {
          id: 'A&A-01.2',
          question:
            'Are audit and assurance policies, procedures, and standards reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Policies are version-controlled in Git for auditability.',
        },
        {
          id: 'A&A-02.1',
          question:
            'Are independent audit and assurance assessments conducted according to relevant standards at least annually?',
          answer: 'no',
          explanation:
            'No independent external security audit, penetration test, or third-party assurance assessment has been conducted. This is the single remaining FAIL in the ISO 27001 assessment (A.5.35).',
        },
        {
          id: 'A&A-03.1',
          question:
            'Are independent audit and assurance assessments performed according to risk-based plans and policies?',
          answer: 'no',
          explanation:
            'No independent audits have been performed yet. A formal Risk Assessment (FIMIL-RISK-001) exists and would inform audit planning, but no external audit engagement has occurred.',
        },
        {
          id: 'A&A-04.1',
          question:
            'Is compliance verified regarding all relevant standards, regulations, legal/contractual, and statutory requirements?',
          answer: 'partial',
          explanation:
            'Compliance Register (FIMIL-CLR-001) tracks GDPR, CCPA/CPRA, and other regulatory requirements. Internal compliance verification is conducted, but no independent external compliance verification has been performed.',
        },
        {
          id: 'A&A-05.1',
          question:
            'Is an audit management process defined and implemented to support audit planning, risk analysis, and remediation?',
          answer: 'partial',
          explanation:
            'Risk Assessment (FIMIL-RISK-001) provides a risk framework with a 5x5 likelihood-impact matrix. Statement of Applicability tracks control gaps. CSA STAR Level 1 self-assessment completed. Continuous monitoring plan (FIMIL-CONMON-001) provides ongoing assurance. However, no formal audit management process with external audit scheduling and tracking is in place.',
        },
        {
          id: 'A&A-06.1',
          question:
            'Is a risk-based corrective action plan to remediate audit findings established, documented, approved, communicated, applied, evaluated, and maintained?',
          answer: 'partial',
          explanation:
            'Risk Assessment documents 15 identified risks with treatment plans and timelines (Q2-Q4 2026). The COMPLIANCE.md Top 10 Gaps list prioritizes remediation. However, these are internal findings, not from independent audits.',
        },
        {
          id: 'A&A-06.2',
          question:
            'Is the remediation status of audit findings reviewed and reported to relevant stakeholders?',
          answer: 'partial',
          explanation:
            'Statement of Applicability and Compliance Register track implementation and remediation status. Currently sole founder serves as both assessor and stakeholder, limiting independent oversight.',
        },
      ],
    },

    // =========================================================================
    // AIS — Application & Interface Security (11 questions)
    // =========================================================================
    {
      name: 'AIS — Application & Interface Security',
      questions: [
        {
          id: 'AIS-01.1',
          question:
            'Are application security policies and procedures established, documented, approved, communicated, applied, evaluated, and maintained?',
          answer: 'yes',
          explanation:
            'Change Management & Secure Development Lifecycle Policy (FIMIL-CHG-001) documents SDLC security integration. OWASP-aware implementation includes CSRF protection, input validation, parameterized queries, rate limiting, and secret redaction.',
        },
        {
          id: 'AIS-01.2',
          question:
            'Are application security policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the Secure Development Lifecycle Policy. Policies are version-controlled in Git.',
        },
        {
          id: 'AIS-02.1',
          question:
            'Are baseline requirements to secure different applications established, documented, and maintained?',
          answer: 'yes',
          explanation:
            'Application security baselines are enforced via CI pipeline (linting, testing, type checking, SAST), pre-commit hooks, container scanning with Trivy, SPDX SBOMs, Cosign container signing, and GitHub Actions build provenance attestation. OWASP-aligned requirements cover CSRF, SQL injection, XSS, input validation, and authentication. Documented in the Change Management Policy.',
        },
        {
          id: 'AIS-03.1',
          question:
            'Are technical and operational metrics defined and implemented according to business objectives and security requirements?',
          answer: 'yes',
          explanation:
            'API metrics (response time percentiles, error rates) collected via Redis-backed middleware. Health monitoring tracks scanner success/failure rates, Celery queue depths, database latency, and Redis hit rates. Security metrics include brute force attempts, credential stuffing detection rates, and alert counts.',
        },
        {
          id: 'AIS-04.1',
          question:
            'Is an SDLC process defined and implemented for application design, development, deployment, and operation?',
          answer: 'yes',
          explanation:
            'Change Management & Secure Development Lifecycle Policy (FIMIL-CHG-001) documents the full SDLC with change classification, CI pipeline gates, container scanning, Helm atomic deployments with rollback, and feature flag staged rollout.',
        },
        {
          id: 'AIS-05.1',
          question:
            'Does the testing strategy outline criteria to accept new systems, upgrades, and versions?',
          answer: 'yes',
          explanation:
            'CI pipeline enforces acceptance criteria: linting, unit tests, type checking, build verification, and Trivy container scanning that blocks deployment on critical vulnerabilities. Frontend coverage thresholds enforced at 80%.',
        },
        {
          id: 'AIS-05.2',
          question: 'Is testing automated when applicable and possible?',
          answer: 'yes',
          explanation:
            'Automated testing is extensive: backend pytest suite, frontend Vitest with MSW mocks, pre-commit hooks, CI pipeline on every push/PR, Trivy image scanning in deployment pipeline, and security-specific tests in api/tests/security/.',
        },
        {
          id: 'AIS-06.1',
          question:
            'Are strategies and capabilities established and implemented to deploy application code securely?',
          answer: 'yes',
          explanation:
            'Helm atomic deployments with automatic rollback on failure. Container images signed with Cosign (keyless via Sigstore) with SPDX SBOMs and GitHub Actions build provenance attestation. Sealed secrets for credential management. Branch protection enforces GPG-signed commits. Manual workflow_dispatch provides human gate for deployment. Database migrations run as separate job before Helm upgrade.',
        },
        {
          id: 'AIS-06.2',
          question:
            'Is the deployment and integration of application code automated where possible?',
          answer: 'yes',
          explanation:
            'GitHub Actions CI/CD pipeline automates build, test, container scanning, and deployment. Helm manages Kubernetes deployments. Feature flags enable staged rollout with rollout percentages.',
        },
        {
          id: 'AIS-07.1',
          question:
            'Are application security vulnerabilities remediated following defined processes?',
          answer: 'yes',
          explanation:
            'Trivy scanning in CI/CD blocks critical vulnerabilities from deployment. The platform itself orchestrates 12 security scanners for vulnerability detection. Risk Assessment documents treatment plans for identified vulnerabilities with timelines.',
        },
        {
          id: 'AIS-07.2',
          question:
            'Is the remediation of application security vulnerabilities automated when possible?',
          answer: 'yes',
          explanation:
            'Trivy blocks critical container vulnerabilities automatically. Semgrep provides autofix suggestions. Dependabot is configured across all repositories for automated dependency updates. Container images include SPDX SBOMs and are signed with Cosign via Sigstore for supply chain integrity. DAST is not yet implemented but is not required for a "yes" on automated remediation where possible.',
        },
      ],
    },

    // =========================================================================
    // BCR — Business Continuity Management & Operational Resilience (18 questions)
    // =========================================================================
    {
      name: 'BCR — Business Continuity Management & Operational Resilience',
      questions: [
        {
          id: 'BCR-01.1',
          question:
            'Are business continuity management and operational resilience policies and procedures established, documented, approved, communicated, applied, evaluated, and maintained?',
          answer: 'yes',
          explanation:
            'Business Continuity Plan (FIMIL-BCP-001) documents RTO of 4 hours and RPO of 24 hours, six disaster scenarios with recovery procedures, and maintenance mode middleware for planned disruptions.',
        },
        {
          id: 'BCR-01.2',
          question: 'Are the policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the Business Continuity Plan. Policies are version-controlled in Git.',
        },
        {
          id: 'BCR-02.1',
          question:
            'Are criteria for developing business continuity strategies established based on business disruption and risk impacts?',
          answer: 'yes',
          explanation:
            'Risk Assessment (FIMIL-RISK-001) identifies business disruption risks including platform unavailability, vendor dependency, and DDoS using a 5x5 likelihood-impact matrix. BCP strategies are aligned to these risk assessments.',
        },
        {
          id: 'BCR-03.1',
          question:
            'Are strategies developed to reduce impact of, withstand, and recover from business disruptions?',
          answer: 'yes',
          explanation:
            'BCP documents six disaster scenarios with specific recovery procedures. Technical resilience includes HPA autoscaling, circuit breakers, retry logic, Pod Disruption Budgets, rolling updates, and Helm atomic deployments with automatic rollback.',
        },
        {
          id: 'BCR-04.1',
          question:
            'Are operational resilience strategies incorporated to establish, document, approve, communicate a business continuity plan?',
          answer: 'yes',
          explanation:
            'Business Continuity Plan (FIMIL-BCP-001) is formally documented and approved by CEO & CISO. It incorporates resilience strategies including maintenance mode, graceful degradation, and automated rollback.',
        },
        {
          id: 'BCR-05.1',
          question:
            'Is relevant documentation developed, identified, and acquired to support business continuity plans?',
          answer: 'yes',
          explanation:
            'Comprehensive operational documentation exists: backup/restore procedures, monitoring guide, upgrade guide, security hardening guide, and incident response runbook. All stored in docs/operations/ and version-controlled.',
        },
        {
          id: 'BCR-05.2',
          question:
            'Is business continuity and operational resilience documentation available to authorized stakeholders?',
          answer: 'yes',
          explanation:
            'All documentation is stored in version-controlled repositories accessible to authorized personnel. Operational procedures are documented in docs/operations/ and CLAUDE.md.',
        },
        {
          id: 'BCR-05.3',
          question:
            'Is business continuity and operational resilience documentation reviewed periodically?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence. Documentation is version-controlled in Git with change history. Risk Assessment is scheduled for annual review.',
        },
        {
          id: 'BCR-06.1',
          question:
            'Are the business continuity and operational resilience plans exercised and tested at least annually?',
          answer: 'yes',
          explanation:
            'DR test successfully conducted in March 2026 with verified backup restore. Helm atomic deployments with automatic rollback are tested operationally during every deployment. Semi-annual DR testing cadence established.',
        },
        {
          id: 'BCR-07.1',
          question:
            'Do business continuity and resilience procedures establish communication with stakeholders and participants?',
          answer: 'yes',
          explanation:
            'Incident Response Plan defines communication procedures during disruptions. Maintenance mode middleware returns 503 with Retry-After header. Announcement system enables system-wide communications. Email and Slack notifications alert stakeholders.',
        },
        {
          id: 'BCR-08.1',
          question: 'Is cloud data periodically backed up?',
          answer: 'yes',
          explanation:
            'Nightly PostgreSQL and Redis backups to S3 via comprehensive backup scripts supporting both Docker Compose and Kubernetes deployments. Metadata tracking includes timestamp, deployment type, and version.',
        },
        {
          id: 'BCR-08.2',
          question: 'Is the confidentiality, integrity, and availability of backup data ensured?',
          answer: 'yes',
          explanation:
            'Backups are compressed with gzip, uploaded to S3 for offsite storage, and include metadata tracking. Restore scripts include verification steps. Access to backup storage is restricted.',
        },
        {
          id: 'BCR-08.3',
          question: 'Can backups be restored appropriately for resiliency?',
          answer: 'yes',
          explanation:
            'Restore scripts exist with verification, service stop/restart, and migration execution. Documentation provided in docs/operations/backup-restore.md. DR test in March 2026 successfully validated backup restore procedures.',
        },
        {
          id: 'BCR-09.1',
          question:
            'Is a disaster response plan established, documented, approved, applied, evaluated, and maintained?',
          answer: 'yes',
          explanation:
            'Business Continuity Plan (FIMIL-BCP-001) documents six disaster scenarios with specific recovery procedures, RTO of 4 hours, and RPO of 24 hours. Approved by CEO & CISO.',
        },
        {
          id: 'BCR-09.2',
          question:
            'Is the disaster response plan updated at least annually, and when significant changes occur?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all compliance documentation. BCP is version-controlled and updated as infrastructure changes occur.',
        },
        {
          id: 'BCR-10.1',
          question:
            'Is the disaster response plan exercised annually or when significant changes occur?',
          answer: 'yes',
          explanation:
            'DR test successfully conducted in March 2026 with verified backup restore and recovery procedures. Helm rollback capabilities are tested operationally during every deployment. Semi-annual DR testing cadence established.',
        },
        {
          id: 'BCR-10.2',
          question: 'Are local emergency authorities included, if possible, in the exercise?',
          answer: 'na',
          explanation:
            'Cloud-hosted on DigitalOcean. No physical facilities requiring coordination with local emergency authorities.',
        },
        {
          id: 'BCR-11.1',
          question:
            'Is business-critical equipment supplemented with redundant equipment independently located?',
          answer: 'partial',
          explanation:
            'Multiple replicas via HPA with Pod Disruption Budgets and anti-affinity for zone spreading. However, deployment is single-region only with no multi-region failover, no Redis HA, and single primary PostgreSQL relying on DigitalOcean managed database failover.',
        },
      ],
    },

    // =========================================================================
    // CCC — Change Control & Configuration Management (11 questions)
    // =========================================================================
    {
      name: 'CCC — Change Control & Configuration Management',
      questions: [
        {
          id: 'CCC-01.1',
          question:
            'Are risk management policies and procedures associated with changing organizational assets established, documented, approved, communicated, applied, evaluated and maintained?',
          answer: 'yes',
          explanation:
            'Change Management Policy (FIMIL-CHG-001) documents change classification (Standard, Normal, Emergency), approval workflows, and risk assessment criteria. Risk Assessment (FIMIL-RISK-001) provides the risk framework.',
        },
        {
          id: 'CCC-01.2',
          question: 'Are the policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the Change Management Policy. Policies are version-controlled in Git.',
        },
        {
          id: 'CCC-02.1',
          question: 'Is a defined quality change control, approval and testing process followed?',
          answer: 'yes',
          explanation:
            'CI pipeline gates on linting, tests, type checking, and container scanning. Branch protection enforces GPG-signed commits, CI checks required, and enforce admins. Manual workflow_dispatch provides human gate for deployment. Helm atomic deployments with automatic rollback. CODEOWNERS file governs code change approval.',
        },
        {
          id: 'CCC-03.1',
          question: 'Are risks associated with changing organizational assets managed?',
          answer: 'yes',
          explanation:
            'Change Management Policy defines risk assessment criteria by change type. Helm atomic deployments auto-rollback failed changes. Feature flags enable staged rollout to limit blast radius. Database migrations run as a separate job before Helm upgrade.',
        },
        {
          id: 'CCC-04.1',
          question:
            'Is the unauthorized addition, removal, update, and management of organization assets restricted?',
          answer: 'yes',
          explanation:
            'Branch protection enforces GPG-signed commits, required CI checks, and enforce admins. Sealed secrets encrypt production credentials. Deployment only via Helm with version-tagged, Cosign-signed images. CODEOWNERS restricts code changes. Falco runtime monitoring detects unexpected binary execution, filesystem writes, and container image drift.',
        },
        {
          id: 'CCC-05.1',
          question:
            'Are provisions to limit changes that directly impact CSC-owned environments included within service level agreements?',
          answer: 'yes',
          explanation:
            'SLA published at /legal/sla. Maintenance windows communicated via the announcement system. Maintenance mode middleware blocks non-admin traffic with Retry-After header during planned changes.',
        },
        {
          id: 'CCC-06.1',
          question:
            'Are change management baselines established for all relevant authorized changes?',
          answer: 'yes',
          explanation:
            'Helm values files provide declarative configuration baselines. Pod annotations with config/secret checksums detect configuration drift. Falco image drift detection CronJob compares running images against expected tags every 30 minutes.',
        },
        {
          id: 'CCC-07.1',
          question:
            'Are detection measures implemented with proactive notification if changes deviate from established baselines?',
          answer: 'yes',
          explanation:
            'Falco runtime monitoring detects unauthorized changes: unexpected processes, filesystem writes, network violations, privilege escalation, config file modifications (FIM), and image drift. Alerts surface to admin dashboard.',
        },
        {
          id: 'CCC-08.1',
          question:
            'Is a procedure implemented to manage exceptions, including emergencies, in the change and configuration process?',
          answer: 'yes',
          explanation:
            'Change Management Policy defines Emergency change type with expedited approval and post-implementation review. Helm rollback provides rapid reversion. Maintenance mode enables emergency operational changes.',
        },
        {
          id: 'CCC-08.2',
          question:
            'Is the procedure aligned with the requirements of the GRC-04 policy exception process?',
          answer: 'yes',
          explanation:
            'ISMS Policy establishes a formal policy exception process. Emergency changes in the Change Management Policy follow the same documented exception and approval framework.',
        },
        {
          id: 'CCC-09.1',
          question:
            'Is a process to proactively roll back changes to a previously known good state defined and implemented?',
          answer: 'yes',
          explanation:
            'Helm atomic deployments (--atomic --wait) automatically roll back on failure. Manual rollback via helm rollback command. Database migration rollback scripts available. Version-tagged container images allow pinning to known-good versions.',
        },
      ],
    },

    // =========================================================================
    // CEK — Cryptography, Encryption & Key Management (21 questions)
    // =========================================================================
    {
      name: 'CEK — Cryptography, Encryption & Key Management',
      questions: [
        {
          id: 'CEK-01.1',
          question:
            'Are cryptography, encryption, and key management policies and procedures established, documented, approved, communicated, applied, evaluated, and maintained?',
          answer: 'yes',
          explanation:
            'ISMS Policy and Access Control Policy (FIMIL-ACP-001) document cryptographic requirements. MultiFernet (AES-128-CBC + HMAC-SHA256) with versioned key rotation for encryption at rest, Argon2id (memory-hard) for password hashing, SHA256 for token hashing, HMAC-SHA256 for webhook verification, and HS256 for JWT signing.',
        },
        {
          id: 'CEK-01.2',
          question:
            'Are cryptography, encryption, and key management policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Cryptographic controls are documented in the compliance policy suite and version-controlled.',
        },
        {
          id: 'CEK-02.1',
          question:
            'Are cryptography, encryption, and key management roles and responsibilities defined and implemented?',
          answer: 'partial',
          explanation:
            'ISMS Policy designates CEO & CISO with security responsibilities including key management. However, sole founder currently holds all key management authority with no separation of duties for cryptographic operations.',
        },
        {
          id: 'CEK-03.1',
          question:
            'Are data at-rest and in-transit cryptographically protected using certified cryptographic libraries?',
          answer: 'yes',
          explanation:
            'Data at rest: MultiFernet encryption (AES-128-CBC + HMAC-SHA256) with versioned key rotation for OAuth tokens, Argon2id (memory-hard) for passwords, SHA256 for API tokens. Data in transit: TLS enforced in production, SMTP supports STARTTLS/SSL, session cookies use Secure flag. All use standard certified Python cryptographic libraries (cryptography, pwdlib).',
        },
        {
          id: 'CEK-04.1',
          question: 'Are appropriate data protection encryption algorithms used?',
          answer: 'yes',
          explanation:
            'Industry-standard algorithms: AES-128-CBC + HMAC-SHA256 (MultiFernet) for symmetric encryption with versioned key rotation, Argon2id (memory-hard, OWASP-recommended) for password hashing, SHA256 for token hashing, HMAC-SHA256 for webhook verification, HS256 for JWT signing, secrets.token_urlsafe for random token generation.',
        },
        {
          id: 'CEK-05.1',
          question:
            'Are standard change management procedures established to review, approve, implement cryptography changes?',
          answer: 'yes',
          explanation:
            'Change Management Policy governs all infrastructure and software changes, including cryptographic configurations. Production enforcement requires non-default SECRET_KEY. CI pipeline gates prevent unauthorized changes.',
        },
        {
          id: 'CEK-06.1',
          question:
            'Are changes to cryptography systems managed accounting for downstream effects?',
          answer: 'yes',
          explanation:
            'MultiFernet versioned encryption keys enable seamless key rotation without data loss. Re-encryption tooling migrates all encrypted data from old keys to the current key. Downstream effects are fully managed — new data uses the latest key while old data remains decryptable via the key chain.',
        },
        {
          id: 'CEK-07.1',
          question:
            'Is a cryptography, encryption, and key management risk program established and maintained?',
          answer: 'yes',
          explanation:
            'Risk Assessment identifies cryptographic risks with treatment plans. MultiFernet versioned key rotation with re-encryption tooling addresses the previously identified key rotation gap. STRIDE threat model covers cryptographic threats. Continuous monitoring plan (FIMIL-CONMON-001) includes cryptographic controls. HSM/KMS integration remains a future enhancement for FIPS 140-2 compliance.',
        },
        {
          id: 'CEK-08.1',
          question:
            'Are CSPs providing CSCs with the capacity to manage their own data encryption keys?',
          answer: 'no',
          explanation:
            'Fimil does not currently offer customer-managed encryption keys (CMEK/BYOK). Encryption keys are managed by the platform using MultiFernet with server-side versioned keys.',
        },
        {
          id: 'CEK-09.1',
          question:
            'Are encryption and key management systems audited with frequency proportional to risk exposure?',
          answer: 'partial',
          explanation:
            'Internal compliance assessment reviewed cryptographic controls. No independent external audit of encryption and key management systems has been conducted.',
        },
        {
          id: 'CEK-09.2',
          question:
            'Are encryption and key management systems audited preferably continuously but at least annually?',
          answer: 'partial',
          explanation:
            'Internal review has been conducted. CI pipeline validates cryptographic configurations in production (non-default SECRET_KEY required). However, no recurring formal audit schedule is in place.',
        },
        {
          id: 'CEK-10.1',
          question: 'Are cryptographic keys generated using approved cryptographic libraries?',
          answer: 'yes',
          explanation:
            "Keys and tokens are generated using Python's secrets module (secrets.token_urlsafe) and the cryptography library (Fernet). These are industry-standard, certified cryptographic libraries.",
        },
        {
          id: 'CEK-11.1',
          question:
            'Are private keys provisioned for a unique purpose managed, and is cryptography secret?',
          answer: 'yes',
          explanation:
            'MultiFernet versioned encryption keys managed for data encryption. Separate JWT signing key. API tokens use separate SHA256 hashing. Session IDs use independent secrets.token_urlsafe generation. Sealed secrets encrypt credentials in Kubernetes. Container images signed with Cosign via Sigstore.',
        },
        {
          id: 'CEK-12.1',
          question: 'Are cryptographic keys rotated based on a cryptoperiod calculated?',
          answer: 'partial',
          explanation:
            'MultiFernet versioned encryption keys support key rotation with re-encryption tooling. Keys can be rotated without data loss. However, no formal cryptoperiod is defined and rotation is performed manually rather than on an automated schedule tied to a calculated cryptoperiod.',
        },
        {
          id: 'CEK-13.1',
          question: 'Are cryptographic keys revoked and removed before the end of cryptoperiod?',
          answer: 'partial',
          explanation:
            'MultiFernet key rotation allows old keys to be superseded by new keys, and re-encryption tooling can migrate all data to the current key, after which old keys can be removed. However, no formal cryptoperiods are defined and no automated key revocation schedule is implemented.',
        },
        {
          id: 'CEK-14.1',
          question:
            'Are processes, procedures and technical measures to destroy unneeded keys defined?',
          answer: 'no',
          explanation:
            'No formal key destruction process is defined. Key management lifecycle tooling is an identified gap targeted for remediation with KMS integration.',
        },
        {
          id: 'CEK-15.1',
          question:
            'Are processes, procedures, and technical measures to create keys in pre-activated state defined?',
          answer: 'no',
          explanation:
            'No key pre-activation state management exists. Key lifecycle management is an identified gap targeted for remediation with KMS integration.',
        },
        {
          id: 'CEK-16.1',
          question:
            'Are processes, procedures, and technical measures to monitor key transitions defined?',
          answer: 'no',
          explanation:
            'No key transition monitoring exists. Key lifecycle management is an identified gap targeted for remediation with KMS integration.',
        },
        {
          id: 'CEK-17.1',
          question: 'Are processes, procedures, and technical measures to deactivate keys defined?',
          answer: 'no',
          explanation:
            'No key deactivation process is defined. Key lifecycle management is an identified gap targeted for remediation with KMS integration.',
        },
        {
          id: 'CEK-18.1',
          question:
            'Are processes, procedures, and technical measures to manage archived keys defined?',
          answer: 'no',
          explanation:
            'No key archival process is defined. Key lifecycle management is an identified gap targeted for remediation with KMS integration.',
        },
        {
          id: 'CEK-19.1',
          question:
            'Are processes, procedures, and technical measures to encrypt information in specific scenarios defined?',
          answer: 'yes',
          explanation:
            'Data Governance Policy classifies data into four levels with encryption requirements per level. Restricted data (OAuth tokens, API credentials) uses MultiFernet encryption with versioned key rotation. TLS enforced for all data in transit. Session cookies use Secure flag.',
        },
        {
          id: 'CEK-20.1',
          question:
            'Are processes, procedures, and technical measures to assess operational continuity risks defined?',
          answer: 'yes',
          explanation:
            'MultiFernet versioned key rotation with re-encryption tooling eliminates the previously identified operational continuity risk of key changes breaking encrypted data. Risk Assessment documents cryptographic risks with treatment plans. Business Continuity Plan addresses recovery scenarios including data recovery. DR test in March 2026 validated recovery procedures.',
        },
        {
          id: 'CEK-21.1',
          question:
            'Are key management system processes to track and report all cryptographic materials defined?',
          answer: 'no',
          explanation:
            'No centralized key management system or cryptographic material inventory exists. Cryptographic materials are managed at the application level without formal tracking or reporting.',
        },
      ],
    },

    // =========================================================================
    // DCS — Datacenter Security (23 questions)
    // =========================================================================
    {
      name: 'DCS — Datacenter Security',
      questions: [
        {
          id: 'DCS-01.1',
          question:
            'Are policies and procedures for the secure disposal of equipment used outside premises established?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical equipment disposal is the cloud provider's responsibility under the shared responsibility model.",
        },
        {
          id: 'DCS-01.2',
          question:
            'Is a data destruction procedure applied that renders information recovery impossible?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical data destruction for hardware is the cloud provider's responsibility. Logical data disposal is handled at the application level.",
        },
        {
          id: 'DCS-01.3',
          question:
            'Are policies and procedures for secure equipment disposal reviewed and updated at least annually?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical equipment disposal policies are the cloud provider's responsibility.",
        },
        {
          id: 'DCS-02.1',
          question:
            'Are policies and procedures for relocation or transfer of hardware, software, or data established?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical hardware relocation is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-02.2',
          question:
            'Does a relocation or transfer request require written or cryptographically verifiable authorization?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical hardware transfer authorization is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-02.3',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical transfer policies are the cloud provider's responsibility.",
        },
        {
          id: 'DCS-03.1',
          question:
            'Are policies and procedures for maintaining safe and secure working environments established?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical datacenter working environment safety is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-03.2',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical working environment policies are the cloud provider's responsibility.",
        },
        {
          id: 'DCS-04.1',
          question:
            'Are policies and procedures for secure transportation of physical media established?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical media transportation is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-04.2',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical media transportation policies are the cloud provider's responsibility.",
        },
        {
          id: 'DCS-05.1',
          question:
            'Is the classification and documentation of physical and logical assets based on business risk?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical asset classification in datacenters is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-06.1',
          question: 'Are all relevant physical and logical assets cataloged and tracked?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical datacenter asset tracking is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-07.1',
          question: 'Are physical security perimeters implemented to safeguard personnel, data?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical security perimeters are the cloud provider's responsibility.",
        },
        {
          id: 'DCS-07.2',
          question:
            'Are physical security perimeters established between administrative areas and data storage?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical security perimeter segregation is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-08.1',
          question: 'Is equipment identification used as a method for connection authentication?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical equipment identification for datacenter connections is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-09.1',
          question: 'Are solely authorized personnel able to access secure areas?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical access control to secure datacenter areas is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-09.2',
          question: 'Are access control records retained periodically?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical access control record retention is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-10.1',
          question: 'Are datacenter surveillance systems implemented at ingress and egress points?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Datacenter surveillance is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-11.1',
          question: 'Are datacenter personnel trained to respond to unauthorized access?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Datacenter personnel training is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-12.1',
          question:
            'Are processes defined to ensure risk-based protection of power and telecommunication cables?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical cable protection is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-13.1',
          question:
            'Are data center environmental control systems designed to monitor temperature and humidity?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Environmental monitoring in the datacenter is the cloud provider's responsibility.",
        },
        {
          id: 'DCS-14.1',
          question: 'Are utility services secured, monitored, maintained, and tested?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Datacenter utility services are the cloud provider's responsibility.",
        },
        {
          id: 'DCS-15.1',
          question:
            'Is business-critical equipment segregated from high-probability environmental risk locations?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical equipment siting and environmental risk segregation are the cloud provider's responsibility.",
        },
      ],
    },

    // =========================================================================
    // DSP — Data Security & Privacy Lifecycle Management (24 questions)
    // =========================================================================
    {
      name: 'DSP — Data Security & Privacy Lifecycle Management',
      questions: [
        {
          id: 'DSP-01.1',
          question:
            'Are policies and procedures established for classification, protection, and handling of data throughout lifecycle?',
          answer: 'yes',
          explanation:
            'Data Governance Policy (FIMIL-DGP-001) establishes a four-level classification scheme (Public, Internal, Confidential, Restricted) with handling requirements for storage, transmission, access, and disposal at each level.',
        },
        {
          id: 'DSP-01.2',
          question:
            'Are data security and privacy policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the Data Governance Policy. Policies are version-controlled in Git.',
        },
        {
          id: 'DSP-02.1',
          question: 'Are industry-accepted methods applied for secure data disposal?',
          answer: 'yes',
          explanation:
            'Data Governance Policy documents retention schedules and disposal procedures by classification level. Source code is ephemeral (clone-scan-delete). Sessions expire after 24 hours. OAuth state tokens have 10-minute TTL. API tokens stored as irreversible SHA256 hashes.',
        },
        {
          id: 'DSP-03.1',
          question:
            'Is a data inventory created and maintained for sensitive and personal information?',
          answer: 'yes',
          explanation:
            'Formal asset register (FIMIL-AM-001) with 26-row inventory cataloging all information assets including sensitive and personal data. Data Governance Policy classifies data types with four-level classification scheme. Privacy Policy documents collected personal information categories.',
        },
        {
          id: 'DSP-04.1',
          question: 'Is data classified according to type and sensitivity levels?',
          answer: 'yes',
          explanation:
            'Four-level classification: Public (marketing content), Internal (operational data), Confidential (user PII, scan results), Restricted (encryption keys, OAuth tokens, API credentials). Technical controls enforce classification at each level.',
        },
        {
          id: 'DSP-05.1',
          question:
            'Is data flow documentation created to identify what data is processed and where?',
          answer: 'yes',
          explanation:
            'Visual data flow diagram published on the trust center maps all data processing activities: data sources (customer repos, users, webhooks), processing (ephemeral scanners, task queue), storage (encrypted PostgreSQL, Redis), subprocessor flows (Stripe, Resend, PostHog), and backup/archive. Data Governance Policy documents data categories and handling.',
        },
        {
          id: 'DSP-05.2',
          question: 'Is data flow documentation reviewed at defined intervals, at least annually?',
          answer: 'partial',
          explanation:
            'ISMS Policy defines annual review cadence for all documentation. Data Governance Policy is version-controlled. However, formal data flow documentation is not yet comprehensive enough for a meaningful annual review.',
        },
        {
          id: 'DSP-06.1',
          question:
            'Is the ownership and stewardship of all relevant personal and sensitive data documented?',
          answer: 'partial',
          explanation:
            'Data Governance Policy defines data categories with handling requirements. ISMS Policy designates CEO & CISO with data governance responsibilities. However, no individual data asset ownership register exists.',
        },
        {
          id: 'DSP-06.2',
          question: 'Is data ownership and stewardship documentation reviewed at least annually?',
          answer: 'partial',
          explanation:
            'ISMS Policy defines annual review cadence. Data Governance Policy is reviewed as part of the policy suite. However, formal data ownership documentation is not yet comprehensive.',
        },
        {
          id: 'DSP-07.1',
          question:
            'Are systems, products, and business practices based on security principles by design?',
          answer: 'yes',
          explanation:
            'Defense-in-depth architecture with security at every layer: network isolation, container hardening (non-root, read-only, cap_drop ALL), RBAC, tenant isolation, CSRF protection, rate limiting, input validation, encrypted fields, and ephemeral source code processing.',
        },
        {
          id: 'DSP-08.1',
          question:
            'Are systems, products, and business practices based on privacy principles by design?',
          answer: 'yes',
          explanation:
            'Source code is ephemeral (clone-scan-delete, never persisted). Data minimization in user model. Cookie consent with accept/reject/customize options. Do Not Track signal respected. PostHog analytics blocked until consent granted.',
        },
        {
          id: 'DSP-08.2',
          question: "Are systems' privacy settings configured by default?",
          answer: 'yes',
          explanation:
            'Privacy-protective defaults: analytics blocked until explicit consent, Do Not Track respected as automatic opt-out, minimal data collection, and ephemeral source code processing by default.',
        },
        {
          id: 'DSP-09.1',
          question:
            'Is a data protection impact assessment conducted when processing personal data?',
          answer: 'yes',
          explanation:
            'Formal DPIA process established with standardized template and DPIA register. Data Governance Policy documents GDPR obligations including DPIA requirements. Risk Assessment evaluates data protection risks. DPIAs are conducted for personal data processing activities as required by GDPR Article 35.',
        },
        {
          id: 'DSP-10.1',
          question:
            'Are processes defined to ensure any transfer of personal or sensitive data is protected?',
          answer: 'yes',
          explanation:
            'TLS enforced in production. Webhook signatures verified with HMAC-SHA256. SMTP supports STARTTLS/SSL. Session cookies use Secure, HttpOnly, SameSite flags. Data Processing Agreement published at /legal/dpa. Vendor DPAs executed with all providers.',
        },
        {
          id: 'DSP-11.1',
          question:
            'Are processes defined to enable data subjects to request access, modify, or delete personal data?',
          answer: 'yes',
          explanation:
            'Admin API implements DSAR automation: data export endpoint for Article 15 (right of access) and data erasure endpoint for Article 17 (right to erasure). Privacy Policy and Data Governance Policy document GDPR/CCPA data subject rights. Compliance Register tracks DSAR obligations.',
        },
        {
          id: 'DSP-12.1',
          question:
            'Are processes defined to ensure personal data is processed for declared purposes?',
          answer: 'yes',
          explanation:
            'Privacy Policy declares data processing purposes. Cookie consent mechanism restricts analytics until consent. Data Governance Policy defines purpose limitations for each data category. Data minimization principle applied.',
        },
        {
          id: 'DSP-13.1',
          question: 'Are processes defined for transfer and sub-processing of personal data?',
          answer: 'yes',
          explanation:
            'Data Processing Agreement at /legal/dpa governs customer data processing. Vendor Risk Management Policy tracks all sub-processors. DPAs executed with all critical and significant vendors (DigitalOcean, GitHub, Stripe, Cloudflare, Resend, PostHog).',
        },
        {
          id: 'DSP-14.1',
          question:
            'Are processes defined to disclose details of personal data access by sub-processors?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy documents all sub-processors with tier classification. Privacy Policy discloses third-party data sharing. DPA provides transparency on sub-processor access to customer data.',
        },
        {
          id: 'DSP-15.1',
          question:
            'Is authorization from data owners obtained before replicating production data?',
          answer: 'yes',
          explanation:
            'Tests use synthetic fixtures (in-memory SQLite, no production data). Source code is ephemeral and never replicated. Backups are stored in access-controlled S3 storage. No production data replication for non-production purposes.',
        },
        {
          id: 'DSP-16.1',
          question:
            'Do data retention, archiving, and deletion practices follow business requirements and regulations?',
          answer: 'yes',
          explanation:
            'Data Governance Policy documents retention schedules for all data categories. Report retention configurable at 30 days. Sessions expire after 24 hours. Source code is immediately deleted after scanning. Compliance Register tracks GDPR and CCPA retention obligations.',
        },
        {
          id: 'DSP-17.1',
          question:
            'Are processes defined and implemented to protect sensitive data throughout lifecycle?',
          answer: 'yes',
          explanation:
            'Sensitive data protection at every stage: MultiFernet encryption with versioned key rotation for Restricted data at rest, Argon2id for password hashing, TLS for data in transit, RBAC and tenant isolation for access control, SHA256 hashing for tokens, secret redaction in scanner findings, and ephemeral source code processing.',
        },
        {
          id: 'DSP-18.1',
          question:
            'Does the CSP have procedures to manage and respond to law enforcement data disclosure requests?',
          answer: 'yes',
          explanation:
            'Incident Response Plan includes regulatory notification procedures. Compliance Register tracks legal obligations. Privacy Policy addresses law enforcement requests. Data Governance Policy documents disclosure procedures.',
        },
        {
          id: 'DSP-18.2',
          question:
            'Does the CSP give special attention to notification procedures to interested CSCs?',
          answer: 'yes',
          explanation:
            'Incident Response Plan defines customer notification procedures for data breaches with GDPR 72-hour and CCPA timelines. Announcement system enables system-wide customer notifications.',
        },
        {
          id: 'DSP-19.1',
          question: 'Are processes defined to specify and document physical data locations?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy documents DigitalOcean as the infrastructure provider. Data Processing Agreement specifies data processing locations. Infrastructure is deployed on DigitalOcean Kubernetes in documented regions.',
        },
      ],
    },

    // =========================================================================
    // GRC — Governance, Risk Management & Compliance (9 questions)
    // =========================================================================
    {
      name: 'GRC — Governance, Risk Management & Compliance',
      questions: [
        {
          id: 'GRC-01.1',
          question:
            'Are information governance program policies and procedures established, documented, approved?',
          answer: 'yes',
          explanation:
            'Comprehensive policy suite: ISMS Policy, Access Control Policy, Data Governance Policy, Incident Response Plan, Change Management Policy, People Security Policy, and Vendor Risk Management Policy. All formally approved by CEO & CISO.',
        },
        {
          id: 'GRC-01.2',
          question: 'Are the policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Policies are version-controlled in Git with change history and formal approval records.',
        },
        {
          id: 'GRC-02.1',
          question:
            'Is there an established formal, documented, leadership-sponsored enterprise risk management program?',
          answer: 'yes',
          explanation:
            'Risk Assessment (FIMIL-RISK-001) establishes a formal risk management program with a 5x5 likelihood-impact matrix, 15 identified risks, and treatment plans with timelines. Sponsored by CEO & CISO.',
        },
        {
          id: 'GRC-03.1',
          question:
            'Are all relevant organizational policies reviewed at least annually or when substantial changes occur?',
          answer: 'yes',
          explanation:
            'ISMS Policy mandates annual review of all policies. Change Management Policy triggers review when significant changes occur. All policies are version-controlled for traceability.',
        },
        {
          id: 'GRC-04.1',
          question:
            'Is an approved exception process established and followed whenever policy deviation occurs?',
          answer: 'yes',
          explanation:
            'ISMS Policy establishes a formal policy exception process. Change Management Policy defines Emergency change type with expedited approval and post-implementation review for exception handling.',
        },
        {
          id: 'GRC-05.1',
          question: 'Has an information security program been developed and implemented?',
          answer: 'yes',
          explanation:
            'ISMS Policy (FIMIL-ISMS-001) establishes the information security program. System Security Plan (FIMIL-SSP-001) maps to NIST 800-53 Low baseline. Continuous monitoring plan (FIMIL-CONMON-001) provides ongoing assurance. STRIDE threat model covers 3 areas with 16 identified threats. CSA STAR Level 1 self-assessment completed. Statement of Applicability maps all ISO 27001 controls.',
        },
        {
          id: 'GRC-06.1',
          question:
            'Are roles and responsibilities for planning, implementing, operating, assessing governance defined?',
          answer: 'partial',
          explanation:
            'ISMS Policy designates CEO & CISO roles. People Security Policy documents role-based security responsibilities. Application RBAC enforces authority levels. However, sole founder fills all roles; organizational governance structure to scale with team growth.',
        },
        {
          id: 'GRC-07.1',
          question:
            'Are all relevant standards, regulations, legal/contractual requirements identified and documented?',
          answer: 'yes',
          explanation:
            'Compliance & Legal Requirements Register (FIMIL-CLR-001) tracks GDPR, CCPA/CPRA, Delaware corporate law, Nevada business licensing, CAN-SPAM, and DMCA with compliance status and planned actions.',
        },
        {
          id: 'GRC-08.1',
          question:
            'Is contact established and maintained with cloud-related special interest groups?',
          answer: 'yes',
          explanation:
            'CSA STAR Level 1 self-assessment completed, establishing active engagement with the Cloud Security Alliance. Platform consumes EPSS data from FIRST.org. SECURITY.md provides external security reporting channel. Federal incident reporting includes CISA/CIRCIA contacts in the Incident Response Plan.',
        },
      ],
    },

    // =========================================================================
    // HRS — Human Resources (20 questions)
    // =========================================================================
    {
      name: 'HRS — Human Resources',
      questions: [
        {
          id: 'HRS-01.1',
          question:
            'Are background verification policies and procedures of all new employees established?',
          answer: 'partial',
          explanation:
            'People Security Policy (FIMIL-PPL-001) documents pre-employment screening requirements including background verification, reference checks, and identity verification. Currently sole founder; framework ready for implementation when hiring begins.',
        },
        {
          id: 'HRS-01.2',
          question:
            'Are background verification policies designed according to local laws and regulations?',
          answer: 'partial',
          explanation:
            'People Security Policy specifies that screening should be proportional to role sensitivity and compliant with applicable laws. Compliance Register tracks relevant regulations. However, policies not yet exercised in practice.',
        },
        {
          id: 'HRS-01.3',
          question: 'Are background verification policies reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the People Security Policy. Policies are version-controlled.',
        },
        {
          id: 'HRS-02.1',
          question:
            'Are policies and procedures for acceptable use of organizationally-owned assets established?',
          answer: 'yes',
          explanation:
            'Acceptable Use Policy published at /legal/acceptable-use. People Security Policy documents acceptable use requirements for personnel. Data Governance Policy defines rules for handling classified data.',
        },
        {
          id: 'HRS-02.2',
          question: 'Are the policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Policies are version-controlled in Git.',
        },
        {
          id: 'HRS-03.1',
          question:
            'Are policies and procedures requiring unattended workspaces to conceal confidential data established?',
          answer: 'partial',
          explanation:
            'People Security Policy documents clean desk policy and screen lock requirements (5-minute timeout). Currently sole founder implementing manually; no MDM enforcement to verify compliance.',
        },
        {
          id: 'HRS-03.2',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the People Security Policy.',
        },
        {
          id: 'HRS-04.1',
          question:
            'Are policies and procedures to protect information at remote sites established?',
          answer: 'partial',
          explanation:
            'People Security Policy documents remote working security requirements including endpoint encryption (BitLocker/LUKS), host firewall, and secure workspace requirements. Currently sole founder; policy framework ready for team scaling.',
        },
        {
          id: 'HRS-04.2',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Policies are version-controlled.',
        },
        {
          id: 'HRS-05.1',
          question:
            'Are return procedures of organizationally-owned assets by terminated employees established?',
          answer: 'partial',
          explanation:
            'People Security Policy includes offboarding checklists covering asset return, access revocation, and credential invalidation. Technical capabilities exist for token revocation and user deactivation. Not yet exercised (sole founder).',
        },
        {
          id: 'HRS-06.1',
          question:
            'Are procedures outlining roles and responsibilities concerning employment changes established?',
          answer: 'partial',
          explanation:
            'People Security Policy documents procedures for employment changes including role transitions, access modifications, and post-employment obligations. Currently sole founder; procedures documented for future team scaling.',
        },
        {
          id: 'HRS-07.1',
          question: 'Are employees required to sign an employment agreement before gaining access?',
          answer: 'partial',
          explanation:
            'People Security Policy defines security responsibilities for employment terms including acceptable use, data handling, and confidentiality obligations. Contractual templates prepared but not yet exercised (sole founder).',
        },
        {
          id: 'HRS-08.1',
          question:
            'Are provisions for adherence to information governance and security policies included in agreements?',
          answer: 'partial',
          explanation:
            'People Security Policy defines security responsibilities to be included in employment agreements. ISMS Policy establishes governance framework. Contractual provisions documented but sole founder; not yet executed with employees.',
        },
        {
          id: 'HRS-09.1',
          question:
            'Are employee roles and responsibilities relating to information assets documented?',
          answer: 'yes',
          explanation:
            'People Security Policy documents security responsibilities by role. ISMS Policy designates CEO & CISO responsibilities. Application RBAC hierarchy (Operator/Admin/Security/Developer/Viewer) defines information asset access levels.',
        },
        {
          id: 'HRS-10.1',
          question:
            'Are requirements for non-disclosure agreements identified, documented, and reviewed?',
          answer: 'partial',
          explanation:
            'People Security Policy defines NDA and confidentiality agreement requirements for employees, contractors, and third parties. Requirements documented but no signatories yet beyond the sole founder.',
        },
        {
          id: 'HRS-11.1',
          question: 'Is a security awareness training program for all employees established?',
          answer: 'partial',
          explanation:
            'People Security Policy documents security training requirements by role, including onboarding and annual refresher training. Currently sole founder with deep security domain expertise. Training program framework ready but no training materials or tracking system yet.',
        },
        {
          id: 'HRS-11.2',
          question: 'Are regular security awareness training updates provided?',
          answer: 'partial',
          explanation:
            'People Security Policy specifies annual refresher training requirements. Currently sole founder; training delivery and update program to be implemented as team grows.',
        },
        {
          id: 'HRS-12.1',
          question:
            'Are all employees with sensitive data access provided with appropriate training?',
          answer: 'partial',
          explanation:
            'People Security Policy documents role-specific technical training requirements for employees handling sensitive data. Currently sole founder with deep security expertise. Formal training to be delivered as team grows.',
        },
        {
          id: 'HRS-12.2',
          question: 'Are regular updates in procedures, processes, and policies provided?',
          answer: 'partial',
          explanation:
            'Policies are version-controlled in Git with change tracking. People Security Policy defines ongoing education expectations. Currently sole founder; formal update distribution to be implemented as team grows.',
        },
        {
          id: 'HRS-13.1',
          question:
            'Are employees notified of their roles and responsibilities to maintain compliance?',
          answer: 'partial',
          explanation:
            'People Security Policy and ISMS Policy define compliance responsibilities. Application RBAC enforces role-based access. Currently sole founder; formal compliance notification procedures to be exercised as team grows.',
        },
      ],
    },

    // =========================================================================
    // IAM — Identity & Access Management (21 questions)
    // =========================================================================
    {
      name: 'IAM — Identity & Access Management',
      questions: [
        {
          id: 'IAM-01.1',
          question: 'Are identity and access management policies and procedures established?',
          answer: 'yes',
          explanation:
            'Access Control Policy (FIMIL-ACP-001) documents IAM requirements. Multi-layer authentication (JWT, sessions, API tokens), 5-level RBAC, tenant isolation, IP blocklist/allowlist, and rate limiting are implemented.',
        },
        {
          id: 'IAM-01.2',
          question:
            'Are identity and access management policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the Access Control Policy. Policies are version-controlled.',
        },
        {
          id: 'IAM-02.1',
          question:
            'Are strong password policies and procedures established, documented, approved?',
          answer: 'yes',
          explanation:
            'Password policy enforces minimum 12 characters with lowercase, uppercase, digit, and special character requirements. Argon2id memory-hard hashing (OWASP-recommended) via pwdlib. Account lockout after 5 failed attempts. Auto IP blocking after 20 failed attempts in 1 hour.',
        },
        {
          id: 'IAM-02.2',
          question:
            'Are strong password policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all security policies. Password requirements are enforced in code and documented in the Access Control Policy.',
        },
        {
          id: 'IAM-03.1',
          question:
            'Is system identity information and levels of access managed, stored, and reviewed?',
          answer: 'yes',
          explanation:
            'UUID-based user identity with email verification. User model tracks is_active, email_verified, role. API token audit service provides platform-wide token visibility. Comprehensive audit logging tracks all access-related events.',
        },
        {
          id: 'IAM-04.1',
          question:
            'Is the separation of duties principle employed when implementing information system access?',
          answer: 'partial',
          explanation:
            '5-level RBAC hierarchy enforces technical separation of duties. Scan execution is isolated from findings triage. Impersonation restricted to Operator role only. However, sole founder currently holds all authority, so organizational separation of duties is not operating in practice.',
        },
        {
          id: 'IAM-05.1',
          question:
            'Is the least privilege principle employed when implementing information system access?',
          answer: 'yes',
          explanation:
            'Role-based dependencies enforce least privilege at every endpoint. Subscription plan-based feature gating. API token scoping limits programmatic access. Scanner containers run with --cap-drop ALL. Kubernetes pods run non-root with read-only filesystem.',
        },
        {
          id: 'IAM-06.1',
          question: 'Is a user access provisioning process defined and implemented?',
          answer: 'yes',
          explanation:
            'Email verification required for SaaS registration (SHA256-hashed tokens, 24-hour expiry, one-time use). Admin approval required for role elevation. OAuth2/OIDC federation for GitHub and generic OIDC providers. 4-step onboarding wizard for new users.',
        },
        {
          id: 'IAM-07.1',
          question: 'Is a process in place to de-provision or modify access of movers/leavers?',
          answer: 'yes',
          explanation:
            'User deactivation sets is_active=False blocking all authentication. Session invalidation on password changes. Bulk token revocation available. People Security Policy documents offboarding with access revocation, asset return, and credential invalidation.',
        },
        {
          id: 'IAM-08.1',
          question:
            'Are reviews and revalidation of user access completed with commensurate frequency?',
          answer: 'yes',
          explanation:
            'Automated quarterly access reviews via Fimil-Ops endpoints. API token audit service enables platform-wide token visibility and analytics. Admin endpoints provide user management capabilities for access revalidation.',
        },
        {
          id: 'IAM-09.1',
          question:
            'Are processes for segregation of privileged access roles defined, implemented?',
          answer: 'yes',
          explanation:
            'Operator role is the highest privilege level (100). Impersonation limited to Operator role only with audit trail and 1-hour session cap. Operators cannot impersonate other Operators or Admins. Different RBAC dependencies enforce endpoint-level access control.',
        },
        {
          id: 'IAM-10.1',
          question:
            'Is an access process defined to ensure privileged access roles are granted for limited period?',
          answer: 'yes',
          explanation:
            'JWT tokens have 30-minute expiry. Sessions expire after 24 hours. Impersonation has 1-hour session cap. OAuth state tokens have 10-minute TTL. API tokens can be revoked at any time.',
        },
        {
          id: 'IAM-10.2',
          question:
            'Are procedures implemented to prevent culmination of segregated privileged access?',
          answer: 'partial',
          explanation:
            'RBAC prevents role escalation beyond assigned level. Impersonation audit trail tracks all privilege usage. Operators cannot impersonate other Operators. However, sole founder inherently holds all privilege levels.',
        },
        {
          id: 'IAM-11.1',
          question:
            'Are processes for customers to participate in granting high-risk privileged access defined?',
          answer: 'partial',
          explanation:
            'Tenant-scoped RBAC allows customers to manage their own user roles within their tenant. Subscription plan gating restricts feature access. However, no formal customer approval workflow exists for Fimil-side privileged operations on customer data.',
        },
        {
          id: 'IAM-12.1',
          question: 'Are processes to ensure logging infrastructure is read-only defined?',
          answer: 'yes',
          explanation:
            'Audit logs are NOT tenant-scoped to preserve history even after tenant deletion. Structlog produces immutable JSON output. Admin dashboard provides read-only access to logs and metrics with CSV export for offline analysis.',
        },
        {
          id: 'IAM-12.2',
          question:
            'Is the ability to disable read-only configuration controlled through proper procedures?',
          answer: 'partial',
          explanation:
            'Database admin access could theoretically modify audit logs. Sealed secrets protect database credentials. However, no immutable audit log storage (write-once) is implemented, which is an identified gap.',
        },
        {
          id: 'IAM-13.1',
          question:
            'Are processes to ensure users are identifiable through unique identification defined?',
          answer: 'yes',
          explanation:
            'UUID-based user identity. Unique email addresses enforced. Audit logs capture user_id, admin_id (for impersonation), tenant_id, IP address, and user agent for full attribution. API tokens have fimil_ prefix and unique identifiers.',
        },
        {
          id: 'IAM-14.1',
          question:
            'Are processes for authenticating access including multifactor authentication defined?',
          answer: 'yes',
          explanation:
            'TOTP-based MFA implemented with recovery codes and two-step login flow. Password authentication uses Argon2id with complexity requirements, account lockout, and brute force protection. OAuth2/OIDC federation supports MFA at the identity provider level. Multi-factor authentication covers both native and federated authentication paths.',
        },
        {
          id: 'IAM-14.2',
          question: 'Are digital certificates or alternatives adopted for system identities?',
          answer: 'yes',
          explanation:
            "TLS certificates managed by cert-manager with Let's Encrypt. API tokens with SHA256 hashing for programmatic access. OAuth2 state parameters with cryptographic binding. JWT tokens with HS256 signing.",
        },
        {
          id: 'IAM-15.1',
          question: 'Are processes for secure management of passwords defined, implemented?',
          answer: 'yes',
          explanation:
            'Argon2id memory-hard hashing via pwdlib with complexity requirements (12+ chars, mixed case, digit, special). Constant-time comparison (hmac.compare_digest). Session invalidation on password reset. Account lockout after 5 failed attempts. No plaintext password storage.',
        },
        {
          id: 'IAM-16.1',
          question:
            'Are processes to verify access to data and system functions authorized defined?',
          answer: 'yes',
          explanation:
            'RBAC enforced at every endpoint via FastAPI dependencies (RequireOperator, RequireAdminOrAbove, etc.). Tenant isolation via TenantScopedModel with ContextVar enforcement. Subscription plan-based feature gating. API token scoping.',
        },
      ],
    },

    // =========================================================================
    // IPY — Interoperability & Portability (8 questions)
    // =========================================================================
    {
      name: 'IPY — Interoperability & Portability',
      questions: [
        {
          id: 'IPY-01.1',
          question:
            'Are policies and procedures for communications between application services established?',
          answer: 'yes',
          explanation:
            'Kubernetes network policies restrict all pod-to-pod communication by default with explicit allow rules. Scanner containers are network-isolated. API, Web, and Worker have defined ingress/egress rules.',
        },
        {
          id: 'IPY-01.2',
          question:
            'Are policies and procedures for information processing interoperability established?',
          answer: 'yes',
          explanation:
            'REST API provides standardized JSON interfaces. SARIF output support for findings interoperability. CLI tool supports JSON, table, and SARIF output formats. Webhook integrations with GitHub, GitLab, and Bitbucket.',
        },
        {
          id: 'IPY-01.3',
          question:
            'Are policies and procedures for application development portability established?',
          answer: 'yes',
          explanation:
            'Docker-based deployment supports multiple environments. Helm charts provide portable Kubernetes deployment. Separate .env configurations for dev, self-hosted, and SaaS modes. Cross-database compatibility (PostgreSQL in prod, SQLite in tests).',
        },
        {
          id: 'IPY-01.4',
          question: 'Are policies and procedures for information/data exchange established?',
          answer: 'yes',
          explanation:
            'Data Processing Agreement governs customer data exchange. API token-based programmatic access. SARIF export for findings portability. CSV export for audit logs. Webhook integrations for real-time data exchange with Git providers.',
        },
        {
          id: 'IPY-01.5',
          question:
            'Are interoperability and portability policies and procedures reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Technical interoperability is maintained through version-controlled API schemas and Helm charts.',
        },
        {
          id: 'IPY-02.1',
          question:
            'Are CSCs able to programmatically retrieve their data via application interface?',
          answer: 'yes',
          explanation:
            'Comprehensive REST API with JWT and API token authentication. CLI tool for programmatic access. SARIF and JSON export formats for findings. CSV export for audit logs. API documentation available.',
        },
        {
          id: 'IPY-03.1',
          question: 'Are cryptographically secure and standardized network protocols implemented?',
          answer: 'yes',
          explanation:
            "TLS enforced in production via cert-manager with Let's Encrypt. SMTP supports STARTTLS/SSL. All external API calls use HTTPS. Kubernetes network policies enforce secure communication paths.",
        },
        {
          id: 'IPY-04.1',
          question:
            'Do agreements include provisions specifying CSC data access upon contract termination?',
          answer: 'yes',
          explanation:
            'Terms of Service and Data Processing Agreement address data access upon termination. Vendor Risk Management Policy includes exit strategies for critical vendors. API enables data export before account closure.',
        },
      ],
    },

    // =========================================================================
    // IVS — Infrastructure & Virtualization Security (14 questions)
    // =========================================================================
    {
      name: 'IVS — Infrastructure & Virtualization Security',
      questions: [
        {
          id: 'IVS-01.1',
          question:
            'Are infrastructure and virtualization security policies and procedures established?',
          answer: 'yes',
          explanation:
            'Security hardening guide (docs/operations/security-hardening.md) documents infrastructure security. Network boundary documentation (FIMIL-NB-001) defines zones and port matrix. System Security Plan (FIMIL-SSP-001) maps to NIST 800-53 Low baseline. Kubernetes pods hardened with non-root, read-only filesystem, cap_drop ALL, and no-new-privileges. Network policies restrict all traffic by default.',
        },
        {
          id: 'IVS-01.2',
          question:
            'Are infrastructure and virtualization security policies and procedures reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence. Infrastructure configuration is version-controlled in Helm charts and reviewed as part of change management.',
        },
        {
          id: 'IVS-02.1',
          question: 'Is resource availability, quality, and capacity planned and monitored?',
          answer: 'partial',
          explanation:
            'HPA configured for CPU (70-80%) and memory (80%) with 2-20 replicas. Resource requests and limits defined. Connection pooling via PgBouncer. However, no formal capacity planning process, no load testing results, and no documented capacity limits.',
        },
        {
          id: 'IVS-03.1',
          question: 'Are communications between environments monitored?',
          answer: 'yes',
          explanation:
            'Kubernetes network policies define and restrict all inter-pod communication. Request logging middleware tracks all API calls with correlation IDs. Health monitoring tracks component interactions.',
        },
        {
          id: 'IVS-03.2',
          question: 'Are communications between environments encrypted?',
          answer: 'yes',
          explanation:
            'TLS enforced on ingress via cert-manager. Redis password authentication. PgBouncer manages encrypted database connections. All external API calls use HTTPS. SMTP supports STARTTLS/SSL.',
        },
        {
          id: 'IVS-03.3',
          question:
            'Are communications between environments restricted to authenticated connections?',
          answer: 'yes',
          explanation:
            'Kubernetes network policies restrict all pod-to-pod traffic by default. Database requires authentication. Redis requires password. API endpoints require JWT, session, or API token authentication.',
        },
        {
          id: 'IVS-03.4',
          question: 'Are network configurations reviewed at least annually?',
          answer: 'yes',
          explanation:
            'Network policies are version-controlled in Helm chart templates and reviewed as part of change management. ISMS Policy defines annual review cadence for all security configurations.',
        },
        {
          id: 'IVS-03.5',
          question: 'Are network configurations supported by documented justification?',
          answer: 'yes',
          explanation:
            'Formal network boundary documentation (FIMIL-NB-001) defines zones and port matrix with justification. Network policies documented in Helm templates with explicit ingress/egress rules per component. Security hardening guide explains network architecture decisions. Scanner network isolation (--network=none) justified by privacy-by-design principles.',
        },
        {
          id: 'IVS-04.1',
          question: 'Is every host and guest OS hardened and supported by technical controls?',
          answer: 'yes',
          explanation:
            'Container hardening: non-root users, read-only root filesystem, cap_drop ALL, no-new-privileges, resource limits. Multi-stage Docker builds minimize attack surface. Falco runtime monitoring detects deviations. DigitalOcean manages underlying host OS.',
        },
        {
          id: 'IVS-05.1',
          question: 'Are production and non-production environments separated?',
          answer: 'yes',
          explanation:
            'Clear environment separation: Development (Docker Compose, remapped ports), Testing (SQLite in-memory, MockRedis), Production (managed PostgreSQL, Redis with password, sealed secrets, TLS enforced). Separate environment configurations.',
        },
        {
          id: 'IVS-06.1',
          question:
            'Are applications and infrastructures designed to appropriately segment access?',
          answer: 'yes',
          explanation:
            'Kubernetes namespaces and network policies segment infrastructure. Row-level tenant isolation in the application. RBAC at every endpoint. Scanner containers fully network-isolated. Separate network policies per component (API, Web, Worker).',
        },
        {
          id: 'IVS-07.1',
          question: 'Are secure and encrypted communication channels used when migrating?',
          answer: 'yes',
          explanation:
            'Helm-based deployments use Kubernetes API over TLS. Container images pushed to DigitalOcean container registry over HTTPS. Database migrations run within the cluster. Sealed secrets protect credentials during deployment.',
        },
        {
          id: 'IVS-08.1',
          question: 'Are high-risk environments identified and documented?',
          answer: 'yes',
          explanation:
            'Risk Assessment identifies high-risk components. Scanner containers identified as high-risk and isolated with --network=none, cap_drop ALL, and resource limits. Production environment documented with specific security requirements (non-default SECRET_KEY, TLS enforcement).',
        },
        {
          id: 'IVS-09.1',
          question:
            'Are processes and defense-in-depth techniques defined for network attack protection?',
          answer: 'yes',
          explanation:
            'Defense-in-depth: Cloudflare WAF with managed rulesets, Kubernetes network policies, scanner network isolation, ingress TLS, rate limiting, IP blocklist/allowlist, CSRF protection, account lockout, brute force detection, and Falco runtime monitoring.',
        },
      ],
    },

    // =========================================================================
    // LOG — Logging & Monitoring (18 questions)
    // =========================================================================
    {
      name: 'LOG — Logging & Monitoring',
      questions: [
        {
          id: 'LOG-01.1',
          question:
            'Are logging and monitoring policies and procedures established, documented, approved?',
          answer: 'yes',
          explanation:
            'Structlog-based structured logging with JSON output in production. Monitoring documentation in docs/operations/monitoring.md covers Prometheus integration, alerting rules, and Grafana dashboards. Audit logging tracks 40+ action types.',
        },
        {
          id: 'LOG-01.2',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence. Monitoring documentation is version-controlled and updated as infrastructure evolves.',
        },
        {
          id: 'LOG-02.1',
          question: 'Are processes to ensure audit log security and retention defined?',
          answer: 'yes',
          explanation:
            'Audit logs stored in PostgreSQL with access controls. Logs are NOT tenant-scoped to preserve history even after tenant deletion. Admin-only access to audit endpoints. Nightly backups to S3 preserve log data. CSV export enables offline archival.',
        },
        {
          id: 'LOG-03.1',
          question: 'Are security-related events identified and monitored?',
          answer: 'yes',
          explanation:
            'Security monitoring service auto-detects brute force, credential stuffing, impossible travel, API anomalies, suspicious IPs, and account takeover attempts. Security alerts classified by severity (critical/high/medium/low).',
        },
        {
          id: 'LOG-03.2',
          question: 'Is a system defined to generate alerts to responsible stakeholders?',
          answer: 'yes',
          explanation:
            'Security alerts surface to admin dashboard. Critical findings alerts via email and Slack. Incident model tracks active/resolved incidents. Announcement system for system-wide notifications. Falco generates runtime security alerts.',
        },
        {
          id: 'LOG-04.1',
          question: 'Is access to audit logs restricted to authorized personnel?',
          answer: 'yes',
          explanation:
            'Admin-only access to audit endpoints enforced via RequireAdmin dependency. Audit log queries support filtering to limit scope. CSV export enables controlled offline analysis.',
        },
        {
          id: 'LOG-05.1',
          question: 'Are security audit logs monitored to detect unusual activity?',
          answer: 'yes',
          explanation:
            'Security monitoring service provides automated threat detection. Brute force detection (20+ failed attempts/hour), credential stuffing detection (10+ unique emails/hour). Admin dashboard surfaces all security events.',
        },
        {
          id: 'LOG-05.2',
          question: 'Is a process established to review and take appropriate actions on anomalies?',
          answer: 'yes',
          explanation:
            'Incident Response Plan defines procedures for security event triage, investigation, and response. Admin dashboard provides alert acknowledgement and resolution workflow. Automatic IP blocking for brute force. Account lockout for repeated failures.',
        },
        {
          id: 'LOG-06.1',
          question: 'Is a reliable time source being used across all relevant systems?',
          answer: 'yes',
          explanation:
            'All timestamps use datetime.now(UTC). DigitalOcean managed Kubernetes runs NTP on all nodes. Structlog uses ISO 8601 timestamps. JWT tokens include iat and exp claims for temporal validation.',
        },
        {
          id: 'LOG-07.1',
          question: 'Are logging requirements for information system events established?',
          answer: 'yes',
          explanation:
            'Audit logging tracks 40+ action types including authentication, user management, scan operations, finding status changes, API token lifecycle, policy changes, and subscription events. Each entry captures user_id, tenant_id, IP, user agent, and request_id.',
        },
        {
          id: 'LOG-07.2',
          question: 'Is the scope reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines annual review cadence. Logging scope expands as new features are added, with audit action types defined in the audit service. Monitoring documentation is version-controlled.',
        },
        {
          id: 'LOG-08.1',
          question: 'Are audit records generated containing relevant security information?',
          answer: 'yes',
          explanation:
            'Each audit log entry captures: user_id, admin_id (for impersonation), tenant_id, action, resource_type, resource_id, details JSON, ip_address, user_agent, request_id, and timestamp. Failed login attempts tracked separately with failure reason and optional geo data.',
        },
        {
          id: 'LOG-09.1',
          question: 'Does the information system protect audit records from unauthorized access?',
          answer: 'yes',
          explanation:
            'Audit logs stored in PostgreSQL with database-level access controls. Admin-only API access enforced via RequireAdmin dependency. Audit logs are NOT tenant-scoped to prevent deletion. However, no immutable write-once storage is implemented.',
        },
        {
          id: 'LOG-10.1',
          question:
            'Are monitoring and reporting capabilities established for cryptographic operations?',
          answer: 'partial',
          explanation:
            'Production enforcement validates non-default SECRET_KEY and issues warnings for auto-generated keys. Audit logging tracks authentication events involving cryptographic operations. However, no dedicated cryptographic operations monitoring dashboard.',
        },
        {
          id: 'LOG-11.1',
          question: 'Are key lifecycle management events logged and monitored?',
          answer: 'partial',
          explanation:
            'MultiFernet versioned key rotation and re-encryption tooling exist. API token creation and revocation are logged in the audit trail. However, no dedicated logging for encryption key lifecycle events (rotation, re-encryption runs) and no centralized key lifecycle monitoring dashboard.',
        },
        {
          id: 'LOG-12.1',
          question: 'Is physical access logged and monitored using an auditable system?',
          answer: 'na',
          explanation:
            "Cloud-hosted on DigitalOcean. Physical access logging is the cloud provider's responsibility under the shared responsibility model.",
        },
        {
          id: 'LOG-13.1',
          question: 'Are processes for reporting monitoring system anomalies and failures defined?',
          answer: 'yes',
          explanation:
            'Health monitoring service tracks system component status with degraded/down detection. Incident model enables tracking of monitoring failures. Incident Response Plan defines escalation procedures for system anomalies.',
        },
        {
          id: 'LOG-13.2',
          question: 'Are accountable parties immediately notified about anomalies and failures?',
          answer: 'yes',
          explanation:
            'Security alerts surface to admin dashboard in real time. Critical findings alerts via email and Slack. Incident Response Plan defines notification timelines. Falco runtime alerts provide immediate notification of security events.',
        },
      ],
    },

    // =========================================================================
    // SEF — Security Incident Management, E-Discovery & Cloud Forensics (11 questions)
    // =========================================================================
    {
      name: 'SEF — Security Incident Management, E-Discovery & Cloud Forensics',
      questions: [
        {
          id: 'SEF-01.1',
          question: 'Are policies and procedures for security incident management established?',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) defines four severity levels, detection mechanisms, response phases (triage, containment, eradication, recovery, communication), incident commander role, and escalation procedures.',
        },
        {
          id: 'SEF-01.2',
          question: 'Are policies and procedures reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the Incident Response Plan. Policies are version-controlled in Git.',
        },
        {
          id: 'SEF-02.1',
          question: 'Are policies and procedures for timely incident management established?',
          answer: 'yes',
          explanation:
            'Incident Response Plan defines response timelines by severity level. Regulatory notification timelines documented (GDPR 72-hour, CCPA). Automatic IP blocking and account lockout provide immediate automated response.',
        },
        {
          id: 'SEF-02.2',
          question: 'Are policies and procedures reviewed and updated at least annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence. Incident Response Plan is version-controlled and updated based on lessons learned from incidents.',
        },
        {
          id: 'SEF-03.1',
          question: 'Is a security incident response plan established and documented?',
          answer: 'yes',
          explanation:
            'Incident Response Plan (FIMIL-IRP-001) is formally documented with severity levels, response phases, communication templates, regulatory notification procedures, and post-incident review process.',
        },
        {
          id: 'SEF-04.1',
          question:
            'Is the security incident response plan tested and updated at planned intervals?',
          answer: 'partial',
          explanation:
            'Incident Response Plan is documented and updated as needed. Automated incident response (IP blocking, account lockout) is operationally validated. However, no formal tabletop exercise or IR simulation has been conducted.',
        },
        {
          id: 'SEF-05.1',
          question: 'Are information security incident metrics established and monitored?',
          answer: 'yes',
          explanation:
            'Security monitoring tracks brute force attempts, credential stuffing, failed login rates, and alert counts. Incident model tracks resolution times. Admin security dashboard surfaces incident metrics.',
        },
        {
          id: 'SEF-06.1',
          question:
            'Are processes supporting business processes to triage security events defined?',
          answer: 'yes',
          explanation:
            'Security alert system classifies events by severity (critical/high/medium/low). Alert types include brute_force, credential_stuffing, impossible_travel, api_anomaly, suspicious_ip, and account_takeover. Admin dashboard enables triage with acknowledge/resolve workflow.',
        },
        {
          id: 'SEF-07.1',
          question:
            'Are processes, procedures, and technical measures for security breach notifications defined?',
          answer: 'yes',
          explanation:
            'Incident Response Plan includes breach notification procedures with GDPR 72-hour and CCPA timelines. Customer notification via announcement system. Regulatory contact procedures documented in Compliance Register.',
        },
        {
          id: 'SEF-07.2',
          question: 'Are security breaches reported as per applicable SLAs, laws, and regulations?',
          answer: 'yes',
          explanation:
            'Incident Response Plan documents notification timelines aligned with GDPR (72-hour), CCPA, and customer SLA requirements. Compliance Register tracks regulatory notification obligations.',
        },
        {
          id: 'SEF-08.1',
          question:
            'Are points of contact maintained for applicable regulatory and legal authorities?',
          answer: 'yes',
          explanation:
            'Incident Response Plan includes CISA/CIRCIA federal incident reporting procedures with specific contact points. Compliance Register tracks regulatory obligations. GDPR and CCPA notification contacts documented. Regulatory notification timelines established (GDPR 72-hour, CCPA, CIRCIA).',
        },
      ],
    },

    // =========================================================================
    // STA — Supply Chain Management, Transparency & Accountability (15 questions)
    // =========================================================================
    {
      name: 'STA — Supply Chain Management, Transparency & Accountability',
      questions: [
        {
          id: 'STA-01.1',
          question:
            'Are policies and procedures implementing the shared security responsibility model established?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy (FIMIL-VRM-001) documents shared responsibility model with DigitalOcean. Security whitepaper at /security communicates customer responsibilities. DPA defines data processing responsibilities.',
        },
        {
          id: 'STA-01.2',
          question: 'Are the policies and procedures reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence. Vendor Risk Management Policy defines review cadence by tier (annual for Tier 1, biannual for Tier 2).',
        },
        {
          id: 'STA-02.1',
          question:
            'Is the SSRM applied, documented, implemented, and managed throughout the supply chain?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy establishes three-tier vendor classification with documented shared responsibility for each. DPAs executed with all vendors. Exit strategies documented for critical vendors.',
        },
        {
          id: 'STA-03.1',
          question:
            'Is the CSC given SSRM guidance detailing information about SSRM applicability?',
          answer: 'yes',
          explanation:
            'Security whitepaper at /security communicates security architecture and customer responsibilities. Terms of Service and DPA define data handling responsibilities. SLA published at /legal/sla.',
        },
        {
          id: 'STA-04.1',
          question: 'Is the shared ownership and applicability of all CCM controls delineated?',
          answer: 'partial',
          explanation:
            'Vendor Risk Management Policy documents shared responsibility with DigitalOcean. Physical controls marked as cloud provider responsibility. However, a formal CCM-specific control ownership matrix has not been produced.',
        },
        {
          id: 'STA-05.1',
          question: 'Is SSRM documentation for all cloud services reviewed and validated?',
          answer: 'partial',
          explanation:
            'Vendor assessments documented for all critical vendors (DigitalOcean, GitHub, Stripe, Cloudflare, Resend, PostHog). Vendor Risk Management Policy defines review cadence. However, review schedule not yet exercised (policies just established).',
        },
        {
          id: 'STA-06.1',
          question: 'Are the portions of the SSRM the organization is responsible for implemented?',
          answer: 'yes',
          explanation:
            'Fimil implements all customer-side responsibilities: application security, authentication, authorization, encryption, logging, monitoring, incident response, and data governance. Cloud provider handles physical infrastructure and host-level security.',
        },
        {
          id: 'STA-07.1',
          question: 'Is an inventory of all supply chain relationships developed and maintained?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy documents all vendors with three-tier classification: Tier 1 (DigitalOcean, GitHub, Stripe), Tier 2 (Cloudflare, Resend), Tier 3 (PostHog). DPA status tracked for each vendor.',
        },
        {
          id: 'STA-08.1',
          question:
            'Are risk factors associated with all organizations in the supply chain reviewed?',
          answer: 'yes',
          explanation:
            'Individual vendor risk assessments documented for all six vendors. Risk ratings assigned by tier. Exit strategies documented for critical vendors. SOC 2 report collection tracked.',
        },
        {
          id: 'STA-09.1',
          question: 'Do service agreements incorporate mutually agreed upon security provisions?',
          answer: 'yes',
          explanation:
            'DPAs executed with all critical and significant vendors as of 2026-03-14. Vendor Risk Management Policy defines security requirements by tier. Customer-facing DPA at /legal/dpa defines mutual data protection obligations.',
        },
        {
          id: 'STA-10.1',
          question: 'Are supply chain agreements between CSPs and CSCs reviewed at least annually?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy defines review cadence by tier: annual for Tier 1 (critical), biannual for Tier 2 (significant). ISMS Policy mandates annual policy review.',
        },
        {
          id: 'STA-11.1',
          question: 'Is there a process for conducting internal assessments at least annually?',
          answer: 'yes',
          explanation:
            'CSA STAR Level 1 self-assessment completed. Statement of Applicability maps ISO 27001 controls with implementation status. Compliance Register tracks regulatory compliance. ISMS Policy defines annual review cadence. Automated quarterly access reviews via Fimil-Ops endpoints. Continuous monitoring plan (FIMIL-CONMON-001) provides ongoing assessment.',
        },
        {
          id: 'STA-12.1',
          question:
            'Are policies requiring all supply chain CSPs to comply with security requirements implemented?',
          answer: 'yes',
          explanation:
            'Vendor Risk Management Policy defines security requirements by vendor tier. DPAs include security obligations. Docker images scanned with Trivy, signed with Cosign via Sigstore, include SPDX SBOMs, and have GitHub Actions build provenance attestation. Dependabot monitors supply chain dependencies. Scanner containers sandboxed with --network=none and cap_drop ALL.',
        },
        {
          id: 'STA-13.1',
          question: 'Are supply chain partner IT governance policies reviewed periodically?',
          answer: 'partial',
          explanation:
            'Vendor Risk Management Policy defines review cadence for vendor assessments. SOC 2 report collection tracked. However, review schedule not yet exercised and no automated vendor monitoring in place.',
        },
        {
          id: 'STA-14.1',
          question:
            'Is a process to conduct periodic security assessments for supply chain organizations defined?',
          answer: 'partial',
          explanation:
            'Vendor Risk Management Policy defines assessment procedures by tier with documented review cadences. However, periodic assessments have not yet been executed; the initial vendor assessments were just established.',
        },
      ],
    },

    // =========================================================================
    // TVM — Threat & Vulnerability Management (12 questions)
    // =========================================================================
    {
      name: 'TVM — Threat & Vulnerability Management',
      questions: [
        {
          id: 'TVM-01.1',
          question:
            'Are policies and procedures established to identify, report, and prioritize vulnerability remediation?',
          answer: 'yes',
          explanation:
            'Core platform function. EPSS enrichment provides exploit probability scores. Priority scoring (0-100) combines severity, age, reachability, and EPSS. Auto-triage rules classify findings. Risk Assessment documents vulnerability treatment plans.',
        },
        {
          id: 'TVM-01.2',
          question:
            'Are threat and vulnerability management policies and procedures reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies. Vulnerability management capabilities evolve continuously as the platform is itself a security product.',
        },
        {
          id: 'TVM-02.1',
          question:
            'Are policies and procedures to protect against malware on managed assets established?',
          answer: 'yes',
          explanation:
            'Scanner containers sandboxed with --network=none, --cap-drop ALL, no-new-privileges, read-only mounts, and resource limits. Falco DaemonSet provides runtime malware detection with 7 custom rules. People Security Policy documents endpoint antivirus requirements.',
        },
        {
          id: 'TVM-02.2',
          question:
            'Are asset management and malware protection policies reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence. Falco rules and container security configurations are version-controlled in Helm charts.',
        },
        {
          id: 'TVM-03.1',
          question:
            'Are processes to enable scheduled and emergency responses to vulnerability identification?',
          answer: 'yes',
          explanation:
            'Patch management SLA (FIMIL-PM-001) defines remediation timelines: Critical 24h, High 7d, Medium 30d. Trivy scanning in CI/CD blocks critical vulnerabilities from deployment (emergency gate). Dependabot provides automated dependency update PRs. Change Management Policy defines Emergency change type for urgent security patches.',
        },
        {
          id: 'TVM-04.1',
          question:
            'Are processes to update detection tools and threat signatures on weekly basis?',
          answer: 'yes',
          explanation:
            'Platform uses latest-tagged scanner images (Semgrep, Trivy, Grype, etc.) which include up-to-date vulnerability databases and detection signatures. EPSS data refreshed from FIRST.org with 24-hour Redis cache TTL.',
        },
        {
          id: 'TVM-05.1',
          question:
            'Are processes to identify updates for applications using third-party libraries defined?',
          answer: 'yes',
          explanation:
            'Dependabot configured across all repositories for automated dependency updates with pull request generation. Trivy and Grype scan for known vulnerabilities in dependencies. OSV-Scanner provides Google OSV database coverage. Patch management SLA (FIMIL-PM-001) defines remediation timelines: Critical 24h, High 7d, Medium 30d.',
        },
        {
          id: 'TVM-06.1',
          question:
            'Are processes for periodic, independent, third-party penetration testing defined?',
          answer: 'no',
          explanation:
            'No penetration testing program exists. No independent third-party security assessment has been conducted. This is the top identified gap in the compliance assessment (ISO A.5.35).',
        },
        {
          id: 'TVM-07.1',
          question:
            'Are processes for vulnerability detection on managed assets at least monthly defined?',
          answer: 'yes',
          explanation:
            'Trivy image scanning runs on every deployment via CI/CD. The platform provides continuous vulnerability scanning. Falco runtime monitoring runs continuously. Vulnerability detection occurs on every code push, not just monthly.',
        },
        {
          id: 'TVM-08.1',
          question: 'Is vulnerability remediation prioritized using a risk-based model?',
          answer: 'yes',
          explanation:
            'Priority scoring (0-100) combines severity (60%), age (20%), reachability (15%), and EPSS (5%). Reachability analysis distinguishes direct from transitive dependencies. Auto-triage rules classify findings based on risk patterns.',
        },
        {
          id: 'TVM-09.1',
          question:
            'Is a process defined to track and report vulnerability identification and remediation?',
          answer: 'yes',
          explanation:
            'Finding status tracking (open, confirmed, false_positive, accepted, fixed) with audit trail. Scan comparison shows new, fixed, and unchanged findings between scans. PR scanning identifies regressions. Weekly digest notifications summarize vulnerability status.',
        },
        {
          id: 'TVM-10.1',
          question: 'Are metrics for vulnerability identification and remediation established?',
          answer: 'yes',
          explanation:
            'Scanner health metrics track success/failure rates and execution times. Finding status transitions tracked over time. Scan comparison provides new/fixed/unchanged counts. Priority scoring provides quantified risk metrics. Weekly digest reports aggregate vulnerability trends.',
        },
      ],
    },

    // =========================================================================
    // UEM — Universal Endpoint Management (14 questions)
    // =========================================================================
    {
      name: 'UEM — Universal Endpoint Management',
      questions: [
        {
          id: 'UEM-01.1',
          question: 'Are policies and procedures established for all endpoints?',
          answer: 'partial',
          explanation:
            'People Security Policy (FIMIL-PPL-001) documents endpoint security requirements: full-disk encryption, host firewall, screen lock after 5 minutes, and antivirus. However, no MDM enforcement or automated compliance verification. Currently sole founder implementing manually.',
        },
        {
          id: 'UEM-01.2',
          question:
            'Are universal endpoint management policies and procedures reviewed and updated annually?',
          answer: 'yes',
          explanation:
            'ISMS Policy defines an annual review cadence for all policies including the People Security Policy which covers endpoint management.',
        },
        {
          id: 'UEM-02.1',
          question:
            'Is there a defined list of approved services, applications, and acceptable sources?',
          answer: 'partial',
          explanation:
            'Acceptable Use Policy and People Security Policy document permitted usage. Vendor Risk Management Policy tracks approved services. However, no formal approved application list or software whitelist for endpoints.',
        },
        {
          id: 'UEM-03.1',
          question: 'Is a process defined to validate endpoint device compatibility?',
          answer: 'partial',
          explanation:
            'People Security Policy specifies endpoint requirements (encryption, firewall, screen lock). However, no MDM or automated device compliance checking is implemented. Validation is manual.',
        },
        {
          id: 'UEM-04.1',
          question: 'Is an inventory of all endpoints used and maintained?',
          answer: 'partial',
          explanation:
            'Formal asset register (FIMIL-AM-001) with 26-row inventory covers infrastructure and application assets. Currently sole founder with known devices. However, no MDM-managed endpoint inventory with automated device discovery and compliance tracking.',
        },
        {
          id: 'UEM-05.1',
          question: 'Are processes to enforce policies and controls for all endpoints defined?',
          answer: 'partial',
          explanation:
            'People Security Policy defines endpoint security requirements. Technical enforcement exists for server-side endpoints (container hardening, network policies). However, no MDM for user endpoint policy enforcement.',
        },
        {
          id: 'UEM-06.1',
          question:
            'Are all relevant interactive-use endpoints configured to require automatic lock screen?',
          answer: 'partial',
          explanation:
            'People Security Policy requires screen lock after 5 minutes of inactivity. Currently implemented manually by the sole founder. No MDM enforcement to verify or enforce the setting.',
        },
        {
          id: 'UEM-07.1',
          question: 'Are changes to endpoint operating systems managed through change management?',
          answer: 'partial',
          explanation:
            'Change Management Policy governs infrastructure changes. Server-side containers use immutable images with version tags. However, user endpoint OS changes are not managed through formal change management (no MDM).',
        },
        {
          id: 'UEM-08.1',
          question: 'Is information protected from unauthorized disclosure on managed endpoints?',
          answer: 'partial',
          explanation:
            'People Security Policy requires full-disk encryption (BitLocker/LUKS). Technical controls protect server-side data (Fernet encryption, sealed secrets). However, no DLP tooling on user endpoints and no MDM verification.',
        },
        {
          id: 'UEM-09.1',
          question: 'Are anti-malware detection and prevention technology services configured?',
          answer: 'partial',
          explanation:
            'People Security Policy documents endpoint antivirus requirements. Falco provides runtime malware detection for server-side containers. However, no centrally managed anti-malware for user endpoints (no MDM).',
        },
        {
          id: 'UEM-10.1',
          question: 'Are software firewalls configured on managed endpoints?',
          answer: 'partial',
          explanation:
            'People Security Policy requires host firewall enabled on all endpoints. Kubernetes network policies protect server-side endpoints. However, user endpoint firewall configuration is manual without MDM enforcement.',
        },
        {
          id: 'UEM-11.1',
          question: 'Are managed endpoints configured with data loss prevention technologies?',
          answer: 'no',
          explanation:
            'No DLP tooling is deployed on user endpoints. Server-side controls prevent data leakage (tenant isolation, rate limiting, network-isolated scanners), but no endpoint DLP is configured.',
        },
        {
          id: 'UEM-12.1',
          question: 'Are remote geolocation capabilities enabled for all managed mobile endpoints?',
          answer: 'no',
          explanation:
            'No MDM solution is deployed, so no remote geolocation capability exists for mobile endpoints. Currently sole founder; MDM to be evaluated as team grows.',
        },
        {
          id: 'UEM-13.1',
          question:
            'Are processes to enable remote company data deletion on managed devices defined?',
          answer: 'partial',
          explanation:
            'People Security Policy documents remote wipe requirements. Server-side capabilities exist for access revocation (user deactivation, token revocation, session invalidation). However, no MDM for actual device-level remote wipe.',
        },
        {
          id: 'UEM-14.1',
          question: 'Are processes to maintain proper security of third-party endpoints defined?',
          answer: 'partial',
          explanation:
            'People Security Policy documents BYOD and third-party device security requirements. Vendor Risk Management Policy covers third-party security. However, no technical enforcement for third-party endpoints.',
        },
      ],
    },
  ],
};
