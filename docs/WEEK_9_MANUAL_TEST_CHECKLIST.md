# Week 9 Manual Launch and Break-Test Checklist

Use the deployed site, not a local preview. Record the date, browser, device, result, and evidence link for each test.

## A. Form edge cases

| Test | Steps | Expected result |
|---|---|---|
| Empty submission | Open Contact and submit without filling the fields | Browser or custom validation blocks the request |
| Invalid email | Fill all fields but use `wrong-email` | Email validation blocks the request |
| Weak detail | Enter fewer than 20 characters in a long-text field | Minimum-detail validation appears |
| Valid submission | Enter complete test data and submit once | Success state appears and one email reaches the university inbox |
| Rapid repeat | Click the submit action again immediately | No duplicate request is sent |

Capture one screenshot that shows the invalid state and one that shows the valid success state. The successful inbox delivery is already preserved in the public Week 8 evidence folder.

## B. Navigation and evidence links

Open each route on the deployed address:

- Home
- Work
- OG ERP
- RepoRadar AI
- VPS Monitor Bot
- About
- Notes
- Contact
- CV
- Verification

Open every public repository, live result, and evidence link. Record any broken or permission-gated link.

## C. Browser and device coverage

Test the final address in:

1. One desktop browser.
2. One real phone.
3. One additional browser or private window.

Confirm:

- No horizontal overflow.
- Navigation remains usable.
- Images remain sharp and contained.
- The favicon and page title are visible.
- HTTPS is active without a warning.

## D. Findability and speed

1. Run the final address through Google PageSpeed Insights using the Mobile result.
2. Capture Performance, Accessibility, Best Practices, and SEO scores.
3. Search for `Abdullah Ragab software automation portfolio` and record whether the site is indexed. A new domain may require indexing time; record this honestly as a known limitation rather than fabricating a result.

## E. Analytics

After a real `G-...` Measurement ID is configured:

1. Redeploy the site.
2. Open the final address in a private window.
3. Navigate across at least two hash routes.
4. Capture GA4 Realtime showing an active user or page view.

## F. External hardening review

Send the final site to one real reviewer with this prompt:

> Please try to break this portfolio before launch. Test the navigation, project and evidence links, contact form with empty, invalid, and valid input, and the site on your current device. What failed or was confusing? What is the single must-fix issue? What is only a nice-to-have improvement?

Classify the response into:

- Fix now
- Known limitation
- Nice to have

Implement any valid fix-now item and capture the final corrected state.

## G. Domain and badge

For `portfolio.abud.fun`:

1. Create DNS CNAME `portfolio` → `3bud-zc.github.io`.
2. Add `portfolio.abud.fun` in GitHub Pages settings.
3. Add repository variable `VITE_PUBLIC_SITE_URL=https://portfolio.abud.fun/`.
4. Update `public/robots.txt` and `public/sitemap.xml` to the final address.
5. Redeploy and enable Enforce HTTPS.
6. Capture the address bar, favicon, title, and share preview.

Do not publish a FlyRank graduate badge until FlyRank provides the official asset and verification URL. Keep the existing pending state if issuance has not happened.
