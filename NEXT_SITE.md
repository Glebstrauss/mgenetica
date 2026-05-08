# NEXT_SITE.md

## Next recommended site-only block

Work only on the public site. Do not alter the app. Do not mix site evolution with app evolution.

## Objective

Publish and verify the conservative SCSS simplification, then continue reducing stylesheet duplication only where rendered behavior can be checked.

## Scope

In scope:

- Local prepublish validation for the current SCSS cleanup.
- Commit/push of the current site-only changes if validation passes.
- GitHub Pages workflow monitoring.
- Deployed validation after publication.
- Spot-check homepage/module-index pages if cache timing or layout concerns appear.
- One additional low-risk SCSS cleanup group after deployed parity is healthy.
- `WORKLOG_SITE.md` and `NEXT_SITE.md`.

Out of scope:

- App changes.
- Backend, CMS, authentication or new dependencies.
- Large redesigns.
- Broad SCSS deletion without rendered comparison.
- Public-content rewrites unrelated to the stylesheet cleanup.

## Priorities

1. Run `Rscript scripts/prepublish_site_check.R`.
2. Confirm changed files are site-only.
3. Commit and push the SCSS cleanup.
4. Watch GitHub Pages to completion.
5. Run `Rscript scripts/validate_deployed_site.R`.
6. Continue with the next small duplicated SCSS group only after publication is healthy.

## Planned cycles

### Cycle 1 — Publish current SCSS cleanup

- Review git diff and changed-file scope.
- Run the full prepublish gate.
- Commit and push only if validation passes.

### Cycle 2 — Deployed QA

- Watch the GitHub Pages workflow.
- Run deployed-site validation.
- Fetch representative pages if cache timing causes uncertainty.

### Cycle 3 — Rendered or compiled parity check

- Prefer `quarto preview` if the CLI is available in the environment.
- If `quarto` remains unavailable locally, rely on GitHub Pages render plus deployed validation and document the limitation.
- Check homepage and module-index behavior because the cleanup touched shared card/grid/button styles.

### Cycle 4 — Next SCSS duplication map

- Identify one additional repeated group, prioritizing duplicate hero/card declarations that are superseded by final component layers.
- Preserve base declarations that still provide layout, pseudo-element structure or responsive behavior.
- Avoid changing public page markup unless a rendered bug requires it.

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
- Any SCSS cleanup is backed by rendered, deployed or compiled verification.
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
