# Security Policy

## Reporting a Vulnerability

If you find a security issue in this project, please report it responsibly.

**Email**: [security@fimil.dev](mailto:security@fimil.dev)

Include:

- Description of the vulnerability
- Steps to reproduce
- Impact assessment (if possible)

We'll acknowledge your report within 48 hours and aim to provide a fix or mitigation within 7 days depending on severity.

## Scope

This is a static site generator — there is no backend, database, or authentication. The primary attack surface is:

- **Supply chain**: Malicious dependencies introduced via `package.json`
- **Build-time injection**: Malicious content in `trust.config.ts` that could produce XSS in the built HTML
- **CI/CD**: Workflow injection via pull requests

## Out of Scope

- The content of a deployed trust center (that's the responsibility of whoever forks and configures it)
- Vulnerabilities in upstream dependencies (Astro, Tailwind, etc.) — report those to their respective maintainers
