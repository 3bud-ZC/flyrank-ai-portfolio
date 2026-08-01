# Week 9 Final Custom Domain Evidence

## Final address

- Custom domain: `https://portfolio.abud.fun/`
- DNS record: `portfolio` CNAME → `3bud-zc.github.io`
- DNS TTL: `300`
- GitHub Pages status: DNS check successful

## Production metadata

The GitHub Pages build now uses `https://portfolio.abud.fun/` as the production public URL for:

- canonical metadata
- Open Graph URL
- structured-data profile URL
- `robots.txt` sitemap reference
- `sitemap.xml` location

The GitHub project URL remains the technical fallback, but the custom domain is the public launch address.

## Evidence received

1. DNS-management screenshot showing the CNAME record.
2. GitHub Pages screenshot showing `portfolio.abud.fun` and a successful DNS check.

## Remaining launch evidence

- Enable and verify HTTPS when GitHub exposes the option.
- Configure a valid GA4 Measurement ID through `VITE_GA_MEASUREMENT_ID`.
- Capture GA4 Realtime on the custom domain.
- Capture the final favicon, title, and mobile view on the custom domain.
- Replace the pending graduate badge only after FlyRank supplies the official asset and verification URL.
