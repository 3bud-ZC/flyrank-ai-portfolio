# FlyRank AI Portfolio

A standalone portfolio project created for the FlyRank General AI Fluency track.

## Current milestone

Weeks 8–9 — working feature, documentation, launch hygiene, hardening, and maintenance planning.

The site remains separate from the production website at `abud.fun`.

## Live site

`https://3bud-zc.github.io/flyrank-ai-portfolio/`

## Public sitemap

- Home — `#/`
- Work — `#/work`
- OG ERP case study — `#/work/og-erp`
- RepoRadar AI case study — `#/work/reporadar-ai`
- VPS Monitor Bot case study — `#/work/vps-monitor-bot`
- About — `#/about`
- Notes — `#/notes`
- Contact and working form — `#/contact`
- CV — `#/cv`
- DNS walkthrough — `#/dns`
- FlyRank verification status — `#/verification`

Hash routes are used so every public page remains reachable on GitHub Pages without a server-side router.

## One working dynamic feature

The Contact page contains a real workflow inquiry form.

Data flow:

1. The visitor enters contact and workflow details.
2. The browser validates the required fields and a hidden honeypot.
3. The frontend sends JSON to the FormSubmit AJAX endpoint.
4. The hosted form backend forwards the submission to the portfolio inbox.
5. The UI displays an explicit success or failure state and blocks rapid duplicate submission.

The inbox owner must activate the first FormSubmit email before the feature is considered fully verified.

## Analytics

The site supports Google Analytics 4 without hard-coding a Measurement ID.

Create a repository Actions variable named:

```text
VITE_GA_MEASUREMENT_ID
```

Set its value to the real GA4 ID in `G-...` format. The GitHub Actions build passes it to Vite. Without the variable, analytics is a safe no-op and the site continues to work.

## Launch hygiene

The production document includes:

- Route-aware page titles
- Meta description
- Canonical URL
- Open Graph metadata
- Twitter card metadata
- SVG favicon and web manifest
- `robots.txt`
- `sitemap.xml`
- Person structured data
- HTTPS through GitHub Pages

## Verification badge boundary

The footer contains a stable FlyRank verification destination. It is deliberately marked **Official badge pending issuance** until FlyRank provides the real graduate badge asset and verification URL. The public site does not claim a credential that has not been issued.

## Hardening and repeatable checks

Run:

```bash
npm install
npm run verify
```

`npm run verify` performs the source-level hardening audit and then runs the TypeScript/Vite production build.

The audit checks:

- Required SEO and social metadata
- Contact form endpoint and guardrails
- Duplicate-submit protection
- Honeypot presence
- Verification route and badge destination
- Analytics initialization
- Safe external-link attributes
- CI integration

Detailed findings and known limitations are in:

- `docs/WEEK_8_9_HARDENING_LOG.md`
- `docs/NEXT_CASE_STUDY_PLAN.md`

## Stack

- React 19
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions
- FormSubmit AJAX backend
- Optional Google Analytics 4

## Project evidence

The public site uses real project captures and public evidence links where available. Promotional visuals are explicitly described as secondary material. Private repositories and confidential client data are not exposed.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run verify
npm run preview
```

## Deployment

Pull requests run the hardening audit and production build. Every push to `main` repeats the verification and deploys the generated `dist` directory to GitHub Pages.

## Known external steps

The repository cannot complete these identity-dependent actions by itself:

- Activate the first FormSubmit email and capture a real delivered test.
- Create a GA4 property and add its Measurement ID as the repository variable.
- Configure a custom DNS name in the domain provider and GitHub Pages settings.
- Replace the pending badge state with the official FlyRank graduate badge and verification URL after issuance.
