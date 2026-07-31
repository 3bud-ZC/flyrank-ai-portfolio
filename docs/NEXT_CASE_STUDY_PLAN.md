# The Plan to Keep Building

## Next named case study

**FlyRank Opportunity Scout** is the next project to add to the portfolio.

It is a strong next case because the source, synthetic sample data, five automated evaluation cases, raw run evidence, design specification, build log, and demo material already exist. It also expands the portfolio beyond the current three categories by showing a bounded local-first AI agent.

## Exact place in the site

1. Add a fourth object to the `projects` array in `src/App.tsx`.
2. Use the slug `flyrank-opportunity-scout`.
3. Add one real run image, descriptive alt text, and the public source link.
4. Reuse the existing `ProjectGrid` and `CaseStudy` components; no new page template is required.
5. Write the case in the same order:
   - problem
   - what I built
   - current outcome
   - evidence available now
   - next improvement
6. Run `npm run verify`.
7. Open the new case on phone and desktop.
8. Push through a pull request and confirm GitHub Pages deployment.
9. Update the Notes page with the addition date and any measurable outcome that can be verified.

## Evidence to reuse

- Agent source and README
- Synthetic GSC and GA4 sample inputs
- Five automated tests
- JSON and Markdown outputs
- Unedited run video
- FL-06 design specification
- FL-07 build log and raw transcript
- FL-09 documentation and demo notes

## Quality gate

The case is not complete until:

- its strongest evidence link is visible first;
- confidential client data is absent;
- the description does not call a deterministic step an autonomous decision;
- mobile layout has no horizontal overflow;
- all new links work;
- the build and hardening audit pass.

## Preserved build context

The repository keeps the identity system, reusable project data shape, case-study renderer, responsive styles, analytics loader, deployment workflow, hardening audit, and this maintenance plan. Future additions should extend those patterns instead of rebuilding the site.
