# FlyRank AI Portfolio

A standalone portfolio project created for the FlyRank General AI Fluency track.

## Current milestone

Week 5 — Ship the Ugly One.

The Week 4 commit preserved the first near-blank deployment. The Week 5 build expands the same repository into a complete public sitemap with real case studies, evidence links, contact paths, a CV page, field notes, and a DNS walkthrough.

This repository remains separate from the production website at `abud.fun`.

## Public sitemap

- Home — `#/`
- Work — `#/work`
- OG ERP case study — `#/work/og-erp`
- RepoRadar AI case study — `#/work/reporadar-ai`
- VPS Monitor Bot case study — `#/work/vps-monitor-bot`
- About — `#/about`
- Notes — `#/notes`
- Contact — `#/contact`
- CV — `#/cv`
- DNS walkthrough — `#/dns`

Hash routes are used so every public page remains reachable on GitHub Pages without a server-side router.

## Stack

- React 19
- TypeScript
- Vite
- GitHub Pages
- GitHub Actions

## Project evidence

The public site uses real project captures and public evidence links where available. Promotional visuals are explicitly described as secondary material. Private repositories and confidential client data are not exposed.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Every push to `main` runs the GitHub Pages workflow in `.github/workflows/deploy.yml`.

Public URL:

`https://3bud-zc.github.io/flyrank-ai-portfolio/`
