# Week 8–9 Build and Hardening Log

## Site under test

- Live fallback URL: `https://3bud-zc.github.io/flyrank-ai-portfolio/`
- Repository: `https://github.com/3bud-ZC/flyrank-ai-portfolio`
- Stack: React, TypeScript, Vite, GitHub Pages, GitHub Actions

## Week 8 — One working feature

The portfolio now contains one dynamic feature: a workflow contact form.

### Data flow

1. The visitor enters a name, email, current workflow, and desired result.
2. The browser validates minimum lengths, email shape, and a hidden honeypot field.
3. The submit button is disabled during the request and after success to prevent rapid duplicate sends.
4. The frontend sends JSON to the FormSubmit AJAX endpoint.
5. The hosted form backend forwards the submission to `abudfun@gmail.com`.
6. The page displays a live success or error state.

### Activation boundary

FormSubmit requires the inbox owner to confirm the first submission before normal delivery is considered active. A real test submission and the activation email are required as final external evidence.

## Week 9 — Break tests

| Test | Expected result | Source status |
|---|---|---|
| Submit empty form | Browser blocks or shows validation message | Implemented |
| Submit weak/garbage text | Custom minimum-detail message | Implemented |
| Double-click submit | In-flight and completed states block duplicates | Implemented |
| Spam bot fills hidden field | Request stops silently | Implemented |
| Unknown hash route | Falls back to Home without a blank screen | Existing behavior |
| Narrow phone layout | No horizontal overflow; actions stack | Verified in Week 7 |
| External links | Open separately with `rel="noreferrer"` | Audited |
| Missing GA4 variable | Site still loads; analytics becomes a no-op | Implemented |
| Missing official FlyRank badge | Pending state is shown, not a false credential | Implemented |

## Findability and launch hygiene

Implemented:

- Page title and route-aware document titles
- Meta description
- Canonical URL
- Open Graph title, description, image, and image alt
- Twitter summary card metadata
- SVG favicon
- Web manifest
- `robots.txt`
- `sitemap.xml`
- Person structured data
- Configurable GA4 support through `VITE_GA_MEASUREMENT_ID`

## Automated verification

Run:

```bash
npm run verify
```

The audit checks metadata, the form endpoint and guardrails, the verification route, analytics initialization, external-link safety, and CI integration before TypeScript and Vite build the production output.

## Fix-now findings

- Static contact links did not prove an end-to-end feature → replaced with a real backend-connected form.
- Social metadata lacked a canonical URL, social image, Twitter metadata, and favicon → added.
- No repeatable hardening audit existed → added `scripts/site-audit.mjs` and CI enforcement.
- Analytics had no safe integration path → added environment-variable-based GA4 loading.
- No stable badge destination existed → added `#/verification` with an honest pending state.

## Known limitations

- The first FormSubmit email must be activated by the inbox owner.
- GA4 cannot collect until a real `G-...` Measurement ID is added to the GitHub Actions repository variable.
- A custom domain requires a DNS CNAME and GitHub Pages custom-domain setting.
- The official FlyRank graduate badge and verification URL cannot be claimed before FlyRank issues them.
- Hash routes share one canonical HTML document, so individual case studies are not separate crawlable URLs.
- External Google Drive images and evidence depend on their public-sharing permissions.

## Required external evidence before final submission

1. Screenshot of a real form submission reaching the inbox.
2. Screenshot of GA4 Realtime after the Measurement ID is installed.
3. Screenshot of the final custom domain over HTTPS, or an explicit approved fallback decision.
4. Official FlyRank badge asset and verification URL when issued.
5. Short hardening-review response from a real reviewer and any must-fix follow-up.
