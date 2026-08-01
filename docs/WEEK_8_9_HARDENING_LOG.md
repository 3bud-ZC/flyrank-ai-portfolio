# Week 8–9 Build and Hardening Log

## Site under test

- Live fallback URL: `https://3bud-zc.github.io/flyrank-ai-portfolio/`
- Planned custom domain: `https://portfolio.abud.fun/`
- Repository: `https://github.com/3bud-ZC/flyrank-ai-portfolio`
- Stack: React, TypeScript, Vite, GitHub Pages, GitHub Actions

## Week 8 — One working feature

The portfolio contains one dynamic feature: a workflow contact form.

### Data flow

1. The visitor enters a name, email, current workflow, and desired result.
2. The browser validates minimum lengths, email shape, and a hidden honeypot field.
3. The submit button is disabled during the request and after success to prevent rapid duplicate sends.
4. The frontend sends JSON to the FormSubmit AJAX endpoint.
5. The hosted form backend forwards the submission to `s-abdallah.ali@zewailcity.edu.eg`.
6. The page displays a live success or error state.

### Verified external result

The university inbox activated the FormSubmit endpoint successfully. A controlled production submission produced a visible success state and reached the inbox with the name, email, workflow description, and desired result preserved. Public screenshots are stored in the Week 8 evidence folder.

## Week 9 — Break tests

| Test | Expected result | Evidence status |
|---|---|---|
| Submit empty form | Browser blocks or shows validation message | Verified |
| Submit weak or garbage text | Custom minimum-detail message | Verified on deployed form |
| Submit invalid email | Browser and custom validation block submission | Verified with screenshot |
| Valid submission | Success state and one delivered email | Verified in Week 8 |
| Double-click submit | In-flight and completed states block duplicates | Implemented and source-audited |
| Spam bot fills hidden field | Request stops silently | Implemented and source-audited |
| Backend request fails | Visible error state | Implemented and source-audited |
| Unknown hash route | Falls back to Home without a blank screen | Existing safe behavior |
| Narrow phone layout | Navigation, actions, and cards remain usable | Re-tested on a real phone |
| External links | Open separately with `rel="noreferrer"` | Audited and peer-reviewed |
| Missing GA4 variable | Site continues without analytics | Implemented |
| Missing official FlyRank badge | Pending state is shown, not a false credential | Implemented |
| GitHub project URL or custom domain | Relative production assets continue to load | Implemented |

## Manual evidence results

- Invalid form input produced the expected validation message and did not send a request.
- The site was opened on an additional real-phone view and remained usable.
- Mobile PageSpeed scores: **Performance 92, Accessibility 100, Best Practices 100, SEO 100**.
- A real reviewer confirmed that Home, Work, About, Notes, Contact, all three case studies, repository links, and supporting-evidence links worked.
- The reviewer confirmed empty, invalid, and valid form states behaved correctly and that the valid submission reached the intended inbox.

## External review classification

### Fix now

The reviewer identified the custom domain, HTTPS, analytics, metadata, and final-link verification as the remaining launch must-fix. This is being completed under **Plant Your Flag: Domain + Badge** rather than hidden as a finished item.

The real-phone screenshot also exposed two UI defects that were not described in the text review:

1. The final navigation item could be visually clipped at narrow widths.
2. The skip-to-content control could overlap the page heading in a focused/full-page capture.

Both were fixed in `src/mobile-final-fix.css` by changing the narrow navigation to a complete multi-row grid and using a standard visually-hidden skip-link state that only expands on visible keyboard focus.

### Known limitation

Different evidence buttons open repositories, reports, screenshots, and generated outputs. Their labels are already specific, but a future evidence-type icon system could make verification faster.

### Nice to have

Add short demo videos and more measurable outcomes to each case study, such as time saved, automated steps, performance gains, or completed features.

## Findability and launch hygiene

Implemented:

- Route-aware document titles
- Meta description
- Configurable canonical and Open Graph public URL
- Open Graph title, description, image, and image alt
- Twitter summary card metadata
- SVG favicon
- Portable web manifest
- `robots.txt`
- `sitemap.xml`
- Person structured data
- Configurable GA4 support through `VITE_GA_MEASUREMENT_ID`
- Configurable public address through `VITE_PUBLIC_SITE_URL`
- Relative Vite assets that work on the project URL and a future custom domain

## Automated verification

Run:

```bash
npm run verify
```

The audit checks metadata, portable asset paths, manifest behavior, crawl files, the form endpoint and guardrails, the verification route, analytics initialization, deployment variables, external-link safety, and CI ordering before TypeScript and Vite build the production output.

## Fix-now findings addressed

- Static contact links did not prove an end-to-end feature → replaced with a real backend-connected form.
- The original FormSubmit target was unavailable → migrated to the university inbox and verified real delivery.
- Social metadata lacked a configurable launch address → added `VITE_PUBLIC_SITE_URL` with a safe GitHub Pages fallback.
- The Vite and manifest paths were tied to one repository subpath → changed to portable relative asset paths.
- No repeatable hardening audit existed → added and expanded `scripts/site-audit.mjs` with CI enforcement.
- Analytics had no safe integration path → added environment-variable-based GA4 loading.
- No stable badge destination existed → added `#/verification` with an honest pending state.
- Narrow navigation could clip the final link → changed to a complete responsive grid.
- Skip-link focus could cover content in a phone capture → changed to a visually hidden state that expands only on visible focus.

## Known limitations

- GA4 cannot collect until a real `G-...` Measurement ID is added to the GitHub Actions repository variable.
- The custom domain requires a DNS CNAME and GitHub Pages custom-domain setting.
- `robots.txt` and `sitemap.xml` must be updated to the final custom address when the domain is activated.
- The official FlyRank graduate badge and verification URL cannot be claimed before FlyRank issues them.
- Hash routes share one canonical HTML document, so individual case studies are not separate crawlable URLs.
- External Google Drive images and evidence depend on their public-sharing permissions.

## Remaining external evidence before final Week 9 submission

1. Screenshot of `portfolio.abud.fun` over HTTPS.
2. Screenshot of GA4 Realtime after the Measurement ID is installed.
3. Screenshot showing the final favicon, title, and share preview on the custom address.
4. Official FlyRank badge asset and verification URL when issued, or an explicit pending-issuance statement accepted by FlyRank.
5. Final phone screenshot after the custom-domain deployment.

## Evidence folder

`https://drive.google.com/drive/folders/1P7Vv1YgziaoZkjJEWa2VDZREKVqahED2`

## Manual evidence checklist

Follow `docs/WEEK_9_MANUAL_TEST_CHECKLIST.md` and capture only the minimum screenshots needed to prove each external step.
