# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the dark-mode QA fixes, then continue with conservative SCSS simplification based on rendered parity.

## Scope

In scope:

- Local prepublish validation for the current dark-mode fixes.
- Commit/push of the current site-only changes.
- GitHub Pages workflow monitoring.
- Deployed validation after publication.
- Spot-check published dark-mode search/about/module behavior if validation or cache timing is suspect.
- Review of duplicated SCSS blocks only after the deployed site is healthy.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS, authentication or new dependencies.
- Large redesigns.
- Broad SCSS deletion without rendered comparison.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Confirm changed files are site-only.
3. Commit and push the dark-mode QA fixes.
4. Watch GitHub Pages to completion.
5. Run `Rscript scripts/validate_deployed_site.R`.

## Planned cycles

### Cycle 1 — Publish current dark-mode fixes

- Review git diff and changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed QA

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Fetch representative pages if cache timing causes uncertainty.

### Cycle 3 — SCSS duplication map

- Identify repeated hero/card/button/module rules now superseded by later component layers.
- Choose one low-risk duplicate group for cleanup.
- Avoid changing public page markup unless a rendered bug requires it.

### Cycle 4 — Cleanup and screenshot comparison

- Apply one conservative CSS cleanup.
- Compile SCSS and compare rendered screenshots for affected pages.
- Revert or adjust if visual parity is not clear.

### Cycle 5 — Records

- Run available validation.
- Publish if rendered behavior changed.
- Update `WORKLOG_SITE.md` and prepare the next `NEXT_SITE.md`.

## Criteria for completion

- Changes remain site-only.
- No app files are altered.
- Local prepublish passes.
- GitHub Pages workflow succeeds for published changes.
- Deployed-site validation passes after publication.
- Any SCSS cleanup is backed by rendered comparison.
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
