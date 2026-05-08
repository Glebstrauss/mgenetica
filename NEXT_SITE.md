# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish the rendered mobile QA fixes, verify the deployed public site, then continue with dark-mode rendered QA and conservative stylesheet simplification.

## Scope

In scope:

- Local prepublish validation for the current site-only changes.
- Commit/push of the rendered QA fixes.
- GitHub Pages workflow monitoring.
- Deployed validation for homepage, module index, module page, search, glossary, route and about.
- Dark-mode screenshot QA for homepage, module index and representative module/utility pages.
- Low-risk cleanup of duplicated SCSS only when rendered comparison confirms parity.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS, authentication or new dependencies.
- Large visual redesigns.
- Removing public controls or content without rendered evidence.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Commit and push the current site-only fixes.
3. Watch the GitHub Pages workflow to completion.
4. Run `Rscript scripts/validate_deployed_site.R` after deploy.
5. Start the next QA pass with dark-mode screenshots before any larger SCSS cleanup.

## Planned cycles

### Cycle 1 — Publish current fixes

- Review changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed verification

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Spot-check the published utility pages and module page if validation fails or cache timing is suspect.

### Cycle 3 — Dark-mode screenshot QA

- Capture dark-mode states for homepage, module index, module 01 or 12, search/glossary and about.
- Record visible contrast, spacing or component parity issues.
- Fix only medium/high-impact public issues.

### Cycle 4 — CSS simplification candidate review

- Identify duplicated SCSS blocks that are now superseded by the public component layer.
- Remove or consolidate only one low-risk group at a time.
- Re-render/screenshot after each meaningful cleanup.

### Cycle 5 — Final validation and records

- Run local validation.
- Publish if changes affect rendered site behavior.
- Update `WORKLOG_SITE.md` and prepare the next `NEXT_SITE.md`.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Local prepublish passes.
- GitHub Pages workflow succeeds for published changes.
- Deployed-site validation passes after publication.
- Dark-mode QA findings are recorded.
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
