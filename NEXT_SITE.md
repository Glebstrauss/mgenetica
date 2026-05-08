# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Run rendered visual QA across the published public site and use the findings to make a conservative site-only polish pass.

## Scope

In scope:

- Browser/screenshot QA for homepage, module index, representative module page, search, glossary, study route and about page.
- Desktop, tablet and mobile checks for spacing, type scale, cards, tables/code, navigation and CTAs.
- Accessibility-sensitive checks for visible focus, skip link, search/glossary widgets, quiz state and reduced-motion behavior.
- Low-risk SCSS simplification only when rendered parity can be checked.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS, authentication or new dependencies.
- Large redesigns before visual QA identifies a concrete problem.
- Removing older SCSS rules without rendered comparison.

## Priorities

1. Open the deployed site in a browser and capture representative desktop/mobile states.
2. Check homepage, module index, one early module, one late module, search, glossary, route and about.
3. Fix only visible public-site issues with medium/high impact.
4. Run the full local validation gate.
5. Publish only after `Rscript scripts/prepublish_site_check.R` passes.

## Planned cycles

### Cycle 1 — Rendered visual diagnosis

- Inspect the deployed homepage and module index at desktop and mobile widths.
- Record visible layout, hierarchy, navigation or CTA issues.
- Avoid editing until issues are concrete.

### Cycle 2 — Module reading QA

- Inspect at least modules 01 and 12.
- Check headers, objectives, callouts, tables/code, quizzes and previous/next navigation.
- Fix only public module presentation issues.

### Cycle 3 — Utility and institutional QA

- Inspect search, glossary, route and about pages.
- Check no automatic editorial numbering, widget affordances, card spacing and mobile stacking.
- Extend deployed validation if a new rendered invariant should be protected.

### Cycle 4 — Conservative stylesheet cleanup

- Remove or consolidate duplicate public-site CSS only when screenshots/rendered HTML confirm equivalent behavior.
- Keep changes localized to `styles/main.scss` and `styles/main-dark.scss` unless page markup is clearly the source of the issue.

### Cycle 5 — Validation, publication and records

- Run `Rscript scripts/prepublish_site_check.R`.
- Run `Rscript scripts/validate_deployed_site.R` after publication.
- Update `WORKLOG_SITE.md` and prepare the next `NEXT_SITE.md`.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Browser/rendered QA findings are recorded.
- Local prepublish passes.
- GitHub Pages workflow succeeds if changes are published.
- Deployed-site validation passes after publication.
- `WORKLOG_SITE.md` and `NEXT_SITE.md` are updated.

## Recommended commands

- `Rscript scripts/prepublish_site_check.R`
- `Rscript scripts/validate_site_manifest.R`
- `Rscript scripts/validate_deployed_site.R`
- `git diff --check`
- `git status --short --branch`
- `git add ...`
- `git commit -m "..."`
- `git push origin main`
- `gh run list --repo Glebstrauss/mgenetica --workflow quarto-publish.yml --limit 3`
- `gh run watch <run-id> --repo Glebstrauss/mgenetica --exit-status`
